/**
 * Create a new LineCounter instance counting lines in a given string.
 * The class provides a method `countUpTo` that pushes an internal counter
 * to the line of a specified char-index in the string.
 *
 * Example:
 *
 * ```js
 * var LineCounter = require('line-counter');
 * var lc = new LineCounter('abc\ncde\nefg');
 * lc.countUpTo(0); // == 1
 * lc.countUpTo(8); // == 3
 * ```
 *
 * @param {string} `contents` the string that is parsed (i.e. file contents)
 * @constructor
 * @api public
 */
function LineCounter(contents) {

    // Regex to determine line endings [see XML-1.0 Spec Chapter 2.11 End-of-Line Handling](http://www.w3.org/TR/REC-xml/#sec-line-ends)
    var lineRegex = /\r\n?|\n/mg;

    // The number of the current line (the value is one-based,
    // but in the beginning, we are not on the first line yet).
    var currentLine = 0;

    // The end of the current line (in the beginning, we assume,
    // that the line before the first line ends just before the string).
    var eolIndex = -1;

    /**
     * Returns the line-number of a given char-index within the string.
     *
     *
     * @param {number} `upTo` a char-index within the `contents`-string. This char-index must
     *    be greater or equals to the char-index passed to the previous call to `countUpTo`
     * @returns {number} the line-number of this char-index.
     * @api public
     */
    this.countUpTo = function (upTo) {
        // Go to the next line until the line
        // we hit the line following the 'upTo' index
        while (eolIndex < upTo) {
            currentLine++;
            // Find next line-end
            var match = lineRegex.exec(contents);
            if (match !== null) {
                // The end-of-line is the matched new-line character,
                // In case of a CRLF, it is the LF
                eolIndex = match.index + match[0].length - 1;
            } else {
                // If there is no match, then we are in the last line
                // so the eolIndex is the last character in the string.
                eolIndex = contents.length - 1;
            }
        }

        return currentLine;
    }
}

module.exports = LineCounter;