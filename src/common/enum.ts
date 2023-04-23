export const Claire = {
    /** 主页显示 */
    name: 'Claire',
    /** 单页数量 */
    pageSize: 8,
};

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
