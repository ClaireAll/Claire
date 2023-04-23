import { Quarter } from "./common/enum";

/** 接口根地址 */
export const ROOT = "http://localhost:9000";

/**
 * 调用封装
 */

export function claireGet(url: string) {
    return fetch(`${ROOT}${url}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

export function claireDelete(url: string) {
    return fetch(`${ROOT}${url}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

export function clairePost(url: string, data: any) {
    return fetch(`${ROOT}${url}`, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "cors",
        headers: {
            contentType: "application/json",
        }
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
}


/**
 * 接口列表
 */

export interface ClothesAddData {
    /** 图片名称 */
    pic: string;
    /** 价格 */
    price: number;
    /** 适用季节 */
    quarter: Quarter;
}

/**
 * 额外的请求
 */
/**
 * http://localhost:9000/upload  post 传入文件 上传一张图片存到服务器
 */

/**
 * 添加衣服
 */
export function addClothes(data: ClothesAddData) {
    return clairePost("/clothes/add", data);
}

/**
 * 删除图片
 */
export function deleteOnePic(picName: string) {
    return claireDelete(`/delete/${picName}`);
}

export interface ClothesListQuery {
    /** 价格区间 */
    price: {
        min?: number;
        max?: number;
    };
    /** 适用季节 */
    quarters: Quarter[];
    /** 添加时间段 */
    addDate: {
        min?: string;
        max?: string;
    };
    page: number;
    pageSize: number;
}
/**
 * 分页获取衣服
 */
export function getClothesList(query: ClothesListQuery) {
    return clairePost("/clothes/list", query);
}
