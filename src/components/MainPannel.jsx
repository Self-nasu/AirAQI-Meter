import React, { useState, useEffect } from 'react';
import LiveFeed from './LiveFeed';
import RangeMeter from './RangeMeter';
import GraphPannel from './GraphPannel';
import SetBox from './SetBox';
import useCalculateAQI from '../hooks/useCalculateAQI';
import './style.css';

function MainPannel() {
    const [settings, setSettings] = useState({
        noRows: 10,
        time: 60,
        graphType: 'line',
        showPoints: true,
        pointType: 'dot',
    });

    const handleSettingsChange = (newSettings) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            ...newSettings
        }));
    };

    // fetch AQI - custom hook
    const { aqiData } = useCalculateAQI(settings.time, settings.noRows); // Pass values directly

    return (
        <div className="container-fluid p-0 d-flex">
            <div className="container w-50 p-3 pe-0 d-flex flex-column gap-3 justify-content-between">

                {/* live feed and range meter */}
                <LiveFeed value={aqiData || 0} />
                <RangeMeter currentValue={aqiData || 0} />

                {/* sett - pannel */}
                <SetBox onSettingsChange={handleSettingsChange} />
            </div>

            <div id="Graph-holder" className="container d-flex justify-content-center w-50 p-3 overflow-y-scroll">
                {/* graph pannel */}
                <GraphPannel
                    time={settings.time}
                    noRows={settings.noRows}
                    graphType={settings.graphType}
                    showPoints={settings.showPoints}
                    pointType={settings.pointType}
                />
            </div>
        </div>
    );
}

export default MainPannel;
