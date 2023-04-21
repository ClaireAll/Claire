import { Card, ConfigProvider, Menu, MenuProps, Image } from "antd";
import { Component } from "react";
import './navigation.less';
import { NavLink } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
import avatar from '../../assets/img/avatar.png';
import ClaireIcon from "../../assets/font/font";

class Navigation extends Component {
    render() {
        const items: MenuProps['items'] = [
            {
                label: (<NavLink to="/">主页</NavLink>),
                key: 'home',
                icon: <HomeOutlined />,
            },
            {
                label: (<NavLink to="/clothes">衣服</NavLink>),
                key: 'clothes',
                icon: <ClaireIcon style={{ fontSize: '20px', margin: '0 -4px 0 -2px' }} type="icon-T-shirt" />,
            },
            {
                label: (<NavLink to="/pants">裤子</NavLink>),
                key: 'pants',
                icon: <ClaireIcon style={{ fontSize: '20px', margin: '0 -3px 0 -2px' }} type="icon-kuzi" />,
            },
            {
                label: (<NavLink to="/books">书籍</NavLink>),
                key: 'books',
                icon: <ClaireIcon style={{ fontSize: '18px', margin: '0 -4px 0 0' }} type="icon-wp-sj" />,
            },
        ];

        return (
            <Card bordered={false} className="navigation">
                <div className="header-container">
                    <Image preview={false} width={'10vh'} src={avatar} />
                    <span className="home-title">Claire.</span>
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