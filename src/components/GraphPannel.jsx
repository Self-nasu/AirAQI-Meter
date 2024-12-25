import React, { useEffect, useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import './style.css';
import Graph from './Graph';
import BarGraph from './BarGraph';
import co from './../assets/icons/co.svg';
import humidity from './../assets/icons/humidity.svg';
import o3 from './../assets/icons/o3.svg';
import pm10 from './../assets/icons/pm10.svg';
import pm25 from './../assets/icons/pm25.svg';
import temp from './../assets/icons/temp.svg';

function GraphPannel({
    graphType = 'line',
    time = 60,
    showPoints = true,
    pointType = 'dot',
    noRows = 10
}) {
    const { data } = useFetchData(time, noRows);

    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        if (data) {
            const newFeeds = data?.feeds.slice(0, noRows).map((feed) => ({
                time: new Date(feed.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
                field1: parseFloat(feed.field1) || null,
                field2: parseFloat(feed.field2) || null,
                field3: parseFloat(feed.field3) || null,
                field4: parseFloat(feed.field4) || null,
                field5: parseFloat(feed.field5) || null,
                field6: parseFloat(feed.field6) || null,
            }));
            setFeeds(newFeeds);
        }
    }, [data, noRows]);


    return (
        <div className="container animate__animated animate__fadeIn animate__delay-3s  d-grid responsive-grid p-0">
            {/* graphtype */}
            {(() => {
                if (graphType === 'line') {
                    return (
                        <>
                            <Graph data={feeds} xKey="time" pointType={pointType} yKey="field1" imglink={pm25} label="PM 2.5 Levels" showPoints={showPoints} />
                            <Graph data={feeds} xKey="time" pointType={pointType} yKey="field2" imglink={pm10} label="PM 10 Levels" showPoints={showPoints}  />
                            <Graph data={feeds} xKey="time" pointType={pointType} yKey="field3" imglink={o3} label="Ozone Levels" showPoints={showPoints}  />
                            <Graph data={feeds} xKey="time" pointType={pointType} yKey="field4" imglink={humidity} label="Humidity Levels" showPoints={showPoints}  />
                            <Graph data={feeds} xKey="time" pointType={pointType} yKey="field5" imglink={temp} label="Temperature Levels" showPoints={showPoints} />
                            <Graph data={feeds} xKey="time" pointType={pointType} yKey="field6" imglink={co} label="CO Levels" showPoints={showPoints} />
                        </>
                    );
                } else if (graphType === 'bar') {
                    return (
                        <>
                            <BarGraph data={feeds} xKey="time" yKey="field1" imglink={pm25} label="PM 2.5 Levels" />
                            <BarGraph data={feeds} xKey="time" yKey="field2" imglink={pm10} label="PM 10 Levels" />
                            <BarGraph data={feeds} xKey="time" yKey="field3" imglink={o3} label="Ozone Levels" />
                            <BarGraph data={feeds} xKey="time" yKey="field4" imglink={humidity} label="Humidity Levels" />
                            <BarGraph data={feeds} xKey="time" yKey="field5" imglink={temp} label="Temperature Levels" />
                            <BarGraph data={feeds} xKey="time" yKey="field6" imglink={co} label="CO Levels" />
                        </>
                    );
                }
            })()}
        </div>
    );

}

export default GraphPannel;
