/*
 * @FilePath: \fx-mentougou\src\shared\exportExcel.js
 * @Author: zhangxin
 * @Date: 2023-08-29 11:14:26
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-08-29 13:04:19
 * @Description:
 */
import * as FileSaver from "file-saver";
import * as XLSX from 'xlsx'

export function exportExcel(dom, title = 'Excel') {
    var excelTitle = title;
    var wb = XLSX.utils.table_to_book(document.querySelector(dom));
    /* 获取二进制字符串作为输出 */
    var wbout = XLSX.write(wb, { bookType: "xlsx", bookSST: true, type: "array" });
    try {
        FileSaver.saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            excelTitle + ".xlsx"
        );
    } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
    }
    return wbout;
}
