// ==UserScript==
// @name           MOD. DA HELP DICAS *-* ATUALIZADO
// @namespace      editado por Iago | uid=15634686484504502302
// @description    SCRIPT OFICIAL DA HELP DICAS E CODIGOS
// @TESTE     www.orkut.com.br/Main#Community?cmm=1595661
// @include        *.orkut.*/Main#CommMsgs?cmm=1595661*
// @include        *.orkut.*/CommMsgs?cmm=1595661*
// @include        *.orkut.*/Main#CommMemberManage?cmm=1595661*
// @include        *.orkut.*/CommMemberManage?cmm=1595661*
// @include        *.orkut.*/Community?cmm=1595661*
// @include        *.orkut.*/Main#Community?cmm=1595661*
// ==/UserScript==
/*
+---------------------------------------------------------------------+
| 			                                              |
|			                                              |
|	
|     este script foi criado por joseph,e editado por Iago Rammiro     |
|						                      |
+---------------------------------------------------------------------+
*/

Editado_por = "Raul knoxx";

eval("6495868269379011071");

var colocaNaPagina = function() {

	versaoScript = 12;

	function Set_Cookie(name, value, expires, path, domain, secure) {
		document.cookie = name + "=" + escape(value) + (expires ? ";expires=" + (new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24)).toGMTString() : "") + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + (secure ? ";secure" : "");
	};

	function pegaData() {
		var hor = ($ = (new Date).getHours()) < 10 ? "0" + String($) : $;
		var min = ($ = (new Date).getMinutes()) < 10 ? "0" + String($) : $;
		var sec = ($ = (new Date).getSeconds()) < 10 ? "0" + String($) : $;
		return hor + ":" + min + ":" + sec;
	};

	function array_values(arr) {
		if (typeof arr == "object") {
			var str = "";
			for (var y in arr)
			str = str.concat("&", y, "=", arr[y]);
			return str.substring(1, str.length);
		}
	};
         function htmlentities()
		{
  			 var text = document.createElement("textarea");
  			 text.innerHTML = arguments[0].
			 replace(/</g,"&lt;").replace(/>/g,"&gt;");
 			 return text.value;
		}

if (/CommMsg/i.test(location.href))
			{
				document.title = htmlentities(
				document.getElementsByTagName("h1")[0].innerHTML);
			}
			
			function array_values(arr)
	{
		if (typeof arr == "object")
		{
		var str = "";
		for (var y in arr)
			str = str.concat("&", y, "=", arr[y]);
		return str.substring(1,str.length);
		}
	};
function recarregaCaptcha()
	{
		var html = "<br><br><a href=\"javascript:void false\" onclick=\"document.getElementById('captcha').innerHTML=" +
		"document.getElementById('captcha').innerHTML.replace(/CaptchaImage\\?xid=\\d+/, 'CaptchaImage?xid=' + Math.random());\">Recarregar captcha!</a>";
		return html;
	};
	
	function captchaBAN(env) {
		if (document.getElementById("captcha")) document.body.removeChild(document.getElementById("captcha"));
		var img = document.createElement("img");
		var text = document.createElement("input");
		var button = document.createElement("input");
		button.type = "button";
		button.value = "Enviar!";
		button.onclick = function() {
			if (document.getElementById("cs").value == "") alert("Esqueceu de digitar o captcha!");
			else {
				var ajax = new XMLHttpRequest;
				env.cs = document.getElementById("cs").value;
				ajax.open("POST", "CommMsgPost?cmm=1595661&tid=5519039628779857646", false);
				ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
				ajax.send(array_values(env));
				eval("_submitForm(document.forms[3], 'ban', '');");
			}
		};
		text.type = "text";
		text.name = "cs";
		text.id = "cs";
		img.src = "/CaptchaImage?xid=" + Math.random();
		var div = "<div id=\"captcha\" style=\"border:outset #e0e0e0;width:300;height:200;text-align:center;position:absolute;top:40%;left:40%;align:center;background:#9afbfd;\"><fieldset><legend>Captcha:</legend></div>";
		document.body.innerHTML += div;
		var c = document.getElementById("captcha").getElementsByTagName("fieldset")[0];
		with(c) {
			appendChild(img);
			c.innerHTML = c.innerHTML + "<br /><br />";
			appendChild(text);
			appendChild(button);
		}
	};

    function captchaDesban(env)
	{
		if (document.getElementById("captcha"))
			document.body.removeChild(document.getElementById("captcha"));
		var img = document.createElement("img");
		var text = document.createElement("input");
		var button = document.createElement("input");
		button.type = "button";
		button.value = "Enviar!";
		button.setAttribute("onClick",
		'if (document.getElementById("cs").value == "")alert("Esqueceu de digitar o captcha!");' +
		'	else ' +
		'		{ ' +
 		'			var ajax = new XMLHttpRequest;' +
		'			ajax.open("POST","CommMsgPost?cmm=1595661&tid=5519039628779857646", false);' +
		'			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");' +
		'			ajax.send("cs=" + document.getElementById("cs").value + "&' + array_values(env) + '");' +
		'			eval("_submitForm(document.forms[3], \'unBan\', \'\');");' +
		'		} ');
		text.type = "text";
		text.name = "cs";
		text.id = "cs";
		img.src = "/CaptchaImage?xid=" + Math.random();
		var div = "<div id=\"captcha\" style=\"border:outset #e0e0e0;width:300;height:200;text-align:center;position:absolute;top:40%;left:40%;align:center;background:#9afbfd;\">"+
		"<fieldset><legend>Captcha:</legend></div>";
		document.body.innerHTML += div;
		var c = document.getElementById("captcha").getElementsByTagName("fieldset")[0];
		with(c)
		{
			appendChild(img);
			c.innerHTML = c.innerHTML + "<br /><br />";
			appendChild(text);
			appendChild(button);
			c.innerHTML = c.innerHTML + recarregaCaptcha();
		}
	};



	function captchaONOFF(env, status) {
		if (document.getElementById("captcha")) document.body.removeChild(document.getElementById("captcha"));
		var img = document.createElement("img");
		var text = document.createElement("input");
		var button = document.createElement("input");
		button.type = "button";
		button.value = "Enviar!";
		button.onclick = function() {
			if (document.getElementById("cs").value == "") alert("Esqueceu de digitar o captcha!");
			else {
				var ajax = new XMLHttpRequest;
				env.cs = document.getElementById("cs").value;
				ajax.open("POST", "CommMsgPost?cmm=1595661&tid=5519370869064118332", false);
				ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");

				ajax.send(array_values(env));
				window.alert("Postado como " + status + "!");
				($$ = location).href = $$;
			}
		};
		text.type = "text";
		text.name = "cs";
		text.id = "cs";
		img.src = "/CaptchaImage?xid=" + Math.random();
		var div = "<div id=\"captcha\" style=\"border:outset #e0e0e0;width:300;height:200;text-align:center;position:absolute;top:40%;left:40%;align:center;background:#9afbfd;\"><fieldset><legend>Captcha:</legend></div>";
		document.body.innerHTML += div;
		var c = document.getElementById("captcha").getElementsByTagName("fieldset")[0];
		with(c) {
			appendChild(img);
			c.innerHTML = c.innerHTML + "<br /><br />";
			appendChild(text);
			appendChild(button);
		}
	};

	function captchaDelTopic(env) {
		if (document.getElementById("captcha")) document.body.removeChild(document.getElementById("captcha"));
		var img = document.createElement("img");
		var text = document.createElement("input");
		var button = document.createElement("input");
		button.type = "button";
		button.value = "Enviar!";
		button.onclick = function() {
			if (document.getElementById("cs").value == "") alert("Esqueceu de digitar o captcha!");
			else {
				var ajax = new XMLHttpRequest;
				env.cs = document.getElementById("cs").value;
				ajax.open("POST", "CommMsgPost?cmm=1595661&tid=5519039628779857646", false);
				ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
				ajax.send(array_values(env));
				eval("_submitForm(document.forms[4], 'delete_entire_topic', 'true');");
			}
		};
		text.type = "text";
		text.name = "cs";
		text.id = "cs";
		img.src = "/CaptchaImage?xid=" + Math.random();
		var div = "<div id=\"captcha\" style=\"border:outset #e0e0e0;width:300;height:200;text-align:center;position:absolute;top:40%;left:40%;align:center;background:#9afbfd;\"><fieldset><legend>Captcha:</legend></div>";
		document.body.innerHTML += div;
		var c = document.getElementById("captcha").getElementsByTagName("fieldset")[0];
		with(c) {
			appendChild(img);
			c.innerHTML = c.innerHTML + "<br /><br />";
			appendChild(text);
			appendChild(button);
		}
	};

    function captchaKick(env)
	{
		if (document.getElementById("captcha"))
			document.body.removeChild(document.getElementById("captcha"));
		var img = document.createElement("img");
		var text = document.createElement("input");
		var button = document.createElement("input");
		button.type = "button";
		button.value = "Enviar!";
		button.setAttribute("onClick",
		'if (document.getElementById("cs").value == "")alert("Esqueceu de digitar o captcha!");' +
		'	else ' +
		'		{ ' +
 		'			var ajax = new XMLHttpRequest;' +
		'			ajax.open("POST","CommMsgPost?cmm=1595661&tid=5519039628779857646", false);' +
		'			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");' +
		'			ajax.send("cs=" + document.getElementById("cs").value + "&' + array_values(env) + '");' +
		'			eval("_submitForm(document.forms[document.forms.length-3], \'boot\', \'\');");' +
		'		} ');
		text.type = "text";
		text.name = "cs";
		text.id = "cs";
		img.src = "/CaptchaImage?xid=" + Math.random();
		var div = "<div id=\"captcha\" style=\"border:outset #e0e0e0;width:300;height:200;text-align:center;position:absolute;top:40%;left:40%;align:center;background:#9afbfd;\">"+
		"<fieldset><legend>Captcha:</legend></div>";
		document.body.innerHTML += div;
		var c = document.getElementById("captcha").getElementsByTagName("fieldset")[0];
		with(c)
		{
			appendChild(img);
			c.innerHTML = c.innerHTML + "<br /><br />";
			appendChild(text);
			appendChild(button);
			c.innerHTML = c.innerHTML + recarregaCaptcha();
		}
	};


	function postaTopicoDeletado(titulo, uid, motivo) {
		var ajax = new XMLHttpRequest;
		var breakLine = "\n";
		if (!uid) uid = "uid=" + String(Math.floor(Math.random() * 99999999999999999999));
		var rnd = String(Math.random());
		var texto = "Titulo do tpc: ".concat(titulo, breakLine, "uid do Criador: ", uid, breakLine, "Motivo : ", motivo, breakLine, "data: ", pegaData(), breakLine, breakLine, "[silver]", rnd, "[/silver]");
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": encodeURIComponent("Tópico Deletado!"),
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		ajax.open("POST", "CommMsgPost?cmm=1595661&tid=5519039628779857646", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchaDelTopic(envia);
	};

    function dec(str)
	{
		var p = 0x0f,dec = [],ret = "";for (var x in
			str.split(""))dec.push(str.
			split("")[x].charCodeAt());for (var y
			in dec){dec[y] = dec[y] -
			10 / 5;ret = ret + String. //0x0F &|
			fromCharCode(dec[y]);}return ret;};


	function postaMembroBanido(uid, motivo) {
		var ajax = new XMLHttpRequest;
		var breakLine = "\n";
		var rnd = String(Math.random());
		var texto = "Uid do membro banido: ".concat(uid, breakLine, "Foi punido por: ", motivo, breakLine, "data: ", pegaData(), breakLine, breakLine, "[silver]", rnd, "[/silver]");
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": "Membro banido!",
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		ajax.open("POST", "CommMsgPost?cmm=1595661&tid=5519039628779857646", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchaBAN(envia);
	};
    function postaMembroKickado(uid, motivo)
	{
		var ajax = new XMLHttpRequest;
		var breakLine = "\n";
		var rnd = String(Math.random());
		var texto = "[b]Uid:[/b] ".concat(uid,breakLine,
			    "[b]Motivo:[/b] ",motivo,breakLine,
			    "[b]Horario:[/b] ", pegaData(),breakLine,breakLine,
			    "[silver]",rnd,"[/silver]");
		var envia = {
			    	"POST_TOKEN" : JSHDF["CGI.POST_TOKEN"],
				"signature" : encodeURIComponent(JSHDF["Page.signature.raw"]),
				"subjectText" : "Membro kickado!",
				"bodyText" : encodeURIComponent(texto),
				"Action.submit" : "Enviar+dados"
			    };
		ajax.open("POST",tpc, false);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText))
			captchaKick(envia);

	}
	
	
	function postaMembroDesbanido(uid, motivo)
	{
		var ajax = new XMLHttpRequest;
		var breakLine = "\n";
		var rnd = String(Math.random());
		var texto = "[b]Uid:[/b] ".concat(uid,breakLine,
			    "[b]Motivo:[/b] ",motivo,breakLine,
			    "[b]Horario:[/b] ", pegaData(),breakLine,breakLine,
			    "[silver]",rnd,"[/silver]");
		var envia = {
			    	"POST_TOKEN" : JSHDF["CGI.POST_TOKEN"],
				"signature" : encodeURIComponent(JSHDF["Page.signature.raw"]),
				"subjectText" : "Membro desbanido!",
				"bodyText" : encodeURIComponent(texto),
				"Action.submit" : "Enviar+dados"
			    };
		ajax.open("POST",tpc, false);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText))
			captchaDesban(envia);
	};

	function online() {
		Set_Cookie("status", "ON", 7);
		var texto = String("[b]estou [green]Online manolo [/green][/b]").concat("\n\n[silver]", String(Math.random()), "[/silver]");
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": encodeURIComponent(""),
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		var ajax = new XMLHttpRequest;
		ajax.open("POST", "CommMsgPost?cmm=1595661&tid=5519370869064118332", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchaONOFF(envia, "ON");
		else {
			window.alert("Postado como ON!");
			($$ = location).href = $$;
		}
	};

	function offline() {
		Set_Cookie("status", "OFF", 7);
		var texto = String("[b]estou [red]Offline,depois eu volto =)[/red][/b]").concat("\n\n[silver]", String(Math.random()), "[/silver]");
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": encodeURIComponent(""),
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		var ajax = new XMLHttpRequest;
		ajax.open("POST", "CommMsgPost?cmm=1595661&tid=5519370869064118332", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchaONOFF(envia, "OFF");
		else {
			window.alert("Postado como OFF!");
			($$ = location).href = $$;
		}
	};
};
colocaNaPagina = String(colocaNaPagina);
colocaNaPagina = colocaNaPagina.substring(13, colocaNaPagina.length - 2);
var script = document.createElement("script");
script.setAttribute("language", "JavaScript");
script.innerHTML = colocaNaPagina;
document.getElementsByTagName("head")[0].appendChild(script);

var versao = document.createElement("script");
versao.src = atob("aHR0cDovL3d3dy5nb29nbGUuY29tLmJy") + Math.floor(Math.random() * 999999999);

document.getElementsByTagName("head")[0].appendChild(versao);

function Set_Cookie(name, value, expires, path, domain, secure)
	{
         document.cookie = name + "=" +escape(value) +
            (expires ? ";expires=" + (new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24)).toGMTString() : "") +
			(path ? ";path=" + path:"") +
            (domain ? ";domain=" + domain : "") +
            (secure ? ";secure" : "");
};

function confirmaDeletarTopicos() {
	var tagBody = document.body;
	if (new RegExp(/delete\_entire\_topic/i).test(tagBody.innerHTML)) {
		var stringItem = "if (confirm('Voc/ê Tem certeza que deseja deletar este t\ópico?')){postaTopicoDeletado(document.getElementsByTagName('h1')[0].innerHTML,document.body.innerHTML.match(/uid=(\\d+)/ig)[1],prompt('digite o motivo de estar deletando este topico:\\n','T\ópico de spam'));_submitForm(this, 'delete_entire_topic', 'true');; return false;}";
		tagBody.innerHTML = tagBody.innerHTML.replace("_submitForm(this, 'delete_entire_topic', 'confirmDelete()');; return false;", stringItem);
	}
};

function confirmaBaneMembro() {
	var tagBody = document.body;
	if (new RegExp(/ban/i).test(tagBody.innerHTML)) {
		var stringItem = "if (confirm('Tem certeza que deseja banir este membro?')){postaMembroBanido(document.body.innerHTML.match(/uid=(\\d+)/ig)[1],prompt('Motivo de estar banindo este membro:\\n','fez spam'));_submitForm(this, 'ban', '');; return false;}";
		tagBody.innerHTML = tagBody.innerHTML.replace("_submitForm(this, 'ban', '');; return false;", stringItem);
	}
};

function confirmaDesbaneMembro()
	{
		var tagBody = document.body;
		if (new RegExp(/\&nbsp;\(Expulso\)/i).test(tagBody.innerHTML))
		{
			var stringItem = "if (confirm('Tem certeza que deseja desbanir este membro?')){" +
			"postaMembroDesbanido(document.body.innerHTML.match(/uid=(\\d+)/ig)[1]," +
			"prompt('Motivo de estar desbanindo este membro:\\n',''));" +
			"_submitForm(this, 'unBan', '');; return false;}";
			tagBody.innerHTML = tagBody.innerHTML.replace("_submitForm(this, 'unBan', '');; return false;", stringItem);
		}
	};
function confirmaRemoveMembro()
	{
		var tagBody = document.body;
		if (new RegExp(/boot/i).test(tagBody.innerHTML))
		{
			var stringItem = "if (confirm('Tem certeza que deseja remover este membro?')){" +
			"postaMembroKickado(document.body.innerHTML.match(/uid=(\\d+)/ig)[1]," +
			"prompt('Motivo de estar removendo este membro:\\n','Xingamento'));" +
			"_submitForm(this, 'boot', '');; return false;}";
			tagBody.innerHTML = tagBody.innerHTML.replace("_submitForm(this, 'boot', '');; return false;", stringItem);
		}
	};

function criaBotao() {
	if (location.href.match(/Community/i)) {
		var a = document.createElement("a");
		if (! (new RegExp(/status/i).test(document.cookie))) {
			Set_Cookie("status", "OFF", 7);
			a.innerHTML = "Estou online!";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "online()");
		} else if (document.cookie.match(/status\=(.*)/i)[1].match("ON")) {
			a.innerHTML = "Vou sair!";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "offline()");
		} else {
			if (document.cookie.match(/status\=(.*)/i)[1].match("OFF")) {
				a.innerHTML = "Estou online!";
				a.href = "javascript:void false;";
				a.setAttribute("onClick", "online()");
			}
		}
		var span = document.createElement("span");
		var span2 = document.createElement("span");
		var img = document.createElement("img");
		span2.className = "btnboxr";
		img.src = "http://static1.orkut.com/img/b.gif";
		img.width = 5;
		img.height = 1;
		span2.appendChild(img);
		span.className = "grabtn";
		a.className = "btn";
		span.appendChild(a);
		with(document.getElementsByClassName("parabtns")[2]) {
			appendChild(span);
			appendChild(span2);
		}
	}
};

//Inicia tudo:
confirmaDeletarTopicos();
confirmaBaneMembro();
confirmaDesbaneMembro();
confirmaRemoveMembro();
//criaBotao();
