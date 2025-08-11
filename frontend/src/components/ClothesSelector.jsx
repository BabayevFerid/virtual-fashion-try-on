import React from 'react';

export default function ClothesSelector({ clothes, onSelect }) {
  return (
    <div style={{ margin: '20px 0' }}>
      <h3>Geyim seçin:</h3>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {clothes.map(c => (
          <div key={c.id} onClick={() => onSelect(c)} style={{ cursor: 'pointer', textAlign: 'center' }}>
            <img src={c.imageUrl} alt={c.name} width={80} />
            <p>{c.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
