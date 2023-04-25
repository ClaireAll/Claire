import { HomeOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import ClaireIcon from "../assets/font/font";

export const Claire = {
    /** 主页显示 */
    name: "Claire",
    /** 单页数量 */
    pageSize: 8,
    /** 季节对应 */
    quarterMap: {
        1: "春",
        2: "夏",
        3: "秋",
        4: "冬",
    },
};

/** 导航 */
export const ClaireNavigator: MenuProps["items"] = [
    {
        label: <NavLink to="/">主页</NavLink>,
        key: "home",
        icon: <HomeOutlined />,
    },
    {
        label: <NavLink to="/clothes">衣服</NavLink>,
        key: "clothes",
        icon: (
            <ClaireIcon
                style={{ fontSize: "20px", margin: "0 -4px 0 -2px" }}
                type="icon-T-shirt"
            />
        ),
    },
    {
        label: <NavLink to="/pants">裤子</NavLink>,
        key: "pants",
        icon: (
            <ClaireIcon
                style={{ fontSize: "20px", margin: "0 -3px 0 -2px" }}
                type="icon-kuzi"
            />
        ),
    },
    {
        label: <NavLink to="/books">书籍</NavLink>,
        key: "books",
        icon: (
            <ClaireIcon
                style={{ fontSize: "18px", margin: "0 -4px 0 0" }}
                type="icon-wp-sj"
            />
        ),
    },
];

export enum Status {
    Error = "error",
    Success = "success",
    Done = "done",
    Uploading = "uploading",
    Removed = "removed",
}

/** 季节 */
export enum Quarter {
    Spring = 1,
    Summer = 2,
    Autumn = 3,
    Winter = 4,
}

/** 操作 */
export enum Operate {
    Add = 1,
    Delete = 2,
    Edit = 3,
    Query = 4,
}

/** 时间格式 */
export enum DateType {
    Y = "YYYY",
    M = "M",
    D = "D",
    Y_M = "YYYY-MM",
    Y_M_D = "YYYY-MM-DD",
    Y_M_D_H_M_S = "YYYY-MM-DD HH:MM:SS",
}

/** 排列方式 */
export enum ShowType {
    /** 卡片视图 */
    Card = 'card',
    /** 表格视图 */
    Table = 'table',
}
