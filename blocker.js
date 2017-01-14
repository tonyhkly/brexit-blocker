var deleteText = function (needle, node) {
    console.log('Method called');
    node = node || document.getElementById('page');

    if (node.nodeName == 'SCRIPT') return;

    if (node.nodeType == 3) { // if node type is text, search for our needle
        var parts = node.nodeValue.split(new RegExp('(' + needle + ')', 'i'));
        if (parts.length > 1) { // if we found our needle
            var parent = node.parentNode;
            parent.remove();
        }
    }

    //for (var i = node.childNodes.length; i--;) // loop through all child nodes
    //    deleteText(needle, node.childNodes[i]);
};

window.addEventListener('load', function () {
    console.log('All content loaded');

    deleteText("brexit");
    deleteText("trump");

}, false);

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM content has loaded');
    deleteText("brexit");
    deleteText('trump');

}, false);

/*

 document.addEventListener('DOMContentLoaded', function () {
 console.log('DOM content has loaded');

 //http://stackoverflow.com/questions/22305154/replace-text-inside-an-element-with-text-containing-html-without-removing-html

 var highlightSomeText = function (needle, node) {
 node = node || document.body;

 if (node.nodeName == 'SCRIPT') return;

 if (node.nodeType == 3) { // if node type is text, search for our needle
 var parts = node.nodeValue.split(needle); // split text by our needle
 if (parts.length > 1) { // if we found our needle
 var parent = node.parentNode;
 for (var i = 0, l = parts.length; i < l;) {
 var newText = document.createTextNode(parts[i++]); // create a new text node, increment i
 parent.insertBefore(newText, node);
 if (i != l) { // if we're not on the last part, insert a new span element for our highlighted text
 var newSpan = document.createElement('span');
 newSpan.className = 'textSearchFound';
 newSpan.style.color = '#0095DA';
 newSpan.innerHTML = needle;
 newSpan.remove();
 parent.insertBefore(newSpan, node);
 }
 }
 parent.remove(); // delete the original text node
 }
 }

 for (var i = node.childNodes.length; i--;) // loop through all child nodes
 highlightSomeText(needle, node.childNodes[i]);
 };

 highlightSomeText('Trump');
 }, false);
 */


//document.addEventListener('load', function() {
//    var aTags = document.getElementsByTagName("a");
//
//    for (tag in aTags) {
//        console.log("a tag")
//    }
//}, false);


// $(document).ready(function(){
//   console.log('Removing elements on page load');
//   var trumps = $(":contains('Trump')")
//
//   trumps.remove();

// for (trump in trumps) {
//   console.log(trump);
//   // trump.css( "text-decoration", "underline" );
// }


// $("div:contains('Trump')").parents('.top-story__wrapper').remove();
// $("div:contains('Trump')").parents('.top-story').remove();
// $("div:contains('Brexit')").parents('.top-story').remove();
// $("div:contains('brexit')").parents('.top-story').remove();
// $("div:contains('Brexit')").parents('.top-story__wrapper').remove();
// $("div:contains('brexit')").parents('.top-story__wrapper').remove();
//
// $("div:contains('Trump')").parents('.sparrow-item').remove();
// $("li:contains('Trump')").parents('.most-popular-list-item').remove();
//
// $("div:contains('Brexit')").parents('.gel-layout__item').remove();
// $("div:contains('brexit')").parents('.gel-layout__item').remove();


// 1 Find element with trump in it
// 2 Delete text

// 1 Find image with alt text or src with Trump
// 2 Delete it
// });
