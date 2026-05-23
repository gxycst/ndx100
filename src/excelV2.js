import fs from 'fs';
import XLSX from 'xlsx';

// 读取Excel文件
const workbook = XLSX.readFile('./csv/v.xlsx');
// 取第一个工作表
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
// 转成JSON数组
const rawData = XLSX.utils.sheet_to_json(worksheet);

const results = rawData.map(data => {
    // 处理百分号
    const rateStr = data["日增长率"].replace('%', '');
    const rate = parseFloat(rateStr);

    return {
        "日期": data["净值日期"],
        "开盘": parseFloat(data["单位净值"]),
        "收盘": parseFloat(data["单位净值"]),
        "涨跌幅": rate||0,
    };
});

// 反转数据（和你原来逻辑一致）
const finalData = results.reverse();

// 写入JSON
fs.writeFileSync('./resultV2.json', JSON.stringify(finalData, null, 2), 'utf8');
console.log('✅ 写入成功！文件：resultV2.json');