import { Card, Menu, Image } from "antd";
import { Component } from "react";
import "./navigation.less";
import avatar from "../../assets/img/avatar.png";
import { Claire, ClaireNavigator } from "@enum";

class Navigation extends Component {
    render() {
        return (
            <Card bordered={false} className="navigation">
                <div className="header-container">
                    <Image preview={false} width={"10vh"} src={avatar} />
                    <span className="home-title">{Claire.name}</span>
                </div>
                <nav>
                    <Menu mode="inline" items={ClaireNavigator} />
                </nav>
            </Card>
        );
    }
}

export default Navigation;
