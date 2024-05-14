import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { auth, storage, db } from '../firebase.config';
import { toast } from 'react-toastify';
import googleimg from '../assets/images/google.png';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const fileUploadRef = useRef(null);

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (password.length < 6) {
        setLoading(false);
        toast.error('Password should be at least 6 characters long.');
        return;
      }

      if (password !== confirmPassword) {
        setLoading(false);
        toast.error('Passwords do not match. Please confirm your password.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });

      let photoURL = null;

      if (file) {
        const storageRef = ref(storage, `images/${user.uid}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progress monitoring if needed
          },
          (error) => {
            setLoading(false);
            toast.error(error.message);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            photoURL = downloadURL;

            const userData = {
              uid: user.uid,
              displayName: username,
              email,
              photoURL,
            };

            await setDoc(doc(db, 'users', user.uid), userData);

            setLoading(false);
            toast.success('Account created');
            navigate('/home');
          }
        );
      } else {
        const userData = {
          uid: user.uid,
          displayName: username,
          email,
          photoURL,
        };

        await setDoc(doc(db, 'users', user.uid), userData);

        setLoading(false);
        toast.success('Account created');
        navigate('/home');
      }
    } catch (error) {
      setLoading(false);
      console.error('Signup error:', error);
      if (error.code === "auth/weak-password") {
        toast.error('Password should be at least 6 characters long.');
      } else if (error.code === "auth/email-already-in-use") {
        toast.error('The provided email is already registered. Please use a different email.');
      } else {
        toast.error('An error occurred during sign up. Please try again later.');
      }
    }
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return;
    }

    if (selectedFile.size > 5242880) { // 5 MB in bytes
      toast.error('Selected file is too large. Please choose a smaller image.');
      setFile(null);
    } else if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
      toast.error('Invalid file format. Please choose a JPEG or PNG image.');
      setFile(null);
    } else {
      setFile(selectedFile);
    }
  };

  return (
    <section className="sect__bg">
      <Container>
        <Row>
          <Col lg='6' className="m-auto text-center">
            <h3 className="fw-bold fs-2 mb-4">Welcome!</h3>
            <h6 className="mb-4">SignUp to continue</h6>

            <Form className="auth__form" onSubmit={signup}>
              <FormGroup className="form__group">
                <input type="text" placeholder="Name" required value={username} onChange={e => setUsername(e.target.value)} />
              </FormGroup>
              <FormGroup className="form__group">
                <input type="email" placeholder="E-mail" required value={email} onChange={e => setEmail(e.target.value)} />
              </FormGroup>
              <FormGroup className="form__group">
                <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
              </FormGroup>
              <FormGroup className="form__group">
                <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </FormGroup>
              <FormGroup className="form__group">
                <label htmlFor="fileUpload" className="pp_choose">Click here to choose a Profile Picture</label>
                <input type="file" className="button_ok" placeholder="profile" id="fileUpload" accept="image/png, image/jpeg, image/jpg" onChange={handleFileUpload} ref={fileUploadRef} />
              </FormGroup>

              <button type="submit" className="buy__button auth__btn">Let's get started</button>
              <p>Already have an account? <Link to='/login'>Login</Link></p>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Signup;
