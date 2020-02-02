'use strict';

const expect = require('chai').expect;

const TxtDB = require('../src/txtdb.js');

suite('util', function() {
    test('one table db', async function() {
        let db = new TxtDB('one_table');
        await db.load('./test/ignore/one_table_db.txt');
        let tables = db.tables;
        expect(tables.length).to.equal(1);
        let t1 = tables[0];
        expect(t1.name).to.equal("Table1");
        expect(t1.columns.length).to.equal(2);
        expect(t1.columns[0]).to.equal("Surname");
        expect(t1.columns[1]).to.equal("FirstName");
        expect(t1.rows.length).to.equal(3);
        expect(t1.rows[0].Surname).to.equal("John");
        expect(t1.rows[0].FirstName).to.equal("Doe");
        expect(t1.rows[1].Surname).to.equal("Jane");
        expect(t1.rows[1].FirstName).to.equal("Dododo");
        expect(t1.rows[2].Surname).to.equal("Harry James");
        expect(t1.rows[2].FirstName).to.equal("Potter");
    });

    test('two table db', async function() {
        let db = new TxtDB('two tables');
        await db.load('./test/ignore/two_tables_db.txt');
        let tables = db.tables;
        expect(tables.length).to.equal(2);
        let t1 = tables[0];
        expect(t1.name).to.equal("Table1");
        expect(t1.columns.length).to.equal(2);
        expect(t1.columns[0]).to.equal("Surname");
        expect(t1.columns[1]).to.equal("FirstName");
        expect(t1.rows.length).to.equal(3);
        expect(t1.rows[0].Surname).to.equal("John");
        expect(t1.rows[0].FirstName).to.equal("Doe");
        expect(t1.rows[1].Surname).to.equal("Jane");
        expect(t1.rows[1].FirstName).to.equal("Dododo");
        expect(t1.rows[2].Surname).to.equal("Harry James");
        expect(t1.rows[2].FirstName).to.equal("Potter");
        let t2 = tables[1];
        expect(t2.name).to.equal("Table 2");
        expect(t2.columns.length).to.equal(2);
        expect(t2.columns[0]).to.equal("Material");
        expect(t2.columns[1]).to.equal("Price");
        expect(t2.rows.length).to.equal(3);
        expect(t2.rows[0].Material).to.equal("Wood");
        expect(t2.rows[0].Price).to.equal("1.0");
        expect(t2.rows[1].Material).to.equal("Metal");
        expect(t2.rows[1].Price).to.equal("2.0");
        expect(t2.rows[2].Material).to.equal("Stainless Steel");
        expect(t2.rows[2].Price).to.equal("3.0");
    });

});
