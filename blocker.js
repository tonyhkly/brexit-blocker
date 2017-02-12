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
    deleteText("brexit");
    deleteText('article 50');
    deleteText('remain vote');
    deleteText('leave vote');
};

var blockImages = function() {
    var images = document.getElementsByTagName("img");

    for (var i = 0; i < images.length; i++) {
        var alt = images[i].alt;
        var src = images[i].src;

        var altContainsBrexit = alt && (alt.indexOf('brexit') != -1 || alt.indexOf('Brexit') != -1);
        var srcContainsBrexit = src && (src.indexOf('brexit') != -1 || src.indexOf('Brexit') != -1);

        var altContainsArticle50 = alt && (alt.indexOf("article50") || alt.indexOf("article-50") || alt.indexOf("article_50")) != -1;
        var srcContainsArticle50 = src && (src.indexOf("article50") || src.indexOf("article-50") || src.indexOf("article_50")) != -1;

        if (altContainsBrexit || altContainsArticle50 || srcContainsBrexit || srcContainsArticle50) {
            images[i].remove();
        }
    }
};

var blockATags = function() {
    var anchorTags = document.getElementsByTagName("a");

    for (var i = 0; i < anchorTags.length; i++) {
        var text = anchorTags[i].text;

        var hrefContainsBrexit = text && (text.indexOf('brexit') != -1 || text.indexOf('Brexit') != -1);
        var hrefContainsArticle50 = text && (text.indexOf("article50") || text.indexOf("article-50") || text.indexOf("article_50")) != -1;

        if (hrefContainsBrexit || hrefContainsArticle50) {
            anchorTags[i].remove();
        }
    }
};

var blockDivs = function() {
    var divTags = document.getElementsByTagName("div");

    for (var i = 0; i < divTags.length; i++) {
        var dataId = divTags[i].getAttribute('data-id');

        var hrefContainsBrexit = dataId && (dataId.indexOf('brexit') != -1 || dataId.indexOf('Brexit') != -1);
        var hrefContainsArticle50 = dataId && (dataId.indexOf("Article50") != -1 || dataId.indexOf("article50") != -1
            || dataId.indexOf("Article-50") != -1 || dataId.indexOf("Article_50") != -1
            || dataId.indexOf("article-50") != -1 || dataId.indexOf("article_50") != -1);

        if (hrefContainsBrexit || hrefContainsArticle50) {
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