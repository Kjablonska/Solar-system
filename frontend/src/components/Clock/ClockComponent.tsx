import React from 'react';

export const ClockComponent = () => {
    let time: Date;
    let hours:number;
    let minutes:number;
    let seconds:number;

    const clock = () => {
        time = new Date();
        hours = time.getHours();
        minutes = time.getMinutes();
        seconds = time.getSeconds();
    }

    setInterval(clock, 1000);
}