import { Button, Col, Row } from "antd";
import { PlatHome } from "./plathome.tsx/PlatHome";
import { Navigation } from "../menu/Navigation";
import "./home.less";
import { useState } from "react";
import { LeftCircleOutlined } from "@ant-design/icons";
import { HomeContext } from "../../provider/HomeProvider";

export function ClaireHome() {
    const [fold, setFold] = useState<boolean>(false);

    return (
        <HomeContext.Provider value={{ fold }}>
            <Row wrap={false} className="claire-home">
                <Col span={fold ? 2 : 5} className="claire-navigation">
                    <div className="claire-navigation">
                        <Navigation />
                        {/* 折叠菜单面板按钮 */}
                        <Button
                            type="dashed"
                            className="fold-icon"
                            shape="circle"
                            icon={<LeftCircleOutlined />}
                            onClick={() => {
                                setFold(!fold);
                            }}
                        />
                    </div>
                </Col>
                <Col span={fold ? 22 : 19} className="claire-content">
                    <PlatHome />
                </Col>
            </Row>
        </HomeContext.Provider>
    );
}
