import { resolve } from "path";
import propertiesReader from "properties-reader";
import md5 from "./md5.min";
import axios from "axios";
import { appendFileSync, writeFileSync } from "fs";

// 百度翻译Api 中文翻译成英文 是一个辅助功能插件
require("dotenv").config();
const apiUrl = "http://api.fanyi.baidu.com/api/trans/vip/translate";
const appid = "20230403001626016";
const secret = "MsM1CJ75ygg4lUu_T5Xl";

const translate = (q: string) => {
    const salt = Math.random();
    const sign = md5(appid + q + salt + secret);
    const params = {
        q,
        from: "zh",
        to: "en",
        salt,
        appid,
        sign,
    };

    return axios.get(apiUrl, {
        params,
    });
};

function transformZhToEn() {
    const ch = propertiesReader(resolve(__dirname, "../i18n/ch.properties"));
    const en = propertiesReader(resolve(__dirname, "../i18n/en.properties"));
    const chMap: Record<string, string> = {};
    const gapMap: Record<string, string> = {};
    const enMap: Record<string, string> = {};
    ch.each((key: any, value: any) => {
        chMap[key] = value;
        !en.get(key) && (gapMap[key] = value);
    });

    // 排序
    function sortFile() {
        // 中文
        let sortedCh = "";
        Object.keys(chMap)
            .sort((a, b) => a.localeCompare(b))
            .forEach((key) => {
                sortedCh += `${key}=${chMap[key]}\n`;
            });
        writeFileSync(resolve(__dirname, "./ch.properties"), sortedCh);

        // 英文
        let sortedEn = "";
        Object.keys(chMap)
            .sort((a, b) => a.localeCompare(b))
            .forEach((key) => {
                sortedEn += `${key}=${en.get(key) || enMap[key]}\n`;
            });
        writeFileSync(resolve(__dirname, "./en.properties"), sortedEn);
    }

    console.log(gapMap);

    Object.keys(gapMap).length !== 0 &&
        translate(Object.values(gapMap).join("#")).then((res: any) => {
            const result = res.data.trans_result[0].dst.split("#");
            let text = "";
            Object.keys(gapMap).forEach((key, i) => {
                enMap[key] = result[i];
                text += `${key}=${result[i].trim()}\n`;
            });
            text && appendFileSync(resolve(__dirname, "./en.properties"), text);
            sortFile();
        });
}

transformZhToEn();
