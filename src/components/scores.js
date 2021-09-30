// import '../../styles/panel.scss';
import { useCallback, useState } from 'react';
import { Row, Col } from 'antd';

import "antd/dist/antd.css";
import '../App.css';

const ScoreTable = (props) => {

    const { words, score } = props
    const points = score === 1 ? "pt": "pts"
    return (
        <div className="score-table">
            <Row justify="center" className="score-header">
                {/* <Col xs={24} sm={24} md={8} lg={8}></Col> */}
                <Col span={8}>
                    TEAM A
                </Col>
            </Row>
            <Row justify="center">
                <div className="total-score">Round : 1 ({score} {points})</div>
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
            <Row justify="center">
                <div className="total-score">Total : {score}</div>
            </Row>
        </div>
    )
}

export default ScoreTable;
