// import '../../styles/panel.scss';
import Timer from './timer'
import Card from './card'

import { useEffect } from 'react';
import { useState } from 'react';


function Main(props) {

    const [isStart, setIsStart] = useState(true)

    const initalCard = {
        word: "START",
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

    // function setWords(words) {
    //     const gameWords = {
    //         word: "FINGERPRINT",
    //         taboo1: "HAND",
    //         taboo2: "MARK",
    //         taboo3: "EVIDENCE",
    //         taboo4: "CRIME",
    //         taboo5: "DUST"
    //     }

    //     if (!words) {
    //         words = gameWords
    //     }
    //     setWords(words)
    // }

    function resetFunc() {
        //reset whole round 
        //1. Passes
        setReset(true)
        // setReset(false)
        setTimeout(() => { setReset(false) }, 1);
    }

    return (
        <div>
            <header className="container">
                <p>{mode}</p>
                {mode === "game" ?
                    <Timer
                        initialMinute="0"
                        initialSeconds="4"
                        stop={() => { setStop(true) }}
                        start={() => { setStop(false) }}
                        reset={() => { resetFunc() }}
                    /> : <br />}

                <br />
                <button
                    disabled={!isStart}
                    onClick={() => {
                        setIsStart(false)
                        setWords()
                        resetFunc()
                        setStop(false)
                    }}
                >
                    Start Button
                </button>

                <button
                    disabled={isStart}
                    onClick={() => {
                        setIsStart(true)
                        setWords(initalCard)
                    }} >
                    End Button
                </button>

                <Card words={words} stopped={stopped} reset={reset} isStart={isStart} />

            </header>

        </div>
    )
}

export default Main;
