const Liner = (function() {
    'use strict';

    // "Private" variable for storing the main headline container (for example an <h1></h1>)
    let _textContainer = '';
    let _spansClassName = '';

    // Spliting one or multiple sentences into letters
    function _splitTextToLetters(text = ''){
        const letters = text.split('');
        _textContainer.innerHTML = '';

        _addLettersInSpans(letters);
    }

    // Re-appending every letter in a <span></span> element to the text container
    function _addLettersInSpans(letters = []){
        letters.map( letter => {
            const span = document.createElement('span');
            span.textContent = letter;
            _textContainer.appendChild(span);
        });

        _getLines();
    }

    // Selecting the appended spans, and creating the every line
    function _getLines() {
        const spans = [..._textContainer.querySelectorAll('*')];
        let defaultOffsetTop = spans[0].offsetTop;
        let currentText = '';
        let lines = [];

        spans.map( span => {
            if(defaultOffsetTop === span.offsetTop){
                currentText += span.textContent;
            }else{
                lines.push(currentText);
                currentText = span.textContent;

                if(span.offsetTop !== 0)
                    defaultOffsetTop = span.offsetTop;
            }
        });

        lines.push(currentText);
        _textContainer.innerHTML = '';
        _addLinesToHeadline(lines);
    }

    // Creating spans around every line, giving them custom classnames and reappending to the text container
    function _addLinesToHeadline(lines = []) {
        lines.map( (line, i) => {
            const spanLine = document.createElement('span');
            spanLine.className = `${_spansClassName}-${i}`;
            spanLine.textContent = line;
            _textContainer.appendChild(spanLine);
        });
    }

    return {
        // Initing the module, starting with selecting the text container and assigning it to a private variable
        init: function(headlineNode, className = 'liner-line') {

            if(typeof className !== 'string'){
                console.error('The "className" argument must be a type of string');
                return;
            }

            _spansClassName = className;
            _textContainer = document.querySelector(headlineNode);

            if(!_textContainer){
                console.error('Text container not found in DOM');
                return;
            }

            _splitTextToLetters(_textContainer.textContent);
        }
    }
})();