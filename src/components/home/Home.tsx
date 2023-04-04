import { Component } from "react";
import { Routes, Route, NavLink } from 'react-router-dom';
import PlantFamily from "../plant_family/PlantFamily";
import { Col, Row } from "antd";
import './home.less';

class PlatHome extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={this.createHome()} />
                <Route path="/plant_family" element={<PlantFamily />} />
            </Routes>
        )
    }

    private createHome() {
        return (
            <div style={{margin: '24px'}} className="plant-home">
                {this.createHeader()}
                {this.createPics()}
            </div>
        );
    }

    private createHeader() {
        return (
            <Row gutter={20} style={{height: '10vh', marginBottom: '24px'}}>
                <Col span={18}>
                    <div>
                    <h1 style={{marginBottom: '5px'}}>Welcome to Plant.</h1>
                    <span className="tip">Hello Claire, welcome back!</span>
                    </div>
                </Col>
                <Col span={2}>对话</Col>
                <Col span={2}>提醒</Col>
                <Col span={2}>头像</Col>
            </Row>
        );
    }

    private createPics() {
        return (
            <Row gutter={20} style={{height: '30vh'}}>
                <Col span={16}>
                    <div className="img1">
                        <h2>Create and sell extraordinary products</h2>
                        <p>The world's first and largest handmode products marketplace</p>
                        <NavLink className="btn1" to="/">Explore More</NavLink>
                        <NavLink className="btn2" to="/">Top Sellers</NavLink>
                    </div>
                </Col>
                <Col span={8}>
                    <div className="right_pane">
                        <div className="img2"></div>
                    </div>
                </Col>
            </Row>
        );
    }

    private create
}

export default PlatHome;