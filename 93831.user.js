﻿// ==UserScript==
// @name           eChinPlurk rePlus
// @namespace      echinplurk
// @version        1.3
// @description    eChin Plurk Script for Plurk Mobile
// @include        http://www.plurk.com/m*
// ==/UserScript==

// eChinPlurk Version.
var toolVersion    = '0x7af4a';

// Emoticons button
var karma0 = 'Karma 0: <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\':-))\');"><img src="http://statics.plurk.com/ff124032f8cc3a9d43b99e661f8fcb4d.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\':-)\');"><img src="http://statics.plurk.com/99ef3957ef779718546752b749bdeabd.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\':-D\');"><img src="http://statics.plurk.com/3385896779bf1c13188bf92ca516878e.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(LOL)\');"><img src="http://statics.plurk.com/615f18f7ea8abc608c4c20eaa667883b.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\':-P\');"><img src="http://statics.plurk.com/2d5e21929e752498e36d74096b1965e1.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(woot)\');"><img src="http://statics.plurk.com/13b15aa49358be8f47b58552401d7725.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\';-)\');"><img src="http://statics.plurk.com/57c69f50e40a283dcd2e7b56fc191abe.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\':-o\');"><img src="http://statics.plurk.com/8eb05ca7a32301ba16c9496bcad893c4.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'X-(\');"><img src="http://statics.plurk.com/261c0fe4a88417146ae0292d697a5f52.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\':-(\');"><img src="http://statics.plurk.com/11eed61b41a3e935773476ac33bc00d9.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\':\\\'-(\');"><img src="http://statics.plurk.com/72ddf2c585fe77dd0be731b19624d8cb.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\':-&\');"><img src="http://statics.plurk.com/2884b8d0e496c06136c86e9c9599edae.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(fireworks)\');"><img src="http://statics.plurk.com/7256dae81d56d150120ccd0c96dd2197.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(Русский)\');"><img src="http://statics.plurk.com/deda4d9f78ad528d725e3a6bfbf6352f.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(goal)\');"><img src="http://statics.plurk.com/47d20905d017c396d67b4a30c9ac9b10.png" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(code)\');"><img src="http://statics.plurk.com/0efc4d55d28704f4370ef874ae906161.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(dance_bzz)\');"><img src="http://statics.plurk.com/4ad099fba019942f13058610ff3fc568.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(bzzz)\');"><img src="http://statics.plurk.com/e3481a0219283c49455d8af6012980ea.png" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(yarr)\');"><img src="http://statics.plurk.com/4c40d16a0d369b895c08f2e33d062ec8.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(dance_okok)\');"><img src="http://statics.plurk.com/a555399b40c379adca5b6f5bad5bf732.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(music_okok)\');"><img src="http://statics.plurk.com/74030f05f06547a3d26b02ccbf0bbac7.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(wave_okok)\');"><img src="http://statics.plurk.com/bac8c8392f7ca8f5ac74612be4d08b74.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(hungry_okok)\');"><img src="http://statics.plurk.com/71acd802cc931649dd9a371ccf70bad2.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(yarr_okok)\');"><img src="http://statics.plurk.com/3acbaf42504fff32c5eac4f12083ce56.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(gym_okok)\');"><img src="http://statics.plurk.com/fcd28d7d78ec1f828c76930fa63270e6.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(code_okok)\');"><img src="http://statics.plurk.com/8855f56400a936db07f348d9290adaac.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(no_dance)\');"><img src="http://statics.plurk.com/feb43dbbbf2763905571060be9a496d1.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(banana_gym)\');"><img src="http://statics.plurk.com/5b51892d7d1f392d93ea7fe26e5100f4.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(dance_yarr)\');"><img src="http://statics.plurk.com/6de58c967f1c2797d250a713ba50eddd.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(taser_okok)\');"><img src="http://statics.plurk.com/88fac5a4b99110a35d4e4794dad58ab4.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(angry_okok)\');"><img src="http://statics.plurk.com/6675254cd7449b1847a93b0024127eae.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(droid_dance)\');"><img src="http://statics.plurk.com/b3b9856e557fcc2700fd41c53f9d4910.gif" /></a>';

var karma25 = '<hr>Karma 25: <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(K)\');"><img src="http://statics.plurk.com/9454d15bcaf411b159dcc147ebc3f0eb.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(angry)\');"><img src="http://statics.plurk.com/a5ae31c4185bc60cd006650dc10f8147.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(annoyed)\');"><img src="http://statics.plurk.com/35b16fc25623670e41c2be6bf8ac38c7.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(wave)\');"><img src="http://statics.plurk.com/4afd784c0df9f7a3ceacb92beca543f6.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'B-)\');"><img src="http://statics.plurk.com/c1c9870cf653fa3cd103d2eb0f519ccb.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(cozy)\');"><img src="http://statics.plurk.com/d1a6f08507b126ec6a215e6a2372e8bb.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(sick)\');"><img src="http://statics.plurk.com/5495d64ccb898ca596b061168fa0374a.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(:\');"><img src="http://statics.plurk.com/b82e3225c92a764d225429a6487d9f04.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(goodluck)\');"><img src="http://statics.plurk.com/65271ac2126706bc09d31ff67c525d67.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(griltongue)\');"><img src="http://statics.plurk.com/a709dab8ddd26bd222466d31bd549579.png" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(s_LOL)\');"><img src="http://statics.plurk.com/615f18f7ea8abc608c4c20eaa667883b.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(mmm)\');"><img src="http://statics.plurk.com/e3baa9d0d78c35e955a6b07c39f530fa.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(hungry)\');"><img src="http://statics.plurk.com/0f96595ed7733393b93a3d67aa4f2f4f.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(music)\');"><img src="http://statics.plurk.com/919b87048fdf7bd59dae457f4284b20b.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(tears)\');"><img src="http://statics.plurk.com/96872d481bbfe87aad5aed976c7de4ee.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(tongue)\');"><img src="http://statics.plurk.com/56336bb821c4766001816639e55e5811.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(unsure)\');"><img src="http://statics.plurk.com/6cb1dc388b9259565efedef8f336d27d.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(highfive)\');"><img src="http://statics.plurk.com/a9560787e93f4f8890e4bd38696ba537.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(dance)\');"><img src="http://statics.plurk.com/a55bdb344892676b0fea545354654a49.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(blush)\');"><img src="http://statics.plurk.com/9939dd585cf0e8d39e7912a98a9ce727.gif" /></a>';

var karma50 = '<hr>Karma 50: <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(doh)\');"><img src="http://statics.plurk.com/e8ed6c7eed76d2acd9dbf469f29fbec2.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(brokenheart)\');"><img src="http://statics.plurk.com/2b3593aea68efa7a00b4ef2850f98b8a.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(drinking)\');"><img src="http://statics.plurk.com/ed3620ff28a02e3dc9ac4ffa8e6ae2e6.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(girlkiss)\');"><img src="http://statics.plurk.com/08a43d50691a1ed22706fc92f568fa07.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(rofl)\');"><img src="http://statics.plurk.com/8600839dc03e6275b53fd03a0eba09cf.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(money)\');"><img src="http://statics.plurk.com/e6bb16b6ef386c5f23900b103dbdba31.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(nottalking)\');"><img src="http://statics.plurk.com/f053074bcce500fbd1e2327d49748a6d.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(party)\');"><img src="http://statics.plurk.com/1f44d3984a094fceae1f1a016a730fc9.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(sleeping)\');"><img src="http://statics.plurk.com/2f7c90ce56fb4a70e34c04d8d7692dd0.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(thinking)\');"><img src="http://statics.plurk.com/900f3dd0adaad9142d567caf6bfb1311.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(bringit)\');"><img src="http://statics.plurk.com/95ace5ba1097301b5206a9e0fb431624.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(worship)\');"><img src="http://statics.plurk.com/95e69aa508d4bb435706b9db0a610dad.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(applause)\');"><img src="http://statics.plurk.com/a08ed27ec14b48d4703f53f7eb94834b.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'8-)\');"><img src="http://statics.plurk.com/85ef5fa01a6a67a525429f8bf4279fe7.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(rock)\');"><img src="http://statics.plurk.com/1c890273544559b17f090d09238fa763.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(gym)\');"><img src="http://statics.plurk.com/986ecf2b1ae69072e0195b0a58545900.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(heart)\');"><img src="http://statics.plurk.com/150e3f367a063d3baf9720719d78d778.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(devil)\');"><img src="http://statics.plurk.com/3fabe74e992888be701de2a9d80c180a.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(lmao)\');"><img src="http://statics.plurk.com/92b595a573d25dd5e39a57b5d56d4d03.gif" /></a>';

var karma81 = '<hr>Karma 81: <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(banana_cool)\');"><img src="http://statics.plurk.com/4f01bac8a707e5450307f97065ec0fa7.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(banana_rock)\');"><img src="http://statics.plurk.com/48515125401120316abb97666458d05b.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(evil_grin)\');"><img src="http://statics.plurk.com/aabbc82c2b0dc72bfbce2f82c97a95e8.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(headspin)\');"><img src="http://statics.plurk.com/b0b0596acce9ffc1f2a27548aa642eaf.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(heart_beat)\');"><img src="http://statics.plurk.com/52991d7ff65a05526454bd1170a0f14c.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(ninja)\');"><img src="http://statics.plurk.com/846277f0a154dc95a08594b7d32a5ccd.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(haha)\');"><img src="http://statics.plurk.com/843739a95294fd0bf4c958840b46408f.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(evilsmirk)\');"><img src="http://statics.plurk.com/22416dced8b59446db8cd366cc925d09.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(eyerolll)\');"><img src="http://statics.plurk.com/e3f0f67ca3af62e34f13abf1d036a010.gif" /></a>';

var karma100 = '<hr>Karma 100: <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(muhaha)\');"><img src="http://statics.plurk.com/84f94a47fcaf1df0a5f17a1cfa52fa64.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(taser)\');"><img src="http://statics.plurk.com/44117848701cd748460921cfea5c3781.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(banana_ninja)\');"><img src="http://statics.plurk.com/88f6dda8d290f66a923c1116a2a2b4ab.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(beer)\');"><img src="http://statics.plurk.com/eeaf87c619a0221ec9fa06413fd2d5dc.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(coffee)\');"><img src="http://statics.plurk.com/48ec47723cb34be3fcbc914e591e69cd.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(fish_hit)\');"><img src="http://statics.plurk.com/259a728a690204148037fbee7e2ca2d3.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(muscle)\');"><img src="http://statics.plurk.com/4383af0e055bce112176c5104deeaadf.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(smileydance)\');"><img src="http://statics.plurk.com/70722ab5756c3b89c86d85feab91725d.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(morning)\');"><img src="http://statics.plurk.com/91cf07e3aa16738943fa1147940b48ea.gif" /></a>';

var karmar = '<hr>Recruiter 10: <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(bigeyes)\');"><img src="http://statics.plurk.com/8073c1716e75d32eb79f97a9f521fa01.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(funkydance)\');"><img src="http://statics.plurk.com/373cd2f23dab7528d4875170d13d64f7.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(idiot)\');"><img src="http://statics.plurk.com/8863234ebea13f109c9b15ba19a4531c.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(lonely)\');"><img src="http://statics.plurk.com/8738c7a1c402f41b5319abe504ce9687.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(scenic)\');"><img src="http://statics.plurk.com/db4c4a7d141fdcaca4d4b11f8fb360db.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(hassle)\');"><img src="http://statics.plurk.com/ced6d40bebe2d424b59322b311fc04bb.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(panic)\');"><img src="http://statics.plurk.com/b62d1e55e8311af5bc7526c595ac1dbb.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(okok)\');"><img src="http://statics.plurk.com/9b6f4864c822e1a97c98507c2b41a74f.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(yahoo)\');"><img src="http://statics.plurk.com/e49c8ae965452550c98fc7f99741ae0d.gif" /></a> <a href="javascript:void(0);" onClick="javascript:document.evaluate(\'/html/body/div/form/div/input\', document, null, XPathResult.ANY_TYPE, null).iterateNext().value+=(\'(cry)\');"><img src="http://statics.plurk.com/318416eab5a856bddb1e106a21ff557a.gif" /></a>';

var emoticons = '<a id="showhide" href="javascript:void(0);" onClick="javascript:document.getElementById(\'emoticons\').style.display=(document.getElementById(\'emoticons\').style.display==\'none\'?\'block\':\'none\');" style="font-size:12px;margin:2px 0 5px 10px;">Show/Hide Emoticons</a><div id="emoticons" style="display:none;font-size:12px;margin:0 0 10px 10px;">' + karma0 + '<br />' + karma25 + '<br />' + karma50 + '<br />' + karma81 + '<br />' + karma100 + '<br />' + karmar + '</div>';

document.evaluate("/html/body/div/form/div", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML += emoticons;

document.evaluate("/html/body/div/form/p/select", document, null, XPathResult.ANY_TYPE, null).iterateNext().value = 'says';