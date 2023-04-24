setTimeout(function () {
    if (total != 0) {
        //document.querySelectorAll('div > div > div:nth-child(1) > div:nth-child(1) > a > div')[0].click()
		document.getElementsByClassName("_aabd _aa8k  _al3l")[0].firstChild.click();
        for (var i = 0; i < (total * 2); i++) {
            (function (ind) {
                setTimeout(function () {
                    if (total != 0) {
						//alert('1');
						//alert(document.querySelectorAll('article section svg')[0].ariaLabel);
                        if (document.querySelectorAll('article section svg')[0].ariaLabel == "Curtir") {
                          //  alert('2');	
							obterInformacoesUsuario('user', function (usuario) {
							//	alert('3');
                                salvarInformacoesUsuario('user', ('user', { qtd: total--, data: usuario.data }));
								//alert($('body > div > div > div > article > div > div > div > div > div > section > span > button'));		
                                document.querySelectorAll('article section svg')[0].parentNode.parentNode.click();
                            });
                        }
                        else if (document.querySelectorAll('svg[aria-label="Avançar"]')[0].parentElement) {
							//alert('4');
                            document.querySelectorAll('svg[aria-label="Avançar"]')[0].parentElement.click();
                        }
                        else {
                            if (window.confirm("The page is broken, press OK to reload the page")) {
                                location.reload();
                            }
                        }
                    }
                     else {
                        if (window.confirm("Your likes are over. Wait to reload next day.")) {
                            obterInformacoesUsuario('user', function (usuario) {
                                salvarInformacoesUsuario('user', ('user', { qtd: 0, data: usuario.data }));
                            });
                            location.reload();
                        }
                    }
                }, 1000 + ((Math.floor(Math.random() * 6000) + 5000) * ind));
            })(i)
        };
    }
    else {
        if (window.confirm("You don't have any likes remaining. Wait to reaload next day.")) {
            obterInformacoesUsuario('user', function (usuario) {
                salvarInformacoesUsuario('user', ('user', { qtd: 0, data: usuario.data }));
            });
        }
    }
}, 500);

function salvarInformacoesUsuario(userName, obj) {
    var usuario = {};
    usuario[userName] = obj;
    chrome.storage.sync.set(usuario);
}

function obterInformacoesUsuario(userName, callback) {
    chrome.storage.sync.get(userName, (usuario) => {
        callback(chrome.runtime.lastError ? null : usuario[userName]);
    });
}

//adicionar mais likes
//function salvarInformacoesUsuario(userName, obj) {
//    var usuario = {};
//    usuario[userName] = obj;
//    chrome.storage.sync.set(usuario);
//}
// salvarInformacoesUsuario('user', ('user', { qtd: 500, data: "3-1-2021" }));
