// ==UserScript==
// @name        Ikariam ExMachina
// @namespace   PhasmaExMachina
// @description A collection of mods, tools, and hacks for Ikariam by PhasmaExMachina
// @author      PhasmaExMachina  - Updates by Tuskin/OmegaSharp
// @website     http://userscripts.org/scripts/show/117578
// @website-old http://www.facebook.com/pages/Ikariam-ExMachina/134196059935036
// @version     0.144
//
// @include     http://m*.ikariam.*/*
// @include     http://*.ikariam.*/*
// @exclude   http://s*.ikariam.*/*
// @exclude   http://*.ikariam.*/board
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require   http://userscripts.org/scripts/source/122886.user.js
// @require   http://userscripts.org/scripts/source/99735.user.js
// @require   http://userscripts.org/scripts/source/99733.user.js
// @require   http://userscripts.org/scripts/source/99734.user.js      
// 
// @history		0.144 only include m*.ikariam.* sites ...
// @history		0.143 fixed capacity when there are goods on sale at trading post
// @history		0.142 remove donate ambrosia for upgrade
// @history		0.141 missing icons (gif to png)
// @history		0.140 Enable m*.ikariam.*/* so this works for mobile version
// @history		0.139 Updated IkaTools, removed Ikariam Army Helper (if need it, install separately)
// @history		0.138 Auto reload (10minutes) when network error occurs
// @history		0.137 More antiPlus features
// @history		0.136 Bugfix when resources >= 1M; auto click daily bonus
// @history		0.133 Fixed alliance highlighter
// @history		0.132 Bugfix at IkaTools.updateData
// @history		0.131 Attempt to fix continuous reload problem
// @history		0.130 Updated strip ads
// @history		0.130 Added arabic language (translation by Lan Hekary)
// @history		0.130 Added clear all data to avoid old corrupt data problems
// @history		0.129 Added unitNames and shipNames for tooltips (they're saved on barracks and shipyard views)
// @history		0.129 Fixed island view city list
// @history		0.129 Fixed troop movement view for incoming attacks
// @history		0.129 Fixed resource details tooltip showing under world navigator
// @history		0.129 Fixed pillage helper ally parse from island view
// @history		0.129 Fixed empire overview totalrow
// @history		0.129 Fixed citiview for firefox 3.6
// @history		0.128 Fix for firefox 3.6
// @history		0.127 Added RTL support
// @history		0.127 Upadted militaryAdvisorMilitaryMovements to remove mouseover events
// @history		0.127 Fixed city level parse for armyhelper
// @history		0.127 More code rewrite
// @history		0.126 Fixed removal of building from autoupgrade when viewing other city
// @history		0.126 Updated museum view
// @history		0.125 Fixed infobox display on island view
// @history		0.124 Fixed island view parse
// @history		0.123 Updated code for v0.4.2.4
// @history		0.123 Improved some coding and performance
// @history		0.123 Fixed Building Overview to show only owned cities
// @history		0.123 Updated Building Overview to show multiple ports and wharehouses
// @history		0.122 Fixed unit count when being attacked from other island
// @history		0.121 Fixed autobuild bug with undefined cityId
// @history		0.120 Fixed display of "current city" / "all cities" display on auto build
// @history		0.120 Fixed spy report view detection after a mission
// @history		0.120 Updated spy overview to refresh generals score when data is more than 3 hours old
// @history		0.119 Fixed spy overview display at options view
// @history		0.118 Fixed buildings bug
// @history		0.117 Added greek language (translation by Panagiotis Papazoglou)
// @history		0.116 Fixed autobuild view parse
// @history		0.116 Fixed barracks resources tooltip display (ikariam bug)
// @history		0.115 Added spy report parse on report list at safehouse
// @history		0.115 Updated jquery to 1.5.2
// @history		0.115 Added turkish language (translation by Segwarg)
// @history		0.114 Fixed to display text in selected language at options window
// @history		0.113 Added polish language (translation by pitmm)
// @history		0.112 Added language option
// @history		0.112 Added russian language (translation by XIMIera)
// @history		0.111 Fixed check for updates in option's about tab
// @history		0.110 Added multi-language support
// @history		0.110 Added spanish language
// @history		0.110 Added hiding of Premium Jet Propulsion at transport view
// @history		0.110 Splitted option to show player scores from city list at island view (new option at search tab)
// @history		0.109 Fixed spies functionality
// @history		0.109 Added spy report archive hide for antiplus
// @history		0.108 Added option to view only Owned cities at Military Overview (Must be enabled in options)
// @history		0.108 Removed Premium Build place on island view for antiplus
// @history		0.107 Added display of building name at city view (Must be enabled in options)
// @history		0.106 Added message archive hide for antiplus
// @history		0.106 Fixed message type parse for non english versions
// @history		0.105 Fixed safe capacity calculation (from mindfox fixes)
// @history		0.104 Fixed Allies Highlighter for Chrome
// @history		0.104 Added Hide/Show offline allies on alliance view
// @history		0.103 Fixed prediction of population at townhall view
// @history		0.102 Fixed Dump and warehouse premium hidding
// @history		0.101 Added hidding of new premium options from v0.4.2 at resources and tradegood view
// @history		0.100 Fixed resources bug
// @history		0.99 Added hidding of new premium options from v0.4.2
// @history		0.99 Updated ArmyHelper to v0.31
// @history		0.98 Fixed detection of capacity
//
// ==/UserScript==

var startTime = new Date();

ScriptUpdater.check(117578, "0.144");

var isChrome = navigator.userAgent.match(/Chrome/i);

Config.prefix = document.domain;
Config.footerHtml = '';
Config.reloadOnSave = true;
Config.scriptName = "Ikariam ExMachina";

var optionLanguage = {'Auto select':''};
for (var code in IkaTools.text)
{
  optionLanguage[IkaTools.text[code].name] = code;
}

Config.settings = {
	"Dummy":{
  	fields:{
  		language:{
  			type:'select',
  			label:'Language',
  			text:'language for this script',
  			options:optionLanguage,
  			value:'',
  		}
   }
  }
}

IkaTools.config.language = Config.get('language');
IkaTools.lang = IkaTools.getLanguage();

var optionLists = {};
optionLists[IkaTools.getText('optionsListValues', 'disabled', 'Disabled')] = 'none';
optionLists[IkaTools.getText('optionsListValues', 'dropdown', 'Dropdown')] = 'dropdown';
optionLists[IkaTools.getText('optionsListValues', 'bottom', 'Bottom')] = 'bottom';

Config.settings = {
	"General":{
    label: IkaTools.getText('optionsLabels', 'general', "General"),
  	fields:{
  		language:{
  			type:'select',
  			label:'Language',
  			text:'language for this script',
  			options:optionLanguage,
  			value:'',
  		},
  		keyboardShortcuts:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'keyboardShortcuts', 'Keyboard Shortcuts'),
  			text:IkaTools.getText('optionsTexts', 'keyboardShortcuts', 'press 1 through # of cities to change city etc.'),
  			value:false,
  		},
  		antiPlus:{
  			type:'checkbox',
  			label:'Anti-Plus',
  			text:IkaTools.getText('optionsTexts', 'antiPlus', 'remove all Ikariam Plus features'),
  			value:true,
  		},
  		dailyBonus:{
  			type:'checkbox',
  			label:'Daily-Bonus',
  			text:IkaTools.getText('optionsTexts', 'dailyBonus', 'auto-click daily activity bonus'),
  			value:true,
  		},
  		resourceLinks:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'resourceLinks', 'Resource Links'),
  			text:IkaTools.getText('optionsTexts', 'resourceLinks', 'turn resource icons into links'),
  			value:true,
  		},
  		expandCargo:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'expandCargo', 'Expand Cargo'),
  			text:IkaTools.getText('optionsTexts', 'expandCargo', 'always show cargo in military movements'),
  			value:true,
  		},
  		messagePreviews:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'messagePreviews', 'Message Previews'),
  			text:IkaTools.getText('optionsTexts', 'messagePreviews', 'show first line of messages instead of subject'),
  			value:true,
  		},
  		ajaxNextMessages:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'ajaxNextMessages', 'Message Append'),
  			text:IkaTools.getText('optionsTexts', 'ajaxNextMessages', 'append messages to list when clicking next...'),
  			value:true,
  		},
  		stripAds:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'stripAds', 'Strip Ads'),
  			text:IkaTools.getText('optionsTexts', 'stripAds', 'remove banner ads'),
  			value:true,
  		},
  		stripFacebook:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'stripFacebook', 'Strip Facebook'),
  			text:IkaTools.getText('optionsTexts', 'stripFacebook', 'remove facebook buttons'),
  			value:true,
  		},
  		sessionExpireRedirect:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'sessionExpireRedirect', 'Session Redirect'),
  			text:IkaTools.getText('optionsTexts', 'sessionExpireRedirect', 'go to login page on session expire'),
  			value:false,
  		},
  		leftAlign:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'leftAlign', 'Left Align'),
  			text:IkaTools.getText('optionsTexts', 'leftAlign', 'game window on left to leave room for things on right'),
  			value:false,
  		},
  		autoBuildFeaturesEnabled:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'autoBuildFeaturesEnabled', 'Auto Build'),
  			text:IkaTools.getText('optionsTexts', 'autoBuildFeaturesEnabled', 'enable auto build features (in testing)'),
  			value:true,
  		},
  		allianceColor:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'allianceColor', 'Alliance Highlighter'),
  			text:IkaTools.getText('optionsTexts', 'allianceColor', 'lets you highlight alliences in different colors'),
  			value:true,
  		},
  		hideFriendsBar:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'hideFriendsBar', 'Hide Friends'),
  			text:IkaTools.getText('optionsTexts', 'hideFriendsBar', 'hide the friends bar'),
  			value:false,
  		}
  	}
  },
  "Overviews":{
  	label: IkaTools.getText('optionsLabels', 'overviews', "Overviews"),
    fields:{
    		empireOverview:{
    			type:'select',
    			label:IkaTools.getText('optionsLabels', 'empireOverview', 'Empire'),
    			text:IkaTools.getText('optionsTexts', 'empireOverview', 'overview of empire'),
    			options:optionLists,
    			value:'dropdown',
    		},
    		buildingsOverview:{
    			type:'select',
    			label:IkaTools.getText('optionsLabels', 'buildingsOverview', 'Buildings'),
    			text:IkaTools.getText('optionsTexts', 'buildingsOverview', 'overview of buildings'),
    			options:optionLists,
    			value:'dropdown',
    		},
    		militaryOverview:{
    			type:'select',
    			label:IkaTools.getText('optionsLabels', 'militaryOverview', 'Military'),
    			text:IkaTools.getText('optionsTexts', 'militaryOverview', 'overview of your armies'),
    			options:optionLists,
    			value:'dropdown',
    		},
    		militaryOverviewOnlyOwned:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'militaryOverviewOnlyOwned', 'Military'),
    			text:IkaTools.getText('optionsTexts', 'militaryOverviewOnlyOwned', 'overview only Owned Cities'),
    			value:true,
    		},
    		targetsOverview:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'targetsOverview', 'Espionage'),
    			text:IkaTools.getText('optionsTexts', 'targetsOverview', 'espionage overview under research advisor'),
    			value:true,
    		},
    		movementsOverview:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'movementsOverview', 'Movements'),
    			text:IkaTools.getText('optionsTexts', 'movementsOverview', 'overview of movements under show island'),
    			value:true,
    		},
    		buildingList:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'buildingList', 'Building List'),
    			text:IkaTools.getText('optionsTexts', 'buildingList', 'add list of buildings to the show town button'),
    			value:true,
    		},
    		tradeOverview:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'tradeOverview', 'Trade'),
    			text:IkaTools.getText('optionsTexts', 'tradeOverview', 'shows overview of all trade offers in trading post'),
    			value:true,
    		},
    		worldOverview:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'worldOverview', 'World Map'),
    			text:IkaTools.getText('optionsTexts', 'worldOverview', 'adds a world map button to show world map overview'),
    			value:true,
    		},
    		museumOverview:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'museumOverview', 'Museum'),
    			text:IkaTools.getText('optionsTexts', 'museumOverview', 'show active and vacation status along with cities'),
    			value:true,
    		},
    		resourceDetails:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'resourceDetails', 'Resource Details'),
    			text:IkaTools.getText('optionsTexts', 'resourceDetails', 'show detailed resource information'),
    			value:true,
    		},
    		showBuildingLevels:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'showBuildingLevels', 'Building Levels'),
    			text:IkaTools.getText('optionsTexts', 'showBuildingLevels', 'show building levels in city view'),
    			value:true,
    		},
    		showBuildingNames:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'showBuildingNames', 'Building Names'),
    			text:IkaTools.getText('optionsTexts', 'showBuildingNames', 'show building names in city view'),
    			value:false,
    		},
    		biggerWorldMap:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'biggerWorldMap', 'Big Map'),
    			text:IkaTools.getText('optionsTexts', 'biggerWorldMap', 'increase the height of the world map'),
    			value:true,
    		},
    		splitPersonalities:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'splitPersonalities', 'Split Personalities'),
    			text:IkaTools.getText('optionsTexts', 'splitPersonalities', 'split advisor links'),
    			value:true,
    		}
  	  }
  },
  "Events":{
  	label:IkaTools.getText('optionsLabels', 'events', "Events"),
  	html:'<p>'+IkaTools.getText('optionsTexts', 'events', 'General Notification Settings')+'</p>',
  	fields:{
  		ikariamNotifyEnabled:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'ikariamNotifyEnabled', 'Enabled'),
  			text:IkaTools.getText('optionsTexts', 'ikariamNotifyEnabled', 'enable event notifications') + ' (more options <a href="http://' + document.domain + '/index.php?view=options#ikaNotify">here</a>)',
  			value:false,
  		},
  		ikaNotifyShowTimer:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'ikaNotifyShowTimer', 'Show Timer'),
  			text:IkaTools.getText('optionsTexts', 'ikaNotifyShowTimer', 'show time until next check for events'),
  			value:true,
  		},
  		eventsEmailHtml:{
  			type:'html',
  			value:'<p style="border-top:1px solid #ccc; padding-top:1em !important;"><strong>Email Settings</strong> - see "Email Settings" on <a href="http://userscripts.org/scripts/show/102851" target="_blank">this page</a> for more information.</p>',
  		},
  		emailNoticeUrl:{
  			type:'text',
  			label:IkaTools.getText('optionsLabels', 'emailNoticeUrl', 'Server'),
  			text:IkaTools.getText('optionsTexts', 'emailNoticeUrl', 'URL of the email server to use'),
  			value:'http://phasmaexmachina.freehostingcloud.com/notifier/',
  		}
  	}
  },
  "Pillaging":{
    label:IkaTools.getText('optionsLabels', 'pillaging', "Pillaging"),
  	html:'<p>'+IkaTools.getText('optionsTexts', 'pillaging', 'Tools to help with pillaging')+'</p>',
  	fields:{
  		islandShowSpies:{
  			type:'checkbox', 
  			label:IkaTools.getText('optionsLabels', 'islandShowSpies', 'Spy Icons'),
  			text:IkaTools.getText('optionsTexts', 'islandShowSpies', 'show spy icons next to the cities in which you have spies'),
  			value:true,
  		},
  		islandBlinkInactives:{
  			type:'checkbox', 
  			label:IkaTools.getText('optionsLabels', 'islandBlinkInactives', 'Blink Inactives'),
  			text:IkaTools.getText('optionsTexts', 'islandBlinkInactives', 'make names of inactive cities blink'),
  			value:false,
  		},
  		islandMarkLoners:{
  			type:'checkbox', 
  			label:IkaTools.getText('optionsLabels', 'islandMarkLoners', 'Mark Loners'),
  			text:IkaTools.getText('optionsTexts', 'islandMarkLoners', 'names of cities not in an alliance in red'),
  			value:true,
  		},
  		playerCitiesInIslandView:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'playerCitiesInIslandView', 'City List'),
  			text:IkaTools.getText('optionsTexts', 'playerCitiesInIslandView', 'show list of player cities on island view'),
  			value:true,
  		}/*,
  		showMissionGold:{
  			type:'checkbox',
  			label:'Gold',
  			text:'show spy out treasure chamber',
  			value:false,
  		},
  		showMissionResearch:{
  			type:'checkbox',
  			label:'Research',
  			text:'show spy out research level',
  			value:false,
  		} */
  	}
  },
  "Treaties":{
    label:IkaTools.getText('optionsLabels', 'treaties', "Treaties"),
		html:'<p>'+IkaTools.getText('optionsTexts', 'treaties', 'Select the locations where you would like to have CT icons displayed:')+'</p>',
		fields:{
			ctAlliance:{
				type:'checkbox',
				label:IkaTools.getText('optionsLabels', 'ctAlliance', 'Alliance'),
				text:IkaTools.getText('optionsTexts', 'ctAlliance', 'show icons next players in alliance views'),
				value:true,
			},
			ctInbox:{
				type:'checkbox',
				label:IkaTools.getText('optionsLabels', 'ctInbox', 'Inbox'),
				text:IkaTools.getText('optionsTexts', 'ctInbox', 'show icons next to messages in inbox'),
				value:true,
			},
			ctIslandView:{
				type:'checkbox',
				label:IkaTools.getText('optionsLabels', 'ctIslandView', 'Island'),
				text:IkaTools.getText('optionsTexts', 'ctIslandView', 'show icons next to city names in island view'),
				value:true,
			},
			ctTradeTreaties:{
				type:'checkbox',
				label:IkaTools.getText('optionsLabels', 'ctTradeTreaties', 'Treaty'),
				text:IkaTools.getText('optionsTexts', 'ctTradeTreaties', 'show icons next players in treaty view'),
				value:true,
			}
		}
	},
	"Search":{
	  label:IkaTools.getText('optionsLabels', 'search', "Search"),
  	html:'<p>'+IkaTools.getText('optionsTexts', 'search', 'Where do you want search icons shown?')+'</p>',
  	fields:{
  		searchIconIslandPlayer:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'searchIconIslandPlayer', 'Island Players'),
  			text:IkaTools.getText('optionsTexts', 'searchIconIslandPlayer', 'next to player name in island view'),
  			value:true,
  		},
  		searchIconOccupier:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'searchIconOccupier', 'Occupiers'),
  			text:IkaTools.getText('optionsTexts', 'searchIconOccupier', 'next to occupier name in city view'),
  			value:true,
  		},
  		searchIconHighscore:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'searchIconHighscore', 'High Score'),
  			text:IkaTools.getText('optionsTexts', 'searchIconHighscore', 'next to player names in high score'),
  			value:true,
  		},
  		searchIconInbox:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'searchIconInbox', 'Inbox'),
  			text:IkaTools.getText('optionsTexts', 'searchIconInbox', 'next to player names in inbox'),
  			value:true,
  		},
  		searchIconAlliancePlayers:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'searchIconAlliancePlayers', 'Alliance'),
  			text:IkaTools.getText('optionsTexts', 'searchIconAlliancePlayers', 'next to player names in alliance'),
  			value:true,
  		},
  		searchIconMuseum:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'searchIconMuseum', 'Museum'),
  			text:IkaTools.getText('optionsTexts', 'searchIconMuseum', 'next to players and alliances in museum'),
  			value:true,
  		},
  		searchScore:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'searchScore', 'Show Scores'),
  			text:IkaTools.getText('optionsTexts', 'searchScore', 'show scores in island view (uses the following list)'),
  			value:true,
  		},
  		searchScoresHtml:{
  			type:'html',
  			value:'<p><br/>'+IkaTools.getText('optionsTexts', 'searchScoresHtml', 'Show the following scores in island view:')+'<br/></p>',
  		},
  		scoreTotal:{ type:'checkbox', label:IkaTools.getText('optionsLabels', 'scoreTotal', 'Total'), text:IkaTools.getText('optionsTexts', 'scoreTotal', 'show total score in island view'), value:false, },
  		scoreMilitary:{ type:'checkbox', label:IkaTools.getText('optionsLabels', 'scoreMilitary', 'Military'), text:IkaTools.getText('optionsTexts', 'scoreMilitary', 'show military score in island view'), value:false, },
  		scoreOffense:{ type:'checkbox', label:IkaTools.getText('optionsLabels', 'scoreOffense', 'Offense'), text:IkaTools.getText('optionsTexts', 'scoreOffense', 'show offense score in island view'), value:false, },
  		scoreDefense:{ type:'checkbox', label:IkaTools.getText('optionsLabels', 'scoreDefense', 'Defense'), text:IkaTools.getText('optionsTexts', 'scoreDefense', 'show defense score in island view'), value:false, },
  		scoreResources:{ type:'checkbox', label:IkaTools.getText('optionsLabels', 'scoreResources', 'Offense'), text:IkaTools.getText('optionsTexts', 'scoreResources', 'show resources score in island view'), value:false, },
  		scoreGold:{ type:'checkbox', label:IkaTools.getText('optionsLabels', 'scoreGold', 'Gold'), text:IkaTools.getText('optionsTexts', 'scoreGold', 'show gold score in island view'), value:false, },
  		scoreBuilder:{ type:'checkbox', label:IkaTools.getText('optionsLabels', 'scoreBuilder', 'Builder'), text:IkaTools.getText('optionsTexts', 'scoreBuilder', 'show builder score in island view'), value:false, },
  		scoreBuildings:{ type:'checkbox', label:IkaTools.getText('optionsLabels', 'scoreBuildings', 'Buildings'), text:IkaTools.getText('optionsTexts', 'scoreBuildings', 'show buildings score in island view'), value:false, },
  		scoreScientists:{ type:'checkbox', label:IkaTools.getText('optionsLabels', 'scoreScientists', 'Scientists'), text:IkaTools.getText('optionsTexts', 'scoreScientists', 'show scientists score in island view'), value:false, },
  		scoreResearch:{ type:'checkbox', label:IkaTools.getText('optionsLabels', 'scoreResearch', 'Research'), text:IkaTools.getText('optionsTexts', 'scoreResearch', 'show research score in island view'), value:false, },
  		scoreTrading:{ type:'checkbox', label:IkaTools.getText('optionsLabels', 'scoreTrading', 'Trading'), text:IkaTools.getText('optionsTexts', 'scoreTrading', 'show trading score in island view'), value:false, },
  		scoreDonations:{ type:'checkbox', label:IkaTools.getText('optionsLabels', 'scoreDonations', 'Donations'), text:IkaTools.getText('optionsTexts', 'scoreDonations', 'show donations score in island view'), value:false, }
  	}
  },
  "About":{
    label:IkaTools.getText('optionsLabels', 'about', "About"),
  	html:'	<p><a href="http://userscripts.org/scripts/show/' + ScriptUpdater.scriptId + '" target="_blank" style="font-weight:bold !important;">Ikariam ExMachina v' + ScriptUpdater.scriptCurrentVersion +
  			'</a> by <a href="http://userscripts.org/users/PhasmaExMachina" target="_blank">PhasmaExMachina</a> - Updates by <a href="http://userscripts.org/users/omegasharp" target="_blank">OmegaSharp</a>' +
  			'<p>This is a collection of Ikariam hacks by PhasmaExMachina - Updates by Tuskin/OmegaSharp</p>',
  	fields:{
  		debugMode:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'debugMode', 'Debug Mode'),
  			text:IkaTools.getText('optionsTexts', 'debugMode', 'show script execution time'),
  			value:false,
  		}
  	}
  }
};

IkaTools.config.debugMode = Config.get('debugMode');

unsafeWindow.ikaEmpireGoTo = IkaTools.goTo;

if(Config.get('stripAds'))
{
  $(document.querySelectorAll('iframe[src*="http://delivery.ads"]')).hide();
//  $(document.querySelectorAll('a[href*="?view=premium"]')).hide();
}
    
var ExMachina = {
	buttonMilitaryAdviser:document.querySelector('#advMilitary'),
	movementsUpdated:false,
	worldOverview:false,
	townOverview:false,
	buildingsOverview:false,
	expiredMovements:{},
	currentCityId: 0,
	currentIslandId: 0,
	init:function() 
	{
		if (document.querySelector('#errorPageContainer')) {
       window.setTimeout("document.location.reload()", 10*60*1000); // wait for 10 minutes then reload
		}
		else if(Config.get('dailyBonus') && document.querySelector('#dailyActivityBonus'))
		{
			document.querySelector('#dailyActivityBonus > form').submit();
		}
		else if(document.querySelector('#loginForm') == null && document.querySelector('#mobileLoginForm') == null && document.body.id != 'errorLoggedOut' && document.querySelectorAll('#mainview').length == 1) 
		{	// in game
			var aux;
			
			IkaTools.init();
			IkaTools.buildingTypes.contains = function(p_val) 
			{
				return (this.indexOf(p_val) > -1);
			}
			
			this.currentCityId = IkaTools.getCurrentCityId();
			this.currentIslandId = IkaTools.getCurrentIslandId();

			if(Config.get('stripFacebook'))
				GM_addStyle('#facebook_button { display:none; }');
			if(Config.get('hideFriendsBar'))
				GM_addStyle('#friends { display:none; }');
			// shortcuts
			if(Config.get('keyboardShortcuts')) {
				ExMachina.keyboardShortcutsListenerActive = true;
				function goToCityByIndex(i) {
					var options = document.querySelector('#citySelect').options;
					if(i <= options.length) {
						var city = IkaTools.getCityById(options[i].value);
						if(city) {
							if (IkaTools.getView().match(/^(plunder|sendSpy)$/))
								IkaTools.goTo(document.location.toString(), city.id); 
							else if (IkaTools.getView().match(/^(resource|tradegood)$/) && IkaTools.cityGetIslandId(city))
								IkaTools.goTo(document.location.toString().replace(/id=\d+/, 'id=' + IkaTools.cityGetIslandId(city)), city.id); 
							else if (IkaTools.getView() == 'worldmap_iso')
								IkaTools.goTo('/index.php?view=worldmap_iso', city.id); 
							else if (IkaTools.getView() == 'island') {
								var islandId = IkaTools.cityGetIslandId(city);
								if(islandId)
									IkaTools.goTo('/index.php?view=island&islandId=' + islandId + '&cityId=' + city.id, city.id);
								else 
									IkaTools.goTo('/index.php?view=city&id=' + city.id, city.id);
							} else {
								var building = IkaTools.cityGetBuildingByType(IkaTools.getView(), city);
								if (building) {
								
									IkaTools.goTo('/index.php?view=' + building.type + '&id=' + city.id + '&position=' + building.position, city.id);
								}
								else 
									IkaTools.goTo('/index.php?view=city&id=' + city.id, city.id);
							}
						}
					}
				}
				
				aux = $(document.querySelectorAll('input'));
				aux.focus(function() {
					ExMachina.keyboardShortcutsListenerActive = false;
				});
				aux.blur(function() {
					ExMachina.keyboardShortcutsListenerActive = true;
				});
				
				aux = $(document.querySelectorAll('textarea'));
				aux.focus(function() {
					ExMachina.keyboardShortcutsListenerActive = false;
				});
				aux.blur(function() {
					ExMachina.keyboardShortcutsListenerActive = true;
				});
				function goToBuilding(type) {
					var building = IkaTools.cityGetBuildingByType(type);
					if(building)
						document.location = '/index.php?view=' + type + '&id=' + ExMachina.currentCityId + '&position=' + building.position;
					else 
					{
						var cities = IkaTools.getCities();
						cities.forEach(function(city)
						{
							var building = IkaTools.cityGetBuildingByType(type, city);
							if(building)
								IkaTools.goTo('/index.php?view=' + type + '&id=' + building.cityId + '&position=' + building.position, city.id);
						});
					} 
				}
				$(window).keyup(function(event) {
					if (ExMachina.keyboardShortcutsListenerActive && !event.metaKey) {
						switch (event.which) {
							case 49: case 97: goToCityByIndex(0); break;
							case 50: case 98: goToCityByIndex(1); break;
							case 51: case 99: goToCityByIndex(2); break;
							case 52: case 100: goToCityByIndex(3); break;
							case 53: case 101: goToCityByIndex(4); break;
							case 54: case 102: goToCityByIndex(5); break;
							case 55: case 103: goToCityByIndex(6); break;
							case 56: case 104: goToCityByIndex(7); break;
							case 57: case 105: goToCityByIndex(8); break;
							case 48: case 96: goToCityByIndex(9); break;
							case 109: goToCityByIndex(10); break;
							case 65: goToBuilding('academy'); break; // A - go to academy
							case 66: goToBuilding('barracks'); break; // B - go to barracks
							case 72: goToBuilding('safehouse'); break; // H - go to hideout 
							case 84: goToBuilding('tavern'); break; // T - go to tavern
							case 77: goToBuilding('museum'); break; // M - go to museum
							case 76: goToBuilding('townHall'); break; // L - town hall
							case 80: goToBuilding('branchOffice'); break; // P - trade post
							case 69: goToBuilding('embassy'); break; // E - embassy
							case 70: 
								document.location = '/index.php?view=finances'; 
								break; // D - diplomatic advisor
							case 68: 
								document.location = '/index.php?view=diplomacyAdvisor'; 
								break; // D - diplomatic advisor
							case 192: 
								document.location = '/index.php?view=tradeAdvisor';
								break; // ` - town hall
							case 87:
								document.location = '/index.php?view=worldmap_iso'; 
								break; // W - go to warehouse
							case 67: // C - go to city view
								document.location = '/index.php?view=city&id=' + ExMachina.currentCityId; 
								break;
							case 73: // I - go to Island
								document.location = '/index.php?view=island&islandId=' + IkaTools.cityGetIslandId() + '&cityId=' + ExMachina.currentCityId; 
								break;
						}
					}			
				}); 
			}
			
			GM_addStyle('#avatarNotes .button2 { display:none !important; }\
			 #avatarNotes #messageBox { padding-top:5px !important; }\
			 #avatarNotes .ft { margin-top:-5px !important; } #yui-gen0 { bottom:5px !important; }');
			if(Config.get('leftAlign'))
				GM_addStyle('#container { margin-'+IkaRTL.txtLeft+':40px !important; }');
			//------------------------------ Anti Plus ----------------------------------------
			function antiPlus() { 
				var ikaVersion = $(document.querySelector('#GF_toolbar li.version')).text();
				try {
					var mainVersion = ikaVersion.match(/v\d\.(\d+)\./)[1];
				} catch(e) {
					var mainVersion = 4;
				}
				GM_addStyle('.ambrosiaDonateForm, .premiumExchange, .premium, .ambrosia, .plusteaser, .pluslink { display:none !important; }\
							#globalResources li.transporters, #globalResources li.gold { position:relative; top:-28px; }');
				GM_addStyle('#advisors .premium { display:block !important; }');
				
			}
			if(Config.get('antiPlus')) antiPlus(); else {
				GM_addStyle('#GF_toolbar ul { padding-'+IkaRTL.txtLeft+':0 !important; position:relative; '+IkaRTL.txtLeft+':-10px; }');
			}
			//------------------------------ Resource Links -----------------------------------
      if (Config.get('resourceLinks') || Config.get('resourceDetails'))
      {
  		  var rNav = IkaTools.querySelectorAsArray('#cityResources ul.resources li.population, #cityResources ul.resources li.wood, #cityResources ul.resources li.wine, #cityResources ul.resources li.marble, #cityResources ul.resources li.glass, #cityResources ul.resources li.sulfur', document);
  		}
			function resourceLinks() {
				if (rNav.length > 2) 
				{
					$(document.querySelector('#cityNav')).css('height', '10px');
  				rNav.forEach(function(item) 
  				{
  				  var resource = item.className;
						switch (resource) {
							case 'wood':
								var url = '/index.php?view=resource&type=resource&id=' + ExMachina.currentIslandId;
								break;
							case 'population':
								var url = "/index.php?view=townHall&id=" + ExMachina.currentCityId + "&position=0";
								break;
							default:
								var url = '/index.php?view=tradegood&type=tradegood&id=' + ExMachina.currentIslandId;
						}
						switch (resource) {
							case 'glass':
								var translated = 'crystal';
								break;
							case 'population':
								var translated = 'inhabitants';
								break;
							default:
								var translated = resource;
						}
						item.style.cursor = 'pointer';
						item.addEventListener('mouseover', function(){
							this.style.cursor = 'pointer';
							var target = IkaTools.querySelector('#value_' + translated, this); 
							if (target != null)
							{
  							target.style.whiteSpace = 'nowrap';
  							target.style.textShadow = '#666 2px 2px 2px';
  							target.style.color = '#000000';
  						}
						}, true);
						item.addEventListener('mouseout', function(){
							var target = IkaTools.querySelector('#value_' + translated, this); 
							if (target != null)
							{
  							target.style.textShadow = 'none';
  							target.style.color = 'inherit';
  						}
						}, true);
						item.addEventListener('click', function(){
							document.location = url;
						}, true);
					});
				}
			}
			if(Config.get('resourceLinks')) resourceLinks();
			//------------------------------ Resource Details -----------------------------------
			function resourceDetails() {
				GM_addStyle('#cityResources ul.resources li .tooltip td { padding:2px !important; width: auto !important; }\
					 		#cityResources ul.resources li div.capacity { border:1px inset #906646; height:3px; position:relative; top:-6px; '+IkaRTL.txtLeft+':1px; width:95%; }\
					 		#cityResources ul.resources li div.onhand { position:absolute; top:0; '+IkaRTL.txtLeft+':0; height:inherit; background-color:#a00; }\
					 		#cityResources ul.resources li div.safe { position:absolute; top:0;  height:inherit; background-color:#690; }\
				');
				rNav.forEach(function(item) 
				{
					if (item.className != 'population')
					{
  					var qty = $('span:eq(1)', item);
  					qty.css({'fontSize': '12px', 'position': 'relative', 'top': '-3px'});
  					var onHand = parseInt(qty.text().replace(/k\s*$/,'000').replace(/[^\d]/g, ''));
  					var tooltip = $(IkaTools.querySelector('.tooltip', item));
  					// get capacity
						var capacity = tooltip.text().match(/capacity\D*((\d|,|\.)+k?).*$/im);
  					if(capacity) capacity = capacity[1];
						else capacity = tooltip.text().match(/((\d|,|\.)+k?).*$/i)[1]; // buggy when there is trading post
  					var isThousands = /k$/g.test(capacity);
  					capacity = parseInt(capacity.replace(/[^\d]/g, ''));
  					capacity = isThousands ? capacity * 1000 : capacity;
  					var capacityPercent = Math.round(onHand / capacity * 100);
  					var change = IkaTools.cityGetResourceChange(item.className);
  					var ttHtml = '<table cellpadding="0" cellspacing="0" border="0">';
  					ttHtml += '<tr><td>'+IkaTools.getText('interface', 'Capacity', "Capacity")+': </td><td>' +  IkaTools.addCommas(capacity) + ' (' + capacityPercent + '%)</td></tr>';
  					// calculate qty safe
  					var numWarehouses = 0;
  					var warehouseLevels = 0;
  					var buildings = $.isArray(IkaTools.getCurrentCity().buildings) ? IkaTools.getCurrentCity().buildings : [];
  					
  					buildings.forEach(function(building)
  					{
  						if (building.type == 'warehouse') 
  						{
  							numWarehouses++;
  							warehouseLevels += parseInt(building.level);
  						}
  					});
  					
  					var qtyProtected = (warehouseLevels * 480) + 100;
  					var safe = onHand > qtyProtected ? qtyProtected : onHand;
  					var safePercent = safe > 0 ? Math.round(safe / onHand * 100) : 0;
  					var unsafe = qtyProtected > onHand ? 0 : onHand - qtyProtected;
  					var unsafePercent = Math.round(unsafe / onHand * 100);
  					if(onHand > 0)
  						ttHtml += '<tr><td>'+IkaTools.getText('interface', 'Safe', "Safe")+':  </td><td> ' + IkaTools.addCommas(safe) + ' (' + safePercent + '%)</td></tr>';
  					if (unsafe > 0) {
  						var lootableColor = unsafePercent > 50 ? ' style="color:#a00; font-weight:bold"' : '';
  						ttHtml += '<tr><td' + lootableColor + '>'+IkaTools.getText('interface', 'Lootable', "Lootable")+':  </td><td' + lootableColor + '> ' + IkaTools.addCommas(unsafe) + ' (' + unsafePercent + '%)</td></tr>';
  					}
  					if (change != 0) {
  						// display income
  						ttHtml += '<tr><td style="padding-top:.75em !important;">'+IkaTools.getText('interface', 'Income', "Income")+': </td><td style="padding-top:.75em !important;">' + (change > 0 ? '+' : '') + change + ' (' + (change > 0 ? '+' : '') + IkaTools.addCommas(change * 24) + ' / '+IkaTools.getText('interface', 'day', "day")+')</td></tr>';
  						// show time until full
  						var hoursTotal = change > 0 ? (capacity - onHand) / change : onHand / Math.abs(change);
  						var hours = Math.floor(hoursTotal);
  						var minutesTotal = hoursTotal * 60;
  						var secondsTotal = minutesTotal * 60;
  						var days = Math.floor(hoursTotal / 24);
  						var hours = Math.floor(hoursTotal % 24);
  						var minutes = Math.floor(minutesTotal % 60);
  						var fullColor = hoursTotal <= 24 ? ' style="color:#a00; font-weight:bold"' : '' ;
  						ttHtml += '<tr><td' + fullColor + '>' + (change > 0 ? IkaTools.getText('interface', 'Full', 'Full') : IkaTools.getText('interface', 'Empty', 'Empty')) + ':  </td><td' + fullColor + '>' + (days > 0 ? days + 'd ' : '') + (hours > 0 ? hours + 'h ' : '') + (minutes > 0 ? minutes + 'm ' : '') + '</td></tr>';
  					}
  					tooltip.html(ttHtml + '</table>');
  					tooltip.css('top', '30px');					
  					// bar
  					qty.after('<div class="capacity"><div class="onhand" style="opacity:' + (.9 * (capacityPercent / 100)) + '; width:' + capacityPercent + '%"> </div><div class="safe" style="width:' + (capacityPercent * (safePercent / 100)) + '%"> </div></div>');
				  }
				});
			}
			if(Config.get('resourceDetails')) resourceDetails();
			//------------------------------ Empire Overview ----------------------------------
			function empireOverview() {
				ExMachina.buttonWorldView = document.querySelector('#changeCityForm .viewWorldmap');
				
				if(Config.get('empireOverview') != 'bottom' && Config.get('empireOverview') != 'none' && ExMachina.buttonWorldView)
					ExMachina.buttonWorldView.addEventListener('mouseover', ExMachina.drawEmpireOverview, false);
				else if(Config.get('empireOverview') == 'bottom')
					$(document).ready(ExMachina.drawEmpireOverview);
			}
			if(Config.get('empireOverview') && Config.get('empireOverview') != 'none') empireOverview();
			//------------------------------ Movements Overview ----------------------------------			
			function movementsOverview() {
				ExMachina.buttonIslandView = document.querySelector('#changeCityForm .viewIsland');
				ExMachina.buttonIslandView.addEventListener('mouseover', function() {
  				if (typeof(ExMachina.militaryOverview) == 'undefined') 
  				{
        		GM_addStyle('#ikaEmpireTradeMovements th { text-align:center; font-weight:bold; padding:.5em 0; } \
        					      #ikaEmpireTradeMovements td { padding:.25em; text-align:center; }\
        					      #ikaEmpireTradeMovements a { background:none !important; padding:0 !important; width:auto !important; height:auto !important; font-size:inherit !important; text-decoration:underline !important; color:#000099 !important; display:inline !important; }');
  					ExMachina.militaryOverview = document.createElement('div');
  					ExMachina.militaryOverview.setAttribute('style', 'display:block; background-color:#FEE8C8; border:1px solid #9D836A; text-align:'+IkaRTL.txtLeft+'; width:950px; margin-'+IkaRTL.txtLeft+':-405px; z-index:9000; position:relative;');
  					ExMachina.militaryOverview.innerHTML = '<div id="ikaEmpireMilitaryOverviewTransport"><div style="font-size:2em; padding:2em; text-align:center;">loading ...</div></div>';
  					ExMachina.buttonIslandView.appendChild(ExMachina.militaryOverview);
  				}
  				if (!ExMachina.movementsUpdated) {
  					ExMachina.movementsUpdated = true;
  					if (IkaTools.getView() == "militaryAdvisorMilitaryMovements") {
  						ExMachina.drawMovements(IkaTools.getMovements());
  					}
  					else {
  						IkaTools.getMovementsUpdate(ExMachina.drawMovements);
  					}
  				}
					ExMachina.militaryOverview.style.display = 'block';
				}, true);
				ExMachina.buttonIslandView.addEventListener('mouseout', function(){
          if (!!ExMachina.movementTimer)
          {
            clearInterval(ExMachina.movementTimer);
          }
					if (typeof(ExMachina.militaryOverview) != 'undefined') {
						ExMachina.militaryOverview.style.display = 'none';
					}
				}, true);
			}
			if(Config.get('movementsOverview')) $(document).ready(movementsOverview);
			//------------------------------ Buildings Overview ----------------------------------				
			function buildingsOverview() {
				ExMachina.buttonTownAdviser = document.querySelector('#advCities');
				if(Config.get('buildingsOverview') == 'dropdown')
					ExMachina.buttonTownAdviser.addEventListener('mouseover', ExMachina.drawBuildingOverview, false);
				else
					$(document).ready(ExMachina.drawBuildingOverview);
			}
			if(Config.get('buildingsOverview') && Config.get('buildingsOverview') != 'none') buildingsOverview();
				
			if(Config.get('buildingList') && document.querySelectorAll('#cityResources li').length > 2) {
				if(document.querySelector('#changeCityForm .viewCity') != null)
					ExMachina.buttonTownView = document.querySelector('#changeCityForm .viewCity');
				else
					ExMachina.buttonTownView = document.querySelector('#changeCityForm .viewRelatedCity');
				ExMachina.buttonTownView.addEventListener('mouseover', ExMachina.drawTownOverview, false);
			}
			
			function militaryView() {
				if (Config.get('militaryOverview') != 'bottom' && Config.get('militaryOverview') != 'none')
					ExMachina.buttonMilitaryAdviser.addEventListener('mouseover', ExMachina.drawMilitaryOverview, false);
				else
					ExMachina.drawMilitaryOverview();
			}
			if (Config.get('militaryOverview') && Config.get('militaryOverview') != 'none') $(document).ready(militaryView);

      Treaty.init();
			Pillage.init();
			IkaSearch.init();
			if(Config.get('splitPersonalities')) SplitPersonalities.init();
			if(Config.get('allianceColor')) AllianceColor.init();
			if(Config.get('autoBuildFeaturesEnabled')) IAB.init();
			if(Config.get('ikariamNotifyEnabled') || IkaTools.getView() == 'options') IkaNotify.init();
			if(Config.get('researchLibrarian') && (IkaTools.getView() == 'researchOverview' || IkaTools.getView() == 'researchDetail'))
				Librarian.init();
			
			//------------------------------ Process View --------------------------------------
			if (typeof(ExMachina.views[IkaTools.getView()]) == 'function') 
				ExMachina.views[IkaTools.getView()]();
			
			IkaTools.addOptionsLink("Ikariam ExMachina");
			
			//------------------------------ External Scripts -----------------------------------
			function loadExternalScripts() {
				//if(Config.get('externalArmyHelper')) ExternalScripts.ArmyHelper();
			}
			loadExternalScripts();
			
			// update any cities that aren't already loaded
			/*
			var cities = IkaTools.getCities();
			for(var i = 0; i < cities.length; i++) {
				if(cities[i].level == 0)
					IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=city&id=' + cities[i].id, function(root) {
						ExMachina.views.city(root);
					});
			}
			*/
		} 
		else if (document.querySelectorAll('form#loginForm').length == 1 || document.querySelectorAll('form#mobileLoginForm').length == 1) 	// login
			ExMachina.views.login(); 
		else if(document.body.id == 'errorLoggedOut')
			ExMachina.views.errorLoggedOut();
			
    if(Config.get('debugMode')) 
    {
      var d = new Date();
      var endTime = d.getTime();
      IkaTools.debug('ExMachina Total: ' + (endTime - startTime) + 'ms');
    }
	},
	updateMilitaryOverview:function() 
	{
		var top = {phalanx:'-3px', steamgiant:'0;', spearman:'-1px', swordsman:'-3px', slinger:'-1px', archer:'0', marksman:'1px', ram:'-6px', catapult:'-9px', mortar:'-8px', gyrocopter:'-8px', bombardier:'-12px', cook:'-3px', medic:'1px'};
		var cities = IkaTools.getCities();
		// get totals
		var totalUnits = {};
		var totalUnitsInTraining = {};
		var totalShips = {};
		var styleAdded = false;

		IkaTools.unitTypes.forEach(function(unitType)
		{
			totalUnits[unitType] = 0;
			totalUnitsInTraining[unitType] = 0;
			GM_addStyle('#empireMilitaryOverview th.' + unitType + ' { background-image:url(/skin/characters/military/x40_y40/y40_' + unitType + '_faceright.png) !important; background-repeat:no-repeat; background-position:center ' + (typeof(top[unitType]) != 'undefined' ? top[unitType] : '-2px') + '; }');	
		});
		IkaTools.shipTypes.forEach(function(shipType)
		{
			totalShips[shipType] = 0;
			GM_addStyle('#empireMilitaryOverview th.ship_' + shipType + ' { background-image:url(/skin/characters/fleet/40x40/ship_' + shipType + '_r_40x40.png) !important; background-repeat:no-repeat; background-position:center ' + (typeof(top[shipType]) != 'undefined' ? top[shipType] : '-2px') + '; }');	
		});

		cities.forEach(function(city)
		{
			IkaTools.unitTypes.forEach(function(unitType)
			{
			  totalUnits[unitType] += IkaTools.cityGetUnitQty(unitType, city); 
				if (city.owned)
				  totalUnitsInTraining[unitType] += IkaTools.cityGetUnitInTraining(unitType, city).qty; 
			});
			IkaTools.shipTypes.forEach(function(shipType)
			{
				totalShips[shipType] += IkaTools.cityGetShipQty(shipType, city); 
			});
		});

		var html = '<table cellspacing="0" cellpadding="0" border="0" style="margin:0; width:100%;">\
				<tr valign="middle" style="background-image:url(/skin/input/button.png); height:14px;">\
					<th><strong>'+IkaTools.getText('interface', 'City', "City")+'</strong></th>';
		// get movements
		var movs = IkaTools.getMovements();
		var unitsInTrans = {};
		var shipsInTrans = {};
		var str = '';

		movs.forEach(function(mov)
		{
			switch(mov.mission) {
				case 'plunder': var cityId = mov.originId; break;
				case 'deployarmy': var cityId = mov.direction == 'left' ? mov.originId : mov.targetId; break;
				case 'defend': var cityId = mov.direction == 'left' ? mov.originId : mov.targetId; break;
				case 'deployfleet': var cityId = mov.direction == 'left' ? mov.originId : mov.targetId; break;
				default: var cityId = false;
			}
			if(cityId) 
			{
				unitsInTrans[cityId] = typeof(unitsInTrans[cityId]) == 'undefined' ? {} : unitsInTrans[cityId];
				shipsInTrans[cityId] = typeof(shipsInTrans[cityId]) == 'undefined' ? {} : shipsInTrans[cityId];
				
    		mov.units.forEach(function(unit)
    		{
					try { var type = unit.iconSrc.match(/y40_([^_]+)/)[1]; } catch(e) { var type = false; }
					if(type) {
						totalUnits[type] += parseInt(unit.qty);
						unitsInTrans[cityId][type] = typeof(unitsInTrans[cityId][type]) == 'undefined' ? 0 : unitsInTrans[cityId][type];
						unitsInTrans[cityId][type] += parseInt(unit.qty);   
					}
					try { var type = unit.iconSrc.match(/ship_([^_]+)/)[1]; } catch(e) { var type = false; }
					if(type && type != 'transport') {
						totalShips[type] += parseInt(unit.qty);
						shipsInTrans[cityId][type] = typeof(shipsInTrans[cityId][type]) == 'undefined' ? 0 : shipsInTrans[cityId][type];
						shipsInTrans[cityId][type] += parseInt(unit.qty);   
					}
				});
			}
		});
		
		IkaTools.unitTypes.forEach(function(unitType)
		{
      if (totalUnitsInTraining[unitType] || (totalUnits[unitType] > 0))
			  html += '<th class="' + unitType + '" title="'+IkaTools.getUnitName(unitType)+'"> </th>';	
		});	
		IkaTools.shipTypes.forEach(function(shipType)
		{
      if (totalShips[shipType] > 0)
        html += '<th class="ship_' + shipType + '" title="'+IkaTools.getShipName(shipType)+'"> </th>';	
		});
		html += '<th><img id="ikaEmpireMilitaryRefresh" src="' + ExMachina.icons.refreshSmall + '" style="float:'+IkaRTL.txtRight+'; margin-'+IkaRTL.txtRight+':2px; cursor:pointer;" title="'+IkaTools.getText('interface', 'reloadMilitary', "Reload all military information")+'"/></th></tr>';
		
		var even = false;
		cities.forEach(function(city)
		{
			if (!Config.get('militaryOverviewOnlyOwned') || city.owned)
			{
    		even = !even;
    		var view = city.type ? 'relatedCities' : 'cityMilitary-army';
    		html += '<tr' + (even ? ' class="even"' : '') + '>\
    			<td style="width:230px;">';
    		html += '<a href="javascript:ikaEmpireGoTo(\'/index.php?view=' + view + '&id=' +  city.id + '\', ' +  city.id + ');" style="font-weight:' + (city.id == ExMachina.currentCityId ? 'bold' : 'normal') + ';">' + 
    				city.name + ' (' + city.level + ')</a></td>';
    		IkaTools.unitTypes.forEach(function(unitType)
    		{
    			if (totalUnitsInTraining[unitType] || (totalUnits[unitType] > 0)) 
    			{
    				var inTraining = (city.owned) ? IkaTools.cityGetUnitInTraining(unitType, city) : 0;
    				var inTransit = (typeof(unitsInTrans[city.id]) != 'undefined' && typeof(unitsInTrans[city.id][unitType]) != 'undefined') ? unitsInTrans[city.id][unitType] : false;
    				var qty = IkaTools.cityGetUnitQty(unitType, city);
    				html += '<td align="center">' + (qty > 0 ? qty : ((inTransit || inTraining.qty > 0) ? '' : '-')) + 
    							(inTransit ? ' <span title="' + inTransit + ' '+IkaTools.getText('interface', 'inTransitTo', "in transit towards")+' ' + IkaTools.cityGetSimpleName(city) + '" style="font-size:.8em !important;">(+' + inTransit + ')</span>' : '') +
    							(inTraining.qty > 0 ? ' <span title="' + inTraining.qty + ' '+IkaTools.getText('interface', 'trainingBarracks', "training in barracks")+'" style="font-size:.8em !important; cursor:help;">(+' + inTraining.qty + ')</span>' : '') +
    						'</td>';
    			}
    		});
    		IkaTools.shipTypes.forEach(function(shipType)
    		{
    			if (totalShips[shipType] > 0) 
    			{
    				var inTransit = (typeof(shipsInTrans[city.id]) != 'undefined' && typeof(shipsInTrans[city.id][shipType]) != 'undefined') ? shipsInTrans[city.id][shipType] : false;
    				var qty = IkaTools.cityGetShipQty(shipType, city);
    				html += '<td align="center">' + (qty > 0 ? qty : (inTransit ? '' : '-')) + (inTransit ? ' <span title="' + inTransit + ' '+IkaTools.getText('interface', 'inTransitTo', "in transit towards")+' ' + IkaTools.cityGetSimpleName(city) + '" style="font-size:.8em !important;">(+' + inTransit + ')</span>' : '') +'</td>';
    			}
    		});
    		html += '<td style="min-width: 120px;">';
    		if (city.id != ExMachina.currentCityId) {
    			html += '<a href="http://' + document.domain + '/index.php?view=deployment&deploymentType=fleet&destinationCityId=' +  city.id + '" title="'+IkaTools.getText('interface', 'StationFleets', "Station fleets")+'"><img src="http://' + document.domain + '/skin/actions/move_fleet.png" style="display:inline; float:'+IkaRTL.txtRight+'; height:14px; margin-'+IkaRTL.txtLeft+':5px;"/></a>\
    					<a href="http://' + document.domain + '/index.php?view=deployment&deploymentType=army&destinationCityId=' +  city.id + '" title="'+IkaTools.getText('interface', 'DeployTroops', "Deploy troops")+'"><img src="http://' + document.domain + '/skin/actions/move_army.png" style="display:inline; float:'+IkaRTL.txtRight+'; height:14px;"/></a>';
    		} else {
    			html += '<img src="http://' + document.domain + '/skin/actions/move_fleet.png" style="display:inline; float:'+IkaRTL.txtRight+'; height:14px; margin-'+IkaRTL.txtLeft+':5px; opacity:.3;"/>\
    					<img src="http://' + document.domain + '/skin/actions/move_army.png" style="display:inline; float:'+IkaRTL.txtRight+'; height:14px; opacity:.3;"/>';
    		}
    		// island link
    		if(IkaTools.cityGetIslandId(city) > 0) {
    			html += '<img src="http://' + document.domain + '/skin/layout/icon-island.png" style="cursor:pointer; height:16px; margin-'+IkaRTL.txtRight+':2px; float:'+IkaRTL.txtRight+';" name="index.php?view=island&cityId=' + city.id + '&islandId=' + city.islandId + '" title="'+IkaTools.getText('interface', 'ViewCityIsland', "View city on island")+'"/>';
    		}
    		
    		if (city.owned)
    		{
      		var barracks = IkaTools.cityGetBuildingByType('barracks', city);
      		var shipyard = IkaTools.cityGetBuildingByType('shipyard', city);
      		if(shipyard)
      			html += '<a title="'+IkaTools.getText('interface', 'GoToShiyard', "Go to shipyard")+' ('+IkaTools.getText('interface', 'level', "level")+' ' + shipyard.level + ')" href="javascript:ikaEmpireGoTo(\'/index.php?view=shipyard&position=' + shipyard.position + '&id=' + shipyard.cityId + '\', ' + shipyard.cityId + ');"/><img src="http://' + document.domain + '/skin/img/city/building_shipyard.png" style="float:'+IkaRTL.txtRight+'; margin-'+IkaRTL.txtRight+':5px; height:14px;"/></a>';
      		if(barracks)
      			html += '<a title="'+IkaTools.getText('interface', 'GoToBarracks', "Go to barracks")+' ('+IkaTools.getText('interface', 'level', "level")+' ' + barracks.level + ')" href="javascript:ikaEmpireGoTo(\'/index.php?view=barracks&position=' + barracks.position + '&id=' + barracks.cityId + '\', ' + barracks.cityId + ');"/><img src="http://' + document.domain + '/skin/img/city/building_barracks.png" style="float:'+IkaRTL.txtRight+'; margin-'+IkaRTL.txtRight+':5px; height:14px;"/></a>';
    		}
    		html += '</td></tr>';
    	}
		});			
		// draw totals
		html += '<tr style="background-color:#F7E4AF;"><td> </td>'
		IkaTools.unitTypes.forEach(function(unitType)
		{
			if(totalUnitsInTraining[unitType] || (typeof(totalUnits[unitType]) != 'undefined' && totalUnits[unitType] > 0)) {
				html += '<td style="text-align:center;">' + 
							totalUnits[unitType] +
							(totalUnitsInTraining[unitType] > 0 ? ' <span title="' + totalUnits[unitType] + ' + ' + totalUnitsInTraining[unitType] + ' '+IkaTools.getText('interface', 'training', "training")+' = ' + (totalUnits[unitType] + totalUnitsInTraining[unitType]) + ' '+IkaTools.getText('interface', 'total', "total")+'" style="font-size:.8em !important; cursor:help;">(+' + totalUnitsInTraining[unitType] + ')</span>' : '') +  
						'</td>';
			}
		});
		IkaTools.shipTypes.forEach(function(shipType)
		{
			if(typeof(totalShips[shipType]) != 'undefined' && totalShips[shipType] > 0) {
				html += '<td style="text-align:center;">' + totalShips[shipType] + '</td>';
			}
		});
		html += '<td></td></tr></table>';
		ExMachina.troopOverview.innerHTML = html;

		IkaTools.querySelectorAsArray('td a', ExMachina.troopOverview).forEach(function(item) {
			if(item.href.match(/\ikaEmpireGoTo/)) {
				var url = item.href.match(/ikaEmpireGoTo\(('|")(.+?)('|")/)[2];
				var cityId = item.href.match(/id=(\d+)/)[1];
				$(item).click(function() { IkaTools.goTo(url, cityId); });
				item.href = "javascript:void(0);";
			}
		});
		$(document.querySelector('#ikaEmpireMilitaryRefresh')).click(ExMachina.reloadMilitaryOverview);
		$(IkaTools.querySelectorAll('img[src*="icon-island"]', ExMachina.troopOverview)).click(function() { 
			IkaTools.goTo(this.name, this.name.match(/cityId=(\d+)/)[1]); 
		});
	},
	reloadMilitaryOverview:function() {
		$(document.querySelector('#ikaEmpireMilitaryRefresh')).attr('src', ExMachina.icons.loading);
		IkaTools.reloadAllMilitary(function() {
			var d = new Date();
			IkaTools.setVal('militaryLastCheck', d.getTime());
			ExMachina.updateMilitaryOverview();
			$(document.querySelector('#ikaEmpireMilitaryRefresh')).attr('src', ExMachina.icons.checkmark);
		});
	},
	drawBuildingOverview:function() {
		// check for owned building types
		var ownedBuildings = [];
		var cities = IkaTools.getOwnedCities();		
		var numPorts = 0;
		var maxPorts = 0;
		var numWarehouses = 0;
		var maxWarehouses = 0;

		cities.forEach(function(city)
		{
  		numPorts = 0; 
  		numWarehouses = 0; 
  		city.buildings.forEach(function(building)
  		{
				if (building.type == 'port')
				{
				  numPorts++;
				  if (numPorts > maxPorts)
				  {
  				  maxPorts++;
  				  ownedBuildings.push(building.type);
  				}
			  }
			  else if (building.type == 'warehouse')
				{
				  numWarehouses++;
				  if (numWarehouses > maxWarehouses)
				  {
  				  maxWarehouses++;
  				  ownedBuildings.push(building.type);
  				}
			  }
			  else if (ownedBuildings.indexOf(building.type) == -1)
				{
				  ownedBuildings.push(building.type);
				}
			});
		});
		ownedBuildings.sort();		
		
		if(!IkaTools.buildingsOverview) {
			IkaTools.buildingsOverview = document.createElement('div');
			IkaTools.buildingsOverview.id = "ikaEmpireBuildingOverview";
			GM_addStyle('#ikaEmpireBuildingOverview{ display:none; background-color:#FEE8C8; border:1px solid #9D836A; text-align:'+IkaRTL.txtLeft+'; width:950px; margin-'+IkaRTL.txtLeft+':-597px; position:relative; z-index:30000; }');
			GM_addStyle('#ikaEmpireBuildingOverview table tbody tr td a { padding:0 !important; height:auto !important; width:auto !important; background:none !important; }');
			GM_addStyle('#ikaEmpireBuildingOverview a { height:auto; width:auto; } #ikaEmpireBuildingOverview table tbody tr td a:hover { text-decoration:underline !important; }');
						
			IkaTools.buildingsOverview.style.display = 'block'; 
			var table = document.createElement('table');
			table.style.width = "100%";
			var html = '<tr valign="middle" style="background-image:url(/skin/input/button.png);"><td><div style="width:80px; padding-'+IkaRTL.txtLeft+':1em;"></div></td>';
			ownedBuildings.forEach(function(buildingType)
			{
				html += '<td style="text-align:center; padding:0 .05em;" title="';
				html += IkaTools.getText('buildings', buildingType);
				html += '"><img src="http://' + document.domain + '/skin/img/city/building_';
				html += buildingType == 'townHall' ? 'townhall' : buildingType;
				html += '.png" style="max-height:21px; max-width:28px; margin-top:5px;"/></td>\</td>';
			});
			html += '</tr>';
			// draw buildings in each town
			cities.forEach(function(city, i)
			{
				var construction = IkaTools.cityGetBuildBuilding(city);
				// city name
				html += '<tr style="border-top:1px dotted #9D836A; background-color:' + (i % 2 != 0 ? "#FDF7DD" : "inherit") +
				        '" valign="middle"><td style="padding:.5em;"><a href="javascript:ikaEmpireGoTo(\'http://' + document.domain + 
				        '/index.php?view=city&id=' + city.id + '\', '+ city.id + ')"';
				if(ExMachina.currentCityId == city.id) 
					html += ' style="font-weight:bold;"';
				html += '>' + city.name + ' (' + city.level + ')</a></td>';
				// buildings
    		numPorts = 0; 
    		numWarehouses = 0; 
				ownedBuildings.forEach(function(buildingType)
				{
  				if (buildingType == 'port')
  				{
						var building = IkaTools.cityGetBuildingByType(buildingType, city, numPorts);
  				  numPorts++;
  				}
  			  else if (buildingType == 'warehouse')
  				{
						var building = IkaTools.cityGetBuildingByType(buildingType, city, numWarehouses);
  				  numWarehouses++;
  				}
  			  else
  			  {
						var building = IkaTools.cityGetBuildingByType(buildingType, city);
  			  }
					html += '<td name="c_' + building.cityId + '_p_' + building.position + '" style="text-align:center; border-'+IkaRTL.txtLeft+':1px dotted #9D836A;">';
					if(building) {
						var isUnderConstruction = construction && construction.position.toString() == building.position.toString();
						html += '<a href="javascript:ikaEmpireGoTo(\'http://' + document.domain + 
						        '/index.php?view=' + building.type + '&position=' + building.position + '&id=' + building.cityId + '\', ' + building.cityId + ');"';
						if(isUnderConstruction) 
							html += ' style="font-weight:bold; color:#000; font-size:1em;"';
						else if(IkaTools.buildingIsMaxed(building)) 
							html += ' style="color:#008;"';
						else if(IkaTools.buildingGetResourceMissingTotal(building) == 0) 
							html += ' style="font-weight:bold; color:#090;"';
						else
							html += ' style="color:#542C0F;"';
						html += '">' + building.level;
						if(isUnderConstruction)
							html += '<span style="padding:0 1px;"> Â» </span>' + (parseInt(building.level) + 1);
						html += '</a>';
					} else
						html += '-';
					html += '</td>';
				});
				html += '</tr>';
			});  
			table.innerHTML = html;
			IkaTools.buildingsOverview.appendChild(table);
			if(Config.get('buildingsOverview') == 'dropdown') {
				ExMachina.buttonTownAdviser.appendChild(IkaTools.buildingsOverview);
				ExMachina.buttonTownAdviser.addEventListener('mouseout', function() { document.querySelector('#ikaEmpireBuildingOverview').style.display = 'none'; }, true);
				//ExMachina.buttonTownAdviser.addEventListener('mouseover', function() { document.querySelector('#cityNav').style.height = "100px"; }, true);
				//ExMachina.buttonTownAdviser.addEventListener('mouseout', function() { document.querySelector('#cityNav').style.height = "10px"; }, true);
			} else {
				$('#container').append(IkaTools.buildingsOverview);
				$(IkaTools.buildingsOverview).css('margin-'+IkaRTL.txtLeft+'', '10px');
				$(IkaTools.buildingsOverview).css('margin-top', '1em');
				$(IkaTools.buildingsOverview).css('z-index', '0');
			}

			IkaTools.querySelectorAsArray('#ikaEmpireBuildingOverview td a', document).forEach(function(item) {
				if(/\ikaEmpireGoTo/.test(item.href)) {
					var url = item.href.match(/ikaEmpireGoTo\(('|")(.+?)('|")/)[2];
					var cityId = item.href.match(/id=(\d+)/)[1];
					$(item).click(function() { IkaTools.goTo(url, cityId); });
					item.href = "javascript:void(0);";
				}
			});
			// resource tooltip

			$('body').append('<div id="buildingOverviewTooltip" style="text-align:'+IkaRTL.txtLeft+'; z-index:40000; background:#FFFBDB; padding:5px 8px; font-size:11px; border:1px solid #542C0F; -webkit-border-radius: 5px; -moz-border-radius: 5px; position:absolute; top:0; '+IkaRTL.txtLeft+':0; display:none;">h </div>');
			
		  var ttp = document.querySelector('#buildingOverviewTooltip');
			$('td', IkaTools.buildingsOverview).mouseout(function(event) {
				ttp.style.display = 'none';
			});
			$('td', IkaTools.buildingsOverview).mousemove(function(event) {
				ttp.style[IkaRTL.txtLeft] =  event.pageX + 10 + 'px';
				ttp.style.top =  event.pageY + 20 + 'px';
			});
			$('td', IkaTools.buildingsOverview).mouseover(function() {
				try {
					var matches = $(this).attr('name').match(/c_(\d+)_p_(\d+)/);
					var building = IkaTools.cityGetBuildingByPosition(parseInt(matches[2]), IkaTools.getCityById(parseInt(matches[1])));
					if(building && !IkaTools.buildingIsMaxed(building)) {
						var hasResources = (IkaTools.buildingGetResourceMissingTotal(building) == 0);
						var html = '<p style="margin-bottom:.5em;' + (hasResources ? ' color:#009900; font-weight:bold;' : '') + '">' + building.name + ' (' + (parseInt(building.level) + 1) + ')</p>';
						var resourceNames = ["wood", "wine", "marble", "glass", "sulfur"];
						var txt = '';
						resourceNames.forEach(function(resourceName)
						{
							if(hasResources) {
								var required = IkaTools.buildingGetResourceRequired(resourceName, building);
								if (required > 0)
									txt += '<nobr><img src="http://' + document.domain + '/skin/resources/icon_' + resourceName + '.png" style="height:12px; margin-'+IkaRTL.txtLeft+':5px; vertical-align:middle;"/> <span style="font-size:.8em;">' + IkaTools.addCommas(required) + '</span></nobr> ';
							} else {
								var missing = IkaTools.buildingGetResourceMissing(resourceName, building);
								if (missing > 0)
									txt += '<nobr><img src="http://' + document.domain + '/skin/resources/icon_' + resourceName + '.png" style="height:12px; margin-'+IkaRTL.txtLeft+':5px; vertical-align:middle;"/> <span style="font-size:.8em;">' + IkaTools.addCommas(missing) + '</span></nobr> ';
							}										 													 
						});
						txt += '<nobr><img src="http://' + document.domain + '/skin/resources/icon_time.png" style="height:14px; margin-'+IkaRTL.txtLeft+':5px; margin-top:-2px; vertical-align:middle;"/> <span style="font-size:.8em;">' + building.resources.time + '</span></nobr> ';
						$(ttp).html(html + '<div>' + (txt != '' ? txt : '???') + '</div>');
						ttp.style.display = 'block';
					}								
				} catch(e) { }
			});
		}
		document.querySelector('#ikaEmpireBuildingOverview').style.display = 'block';
	},
	drawEmpireOverview:function() {
		if(!ExMachina.worldOverview) {

			GM_addStyle('#ikaEmpireOverview tr.ikaEmpireOverviewRow {border-top:1px dotted #9D836A;}\
			             #ikaEmpireOverview tr.ikaEmpireOverviewRowUneven {border-top:1px dotted #9D836A; background-color: #FDF7DD}\
			             #ikaEmpireOverview td.ikaEmpireOverviewCell {border-'+IkaRTL.txtRight+':1px dotted #9D836A;}\
			             #ikaEmpireOverview a.cityLink {display:block; cursor:pointer; height:auto; background:none; width:auto; padding:.8em 1em; text-decoration:none;}\
			             #ikaEmpireOverview a.cityLink:hover { text-decoration:underline !important;}\
			             #ikaEmpireOverview a.resourceLinkFull {color:#ee0000; font-weight:bold;}\
			             #ikaEmpireOverview td.constructionHolder {border-'+IkaRTL.txtRight+':1px dotted #9D836A; font-size:.9em; text-align:center;}\
			             #ikaEmpireOverview td.ikaEmpireOverviewResource {text-align:center; font-size:.9em; padding:0 .2em; border-'+IkaRTL.txtRight+':1px dotted #9D836A;}\
			             #ikaEmpireOverview td.ikaEmpireOverviewResource span {font-size:.8em; padding-'+IkaRTL.txtLeft+':.4em;}\
			             #ikaEmpireOverview td.ikaEmpireOverviewResource a {display:inline; padding:0; width:auto; height:auto; background:none;}\
			             #ikaEmpireOverview a.resourceLinkFull {color:#ee0000; font-weight:bold;}\
			             #ikaEmpireOverview div.ikaEmpireOverviewUsedBar {border:1px outset #FEE8C8; width:50px; height:2px; margin:auto; margin-top:5px;}\
			             #ikaEmpireOverview div.ikaEmpireOverviewUsedBar div {background-color:#aa0000; line-height:2px; height:2px;}\
			             #ikaEmpireOverview img.ikaEmpireOverviewShipIcon {float:'+IkaRTL.txtRight+'; height:14px; margin:1px 10px 0 0;}\
			             #ikaEmpireOverview img.ikaEmpireOverviewResourceIcon {float:'+IkaRTL.txtRight+'; height:14px; margin:1px 4px 0 0; cursor:pointer;}\
			             #ikaEmpireOverview img.ikaEmpireOverviewIslandIcon {cursor:pointer; height:16px; margin-'+IkaRTL.txtRight+':2px; float:'+IkaRTL.txtRight+';}\
			             #ikaEmpireOverview tr.ikaEmpireOverviewTotalRow {border-top:1px dotted #9D836A; height:2em; background-color:#F7E4AF;}\
			             #ikaEmpireOverview tr.ikaEmpireOverviewTotalRow td {text-align:center; font-size:.9em; padding:.5em .2em; border-'+IkaRTL.txtRight+':1px dotted #9D836A;}');

			var cities = IkaTools.getOwnedCities();
			ExMachina.worldOverview = document.createElement('div');
			ExMachina.worldOverview.id = "buildingLinksWorldLinks";
			ExMachina.worldOverview.setAttribute('style', 'display:none; background-color:#FEE8C8; border:1px solid #9D836A; text-align:'+IkaRTL.txtLeft+'; width:950px; margin-'+IkaRTL.txtLeft+':-320px; position:relative;'); 

				var table = document.createElement('table');
				ExMachina.worldOverview.appendChild(table);
				table.id="ikaEmpireOverview";
				table.style.width = "100%";
				table.innerHTML = '<tr valign="bottom" style="background-image:url(/skin/input/button.png)"><td><div style="width:80px; padding-'+IkaRTL.txtLeft+':1em;"></div></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="http://' + document.domain + '/skin/img/city/constructionSite.png" style="height:12px; margin-top:5px;" title="'+IkaTools.getText('interface', 'UnderConstrution', 'Building under construction')+'"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="http://' + document.domain + '/skin/resources/icon_citizen.png" style="height:12px; margin-top:5px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="http://' + document.domain + '/skin/resources/icon_wood.png" style="height:12px; margin-top:5px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="http://' + document.domain + '/skin/resources/icon_wine.png" style="height:12px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="http://' + document.domain + '/skin/resources/icon_marble.png" style="height:12px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="http://' + document.domain + '/skin/resources/icon_glass.png" style="height:12px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="http://' + document.domain + '/skin/resources/icon_sulfur.png" style="height:12px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="http://' + document.domain + '/skin/layout/bulb-on.png" style="height:12px; margin-top:5px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><a href="http://' + document.domain + '/index.php?view=finances" style="background:none; padding:0; display:inline; height:auto; width:auto;"><img src="http://' + document.domain + '/skin/resources/icon_gold.png" style="height:12px; margin-top:5px;"/></a></td>\
								<td></td></tr>';
				var resourceTotals = {gold:0, population:0, wood:0, wine:0, marble:0, glass:0, sulfur:0, research:0};
				var resourceChangeTotals = {gold:0, population:0, wood:0, wine:0, marble:0, glass:0, sulfur:0, research:0};
        var resourceNames = ["population", "wood", "wine", "marble", "glass", "sulfur", "research", "gold"];

				cities.forEach(function(city, i)
				{
					if(!city.type || /tradegood/.test(city.type)) {
						var isCurrent = city.id == ExMachina.currentCityId;
						var tr = document.createElement('tr');
						table.appendChild(tr);
						tr.className = "ikaEmpireOverviewRow" + (i % 2 != 0 ? "Uneven" : "");
							var td = document.createElement('td');
							td.className = "ikaEmpireOverviewCell";
							var a = document.createElement('a');
							a.className="cityLink";
							if (isCurrent)
							{
							  a.style.fontWeight = "bold";
						  }
							a.innerHTML = city.name + ' (' + (IkaTools.cityGetLevel(city) > 0 ? IkaTools.cityGetLevel(city) : '?') + ')'; // + ' (' + city.level + ')';
							a.rev = "/index.php?view=city&id=" + city.id; 
							a.name = city.id;
							a.addEventListener('click', function() {											
								IkaTools.goTo(this.rev, this.name);			
								return false;
							}, true);
							td.appendChild(a);	
							ExMachina.appendBuildingList(city.id, td, '100px', '-2.7em');
							tr.appendChild(td);
							// construction
							var construction = document.createElement('td');
							construction.className = 'constructionHolder';
							construction.id = 'ikaEmpireLinksBuildTime' + city.id;
							tr.appendChild(construction);
							// resources
							resourceNames.forEach(function(type)
							{
								var rTD = document.createElement('td');
									rTD.className = "ikaEmpireOverviewResource";
									var text = IkaTools.addCommas(IkaTools.cityGetResource(type, city));
									if(type != 'gold') {
										var change = IkaTools.cityGetResourceChange(type, city);
										resourceChangeTotals[type] += change;
										text += (change != 0 ?  '<span>(' + (change > 0 ? '+' : '') + change + ')</span>' : '');	
									}
								  else
								  {
								    var change = IkaTools.cityGetResource('gold', city);
								  }
									switch(type) {
										case 'population':
											var full = IkaTools.cityGetResourceMax(type, city) == IkaTools.cityGetResource(type, city) ? 'class="resourceLinkFull"' : '';
											rTD.innerHTML += '<a '+full+' href="http://' + document.domain + '/index.php?view=townHall&position=0&id=' + city.id + '" name="' + city.id +'">' + text + '</a>';	
											break;
										case 'gold':
											rTD.innerHTML += '<a href="http://' + document.domain + '/index.php?view=finances" name="' + city.id +'">' + 
																			((type == 'gold' && IkaTools.cityGetResource(type, city) > 0) ? '+' : '') +
																			IkaTools.addCommas(IkaTools.cityGetResource(type, city)) + '</a>';	
											break;
										case 'research':
											change = IkaTools.cityGetBuildingByType(city, 'academy') ? change : 0;
											if(IkaTools.cityGetBuildingByType(city, 'academy'))
												rTD.innerHTML += '<a href="http://' + document.domain + '/index.php?view=academy&position=' + IkaTools.cityGetBuildingByType(city, 'academy').position + '&id=' + city.id + '" name="' + city.id +'">' + (change > 0 ? change : '-');
											else
												rTD.innerHTML += (change > 0 ? change : '-');
											break;
										case 'wood':
											rTD.innerHTML += '<a href="http://' + document.domain + '/index.php?view=resource&type=resource&id=' + IkaTools.cityGetIslandId(city) + '" name="' + city.id +'">' + text + '</a>';	
											break;
										default:
											rTD.innerHTML += type.toString() != IkaTools.cityGetTradegoodType(city).toString() ? text : '<a href="http://' + document.domain + '/index.php?view=tradegood&type=tradegood&id=' + IkaTools.cityGetIslandId(city) + '" name="' + city.id +'">' + text + '</a>';	;
									}
									$(rTD).click(function(event) {
										event.preventDefault();
										var a = $('a', this);
										if(a.size() > 0) {
											a = a[0];
											var cityId = a.name;
											IkaTools.goTo(a.href, cityId);
										}
									});
									resourceTotals[type] += IkaTools.cityGetResource(type, city);		
									if(type != "gold") {
										var onHand = IkaTools.cityGetResource(type, city);
										if(type == 'research') {
											var percentUsed = Math.floor(IkaTools.cityGetResourceChange(type, city) / IkaTools.cityGetResourceMax(type, city) * 100);
										} else {
											var percentUsed = Math.floor(IkaTools.cityGetResource(type, city) / IkaTools.cityGetResourceMax(type, city) * 100);
										}
										percentUsed = percentUsed > 100 ? 100 : percentUsed;
										var capacity = IkaTools.cityGetResourceMax(type, city);
										rTD.title = IkaTools.getText('interface', 'Capacity', 'Capacity')+': ' +  IkaTools.addCommas(capacity) + ' (' + percentUsed + '%)';
										
										
										if(type == 'wine') {
											rTD.title += " - Wine consumption: " + IkaTools.cityGetWineConsumption(city) + " per hour";
										}
										rTD.innerHTML += '<div class="ikaEmpireOverviewUsedBar" style="">' +
																		   '<div style="width:' + percentUsed + '%; opacity:' + (percentUsed < 100 ? '.' + percentUsed : '1')+ ';"> </div>' +
																		 '</div>';
									}
									rTD.title += change != 0 ? " (" + (change > 0 ? '+' : '') + IkaTools.addCommas(change * 24) + " / "+IkaTools.getText('interface', 'day', 'day')+")" : '';
									// show time until full
									if (type != 'gold' && type != 'research') {
										var hoursTotal = change > 0 ? (capacity - onHand) / change : onHand / Math.abs(change);
										var hours = Math.floor(hoursTotal);
										var minutesTotal = hoursTotal * 60;
										var secondsTotal = minutesTotal * 60;
										var days = Math.floor(hoursTotal / 24);
										var hours = Math.floor(hoursTotal % 24);
										var minutes = Math.floor(minutesTotal % 60);
										var untilFullText = (days > 0 ? days + 'd ' : '') + (hours > 0 ? hours + 'h ' : '') + (minutes > 0 ? minutes + 'm ' : '');
										rTD.title += (change != 0 ? ' ' + (change > 0 ? IkaTools.getText('interface', 'Full', 'Full in')+' ' : IkaTools.getText('interface', 'Empty', 'Empty in')+' ') + untilFullText : '');
										// mark as red if full in less than a day
										if (hoursTotal <= 48) {
											$(rTD).css('color', '#700');
											$('*', rTD).css('color', '#700');
										}
										if (hoursTotal <= 24) {
											$(rTD).css('color', '#a00');
											$('*', rTD).css('color', '#a00');
											$(rTD).css('font-weight', 'bold');
											$('*', rTD).css('font-weight', 'bold');
										}
										if (hoursTotal <= 2) {
											$(rTD).css('font-size', '12px');
											$('*', rTD).css('font-size', '12px');
										}
									}
								tr.appendChild(rTD);	
							});	
							var td2 = document.createElement('td');
							var style = !isCurrent ? ' cursor:pointer;' : ' opacity:0.3';
							var ship = document.createElement('img');
							ship.src = "/skin/actions/transport.png";
							ship.className = "ikaEmpireOverviewShipIcon"
							ship.setAttribute('style', style);
							if(!isCurrent) { 
								ship.title = IkaTools.getText('interface', 'TransportResources', 'Transport resources to') + " " + city.name.replace(/\ /g, ' ');
								ship.name = city.id;
								ship.addEventListener('click', function() { document.location = "/index.php?view=transport&destinationCityId=" + this.name; }, true); 
							}
							td2.appendChild(ship);
							if(IkaTools.cityGetIslandId(city) > 0 && IkaTools.cityGetTradegoodType(city)) {
								var tradegood = document.createElement('img');
									tradegood.src = "/skin/resources/icon_" + IkaTools.cityGetTradegoodType(city) + ".png";
									tradegood.className = "ikaEmpireOverviewResourceIcon";
									tradegood.title = IkaTools.getText('interface', 'Level', 'Level') + " " + (IkaTools.cityGetTradegoodLevel(city) > 0 ? IkaTools.cityGetTradegoodLevel(city) : '?');
									tradegood.name = city.id;
									tradegood.addEventListener('click', function() { IkaTools.goTo("/index.php?view=tradegood&type=tradegood&id=" + IkaTools.cityGetIslandId(IkaTools.getCityById(this.name)), this.name); }, true); 
								td2.appendChild(tradegood);	
							}
							if(IkaTools.cityGetIslandId(city) > 0) {
								var wood = document.createElement('img');
									wood.src = "/skin/resources/icon_wood.png";
									wood.className = "ikaEmpireOverviewResourceIcon";
									wood.title = IkaTools.getText('interface', 'Level', 'Level') + " " + (IkaTools.cityGetSawmillLevel(city) > 0 ? IkaTools.cityGetSawmillLevel(city) : '?');
									wood.name = city.id;
									wood.addEventListener('click', function() { IkaTools.goTo("/index.php?view=resource&type=resource&id=" + IkaTools.cityGetIslandId(IkaTools.getCityById(this.name)), this.name); }, true); 
								td2.appendChild(wood);
							}
							// island link
							if(IkaTools.cityGetIslandId(city) > 0) {
								$(td2).append('<img class="ikaEmpireOverviewIslandIcon" src="http://' + document.domain + '/skin/layout/icon-island.png" name="index.php?view=island&cityId=' + city.id + '&islandId=' + city.islandId + '" title="'+IkaTools.getText('interface', 'ViewCityIsland', 'View city on island')+'"/>');
								$(IkaTools.querySelectorAll('img[src*="icon-island"]', td2)).click(function() { IkaTools.goTo(this.name, this.name.match(/cityId=(\d+)/)[1]); });
							}
							tr.appendChild(td2);
					}
				});
				
				var trTotals = document.createElement('tr');
				trTotals.className = "ikaEmpireOverviewTotalRow";
				trTotals.appendChild(document.createElement('td'));
				trTotals.appendChild(document.createElement('td'));
				trTotals.vAlign = "top";
				resourceNames.forEach(function(type)
				{
					var rtTd = document.createElement('td');
					if (type == 'research') {
						rtTd.innerHTML = '+' + IkaTools.addCommas(resourceChangeTotals['research']);
					} else if(type == 'gold') {
						rtTd.id = 'empireOverviewfinanceTotal';
						
					} else {
						rtTd.innerHTML = (type == 'gold' && resourceTotals[type] > 0) ? '+' : '';
						rtTd.innerHTML += IkaTools.addCommas(resourceTotals[type]);	
						rtTd.innerHTML += resourceChangeTotals[type] != 0 ? '<div style="font-size:.8em; margin-top:2px;">(' + (resourceChangeTotals[type] > 0 ? '+' : '') + IkaTools.addCommas(resourceChangeTotals[type]) + ')</div>' : '';
					}
					rtTd.title = resourceChangeTotals[type] != 0 ? "(" + (resourceChangeTotals[type] > 0 ? '+' : '') + IkaTools.addCommas(resourceChangeTotals[type] * 24) + " / "+IkaTools.getText('interface', 'day', 'day')+")" : "";
					trTotals.appendChild(rtTd);
				});
				trTotals.appendChild(document.createElement('td'));
				table.appendChild(trTotals);	
				
			if (Config.get('empireOverview') == 'dropdown') {
				ExMachina.buttonWorldView.appendChild(ExMachina.worldOverview);
				ExMachina.buttonWorldView.addEventListener('mouseout', function() {
					document.querySelector('#buildingLinksWorldLinks').style.display = 'none';
          if (!!ExMachina.buildTimers)
          {
            clearTimeout(ExMachina.buildTimers);
          }
				}, true);
/*			ExMachina.buttonWorldView.addEventListener('mouseover', function() {
					document.querySelector('#cityNav').style.height = "100px";
				}, true);
				ExMachina.buttonWorldView.addEventListener('mouseout', function() {
					document.querySelector('#cityNav').style.height = "10px";
				}, true);*/
			} else {
				$(document.querySelector('#container')).append(ExMachina.worldOverview);
				$(document.querySelector('#buildingLinksWorldLinks')).css('margin-'+IkaRTL.txtLeft+'', '10px');	
				$(document.querySelector('#buildingLinksWorldLinks')).css('margin-bottom', '1em');	
			}
			// update finances
			function updateFinances() {
				var total = IkaTools.getTotalIncome() - IkaTools.getTotalUpkeep();
				var itm = $(document.querySelector('#empireOverviewfinanceTotal'));
				itm.html('<a href="http://' + document.domain + '/index.php?view=finances" style="display:inline; height:auto; line-height:auto; background:none;">' + (total > 0 ? '+' : '') + IkaTools.addCommas(total) + '</a>');
				itm.css('color', total < 0 ? '#a00' : '');
				itm.css('font-weight', total < 0 ? 'bold' : '');
				itm.attr('title', IkaTools.addCommas(IkaTools.getTotalIncome()) + ' - ' + IkaTools.addCommas(IkaTools.getTotalUpkeep()) + ' '+IkaTools.getText('interface', 'upkeep', 'upkeep')+' (' + (total > 0 ? '+' : '') + IkaTools.addCommas(total * 24) + ' / '+IkaTools.getText('interface', 'day', 'day')+')');
			}
			var d = new Date();
			if(Config.get('empireOverview') == 'dropdown' || !IkaTools.getVal('financesLastUpdated') || !!IkaTools.getVal('financesLastUpdated').toString().match(/^\d+$/) || d.getTime() - IkaTools.getVal('financesLastUpdated') > 1000 * 60 * 10)
				updateFinances();
			IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=finances', function(root) {
				IkaTools.views.finances(root);
				IkaTools.getTotalUpkeep();
				updateFinances();
			});
		}
		document.querySelector('#buildingLinksWorldLinks').style.display = 'block';
		ExMachina.updateBuildTimers();
	},
	drawMilitaryOverview:function() {
		if (!document.querySelector('#empireMilitaryOverview')) {
			GM_addStyle('#empireMilitaryOverview a { display:inline !important; width:auto; }\
					#empireMilitaryOverview * { font-size:12px !important; }\
					#empireMilitaryOverview th, #empireMilitaryOverview td { padding:5px !important; border-bottom:1px dotted #9D836A !important; }\
					#empireMilitaryOverview tr.even { background-color:#FDF7DD !important; } \
					#empireMilitaryOverview th { line-height:14px !important; }\
					#empireMilitaryOverview td { border-'+IkaRTL.txtLeft+':1px dotted #9D836A !important; }');
			IkaTools.troopOverview = true;		
			ExMachina.troopOverview = document.createElement('div');
			ExMachina.troopOverview.id = "empireMilitaryOverview";
			ExMachina.troopOverview.setAttribute('style', 'display:none; background-color:#FEE8C8; border:1px solid #9D836A; text-align:'+IkaRTL.txtLeft+'; width:950px; margin-'+IkaRTL.txtLeft+':-686px; position:relative; z-index:10500;');
			if (Config.get('militaryOverview') != 'bottom' && Config.get('militaryOverview') != 'none') {
				ExMachina.buttonMilitaryAdviser.appendChild(ExMachina.troopOverview);
				ExMachina.buttonMilitaryAdviser.addEventListener('mouseout', function() {
					document.querySelector('#empireMilitaryOverview').style.display = 'none';
				}, true);
				/*
				ExMachina.buttonMilitaryAdviser.addEventListener('mouseover', function() {
					document.querySelector('#cityNav').style.height = "100px";
				}, true);
				ExMachina.buttonMilitaryAdviser.addEventListener('mouseout', function() {
					document.querySelector('#cityNav').style.height = "10px";
				}, true);
				*/
			} else {
				$(document.querySelector('#container')).append(ExMachina.troopOverview);
				$(ExMachina.troopOverview).css('margin-'+IkaRTL.txtLeft+'', '10px');
				$(ExMachina.troopOverview).css('margin-top', '1em');
				$(ExMachina.troopOverview).css('z-index', '0');
				$(ExMachina.troopOverview).show();
			} 
			ExMachina.updateMilitaryOverview();
			// auto refresh military if it's been more than 5 minutes
			var lastCheck = parseInt(IkaTools.getVal('militaryLastCheck'));
			var d = new Date();
			if(lastCheck.toString() == 'NaN' || d.getTime() - lastCheck > 1000 * 3600) {
				ExMachina.reloadMilitaryOverview();
			}
		}
		$(IkaTools.querySelector('#empireMilitaryOverview', ExMachina.buttonMilitaryAdviser)).show();
	},
	drawTownOverview:function() {
		ExMachina.appendBuildingList(ExMachina.currentCityId, ExMachina.buttonTownView);
		ExMachina.buttonTownView.removeEventListener('mouseover', ExMachina.drawTownOverview, false);
		IkaTools.querySelector('.buildingLinks', ExMachina.buttonTownView).style.display = "block";
	},
	appendBuildingList:function(cityId, target, left, top) {
		var div = document.createElement('div');
		div.className = "buildingLinks";
		div.setAttribute('style', 'display:none; background-color:#FEE8C8; border:1px solid #9D836A; text-align:'+IkaRTL.txtLeft+'; width:400px; padding:1em 0 .2em 1em; position:absolute; z-index:1000;'); 
		if(left) { div.style[IkaRTL.txtLeft] = left; }
		if(top) { div.style.marginTop = top; }
		var city = IkaTools.getCityById(cityId);
		if(city.buildings) {
			var construction = IkaTools.cityGetBuildBuilding(city)
			var buildings = sortBuildingsByName(city.buildings);
			buildings.forEach(function(building)
			{
				if (building.position) {
					var a = document.createElement('a');
					a.setAttribute('style', 'display:block; margin-bottom:.8em; font-size:.9em; cursor:pointer; height:auto; background:none; line-height:1em; padding:0; width:100%;');
					a.name = building.cityId;
					a.style.color = (IkaTools.buildingGetResourceMissingTotal(building) == 0 && !IkaTools.buildingIsMaxed(building)) ? '#009900' : 'inherit';
					a.style.color = IkaTools.buildingIsMaxed(building) ? '#000088' : a.style.color;
					a.rev = '/index.php?view=' + building.type + '&position=' + building.position + '&id=' + cityId;
					a.addEventListener('click', function(){
						IkaTools.goTo(this.rev, this.name);
						return false;
					}, true);
					a.addEventListener('mouseover', function(){
						this.style.textDecoration = 'underline';
					}, true);
					a.addEventListener('mouseout', function(){
						this.style.textDecoration = 'none';
					}, true);
					var parsedName = building.name.length > 14 ? building.name.replace(/[^\s]+\s*$/, '') + '...' : building.name;
					a.innerHTML = '<img src="http://' + document.domain + '/skin/img/city/building_' + (building.position == 0 ? 'townhall' : building.type) + '.png" align="absmiddle" style="margin-'+IkaRTL.txtRight+':.5em;  width:24px;"/>' +
					parsedName +
					' (' +
					building.level +
					((construction && construction.position.toString() == building.position.toString()) ? '<span style="padding:0 2px;">Â»</span>' + (parseInt(building.level) + 1) : '') +
					')    ';
					var resourceNames = ["wood", "wine", "marble", "glass", "sulfur"];
  				resourceNames.forEach(function(resourceName)
					{
						var missing = IkaTools.buildingGetResourceMissing(resourceName, building);
						if (missing > 0) {
							a.innerHTML += '<img src="http://' + document.domain + '/skin/resources/icon_' + resourceName + '.png" style="height:12px; margin-'+IkaRTL.txtLeft+':5px;"/> <span style="font-size:.8em;">' + IkaTools.addCommas(missing) + '</span>';
						}
					});
					a.title = building.name + ' (' + building.level + ')';
					div.appendChild(a);
				}
			});
		}
		target.appendChild(div);
		target.addEventListener('mouseover', function() {
			IkaTools.querySelector('.buildingLinks', this).style.display = "block";
		}, true);
		target.addEventListener('mouseout', function() {
			IkaTools.querySelector('.buildingLinks', this).style.display = "none";
		}, true);

	},
	drawMovements:function(movements) {
 		var transportDiv = document.querySelector('#ikaEmpireMilitaryOverviewTransport');
		var movementsHtml = "";
		movements.forEach(function(movement, i) {
			switch(movement.mission) {
				case 'transport': var target = transportDiv; break;
				case 'trade': var target = transportDiv; break;
				default: var target = transportDiv;
			}
			var d = new Date();
			var units = movement.units;
			var iconRowHtml = "";
			var qtyRowHtml = ""
			for(var x = 0; x < units.length; x++) {
				iconRowHtml += '<td style="padding:0 .5em .2em 0;" title="' + units[x].name + '"><img src="' + units[x].iconSrc + '" style="height:14px;"/></td>'; 
				qtyRowHtml += '<td style="padding:0 .5em .2em 0; font-size:.75em;">' + IkaTools.addCommas(units[x].qty) + '</td>'; 
			}
			var unitsHtml = '<table cellpadding="0" align="'+IkaRTL.txtLeft+'" cellspacing="0" border="0" style="width:auto;"><tr>' + iconRowHtml + '</tr><tr>' + qtyRowHtml + ' </tr></table>';
			var arrowColor = movement.type != "hostile" ? 'green' : 'red';
			movementsHtml += '<tr style="' + (i != movements.length - 1 ? 'border-bottom: 1px dotted rgb(157, 131, 106);' : '') + '">'+
				'<td id="ikaEmpireMovementTimer' + movement.id + '">' + IkaTools.formatMilliseconds(parseInt(movement.arrivalTime) - d.getTime()) + '</td>' +
				'<td style="text-align:'+IkaRTL.txtLeft+';">' + unitsHtml + '</td>' +
				'<td><a href="http://' + document.domain + '/index.php?view=island&cityId=' + movement.originId + '"/>' + movement.originCityName + '</a><br>(' + movement.originPlayerName + ')</td>' +
				'<td>' + (movement.direction == 'left' ? '<img src="http://' + document.domain + '/skin/interface/arrow_left_' + arrowColor + '.png" style="height:10px;"/>' : ' ') + '</td>' +
				'<td><img src="' + (movement.mission == 'occupy' ? 'skin/interface/mission_occupy.jpg' : 'skin/interface/mission_' + movement.mission + '.gif') + '" title="' + movement.description + '"/></td>'+
				'<td>' + (movement.direction == 'right' ? '<img src="http://' + document.domain + '/skin/interface/arrow_right_' + arrowColor + '.png" style="height:10px;"/>' : ' ') + '</td>' +
				'<td><div><a href="http://' + document.domain + '/index.php?view=island&cityId=' + movement.targetId + '"/>' + movement.targetCityName + '</a></div>' +
					(movement.originPlayerName ? '(' + movement.targetPlayerName + ')</td>' : '') +
				'<td>' + ((movement.direction != 'left' && typeof(movement.abortHref) != 'undefined')? '<a href="http://' + document.domain + movement.abortHref + '" title="'+IkaTools.getText('interface', 'AbortMission', "Abort Mission")+'" style="padding:none; height:auto; width:auto;"><img src="' + ( '/skin/interface/btn_abort.png') + '"/></a>' : ' ') + '</td>' +
				'</tr>';
		});
		transportDiv.innerHTML = '<table id="ikaEmpireTradeMovements" cellpadding="0" cellspacing="0" border="0" style="width:100%;">'+	
									'<tr style="background-image:url(/skin/input/button.png); border-bottom: 1px dotted rgb(157, 131, 106); vertical-align:middle;"><th>'+IkaTools.getText('interface', 'Time', "Time")+'</th><th>'+IkaTools.getText('interface', 'Units', "Units")+'</th><th>'+IkaTools.getText('interface', 'Origin', "Origin")+'</th><th> </th><th>'+IkaTools.getText('interface', 'Mission', "Mission")+'</th><th> </th><th>'+IkaTools.getText('interface', 'Destination', "Destination")+'</th><th>'+IkaTools.getText('interface', 'Action', "Action")+'</th></tr>' + 
									movementsHtml + '</table>';
  	
  	if (!!ExMachina.movementTimer)
  	{
  	  clearInterval(ExMachina.movementTimer);
  	}
  	ExMachina.movementTimer = setInterval(ExMachina.updateMovementTimers, 1000);
	},
	updateMovementTimers:function() {
		var d = new Date();
		var movements = IkaTools.getMovements();	
		movements.forEach(function(movement) {
			var timeLeft = parseInt(movement.arrivalTime) - d.getTime();
			if(timeLeft <= 0 && typeof(ExMachina.expiredMovements[movement.id]) == 'undefined' && movement.direction) {
				ExMachina.expiredMovements[movement.id] = true;
				ExMachina.growl('movement', "Troop Movement - " + document.domain.replace(/\.ikariam\..+$/, ''), movement.description + ' has ' + (movement.direction == 'right' ? 'arrived in ' + movement.targetCityName : 'returned to ' + movement.originCityName));
			}
			document.querySelector('#ikaEmpireMovementTimer' + movement.id).innerHTML = IkaTools.formatMilliseconds(timeLeft);
		});
	},
	parseMessageList:function() {
		var messagesWrapperId = 'deleteMessages';
		GM_addStyle('#' + messagesWrapperId + ' tr th:first-child + th, #' + messagesWrapperId + ' tr td:first-child + td { display:none; }\
			#' + messagesWrapperId + ' tr td:first-child + td + td { padding-'+IkaRTL.txtLeft+':0 !important; }\
      #' + messagesWrapperId + ' .subject div { text-overflow: ellipsis }\
		')
  	//--------------------------------- Anti Plus --------------------------
  	if(Config.get('antiPlus')) 
  	{ 
  		IkaTools.querySelectorAsArray('#deleteMessages tr.text .reply .button[href*="action=Premium"]',document).forEach(function(item)
  		{
		    item.parentNode.style.display = 'none';
  		});
  	}
  	//--------------------------------- Item Parse --------------------------
		var msgCnt = document.querySelector('#deleteMessages');
    IkaTools.querySelectorAsArray('tr.entry:not(.exMachinaParsed)', msgCnt).forEach(function(item) {
				item.className += ' exMachinaParsed';
				var playerCell = $('td:eq(2)', item);
				playerCell.append(' <nobr></nobr>'); // add tools wrapper next to name
				//-------------------------------- Treaty Tools ----------------------------------
				if (IkaTools.getView() == 'diplomacyAdvisor' && Config.get('ctInbox')) {
					var messageId = $(item).attr('id').match(/message(\d+)/)[1];
          var tblRep = IkaTools.querySelector('#tbl_reply' + messageId, msgCnt);
					if (tblRep != null) {
						var playerId = $(tblRep).html().match(/receiverId=(\d+)/);
						if (playerId) {
							playerId = playerId[1];
							if (Treaty.hasCt(playerId)) 
								$(IkaTools.querySelectorAll('nobr', playerCell[0])).append(Treaty.icons.ct);
							else 
								if (Treaty.hasPendingCt(playerId)) 
									$(IkaTools.querySelectorAll('nobr', playerCell[0])).append(Treaty.icons.ctPending);
						}
					}
				}
				//--------------------------------- Player Search --------------------------
				if (Config.get('searchIconInbox')) {
					var playerName = playerCell.text().replace(/^\s*/, '').replace(/\s*$/, '');
					$(IkaTools.querySelectorAll('nobr', playerCell[0])).append(' <img class="ikaSearchIcon" title="Show ' + playerName + '\'s cities on map" src="' + IkaSearch.icons.magnifier + '" style="cursor:pointer; display:inline; vertical-align:middle;"/>');
					$(IkaTools.querySelectorAll('.ikaSearchIcon', playerCell[0])).click(function(event){
						event.preventDefault();
						IkaSearch.performPlayerSearch(playerName);
					});
				}
				//-------------------------------- Message Previews ------------------------------
				if (Config.get('messagePreviews')) {
					var subjectItm = $(IkaTools.querySelector('.subject', item));
					var subject = subjectItm.text();
					var icon = ''
					if (subject.match(/(circular\smessage)/i)) 
						icon = '<img src="/skin/img/city/building_embassy.png" style="height:16px; vertical-align:middle; display:inline;" title="'+IkaTools.getText('interface', 'CircularMessage', "Circular alliance message")+'"/> ';
					else if (subject.match(/(cultural\sgoods\streaty)|(cultural\streaty)/i)) 
						icon = '<img src="/skin/museum/icon32_culturalgood.png" style="height:16px; vertical-align:middle; display:inline;" title="'+IkaTools.getText('interface', 'CulturalMessage', "Cultural treaty message")+'"/> ';
					else if ($('.decision', $(item).next().next()).length > 0)
					{
						icon = '<img src="/skin/museum/icon32_culturalgood.png" style="height:16px; vertical-align:middle; display:inline;" title="'+IkaTools.getText('interface', 'TreatyMessage', "Treaty message")+'"/> ';
						icon += '<img src="/skin/icons/wichtig.png" style="height:9px; vertical-align:middle; display:inline;" title="'+IkaTools.getText('interface', 'TreatyMessage', "Treaty message")+'"/> ';
					}
					else if (subject.match(/\-/i)) 
						icon = '<img src="/skin/img/city/building_embassy.png" style="height:16px; vertical-align:middle; display:inline;" title="'+IkaTools.getText('interface', 'CircularMessage', "Circular alliance message")+'"/> ';
					else
						icon = '<img src="/skin/board/schriftrolle_offen2.png" style="height:14px; vertical-align:middle; display:inline;" title="'+IkaTools.getText('interface', 'PersonalMessage', "Personal message")+'"/> ';
					subjectItm.html('<div style="height:1.5em; overflow:hidden;">' + icon + $('.msgText', $(item).next()).text().substr(0, 80) + '</div>');
				}
				//--------------------------------- Reply as Circular ------------------
				var allianceId = IkaTools.getAllianceId();
				if(IkaTools.getView() == 'diplomacyAdvisor' && allianceId != 0)
        {
          var reply = IkaTools.querySelector('td.reply', $(item).next().next());
          var spn = IkaTools.querySelector('span', reply);
          var url = $('a:eq(0)', spn).attr('href').replace(/receiverId=[0-9]*/, 'allyId=' + allianceId) + '&msgType=51';
          $('a.button:eq(0)', spn).after(' <a class="button" href="' + url + '" title="'+IkaTools.getText('interface', 'ReplyCircular', "Reply to this message as a circular alliance message")+'">'+IkaTools.getText('interface', 'Circular', "Circular")+'</a>');
        }
		});
		//--------------------------------- Ajax get next messages -------------
		var startLink = document.querySelector('#mainview a[href*="&start="]');
    $(IkaTools.querySelector('img', startLink)).attr('style', 'vertical-align: middle; position: relative; top: -2px;');
		var paginatorTr = $(startLink).parent();
		paginatorTr.css('padding', '1em 0 0 0');
		function resetNextListener() {
			$(startLink).click(function(event) {
				event.preventDefault();
				var start = $(this).attr('href').match(/start=(\d+)/)[1];
				var next = (parseInt(start) + 10);
				var doc = IkaTools.getRemoteDocument($(this).attr('href'));
				$('#deleteMessages tr.entry, #deleteMessages tr.text', doc).each(function() {
					paginatorTr.parent().before(this);
				});
				$(startLink).each(function() {
					this.href = this.href.replace(/start=\d+/, 'start=' + next);
				});
				$(document.querySelector('td.paginator')).html($(document.querySelector('td.paginator')).html().replace(/-\s*\d+/, '- ' + next));
				resetNextListener();
				ExMachina.parseMessageList(); 
			});
		}
		if(Config.get('ajaxNextMessages')) resetNextListener();
		
	},
	updateBuildingResourcesByUrl:function(url, callback) {
		var buildingType = url.toString().match(/view=([^\&]+)/); buildingType = buildingType ? buildingType[1] : false;
		var cityId = url.toString().match(/id=(\d+)/); cityId = cityId ? cityId[1] : false;
		var position = url.toString().match(/position=(\d+)/); position = position ? position[1] : false;
		if(buildingType && cityId && position && IkaTools.buildingTypes.contains(buildingType)) {
			var city = IkaTools.getCityById(cityId);
			var building = IkaTools.cityGetBuildingByPosition(position, city);
			if(building) {
				IkaTools.getRemoteDocument(url, function(root, responseText) {
					if(buildingType.match(/^(academy|barracks|tavern|townHall)$/))
						IkaTools.views[buildingType](root, responseText);
					var city = IkaTools.getCityById(cityId);
					var building = IkaTools.cityGetBuildingByPosition(position, city);
					building.type = buildingType;
					building.name = building.name == '' ?  $(IkaTools.querySelector('#mainview .buildingDescription h1', root)).text() : building.name;
					building.level = $(IkaTools.querySelector('#buildingUpgrade .buildingLevel', root)).text().replace(/[^\d]*/, '').replace(/[^\d]*/, '');
					building.resourceLevel = building.level; 
					building.position = position; 
					//IkaTools.saveCity(city);
					// update required resources
					building.resources = {wood:0, wine:0, marble:0, glass:0, sulphur:0, time:""};
					var resources = IkaTools.querySelectorAsArray('.resources li', IkaTools.querySelector('#buildingUpgrade', root));
          resources.forEach(function(resource) {
						var type = resource.className.replace(/\s.*$/, '');
						type = type == 'crystal' ? 'glass' : type;
						var value = resource.innerHTML.replace(/<span.*?<\/span>\s*/, '');
						value = type == 'time' ? value : value.replace(/[^\d]/, '');
						building.resources[type] = value;	
					});
					//IkaTools.saveCity(city);
					if(typeof(callback) == 'function') callback(building);
				});
			}
		}
	},
	updateBuildTimers:function() {
		var cities = IkaTools.getOwnedCities();
    cities.forEach(function(city){
			var elem = document.getElementById('ikaEmpireLinksBuildTime' + city.id);
			if(IkaTools.cityGetBuildBuilding(city) && elem) {
				var building = IkaTools.cityGetBuildBuilding(city);
				var seconds = IkaTools.cityGetBuildSecondsRemaining(city);
				var timerText = IkaTools.formatSeconds(seconds);	
				elem.innerHTML = '<a href="javascript:ikaEmpireGoTo(\'/index.php?view=' + building.type + '&id=' + building.cityId + '&position=' + building.position + '\', ' + building.cityId + ')" ' +
									' style="background:none; padding:0; display:inline; height:auto; width:auto;">' + IkaTools.cityGetBuildBuilding(city).name + '</a>' +
								' <br/><span style="font-size:.9em;">' + timerText + '</span>';
			} else if(elem) {
				elem.innerHTML = "-";
			}
		});
		ExMachina.buildTimers = setTimeout(ExMachina.updateBuildTimers, 1000);
	},
	getCityListForInfoBox:function(cities) {
		GM_addStyle('.playerCityListForInfoBox td { padding:.25em 0 !important; font-size:11px !important; vertical-align:middle; text-align:'+IkaRTL.txtLeft+' !important; }\
					.playerCityListForInfoBox td img { width:auto; display:inline !important; margin-'+IkaRTL.txtRight+':1px !important; height:10px; position:relative; top:-2px; vertical-align:middle; }\
		');
		var html = '<table cellspacing="0", cellpadding="0" border="0" width="210px;" class="playerCityListForInfoBox">'
		cities.forEach(function(city) {
			html += '<tr valign="middle">';
			html += '<td style="font-size:11px;">' +
						'<a href="http://' + document.domain + '/index.php?view=island&id=' + city.islandId + '&selectCity=' + city.id + '" title="'+IkaTools.getText('interface', 'ViewCityIsland', 'View ' + city.name + ' on its island')+'">' +
						'[' + city.islandX + ':' + city.islandY + '] ' + (city.name.length > 10 ? city.name.match(/^.{10}/)[0] + '...' : city.name) + ' (' + city.level + ')</a>' +
					'</td><td>' +
						'<nobr><img src="http://' + document.domain + '/skin/resources/icon_wood.png"/>' + city.woodLevel + ' </nobr>' +
					'</td><td>' +
						'<nobr><img src="http://' + document.domain + '/skin/resources/icon_' + city.tradegoodType + '.png"/>' + city.tradegoodLevel + '</nobr>' + 
					'</td>';
			html += '</tr>';
		});
		return html +'</table>';
	},
	drawShowHideOfflineAllies:function(containerId)
	{ 
    try
    {	
  		var boxH = document.querySelectorAll('#'+containerId+' .contentBox01h .header');
      switch (boxH.length)
      {
        case 0: 
          var header = $(null);
          break;
        case 1: 
          var header = $(boxH[0]);
          break;
        default:
          var header = $(boxH[1]);
      }
      
  		header.append('<a id="EMhideOfflineAllies" style="margin-'+IkaRTL.txtLeft+':5px; cursor:pointer;">'+IkaTools.getText('interface', 'HideOffline', "Hide offline")+'</a>');
  		header.append('<a id="EMshowOfflineAllies" style="margin-'+IkaRTL.txtLeft+':5px; cursor:pointer;">'+IkaTools.getText('interface', 'ShowOffline', "Show offline")+'</a>');
  		$(IkaTools.querySelector('#EMshowOfflineAllies', header)).hide();
  
  		$(IkaTools.querySelector('#EMhideOfflineAllies', header)).click(function (event)
      {
        event.preventDefault();
      	var off = IkaTools.querySelectorAsArray('.offline, .vacation, .inactive', document.querySelector('#'+containerId+' .contentBox01h:nth-child(2)'));
      	var i;
      	var nodo;
      	
        off.forEach(function(nodo)
      	{
      		try
      		{
      			$(nodo.parentNode).hide();
      		}
      		catch (err)
      		{
      		}
      	});
    		$(this).hide();
    		$(IkaTools.querySelector('#EMshowOfflineAllies', header)).show();
      });
  		
  		$(IkaTools.querySelector('#EMshowOfflineAllies', header)).click(function (event)
      {
        event.preventDefault();
      	var off = IkaTools.querySelectorAsArray('.offline, .vacation, .inactive', document.querySelector('#'+containerId+' .contentBox01h:nth-child(2)'));
      	var i;
      	var nodo;
      	
        off.forEach(function(nodo)
      	{
      		try
      		{
      			$(nodo.parentNode).show();
      		}
      		catch (err)
      		{
      	    alert(err.message);
      		}
      	});
    		$(this).hide();
    		$(IkaTools.querySelector('#EMhideOfflineAllies', header)).show();
      });
    }
    catch (err)
    {
    }
	},
	growl:function(type, title, message) {
		if(typeof(Growler) != 'undefined') {
			if(typeof(ExMachina.growlInitialized) == 'undefined') {
				Growler.addNoticeType('movement', 'Troop Movement');
				Growler.register('Ikariam Empire Overview', 'http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/ikariam_icon.png');
				ExMachina.growlInitialized = true;
			}
			Growler.growl(type, title, message);
		}
	},
	icons:{
		refreshSmall:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGMSURBVDjLY/j//z8DJZiggtx9Sasyd8Yxk21Axo7YSymbow4QZUDJ8QyHoiNpB/IPJP/P3pPwP3177P+mQ5X/6/aV/o9cFrATrwHFxzIcCg+nnplzacr/TbdW/19/c8X/tTeW/l91bdH/5Vfn/y/ZkvPfb7rbHZwGFBxKnTn9fN//jTdX/W8+XPU/cX34/5iVQf8rtuf/L9mc/d9nqutuvC7I2Zv4AOjf/0D//o9fG3YIJh4wy+OS9xTnQ2699kyO7VacRAUi0L/wUPea5LTGtceW9FgA+ncNyekgfJEfZ9AcTyagfw+59ztcgolbVBsdMi7V/a+Xr/lfK0v1AV4XAP27O2tl0v/UJbH/rRtM/5tVGf6PmB74v/dE0//khdH/VVMUZ+I0AOjflxnLE/5PP9v7f8rprv8TT7X/7zvZ8r/nRON/kLhKssIZxXhZB7wusGu22Bk3N+x/1Mzg//qFWv+1s9X+q6cp/1dOUjigEIeqGWcgAv17AOjfS2RnJt08DWbNTNVVVMmNhDAANau2t3wToKQAAAAASUVORK5CYII%3D',
		loading:'data:application/force-download;base64,R0lGODlhEAAQAPQAAPDWmoDJdenVl7zPiOLTlJ7LfrXOhYDJdabNgY/KecvQjdPSkIfJd8TQi4DIdZfLfK3NhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAkKAAAALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx+lwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6/3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh+QQJCgAAACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI+yioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l/Ag1AXySJgn5LcoE3QXI3IQAh+QQJCgAAACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK/e8LRIHn+i1cK0IyKdg0VAoljYIg+GgnRrwVS/8IAkICyosBIQpBAMoKy9dImxPhS+GKkFrkX+TigtLlIyKXUF+NjagNiEAIfkECQoAAAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkECQoAAAAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK+VgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAkKAAAALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq+KPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2/Q4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAkKAAAALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm+kaCxyxa+zRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh+QQJCgAAACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb+A41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh+QQJCgAAACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ/DkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA%3D%3D',
		checkmark:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+roKUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSOixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQrzSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC',
		cogEdit:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALzSURBVDjLdZPdT5JhGMaZf4Bbh3ZaBzn/gU46MM1iNrf8WExNVyz1IDUOHCFpfq4PmmZmtTTT8GMJNGAO0hgi8a0oIBAGfoS4N12gmUpmL1fPy9LGpu/27N2zPdfvvu7rfh4WANZRa2pqims2mycMBsME+bjHnUvYOJ3O1JmZmWQiTiLi9dXVVYRCIUil0nWVSpWkVCqTZTJZ6pEAIu4mYtpms1EmkylFr9dTi4uLWFhYABFSCoUihYCo4eFhWiwWdycAHA6HMBAIIBwOw+/3g4i3tVptzOv1wu12Qy6Xx4h4mzgDRVFQq9UQiUTCQwCpWkd6jTEQRjA/Px8HHQCYvcvlAgOwWCwQCAQxHo9Xl9CC0WhsZQ5PT0/DarVifHwcPT096O/vZxyBtAXbx6fwDXLgV7TC8ToLzq60EhYh2kn1FZ1OF/H5fLDb7dBoNGhqajLx+fzM+vr6zPb2dtPMxCNQWj42XaPAz1VsuKTQiy7/ZhExvba2FrfLVCZBYnBwEC0tLZkH7qzS7Kbv7nvYW1GC0omwO/cef5YNxEUZWGTGdDAYjPfI2GQckMTR2dkZB4TUpy9F3Hdj9K4Buwu3ELZV4rOYC9ebMvAqSmkWGYmdWFzp6+uLzM7OxiFMDr29vabJoSu1kTkB6KgZO4FSRINF2PLWwtOVQd/m5n/Ly8uzH4ZIxtRKgsTk5CSYv17+GNQU/5+4BNGvhfjhFmL++UW01XB6E+6BRCKpGxoaink8nrjYMNoB71gN6F09oktc/ApewyZx8oWI7Z/GUFVVFSsvL/8/xoGBASGTPHPz3rbx4FHVwql+gpC1ADtLRQg77sDZcSEmE7+IZ9XQ0IDc3Fxhwj1obGzsrq6upkceZgBby/C9yoe29iSML9n4cO8sLRGcT+dwOFROTg7NZrO7j3xMBJDafDNtf8/8DHvWDlhb0zFScQqV13MjhYWFScXFxckEkHrsa2RWwbkT0fulZ/Y1D9j0u+asjRtXsy3E7rHP+S+qJels2qSd5wAAAABJRU5ErkJggg%3D%3D',
		disk:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH+SURBVBgZBcE9i11VGAbQtc/sO0OCkqhghEREAwpWAWUg8aMVf4KFaJEqQtAipTZWViKiCGOh2Ap2gmJhlSIWFsFOxUK0EsUM3pl79n4f12qHb3z3Fh7D83gC95GOJsDe0ixLk5Qq/+xv/Lw9Xd+78/HLX3Y8fXTr2nWapy4eCFKxG7Fby97SnDlYtMbxthyfzHO//nl85fNvfvnk8MbX5xa8IHx1518Vkrj54Q+qQms2vVmWZjdiu5ZR2rT01166/NCZg/2PFjwSVMU6yjoC1oq+x6Y3VbHdlXWExPd379nf7Nmejv2Os6OC2O4KLK0RNn3RNCdr2Z5GJSpU4o+/TkhaJ30mEk5HwNuvX7Hpi76wzvjvtIwqVUSkyjqmpHS0mki8+9mPWmuWxqYvGkbFGCUAOH/+QevYI9GFSqmaHr5wkUYTAlGhqiRRiaqiNes6SOkwJwnQEqBRRRJEgkRLJGVdm6R0GLMQENE0EkmkSkQSVVMqopyuIaUTs0J455VLAAAAAODW0U/GiKT0pTWziEj44PZ1AAAAcPPqkTmH3QiJrlEVDXDt0qsAAAAAapa5BqUnyaw0Am7//gUAAAB49tEXzTmtM5KkV/y2G/X4M5fPao03n/sUAAAAwIX7y5yBv9vhjW/fT/IkuSp5gJKElKRISYoUiSRIyD1tufs/IXxui20QsKIAAAAASUVORK5CYII%3D',
		target:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAXCAYAAAARIY8tAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNBNEZDMUE5OUMxQjExREY4QjVFRERBQkMxMzQ4QzJCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNBNEZDMUFBOUMxQjExREY4QjVFRERBQkMxMzQ4QzJCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E0RkMxQTc5QzFCMTFERjhCNUVEREFCQzEzNDhDMkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E0RkMxQTg5QzFCMTFERjhCNUVEREFCQzEzNDhDMkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Heb6gAAADGUlEQVR42pyVTUhUURSA35sZxhSr2RTMhIVMuAgxCVLCKChdWBQIUUyroDZFixbWQlD6haRFEUY/i8AoDDdBLQqiJPpZtBgwhCCoASuNkLDFzPjmt++8zh1ejjmjFz7uueece8599557nx2NRi1vs23b8vl8LiIHg0FXVttZuhPFYnEz/bToMpmMVSgU/sHbfNYiTRJks1krl8tZBJXJzbAGuUkCSXDRL9YWTWCaBCNJXT6fbwALNkrSalqlBHVwGB6y0o8katNtuIHuHVyC5uUmaCfoW3hAwEMaeBKK8Am2QB/2OL6DULOUBF1MfEaAVniPvAc2II+AjdwNUeSLkIMzzLkHKyomYGIjDLPPISbeQd6B+qnuvS09+59H/x19Pz5d6KbhILrzZQkcx3ErRapB6cU5zETZ9+P4OLI9EthbijLWJtsYQyd+J6WEJY7YJbbPOEtVIEvgA/Abpz76wtzcnJVOp8tqXRaVTCZNCb9CdwVqoUerzvUrbZFuQQvKtfAYh4QEl0CeBZSQsVmlXrYRte0290ZaACKwCxowdmo++YIO+lq5bHoXkuhWISZgO/IMtoDa5EzqEb/BVrimfuN2JBI5h3HAqq4Nw014qXekUvtlh8PhCAncL6Dv1K8ZZXVP5pVdGvteuR/YhuhnwW92GOqx99OvxH7bfIF84hTc10+NawJHdH6/31u+Ym9BjBFghAfwh3mvdO83MbwOb9CdMg9kwATQg/kAPxnuh0YOMSGOksh7cNJEJ8HloFUf04QvTGL3ZTY1q1UyDY9gNVxG75cqSaVSZfdAKkf0UmWMd8JpSOv80t3ymVI02wCDOEyB3MxbqINmEf+5aB1aojUwhO+4buffi7bAySdwOILDLBxDfo2uW+9JUYP70a9Df4Hxc72go4zLqtEOhULz3yKzynaQL2hV06T2DTABTfqCZtnrq5zVADjmcKtJINQx3gc9mLbBenWTKosTeEwqCibMb3apCbyPoCQbw6UNjhLorqkU7398foKKv0yZrIecIuFXTfzZc8jL/2Uu8NOfgBnkL9X+9P8IMABMVTt0o4ogOgAAAABJRU5ErkJggg%3D%3D',
		travelTime:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAWCAYAAACosj4+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU5NzVCOTZBOUMxMzExREY5NjE2ODZCNzIxODkzRDQwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU5NzVCOTZCOUMxMzExREY5NjE2ODZCNzIxODkzRDQwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTk3NUI5Njg5QzEzMTFERjk2MTY4NkI3MjE4OTNENDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTk3NUI5Njk5QzEzMTFERjk2MTY4NkI3MjE4OTNENDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5rEAZZAAADBElEQVR42syWXUiTURjH/+8+1DG0WeqcGM2W2fzC8EK7SlQio4swCqG7QAgpMiq6tIKuIpAuIuiDKC+kKAwlQ9IUMkZY5kfOaebMcM5lTnPu693eds565151NueE/nA45z2c99nvfZ7nPHsYjuPwP0myWQP2jpINf5FhzAOlwgvFDilkpZ1MVIGss25qmF8TuZfs+OWS4/uHEUyNO6A3sXRfreSg0cTT9asFGRrez2JoUmhPtFmgnm4LLJMLAZhVHvQK9+NjGTDybchTxSB3b0b0Q2bLOYJLjzswONIf4oR4ebngG6M28haFedrez6w8zWw0qa9MFHNFssOoTLkqMFZXc4zT7lcjJVW97vsz00a8aOxYEyZiD3XaWvB5ooe7vqslYHR7ogJV1fWCc1Nmi+D5p2kYSTsLKVAoRZxDJvYHqscKAu7NKy5A471awZk0ZXJgECWp9uHtswfQZu0OaZf5uniTM3n7lsPsccLl9cDBsXD6ZruXhcM3+Jlfk0E0zzqhEmfggvQ4dG0DyNXakJycBotlKmCzvdVNgUm49L1GXLvTxITlIQKzETn+Qo2zozi3dAteX0mamcvBl5FECkXE6oehVCvQ1doJs9G6LswqoARxLJ1jROKIwnjf1YSX2jakZ8VRqATpAXQZNTRnTlSW4/yNR8y/bIiiVfLdnIPOH+0DuOi5DbnEjVjFBLp1n1BZVYrc8rNMOHZEa4WA5FCkKpTl4dS7QyiquEyfz9Seph7yJXxY9WVThTFOJKGJTyRl4vA6e8jvhT0Q/DiBulv/0AeWz4WqP2t6yMX5jfM3LNykzpBkolnrh7Fa5ymM2VDnr0/TzwNQ5LqfLMtf11MRVWp7UBl4kjkY/MUCGKeuGX29i3QtL6uhM7ltRKFuW8RJrZKkr4QJqQGTC7oGfxU/WFECveFbdG9Zifwogv82gsV7x9v/hrYgweKhohqyaDRowdqSBo2Ib9L4PbNVhLm+URiG7YIGrSA7Ab+dHAa3qkELhmFSZWGdJw3aloUs2vojwACpxWUSDkNVZgAAAABJRU5ErkJggg%3D%3D'
	}
};
ExMachina.views = {};

ExMachina.views.branchOffice = function() {
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		GM_addStyle('#trader { display:none !important; }');
	}
	if(Config.get('tradeOverview')) {
		GM_addStyle('#mainview div + div + form { display:none; } #tradeOverview .paginator, #tradeOverview .unicode { display:none !important; } #resourceSale0, #resourceBuy0 { padding-top:0 !important; } #tradeOverview td, #tradeOverview th { font-size:11px; } #tradeOverview img { height:12px; }\
			#tradeOverview table tr td:first-child { border:none !important; }\
			#tradeOverview tr td:first-child { border-'+IkaRTL.txtRight+':1px solid #f2d5a3 !important; }');
		$('div.contentBox01h:eq(2) h3').html('<span style="margin-'+IkaRTL.txtRight+':300px;" class="textLabel">'+IkaTools.getText('interface', 'SellOffers', "Sell Offers")+'</span><span class="textLabel">'+IkaTools.getText('interface', 'BuyOffers', "Buy Offers"));
		var target = $('div.contentBox01h:eq(2) div.content');
		target.html('<table id="tradeOverview" cellpadding="0" cellspacing="0" border="0" style="width:100%;"><tr><td id="resourceSale0" style="width:50%"></td><td id="resourceBuy0"></td></tr><tr><td id="resourceSale1"></td><td id="resourceBuy1"></td></tr><tr><td id="resourceSale2"></td><td id="resourceBuy2"></td></tr><tr><td id="resourceSale3"></td><td id="resourceBuy3"></td></tr><tr><td id="resourceSale4"></td><td id="resourceBuy4"></td></tr>');
		var html = '';
		var range = $('select[name="range"]').attr('value');
		var tradePost = IkaTools.cityGetBuildingByType('branchOffice');
		var loc = 'http://' + document.domain + '/index.php?view=branchOffice&position=' + tradePost.position + '&id=' + ExMachina.currentCityId;
		for(var i = 0; i < 5; i++) {
			IkaTools.getRemoteDocument(loc + '&range=' + range + '&orderBy=&searchResource=' + (i == 0 ? '' : i) + 'resource&type=444', function(doc) {
				html = $('div.contentBox01h:eq(2) div.content', doc).html();
				if(html.match(/resource=/)) {
					var type = 'wood';
					var matches = html.match(/resource=(\d)/);
					resourceNum = matches ? parseInt(matches[1]) : 0;
					switch(resourceNum) {
						case 1: type = 'wine'; break;
						case 2: type = 'marble'; break;
						case 3: type = 'glass'; break;
						case 4: type = 'sulfur'; break;
					}
					$('#resourceSale' + resourceNum).html(html.replace(/\/resources\/icon_\./g, '/resources/icon_' + type + '.').replace(/<img\s+src=".+?icon_gold\.gif"[^<]+</g, '<img src="skin/resources/icon_gold.gif" align="absmiddle"/><'));
				}
			});
		}
		for(var i = 0; i < 5; i++) {
			IkaTools.getRemoteDocument(loc + '&range=' + range + '&orderBy=sellDesc&searchResource=' + (i == 0 ? '' : i) + 'resource&type=333', function(doc) {
				html = $('div.contentBox01h:eq(2) div.content', doc).html();
				var type = 'wood';	
				if(html.match(/resource=/)) {
					var matches = html.match(/resource=(\d)/);
					var buyNum = matches ? parseInt(matches[1]) : 0;				
					switch(buyNum) {
						case 1: type = 'wine'; break;
						case 2: type = 'marble'; break;
						case 3: type = 'glass'; break;
						case 4: type = 'sulfur'; break;
					}
					$('#resourceBuy' + buyNum).html(html.replace(/\/resources\/icon_\./g, '/resources/icon_' + type + '.').replace(/<img\s+src=".+?icon_gold\.gif"[^<]+</g, '<img src="skin/resources/icon_gold.gif" align="absmiddle"/><'));
				}
			});
		}
	}
};
ExMachina.views.takeOffer = function(){
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		GM_addStyle('#setPremiumTransports { display:none !important; }');
	}
}
ExMachina.views.barracks = function(){
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		GM_addStyle('#premium_btn { display:none !important; }');
	}
  GM_addStyle('#barracks #cityResources .tooltip {bottom:auto; '+IkaRTL.txtRight+':auto;}');
}
ExMachina.views.colonize = function(){
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		GM_addStyle('#moveCity { display:none !important; }');
	}
}
ExMachina.views.diplomacyAdvisor = function() {
	ExMachina.parseMessageList();
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) 
		GM_addStyle('#viewDiplomacyImperium { display:none !important; }');
	// write circular message
	var allianceId = IkaTools.getAllianceId();
	if (allianceId) {
		$(document.querySelector('td.selection')).prepend('<div style="width:50%; float:'+IkaRTL.txtRight+'; text-align:'+IkaRTL.txtRight+';"><input id="newCircExMachina" title="'+IkaTools.getText('interface', 'NewCircularText', "Create a new circular message to your entire alliance")+'" type="submit" class="button" value="'+IkaTools.getText('interface', 'NewCircular', "New Circular")+'" name="#"></div>')
		$(document.querySelector('#newCircExMachina')).click(function(event) {
			event.preventDefault();
			this.blur();
			document.location = 'http://' + document.domain + '/index.php?view=sendIKMessage&msgType=51&allyId=' + allianceId;
		})
	}
}
ExMachina.views.diplomacyAdvisorAlly = function() 
{
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		GM_addStyle('#viewDiplomacyImperium { display:none !important; }');
	}
	//--------------------------------- Player Search --------------------------
	if (Config.get('searchIconAlliancePlayers')) {
		IkaTools.querySelectorAsArray('table#memberList tr td:first-child + td', document).forEach(function(item){
			var playerName = trim($(item).text());
			$(item).append('<img class="ikaSearchIcon" title="'+IkaTools.getText('interface', 'ShowCitiesMap', "Show cities on map")+ ' (' + playerName + ')" src="' + IkaSearch.icons.magnifier + '" style="cursor:pointer; display:inline; margin:0 .2em;"/>');
			$(IkaTools.querySelector('.ikaSearchIcon', item)).click(function(event){
				event.preventDefault();
				IkaSearch.performPlayerSearch(playerName);
			});
		})
	}
	//--------------------------------- Hide Offline Allies --------------------------
  ExMachina.drawShowHideOfflineAllies('alliance');
}
ExMachina.views.diplomacyAdvisorOutBox = function() {
	ExMachina.parseMessageList();
	//--------------------------------- Message preview --------------------------
	GM_addStyle('#messages tr th:first-child + th, #messages tr td:first-child + td { display:none; }')
	
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		GM_addStyle('#viewDiplomacyImperium, td.msgText div:first-child + br + span { display:none !important; }');
	}
}
ExMachina.views.diplomacyAdvisorTreaty = function() {
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		GM_addStyle('#viewDiplomacyImperium { display:none !important; }');
	}
}
ExMachina.views.dump = function(){
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		$('.premiumOffer').hide();
		$('.capacitiesTableBonus').hide();
		var rows = document.querySelectorAll('.capacitiesTableRow');
		if (rows.length > 1)
		{
      $(rows[rows.length-1]).hide();
		}
	}
}
ExMachina.views.errorLoggedOut = function() {
	if(Config.get('sessionExpireRedirect')) {
		var domain = document.location.toString().match(/http:\/\/([^\/]+)/)[1];
		document.location = 'http://' + domain.replace(/^s\d+\./, ''); 
	}
}
ExMachina.views.embassy = function(){
	//--------------------------------- Player Search --------------------------
	if(Config.get('searchIconAlliancePlayers')) {
		IkaTools.querySelectorAsArray('table#memberList tr td:first-child + td', document).forEach(function(item){
			var playerName = $(item).text().replace(/^\s*/, '').replace(/\s*$/, '');
			$(item).append('<img class="ikaSearchIcon" title="'+IkaTools.getText('interface', 'ShowCitiesMap', "Show cities on map")+ ' (' + playerName + ')" src="'+IkaSearch.icons.magnifier+'" style="cursor:pointer; display:inline; margin:0 .2em;"/>');
			$(IkaTools.querySelector('.ikaSearchIcon', item)).click(function() {
				IkaSearch.performPlayerSearch(playerName);
			});
		});
	}
	//--------------------------------- Hide Offline Allies --------------------------
  ExMachina.drawShowHideOfflineAllies('mainview');
}
ExMachina.views.highscore = function(){
	if(Config.get('searchIconHighscore')) {
		IkaTools.querySelectorAsArray('#mainview td.name', document).forEach(function(item)
    {
			var playerName = $(item).text();
			$(item).append('<img class="ikaSearchIcon" title="'+IkaTools.getText('interface', 'ShowCitiesMap', "Show cities on map")+ ' (' + playerName + ')" src="'+IkaSearch.icons.magnifier+'" style="cursor:pointer; display:inline; margin:0 .2em;"/>');
			$('.ikaSearchIcon', item).click(function() {
				IkaSearch.performPlayerSearch(playerName);
			});
		});
	}
}
ExMachina.views.island = function(){
	GM_addStyle('\
		#island { background-repeat:none !important; }\
		a.reportPlayer img, a.messageSend img { max-height:16px !important; vertical-align:middle !important; }\
	');
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		$('.premiumBuildPlace').hide();
	}
	function handleCityInfoLoad(id) {
		if(Config.get('playerCitiesInIslandView') || Config.get('searchScore')) 
		{
			if ($('#playerCityListWrapper').size() == 0) {
				$('#information').append('<li id="playerCityListWrapper" style="margin:1em 10px;"> </li>');
				$('body').append('<div id="playerNameSandbox" style="display:none;"> </div>');			
			}
			if (Config.get('playerCitiesInIslandView'))
			{
				$('#playerCityListWrapper').html(IkaTools.getText('interface', 'loading', "loading")+'...');
			}
			else
			{
				$('#playerCityListWrapper').html('');
			}
			$('#playerNameSandbox').html($('#information .owner').html());
			$('span', $('#playerNameSandbox')).remove();
			var player = $('#playerNameSandbox').text().replace(/^\s*/, '').replace(/\s*$/, '');
		}

		//-------------------------------------- Player Scores ----------------------------
		if(Config.get('searchScore')) {			   
			// inline scores
			function drawScore(label, type) {
				if($('#exMachinaInlineScore').size() == 0)
					$('#information .cityinfo').after('<li id="exMachinaInlineScore" style="height:.5em; overflow:hidden;"> </li>');
				if($('#exMachinaInlineScore_' + type).size() == 0)
					$('#exMachinaInlineScore').after('<li>' +
						'<span style="width:80px; float:'+IkaRTL.txtLeft+';">' + label + ':</span> <span id="exMachinaInlineScore_' + type + '"></span>' +
					'</li>');
				$('#exMachinaInlineScore_' + type).html('<span style="width:70px; float:'+IkaRTL.txtLeft+';">'+IkaTools.getText('interface', 'loading', "loading")+' ...</span> ...');
				IkaTools.getScoreForPlayer(type, player, function(score){
					$('#exMachinaInlineScore_' + type).html(
						'<span title="'+IkaTools.getText('interface', 'Points', 'Points')+' (' + label + ')" style="width:70px; float:'+IkaRTL.txtLeft+'; ' +
							((type == 'military' && score.points > 1000) ? ' font-weight:bold;' : '') + 
							((type == 'military' && score.points > 5000) ? ' color:#900;' : '') + 
							((type == 'military' && score.points < 500) ? ' color:#090; font-weight:bold;' : '') + 
							'">' + IkaTools.addCommas(score.points) + '</span><span title="'+IkaTools.getText('interface', 'Rank', 'Rank')+' (' + label + ')">' + IkaTools.addCommas(score.rank) + '</span>');
				});
			}
			if (player) {
				if(Config.get('scoreDonations')) drawScore(IkaTools.getText('interface', 'Donations', 'Donations'), 'donations');
				if(Config.get('scoreTrading')) drawScore(IkaTools.getText('interface', 'Trading', 'Trading'), 'trade');
				if(Config.get('scoreResearch')) drawScore(IkaTools.getText('interface', 'Research', 'Research'), 'research');
				if(Config.get('scoreScientists')) drawScore(IkaTools.getText('interface', 'Scientists', 'Scientists'), 'scientists');
				if(Config.get('scoreBuildings')) drawScore(IkaTools.getText('interface', 'Buildings', 'Buildings'), 'buildings');
				if(Config.get('scoreBuilder')) drawScore(IkaTools.getText('interface', 'Builder', 'Builder'), 'builder');
				if(Config.get('scoreGold')) drawScore(IkaTools.getText('interface', 'Gold', 'Gold'), 'gold');
				if(Config.get('scoreResources')) drawScore(IkaTools.getText('interface', 'Resources', 'Resources'), 'resources');
				if(Config.get('scoreDefense')) drawScore(IkaTools.getText('interface', 'Defense', 'Defense'), 'defense');
				if(Config.get('scoreOffense')) drawScore(IkaTools.getText('interface', 'Offense', 'Offense'), 'offense');
				if(Config.get('scoreMilitary')) drawScore(IkaTools.getText('interface', 'Military', 'Military'), 'military');
				if(Config.get('scoreTotal')) drawScore(IkaTools.getText('interface', 'Total', 'Total Score'), 'total');
				// remove spy text
				if(Config.get('islandShowSpies'))
					$('#information li.spy').remove();
			}
			if(false && id) {
				var targetId = id;
				var city = IkaTools.getCityById(targetId);
				if (!city || !IkaTools.cityIsOwn(city)) {
					$('div#actions ul.cityactions').append('<li class="addTarget"><a href="javascript:void(0);"><span class="textLabel">'+IkaTools.getText('interface', 'AddTarget', 'Add Target')+'</span></a></li>')
					$('div#actions ul.cityactions li.addTarget a').click(function() {
						alert('kk: ' + targetId);
					})
				}
			}
		}
		//-------------------------------------- Player Cities ----------------------------
		if(Config.get('playerCitiesInIslandView')) {
			IkaSearch.getPlayerCities(player, function(cities) {
				$('#playerCityListWrapper').html(ExMachina.getCityListForInfoBox(cities));
			});
			$('#information .owner .ikaSearchIcon').click(function() {
				IkaSearch.performPlayerSearch(player);
			});
			
			// alliance search icon
			$('#information .ally .ikaSearchIcon').click(function() {
				var alliance = $(this).attr('name');
				IkaSearch.performAllianceSearch(alliance);
			});
		}
  }
	//----------------------------------------------- Pillage Helper ----------------------------
	GM_addStyle('#actions ul.cityactions li.addTarget a { background:url(/skin/actions/espionage.png) no-repeat center top; }');

	var markLoners = Config.get('islandMarkLoners');
	var showSpies = Config.get('islandShowSpies');
	try { var selectedCityId = document.location.toString().match(/cityId=(\d+)/)[1]; } catch(e) { var selectedCityId = false; }
	var tradegood = $('#islandfeatures #tradegood a').css('background-image').match(/\/([^\/]+)\.gif/)[1];
	switch(tradegood) {
		case 'wein': tradegood = 'wine'; break;
		case 'marmor': tradegood = 'marble'; break;
		case 'schwefel': tradegood = 'sulfur'; break;
		case 'kristall': tradegood = 'crystal'; break;
	}
	IkaTools.querySelectorAsArray('ul#cities li.cityLocation', document).forEach(function(item, i) {
		try { var cityId = item.innerHTML.match(/city_(\d+)/)[1]; } catch(e) { var cityId = false; }
		var target = cityId ? Pillage.getTargetById(cityId) : false;
		$('a', item).click(function(){
			handleCityInfoLoad($(item).attr('id').toString().match(/\d+$$/));
		});

		var spyDiv = IkaTools.querySelector('.spy td', item);
		if (spyDiv != null) {
			if(showSpies) {		// spy icon
				var img = document.createElement('img');
				img.src = Pillage.icons.spy;
				img.setAttribute('style', 'vertical-align:middle; margin-'+IkaRTL.txtLeft+':-6px; position:relative; top:-1px;');
				img.title = IkaTools.getText('interface', 'HaveASpy', 'You have a spy in this town');
				$('span.before', item).after(img);
			}
			// list hideout(s)
			if(target) {
//				var spyDiv = $('.spy td', item)[0];
				spyDiv.style.padding = "1em 0";
				spyDiv.innerHTML = '<img src="http://' + document.domain + '/skin/img/city/building_safehouse.png" style="height:14px; display:inline; position:relative; top:4px;"/>: ';
				var cities = IkaTools.getCities();
				for(var i = 0; i < cities.length; i++) {
					var spies = Pillage.getSpiesByTargetId(target.id, cities[i].id);
					var numSpies = 0;
					for(x in spies) { numSpies++; }
					if(numSpies > 0) {
						var a = document.createElement('a');
						a.innerHTML = cities[i].name;
						a.href = "javascript:Pillage.goTo('http://" + document.domain + "/index.php?view=safehouse&position=" + IkaTools.cityGetBuildingByType('safehouse', cities[i]).position + "&id=" + cities[i].id + "', " + cities[i].id + ");";
						if (IkaRTL.isRTL) 
						  a.style.marginRight = ".5em";
						else
						  a.style.marginLeft = ".5em";
						spyDiv.appendChild(a);
					}
				}
				target.tradegood = tradegood;
				Pillage.saveTarget(target);
			}
		}
		
		if(markLoners && !item.innerHTML.match(/view=allyPage/)) {
			item.className += ' pillageHelperLoner';
		}	

		if(target) {
			try { target.islandId = document.location.toString().match(/island&id=(\d+)/)[1]; } catch(e) {}
//			try { target.cityLevel = $('.citylevel', this)[0].innerHTML.replace(/[^\d]/g, ''); } catch(e) { alert(e); }
			try { target.cityLevel = item.className.match(/\d+/); } catch(e) { alert(e); }
			try { target.inactive = (IkaTools.querySelector('.inactivity', item) != null) ? true : false; } catch(e) { alert(e); }
//			try { target.playerName = $('.owner', this).html().replace(/(<[^d].*?\/>|<[^d].*?<\/[^\d]+?>)/g, '').match(/^\s*([^\s].+)\s*$/)[1]; } catch(e) { alert(e); alert($('.owner', this).html().replace(/(<[^d].*?\/>|<[^d].*?<\/[^\d]+?>)/g, ''));}
			try { target.playerName = $('.owner td:eq(1)', item).html().replace(/(<[^d].*?\/>|<[^d].*?<\/[^\d]+a?>)/g, '').trim(); } catch(e) { alert(e); }
			target.tradegood = tradegood;

			// fetch player score
			//if(target.playerName) {
			//	Pillage.fetchPlayerScore(target.playerName, 'score', function(doc) {
			//		alert($('td.score', doc)[0].innerHTML.replace(/[^\d]/g, ''));
			//	});
			//}
			
			try { target.allianceName = $('.ally td:eq(1)', item).html().replace(/\n/g,'').replace(/<[^\/|^a].*/,'').replace(/\t/g,'').replace(/[ ]*</g,'<').replace(/>[ ]*/g,'>').trim(); } catch(e) { target.allianceName = '-' }
			var html = '<div class="pillageHelperInfoWrapper"><p style="margin-top:1.5em;"><strong>'+IkaTools.getText('pillageHelper', 'PillageHelper', 'Pillage Helper')+':</strong>\
							<span style="font-size:8px; position:relative; top:-2px;">\
								<span title="'+IkaTools.getText('pillageHelper', 'Wall', 'Wall level')+'"><img src="http://' + document.domain + '/skin/layout/stadtmauer_icon.png" style="height:16px; display:inline; margin-'+IkaRTL.txtLeft+':5px; vertical-align:middle"/> ' + Pillage.targetGetWallLevel(target) + '</span>\
								<span title="'+IkaTools.getText('pillageHelper', 'Mortars', 'Mortars needed')+'"><img src="http://' + document.domain + '/skin/characters/military/120x100/mortar_r_120x100.png" style="height:16px; margin-'+IkaRTL.txtLeft+':7px; display:inline; vertical-align:middle"/> ' + Pillage.targetGetMortarsNeeded(target) + '</span>\
								<span title="'+IkaTools.getText('pillageHelper', 'Port', 'Port level')+'"><img src="http://' + document.domain + '/skin/img/city/building_port.png" style="height:16px; margin-'+IkaRTL.txtLeft+':5px; vertical-align:middle; display:inline;"/> ' + Pillage.targetGetPortLevel(target) + '</span>\
							</span>\
						</p>';
			var totalAvailable = Pillage.targetGetResourceAvailableTotal(target);
			if(Pillage.targetGetResourcesLastUpdatedString(target) != '?') {
				html += '<p style="font-size:8px;" title="'+IkaTools.getText('pillageHelper', 'Resources', 'Resources available')+' - ' + Pillage.targetGetResourcesLastUpdatedString(target) +' '+IkaTools.getText('pillageHelper', 'lastReport', 'since last report')+'">\
					<img src="http://' + document.domain + '/skin/img/city/building_warehouse.png" style="vertical-align:middle; height:16px; margin-top:2px; display:inline;"/>:  ';
				if(totalAvailable > 0) {
					for(var i = 0; i < Pillage.resourceTypes.length; i++) {
						var type = Pillage.resourceTypes[i];
						var available = Pillage.targetGetResourceAvailable(target, type);
						if(available > 0)
							html += ' <img src="http://' + document.domain + '/skin/resources/icon_' + type + '.png" style="display:inline; height:12px; vertical-align:middle; margin-'+IkaRTL.txtRight+':2px;"/>' + IkaTools.addCommas(available);
					}
					var shipsNeeded = Math.ceil(totalAvailable / 500);
					html += ' <img src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif" style="height:14px; vertical-align:middle; display:inline;"/> ' + shipsNeeded;
				} else
					html += ' '+IkaTools.getText('pillageHelper', 'none', 'none')+' ';
				html += '</p></div>';
			}
			//var div = document.createElement('div');
			//div.innerHTML = html;
			$('.cityinfo .spy td', item).append(html);
			if(selectedCityId && selectedCityId == target.id) {
				target.position = item.id.match(/\d+$/)[0];
				$('#information .cityinfo').after($('#cityLocation' + target.position + ' .pillageHelperInfoWrapper')[0].innerHTML);
			}
			Pillage.saveTarget(target);
		}
	});

	if(Config.get('searchIconIslandPlayer')) {
		IkaTools.querySelectorAsArray('.owner td', document).forEach(function(item) {					
      if ((item.className != 'nameValue') && (item.className != 'icons'))
      {
        var playerName = $(item).text().replace(/\s/g, '');
        var html = '<img class="ikaSearchIcon" title="'+IkaTools.getText('interface', 'ShowCitiesMap', "Show cities on map")+ ' (' + playerName + ')" src="'+IkaSearch.icons.magnifier+'" style="cursor:pointer; display:inline; margin:0 .2em;"/>';
        if($('a.messageSend', item).size() > 0) 
          $('a.messageSend', item).before(html);
        else
          $(item).append(html);
      }
		});
		IkaTools.querySelectorAsArray('.ally td',document).forEach(function(item, i) {
      if ((item.className != 'nameValue') && (item.className != 'icons'))
      {
  			var item = $('a:eq(0)', item);
  			var alliance = $(item).text();
  			var html = '<img name="' + alliance + '" class="ikaSearchIcon" title="'+IkaTools.getText('interface', 'ShowCitiesMap', "Show cities on map")+ ' (' + alliance + ')" src="' + IkaSearch.icons.magnifier + '" style="cursor:pointer; display:inline; margin:0 .2em;"/>';
  			$(item).after(html);
  		}
		});
	}
	
	if(Config.get('islandBlinkInactives'))
		GM_addStyle('span.inactivity { text-decoration:blink !important; }')
	GM_addStyle('li.pillageHelperLoner * { color:#CC0000 !important; }')
}
ExMachina.views.login = function() {
	if($('select#logServer').size() == 0) {
		if (document.domain == 'en.ikariam.com') $('select[name="uni_url"]').append('<option value="s666.en.ikariam.com">Test Server</option>')
		GM_addStyle('#phasmaAutoLoginConfigButton:hover { opacity:1 !important; }');
		var settingsButton = $('<img id="phasmaAutoLoginConfigButton" src="' + ExMachina.icons.disk + '" style="float:'+IkaRTL.txtRight+'; margin-top:.5em; margin-'+IkaRTL.txtLeft+':1.2em; cursor:pointer; "/>');
		$('table#logindata').css('width', '100%');
		var loginButton = $('input[name="loginMode"]'); 
		var loginText = loginButton.attr('value');
		loginButton.before(settingsButton);
		var autoLogin = typeof(IkaTools.getVal('autoLogin')) == 'boolean' && IkaTools.getVal('autoLogin');
		$(settingsButton).attr('title', autoLogin ? 'Click to disable auto-login' : 'Click to set auto-login using this information');
		$(settingsButton).css('opacity', autoLogin ? '1' : '.5');
		$(settingsButton).click(function() {
			autoLogin = !autoLogin; // toggle auto login
			$(settingsButton).css('opacity', autoLogin ? '1' : '.5');
			if (autoLogin) {
				IkaTools.setVal('autoLogin', true);
				IkaTools.setVal('serverIndex', $('select#universe').attr('selectedIndex'));
				IkaTools.setVal('login', $('input#login').attr('value'));
				IkaTools.setVal('pass', $('input#pwd').attr('value'));
				document.location = document.location;
			} else {
				IkaTools.setVal('autoLogin', false);
				loginButton.attr('value', loginText);
			}
		});
		$('select#universe').attr('selectedIndex', IkaTools.getVal('serverIndex'));
		if (autoLogin) {
			$('#loginWrapper').css('display', 'block');
			$('input#login').attr('value', IkaTools.getVal('login'));
			$('input#pwd').attr('value', IkaTools.getVal('pass'));
			$('form#loginForm').attr('action', "http://" + $('select#universe').attr('value') + "/index.php?action=loginAvatar&function=login");
			var i = 2;
			$('input[name="loginMode"]').append('<span>kk</span>');
			loginButton.attr('value', loginText + '... ' + i);
			setInterval(function() {
				if (autoLogin) {
					i--;
					loginButton.attr('value', loginText + '... ' + i);
					if (i == 0) $('form#loginForm')[0].submit();
				}
			}, 1000);
		}
	} else {
		if(document.domain == 'en.ikariam.com') 
			$('select[name="uni_url"]').append('<option value="s666.en.ikariam.com">'+IkaTools.getText('interface', 'TestServer', "Test Server")+'</option>')
		GM_addStyle('#phasmaAutoLoginConfigButton:hover { opacity:1 !important; }');
		var settingsButton = $('<img id="phasmaAutoLoginConfigButton" src="' + ExMachina.icons.disk + '" style="float:'+IkaRTL.txtRight+'; margin-top:.5em; margin-'+IkaRTL.txtLeft+':1.2em; cursor:pointer; "/>');
		$('table#logindata').css('width', '100%');
		var loginButton = $('#loginBtn'); 
		var loginText = loginButton.attr('value');
		loginButton.css('width', '120px');
		loginButton.css('background', 'url("../img/sp-bg-content.png") no-repeat scroll -201px -200px transparent');
		loginButton.before(settingsButton);
		var autoLogin = typeof(IkaTools.getVal('autoLogin')) == 'boolean' && IkaTools.getVal('autoLogin');
		$(settingsButton).attr('title', autoLogin ? IkaTools.getText('interface', 'DisableAutoLogin', "Click to disable auto-login") : IkaTools.getText('interface', 'SetAutoLogin', 'Click to set auto-login using this information'));
		$(settingsButton).css('opacity',  autoLogin ? '1' : '.5');
		$(settingsButton).css('margin-'+IkaRTL.txtRight+'',  '20px');
		$(settingsButton).css('margin-top',  '15px');
		$(settingsButton).click(function() {
			autoLogin = !autoLogin;		// toggle auto login
			$(settingsButton).css('opacity', autoLogin ? '1' : '.5');
			if(autoLogin) {
				IkaTools.setVal('autoLogin', true);
				IkaTools.setVal('serverIndex',  $('select#logServer').attr('selectedIndex'));
				IkaTools.setVal('login',  $('input#loginName').attr('value'));
				IkaTools.setVal('pass',  $('input#loginPassword').attr('value'));
				document.location = document.location;
			} else {
				IkaTools.setVal('autoLogin', false);
				loginButton.attr('value', loginText);
			}
		});
		$('select#logServer').attr('selectedIndex', IkaTools.getVal('serverIndex'));
		if(autoLogin) {
			$('#loginWrapper').css('display', 'block');
			$('input#loginName').attr('value', IkaTools.getVal('login'));
			$('input#loginPassword').attr('value', IkaTools.getVal('pass'));
			$('form#loginForm').attr('action', "http://" + $('select#logServer').attr('value') + "/index.php?action=loginAvatar&function=login");
			var i = 2;
			$('input[name="loginMode"]').append('<span>kk</span>');
			loginButton.attr('value', loginText + '... ' + i);
			setInterval(function() {
				if(autoLogin) {
					i--;
					loginButton.attr('value', loginText + '... ' + i);
					//if(i == 0) $('form#loginForm')[0].submit();
				}
			}, 1000); 
		}
	}
}
ExMachina.views.militaryAdvisorCombatReports = function(){
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		GM_addStyle('ul.yui-nav li, ul.yui-nav li em{ width: 300px !important; } \
					ul.yui-nav li + li + li, #viewMilitaryImperium { display:none !important; }\
					.yui-navset .yui-nav .selected a, .yui-navset .yui-nav a:hover, .yui-navset .yui-content { background-image:url(' + tab300Image + '); }');
	}
}
ExMachina.views.militaryAdvisorMilitaryMovements = function(){
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		GM_addStyle('#viewMilitaryImperium { display:none !important; }\
					ul.yui-nav li, ul.yui-nav li em{ width: 300px !important; } \
					ul.yui-nav li + li + li, #viewMilitaryImperium { display:none !important; }\
					.yui-navset .yui-nav .selected a, .yui-navset .yui-nav a:hover, .yui-navset .yui-content { background-image:url(' + tab300Image + '); }');
	}
	//--------------------------------- Show Cargo --------------------------
	if (Config.get('expandCargo')) {
		GM_addStyle('.phasmaMilitaryCargo { background:none !important; margin:0 !important;}\
					.phasmaMilitaryCargo tr { height:auto !important; }\
					.phasmaMilitaryCargo td { padding:0 3px !important; text-align:center !important; color:inherit !important; }\
					.phasmaMilitaryCargo tr.quantities td { font-size:10px !important; }\
					.phasmaMilitaryCargo td.icon img { height:20px !important; }\
					.phasmaMilitaryCargo td.iconSmall img { height:14px !important; }')
		IkaTools.querySelectorAsArray('#fleetMovements tr td .tooltip2',document).forEach(function(item){
			$(item).parent().css('cursor', 'inherit');
			$(item).css('background', 'red');
			var html = '<table cellpadding="0" cellspacing="0" border="0" style="width:auto" class="phasmaMilitaryCargo">'
			var units = '<tr>';
			var quantities = '<tr class="quantities">';
			var uBox = IkaTools.querySelectorAsArray('.unitBox div', item);
			
			if (uBox.length > 0 ) {
				uBox.forEach(function(item) {
				  switch (item.className)
				  {
				    case 'icon':
				    case 'iconSmall':
    					units += '<td class="' + item.className + '">' + item.innerHTML + '</td>';
    					break;
				    case 'count':
    					quantities += '<td>' + IkaTools.addCommas(item.innerHTML) + '</td>'
				      break;
				  }
  			});
			} else {
				units += '<td class="icon"><img src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif"></td>'
        var shipCount = $(item).parent().text().split(/\//);
        if (shipCount.length > 1)
        {
 					units += '<td>' + shipCount[1].replace(/[^\d]/g, '') + ' ' + IkaTools.getText('interface', 'Units', "Units") +'</td>';
        }
				quantities += '<td>' + IkaTools.addCommas(shipCount[0].replace(/[^\d]/g, '')) + ' </td>'
			}
			units += '</tr>'
			quantities += '</tr>'
			html += units + quantities + '</table>'
			$(item).parent().replaceWith('<td>'+html+'</td>');
		});
	}
}
ExMachina.views.researchAdvisor = function(){
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		GM_addStyle('#viewResearchImperium { display:none !important; }');
		$('a[href*="Premium"]').hide();
	}
}
ExMachina.views.militaryAdvisorReportView = function(){
	
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		GM_addStyle('#viewMilitaryImperium { display:none !important; }\
					ul.yui-nav li, ul.yui-nav li em{ width: 300px !important; } \
					ul.yui-nav li + li + li, #viewMilitaryImperium { display:none !important; }\
					.yui-navset .yui-nav .selected a, .yui-navset .yui-nav a:hover, .yui-navset .yui-content { background-image:url(' + tab300Image + '); }\
					#viewMilitaryImperium { display:none !important; }\
		');
		$('a[href*="Premium"]').hide();
	}
}
ExMachina.views.museum = function(){
	GM_addStyle('\
		td.capital { height:1em !important; overflow:visible; }\
		td.capital:hover { font-weight:bold; }\
		td.capital .playerCityListForInfoBox { display:none; position:absolute; width:auto !important; top:-5px; padding:5px 10px; '+IkaRTL.txtLeft+':120px; border:1px solid #666; background:#fff; z-index:50000; }\
		td.capital .playerCityListForInfoBox td:first-child { padding-'+IkaRTL.txtRight+':2em !important; white-space: nowrap; }\
		td.capital .playerCityListForInfoBox td { background-color:#fff; padding-'+IkaRTL.txtRight+':4px !important; }\
		td.capital:hover .playerCityListForInfoBox { display:block; }\
	');
	// ----- Loop through players -------
	IkaTools.querySelectorAsArray('#mainview td.player', document).forEach(function(item, i) {
		var playerName = $(item).text().trim();
		// ----- player Search icon -------
		if (Config.get('searchIconMuseum')) {
			$(item).append('<img class="ikaSearchIcon" title="'+IkaTools.getText('interface', 'ShowCitiesMap', "Show cities on map")+ ' (' + playerName + ')" src="' + IkaSearch.icons.magnifier + '" style="cursor:pointer; display:inline; margin:0 .2em;"/>');
			$('.ikaSearchIcon', item).click(function(event){
				event.preventDefault();
				IkaSearch.performPlayerSearch(playerName);
			});
		}
		// ------ check for statusand grab player cities ------
		if(Config.get('museumOverview')) {
			IkaSearch.getPlayerCities(playerName, function(cities) {
				if(cities.length > 0) {
					if(cities[0].vacation)
						$(item).prepend('<img src="http://' + document.domain + '/skin/layout/icon-palm.png" style="vertical-align:middle; height:14px;" title="This player is in vacation mode"/> ');
					$(item).next().next().html('<div style="position:relative;">' + $(item).next().next().html() + '</div>');
					$('div:eq(0)', $(item).next().next()).append(' [' + cities.length + ']');
					$('div:eq(0)', $(item).next().next()).append(ExMachina.getCityListForInfoBox(cities));
				} 
			  else
			  {
					$(item).prepend('(i?) ');
					$(item).parent().css('color', '#888');
			  }
			});
		}
	});
	// ----- alliance search icons ------
	if (Config.get('searchIconMuseum')) {
  	IkaTools.querySelectorAsArray('#mainview td.ally', document).forEach(function(item, i) {
			var allianceName = $(item).text().trim();
			$(item).append('<img class="ikaSearchIcon" title="'+IkaTools.getText('interface', 'ShowCitiesMap', "Show cities on map")+ ' (' + allianceName + ')" src="' + IkaSearch.icons.magnifier + '" style="cursor:pointer; display:inline; margin:0 .2em;"/>');
			$('.ikaSearchIcon', item).click(function(event){
				event.preventDefault();
				IkaSearch.performAllianceSearch(allianceName);
			});
		});
	}
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		GM_addStyle('#buildingUpgrade + div { display:none !important; }');
	}
}
ExMachina.views.resource = function(){
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		$('.premiumOffer').hide();
		GM_addStyle('#setWorkersBox div.content { min-height:180px !important; }');		
	}
}
ExMachina.views.safehouse = function()
{          
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) 
	{
		var isReports = document.location.toString().match(/tab=reports/);
		if (!isReports)
		{
		  try
		  {
		    isReports = $('#mainview .yui-nav .selected a').attr('href').toString().match(/tab=reports/);
		  }
		  catch (e)
		  {
		  }
		}
  	if (isReports) 
  	{
  		$('.archiveButton').hide();
  	}
	}
}
ExMachina.views.tradeAdvisor = function(){
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		GM_addStyle('#viewCityImperium { display:none !important; }');
	}
}
ExMachina.views.tradeAdvisorTradeRoute = function(){
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		GM_addStyle('div.addRoute, #tradeRouteForm0 + div + table, #tradeRouteForm1,\
					div.listFooter, #tradeRouteForm1 + div + table, #tradeRouteForm2  { display:none !important; }')
	}
}
ExMachina.views.tradegood = function(){
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		$('.premiumOffer').hide();
		GM_addStyle('#setWorkersBox div.content { min-height:180px !important; }');		
	}
}
ExMachina.views.transport = function() {
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		GM_addStyle('#setPremiumTransports { display:none !important; }');
		GM_addStyle('#setPremiumJetPropulsion { display:none !important; }');
	}
}
ExMachina.views.warehouse = function(){
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		$('.premiumOffer').hide();
		$('.capacitiesTableBonus').hide();
		var rows = $('.capacitiesTableRow');
		if (rows.length > 1)
		{
      $(rows[rows.length-1]).hide();
		}
	}
}
ExMachina.views.workshop = function(){
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		GM_addStyle('table a.trader { display:none !important; }')
	}
}
ExMachina.views.worldmap_iso = function(){
	if(Config.get('biggerWorldMap')) GM_addStyle('#worldmap_iso #scrollcover { height:640px; }');
	$('#navigation').css('zIndex',1000);
}
ExMachina.views.townHall = function() {

	//--------------------------------- Anti Plus --------------------------
	if(Config.get('antiPlus')) { 
		GM_addStyle('#cizitensOrderButton { display:none !important; }');
	}
  
	function predictPopulationOverfull() {
	  function _(s){
	    var l = 
	    {
	      full:IkaTools.getText('interface', 'Full', "Full in"),
	      stable:IkaTools.getText('interface', 'Stable', "Stable in")
	    }
      
	    return l[s] || '';
	  }
	  var satisfaction, curPopulation, maxPopulationSpace, timeLeftEx, msg_extra = "", happy;
	if(true) {
		happy               = parseInt($('div.happiness div.value').text());				
		curPopulation	= parseInt($('ul.stats li.space span.value:eq(0)').text());
		satisfaction        = curPopulation + happy;
		maxPopulationSpace = parseInt($('ul.stats li.space span.value:eq(1)').text());
		
	
	    var status = "full";
	    if (curPopulation > 0 && maxPopulationSpace > 0) {
	      if ((satisfaction <= maxPopulationSpace)) {
	        timeLeftEx = 1/0.02*Math.log(Math.abs(happy));
	        status = "stable"
	      } else {
	        timeLeftEx = 1/0.02*(Math.log(happy)-Math.log(satisfaction-maxPopulationSpace));
	      }
	      if ((satisfaction <= maxPopulationSpace) && (happy > 0)) {
	        msg_extra  = "* (" + satisfaction + ")";
	      }
	      if (Math.abs(timeLeftEx) == Infinity) timeLeftEx = 0;
	      $('ul.stats div.happiness span:eq(1)').html(_(status) + ' ' + durationHMS(timeLeftEx*3600,2) + msg_extra);
			}
		}
	}
	function durationHMS(seconds,depth){
	  var temp = {'day':'D', 'hour':'h', 'minute':'m', 'second':'s'}, ret = [], prefix = '';
	  if (seconds == 0) { return 'now'; }
	  else if (seconds < 0) { seconds = -seconds; prefix = '-'; }
		var x = [ Math.floor(seconds / 86400) , Math.floor(seconds/3600) % 24 ,	Math.floor(seconds/60) % 60 , Math.ceil(seconds % 60) ];
		var y = [ temp.day, temp.hour, temp.minute, temp.second ];
		for (var i = 0; i < x.length; ++i){ if (x[i] != 0) { ret.push(x[i].toString() + y[i]); } }
	  if (depth && depth<ret.length) return prefix + ret.slice(0,depth).join(' ');
	  else return prefix + ret.join(' ');
	}
	predictPopulationOverfull();
}
ExMachina.views.city = function(root) {
	root = typeof(root) == 'undefined' ? document : root;
	try 
	{
		var cityId = $('a.button[href*="cityMilitary-army"]', root).attr('href').match(/id=(\d+)/)[1];
	}
	catch(e)
	{
	  var cityId = false; 
  }
	var city = IkaTools.getCityById(cityId);
	var islandId = $('#breadcrumbs a.island', root).attr('href').match(/id=(\d+)/)[1].toString();
	var isMyCity = $('#position0 a', root).size() == 1;
	if (root == document && (Config.get('showBuildingLevels') || Config.get('showBuildingNames'))) 
	{
		GM_addStyle('#locations li a, #locations li a { text-align:center; text-decoration:none !important; padding-top:20px; }\
					#locations li a { z-index:30000 !important; }\
					.ikaEmpireBuildingLevel { top:27px; color:#fff; background:#000; padding:2px; line-height:15px; -webkit-border-radius:20px; -moz-border-radius: 20px; border:2px outset #ccc; font-size:12px; position:relative; white-space:pre-wrap; }\
					span.ikaEmpireBuildingLevel {margin-'+IkaRTL.txtLeft+':-50%; margin-'+IkaRTL.txtRight+':-50%; padding:2px 6px; white-space:nowrap; }\
					#locations li a:hover .ikaEmpireBuildingLevel {   }\
					#locations li a:hover .ikaEmpireMissingResources { font-size:11px;  border-width:2px;    }\
					#locations li:hover { z-index:3000 !important; }\
					#locations li#position14:hover { z-index:0 !important; }\
					#locations li a:active .ikaEmpireBuildingLevel { border:2px inset #ccc; font-weight:bold; }\
					#locations li a:hover .ikaEmpireMissingResources { display:block; }\
					#locations li .buildable { background-color:#008800 !important; }\
					.ikaEmpireMissingResources { -webkit-border-radius:10px; -moz-border-radius: 10px;  display:none; width:90%; position:relative; top:30px; padding:2px 4px 2px 0; }\
					.ikaEmpireMissingResources img { height:9px !important; vertical-align:middle; }\
		');
	}
	
	function redrawDotForBuilding(building) 
	{
		if (root == document && (Config.get('showBuildingLevels') || Config.get('showBuildingNames'))) 
		{
			var dot = document.createElement('span');
			dot.className = "ikaEmpireBuildingLevel";
			if (building.level < 10 || building.level.toString() == 'NaN') 
				dot.style.padding = "2px 6px";
			if (Config.get('showBuildingLevels'))
			{
  			dot.innerHTML = building.level.toString() == 'NaN' ? 0 : building.level;
  		}
			if (Config.get('showBuildingNames'))
			{
			  dot.innerHTML = dot.innerHTML + ' ' + IkaTools.getText('buildingsShortNames', building.type, building.name);
			}
			var hasResources = (IkaTools.buildingGetResourceMissingTotal(building) == 0);
			if (hasResources && !IkaTools.buildingIsMaxed(building)) 
				dot.style.background = "#008800";
			if (IkaTools.buildingIsMaxed(building)) 
				dot.style.background = "#000088";
			if (!isMyCity) 
				dot.style.background = "#880000"
			var buildingLink = $('li#position' + building.position + ' a');
			$('.ikaEmpireBuildingLevel', buildingLink).remove(); // remove any existing dot 
			$('.ikaEmpireMissingResources', buildingLink).remove(); // remove any existing dot 
			buildingLink.append(dot);
			if (isMyCity && !IkaTools.buildingIsMaxed(building)) 
			{
//				buildingLink.attr('title', '');
				buildingLink.append('<br/>');
				buildingLink.append('<div class="ikaEmpireMissingResources ikaEmpireBuildingLevel' + (hasResources ? ' buildable' : '') + '"><span></span></div>');
				var resourceNames = ["wood", "wine", "marble", "glass", "sulfur"];
				var txt = '';
				for (var b = 0; b < resourceNames.length; b++) {
					if (hasResources) {
						var required = IkaTools.buildingGetResourceRequired(resourceNames[b], building);
						if (required > 0) 
							txt += '<nobr><img src="http://' + document.domain + '/skin/resources/icon_' + resourceNames[b] + '.png" style="height:12px; margin-'+IkaRTL.txtLeft+':5px; vertical-align:middle;"/> <span style="font-size:.8em;">' + IkaTools.addCommas(required) + '</span></nobr> ';
					} else {
						var missing = IkaTools.buildingGetResourceMissing(resourceNames[b], building);
						if (missing > 0) 
							txt += '<nobr><img src="http://' + document.domain + '/skin/resources/icon_' + resourceNames[b] + '.png" style="height:12px; margin-'+IkaRTL.txtLeft+':5px; vertical-align:middle;"/> <span style="font-size:.8em;">' + IkaTools.addCommas(missing) + '</span></nobr> ';
					}
				}
				txt += '<nobr><img src="http://' + document.domain + '/skin/resources/icon_time.png" style="height:14px; margin-'+IkaRTL.txtLeft+':5px; margin-top:-2px; vertical-align:middle;"/> <span style="font-size:.8em;">' + building.resources.time + '</span></nobr> ';
				$('.ikaEmpireMissingResources span', buildingLink).append(txt != '' ? txt : '???');
			}    
		}
	}
	// make sure island type is known or go get it
	if (!IkaTools.cityGetTradegoodType(city)) 
	{
		IkaTools.getRemoteDocument('http://' + document.domain + '//index.php?view=island&id=' + islandId, function(root){
			IkaTools.views.island(root, city.id);
		});
		IkaTools.getRemoteDocument('http://' + document.domain + '//index.php?view=tradegood&type=tradegood&id=' + islandId, function(root){
			IkaTools.views.tradegood(root);
		});
		IkaTools.getRemoteDocument('http://' + document.domain + '//index.php?view=resource&type=resource&id=' + islandId, function(root){
			IkaTools.views.resource(root);
		});
	}
	
	// loop through buildings   
	IkaTools.querySelectorAsArray('#mainview ul#locations li', root).forEach(function(item, i) 
	{
		try { var position = $(item).attr('id').toString().match(/\d+$/)[0]; } catch(e) { var position = false; }
		try { var level = $('a', item).attr('title').match(/\d+$/)[0]; } catch(e) { var level = null; }
		if(position && level) 
		{
			var building = IkaTools.cityGetBuildingByPosition(position, city);
			var type = IkaTools.querySelector('.buildingimg', item) != null ? item.className : (IkaTools.querySelector('.constructionSite', item) != null ? item.className : false);				
			if(type) 
			{
				var title = $(IkaTools.querySelector('a', item)).attr('title');
				building = building ? building : new IkaTools.building();
				building.level = parseInt(title.toString().match(/\d+$/));
				building.name = title.toString().replace(/\s[^\s]+\s\d+$/, '');  
				building.position = position;
				building.type = type;
				building.cityId = city.id;
				// auto update required resources
				if (isMyCity && (typeof(building.resourceLevel) == 'undefined' || building.level != building.resourceLevel)) 
				{
					var url = 'http://' + document.domain + '/index.php?view=' + building.type + '&id=' + building.cityId + '&position=' + building.position; 
					ExMachina.updateBuildingResourcesByUrl(url, function(building) 
					{
						redrawDotForBuilding(building);
					});
				} 
				else
				{
					redrawDotForBuilding(building);
				}
			}
		}
	});
	// player search icon for occuppied cities
	if (root == document && Config.get('searchIconOccupier')) 
	{
		IkaTools.querySelectorAsArray('#information .occupation_warning', root).forEach(function(item) {
			var html = item.innerHTML;
			$(item).append('<div id="occupationPlayerNameSandbox" style="display:none;"></div>');
			$('#occupationPlayerNameSandbox').html(html);
			$('#occupationPlayerNameSandbox a').remove();
			var playerName = $('#occupationPlayerNameSandbox').text().replace(/^(.|\r|\n)+?(by\s*)/, '').replace(/\s*$/, '');
			$('a', item).before('<img class="ikaSearchIcon" title="'+IkaTools.getText('interface', 'ShowCitiesMap', "Show cities on map")+ ' (' + playerName + ')" src="'+IkaSearch.icons.magnifier+'" style="cursor:pointer; display:inline; margin:0 .2em;"/>');
			$('.ikaSearchIcon', item).click(function() {
				IkaSearch.performPlayerSearch(playerName);
			});
		});
	}
	//--------------------------------- Anti Plus --------------------------
	if(root == document && Config.get('antiPlus')) { 
		GM_addStyle('#reportInboxLeft { display:none !important; }')
	}      
}

var tab300Image = 'data:image/gif;base64,R0lGODlhLAEgAPcAAOfHjem6fv/y2/322uGwZO/Omfn36eWzcf7y6/rz4P747Nu3df733fr02uW8fuKuYvr55u7Fjf/y4PPevOzEkf/66v/x3Prz2uC1ct21beCvaP715vv04vv02OzOnfz26P723/z23vzy2e3Ml+rKnPLTpv/78//34v/14v315evDj+e/i+G9gOq6euK5e+O3dOvMn+vKlem9ef/64f/37P/55f/43//13/v22fv13+GvY/314v746v324//04OOxaP7z3/746P7z3f735/314P325P724f/35P335//45vz03/z12f313vz14/zz4v304//55/323P/z3fv33P715OKvZf/04f/y3v/47v/15P732//y3+KxaP/z3v3y3P/x3vz03eKyZ/v37P3y4P/66P702//w2fz04f/65/vz3Pz34fz43+rJlPr46+OvZf7y3P/z3P/x4fz43eGza/735OOvZP/46/325uGvZf/14fr47P/14P/22OjKjvf65frnx+a4fOOwaO7Jkt+5eP/25/js1v/27/vw3ObGi//25O/Qodu3bffkxPz56unIk/z58P/05Pv46ejAjPny1v/y3eWxXuTGkv/y5+nKm+HOlO/QpO/o1vX28P/28d24hOvCivfpxunEjezDi/3x2fzw2v/y1P3z2f/51f/x2vb35+vNmfLm0Pbv1fvz3t+xYeWxbOO9fOO1b+W7eeDChOG0a/357fz47+q5dPz67f/57P3esPr449+3eeKwaPPjv/f46vz14uvKl+m9fPj02fzx3fv22/v33v/25fn01/nx3Pnx3vv+7fjz3//13f3lv/rZo//43Oa/e//46ePCjfzvz//z4/DHj//oxv7lz//35f/77O3Xpd+ya9+zbOnIlf/34OrJlvj48PzpyOOtYuKuYPngwejHkvX04OC4hNzBeuPCf//16f/26v7t0/retvv05OzLl//15fj56/344v/44trChN3DivvhvP/36uKya//56f/46P724/735eKuY//03iH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTU0MDA5NjE4NTI4MTFERjlCNkZGMjFDREQ5NzgzREIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTU0MDA5NjI4NTI4MTFERjlCNkZGMjFDREQ5NzgzREIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNTQwMDk1Rjg1MjgxMURGOUI2RkYyMUNERDk3ODNEQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxNTQwMDk2MDg1MjgxMURGOUI2RkYyMUNERDk3ODNEQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAAAAAAALAAAAAAsASAAAAj/AP0JHCgwDJd8Bw68cuPvh8OHECNKnEixosWLGDNqdEiwo8ePIEOKHEmypMmTKFOqXOlPB8uXMGPKnEmzps2bOD0+eEDu5LicQIMKHUq0qNGjSJMqXcq06U0NeJxKnUq1alIdrqxq3cq1a806MCuB5dKN25ww+dKqXcu2rdu3cOPKnUu3rt27ePPq3cu3790MGWhxqaLSE4lyV+xg4ZFEn+PHkCNLnky5suXLmDNr3sy5s+fPoEOL5rwOSjNnHgaFJOAPTxWwCzJt4lBhn74KdvDx2M17N77fwIMLH068uPHjyJP/7s28eXPl0KNLny7cufXr2LNr346dBpZHuE6I/1OErkqVQATmHPDXyyGGWILc8UkAhcydIfuG3LEufZ///wAGKOCABBZoYIFBJKjgggwu6Ft0B0Yo4YQTNmjhhRhmyN2G2bFDgxh6VDBDKdeM4AAGi7gQiD8uyPDCIJZMEIchSUDRTxP96OMfEjz2yOMQQAYJJIVEFmnkkQL+KGSQSDbp5JNQRrnPhdYRYocCBhhQizaN/KEKCwsA4kYYvLzwQgy+NGECAj20WUSNSSTRz5x01mlnP0sGeeeefPbp55+ABioonXkCOeihiCaqqKKF4kdhhg1+oI82+iAhRjicoMGIJiy0cEs60cgSyj1MpAJBMfzwc8SqT1BBxaqwwv/a5qyzLmrrrbjauSqttObq66/ABnsnkW3kQkYS2UiTCxbLbIBNH7K0UE80LMDQThLn4HCKEUScwM8ZCeyQ6rjklmvuueimq+667LLL67vw9tDuvPTWa++58ear775uFuHvv0Uc2mijkSDRDwpWoJBFIn6suQ0sAdgjzDQT/EMHEWWYooQSRBDRyg5H7NDxyCSX3PG9KKdML7/wmkyyyjDHbC7LNNds87t8Nuovj0EkQccRu2DRCSjmBDBLADBQM0MylFRzCRhKGMFtqsr4YPXVVrtMhNRcc43uDmCHLfbYZJdt9tlop3121i533fXXasct99x01222zAAD3OgJSQT/0YY8vxgAARpN2MJACTKo88kqw9zgxABAMPHP5JRXbvnlmGeu+eacd+7556CHLvropJdu+uVYp6766qxbXe8xG8TTBCvwrBBBIVPA4cQSW4Bx+u/ABy/88MQXbzzlrSevvOv1bpBFEZOMsII1b8ghwONfSH789tx37/333i8v/upan51CFv10UIAkEfwjhxlPaAEECODXb//9+OcPxP789+///wDsn9YG6AQrFGEJBVCBKP4xBTNQQX4hyJ8EJ0jBCoougAEUggY3yMEOCoF1AWTCGbbAgSWMQAXtmwIqqDCALaTBgjCMoQwliEEAevCGG8zgDaOgBCkkYAAxoEAK/wXwhCUA4YUzTKISlyi8Gv4PhzjMHA55+I8EaCGIEXhDMeBQRBRoj4lgDKMYNTc+qwEPhwMgwg1yAA1wUAAA/2CAAHaAjC7YYIx4zKMeJdgFYwxACgJQBBsQ8Y8oCAAYHbCAKfbIyEY6cngWWMMA/jEKEjgCEUKIggWagIMuiOCRoAylKDn3hTV0IA9wwAQbAOADEFiAAwPYQxlGSctahhIIaphEHprhgRGw8htX4EADrOAFWxrzmHgEwjyQ4QM4wAAeiDgEGILZACAUE5nYzKYMv6AGBgCBFDDwxgiIcYErpGCYQtCmOteZvzjkwAZjkEIJgvGMGihBAu+4gDXZyQ/PfnIPEsxgwBjooYsCBAQAOw%3D%3D'

function sortArrayByKeys(array) {
	var duplicateKeys = new Array();
	var keys = new Array();
	for(k in array) {
		keys.push(k);
	}
	keys.sort();
	var newArray = new Array();
	for(var i = 0; i < keys.length; i++) {
		newArray.push(array[keys[i]]);
	}	
	return newArray
}

function sortBuildingsByName(array) {
	var sortArray = new Array();
	for(var i = 0; i < array.length; i++) {
		var empty = false;
		var nameLevel = array[i].name + array[i].level;
		while(!empty) {
			if(typeof(sortArray[nameLevel]) == 'undefined') {
				sortArray[nameLevel] = array[i];
				empty = true;
			}
			nameLevel +=  " ";
		}
	}
	return sortArrayByKeys(sortArray);
}

Treaty = {
	init:function() {
		var start = new Date();
		if(typeof(Treaty.views[IkaTools.getView()]) == 'function')
			Treaty.views[IkaTools.getView()]();
		if(IkaTools.getVal('initialized').toString() != 'yes') {
			IkaTools.setVal('initialized', 'yes');
			IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=diplomacyAdvisorTreaty', Treaty.views.diplomacyAdvisorTreaty);
		}
		if(Config.get('debugMode')) {
			var end = new Date();
			IkaTools.debug('Treaty: ' + IkaTools.addCommas(new Date() - start) + 'ms');
		}
	},
	getMaxNumCt:function() {
		if(typeof(Treaty.museumLevelsByCityId) == 'undefined') 
			Treaty.museumLevelsByCityId = IkaTools.getVal('museumLevelsByCityId');
		var newMuseums = {};
		var total = 0;
		for(var cityId in Treaty.museumLevelsByCityId) {
			if(Treaty.isMyCity(cityId)) {
				total += parseInt(Treaty.museumLevelsByCityId[cityId]);
				newMuseums[cityId] = Treaty.museumLevelsByCityId[cityId];
			}
		}
		Treaty.museumLevelsByCityId = newMuseums;
		IkaTools.setVal('museumLevelsByCityId', Treaty.museumLevelsByCityId);
		return total;
	},
	getNumCt:function() {
		if(typeof(Treaty.ctPlayerIds) == 'undefined') 
			Treaty.ctPlayerIds = IkaTools.getVal('ctPlayerIds');
		var i = 0;
		for(var x in Treaty.ctPlayerIds) i++;
		return i;
	},
	getNumCtFree:function() {
		return Treaty.getMaxNumCt() - Treaty.getNumCt() > 0 ? Treaty.getMaxNumCt() - Treaty.getNumCt() : 0;	
	},
	hasCt:function(playerId) {
		if(typeof(Treaty.ctPlayerIds) == 'undefined') 
			Treaty.ctPlayerIds = IkaTools.getVal('ctPlayerIds');
		return typeof(Treaty.ctPlayerIds[playerId]) != 'undefined';
	},
	hasPendingCt:function(playerId) {
		if(typeof(Treaty.ctPendingPlayerIds) == 'undefined') 
			Treaty.ctPendingPlayerIds = IkaTools.getVal('ctPendingPlayerIds');
		return typeof(Treaty.ctPendingPlayerIds[playerId]) != 'undefined';
	},
	icons:{
		ct:'<img src="skin/museum/icon32_culturalgood.gif" width="16" height="16" align="absmiddle" title="'+IkaTools.getText('interface', 'HaveACulturalTreaty', 'You cave a cultural treaty with this player')+'" style="cursor:help;" />',
		ctPending:'<img src="skin/museum/icon32_culturalgood.gif" width="16" height="16" align="absmiddle" style="opacity:.4; cursor:help;" title="'+IkaTools.getText('interface', 'RequestedCulturalTreaty', "You have requested a cultural treaty with this player")+'" />',
	},
	isMyCity:function(cityId) {
		var myCityIds = {};
		IkaTools.querySelectorAsArray('#citySelect option', document).forEach(function(item) {
			if (item.className == 'coords' || item.className == '' || item.className.match(/tradegood/))
				myCityIds[item.value] = true;									  
		});
		return typeof(myCityIds[cityId]) != 'undefined';
	},
	setMuseumLevelForCityId:function(level, cityId) {
		if(typeof(Treaty.museumLevelsByCityId) == 'undefined') 
			Treaty.museumLevelsByCityId = IkaTools.getVal('museumLevelsByCityId');
		Treaty.museumLevelsByCityId[cityId] = level;
		IkaTools.setVal('museumLevelsByCityId', Treaty.museumLevelsByCityId);
	},
	views:{
		city:function() {
			try { var cityId = document.location.toString().match(/id=(\d+)/)[1]; } catch(e) { var cityId = false; }
			cityId = cityId ? cityId : ExMachina.currentCityId;
			// update museum level
			if(Treaty.isMyCity(cityId)) {
				var museum = document.querySelector('ul#locations li.museum');
				if (museum != null)
				{
					Treaty.setMuseumLevelForCityId($('a', museum).attr('title').match(/\d$/)[0], cityId);
        }
			}
		},
		diplomacyAdvisorAlly:function() {
			if(Config.get('ctAlliance')) {
				$(document.querySelector("table#memberList thead tr")).append('<th class="catHdr">CT</th>')
				var cellNum = document.querySelectorAll("table#memberList thead th").length - 1;

				IkaTools.querySelectorAsArray("table#memberList tbody > tr", document).forEach( function(item) {	
					var td = document.createElement('td');
					try { var playerId = IkaTools.querySelector('.action .message', item).href.match(/receiverId=(\d+)/)[1]; } catch(e) { var playerId = false; }
					if(playerId) {
						if(Treaty.hasCt(playerId))
							td.innerHTML = Treaty.icons.ct;
						else if(Treaty.hasPendingCt(playerId))
							td.innerHTML = Treaty.icons.ctPending;	
					}
					$(item).append(td);
				});
			}
		},
		diplomacyAdvisorTreaty:function(root) {
			root = typeof(root) != 'undefined' ? root : document;
			if(Config.get('ctTradeTreaties')) {
				$("table#commercialTreaty").each( function() {	
					$("thead > tr", this).each( function() {
						$(this).append('<th class="catHdr">CT</th>');
					});			
					var cellNum = $("thead > tr th", this).size() - 1;
					$("tbody > tr", this).each(function() {
						try { var playerId = this.innerHTML.match(/receiverId=(\d+)/)[1]; } catch(e) { var playerId = false; }
						if(playerId) {
							$(this).append('<td></td>');
							if(Treaty.hasCt(playerId))
								$("td", this)[$("td", this).size() - 1].innerHTML = Treaty.icons.ct;
							else if(Treaty.hasPendingCt(playerId))
								$("td", this)[$("td", this).size() - 1].innerHTML = Treaty.icons.ctPending;	
						}
					});
				});
			}
			// store museum levels
			$('#culturalTreaties tbody tr', root).each(function() {
				try { 
					var level = parseInt($('td', this).eq(2).text());
					var cityId = this.innerHTML.match(/id=(\d+)/)[1];
					Treaty.setMuseumLevelForCityId(level, cityId);
				} catch(e) {}
			});
		},
		embassy:function() {
			Treaty.views.diplomacyAdvisorAlly();
		},
		island:function() {
			if(Config.get('ctIslandView')) {
				IkaTools.querySelectorAsArray("ul#cities  li.city", document).forEach(function(item) {
					try { var playerId = item.innerHTML.match(/receiverId=(\d+)/)[1]; } catch(e) { var playerId = false; }
					if(playerId) {
						if(Treaty.hasCt(playerId))
							$(IkaTools.querySelector('a .textLabel .before', item)).after(Treaty.icons.ct);
						else if(Treaty.hasPendingCt(playerId))
							$(IkaTools.querySelector('a .textLabel .before', item)).after(Treaty.icons.ctPending);
					}
				});
			} 
		},
		museum:function(root) {
			root = typeof(root) != 'undefined' ? root : document;
			// update museum level
			var level = parseInt($('#buildingUpgrade .buildingLevel', root).text().replace(/[^\d]/g, ''));
			var cityId = document.location.toString().match(/id=(\d+)/)[1];
			Treaty.setMuseumLevelForCityId(level, cityId);			
			// read pending CTs
			Treaty.ctPendingPlayerIds = {};
			var ctBox = 1;
			
			var tables = IkaTools.querySelectorAll('.contentBox01h', root);
			
			if (tables.length > 2)
			{
			  ctBox = 2;
  			IkaTools.querySelectorAsArray('tr', tables[1]).forEach(function(item, i) {
  				if(i > 0) {
  					var playerId = item.innerHTML.match(/receiverId=(\d+)/)[1];
  					Treaty.ctPendingPlayerIds[playerId] = true;
  				}
  			});
			}
			
			IkaTools.setVal('ctPendingPlayerIds', Treaty.ctPendingPlayerIds);
			// read CTs
			Treaty.ctPlayerIds = {};	

			IkaTools.querySelectorAsArray('tr', tables[ctBox]).forEach(function(item, i) {
				if(i > 0) {
					var playerId = item.innerHTML.match(/receiverId=(\d+)/)[1];
					Treaty.ctPlayerIds[playerId] = true;
				}
			});
			IkaTools.setVal('ctPlayerIds', Treaty.ctPlayerIds);
			// show max num treaties
			$(IkaTools.querySelector('h3.header', tables[ctBox])).append(' (' + Treaty.getNumCt() + '/' + Treaty.getMaxNumCt() + ')   -    ' + Treaty.getNumCtFree() + ' '+IkaTools.getText('interface', 'openSlots', 'open slots'));
			$(document.querySelector('#assignCulturalGoods div.totalCulturalGoods')).append(' '+IkaTools.getText('interface', 'of', 'of') + ' ' + Treaty.getMaxNumCt());
		},
		sendIKMessage:function() {
			var selector = document.getElementById('treaties');
			var elems = selector.options;
			if (elems) {
				var catEnabled = false;
				for (var i = 0; i < elems.length; i++) {
					if (elems[i].value.toString() == '77') 
						catEnabled = true;
				}
				if (!catEnabled) {
					var option = document.createElement('option');
					option.value = '77';
					option.innerHTML = IkaTools.getText('interface', 'RequestCT', 'Request cultural goods treaty') + ' (ExMachina)';
					selector.appendChild(option);
				}
			}
		}
	}
};

Pillage = {
	config:{
		showMissionGold:false,
		islandShowSpies:true,
		islandBlinkInactives:true,
		islandMarkLoners:true,
		debugMode:false,
		dateFormat:'M/D/Y - H:m',
	},
	targets:{},
	spies:{},
	init:function() {
		Pillage.debugStart('Pillage Helper');
		unsafeWindow.Pillage = Pillage;
		Pillage.loadData();
		if(typeof(Pillage.views[IkaTools.getView()]) == 'function')		// process current view
			Pillage.views[IkaTools.getView()]();					
		if(Config.get('targetsOverview')) {
			$('#advisors li#advResearch')[0].addEventListener('mouseover', Pillage.showTargetsOverview, false);
			Pillage.tackTargetsOverview(false);
		}
		Pillage.debugStop('Pillage Helper');
	},
	cityReloadSpies:function(city, callback) {
		var hideout = IkaTools.cityGetBuildingByType('safehouse', city);
		if(hideout) {
			IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=safehouse&position=' + hideout.position + '&id=' + hideout.cityId, function(root) {
				// clear spies from this city
				var newSpies = {};
				for(var spyId in Pillage.spies) 
				{
					if(Pillage.spies[spyId].cityId != city.id)
						newSpies[spyId] = Pillage.spies[spyId];
				}
				Pillage.spies = newSpies;
				Pillage.saveSpies();
				// load spies in city
				$('#mainview div.spyinfo', root).each(function(i) {
//					try { var targetId = $(this).html().match(/id=(\d+)/)[1]; } catch(e) { var targetId = false; }
					try { var targetId = this.innerHTML.match(/view=city&amp;id=(\d+)/)[1]; } catch(e) { var targetId = false; }
					if(targetId) {
						// reload spy data
//						var spyId = $('.missionButton a', this).attr('href').match(/spy=(\d+)/)[1];
						var spyId = targetId +'_'+city.id;
						var spy = Pillage.getSpyById(spyId);
						spy = spy ? spy : {id:spyId};
						spy.targetId = targetId;
						spy.cityId = city.id;
  					try { spy.count = Number(trim($('li', this)[1].innerHTML).split(' ')[0]); } catch(e) { spy.count = 1; }
						Pillage.spies[spyId] = spy;
						// reload target data
						var target = Pillage.getTargetById(targetId);
						target = target ? target : {id:targetId};
						var tmp = $('li.city a', this).html();
						target.cityName = tmp.match(/^[^\(]+/)[0];
						target.islandX = tmp.match(/\((\d+),\d+\)/)[1];
						target.islandY = tmp.match(/\(\d+,(\d+)\)/)[1];
						Pillage.targets[targetId] = target;
						
					}
				});
				Pillage.saveTargets();
				Pillage.saveSpies();	
				if(typeof(callback) == 'function') callback();
			});
		}
	},
	debugStart:function(str) {
		var d = new Date();
		Pillage.startTimes = typeof(Pillage.startTimes) == 'undefined' ? {} : Pillage.startTimes;
		Pillage.startTimes[str] = d.getTime();
	},
	debugStop:function(str) {
		if(Config.get('debugMode')) {
			IkaTools.config.debugMode = true;
			var end = new Date();
			IkaTools.debug(str + ': ' + IkaTools.addCommas(end.getTime() - Pillage.startTimes[str]) + 'ms');
		}
	},
	drawTargetsOverview:function() {
		if($('#pillageHelperTargetsOverview').size() == 0) {
			var div = document.createElement('div');
			div.id = 'pillageHelperTargetsOverview';
			div.setAttribute('style', 'display:none; background-color:#FEE8C8; border:1px solid #9D836A; text-align:'+IkaRTL.txtLeft+'; width:950px; margin-'+IkaRTL.txtLeft+':-776px; position:relative; z-index:10500;'); 
			$('li#advResearch').append(div);
			GM_addStyle('#pillageHelperTargetsOverview a { display:inline !important; color:#000099 !important; }\
						#pillageHelperTargetsOverview .targetsOverviewTravelTimes a { display:block !important; margin-bottom:.5em; height:auto; width:auto; }\
						#pillageHelperTargetsOverview .targetsOverviewTravelTimes { display:none; border:1px solid #666; padding:.5em; background-color:#fff; position:absolute; top:1.4em; '+IkaRTL.txtLeft+':-.4em; z-index:50000; width:200px;  }\
						#pillageHelperTargetsOverview td.travelTime:hover .targetsOverviewTravelTimes { display:block; }\
						#pillageHelperTargetsOverview a:hover { text-decoration:underline !important; }\
						#pillageHelperTargetsOverview * { font-size:11px !important; }\
						#pillageHelperTargetsOverview th { font-weight:bold; }\
						#pillageHelperTargetsOverview th, #pillageHelperTargetsOverview td { padding:5px !important; border-bottom:1px dotted #9D836A !important; }\
						#pillageHelperTargetsOverview tr.even { background-color:#FDF7DD !important; } \
						#pillageHelperTargetsOverview tr.uneven { background-color:#FEE8C8 !important; } \
						#pillageHelperTargetsOverview th { line-height:14px !important; }\
						#pillageHelperTargetsOverview td { border-'+IkaRTL.txtLeft+':1px dotted #9D836A !important; padding:2px 5px !important; }\
						#pillageHelperTargetsOverview tr:hover > td { background-color:#CBECFF !important; }\
						#pillageHelperTargetsOverview td.pillageHelperTargetsOverviewSpies { position:relative; text-align:center; }\
						#pillageHelperTargetsOverview img.disabled { opacity:.2; }\
						#pillageHelperTargetsOverview .pillageHelperTargetsOverviewSpies .pillageHelperTargetsOverviewSpiesDetails { margin-top:0; margin-'+IkaRTL.txtLeft+':-72px; position:absolute; background-color:#FDF7DD; z-index:20000; display:none; border:1px solid #666; padding:1em !important; text-align:'+IkaRTL.txtLeft+'; width:200px;}\
						#pillageHelperTargetsOverview .pillageHelperTargetsOverviewSpies:hover .pillageHelperTargetsOverviewSpiesDetails { display:block; }\
						.pillageHelperTargetsOverviewGarrison .pillageHelperTargetsOverviewGarrisonDetails { display:none; position:absolute; background-color:#FDF7DD; padding:.5em; border:1px solid #666; margin-'+IkaRTL.txtLeft+':-50px; z-index:30000; margin-top:4px; }\
						.pillageHelperTargetsOverviewGarrison:hover .pillageHelperTargetsOverviewGarrisonDetails { display:block; }');
		}
		var html = '<table cellpadding="0" cellspacing="0" border="0" width="100%"  style="width:100%; white-space:nowrap;">\
						<tr valign="middle" style="background-image:url(/skin/input/button.png); height:14px;">\
							<th>'+IkaTools.getText('pillageHelper', 'Player', "Player")+'</th>\
							<th style="text-align:center"><img src="http://' + document.domain + '/skin/unitdesc/unit_attack.png" style="height:16px" title="'+IkaTools.getText('pillageHelper', 'MilitaryScore', "Player's military score")+'"/></th>\
							<th>'+IkaTools.getText('pillageHelper', 'City', "City")+'</th>\
							<th style="text-align:center"><img src="http://' + document.domain + '/skin/img/city/building_townhall.png" style="height:16px" title="'+IkaTools.getText('pillageHelper', 'CityLevel', "City Level")+'"/></th>\
							<th style="text-align:center;"><img src="http://' + document.domain + '/skin/img/city/building_barracks.png" style="height:16px;" title="'+IkaTools.getText('pillageHelper', 'Garrison', "Garrison information")+'"/></th>\
							<th style="text-align:center"><img src="http://' + document.domain + '/skin/layout/stadtmauer_icon.png" style="height:16px" title="'+IkaTools.getText('pillageHelper', 'Wall', "Wall Level")+'"/></th>\
							<th style="text-align:center"><img src="http://' + document.domain + '/skin/characters/military/120x100/mortar_r_120x100.png" style="height:16px" title="'+IkaTools.getText('pillageHelper', 'Mortars', "Mortars needed")+'"/></th>\
							<th style="text-align:center"><img src="http://' + document.domain + '/skin/img/city/building_port.png" style="height:16px" title="'+IkaTools.getText('pillageHelper', 'Port', "Port Level")+'"/></th>\
							<th style="text-align:center"><img src="http://' + document.domain + '/skin/characters/military/120x100/spy_120x100.png" style="height:16px" title="'+IkaTools.getText('pillageHelper', 'SpyCount', "Spies in target")+'"/></th>\
							<th style="text-align:center;"><img src="http://' + document.domain + '/skin/resources/icon_wood.png" style="height:14px;" title="'+IkaTools.getText('pillageHelper', 'Wood', "Wood available for pillaging")+'"/></th>\
							<th style="text-align:center;"><img src="http://' + document.domain + '/skin/resources/icon_wine.png" style="height:14px;" title="'+IkaTools.getText('pillageHelper', 'Wine', "Wine available for pillaging")+'"/></th>\
							<th style="text-align:center;"><img src="http://' + document.domain + '/skin/resources/icon_marble.png" style="height:14px;" title="'+IkaTools.getText('pillageHelper', 'Marble', "Marble available for pillaging")+'"/></th>\
							<th style="text-align:center;"><img src="http://' + document.domain + '/skin/resources/icon_crystal.png" style="height:14px;" title="'+IkaTools.getText('pillageHelper', 'Crystal', "Crystal available for pillaging")+'"/></th>\
							<th style="text-align:center;"><img src="http://' + document.domain + '/skin/resources/icon_sulfur.png" style="height:16px;" title="'+IkaTools.getText('pillageHelper', 'Sulphur', "Sulphur available for pillaging")+'"/></th>\
							<th style="text-align:center;"><img src="http://' + document.domain + '/skin/characters/fleet/40x40/ship_transport_r_40x40.png" style="height:16px;" title="'+IkaTools.getText('pillageHelper', 'Ships', "Trade ships required to carry loot")+'"/></th>\
							<th style="text-align:center;"><img src="' + ExMachina.icons.travelTime + '" style="height:14px;" title="'+IkaTools.getText('pillageHelper', 'Time', "Travel Time")+'"/></th>\
							<th style="text-align:'+IkaRTL.txtRight+'"><img src="' + Pillage.icons.refreshSmall + '" style="cursor:pointer;" id="PillageHelperTargetsOverviewRefresh" title="'+IkaTools.getText('pillageHelper', 'Reload', "Reload all spies")+'"/></th>\
						</tr>';
		var targets = Pillage.targets;
		var sortBucket = {};
		var str = '';
		var c = 0;
		for(var x in targets) {
			c++;
			str += Pillage.targetGetPlayerName(targets[x]) + "\n";
			sortBucket[Pillage.targetGetPlayerName(targets[x]) + targets[x].cityName + c] = targets[x];
		}
		var sorted = sortArrayByKeys(sortBucket);
		var i = 0;
		for(var q = 0; q < sorted.length; q++) {
			var id = sorted[q].id;
			i++;
			var target = targets[id];
			var spies = Pillage.targetGetSpies(target);
			var now = new Date();
			// load city info if absent
			if(spies.length > 0 && Pillage.targetGetCityLevel(target) == '?')
			{
				Pillage.targetFetchCityInfo(target, Pillage.drawTargetsOverview);	
			}
		  else if ((typeof(target.militaryScoreTime) == 'undefined') || (now - new Date(target.militaryScoreTime) > 10800000))
		  {
  			var playerName = Pillage.targetGetPlayerName(target);
  			IkaTools.getScoreForPlayer('military', playerName.replace(/&nbsp;/g, ' '), function(score, playerName) {
					//alert(playerName + ' ' + score.points);
  				// assign military score to other targets owned by player
  				var targets = Pillage.targets;
  				for(var x in targets) {
  					if (Pillage.targetGetPlayerName(targets[x]) == playerName) {
  						targets[x].militaryScoreTime = new Date();
  						targets[x].militaryScore = score.points;
  					}
  				}
  				Pillage.saveTargets();	
 					Pillage.drawTargetsOverview(target);
  			}, playerName);
		  }
			// get number of spies per city
			var cities = IkaTools.getCities();
			var spiesPerCity = {};
			for(var z = 0; z < spies.length; z++) {
				spiesPerCity[spies[z].cityId] = typeof(spiesPerCity[spies[z].cityId]) != 'undefined' ? spiesPerCity[spies[z].cityId] + 1 : 1;
			}			
			html += '<tr class="' + (i%2 == 0 ? 'even' : 'uneven') + '" id="pillageHelperTargetOverview_' + target.id + '">';
			// alliance
			html += '	<td><nobr>' + (Pillage.targetGetPlayerName(target) ? Pillage.targetGetPlayerName(target) : '?') + 
							(Pillage.targetGetAllianceName(target) != '-' ? ' [' + Pillage.targetGetAllianceName(target) + ']' : '') +
						'</nobr></td>' 
			// military score
			html += '	<td title="'+IkaTools.getText('pillageHelper', 'MilitaryScore', "Player's military score")+'">' + (typeof(target.militaryScore) == 'undefined' ? '?' : IkaTools.addCommas(target.militaryScore)) +	'</td>';
			var nameWithCoords = '[' + target.islandX + ':' + target.islandY + '] ' + target.cityName;
			html += '	<td>' + (Pillage.targetGetTradegoodType(target) ? '<img src="http://' + document.domain + '/skin/resources/icon_' + Pillage.targetGetTradegoodType(target) + '.png" style="height:14px; vertical-align:middle; margin-'+IkaRTL.txtRight+':4px;"/> ' : '');
			html +=			(spies.length > 0 ? '<a href="http://' + document.domain + '/index.php?view=city&id=' + target.id + '">' : '') + nameWithCoords + (spies.length > 0 ? '</a>' : '') + 
							(Pillage.targetIsOccupied(target) ? ' <img src="http://' + document.domain + '/skin/img/island/besatzung_rot_cursor.png" style="vertical-align:middle; height:18px;"/>' : '') + 
							(Pillage.targetIsInactive(target) ? ' (i)' : '') +
						'</td>';
			html += '	<td title="'+IkaTools.getText('pillageHelper', 'CityLevel', "City Level")+'" style="text-align:center">' + Pillage.targetGetCityLevel(target) + '</td>';
			// garrison
			var garrisonHtml = typeof(target.garrison) != 'undefined' ? target.garrison.html : false;
			html += '<td style="text-align:center;" class="pillageHelperTargetsOverviewGarrison">' + 
						((typeof(target.militaryScore) != 'undefined' && target.militaryScore == 0) ? '-' : 
							(garrisonHtml ? 
							 		(garrisonHtml.match(/class="count">[1-9]/) ? '<img src="http://' + document.domain + '/skin/layout/shield-icon2.png" style="height:14px; vertical-align:middle;"/>' : '-')
									: '?'
							) + 
							(garrisonHtml ? '<div class="pillageHelperTargetsOverviewGarrisonDetails">'+IkaTools.getText('pillageHelper', 'Updated', "Updated")+': ' + Pillage.targetGetGarrisonLastUpdatedString(target) + 
								(garrisonHtml.match(/class="count">[1-9]/) ? '<br/><br/>' + garrisonHtml : '') + 
								'</div>' : '')
						) +
					'</td>';
			html += '	<td title="'+IkaTools.getText('pillageHelper', 'Wall', "Wall Level")+'" style="text-align:center">' + Pillage.targetGetWallLevel(target) + '</td>\
						<td title="'+IkaTools.getText('pillageHelper', 'Mortars', "Mortars Needed")+'"  style="text-align:center">' + Pillage.targetGetMortarsNeeded(target) + '</td>\
						<td title="'+IkaTools.getText('pillageHelper', 'Port', "Port Level")+'"  style="text-align:center">' + Pillage.targetGetPortLevel(target) + '</td>';
			// spies
			html += '	<td title="'+IkaTools.getText('pillageHelper', 'SpyCountIn', "Number of spies in")+' ' + target.cityName + '" style="text-align:center;">';
			var numSpiesTotal = 0;
			for(var x in spies)
			{
//				numSpiesTotal++;
				numSpiesTotal += (spies[x].count != undefined) ? spies[x].count : 0;
			}
			html += numSpiesTotal > 0 ? numSpiesTotal : '-';
			// resources
			var resourcesUpdatedString = Pillage.targetGetResourcesLastUpdatedString(target);
			for(var z = 0; z < Pillage.resourceTypes.length; z++) {
				var type = Pillage.resourceTypes[z];
				var available = Pillage.targetGetResourceAvailable(target, type);
				html += '<td title="'+IkaTools.getText('pillageHelper', 'LastChecked', "Last checked")+': ' + resourcesUpdatedString + '" style="text-align:center;" id="pillageHelperTargetResource' + type + '_' + target.id + '">' + (available > 0 ? IkaTools.addCommas(available) : (resourcesUpdatedString == '?' ? '?' : '-')) + '</td>';
			}
			// ships
			var totalAvailable = Pillage.targetGetResourceAvailableTotal(target);
			html += '<td title="'+IkaTools.getText('pillageHelper', 'LastChecked', "Last checked")+': ' + resourcesUpdatedString + '" style="text-align:center; font-weight:bold;" id="pillageHelperTargetOverviewShips_' + target.id + '">' + (resourcesUpdatedString != '?' ? Math.ceil(totalAvailable / 500) : (resourcesUpdatedString == '?' ? '?' : '-') ) + 
					'</td>';		
			// travel time
			function convertMsToTimeStr(ms) {
				var seconds = Math.round(ms / 1000);
				var minutes = Math.floor(seconds / 60);
				var hours = Math.floor(minutes / 60);
				minutes -= hours * 60;
				return (hours > 0 ? hours + 'h ' : '') + (minutes > 0 ? minutes + 'm ' : '');
			}
			function getTravelTimesForAllCitiesAsHtml() {
				var cities = IkaTools.getCities();
				var html = '<div class="targetsOverviewTravelTimes">';
				for(var i = 0; i < cities.length; i++) {
					var time = IkaTools.getTravelTime(target.islandX, target.islandY, IkaTools.cityGetIslandX(cities[i]), IkaTools.cityGetIslandY(cities[i]));
					html += '<a href="javascript:void(0);" title="Go to ' + cities[i].name + '" name="' + cities[i].id + '">' + cities[i].name + ' - ' + convertMsToTimeStr(time) + '</a>';
				}
				return html +'</div>';
			}	
			var travelTime = IkaTools.getTravelTime(target.islandX, target.islandY, IkaTools.cityGetIslandX(), IkaTools.cityGetIslandY());
			html += '	<td class="travelTime"><div style="position:relative; height:1em; overflow:visible;">' + convertMsToTimeStr(travelTime) + getTravelTimesForAllCitiesAsHtml() + '</div></td>';	
			// tools
			html += '	</td>\
						<td style="text-align:'+IkaRTL.txtRight+';">'
							html += Pillage.targetGetIslandId(target) ?
									'	<a href="http://' + document.domain + '/index.php?view=island&cityId=' + target.id + '&islandId=' + Pillage.targetGetIslandId(target) + '"><img src="http://' + document.domain + '/skin/layout/icon-island.png" style="height:16px;" title="'+IkaTools.getText('interface', 'ViewCityIsland', "View city on its island")+'"/></a>' :
									'	<img src="http://' + document.domain + '/skin/layout/icon-island.png" style="height:16px;" class="disabled" title="'+IkaTools.getText('pillageHelper', 'ViewNoIslandInfo', "Unable to view island because its ID is not yet known")+'"/>';
			// missions
			html += ' <a href="http://' + document.domain + '/index.php?view=spyMissions&id=' + target.id + '" title="'+IkaTools.getText('pillageHelper', 'Mission', "Mission")+' ' + target.cityName + '"><img src="http://' + document.domain + '/skin/layout/icon-mission.png" style="height:14px;"/></a>';
/*
							html += '<div class="pillageHelperTargetsOverviewSpies" style="display:inline;" onclick="this.getElementsByTagName(\'div\')[0].style.display = \'block\'">';
							if(numSpiesTotal > 0) {
								html += '<img src="http://' + document.domain + '/skin/layout/icon-mission.png" style="height:14px; cursor:pointer;"/>';
								var spiesHtml = '<div class="pillageHelperTargetsOverviewSpiesDetails" style="padding-bottom:0 !important;">';
								for(var x in spies) {
									var city = IkaTools.getCityById(spies[x].cityId);
									var hideout = city ? IkaTools.cityGetBuildingByType('safehouse', city) : false;
									spiesHtml += hideout ? '<div style="margin-bottom:1em;">\
																<img src="http://' + document.domain + '/skin/layout/icon-missionAbort.png" style="height:14px; float:right; margin-left:4px; cursor:pointer;" title="Withdraw from ' + target.cityName + '" class="pillageHelperTargetsOverviewMissionWithdraw" name="' + spies[x].id + '"/>\
																<img src="http://' + document.domain + '/skin/layout/bulb-on.png" style="height:16px; float:right; cursor:pointer; margin-left:2px;" title="Check online status for the owner of ' + target.cityName + '" class="pillageHelperTargetsOverviewMissionOnline" name="' + spies[x].id + '"/>\
																<img src="http://' + document.domain + '/skin/img/city/building_barracks.png" style="height:16px; float:right; cursor:pointer;" title="Inspect garrison in ' + target.cityName + '" class="pillageHelperTargetsOverviewMissionGarrison" name="' + spies[x].id + '"/>\
																<img src="http://' + document.domain + '/skin/img/city/building_warehouse.png" style="height:16px; float:right; cursor:pointer;" title="Inspect warehouse in ' + target.cityName + '" class="pillageHelperTargetsOverviewMissionResources" name="' + spies[x].id + '"/>\
																<a href="javascript:Pillage.goTo(\'http://' + document.domain + '/index.php?view=safehouse&position=' + hideout.position + '&id=' + city.id + '\', ' + city.id + ');" title="Go to hideout in ' + city.name + '">' + city.name + '</a>' +
															'</div>' 
															: '';
								}
								html += spiesHtml + '</div>';
							} else
								html += '<img src="http://' + document.domain + '/skin/layout/icon-mission.png" style="height:14px;" class="disabled" title="You have no speis in ' + target.cityName + '"/>'
							html += '</div>';
*/
			// pillage
			html += ' <a href="http://' + document.domain + '/index.php?view=plunder&destinationCityId=' + target.id + '&islandId=' + Pillage.targetGetIslandId(target) + '" title="'+IkaTools.getText('pillageHelper', 'Pillage', "Pillage")+' ' + target.cityName + '"><img src="http://' + document.domain + '/skin/actions/plunder.png" style="height:14px;"/></a>';
			// blockade
			html += ' <a href="http://' + document.domain + '/index.php?view=blockade&destinationCityId=' + target.id + '&islandId=' + Pillage.targetGetIslandId(target) + '" title="'+IkaTools.getText('pillageHelper', 'Blockade', "Blockade")+' ' + target.cityName + '"><img src="http://' + document.domain + '/skin/actions/blockade.png" style="height:14px;"/></a>';
			// send spy
			html += Pillage.targetGetIslandId(target) ?
						' <a href="http://' + document.domain + '/index.php?view=sendSpy&destinationCityId=' + target.id + '&islandId=' + Pillage.targetGetIslandId(target) + '" title="'+IkaTools.getText('pillageHelper', 'SendSpy', "Send spy to")+' ' + target.cityName + '"><img src="http://' + document.domain + '/skin/actions/espionage.png" style="height:14px;"/></a>' :
						' <img src="http://' + document.domain + '/skin/actions/espionage.png" style="height:14px;" class="disabled" title="'+IkaTools.getText('pillageHelper', 'SendNoIslandInfo', "Unable to send spy because island ID is not yet known")+'"/>';
			html += numSpiesTotal == 0 ? 
					'<img src="' + Pillage.icons.trash + '" title="'+IkaTools.getText('pillageHelper', 'RemoveCity', "Remove city from target list")+' (' + target.cityName + ')" style="cursor:pointer;" class="pillageHelperTargetOverviewDeleteImg" name="' + target.id + '" />' : 
					'<img src="' + Pillage.icons.trash + '" title="'+IkaTools.getText('pillageHelper', 'CantRemoveCity', "You still have spies in")+' ' + target.cityName + '" class="disabled"/> '
			html +='	  </td>';
			html += '</tr>';
		}
		html += '</table>';
		$('#pillageHelperTargetsOverview').html(html);
		// add event listeners
		$('img.pillageHelperTargetOverviewDeleteImg').each(function() {
			var targetId = this.name;
			this.addEventListener('click', function() {
				Pillage.deleteTarget(targetId);
			}, false);
		});
		$('img.pillageHelperTargetsOverviewMissionResources').each(function() {
			var spyId = this.name;
			this.addEventListener('click', function() {
				Pillage.tackTargetsOverview();
				Pillage.missionResources(spyId, function(spy) {
					Pillage.drawTargetsOverview();	
					Pillage.tackTargetsOverview(false);
					/*
					var target = Pillage.getTargetById(spy.targetId);
					$('#pillageHelperTargetOverviewShips_' + target.id).html(Pillage.targetGetShipsNeeded(target));
					$('#pillageHelperTargetOverviewShips_' + target.id).attr('title', 'Last updated: ' + Pillage.targetGetResourcesLastUpdatedString(target));
					for(var i = 0; i < Pillage.resourceTypes.length; i++) {
						var type = Pillage.resourceTypes[i];
						var qty = IkaTools.addCommas(Pillage.targetGetResourceAvailable(target, type));
						$('#pillageHelperTargetResource' + type + '_' + target.id).html(qty == 0 ? '-' : qty);	
						$('#pillageHelperTargetResource' + type + '_' + target.id).attr('title', 'Last updated: ' + Pillage.targetGetResourcesLastUpdatedString(target));
					}
					*/
				});
			}, false);
		});
		$('img.pillageHelperTargetsOverviewMissionGarrison').each(function() {
			var spyId = this.name;
			this.addEventListener('click', function() {
				Pillage.tackTargetsOverview();
				Pillage.missionGarrison(spyId, function(spy) {
					Pillage.drawTargetsOverview();	
					Pillage.tackTargetsOverview(false);
				});
			}, false);
		});
		$('img.pillageHelperTargetsOverviewMissionOnline').each(function() {
			var spyId = this.name;
			this.addEventListener('click', function() {
				Pillage.tackTargetsOverview();
				Pillage.missionOnline(spyId, function(spy) {
					Pillage.tackTargetsOverview(false);
				});
			}, false);
		});
		$('img.pillageHelperTargetsOverviewMissionWithdraw').each(function() {
			var spyId = this.name;
			this.addEventListener('click', function() {
				Pillage.missionWithdraw(spyId, function() {
					Pillage.drawTargetsOverview();	
				});
			}, false);
		});
		$('#pillageHelperTargetsOverview .targetsOverviewTravelTimes a').click(function() {
			IkaTools.goTo('http://' + document.domain + '/index.php?view=city&id=' + this.name, this.name);
		});
		// reload all targets
		$('#PillageHelperTargetsOverviewRefresh')[0].addEventListener('click', function() {
			this.src = Pillage.icons.loading;			
			var cities = IkaTools.getCities();
			var numHideouts = 0;
			for(var i = 0; i < cities.length; i++) {
				var hideout = IkaTools.cityGetBuildingByType('safehouse', cities[i]);
				if(hideout)
					numHideouts++;
			}
			for(var i = 0; i < cities.length; i++) {
				var hideout = IkaTools.cityGetBuildingByType('safehouse', cities[i]);
				if(hideout) {
					Pillage.cityReloadSpies(cities[i], function() {
						numHideouts--;
						if(numHideouts == 0) {
							Pillage.loadData();
							Pillage.drawTargetsOverview();
						}
					});
				}
			}
		}, false);
	},
	deleteSpy:function(spyId) {
		var newSpies = {};
		for(var x in Pillage.spies)
			if(Pillage.spies[x].id != spyId)
				newSpies[x] = Pillage.spies[x];
		Pillage.spies = newSpies;
		Pillage.saveSpies();
		Pillage.drawTargetsOverview();
	},
	deleteTarget:function(targetId) {
		var newTargets = {};
		for(var x in Pillage.targets)
			if(Pillage.targets[x].id != targetId)
				newTargets[x] = Pillage.targets[x];

		var newMissions = {};
		for(var y in Pillage.missions)
			if(Pillage.missions[y].target != targetId)
				newMissions[y] = Pillage.missions[y];

		Pillage.targets = newTargets;
		Pillage.saveTargets();

		Pillage.missions = newMissions;
		Pillage.savewMissions();

		Pillage.drawTargetsOverview();
	},
	fetchPlayerScore:function(playerName, type, callback) {
		IkaTools.getRemoteDocument('http://' + document.domain + '/index.php', callback, 'POST', "view=highscore&highscoreType=" + type + "&searchUser=" + playerName);
	},
	formatDate:function(month, day, year, hour, minute) {
		var str = Pillage.config.dateFormat;
		return str.replace(/M/, month).replace(/D/, day).replace(/Y/, year).replace(/H/, hour).replace(/m/, minute);
	},
	goTo:function(url, cityId) {
		IkaTools.goTo(url, cityId);
	},
	getBoolConfig:function(key, bool) {
		bool = typeof(bool) == 'undefined' ? Pillage.config[key] : bool;
		if(bool)
			return IkaTools.getVal('config.' + key) == 'no' ? false : true;
		else 
			return IkaTools.getVal('config.' + key)  == 'yes' ? true : false;
	},
	targetGetMortarsNeeded:function(target) {
		if(Pillage.targetGetWallLevel(target) == '?')
			return '?';
		else if(target.wallLevel == 0) 
			return 0;
		else if(target.cityLevel < 5)
			return target.wallLevel < 4 ? 3 : 4;
		else if(target.cityLevel < 10)
			return target.wallLevel < 4 ? 5 : (target.wallLevel < 10 ? 10 : 12);
		else // city level 10+
			return target.wallLevel < 5 ? 7 : (target.wallLevel < 10 ? 14 : 18);
	},
	getSpiesByTargetId:function(targetId, cityId) {
		cityId = typeof(cityId) == 'undefined' ? false : cityId;
		var spies = [];
		for(var spyId in Pillage.spies) {
			if((Pillage.spies[spyId].targetId == targetId && !cityId) || (Pillage.spies[spyId].targetId == targetId && Pillage.spies[spyId].cityId == cityId))
				spies.push(Pillage.spies[spyId]);
		}
		return spies;
	},
	getSpyById:function(spyId) {
		return typeof(Pillage.spies[spyId]) == 'object' ? Pillage.spies[spyId] : false;
	},
	getTargetById:function(targetId) {
		return typeof(Pillage.targets[targetId]) == 'object' ? Pillage.targets[targetId] : false;
	},
	getTimeSinceString:function(timeStart) {
		var start = new Date(timeStart.month+' '+timeStart.day+', '+timeStart.year+' '+timeStart.hours+':'+timeStart.minutes+':'+timeStart.seconds);
		var timeEnd = Pillage.getTimeObjectFromString($('#servertime').text());
		var end = new Date(timeEnd.month+' '+timeEnd.day+', '+timeEnd.year+' '+timeEnd.hours+':'+timeEnd.minutes+':'+timeEnd.seconds);
		var diff = Math.floor((end.getTime() - start.getTime()) / 1000);
		var days = diff > 60*60*24 ? Math.floor(diff / (60*60*24)) : 0; 
		var hours = diff > 60*60 ? Math.floor((diff - days * 60 *60 * 24) / (60*60)) % 60 : 0; 
		var minutes = Math.floor((diff - days * 60 * 60 * 24 - hours * 60 * 60) / 60); 
		
		if(diff < 60) 
			return diff+'s';
		else 
			return (days > 0 ? days + 'd ' : '').toString() + (hours > 0 ? hours + 'h ' : '').toString() + (minutes > 0 ? minutes + 'm' : '').toString();		
	},
	getTimeObjectFromString:function(str) {
		return {
			day:str.match(/^0*(\d+)/)[1], 
			month:str.match(/\.0*(\d+)\./)[1],
			year:str.match(/\.(\d{4})/)[1],
			hours:str.match(/\s0*(\d+)/)[1],
			minutes:str.match(/:0*(\d+):/)[1],
			seconds:str.match(/:0*(\d+)$/)[1],
		};
	},
	hideTargetsOverview:function() {
		try { $('#pillageHelperTargetsOverview')[0].style.display = 'none'; } catch(e) {}
	},
	loadData:function() {
		Pillage.spies = (typeof(IkaTools.getVal('spies')) != 'object') ? {} : IkaTools.getVal('spies');
		Pillage.targets = (typeof(IkaTools.getVal('targets')) != 'object') ? {} : IkaTools.getVal('targets');
		Pillage.missions = (typeof(IkaTools.getVal('missions')) != 'object') ? {} : IkaTools.getVal('missions');	
	},
	missionGarrison:function(spyId, callback) {
		Pillage.tackTargetsOverview();
		var spy = Pillage.getSpyById(spyId);
		var target = Pillage.getTargetById(spy.targetId);
		var targetId = target.id;
		var cityId = spy ? spy.cityId : false;
		Pillage.lastTarget = Pillage.getTargetById(targetId);
		var spies = Pillage.getSpiesByTargetId(targetId, cityId);
		var hideout = IkaTools.cityGetBuildingByType('safehouse', IkaTools.getCityById(cityId));
		if(!hideout) 
			alert("Can't fina a hideout in " + IkaTools.getCityById(cityId).name + '!');
		else {
			Pillage.targetFetchCityInfo(target, function() {
				var url = cityId ? 'http://' + document.domain + '/index.php?view=safehouseMissions&id=' + cityId + '&position=' + hideout.position + '&spy=' + spy.id : false;
				IkaTools.getRemoteDocument(url, function(doc) {
					var risk = $('#missionlist li.garrison .missionRisk', doc).text().match(/\d+%/)[0];
					var cost = $('#missionlist li.garrison .missionCosts .gold', doc).text();
					var c = confirm('This garrison mission will cost ' + cost + ' gold and has a ' + risk + ' risk of failure.');
					if(c) {
						var url = 'http://' + document.domain + '/' + $('#missionlist li.garrison .missionStart a', doc).attr('href');						
						IkaTools.getRemoteDocument(url, function(doc) {
							var success = $('.reportTable', doc).size() > 0;
							if(!success) {
								alert('Mission failed.');
								Pillage.deleteSpy(spy.id);
							} else {
								target.garrison = {
									html:'', 
									lastUpdated:success ? $('td', $('#mainview table.record tr', doc)[2])[1].innerHTML : false
								};
								$('td.report', doc).each(function() {
									target.garrison.html += this.innerHTML;
								});
								// generate result message
								var msg = '';
								$('.reportTable tr', doc).each(function() {
									try { 
										msg += $('td', this)[1].innerHTML.match(/\d/) ? $('td', this)[0].innerHTML + ' ' + $('td', this)[1].innerHTML + "\n" : ''; 
									} catch(e) {}
								});
								Pillage.saveTarget(target);
								alert(msg == '' ? "No troops in town" : msg);
							}
							if(typeof(callback) == 'function')
								callback(spy);
						});
					} else
						Pillage.tackTargetsOverview(false);
				});
			});
		}
	},
	missionResources:function(spyId, callback) {
		var spy = Pillage.getSpyById(spyId);
		var target = Pillage.getTargetById(spy.targetId);
		cityId = spy.cityId;
		Pillage.lastTarget = target;
		// find a spy
		var hideout = IkaTools.cityGetBuildingByType('safehouse', IkaTools.getCityById(cityId));
		if(!hideout) 
			alert('There is no hideout in ' + IkaTools.getCityById(cityId).name + '!');
		else {
			Pillage.targetFetchCityInfo(Pillage.lastTarget, function() {
				var url = cityId ? 'http://' + document.domain + '/index.php?view=safehouseMissions&id=' + cityId + '&position=' + hideout.position + '&spy=' + spy.id : false;
				IkaTools.getRemoteDocument(url, function(doc) {
					var risk = $('#missionlist li.resources .missionRisk', doc).text().match(/\d+%/)[0];
					var cost = $('#missionlist li.resources .missionCosts .gold', doc).text();
					var c = confirm('This mission will cost ' + cost + ' gold and has a ' + risk + ' risk of failure.');
					Pillage.tackTargetsOverview(false);
					if(c) {
						var url = 'http://' + document.domain + '/' + $('#missionlist li.resources .missionStart a', doc).attr('href');						
						IkaTools.getRemoteDocument(url, function(doc) {
							var target = Pillage.lastTarget;
							var success = $('#resources', doc).size() > 0;
							target.resources = {
								wood:success ? parseInt($('.count', $('#resources tr', doc)[1]).text().replace(/,|\s|\./g, '')) : 0,
								wine:success ? parseInt($('.count', $('#resources tr', doc)[2]).text().replace(/,|\s|\./g, '')) : 0,
								marble:success ? parseInt($('.count', $('#resources tr', doc)[3]).text().replace(/,|\s|\./g, '')) : 0,
								glass:success ? parseInt($('.count', $('#resources tr', doc)[4]).text().replace(/,|\s|\./g, '')) : 0,
								sulfur:success ? parseInt($('.count', $('#resources tr', doc)[5]).text().replace(/,|\s|\./g, '')) : 0,
								lastUpdated:success ? $('td', $('#mainview table.record tr', doc)[2])[1].innerHTML : false,
							}
							Pillage.saveTarget(target);
							if(!success) {
								alert('Mission failed.');
								Pillage.deleteSpy(spyId);	
							}
							if(typeof(callback) == 'function') callback(spy);
						});
					}
				});
			});
		}
	},
	missionOnline:function(spyId, callback) {
		var spy = Pillage.getSpyById(spyId);
		var target = Pillage.getTargetById(spy.targetId);
		cityId = spy.cityId;
		Pillage.lastTarget = target;
		// find a spy
		var hideout = IkaTools.cityGetBuildingByType('safehouse', IkaTools.getCityById(cityId));
		if(!hideout) 
			alert('There is no hideout in ' + IkaTools.getCityById(cityId).name + '!');
		else {
			Pillage.targetFetchCityInfo(Pillage.lastTarget, function() {
				var url = cityId ? 'http://' + document.domain + '/index.php?view=safehouseMissions&id=' + cityId + '&position=' + hideout.position + '&spy=' + spy.id : false;
				IkaTools.getRemoteDocument(url, function(doc) {
					var risk = $('#missionlist li.online .missionRisk', doc).text().match(/\d+%/)[0];
					var cost = $('#missionlist li.online .missionCosts .gold', doc).text();
					var c = confirm('This mission will cost ' + cost + ' gold and has a ' + risk + ' risk of failure.');
					Pillage.tackTargetsOverview(false);
					if(c) {
						var url = 'http://' + document.domain + '/' + $('#missionlist li.online .missionStart a', doc).attr('href');						
						IkaTools.getRemoteDocument(url, function(doc) {
							var target = Pillage.lastTarget;
							if($('div.content table.record tr', doc).size() == 6) {
								alert($('div.content table.record tr td.report', doc).eq(0).text());
							} else {
								alert('Mission failed.');
								Pillage.deleteSpy(spyId);	
							}
							if(typeof(callback) == 'function') callback(spy);
						});
					}
				});
			});
		}
	},
	missionWithdraw:function(spyId, callback) {
		var spy = Pillage.getSpyById(spyId);
		var hideout = spy ? IkaTools.cityGetBuildingByType('safehouse', IkaTools.getCityById(spy.cityId)) : false;
		if(hideout) {
			var url = 'http://' + document.domain + '/index.php?view=safehouseMissions&id=' + spy.cityId + '&position=' + hideout.position + '&spy=' + spy.id;
			IkaTools.getRemoteDocument(url, function(root) {
				var url = $('ul#missionlist li.retreat a', root).attr('href').toString();
				IkaTools.getRemoteDocument('http://' + document.domain + '/' + url, function(root) {
					Pillage.deleteSpy(spyId);
					if(typeof(callback) == 'function') callback();
				});
			});
		}
	},
	safehouseDrawTargetResources:function(target) {
		var html = IkaTools.getText('pillageHelper', 'Resources', "Resources")+': ';
		var totalAvailable = Pillage.targetGetResourceAvailableTotal(target);
		if(Pillage.targetGetResourcesLastUpdatedString(target) != '?') {
			if(totalAvailable > 0) {
				html += ' <ul class="resources" style="margin:0; display:inline; margin-'+IkaRTL.txtLeft+':10px;">';
				for(var i = 0; i < Pillage.resourceTypes.length; i++) {
					var type = Pillage.resourceTypes[i];
					var available = Pillage.targetGetResourceAvailable(target, type);
					if(available > 0)
						html += ' <li class="' + type + '" style="display:inline; padding-'+IkaRTL.txtLeft+':33px; margin-'+IkaRTL.txtRight+':10px; font-weight:normal;">' + IkaTools.addCommas(available) + '</li>';
				}
				var shipsNeeded = Math.ceil(totalAvailable / 500);
				html += '</ul> <img src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif" style="height:24px; vertical-align:middle"/> ' + shipsNeeded;
			} else
				html += ' '+IkaTools.getText('pillageHelper', 'none', "none")+' ';
				var time = Pillage.targetGetResourcesLastUpdatedString(target);
			html += '      (' + (time.match(/-/) ? '0s' : time) +' '+IkaTools.getText('pillageHelper', 'lastReport', "since last report")+') </div>';
		}
		try { $('#PillageHelperTargetResources_' + target.id)[0].innerHTML = html; } catch(e) { return html; }
	},
	saveMissions:function() {
		IkaTools.setVal('missions', Pillage.missions);
	},
	saveSpies:function() {
		IkaTools.setVal('spies', Pillage.spies);
	},
	saveTargets:function() {
		IkaTools.setVal('targets', Pillage.targets);
	},
	saveTarget:function(target) {
		Pillage.targets[target.id] = target;
		Pillage.saveTargets();
	},
	showTargetsOverview:function() {
		if($('#pillageHelperTargetsOverview').size() == 0)
			Pillage.drawTargetsOverview();
		$('#pillageHelperTargetsOverview')[0].style.display = 'block';
	},
	tackTargetsOverview:function(tack) {
		if(typeof(tack) == 'undefined' || tack)
			try { $('#advisors li#advResearch')[0].removeEventListener('mouseout', Pillage.hideTargetsOverview, false); } catch(e) {}
		else
			try { $('#advisors li#advResearch')[0].addEventListener('mouseout', Pillage.hideTargetsOverview, false); } catch(e) {}
	},
	targetGetAllianceName:function(target) {
		return typeof(target.allianceName) == 'undefined' ? false : target.allianceName;
	},
	targetIsInactive:function(target) {
		return (typeof(target.inactive) == 'undefined' || !target.inactive) ? false : true;
	},
	targetGetCityLevel:function(target) {
		return (typeof(target.cityLevel) != 'undefined' && target.cityLevel.toString().match(/^\d+$/)) ? parseInt(target.cityLevel) : '?';
	},
	targetGetIslandId:function(target) {
		return (typeof(target.islandId) != 'undefined' && target.islandId.toString().match(/^\d+$/)) ? target.islandId : false;
	},
	targetGetPlayerName:function(target) {
		return trim(typeof(target.playerName) == 'undefined' ? false : target.playerName);
	},
	targetGetPortLevel:function(target) {
		return (typeof(target.portLevel) != 'undefined' && target.portLevel.toString().match(/^\d+$/)) ? parseInt(target.portLevel) : '?';
	},
	targetGetResourcesLastUpdatedString:function(target) {
		if(typeof(target.resources) != 'undefined' && typeof(target.resources.lastUpdated) != 'undefined') {
			try {
				var updated = Pillage.getTimeObjectFromString(target.resources.lastUpdated);

				var month = target.resources.lastUpdated.match(/\.(\d+)\./)[1];
				var day = target.resources.lastUpdated.match(/^\s*(\d+)\./)[1];
				var year = target.resources.lastUpdated.match(/\d\d\d\d/)[0];
				var hour = target.resources.lastUpdated.match(/[^:](\d+):/)[1];
				var minute = target.resources.lastUpdated.match(/:(\d+):/)[1];

				var now = Pillage.getTimeObjectFromString($('#servertime').text());

				var str = Pillage.getTimeSinceString(updated, now);
				return str.match(/^-/) ? '0s' : str;


			} catch(e) { return '?'; }
		} else
			return '?';
	},
	targetGetGarrisonLastUpdatedString:function(target) {
		if(typeof(target.garrison) != 'undefined' && typeof(target.garrison.lastUpdated) != 'undefined') {
			try {
				var updated = Pillage.getTimeObjectFromString(target.garrison.lastUpdated);
				var now = Pillage.getTimeObjectFromString($('#servertime').text());
				return Pillage.getTimeSinceString(updated, now);
			} catch(e) { return '?'; }
		} else
			return '?';
	},
	targetGetRerource:function(target, type) {
		return (typeof(target.resources) == 'undefined'	|| typeof(target.resources[type]) == 'undefined') ? 0 : target.resources[type];
	},
	targetGetResourceAvailable:function(target, type) {
		var onHand = Pillage.targetGetRerource(target, type);
		if(typeof(target.warehouses) == 'undefined')
			return onHand;
		var numProtected = 0;
		for(var i = 0; i < target.warehouses.length; i++) 
			numProtected += (target.warehouses[i] * (Pillage.targetIsInactive(target) ? 80 : 480) + 100);
		return onHand - numProtected > 0 ? onHand - numProtected : 0;
	},
	targetGetResourceAvailableTotal:function(target) {
		var available = 0;
		for(var i = 0; i < Pillage.resourceTypes.length; i++)
			available += Pillage.targetGetResourceAvailable(target, Pillage.resourceTypes[i]);
		return available;
	},
	targetGetShipsNeeded:function(target) {
		var totalAvailable = Pillage.targetGetResourceAvailableTotal(target);
		return shipsNeeded = Math.ceil(totalAvailable / 500);
	},
	targetGetWallLevel:function(target) {
		return (typeof(target.wallLevel) != 'undefined' && target.wallLevel.toString().match(/^\d+$/)) ? parseInt(target.wallLevel) : '?';
	},
	targetGetSpies:function(target) {
		var spies = [];
		for(var x in Pillage.spies)
		{
			if(Pillage.spies[x].targetId == target.id)
				spies.push(Pillage.spies[x]);
		}
		return spies;
	},
	targetGetTradegoodType:function(target) {
		return typeof(target.tradegood) == 'undefined' ? false : target.tradegood;
	},
	targetFetchCityInfo:function(target, callback) {
		IkaTools.getRemoteDocument('http://' + document.domain +'/index.php?view=city&id=' + target.id, function(doc) {
			Pillage.targetProcessCityInfo(target, doc);
			// get military score
			var now = new Date();
		  if ((typeof(target.militaryScoreTime) == 'undefined') || (now - new Date(target.militaryScoreTime) > 10800000))
			{
  			target.militaryScore = undefined;
  			var playerName = Pillage.targetGetPlayerName(target);
  			if(militaryScoreTime)
  			IkaTools.getScoreForPlayer('military', playerName.replace(/&nbsp;/g, ' '), function(score) {
  				// assign military score to other targets owned by player
  				var targets = Pillage.targets;
  				for(var x in targets) {
  					if (Pillage.targetGetPlayerName(targets[x]) == playerName) {
  						targets[x].militaryScoreTime = new Date();
  						targets[x].militaryScore = score.points;
  					}
  				}
  				Pillage.saveTargets();	
  				if (Pillage.targetGetTradegoodType(target)) 
  					callback(target);
  				else {
  					IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=island&id=' + Pillage.targetGetIslandId(target), function(root){
  						var tradegood = $('#islandfeatures #tradegood', root).attr('class').match(/^[^\s]+/)[0];
  						target.tradegood = tradegood;
  						Pillage.saveTarget(target);
  						callback(target);
  					});
  				}
  			}); 
  		}
		});
	},
	targetIsOccupied:function(target) {
		return typeof(target.occupied) == 'undefined' ? false : target.occupied;
	},
	targetProcessCityInfo:function(target, doc) {
		doc = typeof(doc) == 'undefined' ? document : doc;
		target.warehouses = [];
		$('#mainview #locations li', doc).each(function(i) {
			if(this.className.match(/warehouse/))
				target.warehouses.push(parseInt($('a', this).attr('title').match(/\d+$/)[0]));
		});
		try { target.wallLevel = $('#position14 a', doc)[0].title.match(/\d+$/)[0]; } catch(e) { target.wallLevel = 0 }
		target.cityLevel = $('#position0 a', doc)[0].title.match(/\d+$/)[0];
		try { target.portLevel = $('#locations li.port a', doc)[0].title.match(/\d+$/)[0]; } catch(e) { target.portLevel = 0 }
		target.occupied = $('.occupation_warning', doc).size() > 0;
		target.islandId = $('#breadcrumbs a.island', doc).attr('href').match(/id=(\d+)/)[1];

		try { target.playerName = $('#information li.owner', doc)[0].innerHTML.replace(/<.+>/, ''); } catch(e) {}
		try { target.allianceName = $('#information li.ally', doc)[0].innerHTML.replace(/<.+>/, '').trim(); } catch(e) {}
		Pillage.saveTarget(target);
	},
	views:{
		city:function() {
			try { var cityId = document.location.toString().match(/id=(\d+)/)[1]; } catch(e) { var cityId = false; }
			if(cityId) {
				var target = Pillage.getTargetById(cityId);
				if(target)
					Pillage.targetProcessCityInfo(target);
			}
		}, 
		island:function() {
			
		},
		militaryAdvisorReportView:function() {
			if($('#troopsReport .contentBox01h .link a.button').size() == 0) {
				var btn = document.createElement('p');
				btn.setAttribute('style', 'text-align:center; margin:1em 0;');
				btn.innerHTML = '<a href="http://' + document.domain + '/index.php?view=militaryAdvisorDetailedReportView&combatRound=1&detailedCombatId=' + document.location.toString().match(/combatId=(\d+)/)[1] + '" class="button">Detailed Combat Report</a>';
				$('#troopsReport .contentBox01h .content').append(btn);
			}
		},
		plunder:function() {
			var target = Pillage.getTargetById($('input[name*="destinationCityId"]').attr('value'));
			try { unsafeWindow.sliders['slider_305'].setActualValue(Pillage.targetGetMortarsNeeded(target)); } catch(e) {}
		},
		safehouse:function() {
  		var isReports = document.location.toString().match(/tab=reports/);
  		if (!isReports)
  		{
  		  try
  		  {
  		    isReports = $('#mainview .yui-nav .selected a').attr('href').toString().match(/tab=reports/);
  		  }
  		  catch (e)
  		  {
  		  }
  		}
			if (!isReports) {
				// clear spies from this city
				var cityId = ExMachina.currentCityId;
				var newSpies = {};
				for(var spyId in Pillage.spies) 
				{
					if(Pillage.spies[spyId].cityId != cityId)
						newSpies[spyId] = Pillage.spies[spyId];
				}
				Pillage.spies = newSpies;
				Pillage.saveSpies();			
/*				
				GM_addStyle('.pillageHelperAttackButton { height:25px; margin:0; margin-left:2px; vertical-align:middle; top:-1px; position:relative; }\
							div.spyinfo div.missionAbort, div.spyinfo div.missionButton, div.spyinfo li.city + li.status { display:none; }\
							div.spyinfo li.city + li.status + li.status { display:block; }\
							.pillageGarrisonMission { position:relative; text-align:left; }\
							.pillageGarrisonReport { display:none; position:absolute; top:24px; left:-4px; z-index:10000; background:#F6EBBD; padding:1em; border:1px solid #666; }\
							.pillageGarrisonReport .reportTable tr:first-child { display:none; }\
							.pillageGarrisonMission:hover .pillageGarrisonReport { display:block; }\
							.pillageGarrisonReport:hover { display:none !important; }');
*/
				$('#mainview div.spyinfo').each(function(i) 
				{
					 // re-display status 
					if($('div.time', this).size() > 0) {
						$('.status', this).attr('style', 'display:block;');
					}
					try { var targetId = this.innerHTML.match(/view=city&amp;id=(\d+)/)[1]; } catch(e) { var targetId = false; }
					if(targetId) 
					{
						// reload spy data
//						var spyId = $('.missionButton', this).html().match(/spy=(\d+)/)[1];
						var spyId = targetId +'_'+cityId;
						var spy = Pillage.getSpyById(spyId);
						spy = spy ? spy : {id:spyId};
						spy.targetId = targetId;
						spy.cityId = cityId;
  					try { spy.count = Number(trim($('li', this)[1].innerHTML).split(' ')[0]); } catch(e) { spy.count = 1; }
						Pillage.spies[spyId] = spy;

						// reload target data
						var target = Pillage.getTargetById(targetId);
						target = target ? target : {id:targetId};
						var tmp = $('li.city a', this).html();
						target.cityName = tmp.match(/^[^\(]+/)[0];
						target.islandX = tmp.match(/\((\d+),\d+\)/)[1];
						target.islandY = tmp.match(/\(\d+,(\d+)\)/)[1];
						Pillage.targets[targetId] = target;
						var playerName = Pillage.targetGetPlayerName(target);
						if(playerName) {
							var nameLink = $('.city a', this)[0];
							nameLink.innerHTML += " - " + playerName;	
						}
						var allianceName = Pillage.targetGetAllianceName(target);
						if(allianceName) {
							var nameLink = $('.city a', this)[0];
							nameLink.innerHTML += " [" + allianceName + "]";	
						}
						if(Pillage.targetIsInactive(target)) {
							var nameLink = $('.city a', this)[0];
							nameLink.style.color = "#666";
							nameLink.title += " - Inactive";
							nameLink.innerHTML += " (i)";
						}
						$('.city', this)[0].innerHTML += '   <a href="http://' + document.domain + '/index.php?view=island&cityId=' + target.id + '" title="View city on island"><img src="http://' + document.domain + '/skin/layout/icon-island.png" style="vertical-align:middle;"/></a>';
						var div = document.createElement('div');
						div.id = "pillageHelperTools" + targetId;
						div.setAttribute('style', 'margin-top:1.5em; margin-'+IkaRTL.txtLeft+':1em;');
/*
						var html = '<p align="right">\
								<a title="Mission List" href="' + $('.missionButton a', this).attr('href') + '"><img src="http://' + document.domain + '/skin/layout/icon-mission.png" class="pillageHelperAttackButton"/></a>\
								<a href="javascript:void(0)" id="pillageHelperMissionResources' + spyId + '" class="button" title="Inspect Resources" style="padding-left:2px; padding-right:2px;">\
									<img src="http://' + document.domain + '/skin/img/city/building_warehouse.png" style="height:21px; vertical-align:middle"/></a>\
								<a href="javascript:void(0)" id="pillageHelperMissionGarrison' + spyId + '" class="button pillageGarrisonMission" style="padding-left:6px; padding-right:6px;">\
									<img src="http://' + document.domain + '/skin/img/city/building_barracks.png" style="height:17px; position:relative; top:-1px; vertical-align:middle;"/>';
									
						if(typeof(target.garrison) != 'undefined') {
							html += '<div class="pillageGarrisonReport">' + Pillage.targetGetGarrisonLastUpdatedString(target) + ' ago:<br/><br/>' +
										target.garrison.html + 
									'</div>';	
						}
						html += '</a>\
								<a title="Pillage" href="http://' + document.domain + '/index.php?view=plunder&destinationCityId=' + target.id + '"><img src="http://' + document.domain + '/skin/actions/plunder.png" class="pillageHelperAttackButton"/></a>\
								<a title="Blockade" href="http://' + document.domain + '/index.php?view=blockade&destinationCityId=' + target.id + '"><img src="http://' + document.domain + '/skin/actions/blockade.png" class="pillageHelperAttackButton"/></a>\
								<a title="Withdraw" id="PillageHelperWithdraw_' + spy.id + '" href="javascript:void(0)"><img src="http://' + document.domain + '/skin/layout/icon-missionAbort.png" class="pillageHelperAttackButton"/></a>\
							</p><p style="margin-top:-2em;">\
								<img src="http://' + document.domain + '/skin/img/city/building_townhall.png" style="height:25px; margin-left:-20px; vertical-align:middle"/> ' + Pillage.targetGetCityLevel(target) + '\
								<img src="http://' + document.domain + '/skin/layout/stadtmauer_icon.png" style="height:25px; vertical-align:middle"/> ' + Pillage.targetGetWallLevel(target) + '\
								<span title="Mortars needed"><img src="http://' + document.domain + '/skin/characters/military/120x100/mortar_r_120x100.png" style="height:25px; margin-left:10px; vertical-align:middle"/> ' + Pillage.targetGetMortarsNeeded(target) + '</span>\
								<img src="http://' + document.domain + '/skin/img/city/building_port.png" style="height:25px; margin-left:10px; vertical-align:middle"/> ' + Pillage.targetGetPortLevel(target) + '\
								';
*/								
						var html = '<p align="'+IkaRTL.txtRight+'">\
								<a title="'+IkaTools.getText('pillageHelper', 'Pillage', "Pillage")+'" href="http://' + document.domain + '/index.php?view=plunder&destinationCityId=' + target.id + '"><img src="http://' + document.domain + '/skin/actions/plunder.png" class="pillageHelperAttackButton"/></a>\
								<a title="'+IkaTools.getText('pillageHelper', 'Blockade', "Blockade")+'" href="http://' + document.domain + '/index.php?view=blockade&destinationCityId=' + target.id + '"><img src="http://' + document.domain + '/skin/actions/blockade.png" class="pillageHelperAttackButton"/></a>\
							</p><p style="margin-top:-2em;">\
								<img src="http://' + document.domain + '/skin/img/city/building_townhall.png" style="height:25px; margin-'+IkaRTL.txtLeft+':-20px; vertical-align:middle"/> ' + Pillage.targetGetCityLevel(target) + '\
								<img src="http://' + document.domain + '/skin/layout/stadtmauer_icon.png" style="height:25px; vertical-align:middle"/> ' + Pillage.targetGetWallLevel(target) + '\
								<span title="'+IkaTools.getText('pillageHelper', 'Mortars', "Mortars needed")+'"><img src="http://' + document.domain + '/skin/characters/military/120x100/mortar_r_120x100.png" style="height:25px; margin-'+IkaRTL.txtLeft+':10px; vertical-align:middle"/> ' + Pillage.targetGetMortarsNeeded(target) + '</span>\
								<img src="http://' + document.domain + '/skin/img/city/building_port.png" style="height:25px; margin-'+IkaRTL.txtLeft+':10px; vertical-align:middle"/> ' + Pillage.targetGetPortLevel(target) + '\
								';
						if(Pillage.targetIsOccupied(target)) {
							html += '<img src="http://' + document.domain + '/skin/img/island/besatzung_rot_cursor.png" style="margin-'+IkaRTL.txtLeft+':10px; height:30px; vertical-align:middle" title="'+IkaTools.getText('pillageHelper', 'TargetOccupied', "The target city is under military occupation")+'"/> '
						}
						html += '</p>';
						var totalAvailable = Pillage.targetGetResourceAvailableTotal(target);
						if(Pillage.targetGetResourcesLastUpdatedString(target) != '?') {
							html += '<div style="margin-bottom:1em; margin-top:5px;" id="PillageHelperTargetResources_' + target.id + '">';
							html += Pillage.safehouseDrawTargetResources(target);
							html += '</div>';
						}
						div.innerHTML = html;
						$(this).append(div);
						// inspect resources
/*
						$('#pillageHelperMissionResources' + spyId)[0].addEventListener('click', function() { 
							Pillage.missionResources(spy.id, function(spy) {
								var target = Pillage.getTargetById(spy.targetId);
								Pillage.safehouseDrawTargetResources(target);
							}); 
						}, false);
						$('#pillageHelperMissionGarrison' + spyId)[0].addEventListener('click', function() { 
							Pillage.missionGarrison(spyId, function(spy) {
								var target = Pillage.getTargetById(spy.targetId);
								$('#pillageHelperMissionGarrison' + spy.id +' div')[0].innerHTML = target.garrison.html;
							}); 
						}, false);
						$('#PillageHelperWithdraw_' + spy.id)[0].addEventListener('click', function() {
							var hideout = IkaTools.cityGetBuildingByType('safehouse', IkaTools.getCityById(spy.cityId));
							var url = 'http://' + document.domain + '/index.php?view=safehouseMissions&id=' + spy.cityId + '&position=' + hideout.position + '&spy=' + spy.id;
							IkaTools.getRemoteDocument(url, function(root) {
								document.location = $('ul#missionlist li.retreat a', root).attr('href');
							});
						}, false);
*/
					}
				});
				Pillage.saveSpies();
				Pillage.saveTargets();	
			} 
		  else
		  {
		    //Parse reports
		    var table = $('#espionageReports');
		    var reports = $('tr:has(td.money)', table).has('.resultImage img[src*="skin/buttons/yes.gif"]');
		    var rBody;
		    var island;
		    var cityName;
		    var playerName;
		    var targets;
		    var target;
		    var reportId;
		    var report;
		    var btn;
		    var rtype;
		    var ftItem;
		    var combo, option;
		    
		    reports.each(function(i)
		    {
 		      try
 		      {
   		      reportId = reports[i].id.match(/\d+/);
   		      
   		      if (!Pillage.missions[reportId])
   		      {
     		      targets = [];
     		      targetIsland = $('.targetIsland', reports[i])[0].innerHTML.match(/\d+/g);
     		      cityName = $('.targetCity', reports[i])[0].innerHTML.match(/^[^\(]+/)[0].replace(/&nbsp;/g,' ').trim();
     		      playerName = $('.targetOwner', reports[i])[0].innerHTML.match(/^[^\(]+/)[0].replace(/&nbsp;/g,' ').trim();
     		      
     		      for (var targetID in Pillage.targets)
     		      {
     		        target = Pillage.targets[targetID];
     		        if ((target.islandX == targetIsland[0]) && (target.islandY == targetIsland[1]))
     		        {
         		      if ((cityName == target.cityName.replace(/&nbsp;/g,' ').trim()) && (playerName == target.playerName.replace(/&nbsp;/g,' ').trim()))
         		      {
         		        targets.unshift(target);
         		      }
         		      else
         		      {
         		        targets.push(target);
         		      }
     		        }
     		      }
     		      
     		      if (targets.length > 0)
     		      {     		      
        		    rBody = $('.report table.reportTable', $(reports[i]).next());
      		      rtype = rBody[0].id;
      		      switch (rtype)
      		      {
      		        case 'resources':
      		        {
      		          if (targets.length > 0)
      		          {
        		          ftItem = $('.reportDetailFooter:eq(1)', $(reports[i]).next());
        		          btn = document.createElement('a');
        		          btn.innerHTML = IkaTools.getText('pillageHelper', 'UpdateData', "Update Data In");
        		          btn.title = IkaTools.getText('pillageHelper', 'UpdateDataTxt', "Updates the selected city spy info with this report");
        		          btn.className = 'button';
        		          btn.href = 'javascript:void(0);';
        		          btn.reportId = reportId;
        		          $(btn).click(function()
        		          {
        		            var reportId = this.reportId;
        		            var combo = $('#'+'pillageHelperRPT_'+reportId);
        		            var resources = $('#tbl_mail'+reportId+' .report table.reportTable td.count');
        		            var target = Pillage.targets[combo[0].value];
          							target.resources = {
          								wood:parseInt($(resources[0]).text().replace(/,|\s|\./g, '')),
          								wine:parseInt($(resources[1]).text().replace(/,|\s|\./g, '')),
          								marble:parseInt($(resources[2]).text().replace(/,|\s|\./g, '')),
          								glass:parseInt($(resources[3]).text().replace(/,|\s|\./g, '')),
          								sulfur:parseInt($(resources[4]).text().replace(/,|\s|\./g, '')),
          								lastUpdated: $('#message'+reportId+' td.date')[0].innerHTML.trim()
          							};
          							Pillage.saveTarget(target);
          							var report = {id: reportId, target: target.id};
          							Pillage.missions[reportId] = report;
          							Pillage.saveMissions(target);
          							$(this).remove();
          							combo.remove();
        		          });
        		          ftItem[0].appendChild(btn);
        		          combo = document.createElement('select');
        		          combo.id = 'pillageHelperRPT_'+reportId;
        		          for (var i = 0; i < targets.length; i++)
        		          {
        		            option = document.createElement('option');
        		            option.innerHTML = targets[i].cityName + ' ['+targets[i].islandX+':'+targets[i].islandY+']';
        		            option.value = targets[i].id;
        		            option.selected = (i == 0);
        		            combo.appendChild(option);
        		          }
        		          ftItem[0].appendChild(combo);          		          
        		        }
      		        }
      		      }
        		  }
      		  }
  		    }
  		    catch(e)
  		    {
  		    }
		    });
		    
		    reports = $('tr:has(td.garrison)', table).has('.resultImage img[src*="skin/buttons/yes.gif"]');
		    reports.each(function(i)
		    {
 		      try
 		      {
   		      reportId = reports[i].id.match(/\d+/);
   		      
   		      if (!Pillage.missions[reportId])
   		      {
     		      targets = [];
     		      targetIsland = $('.targetIsland', reports[i])[0].innerHTML.match(/\d+/g);
     		      cityName = $('.targetCity', reports[i])[0].innerHTML.match(/^[^\(]+/)[0].replace(/&nbsp;/g,' ').trim();
     		      playerName = $('.targetOwner', reports[i])[0].innerHTML.match(/^[^\(]+/)[0].replace(/&nbsp;/g,' ').trim();
     		      
     		      for (var targetID in Pillage.targets)
     		      {
     		        target = Pillage.targets[targetID];
     		        if ((target.islandX == targetIsland[0]) && (target.islandY == targetIsland[1]))
     		        {
         		      if ((cityName == target.cityName.replace(/&nbsp;/g,' ').trim()) && (playerName == target.playerName.replace(/&nbsp;/g,' ').trim()))
         		      {
         		        targets.unshift(target);
         		      }
         		      else
         		      {
         		        targets.push(target);
         		      }
     		        }
     		      }
     		      
     		      if (targets.length > 0)
     		      {     		      
  		          ftItem = $('.reportDetailFooter:eq(1)', $(reports[i]).next());
  		          btn = document.createElement('a');
  		          btn.innerHTML = IkaTools.getText('pillageHelper', 'UpdateData', "Update Data In");
  		          btn.title = IkaTools.getText('pillageHelper', 'UpdateDataTxt', "Updates the selected city spy info with this report");
  		          btn.className = 'button';
  		          btn.href = 'javascript:void(0);';
  		          btn.reportId = reportId;
  		          $(btn).click(function()
  		          {
  		            var reportId = this.reportId;
  		            var combo = $('#'+'pillageHelperRPT_'+reportId);
  		            var target = Pillage.targets[combo[0].value];
        		      var garrison = $('#tbl_mail'+reportId+' td.report');

                  target.garrison = {
  									html:'', 
     								lastUpdated: $('#message'+reportId+' td.date')[0].innerHTML.trim()
  								};
  								garrison.each(function() {
  									target.garrison.html += this.innerHTML;
  								});    							

    							Pillage.saveTarget(target);
    							var report = {id: reportId, target: target.id};
    							
            			Pillage.missions[reportId] = report;
            			Pillage.saveMissions(target);
    							$(this).remove();
    							combo.remove();
  		          });
  		          ftItem[0].appendChild(btn);
  		          combo = document.createElement('select');
  		          combo.id = 'pillageHelperRPT_'+reportId;
  		          for (var i = 0; i < targets.length; i++)
  		          {
  		            option = document.createElement('option');
  		            option.innerHTML = targets[i].cityName + ' ['+targets[i].islandX+':'+targets[i].islandY+']';
  		            option.value = targets[i].id;
  		            option.selected = (i == 0);
  		            combo.appendChild(option);
  		          }
  		          ftItem[0].appendChild(combo);          		          
  		        }
      		  }
  		    }
  		    catch(e)
  		    {
  		    }
		    });
		    
		  }
		},
		safehouseMissions:function() {
			if(!Config.get('showMissionGold')) GM_addStyle('#safehouseMissions #mainview ul#missionlist li.gold { display:none; }');
			if(!Config.get('showMissionResearch')) GM_addStyle('#safehouseMissions #mainview ul#missionlist li.research { display:none; }');
		},
	},
	icons:{
		magnifier:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH5SURBVDjLpZK/a5NhEMe/748kRqypmqQQgz/oUPUPECpCoEVwyNStIA6COFR33boIjg6mg4uL0k0EO1RFISKImkHQxlbQRAsx0dgKJm/e53nunnOwViR5leJnuZs+973jHBHB/+D/ah7X2LXWloilyMw5YgtD3CDiBWN4Zno8bQcJHBFBucauZfsolZDCru0OfFcAAUISrLZDfPzSKxuiibOT+T6JCwDMtrQzYQvZHQ5Cw2h3GK0OI9AWBzJJZFOxgtJUGpTABQAiLu5OOviuGIEWkBUwC7pasNZj7N2ThNJUjBQY4pznAoEWsBWwxU+JFXSVRTzmQWvKRR5RG4KVGMgKrAVYflexAAugDCEygdbUCI2F7zobk7FZY76DIDQgrT9HCwwt1FsBhhIu4p4D3kiS8B0MJz28ftfGSPfl8MPLxbGBAqVpptbslJc+fEPMA7JDPrIpH3FX8LzaROdrE5O51jalgid3Lh4b6/sDALh6971riErGcFET58gwDPGndG9JT6ReHcwfPorGygu8rdxvGxMeP3XtzcofgigWZ0/EtQ7n0/sOTe0/Mo7V5WeoVu61z1yvZzZX+BsnZx9opYLpevXp7eXKIrL5UWit0n0r/Isb50bjRGreiyWmgs76lfM31y5tSQAAc6czHjONXLi13thygih+AEq4N6GqMsuhAAAAAElFTkSuQmCC',
		spy:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAABCFBMVEX///9ycnJmZmZQUlRKSkoqO1AzMzNLV2BAQEBbW1s7PkBmZmZQUlRAQEA6OjpQUlRKSkpmZmZbW1tQUlRCUFz/iBNbW1s1Oj1KSko8PT46OjpcRTdbW1tQVFk8PT5bW1txV0ZQUlRKSko8PT46Ojr/0F3/xlv/v0//vkv6tE3iq1PoqEv/oivJoWf/liG2mFG5jk6ph3DleyaAiJCFhYWOgnt+goacfE/Fby2dd0XIbCKTeE14eHhzeX5ycnKAbk1zamNpaWmMYz9haW9mZmZjZmprYVVYYWlbW1tMXnRLV2BQVFlKSkpFS1FER0hMQDlAQEA+QUc8PT46OjoqO1AxNTszMzMaK0ckQyxyAAAAWHRSTlMAERERERERMzNEZnd3d3eIiJmZmZmqqqq7u7vM3d3d7u7u7u7u////////////////////////////////////////////////////////////////////WlH2oAAAAAlwSFlzAAAK8AAACvABQqw0mAAAACp0RVh0Q3JlYXRpb24gVGltZQBEaSA5IE1yeiAyMDA0IDIzOjM1OjAzICswMTAw5cKdqgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAACeSURBVBiVY2DACrhlPBSF2RB8QTsXDx8/ATif0dHFw9s30I8XJsDk4uphbmAZqgw3wdFNU0tN118cJiDk7OQZbh8iDTeDWcRI21pVXxRhC7uDnoa6jgIrXIDf2dTCytCLC8bn9DAzM3a39QvggAqIuZiZ2Jh4+wRLQgXkPexs7Ey8/cJUoAKyPh4uHiY+QXABFh4JJT8lOSk+JO8hAADVTReg4JziyQAAAABJRU5ErkJggg%3D%3D',
		spy2:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAB3RJTUUH2AQPDg46zUtbQgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAALGSURBVHjabVJbSJNhGH7+g9uc2zxsOreZS8ScEKmkICoUFkFBEkRE3WX3XXahXmoQBkXQdUU3YpdFhWBJetFNuc2keWg6dSd33v79O/7f32ewaHMvvHwv3/e8D+/7fA+Diujvu9Sgb1XO1arUNxKpVH0sGtn0Hh7MRUPBBfqcrcTzlRdFJvli35O7G43EcKbHBpkwZ4WU+Jpl1RlCxLeVeKZUjAxfa1JoJH0yIW5O3J9gCJFhdziwsryMbZcLRkurRAjZqTc0jG8717dKfWypELLhdzlR2uro7GTETBb+QADew0PkcznUN+phsli53v7z3RFvaKHqChkx1X7z9h149vbA8zxEMY0ahQIW62l0dCmh0dRh3f4D0UiY+Z+AKxV6g6ndaV8bSgtJBIIBqNRaMKSII78XYf8uXL9cUsB7sARIDyjcX6kFpqanW47P+cfjsvDzqZzbeSnH7XPyk4dX5Pln92RLq3kVVeKfBrMzM0ccpzGFRA7pZByhwB7iYT9ujVnx6oMbzW3WeDWCsm80mYzLju0CRmzbqNNqMfvGi0ReCVNHHzbdny5QSA3NQlUNdI3GcwZD/aS5s5f5+NmJ/ZgW3zaCaDaa4KTi7Wy6FSzDtsiy8gvlKJwg4Dh28eLl660bTjtiggxG1Yig3w+f1wM1FXRweBTZbGGAY0j/4ODQksfjFspWOGXt6gnQhkw2Q91HIBXzSMQj0Oqa0Dc4BIu5DTZbN5xr9qurK4vvactAGUFRKvBHwSAadI347XbB56sFkXkYze3ICGk41r4jHk8iEgqB51S6Eyvki0SZSiZGVbVqJhzyQSI1dFOZgjlkM7m/BsuIIuKxGNJpQVXIi4/KJkgnwpNU5N19SXoupASVIByAZTnIMqHTSSgWi9SdxwRRcCwpc2NlWKg9pijZV0ARoJkGozzOAlWW8Lx6S6msGyuB/wDcr0r2Xd/+igAAAABJRU5ErkJggg%3D%3D',
		trash:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD9SURBVBgZBcFLLkNRAADQc1/fU6qkhFRMMNIQn8TUQCJWYBE2YBkWYQWMJIZmNuAXCSoGFUGIInJf33VOSAAAAIAcgLOFt3079flaEdTS50M6nT7YeggJwPFle6nhAoVhc370rnaXcwBSp62GTdxoGdPrkAPQD5OSbRFr6oLvjByA53CqY9YUvjy68YQcgELTuTd/khENbQk5ANGqFUSFnq6WW2QA5Op4VuhreJVEZACUAKiJkogMgIEKANFARAZAKQKolColMgA+f7vVkBkRSeYjvf6QAfB1cnnXNWTUhHHrXuLoESEBYO/aYjNUSqX3snk/2DjshwQAAAD4B9GUWR0G4scKAAAAAElFTkSuQmCC',
		refreshSmall:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGMSURBVDjLY/j//z8DJZiggtx9Sasyd8Yxk21Axo7YSymbow4QZUDJ8QyHoiNpB/IPJP/P3pPwP3177P+mQ5X/6/aV/o9cFrATrwHFxzIcCg+nnplzacr/TbdW/19/c8X/tTeW/l91bdH/5Vfn/y/ZkvPfb7rbHZwGFBxKnTn9fN//jTdX/W8+XPU/cX34/5iVQf8rtuf/L9mc/d9nqutuvC7I2Zv4AOjf/0D//o9fG3YIJh4wy+OS9xTnQ2699kyO7VacRAUi0L/wUPea5LTGtceW9FgA+ncNyekgfJEfZ9AcTyagfw+59ztcgolbVBsdMi7V/a+Xr/lfK0v1AV4XAP27O2tl0v/UJbH/rRtM/5tVGf6PmB74v/dE0//khdH/VVMUZ+I0AOjflxnLE/5PP9v7f8rprv8TT7X/7zvZ8r/nRON/kLhKssIZxXhZB7wusGu22Bk3N+x/1Mzg//qFWv+1s9X+q6cp/1dOUjigEIeqGWcgAv17AOjfS2RnJt08DWbNTNVVVMmNhDAANau2t3wToKQAAAAASUVORK5CYII%3D',
		loading:'data:application/force-download;base64,R0lGODlhEAAQAPQAAPDWmoDJdenVl7zPiOLTlJ7LfrXOhYDJdabNgY/KecvQjdPSkIfJd8TQi4DIdZfLfK3NhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAkKAAAALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx+lwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6/3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh+QQJCgAAACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI+yioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l/Ag1AXySJgn5LcoE3QXI3IQAh+QQJCgAAACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK/e8LRIHn+i1cK0IyKdg0VAoljYIg+GgnRrwVS/8IAkICyosBIQpBAMoKy9dImxPhS+GKkFrkX+TigtLlIyKXUF+NjagNiEAIfkECQoAAAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkECQoAAAAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK+VgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAkKAAAALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq+KPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2/Q4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAkKAAAALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm+kaCxyxa+zRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh+QQJCgAAACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb+A41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh+QQJCgAAACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ/DkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA%3D%3D',
		checkmark:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+roKUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSOixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQrzSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC',
	},
	resourceTypes:['wood', 'wine', 'marble', 'glass', 'sulfur'],
}

Librarian = {
	init:function() {
		Librarian.loadResearches();
		if(typeof(Librarian.views[IkaTools.getView()]) == 'function')
			Librarian.views[IkaTools.getView()]();
	},
	research:function() {
		this.name;
		this.field;
		this.effect;
		this.isKnown;
	},
	getResearchByName:function(name) {
		for(var i = 0; i < Librarian.researches.length; i++)
			if(Librarian.researches[i].name == name)
				return Librarian.researches[i];	
		return false
	},
	saveResearch:function(research) {
		var found = false;
		for(var i = 0; i < Librarian.researches.length; i++) {
			if(Librarian.researches[i].name == research.name) {
				Librarian.researches[i] = research;	
				found = true;	
			}
		}
		if(!found) 
			Librarian.researches.push(research);
		Librarian.saveResearches();
	},
	loadResearches:function() {
		Librarian.researches = (typeof(IkaTools.getVal('researches').length) !== 'undefined' && IkaTools.getVal('researches').length > 0) ? IkaTools.getVal('researches') : new Array();
	},
	saveResearches:function() { 
		IkaTools.setVal('researches', Librarian.researches);
	},
	views:{
		researchDetail:function(root) {
			try {
				root = typeof(root) == 'undefined' ? document.body : root;
				var name = $('td', $('#mainview .contentBox01h .content table tr', root)[1]).eq(1).text();
				var research = Librarian.getResearchByName(name);
				if(!research)
					var research = new Librarian.research();					
				research.name = name;
				research.field = $('td', $('#mainview .contentBox01h .content table tr', root)[0]).eq(1).text();
				var desc = $('td', $('#mainview .contentBox01h .content table tr', root)[2]).eq(1).text();
				try { research.effect = desc.match(/:(.+?)$/)[1]; } catch(e) {
					try { research.effect = desc.match(/\.\s*([^\.]+?)$/)[1]; } catch(e) { research.effec = '?'; }
				}
				try { research.completeIn = $('td', $('#mainview .contentBox01h .content table tr', root)[3]).eq(1).text().replace(/\(.+\)/, '').replace(/h\s/, ':').replace(/m\s\d+s/, ''); } catch(e) { research.completeIn = '' }
				Librarian.saveResearch(research);
			} catch(e) { alert(e); return false; }
		},
		researchOverview:function(root) {
			root = typeof(root) == 'undefined' ? document.body : root;
			var buttonReload = document.createElement('input');
				buttonReload.className = "button";
				buttonReload.type = "button";
				buttonReload.setAttribute('style', 'position:absolute; top:30px;');
				buttonReload.value = IkaTools.getText('interface', 'ReloadResearch', "Reload all Research");
				buttonReload.title = IkaTools.getText('interface', 'ReloadResearchTime', "This may take a minute");
			$('#mainview .buildingDescription')[0].appendChild(buttonReload);
			GM_addStyle(' \
				#mainview .buildingDescription { min-height:inherit; margin-bottom:20px; }\
				#mainview .buildingDescription h1:first-child { height:40px; width:110%; margin-'+IkaRTL.txtLeft+':365px; }\
				#mainview .buildingDescription h1:first-child + p { margin-'+IkaRTL.txtLeft+':170px; margin-'+IkaRTL.txtRight+':0; }\
				#mainview .contentBox01h { position:relative !important; float:none !important; }\
				#mainview .contentBox01h hr { display:none; }\
				#mainview .contentBox01h .content ul { list-style-type:none !important; } \
				#mainview .contentBox01h .content ul li { margin-bottom:.5em; list-style-type:none !important; } \
				#mainview .contentBox01h .content ul li a:hover * { text-decoration:underline !important; } \
				#mainview .contentBox01h .content ul li.unexplored * { color:#B18F61 !important; } \
			');
/*
			var label = document.createElement('p');
			label.innerHTML = '<a href="http://userscripts.org/scripts/show/58191" style="font-weight:bold;">Library Tools v' + ScriptUpdater.scriptCurrentVersion + '</a> by <a href="http://userscripts.org/users/PhasmaExMachina">PhasmaExMachina</a> - [ <a href="javascript:void(0)" id="libraryImprovementsUpdates>check for updates</a> ]';
			label.setAttribute('style', 'text-align:right;  margin:20px; ');
			$('#mainview .contentBox01h').eq(0).after(label);
			$('#libraryImprovementsUpdates').click(function() { ScriptUpdater.forceNotice(ScriptUpdater.scriptId, ScriptUpdater.scriptCurrentVersion); });
*/
			function drawResearches() {
				$('#mainview .contentBox01h .content ul li', root).each(function() {													 
					this.style['float'] = IkaRTL.txtLeft;
					this.style.width= "100%";
					var name = $('a', this).attr('title');
					if(this.className == 'unexplored') {
						$('a', this).attr('style', 'color:#B18F62;');	
						this.style.color = '#B18F62';
					}				
					var research;
					if(research = Librarian.getResearchByName(name)) {
						var html = $('a', this).html();
						html = html.match(/<span/) ? html.match(/<span\sclass="researchLink".+?>(.+?)<\/span>/)[1] : html;
						$('a', this)[0].innerHTML = ('\
							<div style="width: 150px; float:'+IkaRTL.txtLeft+'; margin-'+IkaRTL.txtRight+':2em;">' + html + '</div>\
							<div style="width: 70px; float:'+IkaRTL.txtLeft+'; margin-'+IkaRTL.txtRight+':2em;">' + (this.className == 'explored' ? '<span style="font-size:0;"> </span>' : research.completeIn)+ '</div>\
							<div style="margin-'+IkaRTL.txtLeft+':270px; margin-'+IkaRTL.txtRight+':30px;">' + research.effect + '</div>\
						');
					}
				});
			}
			drawResearches();
			$(buttonReload).click(function() {
				this.blur();
				Librarian.numResearches = $('#mainview .contentBox01h .content ul li', root).size();
				Librarian.numResearchesLoaded = 0;
				$('#IkaLibrianProgress')[0].style.display = "block";
				$('#mainview .contentBox01h .content ul li', root).each(function(i) {
					IkaTools.getRemoteDocument($('a', this)[0].href, function(doc) {
						var progress = $('#IkaLibrianProgress')[0];
						Librarian.numResearchesLoaded++;
						if(doc) {	
							progress.style.width = Math.floor((Librarian.numResearchesLoaded / Librarian.numResearches) * 150) + 'px';
							Librarian.views.researchDetail(doc);
						}
						if(Librarian.numResearchesLoaded == Librarian.numResearches) {
							$('#IkaLibrianProgress')[0].style.display = "none";								
							document.location = document.location;
						}
					});
				});
			});
			var reloadProgress = document.createElement('div');
				reloadProgress.setAttribute('style', 'position:absolute; top:70px; width:0; background-color:#7E4A21; height:4px; display:none;');
				reloadProgress.innerHTML = " ";
				reloadProgress.id = "IkaLibrianProgress";
			$('#mainview .buildingDescription')[0].appendChild(reloadProgress);
			
		}
	},
	
}

SplitPersonalities = {
	init:function() {
		SplitPersonalities.military();
		SplitPersonalities.research();
		SplitPersonalities.diplomat();
		
	},
	splitAdviser:function(id, leftTitle, rightTitle) {
		var original = document.getElementById(id).getElementsByTagName('a')[0];
		var copy = original.cloneNode(false);
		copy.setAttribute('style', "width:51px; height:108px; position:absolute; background:none; top:0; '+IkaRTL.txtLeft+':0;");
		document.getElementById(id).appendChild(copy);
		copy.title += leftTitle ? " (" + leftTitle + ")" : '';
		original.title += rightTitle ? " (" + rightTitle + ")" : '';
		return [original, copy];
	},
	military:function() {
		var tmp = SplitPersonalities.splitAdviser('advMilitary', IkaTools.getText('interface', 'TroopMovements', 'Troop Movements'), IkaTools.getText('interface', 'CombatReports', 'Combat Reports'));
		var original = tmp[0];
		var copy = tmp[1];
		original.href  = original.href.replace(/militaryAdvisorMilitaryMovements/,'militaryAdvisorCombatReports');
	},
	diplomat:function() {
		var tmp = SplitPersonalities.splitAdviser('advDiplomacy', IkaTools.getText('interface', 'Inbox', 'Inbox'), IkaTools.getText('interface', 'Alliance', 'Alliance'));
		var original = tmp[0];
		var copy = tmp[1];
		original.href      = "/index.php?view=diplomacyAdvisorAlly";
	},
	research:function() {
		// find an academy
		var cities = IkaTools.getCities();
		var academy;
		for(var i = 0; i < cities.length; i++) {
			if(academy = IkaTools.cityGetBuildingByType('academy', cities[i])) {
				var tmp = SplitPersonalities.splitAdviser('advResearch', false,  IkaTools.getText('interface', 'Library', 'Library'));
				var original = tmp[0];
				var copy = tmp[1];
				original.href      = "/index.php?view=researchOverview&position=" + academy.position + "&id=" + academy.cityId;
				i = cities.length;
			}
		}
	}
}

IAB = {
	tools:IkaTools,
	init:function() {
		unsafeWindow.IAB = IAB;
		
		var cityId = IkaTools.getCurrentCityId();
		if (!!cityId)
		{
  		var city = IkaTools.getCityById(cityId);
  		// make sure buildings are loaded for current city
  		if (!!city.owned && (!city.buildings || !city.buildings.length))
  			this.goToWithDelay('/index.php?view=city&id=' + cityId);
  		this.loadData();
  		// check for building and insert add to queue button
  		var upgradeBox = false;
  		try { upgradeBox = $('#buildingUpgrade')[0]; } catch(e) {};
  		
  		var position = IkaTools.getCurrentPosition();
  		var building;
  		if ($('#buildingUpgrade').size() == 1) 
  		{
  			building = IkaTools.cityGetBuildingByPosition(position, city);
  		}
  		if(!!building && upgradeBox && !IkaTools.buildingIsMaxed(building)) {		
  			var html = '<input type="button" class="button" id="autoBuildAddToQueue" title="'+IkaTools.getText('autoBuild', 'AddBuildingToQueue', 'Add this building to the automatic build queue.')+'" value="' + IAB.getText('addToQueue') + '" />' + 
  			           '<p>'+IkaTools.getText('autoBuild', 'AutoUpgrade', 'Auto Upgrade')+' <input type="checkbox" style="display:inline; position:relative; top:2px; margin-'+IkaRTL.txtLeft+':.5em;" id="autoUpgradeCheckbox" /></p>';
  			upgradeBox.getElementsByTagName('div')[0].innerHTML += html;
  			$('#autoBuildAddToQueue')[0].addEventListener("click", function() { IAB.addToQueue(); this.blur(); } , false);
  			if(building)
  				$('#autoUpgradeCheckbox')[0].checked = IAB.buildingIsInUpgrades(building);
  			$('#autoUpgradeCheckbox')[0].addEventListener('click', function() {
  				if(this.checked) {
  					IAB.addToAutoUpgrades(IAB.getCurrentBuilding());
  					IAB.drawQueue();
  				} else
  					IAB.removeFromAutoUpgrades(building);		
  			}, false);
  			// add demolish function
  			$('#buildingUpgrade li.downgrade a')[0].addEventListener('click', function() {
  				var c = confirm(IAB.getText('demolishConfirm'));
  				IkaTools.setVal('demolish', c ? building : false);
  			}, true);
  			var demolish = IkaTools.getVal('demolish');
  			if(typeof(demolish.position) != 'undefined') {
  				if(demolish.position == position && demolish.cityId == cityId && demolish.type == IkaTools.getView()) {
  					IkaTools.setVal('demolish', building);
  					IkaTools.goTo($('#buildingUpgrade li.downgrade a')[0].href);
  				} else
  					IkaTools.setVal('demolish', false);	
  			}
  			// show total resources missing
  			if (building) {
  				var totalOnHand = IkaTools.cityGetResource('wood');
  				totalOnHand += IkaTools.cityGetResource('wine');
  				totalOnHand += IkaTools.cityGetResource('marble');
  				totalOnHand += IkaTools.cityGetResource('sulfur');
  				totalOnHand += IkaTools.cityGetResource('crystal');
  				
  				var totalRequired = IkaTools.buildingGetResourceRequiredTotal(building);
  				var totalMissing = totalRequired - totalOnHand; //.buildingGetResourceMissingTotal(building);
  				var totalsHtml = '<table cellpadding="0" border="0" cellspacing="0" align="center" style="width:auto !important;"><tr><td style="padding:.25em 0 0 0; text-align:'+IkaRTL.txtRight+';">' + IkaTools.addCommas(totalRequired) + '</td><td style="text-align:'+IkaRTL.txtLeft+';">  '+IkaTools.getText('autoBuild', 'totalForLevel', 'total for level')+' ' + (parseInt(building.level) + 1) + '</td><tr>'; 
  				if (totalMissing > 0) {
  					totalsHtml += '<tr><td style="padding:.25em 0 0 0; text-align:'+IkaRTL.txtRight+';">' + IkaTools.addCommas(totalMissing) + '</td><td style="text-align:'+IkaRTL.txtLeft+';">  '+IkaTools.getText('autoBuild', 'moreForTrade', 'more for 1:1 trade')+'</td><tr>';
  					//$('#buildingUpgrade h4:eq(0)').css('text-align', 'left');
  				}
  				$('#buildingUpgrade h4:eq(0)').html(totalsHtml + '</table>');
  				var resourcesHtml = '<table cellpadding="0" cellspacing="5" border="0" align="center" id="exMachBuildingResReq" style="width:auto !important;">';
  				$('#buildingUpgrade ul.resources li').each(function() {
  					var iconSrc = $(this).css('background-image').replace(/^url\("/, '').replace(/"\)/, '').replace(/^url\(/, '').replace(/\)$/, '');
  
  					$('.textLabel', this).html('');
  					resourcesHtml += '<tr><td style="text-align:'+IkaRTL.txtRight+';"><img src="' + iconSrc + '" style="height:14px; margin-'+IkaRTL.txtRight+':.5em; display:inline; float:'+IkaRTL.txtLeft+';"/></td>';
  					var cname = this.className.match(/^[^\s]+/)[0];
  					resourcesHtml += '<td style="text-align:'+IkaRTL.txtLeft+';">   ' + $(this).text() + '</td><td style="text-align:'+IkaRTL.txtLeft+';">';
  					if(cname != 'time') {
  						var missing = IkaTools.buildingGetResourceMissing(cname, building);
  						if(missing > 0)
  							resourcesHtml += '     <strong>-' + IkaTools.addCommas(missing) + '</strong>';
  						
  					}
  					resourcesHtml += '</td></tr>';
  				});
  				resourcesHtml += '</table>'
  				$('#buildingUpgrade ul.resources').before(resourcesHtml);
  				$('#buildingUpgrade ul.resources').remove();
  				GM_addStyle('#exMachBuildingResReq { margin-top:1em; } #exMachBuildingResReq td { padding-bottom:.5em; }');
  			}
  		}
  		///*
  		if(typeof(this.views[IkaTools.getView()]) == "function") {
  			this.views[IkaTools.getView()]();	
  		}
  		//*/
  		if(this.autoDisable()) {								// auto disable if it's been a while since the script has run
  			var lastSeen = IkaTools.getVal('lastSeen');
  			var d = new Date();
  			lastSeen = lastSeen.toString().match(/^\d+$/) ? parseInt(lastSeen) : d.getTime();
  			if(d.getTime() - lastSeen > IAB.getMaxDelay() + 60000)
  				this.isEnabled(false);
  			this.updateLastSeen();
  		}
  		if(this.isEnabled()) {									// load data and process build stack
  			IAB.processBuildStack();
  			IAB.checkQueue();
  			if(IAB.useSmartChecking())
  				setTimeout(IAB.smartCheck,30000);				// add listeners for smart checking
  		}
  		//IAB.saveData();
  		this.drawQueue();
	  }
	},
	addFutureBuildingToQueue:function(type, name, resources) {
		var building = new IkaTools.building();
		building.cityId = ExMachina.currentCityId;
		building.position = IkaTools.getCurrentPosition();
		building.type = type;
		building.name = name;
		building.resources = typeof(resources) == 'object' ? resources : {wood:0, wine:0, marble:0, glass:0, sulfur:0, time:''};
		IAB.getQueue().push(building);
		IAB.saveData();
		IAB.drawQueue();
	},
	addToAutoUpgrades:function(building) {
		building.isAutoUpgrade = true;
		IAB.sortUpgrades();
		var upgrades = IAB.getAutoUpgrades();
		upgrades.push(building)
		IAB.upgrades = upgrades;
		IAB.saveData();
	},
	addToQueue:function() {
		var queue = IAB.getQueue();
		var building = IAB.getCurrentBuilding();
		building.isAutoUpgrade = false;
		queue.push(building);
		IAB.groupQueueByCity();
		IAB.saveData();
		IAB.drawQueue();
		IAB.checkQueue();
	},
	isExpanded:function(bool) {
		if(typeof(bool) != 'undefined')
			IkaTools.setVal('autoBuildExpanded', bool)
		else 
			return IkaTools.getVal('autoBuildExpanded').toString() == 'no' ? false : true;
	},
	autoDisable:function(bool) {
		if(typeof(bool) != 'undefined')
			IkaTools.setVal('autoDisable', bool ? 'yes' : 'no')
		else 
			return IkaTools.getVal('autoDisable').toString() == 'yes' ? true : false;
	},
	autoUpgradeIsEnabled:function(bool) {
		if(typeof(bool) != 'undefined')
			IkaTools.setVal('autoUpgradeEnabled', bool ? 'yes' : 'no')
		else 
			return IkaTools.getVal('autoUpgradeEnabled').toString() == 'yes' ? true : false;
	},
	autoUpgradeIsExpanded:function(bool) {
		if(typeof(bool) != 'undefined')
			IkaTools.setVal('autoUpgradeExpanded', bool ? 'yes' : 'no')
		else 
			return IkaTools.getVal('autoUpgradeExpanded').toString() == 'no' ? false : true;
	},
	buildingIsInUpgrades:function(building) {
		try {
			var upgrades = IAB.getAutoUpgrades();
			for(var i = 0; i < upgrades.length; i++)
				if(building.cityId.toString() == upgrades[i].cityId.toString() && building.position.toString() == upgrades[i].position.toString())
					return true;	
			return false;
		} catch(e) {
			return false;
		}
	},
	checkQueue:function() {
		IAB.updateLastSeen();
		if(IAB.isEnabled()) {							// check for items in queue
			var d = new Date();
			if(d.getTime() >= IAB.getProcessTime())
				IAB.processQueue();
			else
				IAB.updateTimer();
		}
	},
	clearQueue:function() {
		var newQueue = new Array();
		if(IkaTools.getVal('autoBuildFilterByCity') == 'yes')
		IAB.queue.forEach(function(queueItem)
		{
			if(queueItem.cityId != ExMachina.currentCityId)
				newQueue.push(queueItem);	
		});
		IAB.queue = newQueue;
		IAB.saveData();
		IAB.drawQueue();
	},
	drawQueue:function() {
		if (IkaTools.getView() != 'militaryAdvisorDetailedReportView') {
			var buildings = IAB.getQueue();
			var queueBox = null;
			if (queueBox = document.getElementById('IkaAutoBuildQueue')) 
				queueBox.innerHTML = "";
			else {
				queueBox = document.createElement('div');
				queueBox.id = "IkaAutoBuildQueue";
				IkaTools.addInfoBox('<a id="isExpanded" style="background:red;">' +
				'<img style="float:'+IkaRTL.txtRight+'; cursor:pointer; float:'+IkaRTL.txtRight+'; padding: 5px 5px 0 0;" title="' +
				IAB.getText('queue').expandOrCollapse.autoBuild +
				'" id="autoBuildExpandImg" src="' +
				(IAB.isExpanded() ? IAB.icons.collapse : IAB.icons.expand) +
				'"/></a>' +
				'<div style="cursor:pointer; width:65px; float:'+IkaRTL.txtLeft+'; font-size:.85em; font-weight:normal; margin-'+IkaRTL.txtLeft+':10px; text-align:'+IkaRTL.txtLeft+';" id="autoBuildCountdown" title="' +
				IAB.getText('queue').timeUntilNextDesc +
				'"> </div>' +
				'<span style="padding-'+IkaRTL.txtLeft+':0; position:relative; '+IkaRTL.txtLeft+':-2em;">' +
				IAB.getText('autoBuild') +
				'<input type="checkbox" style="position:relative; top:.2em; margin-'+IkaRTL.txtLeft+':.5em; cursor:pointer;" id="autoBuildEnabledCheckbox" ' +
				' title="' +
				IAB.getText('queue').enableAutoBuild +
				'" ' +
				(IAB.isEnabled() ? 'checked ' : '') +
				'/></span>', queueBox);
				$('#autoBuildCountdown').click(function() {
					IkaTools.setVal('autoBuildProcessTime', "0");
					IAB.checkQueue();
				});
				$('#autoBuildExpandImg').click(function() {
					$('#autoBuildExpandImg').attr('src', IAB.isExpanded() ? IAB.icons.collapse : IAB.icons.expand);
					IAB.isExpanded(IAB.isExpanded() ? 'no' : 'yes');
					IAB.drawQueue();
				});
			}
			if (IAB.isExpanded()) {
				queueBox.style.textAlign = IkaRTL.txtLeft;
				// add buildings in queue
				if (buildings.length > 0) {
					queueBox.innerHTML += '<p style="margin-'+IkaRTL.txtLeft+':7px; !important;"><strong>' + IAB.getText('queue').queue + '</strong></p>';
					var buttonClear = document.createElement('a');
					buttonClear.innerHTML = '[' + IAB.getText('queue').clearAll + ']';
					buttonClear.id = "autoBuildClearAll";
					buttonClear.style.textAlign = IkaRTL.txtRight;
					buttonClear.style.margin = "-2.1em .5em 0 0";
					buttonClear.style.paddingBottom = ".5em";
					buttonClear.style.display = "block";
					buttonClear.style.cursor = "pointer";
					buttonClear.style.fontSize = ".8em";
					buttonClear.title = IAB.getText('clearAllDesc');
					queueBox.appendChild(buttonClear);
				}
				IAB.drawQueueBuildings(buildings, queueBox);
				try {
					$('#autoBuildEnabledCheckbox').click(function() {
						IkaTools.setVal('buildStack', []);
						IAB.isEnabled(this.checked);
						if (this.checked) {
							IAB.updateProcessTime();
							unsafeWindow.document.location = unsafeWindow.document.location;
						}
					}, false);
				} catch (e) {
				}
				// auto upgrade
				var upgrades = IAB.getAutoUpgrades(); 
				if (upgrades.length > 0) {
					var p = document.createElement('p');
					var margin = IAB.getQueue().length > 0 ? ' margin-top:1.3em;' : '0';
					p.setAttribute("style", "margin-'+IkaRTL.txtLeft+':7px; !important; font-weight:bold;" + margin);
					p.innerHTML = '<img id="autoBuildExpandImage" src="' + (IAB.autoUpgradeIsExpanded() ? IAB.icons.collapse : IAB.icons.expand) + 
					                    '" style="float:'+IkaRTL.txtRight+'; '+
					                    'position:relative; '+IkaRTL.txtLeft+':7px; cursor:pointer;" align="absmiddle" \
					                    title="' +IAB.getText('queue').expandOrCollapse.autoUpgrades +'"/>'+IkaTools.getText('autoBuild', 'AutoUpgrade', 'Auto Upgrade')+' \
						<input type="checkbox" id="autoBuildUpgradeEnabled" ' +
					(IAB.autoUpgradeIsEnabled() ? 'checked' : '') +
					' title="' +
					IAB.getText('queue').enableDisableAutoUpgrades +
					'"/>';
					queueBox.appendChild(p);
					if (IAB.autoUpgradeIsExpanded()) {
						IAB.drawQueueBuildings(upgrades, queueBox, true);
					}
					$('#autoBuildExpandImage').click(function() {
						var expanded = IAB.autoUpgradeIsExpanded();
						IAB.autoUpgradeIsExpanded(!expanded);
						IAB.drawQueue();
						
					}, false);
				}
				if (buildings.length == 0 && upgrades.length == 0) {
					queueBox.innerHTML += '<p style="text-align:center; margin-top:1.5em;">' + IAB.getText('queue').emptyNotice + '</p>';
				}
				var pFilter = document.createElement('p');
				pFilter.setAttribute('style', 'margin-top:1.5em; text-align:center; font-size:.8em;');
				if (IkaTools.getVal('autoBuildFilterByCity') == 'yes') {
					pFilter.innerHTML = IAB.getText('queue').showing.currentCity;
				} else {
					pFilter.innerHTML = IAB.getText('queue').showing.allCities;
				}
				var change = document.createElement('a');
				change.innerHTML = '[' + IAB.getText('queue').change + ']';
				change.setAttribute('style', 'cursor:pointer; padding-'+IkaRTL.txtLeft+':.5em;');
				change.addEventListener('click', function() {
					IkaTools.setVal('autoBuildFilterByCity', (IkaTools.getVal('autoBuildFilterByCity') == 'yes' ? 'no' : 'yes'));
					IAB.drawQueue();
				}, false);
 				pFilter.appendChild(change);
				queueBox.appendChild(pFilter);
			}
			// enable drag & drop
			(function() {
				var objStartX, objStartY, startX, startY, dragTarget, left, offsetLeft, offsetTop;
				var docked = true;
				var box = $('#IkaAutoBuildQueue').parent();
				var chk = $('#autoBuildEnabledCheckbox');
        var exd = $('#autoBuildExpandImg');
				var startTop = box.position().top;
				var startLeft = box.position().left;
				var left = parseInt(IkaTools.getVal('autoBuildQueueLeft'));
				if (left.toString() != 'NaN' && left != 0) {
					docked = false;
					box.css('z-index', '300000');
					$('#container').prepend(box);
					var top = parseInt(IkaTools.getVal('autoBuildQueueTop'));
					box.css('left', left + 'px');
					box.css('top', top + 'px');
					box.css('position', 'absolute');
				}
				function startDrag(event) {
					var posX = event.clientX+scrollX;
					var posY = event.clientY+scrollY;
					var chkBox = chk.offset();
					var expandBox = exd.offset();
					chkBox.right = chk.width()+chkBox.left;
					chkBox.bottom = chk.height()+chkBox.top;
					expandBox.right = exd.width()+expandBox.left;
					expandBox.bottom = exd.height()+expandBox.top;
					
					if (   ((posX < chkBox.left) || (posX > chkBox.right) || (posY < chkBox.top) || (posY > chkBox.bottom))
					    && ((posX < expandBox.left) || (posX > expandBox.right) || (posY < expandBox.top) || (posY > expandBox.bottom)))
					{
  					if (docked) {
  						startTop = box.position().top;
  						startLeft = box.position().left;
  					}
  					box.css('position', 'absolute');
  					dragTarget = $(this).parent();
  					dragTarget.css('z-index', '300000');
  					if (docked) {
  						dragTarget.css('top', startTop);
  						dragTarget.css('left', startLeft);
  					}
  					startX = event.pageX
  					startY = event.pageY
  					objStartX = dragTarget.position().left;
  					objStartY = dragTarget.position().top;
				  }
				}
				function stopDrag() {
					if (dragTarget) { 
					  //alert($('#information').position().left);
						var currLeft = dragTarget.position().left;
						var currTop = dragTarget.position().top;
						var offsetLeft = (IkaRTL.isRTL) ? 749 : 0;
						if (((currLeft > offsetLeft -225) && (currLeft < offsetLeft + 225)) || (currLeft > -225 && currLeft < 960 && currTop < 147)) {
							dragTarget.css('z-index', '0');
							dragTarget.css('left', '0');
							dragTarget.css('top', '0');
							IkaTools.setVal('autoBuildQueueLeft', 0);
							IkaTools.setVal('autoBuildQueueTop', startTop);
							// put it back in its place
							var numDyns = $('#container .dynamic').size() - $('#mainview .dynamic').size() - 1;
							if (numDyns > 0) 
								$('#container2 .dynamic').eq(numDyns - 1).after(dragTarget);
							else 
								$('#container2').prepend(dragTarget);
							box.css('position', 'inherit');
							docked = true;
						} else {
							docked = false;
							$('#container').prepend(dragTarget);
							IkaTools.setVal('autoBuildQueueLeft', dragTarget.position().left);
							IkaTools.setVal('autoBuildQueueTop', dragTarget.position().top);
						}
						dragTarget = false;
					}
				}
				$('h3 span', $('#IkaAutoBuildQueue').parent()).css('cursor', 'move');
				$('h3', $('#IkaAutoBuildQueue').parent()).mousedown(startDrag);
				$('body').mousemove(function(event) {
					if (dragTarget) {
						dragTarget.css('left', (objStartX + (event.pageX - startX)) + 'px');
						dragTarget.css('top', (objStartY + (event.pageY - startY)) + 'px');
					}
				});
				$('body').mouseup(stopDrag);
			})();
			$('#IkaAutoBuildQueue')[0].style.display = IAB.isExpanded() ? 'block' : 'none';
			$('#IkaAutoBuildQueue + div.footer')[0].style.display = IAB.isExpanded() ? 'block' : 'none';
			// add button event listeners
			if (IAB.isExpanded() && IAB.autoUpgradeIsExpanded()) {
  			$('img#[id^="autoBuildAutoUpgradeDelete"]').click(function() {
					var tmp = this.name.toString().split('_');
					IAB.removeFromAutoUpgrades(IkaTools.cityGetBuildingByPosition( tmp[0],IkaTools.getCityById(tmp[1])));
  			});
  			$('a#[id^="autoBuildUpgradeLink"]').click(function() {
					var tmp = this.name.split('_');
					IkaTools.goTo('/index.php?view=' + tmp[0] + '&id=' + tmp[1] + '&position=' + tmp[2], tmp[1]);
  			});
			}

 			$('img#[id^="autoBuildDown"]').click(function() {
				var queue = IAB.getQueue();
				var newQueue = new Array();
				var buildingToMove = false;
				for (var i = 0; i < queue.length; i++) {
					if (this.id == 'autoBuildDown' + i) {
						buildingToMove = queue[i];
						moved = true;
					} else {
						newQueue.push(queue[i]);
						if (buildingToMove) {
							newQueue.push(buildingToMove);
							buildingToMove = false;
						}
					}
				}
				if (buildingToMove) {
					newQueue.push(buildingToMove);
				}
				IAB.queue = newQueue;
				IAB.saveData();
				IAB.drawQueue();
			});
 			$('img#[id^="autoBuildUp"]').click(function() {
				var queue = IAB.getQueue();
				var newQueue = new Array();
				var buildingToMove = false;
				var moved = false;
				for (var i = queue.length - 1; i >= 0; i--) {
					if (this.id == 'autoBuildUp' + i) {
						buildingToMove = queue[i];
						moved = true;
					} else {
						newQueue.push(queue[i]);
						if (buildingToMove) {
							newQueue.push(buildingToMove);
							buildingToMove = false;
						}
					}
				}
				if (buildingToMove) {
					newQueue.push(buildingToMove);
				}
				newQueue.reverse();
				IAB.queue = newQueue;
				IAB.saveData();
				IAB.drawQueue();
			});
 			$('img#[id^="autoBuildDeleteButton"]').click(function() {
				IAB.removeFromQue(this.name);
			});
 			$('a#[id^="autoBuildLink"]').click(function() {
				var tmp = this.name.split('_');
				IkaTools.goTo('/index.php?view=' + tmp[0] + '&id=' + tmp[1] + '&position=' + tmp[2], tmp[1]);
			});
			try {
				$('#autoBuildClearAll').click(IAB.clearQueue);
			} catch (e) {
			}
			try {
				$('#autoBuildUpgradeEnabled').click(function() {
					IAB.autoUpgradeIsEnabled(this.checked);
				});
			} catch (e) {
			}
		}
	},
	drawQueueBuildings:function(buildings, queueBox, isUpgrades) {
		isUpgrades = typeof(isUpgrades) != 'undefined' ? isUpgrades : false;
		GM_addStyle('div.autoUpgradeBuilding { font-size:.8em; width:205px; float:'+IkaRTL.txtLeft+'; padding:0 5px 0 7px !important; min-height:2.3em; line-height:2.3em; text-align:'+IkaRTL.txtLeft+' !important; }\
					div.autoUpgradeBuilding:hover { background-color:#fff; }'+
					(IAB.highlightRows() ? 'div.autoUpgradeBuildingEven { background-color:#faf2d1; }' : '') +
					'img.autoBuildDelete { float:'+IkaRTL.txtRight+'; height:13px; opacity:.6; cursor:pointer; margin:0 1px 0 2px; position:relative; top:5px; }\
					img.autoBuildDelete:hover { opacity:1; }\
					img.autoBuildResourceIcon { height:9px; position:relative; top:-1px; margin-'+IkaRTL.txtRight+':2px !important; display:inline !important; }\
					img.autoBuildDownArrow { float:'+IkaRTL.txtRight+'; width:13px; opacity:.5; cursor:pointer; position:relative; top:11px; }\
					img.autoBuildDownArrow:hover { opacity:1; }\
					img.autoBuildUpArrow { float:'+IkaRTL.txtRight+'; width:13px; opacity:.5; cursor:pointer; position:relative; top:4px; '+IkaRTL.txtLeft+':13px; }\
					img.autoBuildUpArrow:hover { opacity:1; }\
					img.autoBuildHidden { visibility:hidden; }');
		var html = "";
		
		var resourceNames = ["wood", "wine", "marble", "glass", "sulfur"];
		buildings.forEach(function(b, i)
		{
			if(IkaTools.getVal('autoBuildFilterByCity').toString() != 'yes' || b.cityId == ExMachina.currentCityId) {
				var borderStyle = (i > 0 && buildings[i-1].cityId != b.cityId && IkaTools.getVal('autoBuildFilterByCity').toString() != 'yes') ? "border-top:1px dashed #DDBF8B" : '';
				var truncatedName = b.name.length > 14 ? b.name.replace(/\s*[^\s]+\s*$/, '')+'...' : b.name;
				var deleteTitle = isUpgrades ? IkaTools.getText('autoBuild', 'RemoveAutoUpgrade', 'Remove from auto upgrades')+" (" + b.name + ") " : IAB.getText('queue').remove + ' ' + b.name + ' ' + IAB.getText('queue').fromQueue;		
				var deleteName = isUpgrades ? b.position + '_' + b.cityId : i;
				var deleteId = isUpgrades ? 'autoBuildAutoUpgradeDelete' : 'autoBuildDeleteButton';
				var linkId = isUpgrades ? 'autoBuildUpgradeLink' : 'autoBuildLink';
				html += '<div class="autoUpgradeBuilding '+(i % 2 == 0 ? 'autoUpgradeBuildingEven' : '')+'" style="margin:0; '+borderStyle+'">' +
				        '<img id="'+deleteId+i+'" name="'+deleteName+'" src="'+IAB.icons.trash+'" class="autoBuildDelete" title="'+deleteTitle+'"/>';
				if(!isUpgrades) {
					var downHidden = (i == buildings.length - 1 || (typeof(buildings[i+1]) == 'undefined' || buildings[i+1].cityId != b.cityId)) ? 'autoBuildHidden' : '';
					html += '<img id="autoBuildDown'+i+'" src="'+IAB.icons.down+'" class="autoBuildDownArrow '+downHidden+'" title="' + IAB.getText('queue').move + ' '+b.name+' ' + IAB.getText('queue').downInQueue + '"/>';
					var upHidden = (i == 0 || buildings[i-1].cityId != b.cityId) ? 'autoBuildHidden' : '';
					html += '<img id="autoBuildUp'+i+'" src="'+IAB.icons.up+'" class="autoBuildUpArrow '+upHidden+'" title="' + IAB.getText('queue').move + ' '+b.name+' ' + IAB.getText('queue').upInQueue + '"/>';
				}
				html += '<table cellspacing="0" border="0" cellpadding="0" style="width:auto; margin:0; border-collapse:none !important;"><tr >\
						  <td style="vertical-align:top; padding:0 .5em 0 0;" valign="top">\
						  	<a id="'+linkId+i+'" href="javascript:void(0);" name="'+b.type+'_'+b.cityId+'_'+b.position+'" title="'+IkaTools.getCityById(b.cityId).name+' - '+b.name+' ('+(parseInt(b.level)+1)+')"'+
							' style="color:'+(IkaTools.buildingGetResourceMissingTotal(b) == 0 ? '#006600' : '')+'; ">'+truncatedName+'</a>\
						   </td><td style="vertical-align:top; font-size:.9em; padding:0 .5em 0 0;">';
				var resources = b.resources;
				
				resourceNames.forEach(function(resourceName)
				{
					var missing = IkaTools.buildingGetResourceMissing(resourceName, b);
					if(missing > 0) {
						html += '<div style="float:'+IkaRTL.txtLeft+'; margin-'+IkaRTL.txtRight+':.7em;"><img src="http://' + document.domain + '/skin/resources/icon_' + resourceName + '.png" class="autoBuildResourceIcon" align="absmiddle"/>' +
						        IkaTools.addCommas(missing) + '</div>';
					}
				});
				html += '</td></tr></table></div>';
			}
		});
		html += '<div style="height:.5em; width:100%; float:'+IkaRTL.txtLeft+';"> </div>';
		queueBox.innerHTML += html;
	},
	getAutoUpgrades:function() { 
		return IAB.upgrades; 	
	},
	getBuildingInQueueByPosition:function(position) {
		var queue = IAB.getQueue();
		for(var i = 0; i < queue.length; i++)
			if(queue[i].cityId == ExMachina.currentCityId && queue[i].position == position)
				return queue[i];
		return false;
		/*
		return queue.some(function(queueItem)
		{
			return (queueItem.cityId == ExMachina.currentCityId && queueItem.position == position);
		});
		*/
	},
	getCurrentBuilding:function() {
		return IkaTools.cityGetBuildingByPosition(IkaTools.getCurrentPosition(), IkaTools.getCurrentCity());	
	},
	getMaxDelay:function() {
		var maxDelay = parseInt((typeof(IkaTools.getVal('autoBuildMaxDelay')) != 'undefined' &&	IkaTools.getVal('autoBuildMaxDelay').toString().match(/^\d+$/)) ? parseInt(IkaTools.getVal('autoBuildMaxDelay')) : 900000);
		return maxDelay < IAB.getMinDelay() ? IAB.getMinDelay : maxDelay;
	},
	getMinDelay:function() {
		return parseInt((typeof(IkaTools.getVal('autoBuildMinDelay')) != 'undefined' &&	IkaTools.getVal('autoBuildMinDelay').toString().match(/^\d+$/)) ? parseInt(IkaTools.getVal('autoBuildMinDelay')) : 300000);
	},
	getProcessTime:function() {
		return IkaTools.getVal('autoBuildProcessTime').toString().match(/^\d+$/) ? IkaTools.getVal('autoBuildProcessTime') : 0;
	},
	getQueue:function() { 
		return IAB.queue; 
	},
	getText:function(param, lang) {
		return IkaTools.getText('autoBuild', param);
		
		var lang = typeof(lang) == 'undefined' ? IkaTools.getLanguage() : 'en';
		var langObj = typeof(IAB.text[lang]) == 'undefined' ? IAB.text['en'] : IAB.text[lang];
		var tokenContainers = {};
		var tokens = param.split('.');
		for(var i = 0; i < tokens.length; i++) {
			if(typeof(langObj[tokens[i]]) != 'undefined')
				langObj = langObj[tokens[i]];
			else 
				return lang == 'en' ? '?' : IAB.getText(param, 'en');
		}
		return langObj;
	},
	groupQueueByCity:function() {
		// group queue by city
		var newQueue = new Array();
		var cities = IkaTools.getCities();
		for(var i = 0; i < cities.length; i++) {
			for(var x = 0; x < IAB.queue.length; x++) {
				if(IAB.queue[x].cityId == cities[i].id) {
					newQueue.push(IAB.queue[x])	;
				}
			}
		}
		IAB.queue = newQueue;
		// group queue by city
		var newUpgrades = new Array();
		var cities = IkaTools.getCities();
		for(var i = 0; i < cities.length; i++) {
			for(var x = 0; x < IAB.upgrades.length; x++) {
				if(IAB.upgrades[x] && IAB.upgrades[x].cityId == cities[i].id) {
					newUpgrades.push(IAB.upgrades[x])	;
				}
			}
		}
		IAB.upgrades = newUpgrades;
	},
	goToWithDelay:function(url, cityId) {
		var d = new Date();
		setTimeout(function() { IkaTools.goTo(url, cityId); }, parseInt(0 + (Math.random() * 3000 + 1000)));
	},
	highlightRows:function(bool) {
		if(typeof(bool) != 'undefined')
			IkaTools.setVal('highlightRows', bool ? 'yes' : 'no')
		else 
			return IkaTools.getVal('highlightRows').toString() == 'no' ? false : true;
	},
	icons:{
		collapse:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABhSURBVCjPY/jPgB8y0FHBkb37/+/6v+X/+v8r/y/ei0XB3v+H4HDWfywKtgAl1oLhof8TsClYA5SAgEP/27EpWIxkQj02BbOQ3FCGTcGEdV3/W4B6K/+X/M9fNzAhSbYCAMiTH3pTNa+FAAAAAElFTkSuQmCC',
		down:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAHCAQAAAB5eQ+RAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BSMDVQYqg4jIKAUICxE+CDEESC4tKoMHJQODAIMCgwGDA0MAQyJDPcMChqMMbxjFGV0YSxlXMN5jEmMKYprAdIFZmDmSeSHzGxZLlg6WW6x6rK2s99gs2aaxfWMPZ9/NocTRxfGFM5HzApcj1xZuTe4FPFI8U3mFeCfxCfNN45fhXyygI7BD0FXwilCq0A/hXhEVkb2i4aJfxCaJG4lfkaiQlJM8JpUvLS19QqZMVl32llyfvIv8H4WtioVKekpvldeqFKiaqP5UO6jepRGqqaT5QeuA9iSdVF0rPUG9V/pHDBYY1hrFGNuayJsym740u2C+02KJ5QSrOutcmzjbQDtXe2sHY0cdJzVnJRcFV3k3BXdlD3VPXS8Tbxsfd99gvwT//ID6wIlBS4N3hVwMfRnOFCEXaRUVEV0RMzN2T9yDBLZE3aSw5IaUNak30zkyLDIzs+ZmX8xlz7PPryjYVPiuWLskq3RV2ZsK/cqSql01jLVedVPrHzbqNdU0n22VaytsP9op3VXUfbpXta+x/+5Em0mzJ/+dGj/t8AyNmf2zvs9JmHt6vvmCpYtEFrcu+bYsc/m9lSGrTq9xWbtvveWGbZtMNm/ZarJt+w6rnft3u+45uy9s/4ODOYd+Hmk/Jn58xUnrU+fOJJ/9dX7SRe1LR68kXv13fc5Nm1t379TfU75/4mHeY7En+59lvhB5efB1/lv5dxc+NH0y/fzq64Lv4T8Ffp360/rP8f9/AA0ADzT6lvFdAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABhSURBVHjaYvjPgAtCqQP/d/3f/H/1/0X/Z/zv+4Yitf3rrv/7/+/8v/n/nP/151GkVkss+rLi/8b/M/9XfStURJH6zzBZovP7lP9l33Ll0Oz6z/CfoUqi8HWmHIYzsEHAAF29Zj3gEdbgAAAAAElFTkSuQmCC",
		trash:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD9SURBVBgZBcFLLkNRAADQc1/fU6qkhFRMMNIQn8TUQCJWYBE2YBkWYQWMJIZmNuAXCSoGFUGIInJf33VOSAAAAIAcgLOFt3079flaEdTS50M6nT7YeggJwPFle6nhAoVhc370rnaXcwBSp62GTdxoGdPrkAPQD5OSbRFr6oLvjByA53CqY9YUvjy68YQcgELTuTd/khENbQk5ANGqFUSFnq6WW2QA5Op4VuhreJVEZACUAKiJkogMgIEKANFARAZAKQKolColMgA+f7vVkBkRSeYjvf6QAfB1cnnXNWTUhHHrXuLoESEBYO/aYjNUSqX3snk/2DjshwQAAAD4B9GUWR0G4scKAAAAAElFTkSuQmCC",
		expand:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABjSURBVCjPY/jPgB8y0FHBkb37/+/6v+X/+v8r/y/ei0XB3v+H4HDWfywKtgAl1v7/D8SH/k/ApmANUAICDv1vx6ZgMZIJ9dgUzEJyQxk2BRPWdf1vAeqt/F/yP3/dwIQk2QoAfUogHsamBmcAAAAASUVORK5CYII%3D',
		help:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAB3RJTUUH1AgIEBkAN5md3wAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAALZSURBVHjaPVJdSFNhGP6+b2fHbc5tzn9N0WSWM8hyKkIgJEhZIP3IAqPAy6CybrqICIJKu+kHSm9EEsoLwZu6KIKSRCgVtIbltOb0TM/cr2fnbDvbvu98naH53r3v8zy8vO/zQEop+F+erbiUJJQqUG0goBTptbjMqs3Ly9vnwF1BVMxsBpL5RqasUIc0aBdTMOGCyVhSyVHCB6srGYbZE4TFTCCcqK82YwDmJLARoDsxJZXWlOaCbjvIgWTJGxf8y47jjSzLZgVLa7GGGtNCAIx9ByUkfKkJFJloSGKHp7RLft2987C5RnF5xGTI7XA4wConRYXEaoCefkIvP/ZQGiFYef2RpzStpMQTt73N/VsRkXp5aXjkjdfrRakMsZj0TycT63+4fCbgC6KLD9xX7/y6P/IXssb68vQaFxwY56qKDYePtMzNzTHqhXwEf/u5pUfyJxd6f8MtY2CpYE45ctUTV3wJYw75uhgiSnlBUeHE2BRCEPqC8o4QowrOYZFBp2FhZviaqe1o5d2R9VUumcsCQZJjiZTK5HkeUQCNLMUZGQCKIEikQdcxxdnV+GJy++Wkr8CsJVRBgDBQgRBhjJFqg+0AW2gEUgIjtSAFGp3XL49/9hdaWEYDRUm2lTNGg3YnEs0SFEIUgK50FvAhMZOhrBb92ICD4+uCmDbokCzjuJS4fq4sKCjzs9NWqxVZjdjDyzed1WeaDR4uEoiketuSQ7cOdTrMG/74hj/af6HoZEtpRMQzX961trZqBgce+Ta3MdT3nS3OyPL8cpgPqUvJ6Ac+V5sa6Kvs761b4cjQ84f5ZqPT6cw6LQjC7KKnqrautoTh/aGphaCU1toq9M0NZoQMvgh+O/oqGuS6u7vb29v3wqf+a3pmtsrWZMm3ZD+tJo9mkRX37/HRZyXFRR0dHSrbZDLB/XhHo1GXyzUxMcFxHCFkd6imzW639/T02Gw2vV6vTv4Bgr2EayJLdbcAAAAASUVORK5CYII%3D',
		up:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAHCAYAAADTcMcaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJhJREFUeNpi/P//PwOpgAWb4JYtWyR+/Phx+fv378axsbGP0OWZ0AU2bNgg8fnz5/tApsjHjx9vdHV1yeHVtGbNGpCGO0xMTBxsbGwMQMwJ0lhUVKSIU9OnT5/uMjMzc7OzszMAncfAycnJwMPDw/nly5d1OP0ENJXr+fPnDN++fWMA+ges8efPnwy/fv1SR1bHSE7oAQQYAPdBRmvj5+y9AAAAAElFTkSuQmCC",
	},
	isEnabled:function(bool) {
		if(typeof(bool) != 'undefined')
			IkaTools.setVal('autoBuildEnabled', (bool ? 'yes' : 'no'));
		else
			return (typeof(IkaTools.getVal('autoBuildEnabled')) != 'undefined' && IkaTools.getVal('autoBuildEnabled') != 'no');
	},
	loadData:function() {
		IAB.queue = IAB.updateBuildings((typeof(IkaTools.getVal('autoBuildQueue')) == 'undefined' || typeof(IkaTools.getVal('autoBuildQueue').length) == 'undefined') ? new Array() : IkaTools.getVal('autoBuildQueue'));	
		IAB.upgrades = IAB.updateBuildings((typeof(IkaTools.getVal('autoUpgrades') || IkaTools.getVal('autoUpgrades').push) == 'undefined') ? new Array() : IkaTools.getVal('autoUpgrades'));
		IAB.buildStack = (typeof(IkaTools.getVal('buildStack')) == 'undefined'  || typeof(IkaTools.getVal('buildStack').push) == 'undefined') ? new Array() : IkaTools.getVal('buildStack');
		IAB.sortUpgrades();
		IAB.groupQueueByCity();
	},
	processBuildStack:function() {
		// update last seen
		var d = new Date();
		IkaTools.setVal('lastSeen', d.getTime());
		if(IAB.isEnabled() && IAB.buildStack.length > 0) {
			var building = IAB.buildStack.pop();	// get the last building on the stack
			var view = IkaTools.cityGetBuildingByPosition(building.position, IkaTools.getCityById(building.cityId)) ? building.type : 'buildingGround';
			if(ExMachina.currentCityId == building.cityId && IkaTools.getCurrentPosition() == building.position) {
				if(typeof(building.isAutoUpgrade) == 'undefined' || !building.isAutoUpgrade) {
					// back up building in case of error
					IkaTools.setVal('autoBuildLastBuilt', building);
				} else {
					// building is an auto upgrade, so clear all backups
					IkaTools.setVal('autoBuildLastBuilt', false);
				}
				IAB.saveData();
				// perform construction, making sure nothing else is already building and there are enough resources
				var canBuild =  (!IkaTools.cityGetBuildBuilding() && IkaTools.buildingGetResourceMissingTotal(building) == 0);
				if(canBuild) {				
					if(view == 'buildingGround') { 	// new construction
						var elems = $('#buildings li.building');
						for(var i = 0; i < elems.size(); i++) {
							var type = elems[i].className.replace(/building\s/, '');
							if(type == building.type) {
								if($('.centerButton a', elems[i]).size() == 1) {
									var loc = '/index.php' + ($('.centerButton a', elems[i]).attr('href'));
									if(loc && !loc.match(/undefined/))
										IAB.popFirstBuildingInCityQueue();
										IAB.goToWithDelay(loc);
								}
							}
						}
					} else {	// upgrade building	
						if($('#upgradeInProgress').size() == 0 && $('#buildingUpgrade a[href*="upgradeBuilding"]').size() == 1) {
							var loc = '/index.php' + $('#buildingUpgrade ul.actions li.upgrade a').attr('href');
							if(loc && !loc.match(/undefined/)) {
								IkaTools.setVal('autoBuildLastBuildType', 'queue');
								IAB.popFirstBuildingInCityQueue();
								IAB.goToWithDelay(loc);
							}
						} else	
							IAB.processBuildStack();
					}			
				} else {
					IAB.processBuildStack();
				}
			} else {
				// put the building back on the stack and go to the building's page
				IAB.buildStack.push(building);
				IAB.saveData();
				IAB.goToWithDelay('/index.php?view=' + view + '&id=' + building.cityId + '&position=' + building.position, building.cityId);	
			}
		} else {
			IAB.buildStack = [];
			IAB.saveData();
		}
	},
	processQueue:function() {
		IAB.updateLastSeen();
		if(IAB.isEnabled()) {
			IAB.updateProcessTime();
			IAB.buildStack = new Array();
			var queue = IAB.getQueue();
			var cities = IkaTools.getCities();
			// check for first build request in each city
			for(var i = 0; i < cities.length; i++) {			//	check queue
				var foundInQueue = false;
				for(var x = 0; x < IAB.queue.length; x++) {
					if(IAB.queue[x].cityId.toString() == cities[i].id.toString()) {
						var building = IAB.queue[x];
						building.requestOrigin = 'queue';
						IAB.buildStack.push(building);
						//IAB.removeFromQue(x);
						foundInQueue = true;
						x = IAB.queue.length;	// continue
					}
				}
				if(!foundInQueue && IAB.autoUpgradeIsEnabled()) { // check auto build requests
					for(var x = 0; x < IAB.upgrades.length; x++) {
						if(IAB.upgrades[x] && IAB.upgrades[x].cityId.toString() == cities[i].id.toString()) {
							var building = IAB.upgrades[x];
							building.requestOrigin = 'upgrades';
							IAB.buildStack.push(building);
							x = IAB.upgrades.length;
						}
					}
				}
			}
			IAB.saveData();
			IAB.processBuildStack();
		}
	},
	removeFromAutoUpgrades:function(building) {
		var newUpgrades = new Array();
		var upgrades = IAB.getAutoUpgrades();
		for(var i = 0; i < upgrades.length; i++) {
			if(building.cityId.toString() != upgrades[i].cityId.toString() || building.position.toString() != upgrades[i].position.toString()) {
				newUpgrades.push(upgrades[i]);
			}
		}
		IAB.upgrades = newUpgrades;
		IAB.saveData();
		IAB.drawQueue();
		if(document.getElementById('autoUpgradeCheckbox')) {
			document.getElementById('autoUpgradeCheckbox').checked = false;	
		}
	},
	popFirstBuildingInCityQueue:function() {
		var cityId = ExMachina.currentCityId;
		var queue = IAB.getQueue();
		var newQueue = new Array();
		var found = false;
		for (var i = 0; i < queue.length; i++)
			if (found || queue[i].cityId != cityId) {
				newQueue.push(queue[i]);
			} else
				found = true;
		IAB.queue = newQueue;
		IAB.saveData();
		IAB.drawQueue();
	},
	removeFromQue:function(index) {
		var queue = IAB.getQueue();
		var newQueue = new Array();
		for(var i = 0; i < queue.length; i++) {
			if(i != index) {
				newQueue.push(queue[i]);	
			}
		}
		IAB.queue = newQueue;
		IAB.saveData();
		IAB.drawQueue();
	},
	restoreLastBuildingToQueue:function() {
		var building = IkaTools.getVal('autoBuildLastBuilt');
		if(typeof(building) != 'undefined' && typeof(building.name) != 'undefined' && building.requestOrigin == 'queue') {
			// put building back on queue
			var newQueue = new Array();
			newQueue.push(building);
			for(var i = 0; i < IAB.queue.length; i++) {
				newQueue.push(IAB.queue[i]);	
			}			
			IAB.queue = newQueue;
		}
		IkaTools.setVal('autoBuildLastBuilt', false);
		IAB.groupQueueByCity();
		IAB.saveData();
		IAB.drawQueue();
	},
	saveData:function() {
		IkaTools.setVal('autoBuildQueue', IAB.queue);
		IkaTools.setVal('autoUpgrades', IAB.upgrades);
		IkaTools.setVal('buildStack', IAB.buildStack);
		IAB.loadData();
	},
	saveOptions:function() {
		IkaTools.setVal('autoBuildMinDelay', $('#autoBuildOptionMinDelay')[0].value);
		IkaTools.setVal('autoBuildMaxDelay', $('#autoBuildOptionMaxDelay')[0].value);
		IkaTools.setVal('autoBuildFilterByCity', $('#autoBuildFilterByCity')[0].value);
		IkaTools.setVal('autoBuildSmartChecking', $('#autoBuildSmartChecking')[0].checked ? 'yes' : 'no');
		IAB.autoDisable($('#autoBuildAutoDisable')[0].checked);
		IAB.highlightRows($('#autoBuildHighlightRows')[0].checked);
		IAB.updateProcessTime();
		IAB.drawQueue();
	},
	smartCheck:function() {
		if(IAB.isEnabled()) {
			// generate smart check stack			
			IAB.smartCheckStack = [];				
			// check for first build request in each city
			var cities = IkaTools.getCities();
			for(var i = 0; i < cities.length; i++) {			//	check queue
				var foundInQueue = false;
				for(var x = 0; x < IAB.queue.length; x++) {
					if(IAB.queue[x].cityId.toString() == cities[i].id.toString()) {
						var building = IAB.queue[x];
						building.requestOrigin = 'queue';
						IAB.smartCheckStack.push(building);
						foundInQueue = true;
						x = IAB.queue.length;	// continue
					}
				}
				if(!foundInQueue &&  IAB.autoUpgradeIsEnabled()) { // check auto build requests
					for(var x = 0; x < IAB.upgrades.length; x++) {
						if(IAB.upgrades[x].cityId.toString() == cities[i].id.toString()) {
							var building = IAB.upgrades[x];
							building.requestOrigin = 'upgrades';
							IAB.smartCheckStack.push(building);
							x = IAB.upgrades.length;
						}
					}
				}
			}				
			// check smart check stack
			for(var i = 0; i < IAB.smartCheckStack.length; i++) {
				var building = IAB.smartCheckStack[i];
				var city = IkaTools.getCityById(building.cityId);
				if(!IkaTools.cityGetBuildBuilding(city) && IkaTools.buildingGetResourceMissingTotal(building) == 0) {
					IkaTools.setVal('autoBuildProcessTime', "0");
				}
			}
			setTimeout(IAB.smartCheck,30000);
		}
	},
	sortUpgrades:function() {
		var upgrades = IAB.getAutoUpgrades();
		var sortArray = new Array();
		for(var i = 0; i < upgrades.length; i++) {
			var amount = parseInt(IkaTools.buildingGetResourceMissingTotal(upgrades[i]));
			var empty = false;
			while(!empty) {
				if(typeof(sortArray[amount]) == 'undefined') {
					sortArray[amount] = upgrades[i];
					empty = true;
				}
				amount += 1;
			}
		}
		array = sortArray;
		var duplicateKeys = new Array();
		var keys = new Array();
		for(k in array) {
			keys.push(parseInt(k));
		}
		keys.sort(function(a,b){return a - b});
		var newUpgrades = new Array();
		for(var i = 0; i < keys.length; i++) {
			// check duplicate keys
			for(var x = 0; x < duplicateKeys.length; x++) {
					
			}
			newUpgrades.push(array[keys[i]]);
		}
		IAB.upgrades = newUpgrades;
	},
	updateBuildings:function(buildings) {	// takes a list of buildings stored in auto build and makes sure they are still valid in IkaTools
		var newArray = new Array();
		for(var i = 0; i < buildings.length; i++) {
			var building = IkaTools.cityGetBuildingByPosition(buildings[i].position, IkaTools.getCityById(buildings[i].cityId));
			if(building && building.type == buildings[i].type) {
				if(typeof(buildings[i].isUpgrade) != 'undefined') { building.isUpgrade = buildings[i].isUpgrade; }
				if(typeof(buildings[i].isAutoUpgrade) != 'undefined') { building.isAutoUpgragrade = buildings[i].isAutoUpgrade; }	
				if(typeof(buildings[i].missingResources) != 'undefined') { building.missingResources = buildings[i].missingResources; }	
				newArray.push(building);
			} else if(!IkaTools.cityGetBuildingByPosition(building.position, IkaTools.getCityById(building.cityId))) {
				newArray.push(buildings[i]);
			}
		}
		buildings = newArray;
		return buildings;
	},
	updateLastSeen:function() {
		var d = new Date();
		IkaTools.setVal('lastSeen', d.getTime());
	},
	updateProcessTime:function() {
		var d = new Date();
		var nextProcess =  d.getTime() + parseInt(IAB.getMinDelay() + (Math.random() * (IAB.getMaxDelay() - IAB.getMinDelay())));
		IkaTools.setVal('autoBuildProcessTime', nextProcess);
	},
	updateTimer:function() {
		try {
			if(IAB.isEnabled()) {
				var d = new Date();
				var delay = parseInt(IAB.getProcessTime() - d.getTime());
				if(delay >= 0) {
					if(Math.floor(delay / 1000) % 60 == 0)
						IAB.drawQueue();												
					$('#autoBuildCountdown').text(IkaTools.formatMilliseconds(delay));
					setTimeout(IAB.updateTimer, 1000);	
				} else {
					IAB.checkQueue();
					$('#autoBuildCountdown')[0].innerHTML = ' ';	
				}
			} else {
				$('#autoBuildCountdown')[0].innerHTML = ' ';
			}
		} catch(e) {}
	},
	useSmartChecking:function() {
		return (typeof(IkaTools.getVal('autoBuildSmartChecking')) == 'undefined' || IkaTools.getVal('autoBuildSmartChecking').toString() != 'yes') ? false : true;
	},
	views:{
		buildings_demolition:function() {
			var demolish = IkaTools.getVal('demolish');
			if(typeof(demolish.position) != 'undefined' && IkaTools.getCurrentPosition() == demolish.position && demolish.cityId == ExMachina.currentCityId) {
				if(demolish.level.toString() == '1')
					IkaTools.setVal('demolish', false);
				IkaTools.goTo($('#demolition .content a')[0].href);
			}
		},
		buildingGround:function() {
			// make sure there isn't already something queued
			var queue = IAB.getQueue();
			var buildingQueued = false;
			for(var i = 0; i < queue.length; i++) {
				buildingQueued = (queue[i].cityId == ExMachina.currentCityId && queue[i].position == IkaTools.getCurrentPosition()) ? true : buildingQueued;
			}
			if(!buildingQueued) {
				var buildings = $('#buildings li.building');
				for(var i = 0; i < buildings.size(); i++) {
					var type = buildings[i].className.replace(/building\s/, '');
					var buttonAddToQueue = document.createElement('input');
					buttonAddToQueue.type = "button";
					buttonAddToQueue.className = "button autoBuildAddToQueue";
					buttonAddToQueue.value = IkaTools.getText('autoBuild', 'addToQueue', "Add to Queue");
					buttonAddToQueue.name = type;
					buttonAddToQueue.title = $('h4', buildings[i]).text();
					buttonAddToQueue.addEventListener('click', function() {
						this.blur();
						// get resources
						var resources = {wood:0, wine:0, marble:0, glass:0, sulfur:0, time:''};
						var elems = $('#buildings .building');
						for(var i = 0; i < elems.size(); i++) {
							var type = elems[i].className.replace(/building\s/, '');	
							if(type == this.name) {
								var costs = $('.costs .resources li', elems[i]);
								for(var x = 0; x < costs.size(); x++) {
									var resource = costs[x].className.replace(/\s.*$/, '');
									var cost = costs[x].innerHTML.toString().replace(/<span.*?<\/span>\s*/, '');
									resources[resource] = cost;
								}
							}
						}
						IAB.addFutureBuildingToQueue(this.name, this.title, resources);
						// hide add to queue buttons
						$('.autoBuildAddToQueue').each(function() {
							this.style.visibility = "hidden";									
						});
					}, false);
					var p = $('.cannotbuild', buildings[i])
					if(p.size() == 1) {
						p[0].appendChild(buttonAddToQueue);
					} else {
						buttonAddToQueue.setAttribute('style', 'padding-'+IkaRTL.txtLeft+':3px; padding-'+IkaRTL.txtRight+':3px; display:block; '+IkaRTL.txtLeft+':550px; position:absolute; top:75px; width:111px;');
						var elem = $('.centerButton', buildings[i]);
						elem[0].appendChild(buttonAddToQueue);
					}	
				}
			} else {
				var queuedBuilding = IAB.getBuildingInQueueByPosition(IkaTools.getCurrentPosition());
				var buildings = $('#buildings li.building');
				for(var i = 0; i < buildings.size(); i++) {
					var type = buildings[i].className.replace(/building\s/, '');
					if(type == queuedBuilding.type) {
						var notice = document.createElement('div');
						notice.innerHTML = "Building in queue";
						notice.setAttribute('style', 'font-weight:bold; ');
						var p = $('.cannotbuild', buildings[i])
						if(p.size() == 1) {
							p[0].appendChild(notice);
							notice.setAttribute('style', 'text-align:center; font-weight:bold;');
						} else {
							notice.setAttribute('style', 'text-align:center; font-weight:bold; padding-'+IkaRTL.txtLeft+':3px; padding-'+IkaRTL.txtRight+':3px; display:block; '+IkaRTL.txtLeft+':370px; position:absolute; top:85px; width:111px;');
							var elem = $('.centerButton', buildings[i])[0];
							elem.appendChild(notice);
							$('.centerButton a').attr('style', 'visibility:hidden');
						}	
					}
				}
			}
		},
		city:function() {
			// draw ghost building images for queued buildings
			var building;
			for(var i = 1; i < 15; i++) {
				if($('#position' + i).attr('class').match(/buildingGround/)) {
					if(building = IAB.getBuildingInQueueByPosition(i)) {
						$('#position' + i).attr('class', $('#position' + i).attr('class').replace(/buildingGround/, building.type));
						$('#position' + i + ' .flag').attr('class', 'buildingimg');
						$('#position' + i + ' .buildingimg').attr('style', 'opacity:.5;');
						$('#position' + i + ' a').attr('title', building.name + ' in auto build queue');
					}
				}
			}
			// insert add all buildings to auto upgrade button
			var cityViewId = document.location.toString().match(/id=(\d+)/);
			if(!cityViewId || cityViewId[1] == IkaTools.getCurrentCity().id) {
				$('#information .content')[0].innerHTML += '<div style="text-align:center"><input id="autoBuildUpgradeAllButton" type="button" class="button" value="'+IkaTools.getText('autoBuild', 'AutoUpgradeAll', "Auto Upgrade All")+'" title="'+IkaTools.getText('autoBuild', 'AutoUpgradeAllTxt', "Add all buildings in this city to the auto upgrade list")+'"/></div>';
				$('#autoBuildUpgradeAllButton')[0].addEventListener('click', function() {
					this.blur();
					var upgrades = IAB.getAutoUpgrades();
					for(var i = 0; i < 15; i++) {
						if(building = IkaTools.cityGetBuildingByPosition(i)) {
							var inUpgrades = false;
							for(var x = 0; x < upgrades.length; x++)
								if(building.position == upgrades[x].position && building.cityId == upgrades[x].cityId)
									inUpgrades = true;
							if(!inUpgrades)
								IAB.addToAutoUpgrades(building)
						}
					}
					IAB.drawQueue();
				}, false);
			}
		},
		options:function() {	
			var content = document.createElement('div');
			var delayOptions = '<option value="300000">5 ' + IAB.getText('options').minutes + '<options>\
								<option value="600000">10 ' + IAB.getText('options').minutes + '<options>\
								<option value="900000">15 ' + IAB.getText('options').minutes + '<options>\
								<option value="1200000">20 ' + IAB.getText('options').minutes + '<options>\
								<option value="1800000">30 ' + IAB.getText('options').minutes + '<options>\
								<option value="2700000">45 ' + IAB.getText('options').minutes + '<options>\
								<option value="3600000">1 ' + IAB.getText('options').hour + '<options>\
								<option value="7200000">2 ' + IAB.getText('options').hours + '<options>\
								<option value="14400000">4 ' + IAB.getText('options').hours + '<options>';
			content.innerHTML = '<a name="autoBuild"></a><h3><a href="http://userscripts.org/scripts/show/80545" target="_blank">Ikariam Auto Build' + 
								' </a> <span style="font-weight:normal;"> ' + IAB.getText('options').by + ' <a href="http://userscripts.org/users/PhasmaExMachina" target="_blank">PhasmaExMachina</a></span></h3>' + 
								'<table cellspacing="0" cellpadding="0">\
									<tbody><tr>\
											  <th>' + IAB.getText('options').labels.show + '</th>\
											  <td><select id="autoBuildFilterByCity"><option value="no">' + IAB.getText('options').show.allCities + '</option>\
													<option value="yes"' + (IkaTools.getVal('autoBuildFilterByCity') == 'yes' ? ' selected' : '') + '>' + IAB.getText('options').show.currentCity + '</option>\
												</select></td></tr><tr>\
									  <th>' + IAB.getText('options').labels.reCheckEvery + '</th>\
									  <td><select id="autoBuildOptionMinDelay"><option value="60000">1 ' + IAB.getText('options').minute + '</option>' + delayOptions + '</select>\
									  to <select id="autoBuildOptionMaxDelay">' + delayOptions + '<option value="21600000">6 ' + IAB.getText('options').hours + '</option></select></td>\
									</tr>\
									<tr><th>' + IAB.getText('options').labels.smartChecking + '</th><td>\
										<input id="autoBuildSmartChecking" type="checkbox" ' + (IAB.useSmartChecking() ? 'checked' : '') + 
											'/> ' + IAB.getText('options').descriptions.smartChecking + ' <img src="' + IAB.icons.help + '" style="cursor:help;" onclick="alert(\''+ IAB.getText('options').help.smartChecking + '\');" />\
									</td></tr>\
									<tr><th>' + IAB.getText('options').labels.autoDisable + '</th><td>\
										<input id="autoBuildAutoDisable" type="checkbox" ' + (IAB.autoDisable() ? 'checked' : '') + 
											'/> ' + IAB.getText('options').descriptions.autoDisable + ' <img src="' + IAB.icons.help + '" style="cursor:help;" onclick="alert(\'' + IAB.getText('options').help.autoDisable + '\');" />\
									</td></tr>\
									<tr><th>' + IAB.getText('options').labels.highlightRows + '</th><td>\
										<input id="autoBuildHighlightRows" type="checkbox" ' + (IAB.highlightRows() ? 'checked' : '') +
											'/> ' + IAB.getText('options').descriptions.highlightRows + '\
									</td></tr>\
									<tr><th> </th><td>\
										<input type="button" class="button" id="autoBuildScriptUpdates" value="' + IAB.getText('options').updatesAndHistory + '"/>\
									</td></tr>\
								  </tbody></table>'; 
			if (IkaTools.addOptionBlock(content))
			{
  			$('#autoBuildOptionMinDelay')[0].addEventListener('change', function() {
  				var maxSelect = document.getElementById('autoBuildOptionMaxDelay');
  				maxSelect.selectedIndex = maxSelect.selectedIndex <= this.selectedIndex ? this.selectedIndex : maxSelect.selectedIndex;
  			}, false);
  			$('#autoBuildOptionMaxDelay')[0].addEventListener('change', function() {
  				var minSelect = document.getElementById('autoBuildOptionMinDelay');
  				minSelect.selectedIndex = minSelect.selectedIndex >= this.selectedIndex ? this.selectedIndex : minSelect.selectedIndex;
  			}, false);
  			// set min value
  			$('#autoBuildOptionMinDelay option').each(function(i) {
  				if(this.value == IAB.getMinDelay()) {
  					this.parentNode.selectedIndex = i;	
  					this.parentNode.value = this.value;
  				}
  			});
  			$('#autoBuildOptionMaxDelay option').each(function(i) {
  				if(this.value == IAB.getMaxDelay()) {
  					this.parentNode.selectedIndex = i;	
  					this.parentNode.value = this.value;
  				}
  			});
  			$('#autoBuildScriptUpdates')[0].addEventListener('click', function() {
  				this.blur();
  				ScriptUpdater.forceNotice(ScriptUpdater.scriptId, ScriptUpdater.scriptCurrentVersion);
  			}, false);
  			var saveChanges = ["autoBuildOptionMinDelay", "autoBuildOptionMaxDelay", "autoBuildFilterByCity", "autoBuildSmartChecking", "autoBuildAutoDisable", "autoBuildHighlightRows"];
  			for(var i = 0; i < saveChanges.length; i++) {
  				$('#' + saveChanges[i])[0].addEventListener('change', IAB.saveOptions, false);
  			}
  			//--------------------- show all buildings or just current city ----------------------------------------
  			var contentBuildings = document.createElement('div');
  			contentBuildings.innerHTML = '<h3>Auto Build</h3>' + 
  										'<table cellspacing="0" cellpadding="0">\
  											<tbody> </tbody></table>';
			}
		},
		unitdescription:function() {
			GM_addStyle('#mainview { position:relative; }');
			GM_addStyle('#unitdescription div.contentBox01h { width:680px; float:'+IkaRTL.txtLeft+'; top:40px; position:absolute; }');
			GM_addStyle('#unitdescription #container #unitRes { padding-top:0; }');
		},
		shipdescription:function() {
			GM_addStyle('#mainview { position:relative; min-height:550px; }');
			GM_addStyle('#shipdescription div.contentBox01h { width:680px; float:'+IkaRTL.txtLeft+'; top:40px; position:absolute; }');
			GM_addStyle('#shipdescription #container #unitRes { padding-top:0; }');
		}
	},
	text:{
		en:{
			addToQueue:'Add To Queue',
			autoBuild:'Auto Build',	// name of script
			demolishConfirm:'Do you want to completely demolish this building?',
			options:{
				by:'by',	// used in "Auto Build by PhasmaExMachina"
				descriptions:{
					smartChecking:'use smart checking',
					autoDisable:'disable if script is off for a long time',
					highlightRows:'highlight alternate rows in Auto Build info box',
				},
				help:{
					smartChecking:'Smart checking will automatically check every 30 seconds to see if something in the queue or auto build list can be built. This happens without hitting the game servers.',
					autoDisable:'This feature will attempt to disable auto build in case the script has not been run in a long time which can be useful if you play on multiple computers. For example, if you play on one computer all day, then come back to another computer, the queue on the second computer may not be what you want anymore, so you don\\\'t want it to process before having a chance to update it.',
				},
				hour:'hour',
				hours:'hours',
				labels:{
					show:'Show',
					reCheckEvery:'Re-check auto build every',
					smartChecking:'Smart Checking',
					autoDisable:'Auto Disable',
					highlightRows:'Highlight Rows',
				},
				minute:'minute',
				minutes:'minutes',
				show:{
					allCities:'All buildings in all cities',
					currentCity:'Only buildings in current city',
				},
				updatesAndHistory:'Script Updates & History',
				v:'v',	// used to label version number (e.g. "v0.36")
			},
			queue:{			
				autoUpgrade:'Auto Upgrade',
				change:'change',
				clearAll:'clear all',
				clearAllDesc:'Remove all buildings from auto build queue',
				downInQueue:'up in queue', // used in "Move [building name] down in queue"
				emptyNotice:'The auto build queue is empty.',
				enableAutoBuild:'Enable auto build',
				enableDisableAutoUpgrades:'Enable / disable auto upgrades for all cities',
				expandOrCollapse:{
					autoBuild:'Expand or collapse auto build',
					autoUpgrades:'Expand or collapse auto upgrades',
				},
				fromAutoUpgrades:'from auto upgrades',	// used in "Remobe [building name] from auto upgrades"
				fromQueue:'from queue',	// used in "Remove [building name] from queue"
				move:'Move', // used in "Move [building name] up/down in queue"
				queue:'Queue',
				showing:{
					allCities:'Showing all cities',
					currentCity:'',
				},
				upInQueue:'up in queue', // used in "Move [building name] up in queue"
				remove:'Remove', // used in "Remove [building name] from ..."
				timeUntilNextDesc:'Time until next auto build check (click to now)',
			},
		},
		el:{	// Greek
			addToQueue:'ÃƒÅ½Ã‚Â Ãƒ??Ãƒ?Ã…â€™Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â¸ÃƒÅ½Ã‚ÂµÃƒ?Ã†â€™ÃƒÅ½Ã‚Âµ Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â·ÃƒÅ½Ã‚Â½ ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Â¦Ãƒ??ÃƒÅ½Ã‚Â¬',
			autoBuild:'ÃƒÅ½Ã¢â‚¬ËœÃƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ Ãƒ?Ã¢â‚¬Â¡Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¿', // name of script
			demolishConfirm:'ÃƒÅ½Ã‚Â Ãƒ??ÃƒÅ½Ã‚Â¿Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Â¡ÃƒÅ½Ã‚Â®! ÃƒÅ½Ã‚Â Ãƒ??Ãƒ?Ã…â€™ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¹ ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â´ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã…Â¸ÃƒÅ½Ã¢â‚¬ÂºÃƒÅ½Ã…Â¸ÃƒÅ½Ã…Â¡ÃƒÅ½Ã¢â‚¬ÂºÃƒÅ½Ã¢â‚¬â€�ÃƒÅ½Ã‚Â¡ÃƒÅ½Ã‚Â©ÃƒÅ½Ã‚Â¤ÃƒÅ½Ã¢â€žÂ¢ÃƒÅ½Ã…Â¡ÃƒÅ½Ã¢â‚¬Ëœ ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ ÃƒÅ½Ã‚ÂºÃƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¯Ãƒ??ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â¿. ÃƒÅ½Ã¢â‚¬Â¢ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¹ Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Â¦Ãƒ??ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Å¡;',
			options:{
				by:'by', // used in "Auto Build by PhasmaExMachina"
				descriptions:{
				smartChecking:'ÃƒÅ½Ã‚Â§Ãƒ??ÃƒÅ½Ã‚Â·Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â½ ÃƒÅ½Ã‚Â­ÃƒÅ½Ã‚Â¾Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â¿ ÃƒÅ½Ã‚Â­ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â³Ãƒ?Ã¢â‚¬Â¡ÃƒÅ½Ã‚Â¿',
				autoDisable:'ÃƒÅ½Ã¢â‚¬ËœÃƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚ÂµÃƒ??ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â·Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ script ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â½ ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¹ ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚ÂµÃƒ??ÃƒÅ½Ã‚Â³Ãƒ?Ã…â€™ ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â± Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â»Ãƒ?? Ãƒ?Ã…Â½Ãƒ??ÃƒÅ½Ã‚Â±',
				highlightRows:'highlight alternate rows in Auto Build info box',
				},
				help:{
					smartChecking:'ÃƒÅ½Ã…Â¸ ÃƒÅ½Ã‚Â­ÃƒÅ½Ã‚Â¾Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã‚Â­ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â³Ãƒ?Ã¢â‚¬Â¡ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã‚Â¸ÃƒÅ½Ã‚Â± Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã†â€™ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â¬Ãƒ??ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹ ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â¬ÃƒÅ½Ã‚Â¸ÃƒÅ½Ã‚Âµ 30 ÃƒÅ½Ã‚Â´ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚ÂµÃƒ??Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â€šÂ¬Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â½ ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â¬Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¹ Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â·ÃƒÅ½Ã‚Â½ ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Â¦Ãƒ??ÃƒÅ½Ã‚Â¬ ÃƒÅ½Ã‚Â® Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â·ÃƒÅ½Ã‚Â½ ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Â¦ Ãƒ?Ã¢â‚¬Â¡Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¹Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã‚Â¼Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿Ãƒ??ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¯ ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â± Ãƒ?Ã¢â‚¬Â¡Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¹Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¯. ÃƒÅ½Ã¢â‚¬ËœÃƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¹ Ãƒ?Ã¢â‚¬Â¡Ãƒ?Ã¢â‚¬Â°Ãƒ??ÃƒÅ½Ã‚Â¯Ãƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â½Ãƒ?Ã¢â‚¬Â°ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Âµ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¡ server Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Â¦ Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Â¡ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â´ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â¿Ãƒ??.',
					autoDisable:'ÃƒÅ½Ã¢â‚¬ËœÃƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â® ÃƒÅ½Ã‚Â· ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â® ÃƒÅ½Ã‚Â¸ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚ÂµÃƒ??ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¯ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ Ãƒ?Ã¢â‚¬Â¡Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¿ Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â·ÃƒÅ½Ã‚Â½ Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚ÂµÃƒ??ÃƒÅ½Ã‚Â¯Ãƒ?Ã¢â€šÂ¬Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã¢â‚¬Â°Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â· Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Â¦ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ script ÃƒÅ½Ã‚Â´ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â½ ÃƒÅ½Ã‚Â­Ãƒ?Ã¢â‚¬Â¡ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹ Ãƒ?Ã¢â‚¬Å¾Ãƒ??ÃƒÅ½Ã‚Â­ÃƒÅ½Ã‚Â¾ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹ ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚Â±Ãƒ??ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ Ãƒ?Ã¢â‚¬Â¡Ãƒ??Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â¿, Ãƒ?Ã¢â€šÂ¬Ãƒ??ÃƒÅ½Ã‚Â¬ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â± Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â¿ ÃƒÅ½Ã‚Â¼Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿Ãƒ??ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¯ ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¹ Ãƒ?Ã¢â‚¬Â¡Ãƒ??ÃƒÅ½Ã‚Â®Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¿ ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â½ Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â¶ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Å¡ Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¿Ãƒ??Ãƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã‚Â´ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â ÃƒÅ½Ã‚Â¿Ãƒ??ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â¿Ãƒ??Ãƒ?Ã¢â‚¬Å¡ Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¹Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â­Ãƒ?Ã¢â‚¬Å¡. ÃƒÅ½Ã¢â‚¬Å“ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â± Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â±Ãƒ??ÃƒÅ½Ã‚Â¬ÃƒÅ½Ã‚Â´ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â½ Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â¶ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Å¡ Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ ÃƒÅ½Ã‚Â­ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â½ Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¹Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â® ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â­Ãƒ??ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¹ ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¬ Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¡ Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ ÃƒÅ½Ã‚Â­ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â½ ÃƒÅ½Ã‚Â¬ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¿ ÃƒÅ½Ã‚Â· Ãƒ?Ã†â€™ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹Ãƒ??ÃƒÅ½Ã‚Â¬ Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Â¦ ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¯Ãƒ?Ã¢â‚¬Â¡ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â ÃƒÅ½Ã‚Â®Ãƒ?Ã†â€™ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹ Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â½ Ãƒ?Ã¢â€šÂ¬Ãƒ??Ãƒ?Ã…Â½Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ ÃƒÅ½Ã‚Â¼Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿Ãƒ??ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¯ ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â· Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¾Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â·Ãƒ??ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¯ Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â±, ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¹ ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â· ÃƒÅ½Ã‚Â¸ÃƒÅ½Ã‚Â­ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â± Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Â¦ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Â¡ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹ ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚Â¹Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Â¡Ãƒ??ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹.',
				},
				hour:'ÃƒÅ½?Ãƒ??ÃƒÅ½Ã‚Â±',
				hours:'ÃƒÅ½?Ãƒ??ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Å¡',
				labels:{
					show:'ÃƒÅ½Ã¢â‚¬Â¢ÃƒÅ½Ã‚Â¼Ãƒ?Ã¢â‚¬Â ÃƒÅ½Ã‚Â¬ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â¹Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ',
					reCheckEvery:'ÃƒÅ½Ã¢â‚¬Â¢Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â­ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¾ÃƒÅ½Ã‚Âµ ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ Ãƒ?Ã¢â‚¬Â¡Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¿ ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â¬ÃƒÅ½Ã‚Â¸ÃƒÅ½Ã‚Âµ',
					smartChecking:'ÃƒÅ½Ã‹â€ ÃƒÅ½Ã‚Â¾Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã‚Â­ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â³Ãƒ?Ã¢â‚¬Â¡ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Å¡',
					autoDisable:'ÃƒÅ½Ã¢â‚¬ËœÃƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â· ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚ÂµÃƒ??ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â·Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â·',
					highlightRows:'Highlight Rows',
				},
				minute:'ÃƒÅ½Ã¢â‚¬ÂºÃƒÅ½Ã‚ÂµÃƒ?Ã¢â€šÂ¬Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™',
				minutes:'ÃƒÅ½Ã¢â‚¬ÂºÃƒÅ½Ã‚ÂµÃƒ?Ã¢â€šÂ¬Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¬',
				show:{
					allCities:'ÃƒÅ½Ã…â€™ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â± Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚ÂºÃƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¯Ãƒ??ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â± Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Å¡ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Å¡ Ãƒ?Ã¢â€šÂ¬Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Å¡',
					currentCity:'ÃƒÅ½Ã…â€œÃƒ?Ã…â€™ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â¿ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚ÂºÃƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¯Ãƒ??ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â± Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â® Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â·ÃƒÅ½Ã‚Â½ Ãƒ?Ã¢â€šÂ¬Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â·',
				},
				updatesAndHistory:'Script Updates & History',
				v:'v', // used to label version number (e.g. "v0.36")
			},
			queue:{
				autoUpgrade:'ÃƒÅ½Ã¢â‚¬ËœÃƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â· ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â²ÃƒÅ½Ã‚Â¬ÃƒÅ½Ã‚Â¸ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¹Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â·',
				change:'ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â®',
				clearAll:'ÃƒÅ½Ã‚Â´ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â³Ãƒ??ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â ÃƒÅ½Ã‚Â® Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â»Ãƒ?Ã¢â‚¬Â°ÃƒÅ½Ã‚Â½',
				clearAllDesc:'ÃƒÅ½Ã¢â‚¬ËœÃƒ?Ã¢â‚¬Â ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¯Ãƒ??ÃƒÅ½Ã‚ÂµÃƒ?Ã†â€™ÃƒÅ½Ã‚Âµ Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â± Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â± Ãƒ?Ã¢â‚¬Â¡Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¹Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â€šÂ¬Ãƒ?Ã…â€™ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â·ÃƒÅ½Ã‚Â½ ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â· ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â± Ãƒ?Ã¢â‚¬Â¡Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¹Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Å¡',
				downInQueue:'up in queue', // used in "ÃƒÅ½Ã…â€œÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â·Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ [building name] ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚Â¸ÃƒÅ½Ã‚Â­Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â· ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â¬Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã¢â‚¬Â° Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â· ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â±"
				emptyNotice:'ÃƒÅ½Ã¢â‚¬â€� ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Â¦ Ãƒ?Ã¢â‚¬Â¡Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¹Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¹ ÃƒÅ½Ã‚Â¬ÃƒÅ½Ã‚Â´ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â±.',
				enableAutoBuild:'ÃƒÅ½Ã¢â‚¬Â¢ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚ÂµÃƒ??ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â·Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ Ãƒ?Ã¢â‚¬Â¡Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¿',
				enableDisableAutoUpgrades:'ÃƒÅ½Ã¢â‚¬Â¢ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚ÂµÃƒ??ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â·Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ / ÃƒÅ½Ã¢â‚¬ËœÃƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚ÂµÃƒ??ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â·Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ Ãƒ?Ã¢â‚¬Â¡Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¿ ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â± Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Å¡ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Å¡ Ãƒ?Ã¢â€šÂ¬Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Å¡',
				expandOrCollapse:{
					autoBuild:'ÃƒÅ½Ã…â€œÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¹Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â·Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ ÃƒÅ½Ã‚Â® ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â¡ÃƒÅ½Ã‚Â¹Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â· ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Â¦ Ãƒ?Ã¢â‚¬Â¡Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¹Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Å¡',
					autoUpgrades:'ÃƒÅ½Ã…â€œÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¹Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â·Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ ÃƒÅ½Ã‚Â® ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â¡ÃƒÅ½Ã‚Â¹Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â²ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¸ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Å¡',
				},
				fromAutoUpgrades:'ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â€šÂ¬Ãƒ?Ã…â€™ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â²ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¸ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Å¡', // used in "ÃƒÅ½Ã¢â‚¬ËœÃƒ?Ã¢â‚¬Â ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¯Ãƒ??ÃƒÅ½Ã‚ÂµÃƒ?Ã†â€™ÃƒÅ½Ã‚Âµ [building name] ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â€šÂ¬Ãƒ?Ã…â€™ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â²ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¸ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Å¡"
				fromQueue:'ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â€šÂ¬Ãƒ?Ã…â€™ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â· ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â±', // used in "ÃƒÅ½Ã¢â‚¬ËœÃƒ?Ã¢â‚¬Â ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¯Ãƒ??ÃƒÅ½Ã‚ÂµÃƒ?Ã†â€™ÃƒÅ½Ã‚Âµ [building name] ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â€šÂ¬Ãƒ?Ã…â€™ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â·ÃƒÅ½Ã‚Â½ ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â±"
				move:'ÃƒÅ½Ã…â€œÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â·Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ', // used in "ÃƒÅ½Ã…â€œÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â·Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ [building name] Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¬ÃƒÅ½Ã‚Â½Ãƒ?Ã¢â‚¬Â°/ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â¬Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã¢â‚¬Â° Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â· ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â±"
				queue:'ÃƒÅ½Ã¢â‚¬â„¢ÃƒÅ½Ã‚Â¬ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Âµ Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â· ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â±',
				showing:{
					allCities:'ÃƒÅ½Ã…â€™ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â¹ Ãƒ?Ã¢â€šÂ¬Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Å¡',
					currentCity:'ÃƒÅ½Ã‚Â¤Ãƒ??ÃƒÅ½Ã‚Â­Ãƒ?Ã¢â‚¬Â¡ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â± Ãƒ?Ã¢â€šÂ¬Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â·',
				},
				upInQueue:'ÃƒÅ½Ã‚Â ÃƒÅ½Ã‚Â¬ÃƒÅ½Ã‚Â½Ãƒ?Ã¢â‚¬Â° Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â· ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â±', // used in "ÃƒÅ½Ã…â€œÃƒÅ½Ã‚ÂµÃƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â·Ãƒ?Ã†â€™ÃƒÅ½Ã‚Âµ [building name] ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚Â¸ÃƒÅ½Ã‚Â­Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â· Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¬ÃƒÅ½Ã‚Â½Ãƒ?Ã¢â‚¬Â° Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â· ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â±"
				remove:'ÃƒÅ½Ã¢â‚¬ËœÃƒ?Ã¢â‚¬Â ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¯Ãƒ??ÃƒÅ½Ã‚ÂµÃƒ?Ã†â€™ÃƒÅ½Ã‚Âµ', // used in "ÃƒÅ½Ã¢â‚¬ËœÃƒ?Ã¢â‚¬Â ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¯Ãƒ??ÃƒÅ½Ã‚ÂµÃƒ?Ã†â€™ÃƒÅ½Ã‚Âµ [building name] ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â€šÂ¬Ãƒ?Ã…â€™ ..."
				timeUntilNextDesc:'ÃƒÅ½Ã‚Â¥Ãƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â€šÂ¬Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Å¡ Ãƒ?Ã¢â‚¬Â¡Ãƒ??Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â¿Ãƒ?Ã¢â‚¬Å¡ ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â­Ãƒ?Ã¢â‚¬Â¡Ãƒ??ÃƒÅ½Ã‚Â¹ Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â½ ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â€šÂ¬Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â¿ ÃƒÅ½Ã‚Â­ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â³Ãƒ?Ã¢â‚¬Â¡ÃƒÅ½Ã‚Â¿ ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Â¦Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…â€™ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ Ãƒ?Ã¢â‚¬Â¡Ãƒ?Ã¢â‚¬Å¾ÃƒÅ½Ã‚Â¯Ãƒ?Ã†â€™ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¿ (ÃƒÅ½Ã…Â¡ÃƒÅ½Ã‚Â¬ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Âµ ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Âº ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â± ÃƒÅ½Ã‚ÂµÃƒ?Ã¢â€šÂ¬ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â­ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¾ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹Ãƒ?Ã¢â‚¬Å¡ Ãƒ?Ã¢â‚¬Å¾Ãƒ?Ã…Â½Ãƒ??ÃƒÅ½Ã‚Â±)',
			},			
		}
	}
}  

IkaNotify = {
	backendUrl:'',
	email:"",
	emailKey:"",
	timerRunning:false,
	// notice types
	events:{
		attack:"Incoming Attack",
		movements:"Troop/Resource Movements",
		advCities:"Town Adviser",
		advMilitary:"Military Adviser",
		advResearch:"Research Adviser",
		advDiplomacy:"Diplomacy Adviser",
		construction:"Building Completion",
	},
	notices:{
		growl:{
			name:isChrome ? 'Desktop Notifications' : 'Growl', 
			icon:isChrome ? false : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACU0lEQVQ4jW2Sz0tUURTHP0+nkhbRlbKcEuJpYC3fuZQUbQpp07LRXVI07/UXpIFQQQupaBMR7/oX9ANaBFLMLFveM7swF/MWbiQUXxgyBum0mOePrAuHy/lyzpfzPecbiGjAvicCQFtVAdmG/6kDKInshyKg0QaGwT8Avgm8VpEfQhRAo6gBaNAtkgbQTyeW2rC0zXR9YqL3cav15RpLHy+Uy+VPEKxDtGeSfrp2k0YxshrQ46BvarXahyRJSL1ctdZPb9f9JWEPOAz+kaqeAy2BzAEHIQUs1aqveM9ziBb3ExSMem9qanQcRqnVZrCW8z5VOkNBVOUkcAZY7PTMAkIJCKyN2sDLLKvPNZvN6TSRK0TgPUzGSo7iEKzVgTRVEpEuDyPA1yCO23Q2q32qfkTQ+6CXnUIsAigKeBdDxPzoaPbWGDM0NjY2Xqvlz0oWAo/eBZ6IaJ8FxAp2R6VgvRbX5Vye1x+GuZBlGcasXix5GoODg/lUpVJp5TkrEf7YbKoAVFMprg2ziTLjFCOQOAGaoKyXrI2+Azfq9XwFpFfxk171NgLVwoWpB+e02DWoKlVh472ZetUF/IRoXiRaBhYguWMlfpEmuxbdlQNxLIiQP62PJXl+8zPOtQPVToRhCBiMMQfCMLzlYlFVWW+3403n5LeLZdU5eSfCJTCIxBTN4P1sUK/PlLIsOwQcLvxxGhgK4YgRtjJlOYcFYA34ValU1nBOAxHpBnqAo7BjmLNACJwCysU/AAwVcQLoKQkRxhiMMZtAC9go5O71fPAfDGPM1h/Dl/gvBGMOdQAAAABJRU5ErkJggg%3D%3D',
			checkedByDefault:false,
			test:function() {
				Growler.growl('test', "Test Message - " + document.domain.replace(/\.ikariam\..+$/, ''), isChrome ? "Desktop notification is working correctly!" :  "Growl is working correctly!" );
			},
			send:function(eventType, message) {
				Growler.growl(eventType, IkaNotify.events[eventType] + "  - " + document.domain.replace(/\.ikariam\..+$/, ''), message);
			}
		},
		popup:{
			name:'Alert', 
			checkedByDefault:false,
			test:function() {
				alert("This is a test popup notification");
			},
			send:function(eventType, message) {
				alert(IkaNotify.events[eventType] + "\n\n" + message);
			}
		},
	},
	init:function() {
		IkaNotify.backendUrl = Config.get('emailNoticeUrl');
		
		// register with growl
		for(var e in IkaNotify.events) {
			Growler.addNoticeType(e, IkaNotify.events[e]);
		}
		Growler.addNoticeType('test', 'Test Notice', false);
		Growler.register("Ikariam ExMachina", "http://i763.photobucket.com/albums/xx278/PhasmaExMachina/icon.png");
		
		IkaNotify.email = (typeof(IkaTools.getVal('email')) == 'undefined' || IkaTools.getVal('email').toString() == '[object Object]') ? "" : IkaTools.getVal('email').toString();
		IkaNotify.emailKey = (typeof(IkaTools.getVal('emailKey')) == 'undefined' || IkaTools.getVal('emailKey').toString() == '[object Object]') ? "" : IkaTools.getVal('emailKey').toString();
		IkaNotify.monitorAttacks = (typeof(IkaTools.getVal('monitorAttacks')) == 'undefined' || IkaTools.getVal('monitorAttacks').toString() == 'no') ? false : true;
		IkaNotify.showTimer = Config.get('ikaNotifyShowTimer');
		// process views if
		if(typeof(IkaNotify.views[IkaTools.getView()]) == 'function') {
			IkaNotify.views[IkaTools.getView()]();
		}
		// load building construction
		var d = new Date();
		IkaNotify.constructions = [];
		var cities = IkaTools.getCities();
		for(var i = 0; i < cities.length; i++) {
			var secondsLeft = IkaTools.cityGetBuildSecondsRemaining	(cities[i]);
			if(secondsLeft > 0) {
				IkaNotify.constructions.push({
					endTime:d.getTime() + (1000 * secondsLeft),
					building:IkaTools.cityGetBuildBuilding(cities[i]),
				});
			}
		}		
		IkaNotify.startTimer();		
		IkaNotify.checkForEvents();
		IkaTools.addMovementHandler(function(movement) {
			if (movement.direction && !movement.notified) {
				movement.notified = true;
				var action = movement.direction == 'left' ? ' returned to ' : ' arrived in ';
				var destination = movement.direction == 'left' ? movement.originCityName : movement.targetCityName;
				IkaNotify.sendNotice('movements', movement.mission + action + destination);
			}
		});
	},
	checkForEvents:function() {
		IkaNotify.checkAdvisers();
		// check for events
		var d = new Date();
		if(d.getTime() >= IkaNotify.getProcessTime()) {
			// check for attacks
			IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=militaryAdvisorMilitaryMovements', IkaNotify.checkForAttacksResult);
			IkaNotify.setNextProcessTime();
		}
	},
	checkForAttacksResult:function(result) {
		// check town advisor
		IkaNotify.checkAdvisers(result);
		$('#fleetMovements tr.hostile', result).each(function() {
			try {
				var id = $('td', this)[1].id.toString().replace(/^fleetRow/, '');
				var attack = new IkaNotify.attack(id);
				attack.units = $('td', this)[2].innerHTML.toString().match(/^.+?<div/i).toString().replace(/<div$/i, '');
				attack.originId = $('a', $('td', this)[3])[0].href.toString().match(/\d+$/).toString();
				attack.originCityName = $('a', $('td', this)[3])[0].innerHTML.toString();
				attack.originPlayerName = $('td', this)[3].innerHTML.toString().match(/\([^\)]+\)/).toString().replace(/^\(/, '').replace(/\)$/, '');
				attack.targetId = $('a', $('td', this)[7])[0].href.toString().match(/\d+$/).toString();
				attack.targetCityName = $('a', $('td', this)[7])[0].innerHTML.toString();
				attack.time =  $('td', this)[1].innerHTML;			
				attack.hours = parseInt(attack.time.toString().match(/^\d+/).toString());
				attack.minutes = parseInt(attack.time.toString().match(/\d+[^\d]*$/).toString().replace(/[^\d]*$/, ''));
				var d = new Date();
				attack.timestamp = d.getTime() + (attack.hours * (60*60*1000)) + (attack.minutes * (60*1000));
				if(!IkaNotify.attackAlreadyStored(attack)) {
					IkaNotify.storeAttack(attack);	
					IkaNotify.sendNotice('attack', attack.targetCityName + " is being attacked by " + attack.originCityName + " (" + attack.originPlayerName + ")!");
					// send email
					if(IkaNotify.isReadyToEmail()) {
						var url = IkaNotify.backendUrl + (IkaNotify.backendUrl.match(/\?/) ? '&' : '?') +  'ikaNotify=attack&email=' + IkaNotify.email + 
									'&emailKey=' + IkaNotify.emailKey  + 
									'&originId=' + attack.originId +
									'&originCityName=' + attack.originCityName +
									'&originPlayerName=' + attack.originPlayerName +
									'&targetId=' + attack.targetId +
									'&targetCityName=' + attack.targetCityName +
									'&time=' + attack.time +
									'&units=' + attack.units +
									'&domain=' + document.domain;
						GM_xmlhttpRequest ({
							method: "GET",
							url: url,
							headers: {"User-agent": "Mozilla/5.0", "Accept": "text/html"},
							onload: function (response){
								if(!IkaNotify.checkForEmailKeyError(response.responseText) && response.responseText != "attack") {
									IkaNotify.sayServerError();
								}
							}
						});
					}
				}
			} catch(e) { }
		});
	},
	checkAdvisers:function(root) {
		root = typeof(root) == 'undefined' ? document.body : root;
		if($('#advCities', root).size() == 1) {
			IkaNotify.checkAdviser('advCities', root);
			IkaNotify.checkAdviser('advMilitary', root);
			IkaNotify.checkAdviser('advResearch', root);
			IkaNotify.checkAdviser('advDiplomacy', root);
		}
	},
	checkAdviser:function(type, root) {
		if($('#' + type + ' a', root).attr('class') != 'normal') {
			if(typeof(IkaTools.getVal(type + '_isActive')) != 'undefined' && IkaTools.getVal(type + '_isActive').toString() != "yes") {
				IkaNotify.sendNotice(type, "The " + IkaNotify.events[type] + " has something to say!");	
				IkaTools.setVal(type + '_isActive', 'yes');
			}				
		} else
			IkaTools.setVal(type + '_isActive', 'no');
	},
	startTimer:function() {
    GM_addStyle('#IkaNotifyTimerWrapper a {font: bold 11px Arial,Helvetica,sans-serif !important;}');
		if(!IkaNotify.timerRunning) {
			IkaNotify.timerRunning = true;
			var li = document.createElement('li');
				li.id = "IkaNotifyTimerWrapper";
				li.style.display = IkaNotify.showTimer ? 'inline' : 'none';
				li.innerHTML = '<a href="http://' + document.domain + '/index.php?view=options#ikaNotify">Notifier <span id="ikaNotifyTimer"></span> </a>';
			$('#GF_toolbar ul').append(li);
			setInterval(IkaNotify.updateTimer, 1000);		
		}
	},
	updateTimer:function() {
		var d = new Date();
		var delay = parseInt((IkaNotify.getProcessTime() - d.getTime()) / 1000);	
		if(delay > 0) {
			// check for building completion every 30 seconds
			if(delay % 30 == 0) {
				for(var i = 0; i < IkaNotify.constructions.length; i++) {
					if(d.getTime() >= IkaNotify.constructions[i].endTime) {
						var building = IkaNotify.constructions[i].building;
						var city = IkaTools.getCityById(building.cityId);
						IkaNotify.sendNotice('construction', 'Your ' + building.name + ' in ' + city.name + ' is now level ' + (parseInt(building.level) + 1));	
						// remove building from construction list
						var newConstructions = [];
						for(var x = 0; x < IkaNotify.constructions.length; x++) {
							if(IkaNotify.constructions[x].building.cityId != city.id)
								newConstructions.push(IkaNotify.constructions[x]);
						}
						IkaNotify.constructions = newConstructions;
					}						
				}
			}	
			$('#ikaNotifyTimer').text(IkaTools.formatSeconds(delay));
		} else {
			IkaNotify.checkForEvents();
		}
	},
	checkForEmailKeyError:function(txt) {
		if(txt == 'invalidEmailKey') {
			var c = confirm("The Ikariam Notify key you are using appears to be invalid.\n\nSend a new one to " + IkaNotify.email + "?");	
			if(c) {IkaNotify.sendKey(); }
			return true;
		}
		return false;
	},
	sayServerError:function(text) {
		alert("Ikariam Notifier is having trouble accessing the mail server.\n\nYou may want to disable it for a bit while things get worked out.\n\nResponse from server:\n\n" + (typeof(text) != 'undefined' ? text : ''));
	},
	sendKey:function() {
		$('.ikaNotifySendingKeyNotice').show();
		$('#ikaNotifyResendKey').hide();
		var url = IkaNotify.backendUrl + (IkaNotify.backendUrl.match(/\?/) ? '&' : '?') + 'ikaNotify=getEmailKey&email=' + IkaNotify.email;
		GM_xmlhttpRequest ({
			method: "GET",
			url: url,
			headers: {"User-agent": "Mozilla/5.0", "Accept": "text/html"},
			onload: function (response){
				if(response.responseText != "getEmailKey") {
					IkaNotify.sayServerError(response.responseText);
				} else {
					alert("A new key has been sent to " + IkaNotify.email + ".\n\nPlease check your email and enter the key on the Ikariam\nOptions page under the Ikariam Notifier section.");
				}
				$('.ikaNotifySendingKeyNotice').hide();
				$('#ikaNotifyResendKey').show();
			}
		})
	},
	sendTest:function() {
		var url = IkaNotify.backendUrl + (IkaNotify.backendUrl.match(/\?/) ? '&' : '?') + 'ikaNotify=test&email=' + IkaNotify.email + '&emailKey=' + IkaNotify.emailKey;
		GM_xmlhttpRequest ({
			method: "GET",
			url: url,
			headers: {"User-agent": "Mozilla/5.0", "Accept": "text/html"},
			onload: function (response){
				if(!IkaNotify.checkForEmailKeyError(response.responseText) && response.responseText != "test") {
					IkaNotify.sayServerError();
				} else {
					alert("A test email has been sent to " + IkaNotify.email);
				}
			}
		})
	},
	attack:function(id){
		this.id = id;
	},
	getAttacks:function() {
		var attacks = IkaTools.getVal('attacks');
		attacks = (typeof(attacks) != 'undefined' && typeof(attacks.length) == 'undefined') ? attacks : {};	
		var d = new Date();
		var newAttacks = {};
		for(x in attacks) {
			if(parseInt(attacks[x].timestamp) > d.getTime()) {
				newAttacks[attacks[x].id] = attacks[x];	
			}
		}
		return newAttacks;
	},
	storeAttack:function(attack) {
		var attacks = IkaNotify.getAttacks();
		attacks[attack.id] = attack;
		IkaNotify.saveAttacks(attacks);
	},
	saveAttacks:function(attacks) {
		IkaTools.setVal('attacks', attacks);
	},
	attackAlreadyStored: function(attack) {
		var attacks = IkaNotify.getAttacks();
		return typeof(attacks[attack.id]) == 'undefined' ? false : true;
	},
	views:{
		options:function() {
			var content = document.createElement('div');
			var delayOptions = '<option value="300000">5 minutes<options>\
								<option value="600000">10 minutes<options>\
								<option value="900000">15 minutes<options>\
								<option value="1200000">20 minutes<options>\
								<option value="1800000">30 minutes<options>\
								<option value="3600000">1 hour<options>\
								<option value="7200000">2 hours<options>\
								<option value="14400000">4 hours<options>';
			var validEmailInlineDisplay = IkaNotify.validateEmail(IkaNotify.email) ? 'inline' : 'none';

			var html = '<a name="ikaNotify"></a><h3><a href="http://userscripts.org/scripts/show/80545" target="_blank" title="More information about this script">Ikariam Notifier</a> \
							<span style="font-weight:normal">by <a href="http://userscripts.org/users/PhasmaExMachina" target="_blank">PhasmaExMachina</a></span></h3>\
							<table cellspacing="0" cellpadding="0"><tbody>\
								<tr><th>Check for events every</th>\
								  <td><select id="ikaNotifyMinDelay"><option value="60000">1 minute</option>' + delayOptions + '</select>\
								  to <select id="ikaNotifyMaxDelay">' + delayOptions + '<option value="21600000">6 hours</option></select></td>\
								</tr>\
								<tr valign="top"  style="border-top:1px dotted #F1D198"><th style="padding-top:15px;">Email Address</th><td><input type="text" id="ikaNotifyEmail" value="' + IkaNotify.email + '" style="width:200px;" title="All email alerts will be sent to this address"/>\
									  [ <a href="javascript:void(0)" id="ikaNotifySendTest" style="display:' + ((IkaNotify.emailKey != "" && IkaNotify.validateEmail(IkaNotify.email)) ? 'inline' : 'none') + '">test</a> ]\
									<br/><span style="font-style:italic">emails will only be sent for new attacks</span>\
								</td></tr>\
								<tr><th>Email Key</th><td><input type="text" id="ikaNotifyEmailKey" value="' + IkaNotify.emailKey + '" style="width:100px;" title="This key is used to prevent abuse of the notifier"/>\
									  <span class="ikaNotifySendingKeyNotice" style="display:none;">sending key ... please wait</span><a href="javascript:void(0)" id="ikaNotifyResendKey" style="display:' + validEmailInlineDisplay + '">' + (IkaNotify.emailKey != "" ? 'Resend' : 'Get') + ' Key</a>\
								</td></tr>';
				for(var notice in IkaNotify.notices) {
					var icon = (typeof(IkaNotify.notices[notice].icon) != 'undefined' && IkaNotify.notices[notice].icon != '' && IkaNotify.notices[notice].icon) ? '<img src="' + IkaNotify.notices[notice].icon + '" align="absmiddle" style="margin-'+IkaRTL.txtRight+':.5em;"/> ' : '';
					html += '<tr valign="top" style="border-top:1px dotted #F1D198"><th style="padding-top:9px;"> ' + icon + IkaNotify.notices[notice].name + '</th><td>';
					if(typeof(IkaNotify.notices[notice].test) == 'function')
						html += '[ <a id="ikaNotift_noticeTest_' + notice + '" style="cursor:pointer">test</a> ]';	
					html += '<br><br>';
					for(var e in IkaNotify.events)
						html += '<input type="checkbox" id="ikaNotify_' + notice + e + '" ' + (IkaNotify.showCheck(notice, e) ? 'checked' : '') + ' /> ' + IkaNotify.events[e] + '<br><br>';
					html += '</td></tr>';
				}							
				html += '<tr><th> </th><td>\
										<input type="button" class="button" id="ikaNotifyScriptUpdates" value="Script Updates & History"/>\
									</td></tr>';
				html +=	'</tbody></table>';
				content.innerHTML = html;
			if (IkaTools.addOptionBlock(content))
			{
  			$('#ikaNotifyScriptUpdates')[0].addEventListener('click', function() {
  				this.blur();
  				ScriptUpdater.forceNotice(ScriptUpdater.scriptId, ScriptUpdater.scriptCurrentVersion);
  			}, false);
  			$('#ikaNotifyEmail')[0].addEventListener('keyup', function() { 
  				IkaTools.setVal('email', this.value);
  				IkaNotify.email = this.value;
  				$('#ikaNotifySendTest')[0].style.display = ($('#ikaNotifyEmailKey')[0].value != "" && IkaNotify.validateEmail($('#ikaNotifyEmail')[0].value)) ? "inline" : "none";	
  				$('#ikaNotifyResendKey')[0].style.display = IkaNotify.validateEmail(this.value) ? "inline" : "none";	
  				$('#ikaNotifySendEmails')[0].disabled = (IkaNotify.validateEmail(this.value) && $('#ikaNotifyEmailKey')[0].value != "") ? false : true;
  			}, true);
  			$('#ikaNotifyEmailKey')[0].addEventListener('keyup', function() { 
  				IkaTools.setVal('emailKey', this.value);
  				IkaNotify.emailKey = this.value;
  				$('#ikaNotifySendTest')[0].style.display = ($('#ikaNotifyEmailKey')[0].value != "" && IkaNotify.validateEmail($('#ikaNotifyEmail')[0].value)) ? "inline" : "none";
  				$('#ikaNotifyResendKey')[0].innerHTML = this.value == "" ? "Get Key" : "Resend Key";	
  				$('#ikaNotifySendEmails')[0].checked = this.value == "" ? false : true;
  				$('#ikaNotifySendEmails')[0].disabled = (this.value != "" && IkaNotify.validateEmail($('#ikaNotifyEmail')[0].value)) ? false : true;
  			}, true);
  			$('#ikaNotifyResendKey').click(function() { IkaNotify.sendKey(); });
  			$('#ikaNotifySendTest')[0].addEventListener('click', function() { IkaNotify.sendTest(); }, true);
  			$('#ikaNotifyMinDelay')[0].addEventListener('change', function() {
  				var maxSelect = document.getElementById('ikaNotifyMaxDelay');
  				maxSelect.selectedIndex = maxSelect.selectedIndex <= this.selectedIndex ? this.selectedIndex : maxSelect.selectedIndex;
  			}, true);
  			$('#ikaNotifyMaxDelay')[0].addEventListener('change', function() {
  				var minSelect = document.getElementById('ikaNotifyMinDelay');
  				minSelect.selectedIndex = minSelect.selectedIndex >= this.selectedIndex ? this.selectedIndex : minSelect.selectedIndex;
  			}, true);
  			
  			// save change & test handlers
  			for(var notice in IkaNotify.notices) {
  				for(var e in IkaNotify.events) {
  					document.getElementById('ikaNotify_' + notice + e).addEventListener('change', IkaNotify.saveOptions, true);
  					if(typeof(IkaNotify.notices[notice].test) == 'function') {
  						document.getElementById('ikaNotift_noticeTest_' + notice).addEventListener('click', IkaNotify.notices[notice].test, false);
  					}
  				}
  			}
  			$('#ikaNotifyMinDelay')[0].addEventListener('change', IkaNotify.saveOptions, true);
  			$('#ikaNotifyMaxDelay')[0].addEventListener('change', IkaNotify.saveOptions, true);
  			$('#ikaNotifyEnabledCheckbox').change(function() { Config.set('ikariamNotifyEnabled', this.checked ? 1 : 0); });
  			$('#ikaNotifyEnabledCheckbox').attr('checked', Config.get('ikariamNotifyEnabled'));
  			// min/max delay
  			$('#ikaNotifyMinDelay option').each(function(i) {
  				if(this.value == IkaNotify.getMinDelay()) {
  					this.parentNode.selectedIndex = i;	
  					this.parentNode.value = this.value;
  				}
  			});
  			$('#ikaNotifyMaxDelay option').each(function(i) {
  				if(this.value == IkaNotify.getMaxDelay()) {
  					this.parentNode.selectedIndex = i;	
  					this.parentNode.value = this.value;
  				}
  			});
  			//scroll down
  			if(document.location.toString().match(/#ikaNotify/)) {
  				document.location = document.location;	
  			}
  		}
		},
		militaryAdvisorMilitaryMovements:function() {
			var div = document.createElement('div');
				div.setAttribute('style', 'text-align:'+IkaRTL.txtRight+'; font-weight:bold;');
				div.innerHTML = '<a href="http://' + document.domain + '/index.php?view=options#ikaNotify">Notifier Options</a>';
			$('#mainview .buildingDescription')[0].appendChild(div);
			IkaNotify.checkForAttacksResult(document);
		},
	},
	showCheck:function(notice, eventType) {
		var configKey = 'show_' + notice + '_' + eventType;
		if(IkaNotify.notices[notice].checkedByDefault)
			return (typeof(IkaTools.getVal(configKey)) == 'undefined' || IkaTools.getVal(configKey).toString() != 'no') ? true : false;
		else
			return (typeof(IkaTools.getVal(configKey)) != 'undefined' && IkaTools.getVal(configKey).toString() != 'yes') ? false : true;
	},
	sendNotice:function(eventType, message) {	
		for(var notice in IkaNotify.notices) {
			if(IkaNotify.showCheck(notice, eventType))
				IkaNotify.notices[notice].send(eventType, message);									   
		}
	},
	saveOptions:function() {
		for(var notice in IkaNotify.notices) {
			for(var e in IkaNotify.events) {
				var configKey = 'show_' + notice + '_' + e;
				IkaTools.setVal(configKey, document.getElementById('ikaNotify_' + notice + e).checked ? 'yes' : 'no');
			}
		}
		IkaTools.setVal('minDelay', $('#ikaNotifyMinDelay')[0].value);
		IkaTools.setVal('maxDelay', $('#ikaNotifyMaxDelay')[0].value);
		IkaNotify.setNextProcessTime();
	},
	getMinDelay:function() {
		return parseInt((typeof(IkaTools.getVal('minDelay')) != 'undefined' &&	IkaTools.getVal('minDelay').toString().match(/^\d+$/)) ? parseInt(IkaTools.getVal('minDelay')) : 300000);
	},
	getMaxDelay:function() {
		var maxDelay = parseInt((typeof(IkaTools.getVal('maxDelay')) != 'undefined' &&	IkaTools.getVal('maxDelay').toString().match(/^\d+$/)) ? parseInt(IkaTools.getVal('maxDelay')) : 900000);
		return maxDelay < IkaNotify.getMinDelay() ? IkaNotify.getMinDelay : maxDelay;
	},
	getProcessTime:function() {
		return IkaTools.getVal('processTime').toString().match(/^\d+$/) ? IkaTools.getVal('processTime') : 0;
	},
	setNextProcessTime:function() {
		var d = new Date();
		var nextProcess =  d.getTime() + parseInt(IkaNotify.getMinDelay() + (Math.random() * (IkaNotify.getMaxDelay() - IkaNotify.getMinDelay())));
		IkaTools.setVal('processTime', nextProcess);
	},
	isReadyToEmail:function() {
		return (IkaNotify.validateEmail(IkaNotify.email) && IkaNotify.emailKey != "");
	},
	validateEmail:function(string) {
		return (string.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1);
	},
}

var IkaSearch = {
	init:function() {
		var startTime = new Date();
		if(document.location.toString().match(/ika-world/)) {
			IkaSearch.handleIkaWorld();	
		} else {
			GM_addStyle('.ikaSearchIcon { opacity:.3; } .ikaSearchIcon:hover { opacity:1; } ');
			 
			unsafeWindow.IkaSearch = IkaSearch;
			var div = document.createElement('div');
			div.innerHTML = IkaSearch.formHtml;
			$('#mainview').append(div);
			var buttonClose = document.createElement('div');
			buttonClose.innerHTML = 'close';
			buttonClose.id = "ikaSearchButtonClose";
			buttonClose.setAttribute('style', 'display:none; position:absolute; top:0; padding-'+IkaRTL.txtRight+':17px; '+IkaRTL.txtRight+':0; background-color:#fff; padding:.5em 1em; font-weight:bold; z-index:25000; cursor:pointer; border:1px solid #563C2F; border-width:0 0 1px 1px;');
			buttonClose.addEventListener('click', IkaSearch.hideAll, false);
			$('#mainview').append(buttonClose);
			if(typeof(IkaSearch.views[IkaTools.getView()]) == 'function')
				IkaSearch.views[IkaTools.getView()]();
			var spn = document.createElement('div');
			spn.setAttribute('style', 'width:100px; float:'+IkaRTL.txtRight+'; text-align:'+IkaRTL.txtRight+'; margin-top:-2px; margin-'+IkaRTL.txtRight+':25px;');
			// add world icon 
			if(Config.get('worldOverview')) {
				var imgWorld = document.createElement('img');
				imgWorld.setAttribute('style', 'float:'+IkaRTL.txtRight+'; padding:5px; cursor:pointer; position:relative; top:-1px;');
				imgWorld.title = 'World Map Overview';
				imgWorld.src = IkaSearch.icons.world;
				imgWorld.addEventListener('click', function() { IkaSearch.showWorld();  }, false);
				$('#breadcrumbs').prepend(imgWorld);
			}
			// add search icon to crumb nav
			if(false && Config.get('searchIconCrumbNavs')) {
				var img = document.createElement('img');
				img.setAttribute('style', 'padding:5px; cursor:pointer; position:relative; top:-3px;');
				img.title = 'Open Search Winow';
				img.src = IkaSearch.icons.magnifier;
				img.addEventListener('click', function() { IkaSearch.showForm(); }, false);
				spn.appendChild(img);
			}
			$('#breadcrumbs h3:first-child').before(spn);
			// create search results
			if($('#ikaSearchResults').size() == 0) {
				var resultBox = document.createElement('iframe');
				resultBox.name = "ikaSearchResults";
				resultBox.id = "ikaSearchResults";
				resultBox.src = "";
				resultBox.setAttribute('style', 'position:absolute; top:0; '+IkaRTL.txtLeft+':0; border:none; width:100%; z-index:20000; overflow-x: hidden; display:none; ');
				$('#mainview')[0].style.position = 'relative';
				$('#mainview').append(resultBox);
			}
			$('#breadcrumbs').prepend('<div style="width:1px; float:'+IkaRTL.txtRight+'; margin-'+IkaRTL.txtRight+':23px;"> </div>');
		}
		if(Config.get('debugMode')) {
			IkaTools.config.debugMode = true;
			var endTime = new Date();
			IkaTools.debug('Search: ' + (endTime.getTime() - startTime.getTime()) + 'ms');
		}
	},
	getCitiesFromDom:function(r) {
		var cities = [];
		$('#main table:eq(1) tr', r).each(function(i){
			if (i > 1) {
				var href = $('td:eq(3) a', this).attr('href') + '';
				matches = href.match(/id=(\d+)&selectCity=(\d+)/);
				if(matches) {
					cities.push({
						id: matches[2],
						islandId: matches[1],
						inactive: $('td:eq(2)', this).text().match(/\(i\)/),
						vacation: $('td:eq(2)', this).html().match(/holiday/),
						name: $('td:eq(3) a', this).text(),
						level: $('td:eq(4)', this).text(),
						islandX: $('td:eq(6)', this).text(),
						islandY: $('td:eq(7)', this).text(),
						woodLevel: $('td:eq(9)', this).text(),
						tradegoodLevel: $('td:eq(10)', this).text(),
						tradegoodType: $('td:eq(10) span', this).attr('class').match(/icon\s*([^\.]+)/)[1]
					});
				}
			}
		});
		return cities;
	},
	getSearchUrlBase:function(player, alliance, action) {
		switch(action) {
			case 'player': action = 'suche_spieler'; break;
			default: action = 'suche_stadt';
		}
		var matches = document.location.toString().match(/s(\d+)\.([^\.]+)\.ikariam\./);
		if (matches)
			var land = matches[2];
		else {
			var matches = document.location.toString().match(/s(\d+)\.ikariam\./);
			var land = 'en';
		}
		var server = matches[1];
		server = server.toString() == '666' ? '26' : server;
		return 'http://us.ika-world.com/search.php?view=' + action + '&land=' + land + '&welt=' + server +  '&spieler=' + player.replace(/\s/g, '+') + '&allianz=' + alliance.replace(/\s/g, '+');
	},
	getPlayerCities:function(player, callback) {
		IkaTools.getRemoteDocument(IkaSearch.getSearchUrlBase(player, ''), function(r) {
			callback(IkaSearch.getCitiesFromDom(r));
		});
	},	
	drawWorldOverview:function(callback) {
		GM_addStyle('#ikaSearchWorldTable td { border:1px solid #83C3FF; }\
					#ikaSearchWorldTable td { height:' + (isChrome ? '5' : '6') + 'px !important; width:6px !important; overflow:hidden; font-size:1px !important; }\
					#ikaSearchWorldTable td.island { background-color:#967647; cursor:pointer; }\
					#ikaSearchWorldTable td.own { background-color:#0000CC !important; }\
					#ikaSearchWorldTable td:hover { border-color:gold; border-width:1px; }\
					#mainview { overflow:hidden; }');
		var div = document.createElement('div');
			div.id = 'ikaSearchWorldWrapper';
			div.setAttribute('style', 'overflow:hidden; display:none; height:650px; position:absolute; top:0; background-color:#83C3FF; '+IkaRTL.txtLeft+':0; border:none; width:100%; z-index:20000; overflow-x: hidden; display:none; padding-top:10px;');
		$('#mainview').append(div);
		IkaSearch.worldWrapper = div;
		// search box
		var infoBox = document.createElement('div');
			infoBox.className = 'dynamic';
			infoBox.id = 'ikaSearchInfoBox';
			var html = '<h3 class="header">World Search</h3><div class="content" style="padding:.5em 10px;">\
							<p style="padding-'+IkaRTL.txtLeft+':.8em;">Player: \
								<input tyle="text" style="width:100px;" id="ikaSearchPlayerName"/>\
								<img src="' + ExMachina.icons.loading + '" style="vertical-align:middle; display:none; margin-top:-2px;" id="playerSearchLoading"/>\
							</p>\
							<p>Alliance: <input tyle="text" style="width:100px;" id="ikaSearchAlliance"/></p>\
							<p style="text-align:center;"><input id="ikaSearchWorldSubmit" value="Search" class="button" style="width:75px; display:inline;"/></p>\
						</div><div class="footer"/>';
			infoBox.innerHTML = html;
		$('#breadcrumbs').after(infoBox);
		$('#ikaSearchPlayerName')[0].addEventListener('keyup', IkaSearch.worldSearchKeyUp, false);
		$('#ikaSearchAlliance')[0].addEventListener('keyup', IkaSearch.worldSearchKeyUp, false);
		
		$('#ikaSearchPlayerName').focus(function() {
			ExMachina.keyboardShortcutsListenerActive = false;
		});
		$('#ikaSearchAlliance').focus(function() {
			ExMachina.keyboardShortcutsListenerActive = false;
		})
		$('#ikaSearchPlayerName').blur(function() {
			ExMachina.keyboardShortcutsListenerActive = true;
		})
		$('#ikaSearchAlliance').blur(function() {
			ExMachina.keyboardShortcutsListenerActive = true;
		})
		
		$('#ikaSearchWorldSubmit')[0].addEventListener('keyup', IkaSearch.worldSearchKeyUp, false);
		$('#ikaSearchWorldSubmit')[0].addEventListener('click', function(){
			IkaSearch.performSearch();
			this.blur();
		}, false);
		
		// load map data
		if(typeof(IkaSearch.mapData) != 'undefined') IkaSearch.redrawMapOverview(callback); else
			GM_xmlhttpRequest({method:"GET", url:"http://" + document.domain + "/index.php?action=WorldMap&function=getJSONArea&x_min=1&x_max=100&y_min=1&y_max=100",
			  headers:{
				"Accept":"text/txt",
				},
			  onload: function(details) {
			  	IkaSearch.mapData = JSON.parse(details.responseText).data;
				IkaSearch.mapData.getByCoords = function(x, y) {
					return (typeof(this[x]) != 'undefined' && typeof(this[x][y]) != 'undefined') ? this[x][y] : false;
				}
				IkaSearch.redrawMapOverview(callback);
			  }
			});
	},
	setServer:function() {
		var serverDomain = document.domain.toString().replace(/^s\d+\./, '');
		var server = parseInt(document.domain.match(/s(\d+)\./)[1]);
		$('#ikaSearchSelectServer option').each(function(i) {
			if(this.innerHTML == serverDomain)
				this.selected = true;
		});
		$('#ikaSearchServer')[0].selectedIndex = server - 1;
	},
	worldSearchKeyUp:function(e) {
		if(e.keyCode == 13) IkaSearch.performSearch();
	},
	resetSearch:function() {
		$('#ikaSearchForm input').each(function() { this.value = ''; });
	},
	redrawMapOverview:function(callback) {
		var islands = IkaSearch.mapData;
		// figure out where your cities are
		var ownIslands = {};
		var cities = IkaTools.getCities();
		for(var i = 0; i < cities.length; i++) {
			var islandId = IkaTools.cityGetIslandId(cities[i]);
			if(islandId)
				ownIslands[islandId] = true;
		}
		var table = document.createElement('table');
		table.id = 'ikaSearchWorldTable';
		table.setAttribute('style', 'width:700px; margin:auto; margin-top:25px;');
		table.border = 1;
		table.cellPadding = 0; 
		table.cellSpacing = 0;
		var html = '';
		for(var y = 1; y <= 100; y++) {
			html += '<tr>';
				for(var x = 1; x <= 100; x++) {
					var island = islands.getByCoords(x, y);
					var color = '';
					if(island) {
						var name = island[1];
						var numCities = parseInt(island[7]);
						switch(island[2]) {
							case '1': var type = 'Wine'; break;
							case '2': var type = 'Marble'; break;
							case '3': var type = 'Crystal'; break;
							case '4': var type = 'Sulphur'; break;
						}
						switch(numCities) {
							case 0: color = '8db5d8'; break;
							case 1: color = '96a8b1'; break;
							case 2: color = '98a5a9'; break;
							case 3: color = '9aa3a1'; break;
							case 4: color = '9ca099'; break;
							case 5: color = '9e9d91'; break;
							case 6: color = '9f9b8a'; break;
							case 7: color = 'a19882'; break;
							case 8: color = 'a3957a'; break;
							case 9: color = 'a59272'; break;
							case 9: color = 'a7906b'; break;
							case 10: color = '967647'; break;
							case 11: color = '836943'; break;
							case 12: color = '735e3f'; break;
							case 13: color = '65543b'; break;
							case 14: color = '594b37'; break;
							case 15: color = '4e4333'; break;
							case 16: color = '000'; break;
						}
					}
					var id = island[0];
					//var opacity = numCities == 0 ? .4 : .55 + (.45 * (numCities / 16));
					var woodLevel = island[6];
					html += '<td id="ikaSearchIsland_' + id + '" style="background-color:#' + color + ';" ' + 
								(island ? 'title="' + name + ' [' + x + ',' + y + '] - ' + type + ', Wood Level ' + woodLevel + ' (' + numCities + (island[7] == 1 ? ' city' : ' cities') + ')"' : '') +
								' class="' + (island ? 'island' : '') + ' ' + (island ? 'island' : '') + (typeof(ownIslands[island[0]]) != 'undefined' ? ' own' : '') + '" '+
								'onclick="document.location = \'http://' + document.domain + '/index.php?view=island&id=' + island[0] + '\'"> </td>';
				}
			html += '</tr>';
		}
		table.innerHTML = html;
		IkaSearch.worldWrapper.innerHTML = '';
		IkaSearch.worldWrapper.appendChild(table);	
		if(typeof(callback) == 'function') callback();		
	},
	performAllianceSearch:function(alliance) {
		IkaSearch.performSearch('', alliance);
	},
	performPlayerSearch:function(player) {
		IkaSearch.performSearch(player, '');
	},
	performSearch:function(player, alliance, callback) {
		player = typeof(player) == 'string' ? trim(player) : trim($('#ikaSearchPlayerName').attr('value'));
		alliance = typeof(alliance) == 'string' ? trim(alliance) : trim($('#ikaSearchAlliance').attr('value'));
		$('#playerCityListSearchResult').html('');
		IkaSearch.showWorld(function() {
			if (player != '')
				$('#playerSearchLoading').css('display', 'inline');
			$('#ikaSearchPlayerName').attr('value', player);
			$('#ikaSearchAlliance').attr('value', alliance);
			$('#playerCityListSearchResult').html('');
			var url = IkaSearch.getSearchUrlBase(player, alliance);
			function showCitiesOnMap(cities) {
				cities = typeof(cities) == 'undefined' ? [] : cities;
				if ($('#playerCityListSearchResult').size() == 0) 
					$('#ikaSearchInfoBox .content').append('<div id="playerCityListSearchResult"> </div>');
				if (alliance == '') 
					$('#playerCityListSearchResult').html(ExMachina.getCityListForInfoBox(cities));
				for (var i = 0; i < cities.length; i++)
					$('#ikaSearchIsland_' + cities[i].islandId).css('background-color', 'red');
				if (cities.length == 0) 
					$('#playerCityListSearchResult').html('<div style="text-align:center;"><i>No results found</i></div>');
				$('#playerSearchLoading').hide();
			}
			function handleSearchResults(cities){
				if (!IkaSearch.mapIsMarked) 
					showCitiesOnMap(cities);
				else 
					IkaSearch.redrawMapOverview(function(){
						showCitiesOnMap(cities);
					});
			}
			function getNextResultPage(pageNum) {
				var url = IkaSearch.getSearchUrlBase(player, alliance) + '&seite=' + pageNum;
				var data = 'seite=' + pageNum;//'land=en&welt=2&spieler=' + $('#ikaSearchPlayerName')[0].value + '&allianz=' + $('#ikaSearchAlliance')[0].value + '&seite=' + pageNum;
				IkaTools.getRemoteDocument(url, function(r) {
					var cities = IkaSearch.getCitiesFromDom(r);
					showCitiesOnMap(cities);
				}, 'POST', data);
			}
			if(alliance != '' || player != '')
				IkaTools.getRemoteDocument(url, function(r) {
					handleSearchResults(IkaSearch.getCitiesFromDom(r));
					try { var numPages = parseInt($('#main table:eq(1) tr:eq(0) td:eq(1)', r).text().match(/from\s+(\d+)\s+pages/)[1]); } catch(e) { var numPages = 1; }
					for(var i = 2; i < 20 && i <= numPages; i++)
						getNextResultPage(i);
				});
			else 
				handleSearchResults();
		});
	},
	getNextResultPage:function(pageNum) {
		var data = 'land=en&welt=2&spieler=' + $('#ikaSearchPlayerName')[0].value + '&allianz=' + $('#ikaSearchAlliance')[0].value + '&seite=' + pageNum;
		IkaTools.getRemoteDocument('http://ika-world.com/search.php?view=suche_stadt', function(result) {
			if(typeof($('table', result)[1]) != 'undefined') {																					
				$('tr', $('table', result)[1]).each(function(i) {
					try { var islId = this.innerHTML.match(/id=(\d+)/)[1]; } catch(e) { var islId = false; }
					if(islId) {
						$('#ikaSearchIsland_' + islId)[0].style.backgroundColor = "red";
					}
				});
			}
		}, 'POST', data);
	},
	handleIkaWorld:function() {
		$('script').attr('src', '');
		GM_addStyle('\
			#navi, #header, #header-navi, forum table:first-child, input.submit { display:none; }\
			#main { width:600px !important; margin:40px 0 0 0 !important; }\
			script + div { display:none !important; }\
			td, th { padding-'+IkaRTL.txtLeft+':2px !important; padding-'+IkaRTL.txtRight+':2px !important; }\
			table { width:650px !important; }\
		');
		$('table').attr('cellspacing', '0');
		$('form table:first-child')[0].style.display = 'none';
		$('script').each(function(i) {
			if(this.src.match(/bin-layer/))
				this.nextElementSibling.style.display = "none";
		});
		$('#main a').each(function(i) {
			if(this.href.match(/ikariam/))
				this.target = "_Parent";
		});
	},
	hideForm:function() {
		$('#ikaSearchForm')[0].style.display = 'none';
	},
	hideResults:function() {
		$('#ikaSearchResults')[0].style.display = 'none';
		$('#ikaSearchButtonClose')[0].style.display = 'none';
	},
	hideAll:function() {
		if(isChrome)
			$('#mainview').css('margin-'+IkaRTL.txtRight+'', '251px'); 
		$('#mainview').css('height', true || IkaTools.getView() == 'island' ? IkaSearch.previousMainviewHeight : 'auto'); 
		try { $('#ikaSearchWorldWrapper')[0].style.display = 'none'; } catch(e) {}
		try { $('#ikaSearchButtonClose')[0].style.display = 'none'; } catch(e) {}
		try { $('#ikaSearchForm')[0].style.display = 'none'; } catch(e) {}
		try { $('#ikaSearchResults')[0].style.display = 'none'; } catch(e) {}		
		try { $('#ikaSearchInfoBox')[0].style.display = 'none'; } catch(e) {}		
	},
	searchPlayer:function(playerName) {
		IkaSearch.resetSearch();
		$('#ikaSearchPlayerName').attr('value', playerName.replace(/ /g, ' '));
		IkaSearch.performSearch();
	},
	searchAlliance:function(allianceName) {
		IkaSearch.resetSearch();
		$('#ikaSearchAllianceName').attr('value', allianceName);
		IkaSearch.performSearch();
	},
	showClose:function() {
		$('#ikaSearchButtonClose')[0].style.display = 'block';
	},
	showForm:function() {
		IkaSearch.hideAll();
		IkaSearch.setServer();
		$('#ikaSearchForm')[0].style.minHeight = $('#mainview')[0].clientHeight + 'px'; 
		$('#ikaSearchForm')[0].style.display = 'block';
		IkaSearch.showClose();
	},
	showResults:function() {
		IkaSearch.hideAll();
		$('#ikaSearchButtonClose')[0].style.display = 'block';
		$('#ikaSearchResults')[0].style.display = 'block'; 
		$('#ikaSearchResults')[0].style.height = $('#mainview')[0].clientHeight + 'px'; 
		IkaSearch.showClose();
	},
	showWorld:function(callback) {
		function clearSearchFields() {
			try { 
				$('#ikaSearchInfoBox').show(); 
				$('#playerCityListSearchResult').html('');
			} catch(e) {}
		}
		IkaSearch.previousMainviewHeight = $('#mainview').css('height');
		IkaSearch.hideAll();
		IkaSearch.showClose();
		if (typeof(IkaSearch.worldWrapper) == 'undefined') {
			IkaSearch.drawWorldOverview(callback);
			clearSearchFields();
			$('#ikaSearchPlayerName').attr('value', ''); 
		}
		else {
			clearSearchFields();
			IkaSearch.redrawMapOverview(callback);
		}			
		IkaSearch.worldWrapper.style.display = 'block';		
		if(navigator.userAgent.match(/Chrome/i) && $('#container div.dynamic').size() > 0)
			$('#mainview').css('margin', '0px 29px -18px 0px !important'); 
		$('#mainview').css('height', '650px'); 
		
	},
	views:{
		diplomacyAdvisor:function() {
			if(false && Config.get('searchIconInbox')) {
				$('#messages tr.entry').each(function() {
					var playerName = $('td', this).eq(2).text().replace(/\s*$/, '');
					var a = document.createElement('a');
					a.href = 'javascript:IkaSearch.searchPlayer(\'' + playerName +'\')';
					a.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for this player\'s cities"/>';
					$('a', $('td', this).eq(2)).append(a);
				});
			}
		},
		diplomacyAdvisorOutBox:function() {
			if(false && Config.get('searchIconOutboxbox')) {
				$('#deleteMessages tr.entry').each(function() {
					var playerName = $('td', this).eq(2).text().replace(/\s*$/, '');
					var a = document.createElement('a');
					a.href = 'javascript:IkaSearch.searchPlayer(\'' + playerName +'\')';
					a.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for this player\'s cities"/>';
					$('a', $('td', this).eq(2)).append(a);
				});
			}
		},
		diplomacyAdvisorTreaty:function() {
			if(false && Config.get('searchIconTreaties')) {
				$('table#commercialTreaty tr').each(function(i) {
					if(i > 0) {								
						var playerName = $('td', this).eq(0).text().replace(/\s*$/, '').replace(/^\s*/, '');
						if(playerName != '' && !playerName.match(/\[.+\]/)) {
							var a = document.createElement('a');
							a.href = 'javascript:IkaSearch.searchPlayer(\'' + playerName +'\')';
							a.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for this player\'s cities"/>';
							$('td', this).eq(0).append(a);
						}
					}
				});
			}
		},
		island:function() {
			// get cities on island
			var cities = {};
			if(false && Config.get('searchIconIslandPlayer')) {
				IkaTools.querySelectorAsArray('.owner',document).forEach(function(item) {					
					var playerName = item.innerHTML.match(/^\s*<span class="textLabel">.+?<\/span>\s*([^<]+)/)[1].replace(/\s/g, '');
					var html = '<img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="cursor:pointer; display:inline; margin:0 .2em;" title="Search for this player\'s cities"/>';

					//var a = document.createElement('a');
					//a.innerHTML = '<img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for this player\'s cities"/>';
					//a.href = 'javascript:IkaSearch.searchPlayer("' + playerName +'")';

					var ms = IkaTools.querySelector('a.messageSend', item);
					if (ms != null) 
						ms.before(html);
					else
						$(item).append(html);	
				});
			}
			if(false && Config.get('searchIconIslandAlly')) {
				IkaTools.querySelectorAsArray('.ally',document).forEach(function(item) {					
					try { var allyName = $('a', item)[0].innerHTML; } catch(e) { var allyName = false; }
					if(allyName) {
						var a = document.createElement('a');
						a.innerHTML = '<img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for cities in this alliance"/>';
						a.href = 'javascript:IkaSearch.searchAlliance("' + allyName +'")';					 
						$(IkaTools.querySelector('a.messageSend', item)).before(a);
					}
				});
			}
		},
		highscore:function() {
			if (false) {
				$('.name').each(function(){
					var playerName = this.innerHTML;
					this.innerHTML += '   <a href="javascript:IkaSearch.searchPlayer(\'' + playerName + '\')"><img class="ikaSearchIcon" src="' + IkaSearch.icons.magnifier + '" style="display:inline; margin:0 .2em;" title="Search for this player\'s cities"/></a>';
				});
				$('.allytag').each(function(){
					try {
						var allyName = $('a.allyLink', this)[0].innerHTML;
					} 
					catch (e) {
						var allyName = false;
					}
					if (allyName) {
						var a = document.createElement('a');
						a.innerHTML = '   <img class="ikaSearchIcon" src="' + IkaSearch.icons.magnifier + '" style="display:inline; margin:0 .2em;" title="Search for cities in this alliance"/>';
						a.href = 'javascript:IkaSearch.searchAlliance("' + allyName + '")';
						$('a.allyLink', this).after(a);
					}
				});
			}
		},
	},
	icons:{
		magnifier:'data:image/gif;base64,R0lGODlhDwALANU6AIeHhwwMDCQkJA4ODhISEkBAQAgICBMTEy8vLw8PDygoKAUFBZubmykpKRQUFBsbGzU1NYGBgQEBAQsLCxAQEAoKChcXFwMDA+Li4oyMjKioqIODgxERESEhIX5+fomJiYqKiioqKn19fR8fHxYWFhwcHJ6enuDg4FhYWMPDw05OTjY2Nnx8fKampjg4ODMzM6mpqQkJCRgYGPDw8DQ0NNHR0ePj425ubg0NDQAAAP///wAAAAAAAAAAAAAAAAAAACH5BAEAADoALAAAAAAPAAsAAAZ/QJ1QAHEIdQYU4XjMwRTHgajD1AFyuQFIF7nkDBHmgoFI5HQTgAE3Oa4qr0PuUQioJI9AQYdzpSQQIx45CzU5OBw5DlgzAjkkGzkEGDkhhzlyHzkBWFc3WAQ4ORQsWBUtJjoMGjkZFDlmNjEDZ0w5JzkCFzINFgUNVTQIFiUKQQA7',
		world:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAArlJREFUeNoEwctrHHUAwPHv/H7z2N3sK7vbNu2GillppGmleDD0UB8gVOoTPSuKiAiiF2969iitKIIXwUtF8Q8QraJWalFSarc2kJpk03Q2u5vN7HNmduY3v/HzMd67+gYGoEnxVXByzsy+VbQLz6RaVJM0NaWRDoNk8sPAH31JYq1FkwiVKEwDUKlGafX6QrZ66WxttbhUbrDvO0wCA4jn28Htt29F1970Iu8DlapLUgpMDcRavbZcrH/16omXsY1F2r7HMNEoM8uBb2Cqp3iyfMpcSy9f/He8nsax/FT4Klw+lCl98WLjPNtpyFr0H0OdEuoMXiy529bc6QT0jIDnVp6gaOQ/6fQOHhU50353tbKSm0mbG/GEmTZpjQXuSHKr5dObdVELN9ko/cp91Wf1yGmZtzPvm1WndP54aZHfh7exMg3q8jDNrs9GL8AueejjP7Lp7GEkMNv0eKF2hrJZeFw4wp5PhOQfr4k7bXEvCNntK1Q65NjRkMiu0PezTPZj9lwXYVqQiLyZpgY6CUhmNlld44+mT3ucQyiNu5VQLTQw+w/jT+6h/Z9IdIhKlGGGcThUKqwtOQ+iogrdoUGiTWS+ymZLEHQ0UlgcqtepODWieMosiifCHfR+vj/0WLIybLjfkp3rIFWEmgmcuTL2vEWhPkYFf3K6fpQ77g57Xu+6GIXTz37buhEtWBmOJT7a2KGc02SlIodB0dnHsb7hsLPOYqnCleZNDqaji3LlpROdzqDv9QfehWdPnqNWWWI8MLHR2FpTsLc5+9CIR46c4fu/r7C+u/Vh1slclsvPN9BJ+td2tz1otu4+XXPy4oFijYLU1MsRpxZj3IMdvrv2C+u7rY8MIT62pInxytcX0EozHgf0B95jOcN5p5ApnlMxRSHBkumkO/Cue9PR5/ns3FUpBGma8v8AYLBeoHUSmicAAAAASUVORK5CYII%3D',
	},
	formHtml:'<form style="display:none; position:absolute; top:0; background:url(/skin/layout/bg_stone.jpg); '+IkaRTL.txtLeft+':0; border:none; width:100%; z-index:20000; overflow-x: hidden; display:none;" id="ikaSearchForm" method="post" target="ikaSearchResults" action="http://www.ika-world.com/suche.php?view=suche_stadt&land=en&tool=ikaSearch" onsubmit="IkaSearch.hideForm(); IkaSearch.showResults()">\
					<table style="margin:50px auto;"><tr align="center"><td>Country</td><td colspan="2">\
					<select name="land" id="ikaSearchSelectServer" style="width: 200px;">\
					<option value="de">ikariam.de</option><option value="en">ikariam.org</option><option value="ae">ae.ikariam.com</option><option value="ar">ar.ikariam.com</option><option value="ba">ba.ikariam.com</option><option value="bg">ikariam.bg</option><option value="br">ikariam.com.br</option><option value="by">ikariam.by</option><option value="cl">cl.ikariam.com</option><option value="cn">ikariam.cn</option><option value="co">co.ikariam.com</option><option value="cz">ikariam.cz</option><option value="dk">ikariam.dk</option><option value="ee">ee.ikariam.com</option><option value="eg">eg.ikariam.org</option><option value="es">ikariam.es</option><option value="fi">fi.ikariam.com</option><option value="fr">ikariam.fr</option><option value="gr">ikariam.gr</option><option value="hr">hr.ikariam.org</option><option value="hk">ikariam.hk</option><option value="hu">ikariam.hu</option><option value="id">id.ikariam.com</option><option value="ih">ih.ikariam.org</option><option value="il">ikariam.co.il</option><option value="in">in.ikariam.org</option><option value="ir">ir.ikariam.com</option><option value="it">ikariam.it</option><option value="jp">jp.ikariam.org</option><option value="kr">ikariam.kr</option><option value="lt">ikariam.lt</option><option value="lv">ikariam.lv</option><option value="me">me.ikariam.org</option><option value="mx">ikariam.com.mx</option><option value="nl">ikariam.nl</option><option value="no">ikariam.no</option><option value="pe">ikariam.pe</option><option value="ph">ikariam.ph</option><option value="pk">ikariam.pk</option><option value="pl">ikariam.pl</option><option value="pt">ikariam.com.pt</option><option value="ro">ikariam.ro</option><option value="rs">ikariam.rs</option><option value="ru">ikariam.ru</option><option value="sa">sa.ikariam.org</option><option value="se">ikariam.se</option><option value="si">ikariam.si</option><option value="sk">ikariam.sk</option><option value="tr">ikariam.net</option><option value="tw">ikariam.tw</option><option value="ua">ikariam.com.ua</option><option value="us">ikariam.com</option><option value="ve">ikariam.com.ve</option><option value="vn">ikariam.vn</option>  \
				  </select>\
				</td>\
				<td>Wonder</td>\
				<td colspan="2">\
				  <select name="wunder" style="width: 200px;">\
					<option selected="selected" value="0">-</option><option value="1">Hephaistos</option><option value="2">Temple of Gaia</option><option value="3">Garden of Dionysus</option><option value="4">Temple of Athene</option><option value="5">Temple of Hermes</option><option value="6">Ares</option><option value="7">Temple of Poseidon</option><option value="8">Colossus</option>      </select>\
				</td> 	\
			  </tr>  \
			  <tr align="center">\
				<td>World</td>\
				<td colspan="2">	  \
				  <select name="welt" id="ikaSearchServer" style="width: 200px;">\
					<option selected="selected" value="1">Alpha</option><option value="2">Beta</option><option value="3">Gamma</option><option value="4">Delta</option><option value="5">Epsilon</option><option value="6">Zeta</option><option value="7">Eta</option><option value="8">Theta</option><option value="9">Iota</option><option value="10">Kappa</option><option value="11">Lambda</option><option value="12">My</option><option value="13">Ny</option><option value="14">Xi</option><option value="15">Omikron</option><option value="16">Pi</option><option value="99">Speedserver</option><option value="666">Test-Server</option>      </select>\
				</td>\
				<td/>\
				<td/>\
				<td/>\
			  </tr> \
			  <tr align="center">\
				<td>Player-name</td>\
				<td colspan="2"><input type="text" value="" name="spieler" style="width: 200px;" id="ikaSearchPlayerName"/></td>  \
				<td>Ally</td>\
				<td colspan="2"><input type="text" value="" name="allianz" style="width: 200px;" id="ikaSearchAllianceName"/></td>  \
			  </tr>	    \
			  <tr align="center">\
				<td>Island-name</td>\
				<td colspan="2"><input type="text" value="" name="insel_name" style="width: 200px;"/></td>  \
				<td>Town-name</td>\
				<td colspan="2"><input type="text" value="" name="stadt" style="width: 200px;"/></td>  \
			  </tr>  \
			  <tr> \
				<td>X</td>\
				<td>	  \
				  <select name="x_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="x" style="width: 100px;"/></td> \
				<td>X</td>\
				<td>	  \
				  <select name="x2_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="x2" style="width: 100px;"/></td> 	\
			  </tr>\
			  <tr> \
				<td>Y</td>\
				<td>\
				  <select name="y_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option> \
				  </select>\
				</td>\
				<td><input type="text" value="" name="y" style="width: 100px;"/></td> \
				<td>Y</td>\
				<td>\
				  <select name="y2_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option> 	  \
				  </select>\
				</td>\
				<td><input type="text" value="" name="y2" style="width: 100px;"/></td> \
			  </tr>\
			  <tr>\
				<td>Wood</td>\
				<td>\
				  <select name="holz_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="holz_level" style="width: 100px;"/></td> 	  	\
				<td>\
				  <select name="luxus">\
					<option selected="selected" value="0">Luxury Goods</option><option value="1">Marble</option><option value="2">Wine</option><option value="3">Crystall</option><option value="4">Sulphur</option>      </select>	  \
				</td>\
				<td>\
				  <select name="luxus_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="luxusgut_level" style="width: 100px;"/></td>  \
			  </tr>			\
			  <tr>  	  \
				<td>Town Hall</td>\
				<td>\
				  <select name="rathaus_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="rathaus" style="width: 100px;"/></td>  	  \
				<td>Towns</td>\
				<td>\
				  <select name="besiedelt_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
			  <td><input type="text" value="" name="besiedelt" style="width: 100px;"/></td> \
			  </tr>  \
			  <tr>\
				<td>Start</td>\
				<td>X: <input type="text" value="0" name="x_start" maxlength="3" style="width: 50px;"/></td>\
				<td>Y: <input type="text" value="0" name="y_start" maxlength="3" style="width: 50px;"/></td>\
				<td>Status</td>\
				<td><select name="xxx" style="width: 100px;"><option value="">=</option></select></td>\
				<td>\
				  <select name="status" style="width: 100px;">\
					<option selected="selected" value="0">All the same</option><option value="1">Normal</option><option value="2">Vacation</option><option value="3">Inactive</option>      </select>\
				</td></tr><tr><td>1. sort</td><td>\
				  <select name="asc_desc_1" style="width: 100px;">\
					<option selected="selected" value="0">ASC</option><option value="1">DESC</option>      </select>\
				</td><td>\
				  <select name="sortierung_1" style="width: 100px;">\
					<option selected="selected" value="0">Player</option><option value="1">Ally</option><option value="2">Status</option><option value="3">Town-name</option><option value="4">Town Hall</option><option value="5">X</option><option value="6">Y</option><option value="7">Island-name</option><option value="8">Wonder</option><option value="9">Wood</option><option value="10">Towns</option>      </select>\
				</td><td>2. sort</td><td>\
				  <select name="asc_desc_2" style="width: 100px;">\
					<option selected="selected" value="0">ASC</option><option value="1">DESC</option>      </select>\
				</td><td>\
				  <select name="sortierung_2" style="width: 100px;">\
					<option value="0">Player</option><option selected="selected" value="1">Ally</option><option value="2">Status</option><option value="3">Town-name</option><option value="4">Town Hall</option><option value="5">X</option><option value="6">Y</option><option value="7">Island-name</option><option value="8">Wonder</option><option value="9">Wood</option><option value="10">Towns</option>      </select>\
				</td></tr><tr><td align="center" colspan="6"><input type="submit" value="Search" class="button"/></td></tr></table>			\
		</form>',
};

var Growler = typeof(Growler) == 'undefined' ? {} : Growler;
if(isChrome) (function() {
	Growler = {
		appName:"Growler",
		noticeTypes:{},
		iconSrc:'',
		addNoticeType:function(typeKey, name, enabled) {},
		register:function(appName, iconSrc) {
			Growler.iconSrc = typeof(iconSrc) == 'undefined' ? '' : iconSrc;
		},
		growl:function(typeKey, title, message) {
			chrome.extension.sendRequest({name: 'growl', title:title, message:message});
		}
	}
})();

function GoogleVoice() {
	var email = '';
	var pass = '';
	var phone = '';
	var _auth, _sid, _lsid;
	$.ajax({
		type: 'POST',
		url: 'https://www.google.com/accounts/ClientLogin',
		data: 'accountType=GOOGLE&Email=' + email + '&Passwd=' + pass + '&service=grandcentral&source=IkariamExMachina',
		success: function(e) {
			alert(e);
			_auth = e.toString().match(/Auth=(.+)/)[1];
			_sid = e.toString().match(/^\s*SID=(.+)/)[1];
			_lsid = e.toString().match(/LSID=(.+)/)[1];
			var data='id=&phoneNumber=' + phone + '&text=helloyou&_rnr_se=ikaExMach';
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://www.google.com/voice/sms/send/',true);
			xhr.setRequestHeader('User-Agent','Google Voice Add-on for Firefox');
			xhr.setRequestHeader('Authorization','GoogleLogin auth=' + _auth);
			xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
			xhr.setRequestHeader('Referer','https://www.google.com/voice/');
			xhr.setRequestHeader('Content-Length',data.length);
			xhr.send(data);
			xhr.onload=function(){
				if(xhr.responseText.indexOf('true')>=0)
					alert('SMS sent');
				else
					alert('Unable to send'+"\n\n" + xht.responseText);
			}
		},
	});	
} 

var ExternalScripts = {}

AllianceColor = {
	init:function() {		
		AllianceColor.startTime = new Date();
		var input = document.createElement('input');
		input.id = 'allianceColorSetValue';
		input.type = 'hidden';
		AllianceColor.lastColorVal = '';
		document.body.appendChild(input);
		GM_addStyle('.alliesHighlighterSelector { position:relative; display:inline; margin-'+IkaRTL.txtLeft+':5px; }\
						.alliesHighlighterSelector a { display:block; margin-bottom:.5em; }\
						.alliesHighlighterSelector img { display:inline !important; vertical-align:middle; height:14px; cursor:pointer; }\
						.alliesHighlighterSelector div { display:none; position:absolute; background-color:#F6EBBA; border:1px solid #DCA354; top:15px; '+IkaRTL.txtLeft+':0; padding:1em 1em .5em 1em; '+IkaRTL.txtLeft+':-5px;  z-index:11000 !important; }\
						.alliesHighlighterSelector:hover div { display:block; }\
						');
		if(typeof(AllianceColor.views[IkaTools.getView()]) == 'function')
			AllianceColor.views[IkaTools.getView()]();
		var d = new Date();
//		IkaTools.debug("Allies Highlighter: " + (d.getTime() - AllianceColor.startTime.getTime()));
	},
	addAllianceColorSelector:function(a) {
		a = typeof(a[0]) != 'undefined' ? a[0] : a;
		try { var allianceId = a.href.match(/allyId=(\d+)/)[1]; } catch(e) { var allianceId = false; }
		if(allianceId) {
			var div = document.createElement('div');
			div.className = "alliesHighlighterSelector";
			div.innerHTML = '<img src="' + AllianceColor.icons.color + '"/><div>\
				<a class="allianceColorSetItem" onClick="document.getElementById(\'allianceColorSetValue\').value = \''+allianceId + '_none\';" style="color:#7E2D04;cursor:pointer;">None</a>\
				<a class="allianceColorSetItem" onClick="document.getElementById(\'allianceColorSetValue\').value = \''+allianceId + '_red\';" style="color:#cc0000;cursor:pointer;">Red</a>\
				<a class="allianceColorSetItem" onClick="document.getElementById(\'allianceColorSetValue\').value = \''+allianceId + '_green\';" style="color:#00cc00;cursor:pointer;">Green</a>\
				<a class="allianceColorSetItem" onClick="document.getElementById(\'allianceColorSetValue\').value = \''+allianceId + '_blue\';" style="color:#0000cc;cursor:pointer;">Blue</a>\
				<a class="allianceColorSetItem" onClick="document.getElementById(\'allianceColorSetValue\').value = \''+allianceId + '_purple\';" style="color:#880088;cursor:pointer;">Purple</a>\
				</div>\
			';
			$(a).after(div);
		}
	},	
	loadAlliances:function() {
//		AllianceColor.alliances = typeof(AllianceColor.alliances) == 'undefined' ? (typeof(IkaTools.getVal('alliances') == 'undefined') ? {} : IkaTools.getVal('alliances')) : AllianceColor.alliances;
		AllianceColor.alliances = !!IkaTools.getVal('alliances') ? IkaTools.getVal('alliances') : [];
	}, 
	getAllianceById:function(id) {
		if(id) {
			AllianceColor.loadAlliances();
			var alliance = (!!AllianceColor.alliances && typeof(AllianceColor.alliances[id]) != 'undefined') ? AllianceColor.alliances[id] : false;
			return alliance;
		} else
			return false;
	},
	setAllianceColor:function(allianceId, color) {
		$('#allianceColorSetValue')[0].value = allianceId + '_' + color;
	},
	startChangeListener:function() {
		setInterval(function() {
			if($('#allianceColorSetValue')[0].value != AllianceColor.lastColorVal) {
				AllianceColor.lastColorVal = $('#allianceColorSetValue')[0].value;
				var val = AllianceColor.lastColorVal;
				AllianceColor.loadAlliances();
				var allianceId = val.match(/^\d+/)[0];
				var color = val.match(/_(.+)$/)[1];
				var alliance = AllianceColor.getAllianceById(allianceId);
				alliance = alliance ? alliance : {};
				alliance.id = allianceId;
				alliance.color = color;
				AllianceColor.alliances[allianceId] = alliance;
				IkaTools.setVal('alliances', AllianceColor.alliances);
				AllianceColor.updateColors();
			}
		}, 500);
	},
	updateColors:function() {
		switch(IkaTools.getView()) {
			case 'allyHighscore':
				$('#mainview .contentBox01h .content .table01 tr').each(function() {
					try { var allyLink = $('a.allyLink', this)[0]; } catch(e) { var allyLink = false; }
					if(allyLink) {
						try { var ally = AllianceColor.getAllianceById(allyLink.href.match(/allyId=(\d+)/)[1]); } catch(e) { var ally = false; }
						if(ally) {
							this.className = this.className.replace(/allianceColor_[^\s]+/	, '') + ' allianceColor_' + ally.color;
						}
					}
				});
				case 'island': 
				$('ul#cities li').each(function() {
					try { var allyId = this.innerHTML.match(/allyId=(\d+)/)[1]; } catch(e) { var allyId = false; }
					var alliance = AllianceColor.getAllianceById(allyId);
					if(allyId && alliance) {
						this.className = this.className.replace(/allianceColor[^\s*]/, '') + ' allianceColor_' + alliance.color;
					}
				});
				break;		
			case 'highscore':
				$('#mainview .contentBox01h .content .table01 tr').each(function() {
					try { var allyLink = $('a.allyLink', this)[0]; } catch(e) { var allyLink = false; }
					if(allyLink) {
						try { var ally = AllianceColor.getAllianceById(allyLink.href.match(/allyId=(\d+)/)[1]); } catch(e) { var ally = false; }
						if(ally) {
							this.className = this.className.replace(/allianceColor_[^\s]+/	, '') + ' allianceColor_' + ally.color;
						}
					}
				});
				break;
		}
	},
	views:{
		allyHighscore:function() {
			GM_addStyle('#mainview .contentBox01h .content .table01 tr.allianceColor_red * { color:red; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_green * { color:green; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_blue * { color:blue; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_purple * { color:purple; }');
			$('#mainview .contentBox01h .content .table01 tr').each(function() {
				try { var allyLink = $('a.allyLink', this)[0]; } catch(e) { var allyLink = false; }
				if(allyLink) {
					AllianceColor.addAllianceColorSelector(allyLink);
					try { var ally = AllianceColor.getAllianceById(allyLink.href.match(/allyId=(\d+)/)[1]); } catch(e) { var ally = false; }
					if(ally) {
						this.className = this.className.replace(/allianceColor_[^\s]+/	, '') + ' allianceColor_' + ally.color;
					}
				}
			});
			AllianceColor.startChangeListener();
		},
		island:function() {
			GM_addStyle('#cities li.allianceColor_red .textLabel .before { background-image:url(' + AllianceColor.icons.scroll.red.left + ') !important; }\
						#cities li.allianceColor_red .textLabel .after { background-image:url(' + AllianceColor.icons.scroll.red.right + ') !important; }\
						#cities li.allianceColor_red .textLabel { background-image:url(' + AllianceColor.icons.scroll.red.bg + ') !important; }\
						#cities li.allianceColor_green .textLabel .before { background-image:url(' + AllianceColor.icons.scroll.green.left + ') !important; }\
						#cities li.allianceColor_green .textLabel .after { background-image:url(' + AllianceColor.icons.scroll.green.right + ') !important; }\
						#cities li.allianceColor_green .textLabel { background-image:url(' + AllianceColor.icons.scroll.green.bg + ') !important; }\
						#cities li.allianceColor_blue .textLabel .before { background-image:url(' + AllianceColor.icons.scroll.blue.left + ') !important; }\
						#cities li.allianceColor_blue .textLabel .after { background-image:url(' + AllianceColor.icons.scroll.blue.right + ') !important; }\
						#cities li.allianceColor_blue .textLabel { background-image:url(' + AllianceColor.icons.scroll.blue.bg + ') !important; }\
						#cities li.allianceColor_purple .textLabel .before { background-image:url(' + AllianceColor.icons.scroll.purple.left + ') !important; }\
						#cities li.allianceColor_purple .textLabel .after { background-image:url(' + AllianceColor.icons.scroll.purple.right + ') !important; }\
						#cities li.allianceColor_purple .textLabel { background-image:url(' + AllianceColor.icons.scroll.purple.bg + ') !important; }');
			
			IkaTools.querySelectorAsArray('ul#cities li',document).forEach(function(item) {
				try { var allyId = item.innerHTML.match(/allyId=(\d+)/)[1]; } catch(e) { var allyId = false; }
				if (allyId) {
					AllianceColor.addAllianceColorSelector($('.cityinfo .ally td:eq(1) a', item).eq(0));
				}
			});
			AllianceColor.updateColors();
			AllianceColor.startChangeListener();
		},
		highscore:function() {
			$('#mainview .contentBox01h .content .table01 tr').each(function() {
				try { var allyLink = $('a.allyLink', this)[0]; } catch(e) { var allyLink = false; }
				if(allyLink) {
					if(!allyLink.href.match(/allyId=0/))
						AllianceColor.addAllianceColorSelector(allyLink);
					try { var ally = AllianceColor.getAllianceById(allyLink.href.match(/allyId=(\d+)/)[1]); } catch(e) { var ally = false; }
					if(ally) {
						this.className = this.className.replace(/allianceColor_[^\s]+/	, '') + ' allianceColor_' + ally.color;
					}
				}
			});
			GM_addStyle('#mainview .contentBox01h .content .table01 tr.allianceColor_red * { color:red; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_green * { color:green; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_blue * { color:blue; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_purple * { color:purple; }');
			AllianceColor.startChangeListener();
		},
	},
	icons:{
		color:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMnSURBVHjaVJNJaBNhFMf/38w3M5l0MknTPWltVVyLbaGCgjtYQVGseBGKV/HgyZuiB8GDF0FE9CaCXtSDoOCCu4goiCJIoS5Nl5jYGjOdJJNtls/nUtFveLxv4P3/7/ceM0wIgfnDxky5qVrZs4iFRnqY3tstyYl2CX6r5E63yfU3PXrt8tJk7T7+OWzeQBldt0hxM6dXa4nhTdEB9EUWIKGaiEoMIW8OSnWS4qar5ucu6hn3aMPWev6vARs70GP62Rs7jOUDW1pWIaL7qOIzYnDQQUWdMNCGFWBOEfX0Q/DU3TvyaHFEPiwszlInVF2Kn9ke7h8YaluGd+pbhGBhIXTKJsII6FYB916ClXQwbRuELLbXnVvHdeAwB2vd2a+Fd29u7sVbdZokCTTRY5DQJKlJ2SASVtKAbzOQC5/hN2xEkHty0N7LrvCQ1jnSrzSD63HIqCNOgma4hO+iARxRGkGrFQFLoqgBk18gJ5aCtwzp+ZfX9nGVJ/uS4Ta8ByPcJPUEdRVk4qOR7obwATsH5CrAV9rbV5VIPkCWE3BzymoOqasjpkQxFTBCBVEIqGRmMPzqrjjOb/FMCMiSOC0DdQtIJOF9Y10cec0PVBUB1bjiT5CwQrlMYdYikGxiKRZ+R8UGgircqgrPbfS5+4Wn52SxMlxicMoAlSBP1DKNq9LYBjGZdhMwRyROCahSdHCUZ2fgerEUr2TVVxNCrFwfZ3g8TiISiyrgUzaIOkaG4WIYfJYovtMy7QKCNa2wX43B84xnHJ/Epeuj7v6+DTKPFjhmp2hEMlAUIqGRTRojUmaIF8jKIr5Vy2CNp2G9yNJmY1clcVx55nyoXrj9yMHyqI9mwv4+QcRpMiAza5LeM0T+c4kr2lHQNUw/TaNcD50cFPfG+a8fwXaPPbhV6fQ+1vZsHYxiYEhDgcYR1MMlw6CTDBI+iqkKpu5MwH5TONsI4/x/PxPrzhjI5I8YYId2rY+YvYsj6IopaAx88JkSgk/0DbzOZdXAOhXH7LlBcTD4z2D+hNi7vhYUh1vgrW1iortV+H47ydshni+BfmNYbEz9W/9DgAEAHjlV3dGNk1wAAAAASUVORK5CYII%3D',
		scroll:{
			red:{
				left:'data:image/gif;base64,R0lGODlhDAAXANUnAHQREdIeHuZPT8EcHORCQupra+lkZIkUFJUWFvW4uJoWFpwXF7YaGtYfH9cfH7QaGpEVFXAQEOVISJcWFvW5udQfH3IREbMaGm0QEPa/v6UYGPSxseM9PedUVPrZ2e2Dg+EqKvvg4OAlJet1dfvl5ffHx+liYv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAMABcAAAZwwJNGszicjsjjUGFMHjOESwRRAQwCAkMhQWBYEA4rVkvamECcjmj0KXlC5XN63X7H0Wq2G27G0/d3c3p2fYJ1fHJ5h4GKgIWNhIl/kX6DiJWLj5OXho6SlhQEDxgQAWJZW10AEw2nWhJDRU5IS01OQQA7',
				bg:'data:image/gif;base64,R0lGODlhAQAXAJECAOpra/vg4P///wAAACH5BAEAAAIALAAAAAABABcAAAIHlAChy41WAAA7',
				right:'data:image/gif;base64,R0lGODlhDAAXANUjALQaGuRCQokUFOlkZJoWFpwXF5UWFrYaGvW4uPa/v/W5ubMaGpEVFXQREdcfH5cWFtQfH3AQEHIREdIeHm0QENYfH+ZPT6UYGOpra/SxseM9PedUVPrZ2eEqKvGamvvl5eliYvvg4PfHx////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACMALAAAAAAMABcAAAZwwJFwOLpcCgIi0UhIYjADiwWQCCwiBsgzOkUEDhKDIxTiiESeTwbU0WzIZrSa7Yaf0+v2u3yf6+1yeXV8gXR7cXiGgIl/hIyDiH6QfYKHlIqOkpaFjZGVW1IACgEAFAwToF1fDQ8VSkJGSK+wF00jQQA7',	
			},
			green:{
				left:'data:image/gif;base64,R0lGODlhDAAXANUnAC10EVDSHnnmT2/kQo7qa4npZDWJFErBHDycF8n1uDmVFjuaFkW2Gsr1uVHUHzqXFitwECxyEVLWH3TlSEW0GiptEEWzGs72v1LXHziRFT+lGIjpYlngJeL62WvjPaHtg13hKuj74NT3x33nVMT0sZbrdev75f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAMABcAAAZwwJNGgzCcjsjjcGFMHi8DC0ThABwCggIhMWBEFBgrVmsibUCeEaf0EXVC5XN63X7H0Wq2G27G0/d3c3p2fYJ1fHJ5h4GKgIWNhIl/kX6DiJWLj5OXho6Slg0DFBUZAWJZW10ADxKnWhNDRU5IS01OQQA7',
				bg:'data:image/gif;base64,R0lGODlhAQAXAJECAI7qa+j74P///wAAACH5BAEAAAIALAAAAAABABcAAAIHlAChy41WAAA7',
				right:'data:image/gif;base64,R0lGODlhDAAXANUjAEW0Gm/kQonpZDWJFDuaFsn1uEW2GjycFzmVFjqXFi10Ec72v1HUH1LXH0WzGitwEMr1uSptEFDSHlLWHziRFSxyEXnmT47qaz+lGIjpYuL62WvjPV3hKrLxmn3nVMT0sev75ej74NT3x////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACMALAAAAAAMABcAAAZwwJFwOMJgDgMi0UhIXi4CiwWwCDgeCMYzOi0EDBVEIxTSiEQd0CfD2XjIZrSa7Yaf0+v2u3yf6+1yeXV8gXR7cXiGgIl/hIyDiH6QfYKHlIqOkpaFjZGVW1IAEAEAERQSoF1fCgkTSkJGSK+wGE0jQQA7',	
			},
			blue:{
				left:'data:image/gif;base64,R0lGODlhDAAXANUnABEjdB4/0k9r5muC6hw6wWR96RQqiUJg5BYtlRo3trjD9RYumhcwnBo2sxAicB9B10hl5b/J9hYulx9A1B9B1ho2tBAhbREjcrnE9RUskRgypVRv57G99HWL69nf+j1c42J76eDl+8fQ9yVH4IOX7SpM4eXp+////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAMABcAAAZwwJNGwzCcjsjjcGFMHiOHhgMxARACgsJAcUhcEA8rVmvigEqfzahDEnlC5XN63X7H0Wq2G27G0/d3c3p2fYJ1fHJ5h4GKgIWNhIl/kX6DiJWLj5OXho6SlhgHFRYZAWJZW10AEhSnWhBDRU5IS01OQQA7',
				bg:'data:image/gif;base64,R0lGODlhAQAXAJECAGuC6uDl+////wAAACH5BAEAAAIALAAAAAABABcAAAIHlAChy41WAAA7',
				right:'data:image/gif;base64,R0lGODlhDAAXANUjABo2tBQqiUJg5GR96bjD9RYtlRYumho3thcwnBAhbREjch9B1hEjdL/J9h9B1x4/0hAicBo2sxYul7nE9RUskR9A1E9r5hgypWuC6lRv57G99Jqq8dnf+j1c42J76SpM4eXp++Dl+8fQ9////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACMALAAAAAAMABcAAAZwwJFwOLpcEAEi0WhIYjADiwXQEEQghcozOiUIDoqCIxTiiEQbkMbz6WTIZrSa7Yaf0+v2u3yf6+1yeXV8gXR7cXiGgIl/hIyDiH6QfYKHlIqOkpaFjZGVW1IAEwIACRQPoF1fDBILSkJGSK+wF00jQQA7',	
			},
			purple:{
				left:'data:image/gif;base64,R0lGODlhDAAXANUnAJ4e0lgRdLZC5MNk6cZr6pIcwWgUibtP5nQWmuS49XYXnHEWlYkatuS59aIf13IWl1UQcKIf1m4Vkea/9lYRcrhI5Ycas1IQbYgatKAf1H0Ypb1U5/HZ+uGx9Ml16/Pg+/Xl+8+D7aol4K0q4cJi6enH97M94////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAMABcAAAZwwJNGozCcjsjjEGFMHicCC2SRCRQAhwEhIWBQFg4rVgvqkEamjcgTKnE+5XN63X7H0Wq2G27G0/d3c3p2fYJ1fHJ5h4GKgIWNhIl/kX6DiJWLj5OXho6Slg0CGBcSAGJZW10BDxGnWhVDRU5IS01OQQA7',
				bg:'data:image/gif;base64,R0lGODlhAQAXAJECAMZr6vPg+////wAAACH5BAEAAAIALAAAAAABABcAAAIHlAChy41WAAA7',
				right:'data:image/gif;base64,R0lGODlhDAAXANUjAIgatLZC5MNk6WgUiXEWleS49XQWmnYXnIkatlUQcG4Vkea/9qAf1J4e0lYRclgRdIcas3IWl6If1qIf11IQbeS59cZr6rtP5n0Ypb1U59ia8fHZ+uGx9PXl+60q4cJi6bM94/Pg++nH9////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACMALAAAAAAMABcAAAZwwJFwOMJgDgMi0WhIWiyCywWwCEASBMYzOi0EEA7CJBTaiESaDufjAWXIZrSa7Yaf0+v2u3yf6+1yeXV8gXR7cXiGgIl/hIyDiH6QfYKHlIqOkpaFjZGVW1IAFQEAFAoNoF1fDxESSkJGSK+wGE0jQQA7',	
			},
		},
	}
};

unsafeWindow.allianceColorSet = function(allianceId, color) {
	$('#allianceColorSetValue')[0].value = allianceId + '_' + color;
};

function trim(txt) {
	txt = (typeof(txt) == 'undefined' || !txt) ? '' : txt;
	return txt.toString().replace(/^\s*/, '').replace(/\s*$/, '');
}

ExMachina.init();
