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

    for (var i = node.childNodes.length; i--;) // loop through all child nodes
        deleteText(needle, node.childNodes[i]);
};

//TODO for greater efficency, have the regex search for multiple text at once
var blockContent = function () {
    var blockedWords = ["brexit", "trump", "ivanka", "melania", "jared kushner", "eric trump", "donald trump jr"];

    deleteText("brexit");
    deleteText('trump');
};

window.addEventListener('load', function () {
    blockContent();
}, false);

document.addEventListener('DOMContentLoaded', function () {
    blockContent();
}, false);

// 1 Find image with alt text or src with Trump
// 2 Delete it
// });
