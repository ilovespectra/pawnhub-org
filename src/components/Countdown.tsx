import React, { useEffect, useState } from 'react';
import { global } from 'styled-jsx/css';

const Countdown: React.FC = () => {
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        // Set the date for Drop Day
        const ddayCountdownDate = new Date("Mar 14, 2024 03:14:15").getTime();

        // Update the count down every 1 second
        const interval = setInterval(() => {
            // Get today's date and time
            const now = new Date().getTime();

            // Find the distance between now and the countdown date
            const ddayDistance = ddayCountdownDate - now;

            // Time calculations for days, hours, minutes and seconds
            const ddayDays = Math.floor(ddayDistance / (1000 * 60 * 60 * 24));
            const ddayHours = Math.floor((ddayDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const ddayMinutes = Math.floor((ddayDistance % (1000 * 60 * 60)) / (1000 * 60));
            const ddaySeconds = Math.floor((ddayDistance % (1000 * 60)) / 1000);

            // Format the countdown string
            const countdownString = `${ddayDays} d ${ddayHours} h ${ddayMinutes} m ${ddaySeconds} s`;

            // Update the countdown state
            setCountdown(countdownString);

            // If the count down is finished, clear the interval
            if (ddayDistance < 0) {
                clearInterval(interval);
                setCountdown("D-Day is LIVE! Go get your slice of the Pi!");
            }
        }, 1000);

        // Clean up the interval on component unmount
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <h3 className='timer-body'>Drop Day:</h3>
            <div className='timer-body'>
                <span className="timer-body">{countdown}</span>
            </div>
        </div>
    );
};

export default Countdown;
