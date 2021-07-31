import { useEffect, useState } from 'react';

interface ClockData {
    date: Date;
    hours: string;
    minutes: string;
    seconds: string;
}

export const Clock = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [interval, setClockInterval] = useState<number>(0);

    const formatData = (data: number): string => {
        const dataToString = data.toString();
        return dataToString.length === 2 ? dataToString : `0${dataToString}`;
    };

    const setTime = (): ClockData => {
        const date = new Date();
        return {
            date: date,
            hours: formatData(date.getHours()),
            minutes: formatData(date.getMinutes()),
            seconds: formatData(date.getSeconds()),
        };
    };
    const timeData: ClockData = setTime();

    useEffect(() => {
        setInterval(() => {
            setClockInterval((el) => el + 1);
        }, 1000);
    }, []);

    return (
        <div>
            {timeData.date.toDateString()}
            <div>
                {timeData.hours}:{timeData.minutes}:{timeData.seconds}
            </div>
        </div>
    );
};

export default Clock;
