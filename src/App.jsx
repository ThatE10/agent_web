import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
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
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', backgroundColor: '#1a1a1a', overflow: 'hidden' }}>
      
      {/* Header section explicitly for the countdown */}
      <div style={{ height: '25vh', width: '100%', position: 'relative', zIndex: 10, background: 'linear-gradient(to bottom, #111 0%, #1a1a1a 100%)', borderBottom: '1px solid #333', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
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

      {/* Interactive Map area */}
      <div style={{ flex: 1, position: 'relative', width: '100%', overflow: 'hidden', cursor: 'grab' }}>
        <TransformWrapper centerOnInit={true} initialScale={1} minScale={0.5} maxScale={8}>
          <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }} contentStyle={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={mapImage} alt="Map" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} draggable={false} />
          </TransformComponent>
        </TransformWrapper>
      </div>

    </div>
  );
}

export default App;
