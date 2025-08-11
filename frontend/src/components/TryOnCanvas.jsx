import React, { useRef, useEffect, useState } from 'react';

export default function TryOnCanvas({ userImage, cloth }) {
  const canvasRef = useRef(null);
  const [clothPosition, setClothPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!userImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const userImg = new Image();
    userImg.src = userImage;

    const clothImg = new Image();
    clothImg.src = cloth ? cloth.imageUrl : '';

    userImg.onload = () => {
      canvas.width = userImg.width;
      canvas.height = userImg.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(userImg, 0, 0);

      if (clothImg.src) {
        clothImg.onload = () => {
          ctx.drawImage(clothImg, clothPosition.x, clothPosition.y, 150, 150);
        };
        if (clothImg.complete) {
          ctx.drawImage(clothImg, clothPosition.x, clothPosition.y, 150, 150);
        }
      }
    };
  }, [userImage, cloth, clothPosition]);

  // Dragging for cloth image
  const handleMouseDown = e => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (
      x >= clothPosition.x &&
      x <= clothPosition.x + 150 &&
      y >= clothPosition.y &&
      y <= clothPosition.y + 150
    ) {
      setDragging(true);
    }
  };

  const handleMouseMove = e => {
    if (!dragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 75; // center cloth
    const y = e.clientY - rect.top - 75;
    setClothPosition({ x, y });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{ border: '1px solid #ccc', cursor: dragging ? 'grabbing' : 'grab', maxWidth: '100%' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      {!userImage && <p>Şəkil yükləyin və geyim seçin.</p>}
    </div>
  );
}
