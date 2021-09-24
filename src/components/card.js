// import '../../styles/panel.scss';
import { useCallback, useState } from 'react';
import { Row, Col } from 'antd';

import "antd/dist/antd.css";
import '../App.css';

const Card = (props) => {

    const [index, setIndex] = useState(0);
    const [passes, setPasses] = useState(3);
    const [score, setScore] = useState(0);

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

    if (props.reset) {
        setTimeout(() => {
            setPasses(3)
            setScore(0)
        }, 1);
    }

    let disabledButtons = false
    let disablePass = false
    if (props.stopped === true) {
        disabledButtons = true
        disablePass = true
    } else if (passes === 0) {
        disablePass = true
    }


    function setScoreState(type) {
        let currentScore = score
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
            <Row justify="center">
                {/* <Col xs={24} sm={24} md={8} lg={8}></Col> */}
                <Col span={8} className="button-left">

                    {props.isStart ?
                        null :
                        <button
                            className="button-taboo"
                            disabled={disabledButtons}
                            onClick={() => {
                                setScoreState("taboo")
                                nextWord(index, cards)
                            }}>
                            Taboo
                        </button>
                    }
                </Col>
                <Col span={8}>
                    <div className="card-title">
                        {word}
                    </div>
                    <div className="card">

                        <div backgroundColor="white">
                            {taboo1}<br />
                            {taboo2}<br />
                            {taboo3}<br />
                            {taboo4}<br />
                            {taboo5}<br />
                        </div>
                    </div>

                    {props.isStart ?
                        null :
                        <button
                            className="button-pass"
                            disabled={disablePass}
                            onClick={() => {
                                nextWord(index, cards)
                                setPassState(passes)
                            }}
                        > Pass ({passes})</button>
                    }

                </Col>
                <Col span={8} className="button-right">
                    {props.isStart ?
                        null :
                        <button
                            className="button-correct"
                            disabled={disabledButtons}
                            onClick={() => {
                                setScoreState("correct")
                                nextWord(index, cards)
                            }}>
                            Correct
                        </button>
                    }
                    <br />
                    {/* TODO: make score not visible on start */}
                    Score : {score}
                </Col>
            </Row>
        </>
    )
}

export default Card;
