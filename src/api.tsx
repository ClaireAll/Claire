import { Quarter, SortType } from "@enum";

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

export function claireMultiDelete(url: string, data: any) {
    return fetch(`${ROOT}${url}`, {
        method: "DELETE",
        body: JSON.stringify(data),
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
        },
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

export interface ClothesEditData extends ClothesAddData {
    id: string;
}

/**
 * 编辑衣服
 */
export function editClothes(data: ClothesEditData) {
    return clairePost("/clothes/edit", data);
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
        sort?: SortType;
    };
    /** 适用季节 */
    quarters: Quarter[];
    /** 添加时间段 */
    addDate: {
        min?: string;
        max?: string;
        sort?: SortType;
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

/**
 * 删除衣服/批量
 * @param data list[{id: ,src: 图片名称}]
 * @returns
 */
export function deleteClothes(data: { id: string; src: string }[]) {
    return claireMultiDelete("/clothes/delete", data);
}

/**
 * 添加裤子
 */
export function addPants(data: ClothesAddData) {
    return clairePost("/pants/add", data);
}

/**
 * 编辑裤子
 */
export function editPants(data: ClothesEditData) {
    return clairePost("/pants/edit", data);
}

/**
 * 分页获取裤子
 */
export function getPantsList(query: ClothesListQuery) {
    return clairePost("/pants/list", query);
}

/**
 * 删除裤子/批量
 */
export function deletePants(data: { id: string; src: string }[]) {
    return claireMultiDelete("/pants/delete", data);
}
