import { Quarter } from "./common/enum";

export const ROOT = "http://localhost:9000";

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

export interface ClothesAddData {
    /** 图片名称 */
    pic: string;
    /** 价格 */
    price: number;
    /** 适用季节 */
    quarter: Quarter;
}

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
