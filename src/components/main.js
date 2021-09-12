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

    const mode = isStart ? "start" : "game"

    function setCard(words) {
        const gameWords = {
            word: "FINGERPRINT",
            taboo1: "HAND",
            taboo2: "MARK",
            taboo3: "EVIDENCE",
            taboo4: "CRIME",
            taboo5: "DUST"
        }

        if (!words) {
            words = gameWords
        }
        setWords(words)
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
                    /> : null}
                <button
                    disabled={!isStart}
                    onClick={() => {
                        setIsStart(false)
                        setCard()
                    }}
                >
                    Start Button
                </button>

                <button
                    disabled={isStart}
                    onClick={() => {
                        setIsStart(true)
                        setCard(initalCard)
                    }} >
                    End Button
                </button>

                <Card words={words} />

                <button disabled={stopped}>Next</button>
            </header>

        </div>
    )
}

export default Main;
