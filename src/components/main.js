// import '../../styles/panel.scss';
import Timer from './timer'
import Card from './card'
import { Row, Col } from 'antd';

import { useEffect } from 'react';
import { useState } from 'react';

import {
    HomeFilled,
    PlaySquareFilled
} from '@ant-design/icons';

function Main(props) {

    const [isStart, setIsStart] = useState(true)

    const intialTeamState = {
        1: {},
        2: {},
        3: {}
    }

    const [teamAState, setTeamAState] = useState(intialTeamState)
    const [teamBState, setTeamBState] = useState(intialTeamState)
    const [round, setRound] = useState({ team: "B", round: 1 })

    // const initalCard = {
    //     word: "HOME",
    //     taboo1: "1.Choose Team Name",
    //     taboo2: "2.Select Time",
    //     taboo3: "3.Select Taboo Score",
    //     taboo4: "4.Select Correct Score",
    //     taboo5: "5.Select No. of Passes"
    // }

    const initalCard = {
        word: "HOME",
        taboo1: "",
        taboo2: "The game of",
        taboo3: "unspeakable fun",
        taboo4: "",
        taboo5: ""
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

    const roundArray = [
        { team: "A", round: 1 },
        { team: "B", round: 1 },
        { team: "A", round: 2 },
        { team: "B", round: 2 },
        { team: "A", round: 3 },
        { team: "B", round: 3 }

    ]

    function rounds(currentItem) {
        const index = roundArray.findIndex(e => (
            e.team == currentItem.team &&
            e.round == currentItem.round
        ))

        const nextRound = roundArray[index + 1]
        if (!nextRound) {
            setRound({})
            console.log("game is over....")
        } else {
            setRound(nextRound)
            console.log("next round starting...", nextRound)
        }
    }

    // rounds({ team: "A", round: 1 })


    return (
        <div>
            <header className="container">
                {mode === "game" ?
                    <>
                        <div className="score-table" style={{ maxWidth: "250px", borderRadius: "50px" }}>
                            <Row justify="center" className="score-header" style={{ borderRadius: "50px" }}
                            >
                                TEAM A
                            </Row>
                        </div>
                        <br />
                        <button
                            className="button-home"
                            disabled={isStart}
                            onClick={() => {
                                setIsStart(true)
                                setWords(initalCard)
                            }} >
                            <HomeFilled />
                        </button>
                    </>

                    :

                    <button
                        className="button-home"
                        disabled={!isStart}
                        onClick={() => {
                            setIsStart(false)
                            setWords()
                            resetFunc()
                            setStop(false)
                        }}
                    >
                        <PlaySquareFilled />
                    </button>
                }

                {mode === "game" ?
                    <>
                        <Timer
                            initialMinute="0"
                            initialSeconds="3"
                            stop={() => { setStop(true) }}
                            start={() => { setStop(false) }}
                            reset={() => { resetFunc() }}
                        />
                    </>

                    :

                    <div>
                    </div>}

                <br />
                <Card
                    round={round}
                    setScore="some function"
                    words={words}
                    stopped={stopped}
                    reset={reset}
                    isStart={isStart}
                />

            </header>

        </div >
    )
}

export default Main;
