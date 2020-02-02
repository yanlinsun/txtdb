const expect = require('chai').expect;

const util = require('../src/util.js');

suite('util', function() {
    test('one word', function() {
        let str = "word";
        let items = util.parseLine(str);
        expect(items).to.be.not.undefined;
        expect(items.length).to.equal(1);
        expect(items[0]).to.equal("word");
    });

    test('two words', function() {
        let str = "word1 word2";
        let items = util.parseLine(str);
        expect(items).to.be.not.undefined;
        expect(items.length).to.equal(2);
        expect(items[0]).to.equal("word1");
        expect(items[1]).to.equal("word2");
    });

    test('special chars', function() {
        let str = "word_1 word,2 word-3 word.4 word(5) word&6 word$7 word#8 word@9 word!10 word>11 word<12 word;13 word'14 word\"15 word[16 word]17 word|18 word+19 word=20";
        let items = util.parseLine(str);
        expect(items).to.be.not.undefined;
        expect(items.length).to.equal(20);
        expect(items[0]).to.equal("word_1");
        expect(items[1]).to.equal("word,2");
        expect(items[2]).to.equal("word-3");
        expect(items[3]).to.equal("word.4");
        expect(items[4]).to.equal("word(5)");
        expect(items[5]).to.equal("word&6");
        expect(items[6]).to.equal("word$7");
        expect(items[7]).to.equal("word#8");
        expect(items[8]).to.equal("word@9");
        expect(items[9]).to.equal("word!10");
        expect(items[10]).to.equal("word>11");
        expect(items[11]).to.equal("word<12");
        expect(items[12]).to.equal("word;13");
        expect(items[13]).to.equal("word'14");
        expect(items[14]).to.equal("word\"15");
        expect(items[15]).to.equal("word[16");
        expect(items[16]).to.equal("word]17");
        expect(items[17]).to.equal("word|18");
        expect(items[18]).to.equal("word+19");
        expect(items[19]).to.equal("word=20");
    });

    test('one bracket word', function() {
        let str = "[word break]";
        let items = util.parseLine(str);
        expect(items).to.be.not.undefined;
        expect(items.length).to.equal(1);
        expect(items[0]).to.equal("word break");
    });

    test('two bracket words', function() {
        let str = "[word break] [word break2]";
        let items = util.parseLine(str);
        expect(items).to.be.not.undefined;
        if (items.length !== 2) {
            util.printArray(items);
        }
        expect(items.length).to.equal(2);
        expect(items[0]).to.equal("word break");
        expect(items[1]).to.equal("word break2");
    });

    test('mixed words', function() {
        let str = "word break [word break2] anot[her]word [word3 [word5] ]word[4";
        let items = util.parseLine(str);
        expect(items).to.be.not.undefined;
        if (items.length !== 7) {
            util.printArray(items);
        }
        expect(items.length).to.equal(7);
        expect(items[0]).to.equal("word");
        expect(items[1]).to.equal("break");
        expect(items[2]).to.equal("word break2");
        expect(items[3]).to.equal("anot[her]word");
        expect(items[4]).to.equal("[word3");
        expect(items[5]).to.equal("word5");
        expect(items[6]).to.equal("]word[4");
    });

    test('empty string', function() {
        let str = "- - -";
        let items = util.parseLine(str);
        expect(items).to.be.not.undefined;
        expect(items.length).to.equal(3);
        expect(items[0]).to.equal("");
        expect(items[1]).to.equal("");
        expect(items[2]).to.equal("");
    });

    test('invalid cases', function() {
        let str = "[word]3";
        let items = util.parseLine(str);
        expect(items).to.be.not.undefined;
        expect(items.length).to.equal(2);
        expect(items[0]).to.equal("word");
        expect(items[1]).to.equal("3");
    });
});
