import { Card, ConfigProvider, Menu, MenuProps } from "antd";
import { Component } from "react";
import './navigation.less';
import { NavLink } from "react-router-dom";
import { DatabaseOutlined, HomeOutlined } from '@ant-design/icons';

class Navigation extends Component {
    render() {
        const items: MenuProps['items'] = [
            {
                label: (<NavLink to="/">主页</NavLink>),
                key: 'plant family',
                icon: <HomeOutlined />,
            },
            {
                label: (<NavLink to="/plant_family">植物科属</NavLink>),
                key: 'plant family2',
                icon: <DatabaseOutlined />,
            },
        ];

        return (
            <Card bordered={false} className="navigation">
                <div style={{height: '10vh', marginBottom: '24px'}}>
                    <h1>Plant.</h1>
                </div>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: getComputedStyle(document.documentElement).getPropertyValue('--theme-color')
                        },
                    }}
                >
                    <nav>
                        <Menu
                            mode="inline"
                            items={items}
                        />
                    </nav>
                </ConfigProvider>

            </Card>
        );
    }
}

export default Navigation;