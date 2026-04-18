import React, { useState, useEffect } from 'react';
import ASCIIText from './ASCIIText';
import mapImage from '../map.png';

function App() {
  const targetDate = new Date('April 24, 2026 22:00:00 EST').getTime();
  
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft('IT IS TIME');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Format string
      setTimeLeft(
        `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.2, zIndex: 1, pointerEvents: 'none' }}>
        <img src={mapImage} alt="Map" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
        {timeLeft && (
          <ASCIIText
            text={timeLeft}
            asciiFontSize={8}
            textFontSize={200}
            textColor="#fdf9f3"
            planeBaseHeight={8}
            enableWaves={true}
          />
        )}
      </div>
    </div>
  );
}

export default App;
