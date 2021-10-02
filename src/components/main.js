// import '../../styles/panel.scss';
import Timer from './timer'
import Card from './card'
import ScoreTable from './scores'
import { Row, Col } from 'antd';

import { useEffect } from 'react';
import { useState } from 'react';

import {
    HomeFilled,
    PlaySquareFilled
} from '@ant-design/icons';

function Main(props) {

    const [isStart, setIsStart] = useState(true)
    const [refresh, doRefresh] = useState(0);

    const intialTeamState = { score: 0, state: [] }
    const initialRound = { team: "A", round: 1 }

    const [teamAState, setTeamAState] = useState(intialTeamState)
    const [teamBState, setTeamBState] = useState(intialTeamState)
    const [round, setRound] = useState(initialRound)

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
        taboo2: "the Game of",
        taboo3: "unspeakable fun",
        taboo4: "",
        taboo5: ""
    }

    const [words, setWords] = useState(initalCard)
    const [stopped, setStop] = useState(false)
    const [reset, setReset] = useState(false)
    const [isFinal, setFinal] = useState(false)
    const [winner, setWinner] = useState("")

    const mode = isStart ? "start" : "game"

    function resetFunc() {
        setReset(true)
        setTimeout(() => { setReset(false) }, 1);
    }

    function resetGame() {
        setTeamAState(intialTeamState)
        setTeamBState(intialTeamState)
        setFinal(false)
        setRound(initialRound)
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
            setFinal(true)
        } else {
            setRound(nextRound)
            setStop(false)
            resetFunc()
        }
    }

    function scores(scoreData) {
        doRefresh(refresh + 1)
        const { team, words, score } = scoreData

        const teamState = team.team === "A" ? teamAState : teamBState
        let count = score + teamState.score

        const newScore = {
            round: round.round,
            words,
            score
        }

        //setting scores for total tally
        team.team === "A" ?
            setTeamAState({ score: count, state: [...teamState.state, newScore] }) :
            setTeamBState({ score: count, state: [...teamState.state, newScore] })

        rounds(round)

        teamAState.score > teamBState.score ? setWinner("A") : setWinner("B")
    }


    return (
        <div>
            <header className="container">
                {
                    isFinal ?
                        <>
                            <div className="winner-title">Winner: TEAM {winner} !! </div>

                            <ScoreTable
                                type="header"
                                title="TEAM A"
                            />
                            {teamAState.state.map((item) => {
                                const { round, words, score } = item
                                return (
                                    <>
                                        <ScoreTable
                                            type="table"
                                            title="TEAM A"
                                            words={words}
                                            score={score}
                                            round={round}
                                        />
                                    </>
                                )

                            })}
                            <ScoreTable
                                type="total"
                                score={teamAState.score}
                            />

                            <br /><br />

                            <ScoreTable
                                type="header"
                                title="TEAM B"
                            />
                            {teamBState.state.map((item) => {
                                const { round, words, score } = item
                                return (
                                    <>
                                        <ScoreTable
                                            type="table"
                                            title="TEAM B"
                                            words={words}
                                            score={score}
                                            round={round}
                                        />
                                    </>
                                )

                            })}
                            <ScoreTable
                                type="total"
                                score={teamBState.score}
                            />
                        </> :
                        null
                }

                {!isFinal && mode === "game" ?
                    <>
                        <div className="score-table" style={{ maxWidth: "250px", borderRadius: "50px" }}>
                            <Row justify="center" >
                                <Col className="score-header" style={{ width: "150px", borderRadius: "50px" }}>TEAM {round.team}</Col>&nbsp;
                                <Col className="score-header" style={{ backgroundColor: "#8A2BE2", width: "50px", borderRadius: "50px" }}>{round.round}</Col>&nbsp;
                            </Row>
                        </div>
                        <br />
                        <button
                            className="button-home"
                            onClick={() => {
                                setIsStart(true)
                                setWords(initalCard)
                            }} >
                            <HomeFilled />
                        </button>
                    </>

                    :

                    // make home button show when final instead of play button
                    <button
                        className="button-home"
                        onClick={() => {
                            setIsStart(false)
                            setWords()
                            resetFunc()
                            setStop(false)
                            resetGame()
                        }}
                    >
                        <PlaySquareFilled />
                    </button>
                }

                {!isFinal && mode === "game" ?
                    <>
                        <Timer
                            refresh={refresh}
                            initialMinute="0"
                            initialSeconds="2"
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
                    isFinal={isFinal}
                    round={round}
                    setScores={(a) => { scores(a) }}
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
