console.log("loaded");
let section = document.getElementById("stringSection");
let p = document.createElement("h1");
section.appendChild(p);
let ret = () => {
    chrome.cookies.get({"name": "Prifina"}, function(result) {
        let s = `requesting: ${result.value}`;
        p.textContent = s;
    })
}; //returns string set by set() in scripts.js and displays it in the popup
ret();

/*
setInterval(function() {
    ret()
}, 1000) // looks for updated String 1/second
*/
