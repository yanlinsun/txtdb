'use strict';

const ItemReg = /(?:\[([^\[\]]+)\])|([^\s]+)/g;

function parseLine(line) {
    let item;
    let array = [];
    while ((item = ItemReg.exec(line)) !== null) {
        let tmp = item[1] || item[2];
        array.push(tmp === "-" ? "" : tmp);
    }
    return array;
}

function printArray(ary) {
    for (let i in ary) {
        console.log(ary[i]);
    }
}

function trim(str) {
    return str.replace(/\s/g, "");
}

module.exports = { parseLine, printArray, trim };
