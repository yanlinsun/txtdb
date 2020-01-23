'use strict';

const util = require('./util.js');

class TxtTable {
    constructor(tableName) {
        this.tableName = tableName;
        this.attributes = null;
        this._key = null;
        this.lines = new Map();
    }

    hasAttributes() {
        return !(this.attributes === null || this.attributes.length === 0);
    }

    setAttributes(line) {
        let items = util.parseLine(line);
        if (items) {
            this.attributes = items;
        }
        this._key = items[0];
    }

    addLine(line) {
        let items = util.parseLine(line);
        let obj = new Object();
        for (let i = 0; i < Math.min(items.length, this.attributes.length); i++) {
            obj[this.attributes[i]] = items[i];
        }
        obj.key = obj[this.attributes[0]];
        this.lines.set(this._key, obj);
    }

    counts() {
        return this.lines.size();
    }
}
