import React, { useState, useEffect } from 'react';
import LiveFeed from './LiveFeed';
import RangeMeter from './RangeMeter';
import GraphPannel from './GraphPannel';
import SetBox from './SetBox';
import useCalculateAQI from '../hooks/useCalculateAQI';
import './style.css';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavbar from './MobileNavbar';

function MainPannel() {
    const [settings, setSettings] = useState({
        noRows: 10,
        time: 60,
        graphType: 'line',
        showPoints: true,
        pointType: 'dot',
    });

    const { width } = useWindowSize();
    const isSmallScreen = width <= 768;

    const handleSettingsChange = (newSettings) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            ...newSettings
        }));
    };

    // fetch AQI - custom hook
    const { aqiData } = useCalculateAQI(settings.time, settings.noRows); // Pass values directly

    return (


        <>

            {!isSmallScreen && (
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
            )}
            {isSmallScreen && (
                <>
                    <MobileNavbar onSettingsChange={handleSettingsChange} ></MobileNavbar>
                    <div style={{ marginTop: 70 }} className="container-fluid p-0 d-flex flex-column">
                        <div className="container p-3 pb-0 d-flex flex-column gap-3">

                            {/* live feed and range meter */}
                            <LiveFeed watch={false} value={aqiData || 0} />
                            <RangeMeter currentValue={aqiData || 0} />

                        </div>

                        <div className="container h-auto d-flex justify-content-center p-3">
                            {/* graph pannel */}
                            <GraphPannel
                                time={settings.time}
                                noRows={settings.noRows}
                                graphType={settings.graphType}
                                showPoints={settings.showPoints}
                                pointType={settings.pointType}
                            />
                        </div>

                        <div className='container d-flex p-3 px-4 flex-row justify-content-between'>
                            <p className='text-light fw-light fs-6 m-0 p-0'>Made by Self-Nasu.</p>
                            <div className='d-flex gap-3'>
                                <a href='https://github.com/self-nasu' className='text-light icons-hov'><i class="bi bi-github"></i></a>
                                <a href='https://www.linkedin.com/in/nasu1708/' className='text-light icons-hov'><i class="bi bi-linkedin"></i></a>
                                <a href='https://www.instagram.com/self.nasu/' className='text-light icons-hov'><i class="bi bi-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    );
}

export default MainPannel;
