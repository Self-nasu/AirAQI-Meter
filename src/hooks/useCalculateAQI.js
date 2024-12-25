import { useState, useEffect } from 'react';
import useFetchData from './useFetchData'; 

const pm25Breakpoints = [
  { low: 0.0, high: 12.0, aqiLow: 0, aqiHigh: 50 },
  { low: 12.1, high: 35.4, aqiLow: 51, aqiHigh: 100 },
  { low: 35.5, high: 55.4, aqiLow: 101, aqiHigh: 150 },
  { low: 55.5, high: 150.4, aqiLow: 151, aqiHigh: 200 },
  { low: 150.5, high: 250.4, aqiLow: 201, aqiHigh: 300 },
  { low: 250.5, high: 350.4, aqiLow: 301, aqiHigh: 400 },
  { low: 350.5, high: 500.4, aqiLow: 401, aqiHigh: 500 },
];

// Function to calculate AQI based on the concentration and breakpoints
const calculateAQI = (concentration, breakpoints) => {
  for (const bp of breakpoints) {
    if (bp.low <= concentration && concentration <= bp.high) {
      return Math.round(
        ((bp.aqiHigh - bp.aqiLow) / (bp.high - bp.low)) * (concentration - bp.low) + bp.aqiLow
      );
    }
  }
  return null; // Return null if the concentration is out of bounds
};

// Custom hook to calculate AQI based on fetched data
const useCalculateAQI = (time = 60, noRows = 10, url = 'https://api.thingspeak.com/channels/1596152/feeds.json?results=') => {
  const { data } = useFetchData(time, noRows, url); // Use the existing useFetchData hook to fetch the data
  const [aqiData, setAqiData] = useState(null);

  useEffect(() => {
    if (data && data.feeds) {
      // Extract PM2.5 values from all feeds
      const pm25Values = data.feeds.map(feed => parseFloat(feed.field1)).filter(value => !isNaN(value));
      
      if (pm25Values.length > 0) {
        // Calculate the average PM2.5 value
        const averagePm25 = pm25Values.reduce((acc, value) => acc + value, 0) / pm25Values.length;
        
        // Calculate AQI based on the average PM2.5
        const pm25Aqi = calculateAQI(averagePm25, pm25Breakpoints);
        
        // Update state with calculated AQI
        setAqiData(pm25Aqi);
      }
    }
  }, [data]); // Recalculate AQI whenever new data is fetched

  return { aqiData }; // Return the AQI data
};

export default useCalculateAQI;
