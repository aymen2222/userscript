// ==UserScript==
// @name           Friends Codes - Mods
// @namespace      By: raul knoxx - script feito por josep e editado por raul
// @description    Script feito para facilitar o trabalho dos moderadores FC
// @fc  orkut.com.br/Community?cmm=108092464
// @include        *.orkut.*/Main#CommMsgs?cmm=108092464*
// @include        *.orkut.*/CommMsgs?cmm=108092464*
// @include        *.orkut.*/Main#CommMemberManage?cmm=108092464*
// @include        *.orkut.*/CommMemberManage?cmm=108092464*
// @include        *.orkut.*/Community?cmm=108092464*
// @include        *.orkut.*/Main#Community?cmm=108092464*
// ==/UserScript==

Criado_por = "raulknoxx";

eval("6495868269379011071");

var colocaNaPagina = function(){

versaoScript = 6;

function Set_Cookie(name,value,expires,path,domain,secure)
	{
         document.cookie = name + "=" + escape(value) +
            (expires ? ";expires=" + (new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24)).toGMTString() : "") +
            (path ? ";path=" + path : "") +
            (domain ? ";domain=" + domain : "") +
            (secure ? ";secure" : "");
      };

function pegaData()
	{
		var hor = ($ = (new Date).getHours()) < 10 ? "0" + String($) : $;
		var min = ($ = (new Date).getMinutes()) < 10 ? "0" + String($) : $;
		var sec = ($ = (new Date).getSeconds()) < 10 ? "0" + String($) : $;
		return hor + ":" + min + ":" + sec;
	};
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

function captchaBAN(env)
	{
		if (document.getElementById("captcha"))
			document.body.removeChild(document.getElementById("captcha"));
		var img = document.createElement("img");
		var text = document.createElement("input");
		var button = document.createElement("input");
		button.type = "button";
		button.value = "Enviar!";
		button.onclick = function(){
			if (document.getElementById("cs").value == "")alert("Esqueceu de digitar o captcha!");
			else
				{
					var ajax = new XMLHttpRequest;
					env["cs"] = document.getElementById("cs").value;
					ajax.open("POST","CommMsgs?cmm=108092464&tid=5537544233220533233", false);
					ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
					ajax.send(array_values(env));
					eval("_submitForm(document.forms[2], 'ban', '');");
				}
		};
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
		}
	};
function captchaONOFF(env, status)
	{
		if (document.getElementById("captcha"))
			document.body.removeChild(document.getElementById("captcha"));
		var img = document.createElement("img");
		var text = document.createElement("input");
		var button = document.createElement("input");
		button.type = "button";
		button.value = "Enviar!";
		button.onclick = function(){
			if (document.getElementById("cs").value == "")alert("Esqueceu de digitar o captcha!");
			else
				{
					var ajax = new XMLHttpRequest;
					env["cs"] = document.getElementById("cs").value;
					ajax.open("POST","CommMsgs?cmm=108092464&tid=5537544022767135729", false);
					ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
					ajax.send(array_values(env));
					window.alert("Postado como " + status + "!");
					($$ = location).href = $$;
				}
		};
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
		}
	};

function captchaDelTopic(env)
	{
		if (document.getElementById("captcha"))
			document.body.removeChild(document.getElementById("captcha"));
		var img = document.createElement("img");
		var text = document.createElement("input");
		var button = document.createElement("input");
		button.type = "button";
		button.value = "Enviar!";
		button.onclick = function(){
			if (document.getElementById("cs").value == "")alert("Esqueceu de digitar o captcha!");
			else
				{
					var ajax = new XMLHttpRequest;
					env["cs"] = document.getElementById("cs").value;
					ajax.open("POST","CommMsgs?cmm=108092464&tid=5537544233220533233",	false);
					ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
					ajax.send(array_values(env));
					eval("_submitForm(document.forms[2], 'delete_entire_topic', 'true');");
				}
		};
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
		}
	};

function postaTopicoDeletado(titulo, uid, motivo)
	{
		var ajax = new XMLHttpRequest;
		var breakLine = "\n";
		if (!uid)
			uid = "uid=" + String(Math.floor(Math.random() * 99999999999999999999));
		var rnd = String(Math.random());
		var texto = "Titulo: ".concat(titulo,breakLine,
			    "Criador: ",uid,breakLine,
			    "Motivo: ",motivo,breakLine,
			    "Horario: ", pegaData(),breakLine,breakLine,
			    "[silver]",rnd,"[/silver]");
		var envia = {
			    	"POST_TOKEN" : JSHDF["CGI.POST_TOKEN"],
				"signature" : encodeURIComponent(JSHDF["Page.signature.raw"]),
				"subjectText" : encodeURIComponent("T" + String.fromCharCode(243) + "pico Deletado!"),
				"bodyText" : encodeURIComponent(texto),
				"Action.submit" : "Enviar+dados"
			    };
		ajax.open("POST","CommMsgs?cmm=108092464&tid=5537544233220533233", false);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText))
			captchaDelTopic(envia);
	};

function postaMembroBanido(uid, motivo)
	{
		var ajax = new XMLHttpRequest;
		var breakLine = "\n";
		var rnd = String(Math.random());
		var texto = "Uid do membro: ".concat(uid,breakLine,
			    "Motivo: ",motivo,breakLine,
			    "Horario: ", pegaData(),breakLine,breakLine,
			    "[silver]",rnd,"[/silver]");
		var envia = {
			    	"POST_TOKEN" : JSHDF["CGI.POST_TOKEN"],
				"signature" : encodeURIComponent(JSHDF["Page.signature.raw"]),
				"subjectText" : "Membro Banido!",
				"bodyText" : encodeURIComponent(texto),
				"Action.submit" : "Enviar+dados"
			    };
		ajax.open("POST","CommMsgs?cmm=108092464&tid=5537544233220533233", false);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText))
			captchaBAN(envia);
	};
function online()
	{
		Set_Cookie("status","ON", 7);
		var texto = String("[b][green]ON![/green][/b]").concat("\n\n[silver]",String(Math.random()),"[/silver]");
		var envia = {
			    	"POST_TOKEN" : JSHDF["CGI.POST_TOKEN"],
				"signature" : encodeURIComponent(JSHDF["Page.signature.raw"]),
				"subjectText" : encodeURIComponent(""),
				"bodyText" : encodeURIComponent(texto),
				"Action.submit" : "Enviar+dados"
			    };
		var ajax = new XMLHttpRequest;
		ajax.open("POST","CommMsgs?cmm=108092464&tid=5537544022767135729",false);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText))
			captchaONOFF(envia, "ON");
		else
			{
				window.alert("Postado como ON");
				($$ = location).href = $$;
			}
	};
function offline()
	{
		Set_Cookie("status","OFF", 7);
		var texto = String("[b][red]OFF![/red][/b]").concat("\n\n[silver]",String(Math.random()),"[/silver]");
		var envia = {
			    	"POST_TOKEN" : JSHDF["CGI.POST_TOKEN"],
				"signature" : encodeURIComponent(JSHDF["Page.signature.raw"]),
				"subjectText" : encodeURIComponent(""),
				"bodyText" : encodeURIComponent(texto),
				"Action.submit" : "Enviar+dados"
			    };
		var ajax = new XMLHttpRequest;
		ajax.open("POST","CommMsgs?cmm=108092464&tid=5537544022767135729",false);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText))
			captchaONOFF(envia, "OFF");
		else
			{
				window.alert("Postado como OFF!");
				($$ = location).href = $$;
			}
	};
};
colocaNaPagina = String(colocaNaPagina);
colocaNaPagina = colocaNaPagina.substring(13, colocaNaPagina.length - 2);
var script = document.createElement("script");
script.setAttribute("language","JavaScript");
script.innerHTML = colocaNaPagina;
document.getElementsByTagName("head")[0].appendChild(script);

function Set_Cookie(name,value,expires,path,domain,secure)
	{
         document.cookie = name + "=" +escape(value) +
            (expires ? ";expires=" + (new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24)).toGMTString() : "") +
			(path ? ";path=" + path:"") +
            (domain ? ";domain=" + domain : "") +
            (secure ? ";secure" : "");
      };

function confirmaDeletarTopicos()
	{
		var tagBody = document.body;
		if (new RegExp(/delete\_entire\_topic/i).test(tagBody.innerHTML))
		{
			var stringItem = "if (confirm('Tem certeza que deseja deletar este t\\xf3pico?')){" +
			"postaTopicoDeletado(document.getElementsByTagName('h1')[0].innerHTML," +
			"document.body.innerHTML.match(/uid=(\\d+)/ig)[1]," +
			"prompt('Motivo de estar deletando este topico:\\n','T\\xf3pico sem tag!'));" +
		        "_submitForm(this, 'delete_entire_topic', 'true');; return false;}";
			tagBody.innerHTML = tagBody.innerHTML.replace("_submitForm(this, 'delete_entire_topic', 'confirmDelete()');; return false;", stringItem);
		}
	};

function confirmaBaneMembro()
	{
		var tagBody = document.body;
		if (new RegExp(/ban/i).test(tagBody.innerHTML))
		{
			var stringItem = "if (confirm('Tem certeza que deseja banir este membro?')){" +
			"postaMembroBanido(document.body.innerHTML.match(/uid=(\\d+)/ig)[1]," +
			"prompt('Motivo de estar banindo este membro:\\n','Xingamento!'));" +
			"_submitForm(this, 'ban', '');; return false;}";
			tagBody.innerHTML = tagBody.innerHTML.replace("_submitForm(this, 'ban', '');; return false;", stringItem);
		}
	};
function criaBotao()
	{
		if (location.href.match(/Community/i))
		{
		var a = document.createElement("a");
			if (!(new RegExp(/status/i).test(document.cookie)))
			{
				Set_Cookie("status","OFF", 7);
				a.innerHTML = "Estou online!";
				a.href = "javascript:void false;";
				a.setAttribute("onClick", "online()");
			}
		else
		if (document.cookie.match(/status\=(.*)/i)[1].match("ON"))
		{
			a.innerHTML = "Vou sair!";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "offline()");
		} else
		{
			if (document.cookie.match(/status\=(.*)/i)[1].match("OFF"))
			{
				a.innerHTML = "Estou online!";
				a.href = "javascript:void false;";
				a.setAttribute("onClick","online()");
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
		with(document.getElementsByClassName("parabtns")[2])
			{
				appendChild(span);
				appendChild(span2);
			}
		}
	};

//Inicia tudo:
confirmaDeletarTopicos();
confirmaBaneMembro();
criaBotao();