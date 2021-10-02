// import '../../styles/panel.scss';
import { useCallback, useState } from 'react';
import { Row, Col } from 'antd';
import ScoreTable from './scores'

import "antd/dist/antd.css";
import '../App.css';

const Card = (props) => {

    //const round = { team: "A", round: 1 }
    const { isStart, stopped, reset, round } = props

    const [index, setIndex] = useState(0);
    const [passes, setPasses] = useState(3);
    const [score, setScore] = useState(0);
    const [words, setWords] = useState([])

    const isStartWord = props.words?.word === "HOME"

    //TODO: grab words from DB
    const cards = [
        {
            word: "FINGERPRINT",
            taboo1: "HAND",
            taboo2: "MARK",
            taboo3: "EVIDENCE",
            taboo4: "CRIME",
            taboo5: "DUST"
        },
        {
            word: "TORNADO",
            taboo1: "TWISTER",
            taboo2: "WIND",
            taboo3: "TUNNEL",
            taboo4: "STORM",
            taboo5: "CYCLONE"
        },
        {
            word: "MUSUEM",
            taboo1: "ART",
            taboo2: "PAINTINGS",
            taboo3: "EXHIBITS",
            taboo4: "BUILDING",
            taboo5: "COLLECTION"
        }, {
            word: "BACHELOR",
            taboo1: "MAN",
            taboo2: "SINGLE",
            taboo3: "MARRIED",
            taboo4: "PARTNER",
            taboo5: "WIFE"
        }
    ]

    let card = props.words ? props.words : cards[index]
    const { word, taboo1, taboo2, taboo3, taboo4, taboo5 } = card


    function nextWord() {
        let newIndex;
        newIndex = cards.length === index + 1 ? 0 : index + 1
        setIndex(newIndex)
    }

    function setPassState(currentPass) {
        const passesNo = currentPass === 0 ? currentPass : currentPass - 1

        setPasses(passesNo)
    }

    if (reset) {
        setTimeout(() => {
            setWords([])
            nextWord()
            setPasses(3)
            setScore(0)
        }, 1);
    }

    let disabledButtons = false
    let disablePass = false
    if (stopped === true) {
        disabledButtons = true
        disablePass = true
    } else if (passes === 0) {
        disablePass = true
    }


    function setScoreState(type, word) {
        let currentScore = score
        words.push({
            word,
            type
        })
        switch (type) {
            case "taboo":
                currentScore -= 1
                break;
            case "correct":
                currentScore += 1
                break;
            default:
                currentScore = currentScore
                break;
        }
        setScore(currentScore)
    }

    return (
        <>
            {!isStartWord && stopped ?
                <div>
                    <ScoreTable
                        words={words}
                        score={score}
                        round={round.round}
                    />
                    <br />
                    <button
                        className="button-next"
                        onClick={() => props.setScores({
                            team: round,
                            words: words,
                            score: score
                        })}>
                        Next Round
                    </button>
                </div>
                :
                <>
                    <Row justify="center">
                        {/* <Col xs={24} sm={24} md={8} lg={8}></Col> */}
                        <Col span={7} className="button-left">

                            {isStart ?
                                null :
                                <div>
                                    <button
                                        className="button-taboo"
                                        disabled={disabledButtons}
                                        onClick={() => {
                                            setScoreState("taboo", word)
                                            nextWord(index, cards)
                                        }}>
                                        Taboo
                                    </button>
                                </div>
                            }
                        </Col>
                        <Col xs={10} md={8}>
                            <div>
                                <div className="card-title">
                                    {word}
                                </div>
                                <div className="card">
                                    <div>
                                        {taboo1}<br />
                                        {taboo2}<br />
                                        {taboo3}<br />
                                        {taboo4}<br />
                                        {taboo5}<br />
                                    </div>
                                </div>

                                {isStart ?
                                    null :
                                    <button
                                        className="button-pass"
                                        disabled={disablePass}
                                        onClick={() => {
                                            setScoreState("pass", word)
                                            nextWord(index, cards)
                                            setPassState(passes)
                                        }}
                                    > Pass ({passes})</button>
                                }
                            </div>

                        </Col>
                        <Col span={7} className="button-right">
                            {isStart ?
                                null :
                                <div>
                                    <button
                                        className="button-correct"
                                        disabled={disabledButtons}
                                        onClick={() => {
                                            setScoreState("correct", word)
                                            nextWord(index, cards)
                                        }}>
                                        Correct
                                    </button>
                                    <br />
                                    Score : {score}
                                </div>

                            }
                            <br />
                        </Col>
                    </Row>
                </>
            }

        </>
    )
}

export default Card;
