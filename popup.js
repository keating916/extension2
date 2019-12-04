//global variables:
const minutesForInterval=30;  //changes how often a new string is retrieved
const api = "https://api.punkapi.com/v2/beers/random";
let pk = null; //prifinaKey cookie

//popup items:
let section = document.getElementById("stringSection");
let p = document.createElement("h1");
section.appendChild(p);

//functions
   
let set = (string) => {
    chrome.cookies.set({"url": "https://www.prifina.com/security.html", "name": "PrifinaKey", "value": string, expirationDate: (new Date().getTime()/1000) + minutesForInterval*60}, function() {
        console.log("Cookie has been set")
    })
  } //sets cookie, expiration expires minutesForInterval minutes after being set

let ret = () => {
    chrome.cookies.get({"url": "https://www.prifina.com/security.html", "name": "PrifinaKey"}, function(result) {
        let s = `Cookie Contents: ${result.value}`;
        p.textContent = s;
    })
}; //Sets string in popup

setInterval(function() {
    ret()
}, 1000) // looks for updated String 1/second

let getApiString = () => {
  let response = fetch(api)
      .then(response => response.json())
      .then(data => {
        set(data[0].name);
      })
}//API call and string set

//Check for existing cookie, set if null
chrome.cookies.get({"url": "https://www.prifina.com/security.html", "name": "PrifinaKey"}, function(result) {
    pk = result.value;
    if(pk != null) {
        console.log("Cookie has been set already!")
    }else {
        console.log("Getting new Cookie Value");
        getApiString();//run on startup
    }
})

