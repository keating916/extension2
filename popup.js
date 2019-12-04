console.log("loaded");
let section = document.getElementById("stringSection");
let p = document.createElement("h1");
section.appendChild(p);
let ret = () => {
    chrome.cookies.get({"url": "https://www.prifina.com/security.html", "name": "PrifinaKey"}, function(result) {
        let s = `Cookie Contents: ${result.value}`;
        p.textContent = s;
    })
}; //returns string set by set() in scripts.js and displays it in the popup
ret();


setInterval(function() {
    ret()
}, 1000) // looks for updated String 1/second
