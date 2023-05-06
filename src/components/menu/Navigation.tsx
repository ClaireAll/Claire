import { Card, Menu, Image } from "antd";
import "./navigation.less";
import avatar from "../../assets/img/avatar.png";
import { Claire, ClaireNavigator } from "@enum";
import { HomeContext } from "../../provider/HomeProvider";
import { useContext } from "react";

export function Navigation() {
    const { fold } = useContext(HomeContext);

    return (
        <Card bordered={false} className="navigation">
            <div className="header-container">
                <Image preview={false} width={"10vh"} src={avatar} />
                <span style={{display: fold ? 'none' : 'inherit'}}>{Claire.name}</span>
            </div>
            <nav>
                <Menu className={`${fold ? 'simple' : ''}`} defaultSelectedKeys={[Claire.navigatorKey.home]} mode="inline" items={ClaireNavigator(fold)} />
            </nav>
        </Card>
    );
}
