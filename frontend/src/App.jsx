import React, { useState, useEffect } from 'react';
import ImageUploader from './components/ImageUploader';
import ClothesSelector from './components/ClothesSelector';
import TryOnCanvas from './components/TryOnCanvas';

export default function App() {
  const [userImage, setUserImage] = useState(null);
  const [clothes, setClothes] = useState([]);
  const [selectedCloth, setSelectedCloth] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/clothes')
      .then(res => res.json())
      .then(data => setClothes(data));
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h1>Virtual Moda Geyim Sınağı</h1>
      <ImageUploader onImageSelect={setUserImage} />
      <ClothesSelector clothes={clothes} onSelect={setSelectedCloth} />
      <TryOnCanvas userImage={userImage} cloth={selectedCloth} />
    </div>
  );
}
