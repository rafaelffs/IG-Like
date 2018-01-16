setTimeout(function(){
				if(total != 0){
					$('#react-root')[0].children[0].children[0].children[0].children[1].children[1].children[0].children[0].children[0].click();
					for (var i=0; i < (total  * 2); i++){ 
						(function(ind) { 
							setTimeout(function(){
								if(total != 0)
								{
									if($('span').hasClass("coreSpriteHeartOpen") && !$('span').hasClass("coreSpriteHeartFull")) 
										{
											obterInformacoesUsuario('user', function(usuario){
												salvarInformacoesUsuario('user', ('user', {qtd: total--, data: usuario.data}));
												$('.coreSpriteHeartOpen')[0].click();
											});
										}
									else if(document.getElementsByClassName('coreSpriteRightPaginationArrow')[0])
									{
										document.getElementsByClassName('coreSpriteRightPaginationArrow')[0].click();
									}
									else
									{
										if(window.confirm("The page is broken, press OK to reload the page"))
										{
											location.reload();
										}
									}
								}
								else 
								{
									if(window.confirm("Your likes are over. Wait to reload next day."))
									{
										obterInformacoesUsuario('user', function(usuario){
												salvarInformacoesUsuario('user', ('user', {qtd: 0, data: usuario.data}));
											});
										location.reload();
									}
								}
							}, 1000 + (3000 * ind));		
					})(i)};
				}
				else 
				{
					if(window.confirm("You don't have any likes remaining. Wait to reaload next day."))
					{
						obterInformacoesUsuario('user', function(usuario){
							salvarInformacoesUsuario('user', ('user', {qtd: 0, data: usuario.data}));
						});
					}
				}
},500);
		
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