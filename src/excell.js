import fs from 'fs'

import csv from 'csv-parser'
const results = [];
function getNumber(str,replaceStr=','){
    const reg = new RegExp(replaceStr, 'g');
    return parseFloat(str.replace(reg, ''));
}
fs.createReadStream('./csv/n225.csv') // 你的CSV文件
    .pipe(csv()) // 直接解析
    .on('data', (data) => results.push({
        "日期":data[Object.keys(data)[0]],
        "开盘":getNumber(data["开盘"]),
        "收盘":getNumber(data["收盘"]),
        "涨跌幅":getNumber(data["涨跌幅"],'%'),
    })) // 每一行变成对象
    .on('end', () => {
        // 反转数据
        const finalData = results.reverse();

        // ✅ 写入 json 文件
        fs.writeFileSync('./result.json', JSON.stringify(finalData, null, 2), 'utf8');

        console.log('✅ 写入成功！文件：result.json');
        console.log(finalData);
    });