chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'www.prifina.com', pathContains: 'security'},
        }),
		new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'github.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
  }
);  //Only show popup on "Prifina.com/security.html and Github.com"


