// ==UserScript==
// @name        spoki plus komenti
// @namespace   spoki-plus-komenti
// @include     http://spoki.tvnet.lv/*
// @exclude     http://spoki.tvnet.lv/
// @version     1
// ==/UserScript==

var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = "(" + init.toString() + ")(jQuery)";
document.body.appendChild(script);
	


function init() {

	$(".responseLink").each(function(){
			
		var url = "http://spoki.tvnet.lv"+$(this).attr('href');	
		var id = $(this).attr('href');
		id = id.split('=')[1];		
		$(this).parent().append("<div style='text-align:right;'><a id='resp_"+id+"' href='javascript:void(0);'>Komentārs</a></div>");
		$(this).attr('id', 'respb_'+id);
		$('#resp_'+id).click(function() {			
			$('#respb_'+id).html('<center><img src="data:image/gif;base64,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"></center>');
			$.get(url, 
				function (data) {
					var resp = $("#commentText_"+id, data).html();					
					$('#respb_'+id).html("<span style='color:#FB704D'>"+resp+"</span>");
					$('#resp_'+id).each(function(){ $(this).remove();});
			});				
		});

	});
	
}