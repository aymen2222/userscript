// ==UserScript==
// @name           Yahoo Emoticons 
// @namespace      https://www.facebook.com/koyeu
// @description    Su dung Yahoo emoticons cho cac mang xa hoi Facebook, Twitter, Youtube... Thanks to VOZ Forums
// @include        *
// @version        1.0
// ==/UserScript==
function replaceByClass(className, obj) {
	if(obj.getElementsByClassName) {
		var nodes = obj.getElementsByClassName(className);
			for(i in nodes) {
				if(typeof(nodes[i].innerHTML)=="string") {
					changeEmoticon(nodes[i]); 
				}
			}
		}
	}
				
function changeEmoticon(node) {
	node.innerHTML = node.innerHTML
		.replace(/&quot;&nbsp;\)/g, '&quot;)');
	node.innerHTML = node.innerHTML
			.replace(/\:\)/g, "<img src=\'http://matcuoi.com/smilies/yahoo_1.gif\' />")
			.replace(/\:\(/g, "<img src=\'http://matcuoi.com/smilies/yahoo_2.gif\' />")
			.replace(/\;\)/g, "<img src=\'http://matcuoi.com/smilies/yahoo_3.gif\' />")
			.replace(/\:D/g, "<img src=\'http://matcuoi.com/smilies/yahoo_4.gif\' />")			
			.replace(/\:d/g, "<img src=\'http://matcuoi.com/smilies/yahoo_4.gif\' />")	
			.replace(/\;;\)/g, "<img src=\'http://matcuoi.com/smilies/yahoo_5.gif\' />")
			.replace(/\>\:\D\</g, "<img src=\'http://matcuoi.com/smilies/yahoo_6.gif\' />")			
			.replace(/\>\:\d\</g, "<img src=\'http://matcuoi.com/smilies/yahoo_6.gif\' />")
			.replace(/\:\-\\/g, "<img src=\'http://matcuoi.com/smilies/yahoo_7.gif\' />")		
}				
				function commonInsert(obj) {
					if(typeof(obj)=="object") {
						replaceByClass('tweet-text', obj); //Twitter
						replaceByClass('js-tweet-text', obj); //Twitter
						replaceByClass('mobile_status', obj); //Facebook
						replaceByClass('GBThreadMessageRow_Body_Content', obj); //Facebook
replaceByClass('translationEligibleUserMessage', obj);
replaceByClass('fbPhotosPhotoCaption', obj);
						replaceByClass('statusUnit', obj); //Facebook
						replaceByClass('notesBlogText', obj); 
						replaceByClass('messageBody', obj); //Facebook
						replaceByClass('commentBody', obj); //Facebook
						replaceByClass('uiStreamMessage', obj); //Facebook
						replaceByClass('UIStory_Message', obj); //Facebook
						replaceByClass('fbQuestionsPollClickTarget', obj); //Facebook
						replaceByClass('pas fbQuestionsPollResultsBar', obj); //Facebook
						replaceByClass('inputboxusr', obj); //Facebook
						replaceByClass('mvs answerText', obj); //Facebook
						replaceByClass('fbPhotoCaptionText', obj); //Facebook
						replaceByClass('cx-comment-display', obj);
						replaceByClass('watch-expander yt-uix-expander  yt-uix-expander-collapsed', obj); //YouTube
						replaceByClass('comment-text', obj); //YouTube
						replaceByClass('a-f-i-W-p', obj); //Google Plus
						replaceByClass('a-b-f-i-p-R', obj); //Google Plus
						replaceByClass('wackmsg_new_sender', obj); // Google Plus
						replaceByClass('wackmsg wackmsgtype_c', obj); //Google Plus 
						replaceByClass('chat_content', obj); // Google PlusnotesBlogText
					}
				}
function nodeInserted(event) {
    commonInsert(event.target);
}commonInsert(document);
document.addEventListener('DOMNodeInserted', function(event) {
        commonInsert(event.target);
    }, false);

