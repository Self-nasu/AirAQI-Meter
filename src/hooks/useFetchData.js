import { useState, useEffect } from 'react';

const useFetchData = (time = 60, noRows, url = 'https://api.thingspeak.com/channels/1596152/feeds.json?results=') => {
  const [data, setData] = useState(null);
  const inevery = time * 60 * 1000; 

  useEffect(() => {
    const finalurl = url + String(noRows);
    const fetchData = async () => {
      try {
        const response = await fetch(finalurl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        console.log(result)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // init fetch 

    const interval = setInterval(() => {
      fetchData(); 
    }, inevery);

   
    return () => clearInterval(interval);
  }, [noRows, time, url]);

  return { data };
};

export default useFetchData;
