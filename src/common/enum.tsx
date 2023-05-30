import { HomeOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import ClaireIcon from "../assets/font/font";

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
    Card = "card",
    /** 表格视图 */
    Table = "table",
}

/** 排序方式 */
export enum SortType {
    NONE = 0,
    /** 升序 */
    ASC = 1,
    /** 降序 */
    DESC = 2,
}

/** 书本标签 */
export enum BookLabels {
    /** 电子书 */
    E_Book = 'A',
    /** 实体书 */
    P_Book = 'B',
    /** code */
    CODE = 'C',
    /** 技能类 */
    SKILL = 'D',
    /** 知识类 */
    KNOWLEDGE = 'E',
    /** 实用类 */
    USEFUL = 'F',
    /** 其它 */
    OTHER = 'X',
}

export const Claire = {
    /** 主页显示 */
    name: "Claire",
    /** 单页数量 */
    pageSize: 8,
    /** 季节对应 */
    quarterMap: {
        [Quarter.Spring]: "春",
        [Quarter.Summer]: "夏",
        [Quarter.Autumn]: "秋",
        [Quarter.Winter]: "冬",
    },
    navigatorKey: {
        home: "home",
        clothes: "clothes",
        pants: "pants",
        books: "books",
    },
    bookLabelMap: {
        [BookLabels.E_Book]: "电子书",
        [BookLabels.P_Book]: "实体书",
        [BookLabels.CODE]: "code类",
        [BookLabels.SKILL]: "技能类",
        [BookLabels.OTHER]: "其它类",
        [BookLabels.KNOWLEDGE]: "知识类",
        [BookLabels.USEFUL]: "实用类",
    },
};

/** 导航 */
export const ClaireNavigator = (simple: boolean = false): MenuProps["items"] => [
    {
        label: <NavLink to="/">{simple ? '' : '主页'}</NavLink>,
        key: Claire.navigatorKey.home,
        icon: <HomeOutlined />,
    },
    {
        label: <NavLink to="/clothes">{simple ? '' : '衣服'}</NavLink>,
        key: Claire.navigatorKey.clothes,
        icon: (
            <ClaireIcon
                style={{ fontSize: "20px", margin: "0 -4px 0 -2px" }}
                type="icon-T-shirt"
            />
        ),
    },
    {
        label: <NavLink to="/pants">{simple ? '' : '裤子'}</NavLink>,
        key: Claire.navigatorKey.pants,
        icon: (
            <ClaireIcon
                style={{ fontSize: "20px", margin: "0 -3px 0 -2px" }}
                type="icon-kuzi"
            />
        ),
    },
    {
        label: <NavLink to="/books">{simple ? '' : '书籍'}</NavLink>,
        key: Claire.navigatorKey.books,
        icon: (
            <ClaireIcon
                style={{ fontSize: "18px", margin: "0 -4px 0 0" }}
                type="icon-wp-sj"
            />
        ),
    },
];
