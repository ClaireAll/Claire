/**
 * 公共方法
 */

import { DateType } from "@enum";

/** 获取格式化的时间 */
export function getFormatDate(timeStamp: string, type?: DateType) {
    if (!timeStamp) {
        return "";
    }

    const format = (n: number) => (n < 10 ? `0${n}` : n);
    const date = new Date(parseInt(timeStamp));
    const year = date.getFullYear();
    const month = format(date.getMonth() + 1);
    const day = format(date.getDate());
    const hour = format(date.getHours());
    const minute = format(date.getMinutes());
    const second = format(date.getSeconds());

    switch (type) {
        case DateType.Y:
            return year;
        case DateType.M:
            return month;
        case DateType.D:
            return day;
        case DateType.Y_M:
            return `${year}-${month}`;
        case DateType.Y_M_D_H_M_S:
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        default:
            return `${year}-${month}-${day}`;
    }
}
