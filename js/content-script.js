setTimeout(function () {
    if (total != 0) {
        $('#react-root > section > main > article > div.EZdmt > div > div > div:nth-child(1) > div:nth-child(1) > a > div').click()
        for (var i = 0; i < (total * 2); i++) {
            (function (ind) {
                setTimeout(function () {
                    if (total != 0) {
                        if ($('button > div > span > svg')[0].ariaLabel == "Curtir") {
                            obterInformacoesUsuario('user', function (usuario) {
                                salvarInformacoesUsuario('user', ('user', { qtd: total--, data: usuario.data }));
                                $('body > div._2dDPU.CkGkG > div.zZYga > div > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button').click();
                            });
                        }
                        else if (document.getElementsByClassName('coreSpriteRightPaginationArrow')[0]) {
                            document.getElementsByClassName('coreSpriteRightPaginationArrow')[0].click();
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
