var userInfo = {};

document.addEventListener('DOMContentLoaded', ()=> {
	getCurrentTabUrl((url) => { 
	zerarPropriedades();
	carregarInformacoesDoUsuario();
		
		if (url.indexOf("instagram.com/explore/tags") == -1) {
			$('#txtHashtag').show();
			$('#btnBuscarHashTag').show();
			$('#btnBuscarHashTag').bind('click', function(){
				if($('#txtHashtag')[0].value != ''){
					var url = 'https://www.instagram.com/explore/tags/' + $('#txtHashtag')[0].value;
					chrome.tabs.create({ url: url });
				}
			});
		}
		else {
			$('#btnStartLikes').show();
			$('#btnStartLikes').bind('click', function(){
				obterInformacoesUsuario('user', function(usuario){
					if(usuario && usuario.qtd > 0){
						if (url.indexOf("instagram.com/explore/tags") > -1) {
							chrome.tabs.executeScript({ file: "js/jquery.js" }, function() {
								chrome.tabs.executeScript({code: "var total = " + userInfo.qtdLikesRestantes}, function(){
									chrome.tabs.executeScript({file: "js/content-script.js" }, function(){
										window.close();
									});
								});
							});
						}
					}
				});
			});
		}
	});
});

function obterInformacoesUsuario(userName, callback) {
  chrome.storage.sync.get(userName, (usuario) => {
    callback(chrome.runtime.lastError ? null : usuario[userName]);
  });
}

function salvarInformacoesUsuario(userName, obj) {
  var usuario = {};
  usuario[userName] = obj;
  chrome.storage.sync.set(usuario);
}

function carregarInformacoesDoUsuario() {
	/*$.get("https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new", function(count){
		salvarInformacoesUsuario('Rafael', count);
		obterInformacoesUsuario('Rafael', function (usuario){
			if(usuario){
				$('#numeroLikes').html(usuario);
				userInfo.qtdLikesRestantes = usuario;
				userInfo.nomeUsuario = 'Rafael';
			}
		});
	});*/
	
	obterInformacoesUsuario('user', function (usuario){
		if(usuario && usuario.qtd > 0){
			userInfo.qtdLikesRestantes = usuario.qtd;
			userInfo.nomeUsuario = 'user';
			/*salvarInformacoesUsuario(userInfo.nomeUsuario, {qtd: 100, data: datetime});*/
		}
		else if(usuario && usuario.qtd == 0){
			userInfo.qtdLikesRestantes = 0;
			userInfo.nomeUsuario = 'user';
			var dataSync = new Date(usuario.data);
			var dataAtual = new Date();
			/*var timeDiff = Math.abs(dataAtual.getTime() - dataSync.getTime());
			var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); */
			var hours = Math.abs(dataAtual - dataSync) / 36e5;
			console.log(hours);
			if(hours > 24){
				var currentdate = new Date(); 
				var datetime =  (currentdate.getMonth()+1) +"-"
					+ currentdate.getDate()  + "-" 
					+ currentdate.getFullYear();
				userInfo.qtdLikesRestantes = 100;
				userInfo.nomeUsuario = 'user';
				salvarInformacoesUsuario('user', {qtd: 100, data: datetime});
			}
		}
		else 
		{
			var currentdate = new Date(); 
			var datetime =  (currentdate.getMonth()+1) +"-"
					+ currentdate.getDate()  + "-" 
					+ currentdate.getFullYear();
			userInfo.qtdLikesRestantes = 100;
			userInfo.nomeUsuario = 'user';
			salvarInformacoesUsuario('user', {qtd: 100, data: datetime});
			
		}
		$('#numeroLikes').html(userInfo.qtdLikesRestantes);
	});
}

function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    var url = tab.url;
    callback(url);
  });
}

function zerarPropriedades(){
	$('#txtHashtag').hide();
	$('#btnBuscarHashTag').hide();
	$('#btnStartLikes').hide();
}



/*
var currentdate = new Date(); 
			var datetime =  (currentdate.getMonth()+1) +"-"
					+ currentdate.getDate()  + "-" 
					+ currentdate.getFullYear();
var obj = {qtd: 2, data: datetime}
var usuario = {};
  usuario['user'] = obj;
  chrome.storage.sync.set(usuario);
*/