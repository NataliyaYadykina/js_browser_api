// console.log(document.documentElement); // <html>
// console.log(document.body); // <body>
// console.log(document.head); // <head>

// console.log(document.body.firstChild);
// console.log(document.body.lastChild);
// console.log(document.body.childNodes);
console.log(document.body.children);

// Сделае в переборе коллекции вывод проверки, является ли он div
// for (let val of document.body.children) {
//     console.log(val.localName === 'div' ? "this is div" : "this is not div");
// }

for (let val of document.body.childNodes) {
    console.dir(val.nodeType);
}
// // https://dom.spec.whatwg.org/#node

for (let val of document.body.childNodes) {
    console.dir(val.nodeValue);
}