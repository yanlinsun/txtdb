'use strict';

const ItemReg = /[[^]]+]|[^s+]/g;

function parseLine(line) {
    let items = ItemReg.exec(line);
    if (items && items.length) {
        return items;
    }
    return null;
}
