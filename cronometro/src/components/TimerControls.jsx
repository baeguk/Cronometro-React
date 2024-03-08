import React from 'react'

const TimerControls = ({ onStart, onStop, timeOn, onReset, onLap }) => {
    return (
        <div className='timer-controls'>
            {!timeOn && <button onClick={onStart}>Iniciar</button>}
            {timeOn && <button onClick={onStop}>Parar</button>}
            {timeOn && <button onClick={onLap}>Volta</button>}
            <button onClick={onReset}>Zerar</button>
        </div>
    )
}

export default TimerControls