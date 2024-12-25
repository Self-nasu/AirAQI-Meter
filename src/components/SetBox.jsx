import React, { useState, useEffect } from 'react';

function SetBox({ onSettingsChange }) {
  const [noRows, setNoRows] = useState(10); // number of rows to fetch
  const [time, setTime] = useState(60); // fetch interval in minutes
  const [graphType, setGraphType] = useState('line'); // graph type
  const [showPoints, setShowPoints] = useState(true); // show points
  const [pointType, setPointType] = useState('dot'); // point type 

  const handleSettingsChange = () => {
    if (onSettingsChange) {
      onSettingsChange({ noRows, time, graphType, showPoints, pointType });
    }
  };

  // re-run when any thing change
  useEffect(() => {
    handleSettingsChange();
  }, [noRows, time, graphType, showPoints, pointType]);

  return (
    <>
      <div className="container-fluid animate__animated animate__fadeIn animate__delay-2s p-3 d-flex cust-border cust-rounded flex-column">

        {/* api settings */}

        <div className="d-flex flex-column">
          <p className="h6 text-light pb-2">API Settings</p>

          {/* no of rows */}
          <div className="input-group mb-3">
            <span className="input-group-text bg-cust text-light">No. of Data Points</span>
            <input
              type="number"
              min={10} max={200}
              className="form-control bg-light text-light"
              value={noRows}
              onChange={(e) => setNoRows(Number(e.target.value))}
            />
          </div>

          {/* time interval */}
          <div className="input-group mb-3">
            <span className="input-group-text bg-cust text-light">Fetch Time Interval</span>
            <input
              type="number"
              className="form-control bg-light text-light"
              value={time}
              min={1} max={90}
              onChange={(e) => setTime(Number(e.target.value))}
            />
            <span className="input-group-text bg-cust text-light">in Minutes</span>
          </div>
        </div>


      </div >
      <div className="container-fluid animate__animated animate__fadeIn animate__delay-2s p-3 d-flex cust-border cust-rounded flex-column">
        {/* graph settings */}

      <div className="d-flex flex-column">
        <p className="h6 text-light pb-2">Graph Settings</p>

        {/*  graph type */}
        <div className="input-group mb-3">
          <label className="input-group-text bg-cust text-light" htmlFor="inputGroupSelect01">Graph Type</label>
          <select
            className="form-select bg-light text-light"
            id="inputGroupSelect01"
            value={graphType}
            onChange={(e) => setGraphType(e.target.value)}
          >
            <option className="text-dark" value="line">Line</option>
            <option className="text-dark" value="bar">Bar</option>
          </select>
        </div>

        <div className="d-flex gap-3">
          {/* show points */}
          <div className="input-group mb-3" style={{ opacity: graphType === 'bar' ? 0.5 : 1 }}>
            <label className="input-group-text bg-cust text-light" htmlFor="showPointsSelect">Show Points</label>
            <select
              className="form-select bg-light text-light"
              id="showPointsSelect"
              value={showPoints ? 'on' : 'off'}
              onChange={(e) => setShowPoints(e.target.value === 'on')}
              disabled={graphType === 'bar'}
            >
              <option className="text-dark" value="on">On</option>
              <option className="text-dark" value="off">Off</option>
            </select>
          </div>

          <div className="input-group mb-3" style={{ opacity: graphType === 'bar' || showPoints === false ? 0.5 : 1 }}>
            <label className="input-group-text bg-cust text-light" htmlFor="pointTypeSelect">Point Type</label>
            <select
              className="form-select bg-light text-light"
              id="pointTypeSelect"
              value={pointType}
              onChange={(e) => setPointType(e.target.value)}
              disabled={graphType === 'bar' || showPoints === false}
            >

            <option className="text-dark" value="dot">Dots</option>
            <option className="text-dark" value="circle">Circle</option>
          </select>
        </div>
      </div>
      </div>

    {/* footer */}

    <div className='d-flex flex-row justify-content-between'>
      <p className='text-light fw-light fs-6 m-0 p-0'>Made by Self-Nasu.</p>
      <div className='d-flex gap-3'>
        <a href='https://github.com/self-nasu' className='text-light icons-hov'><i class="bi bi-github"></i></a>
        <a href='https://www.linkedin.com/in/nasu1708/' className='text-light icons-hov'><i class="bi bi-linkedin"></i></a>
        <a href='https://www.instagram.com/self.nasu/' className='text-light icons-hov'><i class="bi bi-instagram"></i></a>
      </div>
    </div>

      </div>
    </>

  );
}

export default SetBox;
