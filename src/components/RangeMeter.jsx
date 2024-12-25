import React from 'react';
import './style.css';

function RangeMeter({ currentValue }) {
  const calculatePosition = (value) => {
    if (value <= 50) return '5%';
    if (value <= 100) return '20%';
    if (value <= 200) return '40%';
    if (value <= 300) return '60%';
    if (value <= 400) return '80%';
    return '95%';
  };

  const position = calculatePosition(currentValue);

  return (
    <div className="range-meter-container animate__animated animate__fadeInUp animate__delay-1s shadow-sm bg-light cust-rounded cust-border shadow-md px-4 py-4 pt-5 bg-white rounded-lg">
      <div
        className="range-progress"
        style={{
          position: 'relative',
          height: '12px',
          background: '#E0E0E0',
          borderRadius: '8px',
          display: 'flex',
        }}
      >
        <div
          className="range-progress-zone text-start"
          style={{
            flex: 1,
            backgroundColor: '#4CAF50',
            borderRadius: '8px 0 0 8px',
          }}
        >
          <span  style={{ top: -32, position: 'relative', color: '#4CAF50' }}>Good</span>
        </div>
        <div
          className="range-progress-zone text-center"
          style={{
            flex: 1,
            backgroundColor: '#FFEB3B',
          }}
        >
        <span style={{ top: -32, position: 'relative', color: '#FFEB3B' }}>Moderate</span>

        </div>
        <div
          className="range-progress-zone text-center"
          style={{
            flex: 1,
            backgroundColor: '#FF9800',
          }}
        >
        <span style={{ top: -32, position: 'relative', color: '#FF9800' }}>Poor</span>

        </div>
        <div
          className="range-progress-zone text-center"
          style={{
            flex: 1,
            backgroundColor: '#F44336',
          }}
        >
        <span style={{ top: -32, position: 'relative', color: '#F44336' }}>Unhealthy</span>

        </div>
        <div
          className="range-progress-zone text-center"
          style={{
            flex: 1,
            backgroundColor: '#D32F2F',
          }}
        >
        <span style={{ top: -32, position: 'relative', color: '#D32F2F' }}>Severe</span>

        </div>
        <div
          className="range-progress-zone text-end"
          style={{
            flex: 1,
            backgroundColor: '#B71C1C',
            borderRadius: '0 8px 8px 0',
          }}
        >
        <span style={{ top: -32, position: 'relative', color: '#B71C1C' }}>Hazardous</span>

        </div>
        {/* indicator */}
        <div
          className="range-indicator"
          style={{
            position: 'absolute',
            top: '-6px',
            left: position,
            width: '24px',
            height: '24px',
            backgroundColor: '#fff',
            border: '2px solid #424242',
            borderRadius: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
            transition: 'left 0.3s ease',
          }}
        />
      </div>

      {/* values on x axis */}
      <div className="range-values text-light" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontWeight: '500' }}>
        <span>0</span>
        <span>50</span>
        <span>100</span>
        <span>200</span>
        <span>300</span>
        <span>400</span>
        <span>500+</span>
      </div>
    </div>
  );
}

export default RangeMeter;
