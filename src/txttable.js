'use strict';

const util = require('./util.js');

class TxtTable {
    constructor(tableName) {
        this.tableName = tableName;
        this.attributes = [];
        this._key = null;
        this.lines = new Map();
    }

    get name() {
        return this.tableName;
    }

    get key() {
        return this._key;
    }

    setColumns(line) {
        let items = util.parseLine(line);
        if (items) {
            for (let i in items) {
                this.attributes.push(util.trim(items[i]));
            }
        }
        if (this.attributes.length > 0) {
            this._key = this.attributes[0];
        }
    }

    addRow(line) {
        let items = util.parseLine(line);
        let obj = new Object();
        for (let i = 0; i < Math.min(items.length, this.attributes.length); i++) {
            obj[this.attributes[i]] = items[i];
        }
        obj.key = obj[this._key];
        this.lines.set(obj.key, obj);
    }

    get rows() {
        return Array.from(this.lines.values());
    }

    get columns() {
        return Array.from(this.attributes.values());
    }

    get count() {
        return this.lines.size();
    }
}

module.exports = TxtTable;
