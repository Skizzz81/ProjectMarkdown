import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ImageUpload from '../components/ImageLibrary/ImageUpload';
import ImageLibrary from '../components/ImageLibrary/ImageLibrary';
import NavBar from '../components/NavBar/NavBar';
import { loadLibraryFromLocalStorage } from '../store/slices/images';

export default function ImageLibraryPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLibraryFromLocalStorage());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <main style={{ padding: '2rem' }}>
        <h1>Gestion de la bibliothèque d'images</h1>
        <ImageUpload />
        <ImageLibrary />
      </main>
    </>
  );
}
