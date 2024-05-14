import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form } from 'reactstrap';
import { db, storage } from '../firebase.config';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

const AdminSongsPanel = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ email: '', password: '' });

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "songs"));
      const songsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSongs(songsList);
    } catch (error) {
      console.error("Failed to fetch songs:", error);
    }
    setLoading(false);
  };

  const handleEditSong = (song) => {
    setCurrentSong({ ...song });
    setEditModal(true);
  };

  const handleSongUpdate = async (e) => {
    e.preventDefault();
    const { title, artist, category, id } = currentSong;
    try {
      await updateDoc(doc(db, "songs", id), {
        title,
        artist,
        category
      });
      setEditModal(false);
      fetchSongs(); // Refresh the list
      alert("Song updated successfully!");
    } catch (error) {
      console.error("Error updating song:", error);
      alert("Failed to update the song");
    }
  };

  const deleteSong = async (song) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      try {
        const imageRef = ref(storage, song.imgUrl);
        const songRef = ref(storage, song.songUrl);
        await deleteObject(imageRef);
        await deleteObject(songRef);
        await deleteDoc(doc(db, "songs", song.id));
        fetchSongs();
        alert("Song deleted successfully");
      } catch (error) {
        console.error("Error deleting song:", error);
        alert("Failed to delete the song");
      }
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = adminCredentials;
    if (email === 'safwan@music.app' && password === '#Safwan123') {
      setIsAdminAuthenticated(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container>
      {!isAdminAuthenticated && (
        <Modal isOpen={!isAdminAuthenticated} backdrop="static" centered>
          <ModalHeader>Admin Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleLogin}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={adminCredentials.email}
                  onChange={(e) => setAdminCredentials({ ...adminCredentials, email: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={adminCredentials.password}
                  onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                  required
                />
              </FormGroup>
              <Button color="primary" type="submit">Login</Button>
            </Form>
          </ModalBody>
        </Modal>
      )}

      {isAdminAuthenticated && (
        <>
          <h2 className="mt-5">Admin Panel</h2>
          {loading ? (
            <p>Loading songs...</p>
          ) : (
            <Table striped>
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song) => (
                  <tr key={song.id}>
                    <td><img className='imgss' src={song.imgUrl} alt="" /></td>
                    <td>{song.title}</td>
                    <td>{song.artist}</td>
                    <td>{song.category}</td>
                    <td>
                      <Button color="secondary" onClick={() => handleEditSong(song)}>Edit</Button>{' '}
                      <Button color="danger" onClick={() => deleteSong(song)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <Modal isOpen={editModal} toggle={() => setEditModal(!editModal)}>
            <ModalHeader toggle={() => setEditModal(!editModal)}>Edit Song</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSongUpdate}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={currentSong?.title}
                    onChange={(e) => setCurrentSong({ ...currentSong, title: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="artist">Artist</Label>
                  <Input
                    type="text"
                    name="artist"
                    id="artist"
                    value={currentSong?.artist}
                    onChange={(e) => setCurrentSong({ ...currentSong, artist: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="category">Category</Label>
                  <Input
                    type="text"
                    name="category"
                    id="category"
                    value={currentSong?.category}
                    onChange={(e) => setCurrentSong({ ...currentSong, category: e.target.value })}
                    required
                  />
                </FormGroup>
                <Button color="primary" type="submit">Update Song</Button>
              </Form>
            </ModalBody>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default AdminSongsPanel;
