var deleteText = function (needle, node) {
    node = node || document.body;

    if (node.nodeName == 'SCRIPT') return;

    if (node.nodeType == 3) { // if node type is text, search for our needle
        var parts = node.nodeValue.split(new RegExp('(' + needle + ')', 'i'));
        if (parts.length > 1) { // if we found our needle
            var parent = node.parentNode;
            parent.remove();
        }
    }

    for (var i = node.childNodes.length; i--;) { // loop through all child nodes
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
        var alt = images[i].getAttribute('alt');
        var src = images[i].getAttribute('src');

        console.log(src);

        var altContainsBrexit = alt && (alt.indexOf('brexit') != -1 || alt.indexOf('Brexit') != -1);
        var srcContainsBrexit = src && (src.indexOf('brexit') != -1 || src.indexOf('Brexit') != -1);

        var altContainsTrump = alt && alt.indexOf("Trump") != -1;
        var srcContainsTrump = src && src.indexOf("trump") != -1 || src.indexOf("Trump") != -1;

        if (altContainsBrexit || altContainsTrump || srcContainsBrexit || srcContainsTrump) {
            images[i].remove();
        }
    }
};

var blockContent = function() {
    blockText();
    blockImages();
};

window.addEventListener('load', function() {
    blockContent();
}, false);

document.addEventListener('DOMContentLoaded', function() {
    blockContent();
}, false);