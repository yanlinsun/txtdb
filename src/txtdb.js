'use strict';

const fs = require('fs');
const readline = require('readline');
const TxtTable = require('./txttable.js');

const Table = new RegExp("Table:(?:[([^]]+)]|([^\s]+))", "i");

class txtdb {
    constructor(filename) {
        this.filename = filename;
        reader = readline.createInterface({
            input: fs.createReadStream(this.filename),
            output: process.strout,
            console: false
        });
        reader.on('line', line => {
            line = line.replace(/^--.*$/g, ""); // remove comments
            let tableName = line.match(Table);
            if (tableName) {
                if (!this.currTable) {
                    this.currTable = new TxtTable(tableName.1 | tableName.2);
                }
            } else {
                let words = parseWords(line);
                if (this.currTable.hasAttributes()) {
                    this.currTable.addLine(line);
                } else {
                    this.currTable.setAttributes(line);
                }
            }
        });
    }
}

