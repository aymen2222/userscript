// ==UserScript==
// @name           Resource production
// @namespace      Ikariam
// @include        http://*.ikariam.*/index.php*
// ==/UserScript==
// @description    Показывает сколько в час добывается ресурсов в вашем городе. И сколько тратиться в час вина.
// Pour Ikariam 0.3.4

var level = 0;

function getRequestParam( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function checkCurrentViewEqual(name)
{
		if(getRequestParam("view") == name)
		{
			return true;
		}else
		{
			return false;
		}
}

function getIntValue(str, defaultValue) {
	var temp = ""+str;
	
	temp = temp.replace(/[^-0-9]+/g, "");
	temp = parseInt(temp);
	
	if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN"))) {
		return defaultValue;
	}
	
	return temp;
}


getElementsByClass = function(inElement, className, findIn)
{
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++)
  {
    if (findIn == true)
    {
        if (all[e].className.indexOf(className) > 0)
        {
            elements[elements.length] = all[e];
        }
    } else {
        if (all[e].className == className)
        {
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
};

function findAndSaveWarehouseLevel()
{
/*	var snpv_vine = getElementsByClass(document, "buildingLevel", false);
	var snpv_vines = document.getElementById('savedWine').lastChild.nodeValue;
	//unsafeWindow.savedWine[snpv_vine[0].lastChild.nodeValue]);


	//save value	
	GM_setValue(city_id,snpv_vines);
	//alert(city_id + ' ' +snpv_vines);*/




	var snp_ware = getElementsByClass(document, "vineyard", false);
	if (snp_ware.length != 0)
	{
		level = snp_ware[0].getElementsByTagName('a');
		level = getIntValue(level[0].title, '?');
		//save value
		GM_setValue(city_id,level);


	}else GM_setValue(city_id,0);
		

}

function insertAfter(newNode, refNode) {
	var parent = refNode.parentNode;
	parent.style.lineHeight='normal';	// dé-centre le texte
	parent.style.paddingTop='7px';		// et redescend un peu
  parent.style.paddingRight='20px';	
	if(refNode.nextSibling) {
		return parent.insertBefore(newNode, refNode.nextSibling);
	} else {
		return parent.appendChild(newNode);
	}
}

function createSpan(text, color) {
	var span = document.createElement('span');
	span.appendChild(document.createTextNode(text));
	if(color) span.style.color=color;
	span.style.fontSize='80%';
	span.style.position='absolute';
	span.style.bottom='5px';
	span.style.right='15px';
	return span;
}

function addProd(counter){
	if(!counter) return;
	var element = counter.valueElem;
	// On décale légèrement le nombre vers le haut, pour pouvoir écrire la production dessous.
	// Le node parent est un LI
	element.parentNode.style.verticalAlign = 'top';
	// Ikariam arrondit à l'entier inférieur. Mais parfois la multiplication par 3600 donne un résultat légèrement inférieur,
	// par exemple 29.999999999988002 au lieu de 30
	var prod = Math.floor(counter.production*3600+0.001);
	// Si on distribue du vin sur une île qui en produit.
	if(counter.spendings.length > 0)
	{
		var vine_saveLevel = GM_getValue(city_id,0);
		prod -= counter.spendings[0].amount;
		if (vine_saveLevel == 0 && checkCurrentViewEqual("city")){
			prod +=  Math.round(counter.spendings[0].amount / 100 * level);	
		} 
		else
		if (vine_saveLevel !== 0 ){
			prod +=  Math.round(counter.spendings[0].amount / 100 * vine_saveLevel);
		}
	}

	if(prod>0) insertAfter(createSpan(' +'+prod, 'green'), element);
	else if(prod<0) insertAfter(createSpan(' '+prod, 'red'), element);
	else insertAfter(createSpan(' +0', 'gray'), element);
}

//find city id
var snp_cityId = getRequestParam("id");
if (snp_cityId == "") var snp_cityId = document.getElementById("citySelect").options[document.getElementById("citySelect").selectedIndex].value; 

var city_id='savedWine' + snp_cityId;
//alert(city_id);

if(checkCurrentViewEqual("city"))
{
	findAndSaveWarehouseLevel();
}

addProd(unsafeWindow.woodCounter);
addProd(unsafeWindow.wineCounter);		// Quand on distribue du vin sur une île qui n'en produit pas
addProd(unsafeWindow.tradegoodCounter);
