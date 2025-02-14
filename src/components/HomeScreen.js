import React from 'react';
import DailyLogReminder from '../components/DailyLogReminder';

const HomeScreen = () => {

    return (
        <div>
            <main style={{padding: '20px'}}>
                <h2>Home Screen</h2>
                <DailyLogReminder/>
            </main>
        </div>
    );
};

export default HomeScreen;
