import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const BarGraph = ({ 
  data = [], 
  xKey, 
  yKey, 
  label, 
  custColor = '#8C76FF', 
  imglink 
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

  return (
    <div className="card shadow-sm cust-border bg-light cust-rounded" style={{ width: '', height: '30vh' }}>
      {/* head */}
      <div className="card-header bg-primary shadow-sm cust-rounded-head text-white d-flex justify-content-between text-center">
        <h6 className="m-0"><img className='icon' src={imglink} alt="icon"></img> {label}</h6>
        <small><span className='avg-tag'>Avg. </span>{averageValue.toFixed(2)}</small>
      </div>

      {/* chart */}
      <div className="card-body p-2">
        <ResponsiveContainer width="100%" height="98%">
          <BarChart data={processedData}>
            <CartesianGrid strokeDasharray="2 2" stroke="#ccc" />
            <XAxis dataKey={xKey} hide />
            <YAxis hide />
            <Tooltip />
            
            <Bar
              dataKey={yKey}
              fill={custColor}
              radius={[3, 3, 0, 0]}
              barSize={10}
              animationDuration={1000}
              animationBegin={0}
              animationEasing="ease-in-out"
            />
            
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarGraph;
