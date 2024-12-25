import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Graph = ({ 
  data = [], 
  xKey, 
  yKey, 
  label, 
  custColor = '#8C76FF', 
  imglink, 
  showPoints = true, 
  pointType = 'circle' 
}) => {

  const averageValue =
    data.length > 0
      ? data.reduce((sum, item) => sum + (item[yKey] || 0), 0) / data.length
      : 0;

  // replacing null values with the average value
  const processedData = data.map(item => ({
    ...item,
    [yKey]: item[yKey] != null ? item[yKey] : averageValue,
  }));

  //  dot shapes based on pointType
  const dotShapes = {
    circle: <circle cx={0} cy={0} r={4} fill={custColor} />,
    square: <rect width={8} height={8} x={-4} y={-4} fill={custColor} />,
    triangle: (
      <polygon points="-4,4 4,4 0,-4" fill={custColor} />
    ),
    cross: (
      <line x1="-4" y1="-4" x2="4" y2="4" stroke={custColor} strokeWidth="2" />
    ),
    diamond: (
      <polygon points="0,-4 4,0 0,4 -4,0" fill={custColor} />
    ),
  };

  return (
    <div className="card shadow-sm cust-border bg-light cust-rounded" style={{ width: '', height: '30vh' }}>
      {/* card head */}
      <div className="card-header bg-primary shadow-sm cust-rounded-head text-white d-flex justify-content-between text-center">
        <h6 className="m-0"><img className="icon" src={imglink} alt="icon" /> {label}</h6>
        <small><span className="avg-tag">Avg. </span>{averageValue.toFixed(2)}</small>
      </div>

      {/* card main */}
      <div className="card-body p-2">
        <ResponsiveContainer width="100%" height="98%">
          <LineChart data={processedData}>
            <CartesianGrid strokeDasharray="2 2" stroke="#ccc" />
            <XAxis dataKey={xKey} hide />
            <YAxis hide />
            <Tooltip />

            <Line
              type="monotone"
              dataKey={yKey}
              stroke={custColor}
              strokeWidth={2}
              dot={showPoints ? dotShapes[pointType] : false}
              animationDuration={1000} 
              animationBegin={0}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
