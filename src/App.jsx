import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import mapImage from '../map.png';

function AppleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 384 512" fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.1-44.6-35.9-2.8-74.3 22.7-93.1 22.7-18.9 0-49.5-22.1-78.6-21.5-44.3 .7-84.8 25.8-107.6 66.1-46.8 82.5-12.2 205.1 33.1 270.8 22.1 32 49.3 67.2 84.7 66.2 33.6-1.1 46.1-21.4 86.8-21.4 40.5 0 52.4 21.4 87.2 20.8 35.5-.6 59.8-32.9 81.3-64.6 24.8-36.5 35-71.9 35.5-73.8-1.1-.3-81.1-30.8-82.6-103.8zM257.6 94.6c20.3-24.7 34.6-59.3 30.9-94.6-28.8 1.2-64.8 19.3-85.9 44.1-16.7 19.4-33.8 54.4-29.3 89.1 32.5 2.5 65.6-14 84.3-38.6z"/>
    </svg>
  );
}

function GoogleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 488 512" fill="currentColor">
      <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
    </svg>
  );
}

function MapPinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );
}

export default function App() {
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

      setTimeLeft(
        `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', backgroundColor: '#111', overflow: 'hidden', position: 'relative', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      
      {/* Map Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, cursor: 'grab', zIndex: 0 }}>
        <TransformWrapper centerOnInit={true} initialScale={1} minScale={0.5} maxScale={8}>
          <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }} contentStyle={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={mapImage} alt="Map" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} draggable={false} />
          </TransformComponent>
        </TransformWrapper>
      </div>

      {/* Top Banner: Countdown */}
      <div style={{ 
        position: 'absolute', 
        top: 'max(env(safe-area-inset-top, 20px), 20px)', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 10,
        background: 'rgba(20, 20, 20, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: '12px 24px',
        borderRadius: '30px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '220px'
      }}>
        <div style={{ fontSize: '0.75rem', color: '#999', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', fontWeight: 'bold' }}>
          Countdown
        </div>
        <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fff', fontVariantNumeric: 'tabular-nums', letterSpacing: '1px' }}>
          {timeLeft}
        </div>
      </div>

      {/* Bottom Floating Panel */}
       <div style={{
          position: 'absolute',
          bottom: 'max(env(safe-area-inset-bottom, 20px), 20px)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 40px)',
          maxWidth: '400px',
          background: 'rgba(20, 20, 20, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '24px',
          padding: '20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.3px', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '12px' }}>
                <MapPinIcon size={14} />
                35.32112° N, 80.72996° W
             </div>
             
             {/* Partiful Invite button */}
             <a 
                href="https://partiful.com/e/aX7b9vls5ZJHSMLjoJQk" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #ff6188, #fc9867)',
                  color: '#fff',
                  padding: '8px 18px',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  boxShadow: '0 2px 10px rgba(255, 97, 136, 0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                RSVP
              </a>
          </div>

          {/* Action Buttons Container */}
          <div style={{ display: 'flex', gap: '12px' }}>
            
            {/* Apple Maps */}
            <a 
              href="https://maps.apple/p/L32NJMgTrT1Cr-" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#2c2c2e',
                color: '#fff',
                padding: '14px',
                borderRadius: '16px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.9rem',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#3c3c3e'}
              onMouseOut={(e) => e.currentTarget.style.background = '#2c2c2e'}
            >
              <AppleIcon size={16} />
              Apple Maps
            </a>

            {/* Google Maps */}
            <a 
              href="https://maps.app.goo.gl/k6wt714py9BvRVhr9" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#2c2c2e',
                color: '#fff',
                padding: '14px',
                borderRadius: '16px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.9rem',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#3c3c3e'}
              onMouseOut={(e) => e.currentTarget.style.background = '#2c2c2e'}
            >
              <GoogleIcon size={16} />
              Google Maps
            </a>

          </div>

       </div>
    </div>
  );
}
