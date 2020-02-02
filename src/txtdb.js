'use strict';

const once = require('events');
const fs = require('fs');
const readline = require('readline');
const TxtTable = require('./txttable.js');
const util = require('./util.js');

const Table = /Table:\s*(?:\[([^\]]+)\]|([^\s]+))/i;

class TxtDB {
    constructor(name) {
        this.name = name;
        this.__tables = new Map();
    }

    get tables() {
        return Array.from(this.__tables.values());
    }

    get(name) {
        return this.__tables.get(name);
    }

    load(filename) {
        if (!fs.existsSync(filename)) {
            throw new Error(filename + " does not exist");
        }
        try {
            this.reader = readline.createInterface({
                input: fs.createReadStream(filename),
                output: process.strout,
                console: false
            });
            this.reader.on('line', line => {
                line = line.replace(/^--.*$/g, ""); // remove comments
                if (line !== "") {
                    let tableName = line.match(Table);
                    if (tableName) {
                        let tabName = tableName[1] || tableName[2];
                        this.currTable = new TxtTable(tabName);
                        this.__tables.set(tabName, this.currTable);
                    } else {
                        if (this.currTable.columns.length > 0) {
                            this.currTable.addRow(line);
                        } else {
                            this.currTable.setColumns(line);
                        }
                    }
                }
            });
            return new Promise((resolve, reject) => {
                this.reader.once('close', () => {
                    resolve(true);
                });
            });
        } catch (err) {
            console.error(err);
        }
    }

    save(filename) {
        try {
            let writer = fs.createWriteStream(filename); 
            writer.on('ready', () => {
                let tables = this.tables().sort(this.compare);
                for (let i in tables) {
                    let t = tables[i];
                    writer.write('Table: ' + t.name);
                    let columns = t.columns;
                    writer.write(
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    compare(t1, t2) {
        return t1.name.localeCompare(t2.name);
    }
}

module.exports = TxtDB;
