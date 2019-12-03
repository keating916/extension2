chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'www.prifina.com', pathContains: 'security'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
  }
);  //Only show popup on "Prifina.com/security.html"

let minutesForInterval=10;  //changes how often a new string is retrieved

let api = "https://api.punkapi.com/v2/beers/random"
   
let set = (string) => {
  chrome.cookies.set({"url": "prifina.com", "name": "PrifinaKey", "value": string, expirationDate: (new Date().getTime()/1000) + minutesForInterval*60}, function() {
      console.log("Cookie has been set")
  })
} //sets cookie, expiration expires minutesForInterval minutes after being set

let getApiString = () => {
  let response = fetch(api)
      .then(response => response.json())
      .then(data => {
        set(data[0].name);
      })
}//API call and string set
getApiString();//run on startup

chrome.runtime.onInstalled.addListener(function() {
  setInterval(function() {
    getApiString()}, 1000*60*minutesForInterval);
});//run after startup on interval
