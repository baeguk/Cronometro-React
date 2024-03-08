import { useState, useEffect } from 'react'
import TimerDisplay from './TimerDisplay'
import TimerControls from './TimerControls'
import LapList from './LapList'

const Timer = () => {
    const [milliseconds, setMilliseconds] = useState(0)
    const [timeOn, setTimeOn] = useState(false)
    const [laps, setLaps] = useState([])

    useEffect(() => {
        let interval = null;
        if (timeOn) {
            interval = startTimer(interval);
        } else if (!timeOn) {
            interval = stopTimer(interval);
        }
        return () => stopTimer(interval);
    }, [timeOn]);

    const startTimer = (interval) => {
        return setInterval(() => {
            setMilliseconds(prevMilliseconds => prevMilliseconds + 10)
        }, 10)
    };

    const stopTimer = (interval) => {
        clearInterval(interval);
        return interval;
    }

    const resetTimer = () => {
        setMilliseconds(0);
        setTimeOn(false);
        setLaps([]);
    };

    const addLap = () => {
        setLaps([...laps, formatTime()]);
    }

    const formatTime = () => {
        const minutes = ('0' + Math.floor((milliseconds / 60000) % 60)).slice(-2)
        const seconds = ('0' + Math.floor((milliseconds / 1000) % 60)).slice(-2)
        const centiseconds = ('0' + Math.floor((milliseconds / 10) % 100)).slice(-2)

        return `${minutes}:${seconds}:${centiseconds}`
    }

    

    return (
        <div className='timer-container'>
            <TimerDisplay time={formatTime()} />
            <TimerControls
                timeOn = {timeOn}
                onStart={() => setTimeOn(true)}
                onStop={() => setTimeOn(false)}
                onReset={resetTimer}
                onLap={addLap}
            />
            <LapList laps={laps}/>
        </div>
    )
}

export default Timer