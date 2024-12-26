import React, { useState, useEffect } from 'react';

function MobileNavbar({ onSettingsChange }) {
  const [noRows, setNoRows] = useState(10);
  const [time, setTime] = useState(60);
  const [graphType, setGraphType] = useState('line');
  const [showPoints, setShowPoints] = useState(true);
  const [pointType, setPointType] = useState('dot');

  const handleSettingsChange = () => {
    if (onSettingsChange) {
      onSettingsChange({ noRows, time, graphType, showPoints, pointType });
    }
  };

  useEffect(() => {
    handleSettingsChange();
  }, [noRows, time, graphType, showPoints, pointType]);

  return (
    <>
      <nav className="navbar navbar-dark bg-dark py-3 px-2 shadow-lg fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="navbar-brand d-flex align-items-center">
            <img src="./Logo.svg" alt="App Icon" className="me-2" style={{ height: '30px' }} />
            <span className="text-light">AQI Meter</span>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#settingsOffcanvas"
            aria-controls="settingsOffcanvas"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start text-bg-dark text-light"
        tabIndex="-1"
        id="settingsOffcanvas"
        aria-labelledby="settingsOffcanvasLabel"
      >
        <div className="offcanvas-header bg-dark">
          <h5 className="offcanvas-title" id="settingsOffcanvasLabel">Settings</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body bg-dark">
          <div className="d-flex flex-column">
            <p className="h6 pb-2">API Settings</p>
            <div className="input-group mb-3">
              <span className="input-group-text bg-cust text-light">No. of Data Points</span>
              <input
                type="number"
                min={10}
                max={200}
                className="form-control bg-dark text-light"
                value={noRows}
                onChange={(e) => setNoRows(Number(e.target.value))}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text bg-cust text-light">Fetch Interval</span>
              <input
                type="number"
                min={1}
                max={90}
                className="form-control bg-dark text-light"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
              />
              <span className="input-group-text bg-cust text-light">mins</span>
            </div>
          </div>

          <div className="d-flex flex-column mt-3">
            <p className="h6 pb-2">Graph Settings</p>
            <div className="input-group mb-3">
              <label className="input-group-text bg-cust text-light" htmlFor="graphTypeSelect">Graph Type</label>
              <select
                className="form-select bg-dark text-light"
                id="graphTypeSelect"
                value={graphType}
                onChange={(e) => setGraphType(e.target.value)}
              >
                <option value="line">Line</option>
                <option value="bar">Bar</option>
              </select>
            </div>

            <div className="input-group mb-3" style={{ opacity: graphType === 'bar' ? 0.5 : 1 }}>
              <label className="input-group-text bg-cust text-light" htmlFor="showPointsSelect">Show Points</label>
              <select
                className="form-select bg-dark text-light"
                id="showPointsSelect"
                value={showPoints ? 'on' : 'off'}
                onChange={(e) => setShowPoints(e.target.value === 'on')}
                disabled={graphType === 'bar'}
              >
                <option value="on">On</option>
                <option value="off">Off</option>
              </select>
            </div>

            <div className="input-group mb-3" style={{ opacity: graphType === 'bar' || !showPoints ? 0.5 : 1 }}>
              <label className="input-group-text bg-cust text-light" htmlFor="pointTypeSelect">Point Type</label>
              <select
                className="form-select bg-dark text-light"
                id="pointTypeSelect"
                value={pointType}
                onChange={(e) => setPointType(e.target.value)}
                disabled={graphType === 'bar' || !showPoints}
              >
                <option value="dot">Dots</option>
                <option value="circle">Circle</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileNavbar;
