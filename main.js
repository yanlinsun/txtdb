'use strict';

const TxtDB = require('./src/txtdb.js');

async function load(dbname) {
    let db = new TxtDB(dbname);

    await db.ready();

    let tables = db.tables();

    for (let t of tables) {
        console.log(t.name);
        console.log('--------------');
        console.log(t.columns);
        let lines = t.rows;
        for (let l of lines) {
            console.log(l);
        }
    }
}

load('./sample.db');
