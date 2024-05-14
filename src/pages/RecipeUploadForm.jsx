import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { db, storage } from "../firebase.config";
import { doc, setDoc, collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const RecipeUploadForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const checkRecipeCollection = async () => {
      try {
        const recipesRef = collection(db, "songs");
        const snapshot = await getDocs(recipesRef);
        if (snapshot.size === 0) {
          await addDoc(recipesRef, { exists: true });
        }
      } catch (error) {
        console.error("Error checking songs collection:", error);
      }
    };

    checkRecipeCollection();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSongChange = (e) => {
    if (e.target.files[0]) {
      setSong(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const storageRef = ref(storage, `song_images/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      const storageRef2 = ref(storage, `songs/${song.name}`);
      await uploadBytes(storageRef2, song);
      const songUrl = await getDownloadURL(storageRef2);

      const songData = {
        title,
        category,
        artist,
        imgUrl: imageUrl,
        songUrl: songUrl,
      };

      await setDoc(doc(db, "songs", title), songData);

      setTitle("");
      setCategory("");
      setArtist("");
      setImage(null);
      setSong(null);

      alert("Song uploaded successfully!");
    } catch (error) {
      console.error("Error uploading song:", error);
      alert("An error occurred while uploading the song. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Define your category options
  const categoryOptions = [
    "Pop",
    "Rock",
    "Hip-Hop/Rap",
    "Electronic/Dance",
    "R&B/Soul",
    "Classical",
    // Add more options as needed
  ];

  return (
    <Container>
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <h2 className="mt-5 mb-4">Upload Song</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input
                type="select"
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category...</option>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="artist">Artist</Label>
              <Input
                type="text"
                name="artist"
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="image">Image</Label>
              <Input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="song">Song</Label>
              <Input
                type="file"
                name="song"
                id="song"
                accept="audio/mpeg"
                onChange={handleSongChange}
                required
              />
            </FormGroup>
            <Button type="submit" color="primary" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Song"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeUploadForm;
