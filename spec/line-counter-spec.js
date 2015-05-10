var LineCounter = require("../index.js");

describe("line-counter", function () {
    describe("should return line-number '1'", function () {
        it("for index '0'", function () {
            var lc = new LineCounter("abc\ndef");
            expect(lc.countUpTo(0)).toBe(1);
        });
        it("for the last character of before the new-line", function () {
            var lc = new LineCounter("abc\ndef");
            expect(lc.countUpTo(2)).toBe(1);
        });
        it("for the last character of before a CRLF", function () {
            var lc = new LineCounter("abc\r\ndef");
            expect(lc.countUpTo(2)).toBe(1);
        });
    });
    describe("should return line-number '2' for the first character after the first", function () {
        it("newline", function () {
            var lc = new LineCounter("abc\ndef\n");
            expect(lc.countUpTo(4)).toBe(2);
        });
        it("CRLF", function () {
            var lc = new LineCounter("abc\r\ndef\r\n");
            expect(lc.countUpTo(5)).toBe(2);
        });
        it("CR", function () {
            var lc = new LineCounter("abc\rdef\r");
            expect(lc.countUpTo(4)).toBe(2);
        })
    });

    describe("should return the line-number of the preceeding line", function () {
        it("for the newline-character itself.", function () {
            var lc = new LineCounter("abc\ndef\n");
            expect(lc.countUpTo(3)).toBe(1);
        });
        it("for the newline-character itself (also for line 2)", function () {
            var lc = new LineCounter("abc\ndef\nghi\n");
            expect(lc.countUpTo(7)).toBe(2);
        });
        it("for the LF of CRLF-line-ends", function () {
            var lc = new LineCounter("abc\r\ndef\r\nghi\r\n");
            expect(lc.countUpTo(4)).toBe(1);
        });
        it("for the CR of a CR-line-end", function () {
            var lc = new LineCounter("abc\rdef\rghi\r");
            expect(lc.countUpTo(3)).toBe(1);
        });
    });

    describe("should return correct line-number for the first index after the last", function () {
        it("newline", function () {
            var lc = new LineCounter("abc\ndef");
            expect(lc.countUpTo(4)).toBe(2);
        });
        it("CRLF", function () {
            var lc = new LineCounter("abc\r\ndef");
            expect(lc.countUpTo(5)).toBe(2);
        });
        it("CR", function () {
            var lc = new LineCounter("abc\rdef");
            expect(lc.countUpTo(4)).toBe(2);
        });
    });

    it("should return correct line-number for the last character in the string", function () {
        var lc = new LineCounter("abc\ndef");
        expect(lc.countUpTo(6)).toBe(2);
    });
});