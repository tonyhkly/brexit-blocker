var deleteText = function (needle, node) {
    node = node || document.body;

    if (node.nodeName == 'SCRIPT') return;

/*    if (node.nodeName == 'DIV') {
        console.log('FOUND DIV');
    }

    if (node.nodeName == 'A') {
        console.log('FOUND A');
    }   */

    var isTextNode = node.nodeType == 3;
    if (isTextNode) {
        var parts = node.nodeValue.split(new RegExp('(' + needle + ')', 'i'));
        if (parts.length > 1) {
            var parent = node.parentNode;
            var newSpan = document.createElement('span');
            newSpan.className = 'textSearchFound';
            parent.parentNode.appendChild(newSpan);

            parent.remove();
        }
    }

    for (var i = node.childNodes.length; i--;) {
        deleteText(needle, node.childNodes[i]);
    }
};

//TODO only block on certain pages
//TODO for greater efficency, have the regex search for multiple text at once

var blockText = function() {
    //var blockedWords = ["brexit", "trump", "ivanka", "melania", "jared kushner", "eric trump", "donald trump jr"];

    deleteText("brexit");
    deleteText('trump');
};

var blockImages = function() {
    var images = document.getElementsByTagName("img");

    for (var i = 0; i < images.length; i++) {
        var alt = images[i].alt;
        var src = images[i].src;

        var altContainsBrexit = alt && (alt.indexOf('brexit') != -1 || alt.indexOf('Brexit') != -1);
        var srcContainsBrexit = src && (src.indexOf('brexit') != -1 || src.indexOf('Brexit') != -1);

        var altContainsTrump = alt && alt.indexOf("Trump") != -1;
        var srcContainsTrump = src && (src.indexOf("trump") != -1 || src.indexOf("Trump") != -1);

        if (altContainsBrexit || altContainsTrump || srcContainsBrexit || srcContainsTrump) {
            images[i].remove();
        }
    }
};

var blockATags = function() {
    var anchorTags = document.getElementsByTagName("a");

    for (var i = 0; i < anchorTags.length; i++) {
        var text = anchorTags[i].text;

        var hrefContainsBrexit = text && (text.indexOf('brexit') != -1 || text.indexOf('Brexit') != -1);
        var hrefContainsTrump = text && (text.indexOf("Trump") != -1 || text.indexOf("trump") != -1);

        if (hrefContainsBrexit || hrefContainsTrump) {
            anchorTags[i].remove();
        }
    }
};

var blockDivs = function() {
    var divTags = document.getElementsByTagName("div");

    for (var i = 0; i < divTags.length; i++) {
        var dataId = divTags[i].getAttribute('data-id');

        var hrefContainsBrexit = dataId && (dataId.indexOf('brexit') != -1 || dataId.indexOf('Brexit') != -1);
        var hrefContainsTrump = dataId && (dataId.indexOf("Trump") != -1 || dataId.indexOf("trump") != -1);

        if (hrefContainsBrexit || hrefContainsTrump) {
            divTags[i].remove();
        }
    }
};

var blockContent = function() {
    blockText();
    blockImages();
    blockATags();
    blockDivs();
};

window.addEventListener('load', function() {
    blockContent();
}, false);

var hardCodedDivRemovals = function() {
    var $textSearchFound = $(".textSearchFound");

    if ($textSearchFound) {
        $textSearchFound.parents('.top-story__wrapper').remove();
        $textSearchFound.parents('.sparrow-item').remove();
        $textSearchFound.parents('.pukeko-item').remove();
        $textSearchFound.parents('.nw-c-top-stories-primary__story').remove();
        $textSearchFound.parents('.story_card').remove();
        $textSearchFound.parents('.fc-item__container').remove();
    }
};

document.addEventListener('DOMContentLoaded', function() {
    blockContent();
    hardCodedDivRemovals();
}, false);