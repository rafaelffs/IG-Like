chrome.browserAction.onClicked.addListener(function (tab) {
	
	chrome.tabs.executeScript(null, { file: "jquery.js" }, function() {

		
	    chrome.tabs.executeScript({
		code: 'javascript: (function () { var s = document.createElement("script"); s.setAttribute("src", "https://code.jquery.com/jquery-latest.min.js");    if (typeof jQuery == "undefined") {        document.getElementsByTagName("head")[0].appendChild(s);    }    jQuery("td.edit select option[value=BN]").attr("selected", "");})();',
		});
		
	   chrome.tabs.executeScript({
		code: "$('._qihym').click(); for (var i=0; i<5000; i++){ (function(ind) { setTimeout(function(){ if( document.getElementsByClassName('coreSpriteHeartOpen')[0] != null) {document.getElementsByClassName('coreSpriteHeartOpen')[0].click()} document.getElementsByClassName('coreSpriteRightPaginationArrow')[0].click()}, 1000 + (3000 * ind));		})(i);}",});
	});

	
});
