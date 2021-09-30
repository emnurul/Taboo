// import '../../styles/panel.scss';
import Timer from './timer'
import Card from './card'

import { useEffect } from 'react';
import { useState } from 'react';


function Main(props) {

    const [isStart, setIsStart] = useState(true)

    const initalCard = {
        word: "HOME",
        taboo1: "1.Choose Team Name",
        taboo2: "2.Select Time",
        taboo3: "3.Select Taboo Score",
        taboo4: "4.Select Correct Score",
        taboo5: "5.Select No. of Passes"
    }

    const [words, setWords] = useState(initalCard)
    const [stopped, setStop] = useState(false)
    const [reset, setReset] = useState(false)

    const mode = isStart ? "start" : "game"

    function resetFunc() {
        //reset whole round 
        //1. Passes
        setReset(true)
        // setReset(false)
        setTimeout(() => { setReset(false) }, 1);
    }

    return (
        <div>
            <button
                    className="button-home"
                    disabled={isStart}
                    onClick={() => {
                        setIsStart(true)
                        setWords(initalCard)
                    }} >
                    H
                </button>

            <header className="container">
                {mode === "game" ?
                    <Timer
                        initialMinute="0"
                        initialSeconds="3"
                        stop={() => { setStop(true) }}
                        start={() => { setStop(false) }}
                        reset={() => { resetFunc() }}
                    /> :

                    <div>
                        <button
                            className="button-start"
                            disabled={!isStart}
                            onClick={() => {
                                setIsStart(false)
                                setWords()
                                resetFunc()
                                setStop(false)
                            }}
                        >
                            Start
                        </button>

                        <br />
                    </div>}

                <br />
                <Card words={words} stopped={stopped} reset={reset} isStart={isStart} />

            </header>

        </div>
    )
}

export default Main;
