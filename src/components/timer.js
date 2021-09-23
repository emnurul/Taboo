import { useEffect } from 'react';
import { useState } from 'react';
import {
    RetweetOutlined,
    HourglassOutlined
} from '@ant-design/icons';

const Timer = (props) => {
    const { initialMinute, initialSeconds } = props;
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds == 0) {
                if (minutes == 0) {
                    clearInterval(myInterval)
                    props.stop()
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    function resetTimer() {
        setMinutes(initialMinute)
        setSeconds(initialSeconds)
        props.reset()
        props.start()
    }

    return (
        <div>
            <HourglassOutlined /> {minutes}:{seconds < 10 ? `0${seconds}` : seconds} &nbsp;
            <button onClick={() => resetTimer()}><RetweetOutlined /> Reset</button >
        </div >
    )
}

export default Timer;