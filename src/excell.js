import fs from 'fs'

import csv from 'csv-parser'
const results = [];
function getNumber(str,replaceStr=','){
    const reg = new RegExp(replaceStr, 'g');
    return parseFloat(str.replace(reg, ''));
}
fs.createReadStream('./csv/ndx.csv') // 你的CSV文件
    .pipe(csv()) // 直接解析
    .on('data', (data) => results.push({
        "日期":data[Object.keys(data)[0]],
        "开盘":getNumber(data["开盘"]),
        "收盘":getNumber(data["收盘"]),
        "涨跌幅":getNumber(data["涨跌幅"],'%'),
    })) // 每一行变成对象
    .on('end', () => {
        console.log(results.reverse()); // 最终是 JSON 数组
    });