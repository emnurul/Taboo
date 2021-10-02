// import '../../styles/panel.scss';
import { useCallback, useState } from 'react';
import { Row, Col } from 'antd';

import "antd/dist/antd.css";
import '../App.css';

const ScoreTable = (props) => {

    const { words, score, round, type } = props
    const title = props.title ? props.title : null
    // const type = props.type ? props.type : "table" //"table" or "header" or "final"
    const points = score === 1 ? "pt" : "pts"
    return (
        <div className="score-table">

            {
                type === "header" ?
                    <Row justify="center" className="score-header">
                        <Col span={8}>
                            {title}
                        </Col>
                    </Row> :
                    null
            }
            {
                type == "table" ?
                    <>
                        <Row justify="center">
                            <div className="total-score">Round {round} ({score} {points})</div>
                        </Row>
                        <Row className="score-body" justify="center" >
                            <Col span={8} className="score-data">
                                {words.map((item) => {
                                    return (
                                        <div className={item.type}>
                                            {item.word}<br />
                                        </div>
                                    )
                                })}
                            </Col>
                        </Row>

                    </> :
                    null
            }
            {
                type == "total" ?
                    <>
                        <Row justify="center">
                            <div className="total-score">Total : {score}</div>
                        </Row>
                    </> :
                    null
            }




        </div>
    )
}

export default ScoreTable;
