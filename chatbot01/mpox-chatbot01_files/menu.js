/*!
 * myJs v1.0.0
 * Copyright © 2017 NetSoft Limited. All rights reserved.
 */
var my_path = '/';
var cdomain = (location.domain) ? location.domain : null;
var cookie_path = "/";
var location_href=window.location.href;
var prefixes = "";
var root_path = "";
var lang_root = "";
var cookiePath = "";
var lang = 0;
var langtxt = '';
var langsub = '';
var btnLang = '';
var isIndex = false;
var isMobile = false;
var isText = false;
var myTitle = '';
var lang_path='';
var breadcrumbArr = new Array;
var section='';
var subMenu = -1;
var isInternal = false;
var lt='';
var srceenResize=false;
var dateSelectorMinYear = 2004;
var bookmarked=false;
var section_title='';
var headerBanner=1;
var isMenHealth=false;
var select_min_year = null;
var banner_first_display = 0;
var check_wa=1;
var loopCount = 0;
var current_year = 2017;
var flexslider_animationLoop=false;
var MycurSlide=null;
/*===Domain===*/
var lang_root = location_href.replace(/^.+?\/(?:en|tc|sc|english|tc_chi|sc_chi)\//,'').replace(/[^\/]*$/,'').replace(/[^\/]+/g,'..');
root_path = '../'+lang_root;
lang_path = lang_root;

var last_revision_date_object = new Date(0);


if($.cookie("mobileVersion"))
		if(eval($.cookie("mobileVersion")))
			isMobile = true;
			
if(location_href.match('/en/'))
{
	lang=0;
	langtxt="en";
	langsub="e";
	lt='_en';
	lang_text='en';
}
else if(location_href.match('/tc/'))
{
	lang=1;
	langtxt="tc";
	langsub="c";
	lt='_tc';
	lang_text='zh_tw';
}
else if(location_href.match('/sc/'))
{
	lang=2;
	langtxt="sc";
	langsub="sc";
	lt='_sc';
	lang_text='zh_cn';
}
else if(location_href.match('/'))
{
	lang=0;
	langtxt="en";
	isIndex=true;
	langsub="e";
	lt='_en';
	lang_text='en';
}
 
if(location_href.match(location_href.match('/en/index.htm')||location_href.match('/tc/index.htm')||location_href.match('/sc/index.htm'))){
	isIndex=true; 
}
if(!(location_href.match('.htm')) && !(location_href.match('.php')) && !(location_href.match('.jsf')))
	isIndex=true;



/*===Ready and Init===*/
$(function(){myInit();});
window.onload=function(){myInit2()};
myInit3();

function myInit(){
	if(lang>0)
		chineseVer();
	if(isIndex)
		initIndex();
	//Jacky
	if(location_href.match('/static/'))
		StaticNavBar();
    else if(location_href.match('/sitemap.html'))
		SiteMapNavBar();
	initBrowser();
	//convert parent id to title
	initFeatureParentId();
	initMySite(); 
	initMobile();
	initLeftMenu();
	myCookies();
	externallinks();
	initDateSelector(); 
	checkBookmarPage();  
	initFeaturePressReleaseTable(); // handle old CHP content
	
	// 2019-12-06 - add GA
	// 2023-06-30 - update to GA4
	var ga4 = 'G-X9BGQZW6B7';
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://www.googletagmanager.com/gtag/js?id='+ga4;
	script.async = true;
	script.onload = runGA(ga4);
	document.getElementsByTagName('head')[0].appendChild(script);
	
	$(document).on('click .qrBtn', function(e){
		if($('.qr-content').hasClass('active')){
			$('.qr-content').removeClass('active');
		}
		if($('.shareBtn').parent().hasClass('active')){
			$('.shareBtn').parent().removeClass('active');
		} 
	});		
	
	$(".subMenu").first().next().hide();	
	
	//set up session bannerList
	/*Jacky 20170524*/
	if(subMenu!=-1){
		var mainHeader=$('.mainHeader');
		var class_val=mainHeader.attr('class').replace(/\d/g, (subMenu+1)); 
		mainHeader.attr('class',class_val);
	}
	
	if(isMenHealth && lang>0)
		initMenHealthStyle();	
	
	if(isMenHealth && lang>0)
		mensVoicePaging();

	if( $('.eRdesc').length && eRdesc.length ){
		$('.eRdesc').html(eRdesc[lang])
	}
	
	convertStaticTable();

	$('.temp_hide').removeClass('temp_hide');
	
	//Check keyword 20171211
	//20221018 - change the search URL
	//if(window.location.href.indexOf("chp_search_result.php")==-1) {
	if(window.location.href.indexOf("search_result.php")==-1) {
		$( "form" ).submit(function( event ) {
			return checkKeyword($(this));
		});	
	}
	 
} 

function runGA(id){
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', id);
}

//Check search keyword 20171211
function checkKeyword(keywordbox){	
 
	if(keywordbox.attr('id')=='event_photo_search' || keywordbox.attr('id')=='photo_gallery_search'){
		return true;
	}else{
		var searchKeyowrd=keywordbox.attr('id').replace("searchForm", "searchbar");
		var searchKeyowrdVal=$( "#"+searchKeyowrd ).val();
		var arr = ['Enter search keyword(s)','輸入查詢字串','输入查询字串'];
		if( searchKeyowrdVal=='' || searchKeyowrdVal==arr[lang] ){ 
			alert(arr[lang]);
			return false;
		}	 
	}
	return true;
}

function myInit2(){
	initList();
	initTable();
	
	//Hamlet update 2017-06-30
	initDnsTable();
}

function myInit3(){
	//fastMobile();
	//fastCookies();
}


function initMySite(){
	initHeader();
	initMenu();
	initSearch();
	initBreadcrumb();
	//subMenus();
	initStyleDiv();
	//initSlide();
	initClick();
	if(getURLParameter('f')){
		setFrom(getURLParameter('f'));
	}
}

function setFrom(menuid){
	
	$('#mainContent a').each(function(){
		 
		var href = $(this).attr('href');
		if(typeof href != 'undefined'){
			if(href.substr(0,1)){ 
				if(href.indexOf('javascript:')<0 && href.indexOf('#top')<0  ){
					//$(this).attr('href',href+'?f='+menuid);  
					$(this).attr('href',updateURLParameter($(this).attr('href'),'f',menuid));
				} 
			}
		}
		 
		/*
		$(this).prepend(txt);
		var href = $(this).attr('href');
		$(this).click(function(e){			
			e.stopPropagation();
        	e.preventDefault();
			var win = window.open(href);
			return false;
		});
		$(this).keypress(function(e){
			e.stopPropagation();
        	e.preventDefault();
			var win = window.open(href);
			return false;
		})
		$(this).addClass('externalUrl');
		*/
	});		
}

/*========Cookies==========*/

$.urlParam = function(name){
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}

function myCookies(){ 
	if($.cookie("fontSize"))
		fontSize($.cookie("fontSize"));
	else
		fontSize(1);
}

function fastMobile()
{
	var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
	if (mobile)
	{
		/*if(eval($.cookie("firstMobile")))
		{
			
		}
		else if(!(eval($.cookie("mobileVersion"))))
		{
			$.cookie("firstMobile", 'true', {path:'/', domain:window.location.hostname});
			/*var currentURL = document.location.href;
			var boo = !eval($.cookie("mobileVersion"));
			$.cookie("mobileVersion", boo, {path:'/', domain:window.location.hostname});*/
			//document.location.href=currentURL.replace(/#.*/,'');
		/*}*/
	}
}

function fastCookies()
{
	var op = '';	
	var fs = [[1.4,1.8,2.2],[1.2,1.3,1.4]];
	var fsc = 0;
	var stc = 1;
	if($.cookie("fontSize"))
		fsc = $.cookie("fontSize");
	op	+=	'<style type="text/css">';	
	op	+=	'.contentArea, .subTitle{font-size:'+fs[0][fsc]+'em}'
		+	'.menuStyleDivide{font-size:'+fs[1][fsc]+'em}'	
	op	+=	'</style>';	
	document.write(op);
}

/*=======backgroundFunctuin======*/
function chineseVer()
{
	$('body').addClass('chineseVersion');
	if(lang==1)
		$('body').addClass('tradition');
	if(lang==2)
		$('body').addClass('simplify');
}

function buttonToggle(obj,boo){
	obj.find('img').each(function(){
		var src = $(this).attr('src');
		if(boo)
		{
			if(!(src.match('_on.')))
				$(this).attr('src', $(this).attr('src').toString().replace('.gif','_on.gif').replace('.jpg','_on.jpg').replace('.png','_on.png'));
		}
		else
		{
			$(this).attr('src', $(this).attr('src').toString().replace('_on.gif','.gif').replace('_on.jpg','.jpg').replace('_on.png','.png'));
		}
	});
}

function initIndex(){
	$('body').addClass('indexVersion');
	/*if($('.index_area1 .index_area1_1 #flexslider1 li').length<=0){
		$('.index_area1 .index_area1_1').css('display','none');
		$('.index_area1 .index_area1_2').addClass('full');
	}*/
}

function initHeader()
{
	$('.headerTool').after(clearBoth());
	$('.headerArea').append(clearBoth());
}

function cheakBoo(arr)
{
	var bool = false;
	for(var i=0;i<arr.length;i++)
	{
		if(location_href.match(arr[i]))
		{
			bool = true;
			return bool;		
			break;			
		}
	}
	return bool;
}

function createList(arr,cla,jon)
{
	var op ='';
	var j ='';
	var t = '';
	if(cla==='undefined' || cla===undefined)
		cla='';
	if(jon==='undefined' || jon===undefined)
		jon = false;
	if(jon===true)
		j = '&nbsp;|&nbsp;';
	else if(jon!=false)
		j=jon;		
	op += '<ul class="'+cla+'">';
	for(var i=0;i<arr.length;i++)
	{
		var a = arr[i];
		if(!$.isArray(a))
			a = [a];
		if (typeof a[1] === 'undefined')
			a.push('');
		t=a[0];
		if(i==arr.length-1)
			j = '';
		op+='<li class="'+a[1]+'">'+t+j+'</li>'
	}
	op += '</ul>';
	return op;
}

function AAASelection(obj)
{
	 $('.aaaTool .aBtn').css('color','inherit');
	 $('.aaaTool .aBtn').css('color','inherit');
	 $('.aaaTool .aBtn').css('color','inherit');
	 $('#fontSize'+obj).css('color','#e51f2e');
}

String.prototype.ReplaceAll = function(stringToFind, stringToReplace){
    var temp = this;
	var index = temp.indexOf(stringToFind);
	var stringToChanging = '/thisWordIsUseForChangeTheLanguage/';
	while(index != -1){			
		temp = temp.replace(stringToFind,stringToChanging);
		index = temp.indexOf(stringToFind);
	}
	var index2 = temp.indexOf(stringToChanging);
	while(index2 != -1){			
		temp = temp.replace(stringToChanging,stringToReplace);
		index2 = temp.indexOf(stringToChanging);
	}
 	return temp;
}

/*===Open a new window for external links===*/
function externallinks() {
	if (!document.getElementsByTagName) return; 
	var txt = '';
	var tArr = ['This link will open in a new window','這連結會以新視窗打開。','这连结会以新视窗打开。'];
	txt = '<span class="access externalText">'+tArr[lang]+'</span>';
	$('a[rel="external"]').not(".externalUrl").each(function(){
		$(this).prepend(txt);
		var href = $(this).attr('href');
		$(this).click(function(e){			
			e.stopPropagation();
        	e.preventDefault();
			var win = window.open(href);
			return false;
		});
		$(this).keypress(function(e){
			if ( event.which == 13 ) {
				e.stopPropagation();
				e.preventDefault();
				var win = window.open(href);
				return false;
			}
		})
		$(this).addClass('externalUrl');
	});	
}

/*===Change the language===*/
function chglang(l){
	var currentURL=document.location.href;
	var langArr = [
					['en','index.hmtl'],
					['tc','cindex.html'],
					['sc','scindex.html']
					];
	var nextURL = '';
	if(currentURL.indexOf("/"+langArr[lang][0]+"/")>=0){
		nextURL=currentURL.ReplaceAll("/"+langArr[lang][0]+"/","/"+langArr[l][0]+"/");
	}
	else if(currentURL.indexOf(langArr[lang][1])>=0)
	{
		nextURL=currentURL.ReplaceAll("/"+langArr[lang][1],"/"+langArr[l][1]);
	}
	else
	{
		nextURL=currentURL+langArr[l][1];
		
	}
	
	
	//for pdfwav
	if(nextURL.includes("/resources/e_health_topics/pdfwav_") || nextURL.includes("/wapdf/")){
		nextURL = removeURLParameter(nextURL,'page');
	}
	//for pdfwav
	document.location.href=nextURL.replace(/#.*/,'');
}


function mobileVersion()
{

}
/*===Create the Mobile Menu===*/

function extMenu(arr,cla,lvl,css,sec,mob)
{
	var op ='';
	var j ='';
	var t ='';
	var e ='';
	var u ='';
	var s = '';
	var ss = '';
	var ce = '';
	var ces = '';
	var currentURL=document.location.href;	
	if(typeof breadcrumbArr[lvl] === 'undefined')
		breadcrumbArr[lvl] = false;
	
	if(cla==='undefined' || cla===undefined)
		cla='';
	if(css==='undefined' || css===undefined)
		css='';
	if(sec==='undefined' || sec===undefined)
		sec=0;
	if(mob==='undefined' || mob===undefined)
		mob=false;
	if(!$.isArray(arr[0][1]))
		s = arr[0][1].split('/');
	else
		s = arr[0][1][lang].split('/');
	if(currentURL.indexOf('/'+langtxt+'/'+s[0]+'/')>-1)
		ce = " menu_expand";
	op += '<ul class="menuLv'+lvl+' '+cla+ce+'">';
	for(var i=0;i<arr.length;i++)
	{
		var a = arr[i];
		var ext ='';	
		var fs = '';	
		t=a[0][lang];
		u=a[1];
		ces = '';
		if(Object.prototype.toString.call(u)==='[object Array]')
			u=u[lang];
		ss = u.split('/');
		if(Object.prototype.toString.call(css)==='[object Array]')
			t=css[0]+t+css[1];
		else if(css!='')
			t=t+css;
		var p = u.ReplaceAll('../','');
		var pArr = p.split('?cat=');
		if(typeof pArr[1] !== 'undefined')
			if(currentURL.indexOf(pArr[1])>-1)
				breadcrumbArr[lvl] = [t,u];
		if (typeof a[2] === 'undefined')
			e='';
		else
			e=a[2];
		for(var ii=0;ii<ss.length;ii++)
		{
			fs += '/'+ss[ii];
		}
		if(currentURL.indexOf(fs.ReplaceAll('../',''))>-1 && e=='')
		{
			
			ces = 'active_section1';
			if(lvl==0)
				section = i;
			else
				section = sec;
		}else{ 
			var tmp=fs.ReplaceAll('../','').split("/");
			 if(currentURL.indexOf(tmp[1])>-1){
				 
				 ces = 'active_section2';
			 }
		}
		var scla='listStyleBlank menu_items';
		/*if(mob)
			scla+=' menuItem hiddenMenu isHidden addLabelLedby'+(i+1);
		if(mob && lvl>0)
			op+='<li class="subMenuTitle"><a href="javascript:backShow(this)"><img src="'+root_path+'images/sxback.png" alt="" title="">'+t+'</a></li>';*/
			
		if(a[3]!=='undefined' && a[3]!==undefined && a[3]!=false && $.isArray(a[3]) && lvl<9999)
			ext = extMenu(a[3],scla,lvl+1,css,i,mob);
		
		/*if(!(u.indexOf("http://")>-1) && !(u.indexOf("https://")>-1))
		{
			if(isText)
				u = lang_root+u;
			else
				u = lang_root+u;
		}
		 if(mob && ext!='')
			op+='<li class="close"><a href="'+u+'" class="leftbtn visiblePhono addShowMenu"><span class="myText">'+t+'</span></a>'+ext+'</li>';
		else */
		if((u.indexOf("http://")>-1) || (u.indexOf("https://")>-1))
		{
			e='external';
		}		
		if(ext!='')
			op+='<li class="close"><a href="'+u+'" class="leftbtn excLi '+ces+'"><span class="myText">'+t+'</span></a>'+ext+'</li>';
		else
			op+='<li><a href="'+u+'" class="leftbtn '+ces+'" rel="'+e+'">'+t+'</a>'+ext+'</li>';
	}
	op += '</ul>';
	return op;
}

function returnFalse(){
	return false;
}

function createHeader(){
	var op='';
	op+='<div class="desktopTool">'+headerTool()+'</div>';	
	op+='<div class="mobileTool">'+moblieheaderTool()+'</div>';
	op+='<div class="mobileTool otherLangTool">'+moblieOherLangheaderTool()+'</div>';
	op+=headerMenu();
	op+=clearBoth();	
	document.write(op);
}
function createHeader2(){
	var op='';
	op+='<div class="desktopTool">'+headerTool2()+'</div>';
	op+='<div class="mobileTool">'+moblieheaderTool2()+'</div>';
	op+='<style type="text/css">.headerArea:after{display:none;}</style>';
	op+=clearBoth();	
	document.write(op);
}

/*function createMeun()
{
	var op='';
	op+=headerMenu();
	op+=menuBanner();
	op+=w3cIcon();
	op+='<div class="menuBg"></div>';
	document.write(op);
}*/

function moblieheaderTool(){
	var op='';
	
	//var rss_path = '';
	var arr = [
				['my-menu',['Menu','Menu','Menu'],'btn_menu_mob.png']/*,
				['email',['Email','',''],'btn_mobileEmail.png','mailto:smdu_1@csb.gov.hk'],
				['home',['Home','',''],'btn_mobileHome.png',root_path+'index.php']*/
			];
	var langArr = [
				//['Eng','繁','简'],
				['<img src="/files/png/chglang_mobile_en.png" alt="English" title="English">','<img src="/files/png/chglang_mobile_tc.png" alt="繁" title="繁">','<img src="/files/png/chglang_mobile_sc.png" alt="簡" title="簡">'],
				['en','zh-hk','zh-cn']
			];
	var arr2 = [
				['share',['Share','分享','分享'],'../files/png/icon_share.png','#'],
				//['email',['Email','',''],'icon_mail.png','#'],
				['rss',['RSS','RSS','RSS'],'../files/png/icon_rss.png','/'+langtxt+rss_path],
				['search',['Search','Search','Search'],'icon_search.png','#']
			];
	var sarr = [
				[['Facebook','Facebook','Facebook'],'icon_facebook.png','facebook();return false;'],
				[['Twitter','Twitter','Twitter'],'icon_twitter.png','twitter();return false;'],
				[['Email','Email','Email'],'icon_email.png','email();return false;'],
				[['WhatsApp','WhatsApp','WhatsApp'],'icon_whatsapp.png','whatsapp();return false;']
			];
			
	var larr = new Array;
	for(var i=0;i<langArr[0].length;i++)
	{
		if(!(i==lang))
			larr.push([langArr[0][i],i,langArr[1][i]]);
	}		
	for (var i=0;i<arr.length;i++)
	{
		if (typeof arr[i][3] === 'undefined')
			arr[i][3] = '';
		if(arr[i][3] != '')
			op+='<button onclick="window.location.href=\''+arr[i][3]+'\'" onkeypress="window.location.href=\''+arr[i][3]+'\'" class="navbar-menu navbar-'+arr[i][0]+'" type="button"><span class="sr-only">'+arr[i][1][lang]+'</span><span><img src="'+root_path+'images/'+arr[i][2]+'" alt="" title=""></span></button>';
		else
			op+='<button class="navbar-menu navbar-'+arr[i][0]+'" type="button"><span class="sr-only">'+arr[i][1][lang]+'</span><span><img class="mCEvt" src="'+root_path+'images/'+arr[i][2]+'" alt="" title=""></span></button>';
	}	
	op+='<div class="mobile_header_right">';	
	for (var i=0;i<arr2.length;i++)
	{
		//console.log(i,arr2[i][3]);
		if (typeof arr2[i][3] === 'undefined')
			arr2[i][3] = '';
		if(i==0){
			var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
			if (mobile){
				op+='<button onclick="window.location.href=\''+arr2[i][3]+'\'" onkeypress="window.location.href=\''+arr2[i][3]+'\'" class="shareBtn navbar-menu navbar-'+arr2[i][0]+'" type="button"><span class="sr-only">'+arr2[i][1][lang]+'</span><span><img src="'+root_path+'images/'+arr2[i][2]+'" alt="" title=""></span></button>'+
					'<ul class="listStyleInline shareBar">'+
						'<li><a href="#" onclick="'+sarr[0][2]+'" title="'+sarr[0][0][lang]+'"><img src="'+root_path+'images/'+sarr[0][1]+'" alt="'+sarr[0][0][lang]+'"></a></</li>'+
						'<li><a href="#" onclick="'+sarr[1][2]+'" title="'+sarr[1][0][lang]+'"><img src="'+root_path+'images/'+sarr[1][1]+'" alt="'+sarr[1][0][lang]+'"></a></li>'+
						'<li><a href="#" onclick="'+sarr[2][2]+'" title="'+sarr[2][0][lang]+'"><img src="'+root_path+'images/'+sarr[2][1]+'" alt="'+sarr[2][0][lang]+'"></a></li>'+
						'<li><a href="#" onclick="'+sarr[3][2]+'" title="'+sarr[3][0][lang]+'"><img src="'+root_path+'images/'+sarr[3][1]+'" alt="'+sarr[3][0][lang]+'"></a></li>'+
					'</ul>';
			}else{
				op+='<button onclick="window.location.href=\''+arr2[i][3]+'\'" onkeypress="window.location.href=\''+arr2[i][3]+'\'" class="shareBtn navbar-menu navbar-'+arr2[i][0]+'" type="button"><span class="sr-only">'+arr2[i][1][lang]+'</span><span><img src="'+root_path+'images/'+arr2[i][2]+'" alt="" title=""></span></button>'+
					'<ul class="listStyleInline shareBar">'+
						'<li><a href="#" onclick="'+sarr[0][2]+'" title="'+sarr[0][0][lang]+'"><img src="'+root_path+'images/'+sarr[0][1]+'" alt="'+sarr[0][0][lang]+'"></a></</li>'+
						'<li><a href="#" onclick="'+sarr[1][2]+'" title="'+sarr[1][0][lang]+'"><img src="'+root_path+'images/'+sarr[1][1]+'" alt="'+sarr[1][0][lang]+'"></a></li>'+
						'<li><a href="#" onclick="'+sarr[2][2]+'" title="'+sarr[2][0][lang]+'"><img src="'+root_path+'images/'+sarr[2][1]+'" alt="'+sarr[2][0][lang]+'"></a></li>'+
					'</ul>';
				
			}
		}else if(arr2[i][3] != '')
			op+='<button onclick="window.location.href=\''+arr2[i][3]+'\'" onkeypress="window.location.href=\''+arr2[i][3]+'\'" class="navbar-menu navbar-'+arr2[i][0]+'" type="button"><span class="sr-only">'+arr2[i][1][lang]+'</span><span><img src="'+root_path+'images/'+arr2[i][2]+'" alt="" title=""></span></button>';		
		else
			op+='<button class="navbar-menu navbar-'+arr2[i][0]+'" type="button"><span class="sr-only">'+arr2[i][1][lang]+'</span><span><img class="mCEvt" src="'+root_path+'images/'+arr2[i][2]+'" alt="" title=""></span></button>';
	}		
	op+='<div class="menuRight mOnly" lang=\"'+larr[0][2]+'\">'+
			'<a href="javascript:chglang('+larr[0][1]+')">'+larr[0][0]+'</a>'+
		'</div>'+
		'<div class="menuRight mOnly" lang=\"'+larr[1][2]+'\">'+
			'<a href="javascript:chglang('+larr[1][1]+')">'+larr[1][0]+'</a>'+
		'</div>';	
	op+='</div>';
	op+=searchTool2();
	//op+='<div class="mobile_header_right"><img src="'+root_path+'images/fake_1_mob.jpg" alt=""></div>';
	return op;
}

function moblieheaderTool2(){
	var op='';
	
	//var rss_path = '';
	var arr = [
				['my-menu',['Menu','',''],'btn_menu_mob.png']/*,
				['email',['Email','',''],'btn_mobileEmail.png','mailto:smdu_1@csb.gov.hk'],
				['home',['Home','',''],'btn_mobileHome.png',root_path+'index.php']*/
			];
	var langArr = [
				//['Eng','繁','简'],
				['<img src="/files/png/chglang_mobile_en.png" alt="English" title="English">','<img src="/files/png/chglang_mobile_tc.png" alt="繁" title="繁">','<img src="/files/png/chglang_mobile_sc.png" alt="簡" title="簡">'],
				['en','zh-hk','zh-cn']
			];
	var arr2 = [
				['share',['Share','',''],'../files/png/icon_share.png','#'],
				//['email',['Email','',''],'icon_mail.png','#'],
				['rss',['RSS','',''],'../files/png/icon_rss.png','/'+langtxt+rss_path],
				//['search',['Search','',''],'icon_search.png','#']
			];
	var sarr = [
				[['Facebook','Facebook','Facebook'],'icon_facebook.png','facebook();return false;'],
				[['Twitter','Twitter','Twitter'],'icon_twitter.png','twitter();return false;'],
				[['Email','Email','Email'],'icon_email.png','email();return false;'],
				[['WhatsApp','WhatsApp','WhatsApp'],'icon_whatsapp.png','whatsapp();return false;']
			];
			
	var larr = new Array;
	for(var i=0;i<langArr[0].length;i++)
	{
		if(!(i==lang))
			larr.push([langArr[0][i],i,langArr[1][i]]);
	}		
	/*for (var i=0;i<arr.length;i++)
	{
		if (typeof arr[i][3] === 'undefined')
			arr[i][3] = '';
		if(arr[i][3] != '')
			op+='<button onclick="window.location.href=\''+arr[i][3]+'\'" onkeypress="window.location.href=\''+arr[i][3]+'\'" class="navbar-menu navbar-'+arr[i][0]+'" type="button"><span class="sr-only">'+arr[i][1][lang]+'</span><span><img src="'+root_path+'images/'+arr[i][2]+'" alt="" title=""></span></button>';
		else
			op+='<button class="navbar-menu navbar-'+arr[i][0]+'" type="button"><span class="sr-only">'+arr[i][1][lang]+'</span><span><img class="mCEvt" src="'+root_path+'images/'+arr[i][2]+'" alt="" title=""></span></button>';
	}*/
	op+='<div class="mobile_header_right pdfwav_mobile_tool">';	
	for (var i=0;i<arr2.length;i++)
	{
		if (typeof arr2[i][3] === 'undefined')
			arr2[i][3] = '';
		if(i==0){
			var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
			if (mobile){			
				op+='<button onclick="window.location.href=\''+arr2[i][3]+'\'" onkeypress="window.location.href=\''+arr2[i][3]+'\'" class="shareBtn navbar-menu navbar-'+arr2[i][0]+'" type="button"><span class="sr-only">'+arr2[i][1][lang]+'</span><span><img src="'+root_path+'images/'+arr2[i][2]+'" alt="" title=""></span></button>'+
					'<ul class="listStyleInline shareBar">'+
						'<li><a href="#" onclick="'+sarr[0][2]+'" title="'+sarr[0][0][lang]+'"><img src="'+root_path+'images/'+sarr[0][1]+'" alt="'+sarr[0][0][lang]+'"></a></</li>'+
						'<li><a href="#" onclick="'+sarr[1][2]+'" title="'+sarr[1][0][lang]+'"><img src="'+root_path+'images/'+sarr[1][1]+'" alt="'+sarr[1][0][lang]+'"></a></li>'+
						'<li><a href="#" onclick="'+sarr[2][2]+'" title="'+sarr[2][0][lang]+'"><img src="'+root_path+'images/'+sarr[2][1]+'" alt="'+sarr[2][0][lang]+'"></a></li>'+
						'<li><a href="#" onclick="'+sarr[3][2]+'" title="'+sarr[3][0][lang]+'"><img src="'+root_path+'images/'+sarr[3][1]+'" alt="'+sarr[3][0][lang]+'"></a></li>'+
					'</ul>';
			}else{
				op+='<button onclick="window.location.href=\''+arr2[i][3]+'\'" onkeypress="window.location.href=\''+arr2[i][3]+'\'" class="shareBtn navbar-menu navbar-'+arr2[i][0]+'" type="button"><span class="sr-only">'+arr2[i][1][lang]+'</span><span><img src="'+root_path+'images/'+arr2[i][2]+'" alt="" title=""></span></button>'+
					'<ul class="listStyleInline shareBar">'+
						'<li><a href="#" onclick="'+sarr[0][2]+'" title="'+sarr[0][0][lang]+'"><img src="'+root_path+'images/'+sarr[0][1]+'" alt="'+sarr[0][0][lang]+'"></a></</li>'+
						'<li><a href="#" onclick="'+sarr[1][2]+'" title="'+sarr[1][0][lang]+'"><img src="'+root_path+'images/'+sarr[1][1]+'" alt="'+sarr[1][0][lang]+'"></a></li>'+
						'<li><a href="#" onclick="'+sarr[2][2]+'" title="'+sarr[2][0][lang]+'"><img src="'+root_path+'images/'+sarr[2][1]+'" alt="'+sarr[2][0][lang]+'"></a></li>'+
					'</ul>';
				
			}
		}else if(arr2[i][3] != '')
			op+='<button onclick="window.location.href=\''+arr2[i][3]+'\'" onkeypress="window.location.href=\''+arr2[i][3]+'\'" class="navbar-menu navbar-'+arr2[i][0]+'" type="button"><span class="sr-only">'+arr2[i][1][lang]+'</span><span><img src="'+root_path+'images/'+arr2[i][2]+'" alt="" title=""></span></button>';		
		else
			op+='<button class="navbar-menu navbar-'+arr2[i][0]+'" type="button"><span class="sr-only">'+arr2[i][1][lang]+'</span><span><img class="mCEvt" src="'+root_path+'images/'+arr2[i][2]+'" alt="" title=""></span></button>';
	}		
	/*op+='<div class="menuRight mOnly" lang=\"'+larr[0][2]+'\">'+
			'<a href="javascript:chglang('+larr[0][1]+')">'+larr[0][0]+'</a>'+
		'</div>'+
		'<div class="menuRight mOnly" lang=\"'+larr[1][2]+'\">'+
			'<a href="javascript:chglang('+larr[1][1]+')">'+larr[1][0]+'</a>'+
		'</div>';	*/
	op+='</div>';
	op+=searchTool2();
	return op;
}

function headerMenu()
{
	var op='';
	var arr=getMenuData();
	op += '<div class="headerMenu bs-example-js-navbar-collapse temp_hide">'+extMenu(arr,'tMenu',0,'',true)+clearBoth()+'</div>';
	for(var i=0;i<arr.length;i++)
	{
		if(typeof arr[i][3] != 'undefined'){
			if(location_href.match(arr[i][1][lang])||location_href.indexOf(arr[i][1][lang])>-1)
			{
				subMenu=i;
				break;
			}else{
				for(var ii=0;ii<arr[i][3].length;ii++)
				{
					//console.log(location_href+' '+arr[i][3][ii][1][lang]+' '+location_href.match(arr[i][3][ii][1][lang]));
					if(location_href.match(arr[i][3][ii][1][lang])||location_href.indexOf(arr[i][3][ii][1][lang])>-1)
					{
						subMenu=i;
						break;
					}
					else if(typeof arr[i][3][ii][3] != 'undefined')
					{
						if(arr[i][3][ii][3].length){
							var boo=reMenu(arr[i][3]);
							if(boo)
								subMenu=i;
						}
					}
				}
			}
		}
	}
	return op;
}

function reMenu(arr){
	for(var i=0;i<arr.length;i++)
	{
		if(typeof arr[i][3] != 'undefined'){
			for(var ii=0;ii<arr[i][3].length;ii++)
			{
				//console.log(1, i, ii, arr[i][3][ii][1]);
				if(location_href.match(arr[i][3][ii][1]))
				{
					return true;
				}
				else if(typeof arr[i][3][ii][3] != 'undefined')
				{
					if(arr[i][3][ii][3].length){
						var boo=reMenu(arr[i][3][ii][3]);
						if(boo)
							return true;
					}
				}
		}
		}
	}
	return false;
}

function initLeftMenu(){
	//console.log(subMenu);
	
	if(subMenu!=-1&&!getURLParameter('f')){
		var op='';
		var arr=getMenuData();
		if(isMenHealth){
			op += '<div class="leftMenu">'+extMenu(MenHealthArr,'subMenu',0,'',true)+clearBoth()+'</div>';
		}else{
			op += '<div class="leftMenu">'+extMenu(arr[subMenu][3],'subMenu',0,'',true)+clearBoth()+'</div>';
		}
		$('.subMenu .sub1').empty().append(op);
		$('.subMenu .sub1 .leftMenu a').each(function(){
			//console.log($(this).attr('href'));
			if(location_href.match($(this).attr('href'))){
				$(this).parent().addClass('active');
				return false;
			}else{
				var tmp=$(this).attr('href').ReplaceAll('../','').replace('http://','').split("/");
				if(location_href.indexOf(tmp[2]+'/'+tmp[3]+'/'+tmp[4])>0){
					$(this).parent().addClass('active');
					return false;
				}else{
					var v1=$(this).text().trim().toLowerCase();
					var v2=$('.breadcrumb .listStyleInline li').eq(1).text().replace('>','').trim().toLowerCase();
					if(v1==v2){
						$(this).parent().addClass('active');
						return false;
					}					
				}			
			}
		});
	}else{
		if(!(location_href.match('.php'))){
			$('.subMenu').hide();
			$('.mainContent.sCont').css('max-width','100%');
		}
		
	}
}

function menuBanner()
{
	var op='';
	var marr=[
				[['MyGovHK','',''],'#','logo_gov.jpg','']
			];
	var arr=new Array;
	for(var i=0;i<marr.length;i++)
	{
		var cla='';
		if(i==0)
			cla='firstItem';
		else if(i==marr.length-1)
			cla='lastItem';
		arr.push('<a href="'+lang_path+marr[i][1]+'" class="'+cla+'" rel="'+marr[i][3]+'"><img src="'+root_path+'images/'+marr[i][2]+'" alt="'+marr[i][0][lang]+'" title="'+marr[i][0][lang]+'"></a>');
	}
	
	op = createList(arr, 'bannerList listBlank');
	return op;
}


function StaticNavBar(){
 
	var op='';
	if(navigation!=''){ 
	  
		if(navigation.split(',').indexOf(getURLParameter('navigation')) != -1){
			navigation=getURLParameter('navigation');
		}else{
			navigation=navigation.split(',')[0];
		}
		
		op=(getNavBar(navigation,''));
		
		//20171206 Jacky if menu not found disply page title
		if(op==''){
			section_title = $('h1.contHeader').html();
			$('.mainHeader>h1').html(section_title);
			$('.breadcrumb').html('<div>'+section_title+'</div>');			
		}
	}else{
		section_title = $('h1.contHeader').html();
		$('.mainHeader>h1').html(section_title);
		$('.breadcrumb').html('<div>'+section_title+'</div>');
	}
	// console.log(op);
	if(op!=''){
		$('.breadcrumb').html(op);
		
		if(navigation==7){
			//home_h1_array = ['Home','主頁','主页'];
			section_title = $('h1.contHeader').html();
		}
		$('.mainHeader>h1').html(section_title);
	}
	
	/*if(subMenu==-1){
		
	} */
	
}

//eric
function SiteMapNavBar(){
	var op='<div>'+$('.contHeader').html()+'</div>';
    $('.breadcrumb').html(op);
}

//jacky
function getNavBar(id,op){ 
		if(typeof menuItems !== "undefined" && menuItems[id] !== undefined){
			 
			//Men's Health Menu
			if(id=='10008'){
				isMenHealth=true;
			}
			//Home Menu
			if(id=='7'){
				op+='<div>'+$('.contHeader').html()+'</div>';
				return op;
			}
			var url='';
			if(op!=''){
				if(menuItems[id][(lang+3)]!=''){
					url=menuItems[id][(lang+3)];				
				}else{
					url='#';
				}
				if(id!='222'){
					op='<div> <a href="'+url+'">'+menuItems[id][lang]+'</a></div> > '+op;
				}
			}else{
				if(typeof fromMenuId !== "undefined"){
					if(menuItems[id][(lang+3)]!=''){
						url=menuItems[id][(lang+3)];						
					}else{
						url='#';
					}					
					op='<div>  <a href="'+url+'">'+menuItems[id][lang]+'</a></div> > '+op;
				}else{ 
					//Jacky 20170929
					//if(id=='24'||id=='25'||id=='12'||id=='390'||id=='459'||id=='460'||id=='464'||id=='465'||id=='116'||id=='7'||id=='19'){
					if(id=='24'||id=='25'||id=='12'||id=='390'||id=='459'||id=='460'||id=='464'||id=='465'||id=='7'||id=='19'){	
						if(menuItems[id][(lang+3)]!=''){
							url=menuItems[id][(lang+3)];
							
							//20170907
							/*if(url=='/en/recommendations/13/13.html'){
								url='/en/healthprofessionals/submenu/index.html';
							}else if(url=='/tc/recommendations/13/13.html'){
								url='/tc/healthprofessionals/submenu/index.html';
							}else if(url=='/sc/recommendations/13/13.html'){
								url='/sc/healthprofessionals/submenu/index.html';
							}*/
						}else{
							url='#';
						}	
                         if(id!='7'){
                             op='<div> <a href="'+url+'">'+menuItems[id][lang]+'</a> </div> ';
                         }else{
                             op='';
                         }
						 op='<div> <a href="'+url+'">'+menuItems[id][lang]+'</a> </div> ';
						
						//Add page title to navigation  bar
						if($('.contHeader').html()!='' && menuItems[id][lang]!==$('.contHeader').html()){ 
							op+='<div>'+$('.contHeader').html()+'</div>';
						}
					}else{ 
                   
						op='<div>'+menuItems[id][lang]+'</div>'; 
					}
				}
			}

			if(menuItems[id][6]=='0'){
				section_title=menuItems[id][lang]; 
				var menu_arr=getMenuData(); 
				$.each( menu_arr, function(i, val){
					//console.log(val[0][0]);
					if(val[0][0]===menuItems[id][0]){ 
						subMenu=i; 
						return false;
					}
				});		
				
				
				//20170724 Jacky
				if(getURLParameter('f')){ 
					var f=getURLParameter('f');
					if(typeof menuItems !== "undefined" && menuItems[f] !== undefined){  
						if(menuItems[f][(lang+3)]!=''){
							url=menuItems[f][(lang+3)];
						}else{
							url='#';
						}					
						op='<div> <a href="'+url+'">'+menuItems[f][lang]+'</a></div> > '+op;						
					}
				}		
				
				
				
				return op;
			}else{
				return getNavBar(menuItems[id][6],op);
			}
		
		}else{
			return op;
		} 
}

function getMenuData()
{
	return arr;
}
 
function headerTool(){
	var op = '';
	var searchText = fillKeywords(); 
	var search_arr=['Hot searches:','熱門搜尋:','热门搜寻:'];
	var logo_title_arr=['Centre for Health Protection | The Government of the Hong Kong Special Administrative Region | Department of Health','香港特別行政區政府 | &#34910生署 | &#34910生防護中心','香港特别行政区政府 | &#21355生署 | &#21355生防护中心'];
	var logo_arr=['/files/png/logo_chp_en.png','/files/png/logo_chp_tc.png','/files/png/logo_chp_sc.png'];
	if(searchText!=''){
		var search_str = search_arr[lang]+' '+searchText;
	}else{
		var search_str = '';
	}

	op+=//'<form name="searchForm" id="searchForm" method="get" action="http://search.gov.hk/search.html">'+
			'<div class="headerTop">'+
				'<div class="leftClfArea">'+
					'<a href="'+root_path+langtxt+'/index.html"><img src="'+logo_arr[lang]+'" alt="'+logo_title_arr[lang]+'" title="'+logo_title_arr[lang]+'"></a>'+
				'</div>'+
				'<div class="rightClfArea">'+				
					'<div class="myheaderTool" style="float: right;">'+
						 
						'<div class="AStyleArea">'+aaaTool()+'</div>'+
						'<div class="langTool">'+langTool()+'</div>'+
						'<div class="otherTool">'+otherTool()+'</div>'+
						'<div class="searchTool">'+searchTool()+'</div>'+
						 				
					'</div>'+
					clearBoth()+
					'<div class="searchTip otherlang">'+getAllOtherLangItem()+'</div>'+ 
					clearBoth()+
					'<div class="searchTip">'+search_str+'</div>'+
				'</div>'+
				clearBoth()+
			'</div>';		
		//'</form>';
	return op;
}

function headerTool2(){
	var op = '';
	var searchText = fillKeywords(); 
	var search_arr=['Hot searches:','熱門搜尋:','热门搜寻:'];
	var logo_title_arr=['Centre for Health Protection | The Government of the Hong Kong Special Administrative Region | Department of Health','香港特別行政區政府 | &#34910生署 | &#34910生防護中心','香港特别行政区政府 | &#21355生署 | &#21355生防护中心'];
	var logo_arr=['/files/png/logo_chp_en.png','/files/png/logo_chp_tc.png','/files/png/logo_chp_sc.png'];
	if(searchText!=''){
		var search_str = search_arr[lang]+' '+searchText;
	}else{
		var search_str = '';
	}
	op+=//'<form name="searchForm" id="searchForm" method="get" action="http://search.gov.hk/search.html">'+
			'<div class="headerTop">'+
				'<div class="leftClfArea">'+
					'<a href="'+root_path+langtxt+'/index.html"><img src="'+logo_arr[lang]+'" alt="'+logo_title_arr[lang]+'" title="'+logo_title_arr[lang]+'"></a>'+
				'</div>'+
				'<div class="rightClfArea">'+				
					'<div class="myheaderTool" style="float: right;">'+						 
						'<div class="AStyleArea">'+aaaTool()+'</div>'+
						//'<div class="langTool">'+langTool()+'</div>'+
						'<div class="otherTool">'+otherTool()+'</div>'+						 				
					'</div>'+
					clearBoth()+
				'</div>'+
				clearBoth()+
			'</div>';		
		//'</form>';
	return op;
}

function homeTool(){
	var op='';
	op+='<a href="'+lang_path+'index.html"><img src="'+root_path+'images/icon_home.png" alt="Home"></a>';
	return op;
}

/*function myLogo()
{
	
	var op='';
	var arr =[
				[['Leaders\' Corner'],['logo_leaders_corner.png']],
				[['Leaders\' Corner'],['logo_leaders_corner.png']]
			];
	op += '<img class="desktop" src="'+root_path+'images/'+arr[0][1][lang]+'" alt="'+arr[0][0][lang]+'" title="'+arr[0][0][lang]+'">';
	return op;
}*/

function langTool()
{
	var op = '';
	var arr = [
				['<img src="/files/png/chglang_en.png" alt="English" title="English">','<img src="/files/png/chglang_tc.png" alt="繁" title="繁">','<img src="/files/png/chglang_sc.png" alt="簡" title="簡">'],
				['en','zh-hk','zh-cn']
			];
	var larr = new Array;
	for(var i=0;i<arr[0].length;i++)
	{
		if(!(i==lang))
			larr.push([arr[0][i],i,arr[1][i]]);
	}
	
	op+='<ul>'+
			'<li><span lang=\"'+larr[0][2]+'\"><a href="javascript:chglang('+larr[0][1]+')">'+larr[0][0]+'</a></span></li>'+
			'<li><span lang=\"'+larr[1][2]+'\"><a href="javascript:chglang('+larr[1][1]+')">'+larr[1][0]+'</a></span></li>'+
		'</ul>';
	return op;
}

function aaaTool()
{
	var op = new Array;
	var larr = [
					['Font Size : Smaller','字形大小：較小','字形大小：较小'],
					['Font Size : Default Size','字形大小：原設定','字形大小：原设定'],
					['Font Size : Larger','字形大小：較大','字形大小：较大']
				]; 
	var arr = new Array;
	for(var i=0;i<larr.length;i++)
	{
		arr.push('<a id="fontSize'+i+'" class="aBtn" href="javascript:fontSize('+i+')" title="'+larr[i][lang]+'"><span class="access">'+larr[i][lang]+'</span>A</a>')
	}
	op.push(createList(arr,'aaaTool listStyleInline'));
	return op;
}

function searchTool()
{
	var op ='';
	var cla ='bs-example-js-navbar-search';
	var arr = [
				['en','zh-hk','zh-cn'],
				['Search','搜索','搜索'],
				['Enter search keyword(s)','輸入查詢字串','输入查询字串']
			];
	var nam = arr[1][lang];
	var val = arr[2][lang];	
	// 20221018 - Change the search URL
	/*op = '<div class="searchTool '+cla+'">'+
			'<form name="searchForm" id="searchForm" method="get" action="'+search_engine_path+'/search/'+langtxt+'/chp_search_result.php"><div class="hrbTool">'+			
				'<label class="searchLabel access" for="searchbar">'+arr[1][lang]+'</label>'+
				'<input id="searchbar" name="q" type="text" class="searchBox seachInputBar" value="'+val+'">'+
				'<a href="#" style="padding:0px"><img src="'+root_path+'images/icon_search.png" alt="'+nam+'" title="'+nam+'" class="searchBtn"></a>'+
			'</div></form>'+
		'</div>';*/
	op = '<div class="searchTool '+cla+'">'+
			'<form name="searchForm" id="searchForm" method="get" action="'+search_engine_path+'/chp/'+langtxt+'/search_result.php"><div class="hrbTool">'+			
				'<label class="searchLabel access" for="searchbar">'+arr[1][lang]+'</label>'+
				'<input id="searchbar" name="q" type="text" class="searchBox seachInputBar" value="'+val+'">'+
				'<a href="#" style="padding:0px"><img src="'+root_path+'images/icon_search.png" alt="'+nam+'" title="'+nam+'" class="searchBtn"></a>'+
			'</div></form>'+
		'</div>';
	return op;	
}

function searchTool2(){
	var op ='';
	var cla ='bs-example-js-navbar-search';
	var arr = [
				['en','zh-hk','zh-cn'],
				['Search','搜索','搜索'],
				['Enter search keyword(s)','輸入查詢字串','输入查询字串']
			];
	var nam = arr[1][lang];
	var val = arr[2][lang];	
	// 20221018 - Change the search URL
	/*op = '<div class="searchTool '+cla+'">'+
			'<form name="searchForm" id="searchForm2" method="get" action="'+search_engine_path+'/search/'+langtxt+'/chp_search_result.php"><div class="hrbTool">'+			
				'<label class="searchLabel access" for="searchbar2">'+arr[1][lang]+'</label>'+
				'<input id="searchbar2" name="q" type="text" class="searchBox seachInputBar" value="'+val+'">'+
				'<a href="#" style="padding:0px"><img src="'+root_path+'images/icon_search.png" alt="'+nam+'" title="'+nam+'" class="searchBtn"></a>'+
			'</div></form>';*/
	op = '<div class="searchTool '+cla+'">'+
			'<form name="searchForm" id="searchForm2" method="get" action="'+search_engine_path+'/chp/'+langtxt+'/search_result.php"><div class="hrbTool">'+			
				'<label class="searchLabel access" for="searchbar2">'+arr[1][lang]+'</label>'+
				'<input id="searchbar2" name="q" type="text" class="searchBox seachInputBar" value="'+val+'">'+
				'<a href="#" style="padding:0px"><img src="'+root_path+'images/icon_search.png" alt="'+nam+'" title="'+nam+'" class="searchBtn"></a>'+
			'</div></form>';
		
		
	var searchText = fillKeywords(); 
	var search_arr=['Hot searches:','熱門搜尋:','热门搜寻:'];
	if(searchText!=''){
		var search_str = search_arr[lang]+' '+searchText;
	}else{
		var search_str = '';
	}
	op += 	'<div class="searchTip">'+search_str+'</div>';
	
	op += '</div>';
	return op;	
}

function sitemapTool()
{
	var op ='';
	var arr = ['SITEMAP','網頁指南','网页指南'];
	op+='<a href="'+lang_path+'sitemap.html"><img class="f2Btn" src="'+root_path+'images/clf/mainbar9.gif" alt="'+arr[lang]+'" title="'+arr[lang]+'"></a>';
	return op;
}

function otherTool(){
	var op = new Array;	
	
	//var rss_path = '';
	var larr = [
					[['Share','分享','分享'],'../files/png/icon_share.png','#'],
					//[['Email','Email','Email'],'icon_mail.png','#'],
					[['RSS','RSS','RSS'],'../files/png/icon_rss.png','/'+langtxt+rss_path]
				]; 	
	var arr = new Array;
	var sarr = [
					[['Facebook','Facebook','Facebook'],'icon_facebook.png','facebook();return false;'],
					[['Twitter','Twitter','Twitter'],'icon_twitter.png','twitter();return false;'],
					[['Email','Email','Email'],'icon_email.png','email();return false;']
				];
	for(var i=0;i<larr.length;i++){
		if(i==0){
			arr.push('<a class="shareBtn" href="'+larr[0][2]+'" title="'+larr[0][0][lang]+'"><img src="'+root_path+'images/'+larr[0][1]+'" alt="'+larr[0][0][lang]+'"></a>'+
				'<ul class="listStyleInline shareBar">'+
					'<li><a  href="#" onclick="'+sarr[0][2]+'" title="'+sarr[0][0][lang]+'"><img src="'+root_path+'images/'+sarr[0][1]+'" alt="'+sarr[0][0][lang]+'"></a></</li>'+
					'<li><a  href="#" onclick="'+sarr[1][2]+'" title="'+sarr[1][0][lang]+'"><img src="'+root_path+'images/'+sarr[1][1]+'" alt="'+sarr[1][0][lang]+'"></a></li>'+
					'<li><a  href="#" onclick="'+sarr[2][2]+'" title="'+sarr[2][0][lang]+'"><img src="'+root_path+'images/'+sarr[2][1]+'" alt="'+sarr[2][0][lang]+'"></a></li>'+
				'</ul>'
			);
		}else{
			arr.push('<a href="'+larr[i][2]+'" title="'+larr[i][0][lang]+'"><img src="'+root_path+'images/'+larr[i][1]+'" alt="'+larr[i][0][lang]+'"></a>');
		}
	}
	op.push(createList(arr,'listStyleInline'));
	return op;
}

function btnTool(p,b,q){
	var op='';
	var title_bookmark = ['Bookmark','書籤','书签']; 
	var title_print = ['Print','列印','列印'];
	var title_qr = ['Quick Response Code','快速回應碼','快速回应码'];
	if(typeof p === "undefined")
		p=false;
	if(typeof b === "undefined")
		b=false;
	if(typeof q === "undefined")
		q=false;
	if(!p)
		op+='<div class="printBtn" ><a href="#"><img src="'+root_path+'images/icon_print.gif" alt="'+title_print[lang]+'" title="'+title_print[lang]+'"><span class="access">'+title_print[lang]+'</span></a></div> ';
	if(!b)
		op+=' <div class="bookmarkBtn"  ><a href="#"><img src="'+root_path+'images/icon_bookmark.gif" alt="'+title_bookmark[lang]+'" title="'+title_bookmark[lang]+'"><span class="access">'+title_bookmark[lang]+'</span></a></div>  ';
	if(!q)
		op+='<div class="qrBtn"><a href="#"><img src="'+root_path+'images/icon_qr_code.gif" alt="'+title_qr[lang]+'" title="'+title_qr[lang]+'"><span class="access">QR</span></a><span id="qrCode" class="qr-content"></span> </div>   ';
	document.write(op);	
}
/*==========Site Map===========*/
function siteMap()
{
	
	var op ='';
	var arr=getMenuData();
	op += '<div class="siteList">';
	op += extMenu(arr,'siteMenu',0);
	op += '</div>'
	document.write(op);
}

function backShow(obj)
{
	
}

function getBanner()
{
	var op = '';
	op += '<div class="leftBanner"></div>';
	return op;
}

/*===Create the Language Seclection===*

/*===Create H1===*/
function initFirstHeader()
{
	var op ='<hr>';
	$('.mainHeader').append(op);
}

function initType()
{

}

/*===Create Footer===*/
function createFooter(){
	var op='';
	/*op+=updateDate();*/
	//op+='<div class="footerMiddlw">'+w3cIcon()+'</div>';
	op+='<div class="footerBottom" style="text-align: center;">'+w3cIcon()+bhkIcon()+'</div>';
	op+='<div class="footerTop" style="text-align: center;">'+copyRightTool()+updateDate()+'</div>';
	document.write(op);
}

function footerMenu()
{
	var op='';
	var arr=getMenuData();
	$.each( arr, function(i, val){
		if($.inArray('Offices & Departments',val[0])>-1)
			val[3]='';
	});
	op += '<div class="footerMenu">'+extMenu(arr,'bMenu',0)+'<div class="clearBoth"></div></div>';
	return op;
}

function updateDate()
{
	var op='';
	var arr=[
				['Last Revision Date','修訂日期','修订日期'],
				['2017/01/04','2017/01/04','2017/01/04']
			];
			
	if(typeof last_revision_date !== "undefined" && last_revision_date!=''){
		arr[1][lang]=last_revision_date;
	}else{
        arr[1][lang]=getTodayDateString();
    }
	op+='<div class="updateDate" style="display: block; margin-top: 20px; max-width: 100%; float: none;">'+current_year+' &copy; | '+arr[0][lang]+': '+arr[1][lang]+'</div>';
	return op;
}

// Eric (2017-09-26)
function getTodayDateString()
{
    var today = new Date();
	var today_year = today.getFullYear();
	var today_month = today.getMonth()+1;
	if(today_month<10){ today_month='0'+today_month; }
	var today_date = today.getDate();
	if(today_date<10){ today_date='0'+today_date; }
    return today_year+"/"+today_month+"/"+today_date;
}

function copyRightTool()
{
	//privacy_policy_path='';
	//2012 © | Important Notices | Privacy Policy | Sitemap
	var op='';
	var arr=[
				[['Important Notices','重要告示','重要告示'],'/'+langtxt+important_notice_path],
				//[['Privacy Policy',' 私隱政策',''],lang_path+'privacy_en.html'],
				[['Privacy Policy',' 私隱政策','私隐政策'],'/'+langtxt+privacy_policy_path],
				[['Site Map','網頁指南','网页指南'],lang_path+'sitemap.html']
			];
	op+='<div class="copyRight" style="display: block; margin-top: 20px; max-width: 100%;">'+extMenu(arr,'listStyleInline',0)+'</div>';
	return op;
}

function w3cIcon()
{
    var non_wcag = 0;
    try{
        non_wcag = (check_wa!=null && check_wa=='0')?1:0;
    }catch(err){
    }
    
	var arr = [
				[['Government Hong Kong','Government Hong Kong 香港政府一站通','Government Hong Kong 香港政府一站通'],'jpg/logo_govhk.jpg','http://www.gov.hk'],
				[['Level Double-A conformance, W3C WAI Web Content Accessibility Guidelines 2.0','遵守萬維網聯盟 (W3C) 無障礙網頁倡議 AA 級','遵守万维网联盟 (W3C) 无障碍网页倡议 AA 级'],['jpg/logo_wcag2_0.jpg','jpg/logo_wcag2_0.jpg','jpg/logo_wcag2_0.jpg'],'http://www.w3.org/WAI/WCAG2AA-Conformance'],
                [['Web Accessibility Conformance','無障礙網頁守則','无障碍网页守则'],['gif/wac_en.gif','gif/wac_tc.gif','gif/wac_sc.gif'],'/'+langtxt+non_conformance_path]
				,[['Outstanding Website Award in 2018 WebAwards','2018 WebAwards 傑出網站獎','2018 WebAwards 杰出网站奖'],'jpg/webaward.jpg','https://www.webaward.org/winner/34314/centre-for-health-protection-department-of-health-hksarg-wins-2018-webaward-for-centre-for-health-protection-department-of-health-hksar-government.html#.W5cphVUzapo']
			];
	var op = '<div class="copyrightBar" style="padding-top: 24px;">'+
				'<ul class="listStyleInline">'+
				'<li><a href="'+arr[0][2]+'" target="_blank"><img src="'+root_path+'files/'+arr[0][1]+'" alt="'+arr[0][0][lang]+'" title="'+arr[0][0][lang]+'" style="padding-left: 5px; padding-right: 5px;"></a></li>'+
				'<li><a href="'+arr[1+non_wcag][2]+'" target="_blank"><img src="'+root_path+'files/'+arr[1+non_wcag][1][lang]+'" alt="'+arr[1+non_wcag][0][lang]+'" title="'+arr[1+non_wcag][0][lang]+'" style="padding-left: 5px; padding-right: 5px;"></a></li>'+
				'<li><a href="'+arr[3][2]+'" target="_blank"><img src="'+root_path+'files/'+arr[3][1]+'" alt="'+arr[3][0][lang]+'" title="'+arr[3][0][lang]+'" style="padding-left: 5px; padding-right: 5px;"></a></li>'+
				'</ul></div>';
	return op;
}

function bhkIcon(){
	var op='';
	var arr =['Brand Hong Kong','香港品牌','香港品牌'];
	var bhklink =['http://www.brandhk.gov.hk/html/en/index.html','http://www.brandhk.gov.hk/html/tc/index.html','http://www.brandhk.gov.hk/html/sc/index.html'];
	var bhkimg =['files/png/logo_bhk.png','files/png/logo_bhk.png','files/png/logo_bhk.png'];
	op = '<div class="bhkLogo" style="float: none; padding-top: 12px;"><a href="'+bhklink[lang]+'" target="_blank"><img src="'+root_path+bhkimg[lang]+'" alt="'+arr[lang]+'" title="'+arr[lang]+'" style="padding-left: 5px; padding-right: 5px;"></a></div>';
	return op;
}

function externalTool()
{
	var op='';
	var barr=[
				[['FaceBook','',''],'icon_facebook.png','#','external'],
				[['Twitter','',''],'icon_twitter.png','#','external'],
				[['Sina','',''],'icon_sina.png','#','external'],
				[['Wechat','',''],'icon_wechat.png','#','external'],
				[['Email','',''],'icon_mail.png','#','external']
			];
	var arr=new Array;
	for(var i=0;i<barr.length;i++)
	{
		if(barr[i][2]==='undefined' || barr[i][2]===undefined)
			barr[i][2]='#';
		if(barr[i][3]==='undefined' || barr[i][3]===undefined)
		{
			barr[i][3]='';
			barr[i][2]=lang_path+barr[i][2];
		}
		arr.push('<a href="'+barr[i][2]+'" rel="'+barr[i][3]+'"><img src="'+root_path+'images/'+barr[i][1]+'" alt="'+barr[i][0][lang]+'" title="'+barr[i][0][lang]+'"></a>');
	}
	op = createList(arr,'footerBanner');
	return op;
}

function footerTool()
{
	var op='';
	var marr=[];
	var arr=new Array;
	for(var i=0;i<marr.length;i++)
	{
		var cla='';
		if(i==0)
			cla='firstItem';
		else if(i==marr.length-1)
			cla='lastItem';
		var u = marr[i][1];
		if(!(u.match('mailto:') || u.match('http://') || u.match('https://')))
			u = lang_path + u;
		arr.push('<a href="'+u+'" class="'+cla+'">'+marr[i][0][lang]+'</a>');
	}
	op+=createList(arr,'fMenu',true);
	return op;
}

/*===Create Breadcrumb===*/
function pageTop()
{
	/*if(subMenu!=-1)
	{
		var op='';
		var arr=getMenuData();
		op += '<div class="leftMenu">'+extMenu(arr[subMenu][3],'subMenu',0,'',true)+clearBoth()+'</div>';
		document.write(op);
	}*/
}
 

function subMenus(){ 
	var op ='';
	if(subMenu!=-1) 
	{ 
		var op='';
		var arr=getMenuData();
		op += ''+extMenu(arr[subMenu][3],'',0,'',true)+clearBoth()+'';
		$('.sub1').html(op);
	}	
	
	var sub2=''; 
	sub2+='<ul>';
		sub2+='<li class="sm1"><a href="#">General Public</a>asdasda</li>';
		sub2+='<li class="sm2"><a href="#">Health Professionals</a>dasdasd</li>';
		sub2+='<li class="sm3"><a href="#">Institutions & Schools</a>asdasd</li>';
		sub2+='<li class="sm4"><a href="#">Business & Workplace</a>asdad</li>';
	sub2+='</ul>';
	//$('#sub2').html(sub2);
}


function getPrint()
{
	var op = '';
	var arr = ['Print','列印','列印'];
	op += '<a href="javascript:window.print();"><img src="'+root_path+'images/icon_print.png" alt="'+arr[lang]+'" title="'+arr[lang]+'"></a>';
	return op;
}

function pageBottom(){
	var op='';
	var arr=[
				['Back','上一頁','上一页'],
				['Top','頁首','页首']
			];
	var bb='<div class="backBtn"><a href="javascript:history.back();"><img class="btnBack" src="'+root_path+'images/btn_back.png" alt="'+arr[0][lang]+'" title="'+arr[0][lang]+'"><span class="textBack">'+arr[0][lang]+'</span></a></div>';
	var tb='<div class="topBtn"><a href="#top"><img class="btnTop" src="'+root_path+'images/btn_top.png" alt="'+arr[1][lang]+'" title="'+arr[1][lang]+'"><span class="textTop">'+arr[1][lang]+'</span></a></div><div class="clearBoth"></div>';
	var extArr =[
					['index.php']
				];
	if(!isIndex)
		op+='<div class="clearBoth"></div>';
	
	var txt = location_href.replace(/^.*[\\\/]/, '');
	var isExcept = checkArr(txt,extArr);
	
	if(isIndex)
	{
		/*op+='<div class="btmNav myFL">';
		op+=tb+'</div>';*/
	}
	else if(isExcept)
	{
		
	}
	else
	{
		op+='<div class="btmNav myFL">';
		op+=bb;
		op+=tb+'</div>';
	}
	document.write(op);
}

function subContent(){
	var op='';
	var arr=[
				[['General Public','市民','市民'],['/en/generalpublic/submenu/index.html','/tc/generalpublic/submenu/index.html','/sc/generalpublic/submenu/index.html']],
				[['Health Professionals','醫護專業','医护专业'],['/en/healthprofessionals/submenu/index.html','/tc/healthprofessionals/submenu/index.html','/sc/healthprofessionals/submenu/index.html']],
				[['Institutions & Schools','院舍及學校','院舍及学校'],['/en/institutionsandschools/submenu/index.html','/tc/institutionsandschools/submenu/index.html','/sc/institutionsandschools/submenu/index.html']],
				[['Business & Workplace','業界及工作場所','业界及工作场所'],['/en/businessandworkplace/submenu/index.html','/tc/businessandworkplace/submenu/index.html','/sc/businessandworkplace/submenu/index.html']],
			];
			
			
	op+='<div class="subMenu">';
	
	//sub menu
	op+='<div class="sub1">';
	op+='</div>';
	
	//i am
	op+='<div class="sub2"><ul>';
	for(var i=0;i<arr.length;i++)
	{
		op+='<li class="sm'+(i+1)+'" ><a href="'+arr[i][1][lang]+'">'+arr[i][0][lang]+'</a></li>';
	}
	op+='</ul></div>';	

	var barr=[
				[['FaceBook','',''],'icon_facebook.png','#','external'] 
			];
	//icon
	if(lang==0){
		op+='<div class="sub3" id="sub3" >';
			op+='<div class="dh_banner">';
				op+='<a href="http://www.dh.gov.hk/" target="_blank"><span class="title"><img src="/files/png/logo_dh_en.png" alt="Department of Health" title="Department of Health"></span></a><span class="my_text" style="text-decoration:none !important;/* padding: 20px 50px; */margin-top: 0px;padding-left: 50px;padding-right: 50px;padding-bottom: 20px;display: block;">The Centre for Health Protection is a professional arm of the Department of Health for disease prevention and control</span>';
			op+='</div>';
			
			op+='<div><a href="https://www.facebook.com/CentreforHealthProtection" target="_blank" alt="CHP Facebook"><img src="/files/png/chp_facebook_en.png" alt="CHP Facebook" title="CHP Facebook"></a></div>';
			op+='<div><a href="https://www.youtube.com/c/ChpGovHkChannel" target="_blank" alt="CHP YouTube Channel"><img src="/files/png/chp_youtube_en.png" alt="CHP YouTube Channel" title="CHP YouTube Channel"></a></div>';
			op+='<div></div>';			
		op+='</div>';	
	}else if(lang==1){
		op+='<div class="sub3" id="sub3" >';
			op+='<div class="dh_banner">';
				op+='<a href="http://www.dh.gov.hk/"  target="_blank" ><span class="title"><img src="/files/png/logo_dh_tc.png" alt="衞生署" title="衞生署"></span></a><span class="my_text" style="text-decoration:none !important;/* padding: 20px 50px; */margin-top: 0px;padding-left: 50px;padding-right: 50px;padding-bottom: 20px;display: block;">衞生防護中心乃衞生署<br>轄下執行疾病預防<br>及控制的專業架構</span></a>';
			op+='</div>';
			
			op+='<div><a href="https://www.facebook.com/CentreforHealthProtection" target="_blank"><img src="/files/png/chp_facebook_tc.png" alt="衞生防護中心 Facebook 專頁" title="衞生防護中心 Facebook 專頁"></a></div>';
			op+='<div><a href="https://www.youtube.com/c/ChpGovHkChannel" target="_blank"><img src="/files/png/chp_youtube_tc.png" alt="衞生防護中心 YouTube 頻道" title="衞生防護中心 YouTube 頻道"></a></div>';		
			op+='<div></div>';			
		op+='</div>';	
	}else if(lang==2){
		op+='<div class="sub3" id="sub3" >';
			op+='<div class="dh_banner">';
				op+='<a href="http://www.dh.gov.hk/"  target="_blank" ><span class="title"><img src="/files/png/logo_dh_sc.png" alt="卫生署" title="卫生署"></span></a><span class="my_text" style="text-decoration:none !important;/* padding: 20px 50px; */margin-top: 0px;padding-left: 50px;padding-right: 50px;padding-bottom: 20px;display: block;">卫生防护中心乃卫生署<br>辖下执行疾预防<br>及控制的专业架构</span>';
			op+='</div>';
			
			op+='<div><a href="https://www.facebook.com/CentreforHealthProtection" target="_blank"><img src="/files/png/chp_facebook_sc.png" alt="卫生防护中心 Facebook 专页" title="卫生防护中心 Facebook 专页"></a></div>';
			op+='<div><a href="https://www.youtube.com/c/ChpGovHkChannel" target="_blank"><img src="/files/png/chp_youtube_sc.png" alt="卫生防护中心 YouTube 频道" title="卫生防护中心 YouTube 频道"></a></div>';		
			op+='<div></div>';			
		op+='</div>';	
	}
	op+='</div>';
	document.write(op);	
}

function subContent2(){
	op = '';
	
	if(lang==0){
		op+='<div class="sub3" id="sub3" >';
			op+='<div class="dh_banner">';
				op+='<a href="http://www.dh.gov.hk/" target="_blank" ><span class="title"><img src="/files/png/logo_dh_en.png" alt="Department of Health" title="Department of Health"></span></a><span class="my_text" style="text-decoration:none !important;/* padding: 20px 50px; */margin-top: 0px;padding-left: 50px;padding-right: 50px;padding-bottom: 20px;display: block;">The Centre for Health Protection is a professional arm of the Department of Health for disease prevention and control</span>';
			op+='</div>';
			
			op+='<div><a href="https://www.facebook.com/CentreforHealthProtection" target="_blank" alt="CHP Facebook"><img src="/files/png/chp_facebook_en.png" alt="CHP Facebook" title="CHP Facebook"></a></div>';
			op+='<div><a href="https://www.youtube.com/c/ChpGovHkChannel" target="_blank" alt="CHP YouTube Channel"><img src="/files/png/chp_youtube_en.png" alt="CHP YouTube Channel" title="CHP YouTube Channel"></a></div>';
			op+='<div></div>';			
		op+='</div>';	
	}else if(lang==1){
		op+='<div class="sub3" id="sub3" >';
			op+='<div class="dh_banner">';
				op+='<a href="http://www.dh.gov.hk/" target="_blank"><span class="title"><img src="/files/png/logo_dh_tc.png"  alt="衞生署" title="衞生署"></span></a><span class="my_text" style="text-decoration:none !important;/* padding: 20px 50px; */margin-top: 0px;padding-left: 50px;padding-right: 50px;padding-bottom: 20px;display: block;">衞生防護中心乃衞生署<br>轄下執行疾病預防<br>及控制的專業架構</span></a>';
			op+='</div>';
			
			op+='<div><a href="https://www.facebook.com/CentreforHealthProtection" target="_blank"><img src="/files/png/chp_facebook_tc.png" alt="衞生防護中心 Facebook 專頁" title="衞生防護中心 Facebook 專頁"></a></div>';
			op+='<div><a href="https://www.youtube.com/c/ChpGovHkChannel" target="_blank"><img src="/files/png/chp_youtube_tc.png" alt="衞生防護中心 YouTube 頻道" title="衞生防護中心 YouTube 頻道"></a></div>';		
			op+='<div></div>';			
		op+='</div>';	
	}else if(lang==2){
		op+='<div class="sub3" id="sub3" >';
			op+='<div class="dh_banner">';
				op+='<a href="http://www.dh.gov.hk/"  target="_blank"><span class="title"><img src="/files/png/logo_dh_sc.png"   alt="卫生署" title="卫生署"></span></a><span class="my_text" style="text-decoration:none !important;/* padding: 20px 50px; */margin-top: 0px;padding-left: 50px;padding-right: 50px;padding-bottom: 20px;display: block;">卫生防护中心乃卫生署<br>辖下执行疾预防<br>及控制的专业架构</span>';
			op+='</div>';
			
			op+='<div><a href="https://www.facebook.com/CentreforHealthProtection" target="_blank"><img src="/files/png/chp_facebook_sc.png" alt="卫生防护中心 Facebook 专页" title="卫生防护中心 Facebook 专页"></a></div>';
			op+='<div><a href="https://www.youtube.com/c/ChpGovHkChannel" target="_blank"><img src="/files/png/chp_youtube_sc.png" alt="卫生防护中心 YouTube 频道" title="卫生防护中心 YouTube 频道"></a></div>';		
			op+='<div></div>';			
		op+='</div>';	
	}
	
	document.write(op);	
}

function bannerTool()
{
	var op='';
	var barr = [
				[['Banner 1','Banner 1','Banner 1'],'banner_footer1.jpg','#','external'],
				[['Banner 2','Banner 2','Banner 2'],'banner_footer2.jpg','#','external'],
				[['Banner 3','Banner 3','Banner 3'],'banner_footer3.jpg','#','external'],
				[['Banner 4','Banner 4','Banner 4'],'banner_footer4.jpg','#','external'],
				[['Banner 5','Banner 5','Banner 5'],'banner_footer5.jpg','#','external'],
				[['Banner 6','Banner 6','Banner 6'],'banner_footer6.jpg','#','external'],
				[['Banner 7','Banner 7','Banner 7'],'banner_footer7.jpg','#','external'],
				[['Banner 8','Banner 8','Banner 8'],'banner_footer8.jpg','#','external'],
				[['Banner 9','Banner 9','Banner 9'],'banner_footer9.jpg','#','external']
			];
	var arr = new Array;
	for(var i=0;i<barr.length;i++)
	{
		if(barr[i][2]==='undefined' || barr[i][2]===undefined)
			barr[i][2]='#';
		if(barr[i][3]==='undefined' || barr[i][3]===undefined)
		{
			barr[i][3]='';
			barr[i][2]=lang_path+barr[i][2];
		}
		arr.push('<a href="'+barr[i][2]+'" rel="'+barr[i][3]+'"><img src="'+root_path+'images/'+barr[i][1]+'" alt="'+barr[i][0][lang]+'" title="'+barr[i][0][lang]+'"></a>');
	}
	op = createList(arr,'footerBanner');	
	return op;
}

/*===Init===*/
function initSearch()
{	
	var arr = ['Enter search keyword(s)','輸入查詢字串','输入查询字串'];
	$('.searchTool .searchBox').mouseover(function(){
		$(this).focus();
    }).mouseout(function(){
		if($(this).val()=='')$(this).blur;
    }).focus(function(){
		$(this).select();
    }).blur(function(){
		if($(this).val()=='')$(this).val(arr[lang]);
    }).click(function(){
		if($(this).val()==arr[lang])$(this).val('');
	}).keypress(function(){
		
		if(disable_function_domain.indexOf(window.location.hostname) != -1){
			alert('The Service is Temporarily Unavailable');
			return false;
		}
		
		if($(this).val()==arr[lang])$(this).val('');
	});
	$('.searchTool .hrbTool a').click(function(event) {
		//20220905
		event.preventDefault();
		if(disable_function_domain.indexOf(window.location.hostname) != -1){
			alert('The Service is Temporarily Unavailable');
			return false;
		}
		if(checkKeyword($(this).prev())){
			$(this).parent().parent().submit(); 
		}
	});
	$('.navbar-search').on('click',function(){
		$(this).parent().parent().find('>.searchTool').toggleClass('active');
	});
}

function initToggle()
{
	$('.clickToggle').click(function(e){
		if($(this).parent().find('>.hiddenObj').length > 0)
        	$(this).parent().find('>.hiddenObj').removeClass('hiddenObj').addClass('showObj');
		else if($(this).parent().find('>.showObj').length > 0)
			$(this).parent().find('>.showObj').removeClass('showObj').addClass('hiddenObj');
		e.stopPropagation();
        e.preventDefault();
    });	
}

function initToggleLM()
{
	$('.clickToggleLM>a').click(function(e){		
		$('.subMenu .subTitle').find('>.showObj').each(function(i){
			$(this).removeClass('showObj').addClass('hiddenObj');
			$(this).parent().removeClass('borderB');
		});
		if($(this).parent().find('>.hiddenObj').length > 0)
		{
        	$(this).parent().find('>.hiddenObj').removeClass('hiddenObj').addClass('showObj');
			$(this).parent().removeClass('borderB').addClass('borderB');
		}
		e.stopPropagation();
        e.preventDefault();
    });	
}

function initAddDropdown()
{
	/*$('.addDropdown').each(function(){
		$(this).attr('data-toggle','dropdown');
	});
	
	$('.addShowMenu').each(function(){
		$(this).attr('data-toggle','showmenu');
	});
	
	$('.menuStyleDivide>li').mouseover(function(){
		$(this).removeClass('dropActive').addClass('dropActive');
    }).mouseout(function(){
		$(this).removeClass('dropActive');
    });
	$('.menuStyleDivide>li').focus(function(){
		$(this).removeClass('dropActive').addClass('dropActive');
    }).blur(function(){
		$(this).removeClass('dropActive');
    });
	
	$('.menuStyleDivide>li>a').focus(function(){
		$(this).parent().find('>ul').removeClass('activeUl').addClass('activeUl');
	}).blur(function(){
		$(this).parent().find('>ul').removeClass('activeUl');
	});
	$('.menuStyleDivide>li>ul>li>a').focus(function(){
		$(this).parent().parent().removeClass('activeUl').addClass('activeUl');
	}).blur(function(){
		$(this).parent().parent().removeClass('activeUl');
	});

	var patt=/\d*[0-9]/;
	$('[class*=addLabelLedby]').each(function(index){
		var wPatt=/addLabelLedby\d*[0-9]/;
		var nPatt=/addLabelLedby([A-Za-z]+)/;
		if(this.className.match(wPatt))	
		{
			var n= this.className.match(patt);
			$(this).attr('aria-labelledby','drop'+n);
		}
		else if(this.className.match(nPatt))
		{
			var n= this.className.match(nPatt);
			$(this).attr('aria-labelledby','drop'+n[1]);
		}
	});*/
}

function initImg()
{
	$('.mainContent img').each(function(index){
		if(!($(this).hasClass('imgNG')))
		{
			var w = $(this).width();
			var h = $(this).height();
			if(w!=0 || h!=0)
				$(this).css({'width':'100%','height':'100%','max-width':w,'max-height':h});
		}
	});
}

/*===Change Font Size===*/
function fontSize(s){
	$('body').removeClass('mySize0 mySize1 mySize2').addClass('mySize'+s);
	$.cookie("fontSize", s, {path:'/', domain:window.location.hostname});
	AAASelection(s);
	resetsize();
	
}

/*===Mouse Event===*/
function mouseOverEvent()
{	
	$('.f2Btn').mouseover(function(){
			$(this).attr('src', $(this).attr('src').toString().replace('.gif','_f2.gif').replace('.jpg','_f2.jpg').replace('.png','_f2.png'));
    }).mouseout(function(){
			$(this).attr('src', $(this).attr('src').toString().replace('_f2.gif','.gif').replace('_f2.jpg','.jpg').replace('_f2.png','.png'));
    });
	
	$('.active_section').find('img').each(function(){
		$(this).attr('src', $(this).attr('src').toString().replace('.gif','_on.gif').replace('.jpg','_on.jpg').replace('.png','_on.png'));
	});
	
	$('.mOEvt').mouseover(function(){
			$(this).attr('src', $(this).attr('src').toString().replace('.gif','_on.gif').replace('.jpg','_on.jpg').replace('.png','_on.png'));
    }).mouseout(function(){
			$(this).attr('src', $(this).attr('src').toString().replace('_on.gif','.gif').replace('_on.jpg','.jpg').replace('_on.png','.png'));
    });
	$('.eOEvtList').mouseover(function(){
			$(this).find(':not(.active_section) img').each(function(){
				$(this).attr('src', $(this).attr('src').toString().replace('.gif','_on.gif').replace('.jpg','_on.jpg').replace('.png','_on.png'));
			});
    }).mouseout(function(){
			$(this).find(':not(.active_section) img').each(function(){
				$(this).attr('src', $(this).attr('src').toString().replace('_on.gif','.gif').replace('_on.jpg','.jpg').replace('_on.png','.png'));
			});
    });
	$('.eOEvtList').focus(function(){
			$(this).find(':not(.active_section) img').each(function(){
				$(this).attr('src', $(this).attr('src').toString().replace('.gif','_on.gif').replace('.jpg','_on.jpg').replace('.png','_on.png'));
			});
    }).blur(function(){
			$(this).find(':not(.active_section) img').each(function(){
				$(this).attr('src', $(this).attr('src').toString().replace('_on.gif','.gif').replace('_on.jpg','.jpg').replace('_on.png','.png'));
			});
    });
	$('.mOIcon a').mouseover(function() {
		$(this).find('img').each(function(){
				$(this).attr('src', $(this).attr('src').toString().replace('.gif','_on.gif').replace('.jpg','_on.jpg').replace('.png','_on.png'));
				$(this).parent().parent().removeClass('imgOver').addClass('imgOver');
			});
    }).mouseout(function(){
			$(this).find('img').each(function(){
				$(this).attr('src', $(this).attr('src').toString().replace('_on.gif','.gif').replace('_on.jpg','.jpg').replace('_on.png','.png'));
				$(this).parent().parent().removeClass('imgOver');
			});
    });
}

function mouseClickEvent()
{
	$('.mCEvt').click(function() {
		if($(this).parent().parent().parent().parent().hasClass('headerTool'))
		{
			$(this).parent().parent().parent().find('.clickActive').not($(this)).each(function(){
				$(this).attr('src', $(this).attr('src').toString().replace('_on.gif','.gif').replace('_on.jpg','.jpg').replace('_on.png','.png'));
				$(this).removeClass('clickActive').addClass('clickReture');
			});			
		}
		if($(this).hasClass('clickActive'))
		{
			$(this).attr('src', $(this).attr('src').toString().replace('_on.gif','.gif').replace('_on.jpg','.jpg').replace('_on.png','.png'));
			$(this).removeClass('clickActive').addClass('clickReture');
		}
		else
		{
			$(this).attr('src', $(this).attr('src').toString().replace('.gif','_on.gif').replace('.jpg','_on.jpg').replace('.png','_on.png'));
			$(this).removeClass('clickReture').addClass('clickActive');
		}
	});
	$('a.mCLEvt').click(function(){
		$(this).find('img').each(function(){
			if($(this).hasClass('clickActive'))
			{
				$(this).attr('src', $(this).attr('src').toString().replace('_on.gif','.gif').replace('_on.jpg','.jpg').replace('_on.png','.png'));
				$(this).removeClass('clickActive').addClass('clickReture');
			}
			else
			{
				$(this).attr('src', $(this).attr('src').toString().replace('.gif','_on.gif').replace('.jpg','_on.jpg').replace('.png','_on.png'));
				$(this).removeClass('clickReture').addClass('clickActive');
			}
		});
		return false;
	});
	$('.fifo').click(tlToggleOneHeading);
}

function tlToggleOneHeading() { return false;}

/*=======Slide Show====*/
/*===Stlye for Table===*/
function initTable()
{
	//$('#part_b.styleTable table tr:first-child td:not(:first-child)').addClass('tdWidth');
	
	/*$('.styleTable:not(.groupColor) table tr:not(:last-child)').each(function(index){
		$(this).addClass('styleBorder');
	});
	$('.ToggleList table tr:nth-child(odd)').each(function(index){
		if(!($(this).hasClass('listHeader')) || index!=0)
			$(this).addClass('bgColorZe');
	});
	$('.styleFirstRow table tr:first-child').addClass('bgColorFth bold');
	$('.styleFirstRow table tr:last-child').addClass('bgColorLst');
	if($('.styleFirstRow table tr:first-child>td:first-child').attr('rowspan')>1)
	{
		var cr = $('.styleFirstRow table tr:first-child>td:first-child').attr('rowspan');
		for(var i=0;i<cr;i++)
		{
			var nth=i+1;
			$('.styleFirstRow table tr:nth-child('+nth+')').addClass('bgColorFth');
		}
	}
	
	$('.styleFirstCol:not(.groupColor) table tr td:first-child').each(function(index){
		$(this).addClass('bgColorFth');
	});
	
	$('.styleFirstCol.groupColor table tr.listHeader td:first-child:not(:last-child)').each(function(index){
		$(this).addClass('bgColorFth');
	});
	
	var gpColor = false;
	$('.groupColor table tr').each(function(index){
		if($(this).hasClass('listHeader'))
		{
			gpColor = !gpColor;
		}
		$(this).removeClass('bgColorZe');
		if(gpColor)
			$(this).addClass('bgColorZe');
	});
	
	$('.doubleToggle tr:nth-child(odd)').each(function(index){
		if(index!=0)
			$(this).addClass('bgColorDbZe');
	});
	
	$('.pdfTable table').each(function(index){
		var col = $(this).find('tr:nth-child(2)>td').length;
		$(this).addClass('col'+col);
	});
	
	var classes = new Array();
	$('#2015_school tr').each(function(n){
		if(n==0)
			$(this).find('th').each(function(){classes.push($(this).attr('class'))});
		$(this).find('td').each(function(i){
			$(this).addClass(classes[i]);
		});
	});
	
	var myColorZe = false;
	$('.styleTable.my_table_style table tr').each(function(int){
		if($(this).hasClass('my_table_header'))
			myColorZe = false;
		$(this).find('>td:first-child:not(:last-child)').addClass('my_td_Fth');
		$(this).find('>td:last-child:not(:first-child)').addClass('my_td_Lst');
		if(myColorZe)
			$(this).addClass('bgColorZe');
		myColorZe = !myColorZe;			
	});*/
	$('.commontable>table').each(function(){
		$(this).find('tr:even').addClass('toggle');
		/*var arr = new Array;
		$(this).find('tr').each(function(i){
			for(var nc=0;nc<$(this).find('>td').length;nc++){
				if(i==0){
					arr[nc]=$(this).find('>td:nth-child('+(nc+1)+')').text();
				}else{
					$(this).find('>td:nth-child('+(nc+1)+')').prepend('<div class="mOnly">'+arr[nc]+': </div>');
				}
			}
		});*/
	});
}

function initList()
{
	/*
	$('#health_topic_content .toggle_list2 ul ul').each(function(){
		$(this,'li').each(function(i){
			//console.log($(this).html());
			var h = $(this).height();
			var pd = 12;
			if(h>49){
				$(this).css({
					'min-height':h+pd+pd+'px',
					'padding-top':pd+'px',
					'padding-bottom':pd+'px'
				});
				if (i%2 === 1){
					//console.log('a:'+i);
					$(this).next('li').css({'min-height':h+pd+pd+'px','padding-top':pd+'px','padding-bottom':pd+'px'});
				}else{
					//console.log('b:'+i);
					$(this).prev('li').css({'min-height':h+pd+pd+'px','padding-top':pd+'px','padding-bottom':pd+'px'});
				}
			}
		});
	});
	/*
	$('.toggle_list2 ul ul>li').each(function(){
		var h = $(this).height();
		if(h<49){
			var ph = (49-h)/2;
			$(this).css({'padding-top':ph+'px','padding-bottom':ph+'px'});
			//console.log(h);
		}
	});
	*/
	//Hamlet update 2017-11-15
	$('.toggle_list2 ul ul').each(function(){
		var count_item = 0;
		var define_next_item = false;
		$('>li',this).each(function(){
			var h = $(this).height();
			if(h<49 && !define_next_item){
				var ph = (49-h)/2;
				$(this).css({'padding-top':ph+'px','padding-bottom':ph+'px','height':h+ph+ph+'px'});
			}else{
				
				if(define_next_item){
					define_next_item = false;
				}
				
				var item_nearby = null;
				
				if(count_item%2==1){
					item_nearby = $(this).prev();
				}else{
					item_nearby = $(this).next();
					define_next_item = true;
				}
				
				if(item_nearby.height()>h){
					var ph = (item_nearby.height()-h)/2;
					$(this).css({'padding-top':ph+'px','padding-bottom':ph+'px','height':h+ph+ph+'px'});
				}else{
					var ph = (h-item_nearby.height())/2;
					item_nearby.css({'padding-top':ph+'px','padding-bottom':ph+'px','height':h+'px'});
					
					$(this).css({'padding-top':'0','padding-bottom':'0','height':h+'px'});
				}
				
			}
			count_item++;
		});
	});
 	
	$('.toggle_list2>ul>li').each(function(){
		$(this).append(clearBoth());
	});
	$('.toggle_list2>ul').each(function(){
		$(this).find('>li:even').addClass('toggle');
	});
	$('.toggle_list3>ul').each(function(){
		$(this).find('>li:even').addClass('toggle');
	});
	
	if(typeof(cat) != 'undefined'){
		//$(".photo_gallery_list .body>div:nth-child("+cat+")").addClass('active');
		//$(".photo_gallery_list .index ul>li:nth-child("+cat+")").addClass('active');
		$(".photo_gallery_list .body>div#div_"+cat+"").addClass('active');
		$(".photo_gallery_list .index ul>li#li_"+cat+"").addClass('active');
		$(".photo_gallery_list .index").each(function(){
			$(this).find('a').on("click", function(){
				$(this).parent().parent().find('li.active').removeClass('active');
				$(this).parent().parent().parent().parent().find('.body>div.active').removeClass('active');
				$(this).parent().parent().parent().parent().find('.body>div:nth-child('+($(this).parent().index()+1)+')').addClass('active');
				$(this).parent().addClass('active');
				//cat = ($(this).parent().index()+1);
				cat = ($(this).parent().attr('id').replace('li_',''));
				init_pagination();
				return false;
			});
		});
	}
	$('.num_control').each(function(){
		$(this).find('.apge_num:first').addClass('active');
	});
	$('.num_control').each(function(){
		$(this).find('.apge_num>a').on('click',function(){
			$(this).parent().parent().find('.apge_num.active').removeClass('active');
			$(this).parent().addClass('active');
			return false;
		});
	});
}

function initForm()
{
	$('.styleForm>div').each(function(){
		var num = $(this).find('>div').length;
		if(num==2)
		{
			$(this).find('>div:nth-child(1)').addClass('leftCol');
			$(this).find('>div:nth-child(2)').addClass('rightCol');
			$(this).append(clearBoth());
		}
	});
}

function testBreadcrumb() {
	var arr = new Array;
	var harr = ['Home','主頁','主页'];
	var op = '';
    
    	 	
	$('.bodyArea .breadcrumb>div').each(function(n){
		if($(this).find('a').length>0)
		{
            //alert('abc');
			arr[n] = new Array;
			arr[n][0] = $(this).find('a').html();
			arr[n][1] = $(this).find('a').attr('href');
		}
		else
		{
			arr[n] = $(this).html();
            alert($(this).html());
		};
	});
}

function initBreadcrumb()
{
	var arr = new Array;
	var harr = ['Home','主頁','主页'];
	var op = '';
	
	if(getURLParameter('menuid')&&contentMenuId!='461'){
		var _op=getNavBar(getURLParameter('menuid'),'');
		if(_op!=''){
			$('.breadcrumb').html(_op);
			$('.mainHeader>h1').empty().append(section_title);
		}	
	}else{
		if(typeof fromMenuId !== 'undefined' && fromMenuId!='' ){
			
			var _op=getNavBar(fromMenuId,'');
 
			if(typeof menuItems !== "undefined" && menuItems[contentMenuId] !== undefined){ 
				_op += '<div> '+ menuItems[contentMenuId][lang] +' </div>'; 
			}	

			if(_op!=''){
				$('.breadcrumb').html(_op); 
			}
						
		}else if(typeof contentMenuId !== 'undefined' && contentMenuId!='' ){
            
			var _op=getNavBar(contentMenuId,'');
			if(_op!=''){
				$('.breadcrumb').html(_op);
				$('.mainHeader>h1').empty().append(section_title);
			}
		}
	
	}
	
	// Patrick - Change Title - For Photo Gallery/Press Release Only
	try{
	if(typeof contentMenuId !== 'undefined' && contentMenuId!='' ){
		if(contentMenuId=='99' || contentMenuId=='461' || contentMenuId=='464' || contentMenuId=='310'){   
			$('.contHeader').html(menuItems[contentMenuId][lang]);
			 document.title = document.title+ ' - ' +menuItems[contentMenuId][lang];
			 
			 if((contentMenuId=='99' || contentMenuId=='461' ) && getURLParameter('menuid') !== 'undefined' && getURLParameter('menuid')!='' && getURLParameter('menuid')!=null ){ 
				document.title = document.title+ ' - ' +menuItems[getURLParameter('menuid')][lang];
			 }
		}else if(contentMenuId=='116'){   
			//$('.contHeader').html(menuItems[contentMenuId][lang]);
		}
		
	}
	}catch(e){
	}
	 	
	$('.bodyArea .breadcrumb>div').each(function(n){
		if($(this).find('a').length>0)
		{
			arr[n] = new Array;
			arr[n][0] = $(this).find('a').html();
			arr[n][1] = $(this).find('a').attr('href');
		}
		else
		{
			arr[n] = $(this).html();
		};
	});
	
	op +=	'<a href="'+lang_path+'index.html">'+harr[lang]+'</a> <span> &gt; </span>'+
				'<ul class="listStyleInline">';
	
	//20170724 Jacky
	for(var i=0;i<arr.length;i++)
	{
		if(arr.length>=5){
			if(i<1|| i>=(arr.length-3)){
				if($.isArray(arr[i]) && arr.length == 1)
					op += '<li><a href="'+arr[i][1]+'">'+arr[i][0]+'</a></li>';
					else if($.isArray(arr[i])&&i!=arr.length-1)
					op += '<li><a href="'+arr[i][1]+'">'+arr[i][0]+'</a> <span> &gt; </span> </li>';
				else if($.isArray(arr[i])&&i==arr.length-1)
					op += '<li><a href="'+arr[i][1]+'">'+arr[i][0]+'</a>   </li>';				
				else if(i==arr.length-1)
					op += '<li>'+arr[i]+'</li>';		
				else if(i>0)
					op += '<li>'+arr[i]+' &gt; </li>';
				else
					op += '<li>'+arr[i]+' &gt; </li>';
			}else{
				if(i<=1)
					op += '<li> ... &gt;  </li>';
			}
			
		}else{
			if($.isArray(arr[i]) && arr.length == 1)
				op += '<li><a href="'+arr[i][1]+'">'+arr[i][0]+'</a></li>';
			else if($.isArray(arr[i])&&i!=arr.length-1)
				op += '<li><a href="'+arr[i][1]+'">'+arr[i][0]+'</a> <span> &gt; </span> </li>';
			else if($.isArray(arr[i])&&i==arr.length-1)
				op += '<li><a href="'+arr[i][1]+'">'+arr[i][0]+'</a>   </li>';
			else if(i==arr.length-1)
				op += '<li>'+arr[i]+'</li>';		
			else if(i>0)
				op += '<li>'+arr[i]+' &gt; </li>';
			else
				op += '<li>'+arr[i]+' &gt; </li>';
		}
	}
	op +	'</ul>'+
			'</div>';
	breadcrumbArr = arr;
	$('.bodyArea .breadcrumb').empty().append(op);
}

function initDropBox()
{
	$('.myDropDownBox .ddb_title span').each(function(){
		$(this).removeClass('myStyle');
		if($(this).width()>110)
			$(this).addClass('mylong');
		else
			$(this).removeClass('mylong');
		$(this).addClass('myStyle');
	});
	$('.myDropBoxArea').each(function(){		
		$(this).find('.myDropDownBox .ddb_title').each(function(){
			$(this).css('height','100px');
		});
		$(this).find('.myDropDownBox .ddb_content').each(function(){
			$(this).css('height','100px');
		});
		var t=-1;
		var h=0;
		var arr= new Array;
		$(this).find('.myDropDownBox .ddb_title').each(function(){
			if(t!=$(this).position().top)
			{
				arr.push(h);
				t=$(this).position().top;
				$(this).css('height','auto');
				h=$(this).height();
				if(h==0)
					h+=5;
				$(this).css('height','100px');
			}
			else
			{
				$(this).css('height','auto');
				if(h<$(this).height())
					h=$(this).height();
				$(this).css('height','100px');
			}
		});
		arr.push(h);
		t=-1;
		$(this).find('.myDropDownBox .ddb_title').each(function(){
			if(t!=$(this).position().top)
			{
				arr.shift();
				t=$(this).position().top;
				$(this).css('height',arr[0]+12);
			}
			else
			{
				$(this).css('height',arr[0]+12);
			}
		});
		arr= new Array;
		t=-1;
		h=0
		$(this).find('.myDropDownBox .ddb_content').each(function(){
			if(t!=$(this).position().top)
			{
				arr.push(h);
				t=$(this).position().top;
				$(this).css('height','auto');
				h=$(this).height();
				if(h==0)
					h+=5;
				$(this).css('height','100px');
			}
			else
			{
				$(this).css('height','auto');
				if(h<$(this).height())
					h=$(this).height();
				$(this).css('height','100px');
			}
		});
		arr.push(h);
		t=-1;
		$(this).find('.myDropDownBox .ddb_content').each(function(){
			if(t!=$(this).position().top)
			{
				arr.shift();
				t=$(this).position().top;
				$(this).css('height',arr[0]);
			}
			else
			{
				$(this).css('height',arr[0]);
			}
		});
	});
}

function initToggleBox()
{
	$(".myDropDownBox .ddb_btn .dropBtn a").click(function(){
		$(this).parent().parent().parent().parent().find(".ddb_content").slideToggle(600);
		return false;
	});
}

function initStyleDiv()
{
	$('.styleDiv:not(.groupColor)>div:not(:last-child)').each(function(index){
		$(this).addClass('styleBorder');
	});
	$('.ToggleList>div:nth-child(even)').each(function(index){
		if(!($(this).hasClass('listHeader')) || index!=0)
			$(this).addClass('bgColorZe');
	});
	$('.styleDiv.muit_side>div').each(function(){
		$(this).find('div').each(function(i){
			$(this).addClass('my_side'+i);
		});
	});
	$('.toggleList>li:nth-child(even)').each(function(index){
		if(!($(this).hasClass('listHeader')) || index!=0)
			$(this).addClass('bgColorZe');
	});
	
	$('.program_form>div').each(function(){
		$(this).find('>div').each(function(i){
			$(this).addClass('my_form_side'+i);
		});
	});
	$('.search_form>div').each(function(){
		$(this).find('>div').each(function(i){
			$(this).addClass('my_form_side'+i);
		});
	});
	
	$('.styleFirstRow>div:first-child').addClass('bgColorFth');
	$('.styleLastRow>div:last-child').addClass('bgColorLst');
	
	$('.styleFirstCol:not(.groupColor)>div>div:first-child').each(function(index){
		$(this).addClass('bgColorFth');
	});
	
	$('.styleFirstCol.groupColor>div.listHeader>div:first-child:not(:last-child)').each(function(index){
		$(this).addClass('bgColorFth');
	});
	
	var gpColor = false;
	$('.groupColor>div').each(function(index){
		if($(this).hasClass('listHeader'))
		{
			gpColor = !gpColor;
		}
		$(this).removeClass('bgColorZe');
		if(gpColor)
			$(this).addClass('bgColorZe');
	});

	$('.formDiv0').each(function(i){
		$(this).find('>div').each(function(ii){
			if($(this).find('>div').length>0)
			{
				$(this).addClass('iLDiv');
				$(this).find('>div:first-child').addClass('formTitle');
				$(this).append('<div class="clearBoth"></div>');
			}
		});
	});	
	
	$('.formDiv1').each(function(i){
		var arr = new Array;
		var tarr = new Array;
		$(this).find('>div').each(function(ii){
			if($(this).find('>div').length>0)
			{
				$(this).find('>div').each(function(iii){
					if(ii==0)
					{
						var width = $(this).width();
						arr[iii] = width;
						tarr.push($(this).text());
					}
					else
					{
						if(isMobile)
						{							
							if(typeof tarr[iii] === 'undefinded')
								tarr[iii] = '';
							$(this).prepend('<div class="formTitle">'+tarr[iii]+'</div>');
						}
						else
						{
							$(this).css('width',(arr[iii]-1.5)+'px');
						}
					}
				});
				$(this).addClass('iLDiv');
				$(this).append('<div class="clearBoth"></div>');
			}
			if(ii>0)
				$(this).after('<hr>');
		});
	});
	
	$('.formDiv2').each(function(i){
		$(this).find('>div').each(function(ii){
			if($(this).find('>div').length>0)
			{
				$(this).addClass('iLDiv2');
			}
		});
	});
	
	$('.formDiv').each(function(i){
		$(this).find('>div').each(function(ii){
			if($(this).find('>div').length>0)
			{
				$(this).addClass('iLDiv');				
				$(this).append('<div class="clearBoth"></div>');
			}
		});
	});
}
function initStyle()
{
	$(".clearMs").attr("style","");
}

function initMessageBox(){
	$('.box_message').find('>div').each(function(){
		$(this).addClass('box_message_item');
		$(this).find('img').parent().addClass('box_message_img');
		$(this).find('p').parent().addClass('box_message_content');
		if($(this).hasClass('double_width')){
			var num = $(this).find('>div').length;
			$(this).find('>div').each(function(i){
				if(i==0)
					$(this).addClass('item_left');
				else if(i+1==num)
					$(this).addClass('item_right');
			})
		}
	});
}

function initGallery(){
	$('.gallery_list>ul>li').each(function(){
		$(this).find('>div:first-child').addClass('my_img');
	});
	/*
	$('.gallery_list>ul>li').each(function(i){
		if(i%2==0)
			$(this).addClass("toggle");
		if(i%2!=0)
			$(this).addClass("mobile_toggle");
	});
	*/
	
	$('.gallery_list>ul>li:nth-child(4n-1)').addClass('toggle');
	$('.gallery_list>ul>li:nth-child(4n)').addClass('toggle');
	
	/*
	$('.gallery_list>ul>li:nth-child(4n)').addClass('toggle');
	$('.gallery_list>ul>li:nth-child(4n+1)').addClass('toggle');
	$('.gallery_list>ul>li:odd').addClass('mobile_toggle');
	*/
}

function initLiaList(){
	$('.lia_list>li:nth-child(4n-3)').addClass('toggle');
	$('.lia_list>li:nth-child(4n-2)').addClass('toggle');
}
/*===Justice===*/
function resetsize()
{
	$('.tMenu .longList .menuLv1').each(function(){
		var h=0;
		$(this).parent().removeClass('close').addClass('open');
		$(this).parent().find('ul').css('min-height',0);
		$(this).parent().find('ul').each(function(){
			if($(this).height()>h)
				h=$(this).height();
		});
		$(this).parent().removeClass('open').addClass('close');
		$(this).parent().find('ul').css('min-height',h);		
	});
	initDropBox();
	
	
	//Hamlet update 2017-11-30 for health topic list
	$('.toggle_list2 ul ul').each(function(){
		var count_item = 0;
		var define_next_item = false;
		$('>li',this).each(function(){
			
			//20171206 clear old style
			$(this).removeAttr('style');
			
			var h = $(this).height();
			if(h<49 && !define_next_item){
				var ph = (49-h)/2;
				$(this).css({'padding-top':ph+'px','padding-bottom':ph+'px','height':h+ph+ph+'px'});
			}else{
				
				if(define_next_item){
					define_next_item = false;
				}
				
				var item_nearby = null;
				
				if(count_item%2==1){
					item_nearby = $(this).prev();
				}else{
					item_nearby = $(this).next();
					define_next_item = true;
				}
				
				if(item_nearby.height()>h){
					var ph = (item_nearby.height()-h)/2;
					$(this).css({'padding-top':ph+'px','padding-bottom':ph+'px','height':h+ph+ph+'px'});
				}else{
					var ph = (h-item_nearby.height())/2;
					item_nearby.css({'padding-top':ph+'px','padding-bottom':ph+'px','height':h+'px'});
					
					$(this).css({'padding-top':'0','padding-bottom':'0','height':h+'px'});
				}
				
			}
			count_item++;
		});
	});
	
	//20181128 Health Notice 
	if(MycurSlide){
		  
		 $('#flexslider1 .flex-pauseplay a').click(); 
		$('#flexslider1').removeData("flexslider");
		//$('#flexslider1').children('div').eq(0).remove();	
		$('#flexslider1').children('ol').eq(0).remove();		
		$('#flexslider1').children('.flex-pauseplay').eq(0).remove();  
		//$('#flexslider1').children('.flex-viewport').eq(0).remove(); 
		$('#flexslider1').children('ul').eq(0).remove(); 	
		$('#flexslider1').height(''); 
		$( ".type3 .flexslider .slides > li , .type1 .flexslider .slides > li" ).each(function( index ) {
			$(this).height('');
		}); 	 
		   
		$("#flexslider1").flexslider({
				slideshowSpeed: 5000,
				animation: "slide",
				animationLoop: false,
				slideshow: flexslider_animationLoop,
				 directionNav:flexslider_animationLoop,
				startAt: 0,
				controlNav: flexslider_animationLoop,
				pauseOnHover: false,
 
				pausePlay: flexslider_animationLoop,
				start: function (slider) { 
					
						var curSlide = slider.slides[slider.currentSlide];  
					 
						scrollHeight=curSlide.scrollHeight;
						if(scrollHeight<80){
							scrollHeight=80;
						}
												
						if(layout_type<4){
							$('.index_area1_2 .cont_area').height(scrollHeight+38); 
						}else{
							$('.index_area1_2 .cont_area>div').height("100%");
						}
						//$('.index_area1_2 .cont_area>div').css("padding", "5% 0% 5% 0%");
						
						$('#flexslider1').height(scrollHeight); 
						$( ".type3 .flexslider .slides > li , .type1 .flexslider .slides > li" ).each(function( index ) { 
							$(this).height(scrollHeight);
						}); 		
				} 			
			});	 
	 
	}
}

function checkUrl(obj)
{
	var boo = true;
	if($.isArray(obj))
	{
		for(var i=0;i<obj.length;i++)
		{
			if(location_href.indexOf(obj[i])>-1)
			{
				boo = false;
				break;
			}
		}
	}
	else
	{
		if(location_href.indexOf(obj)>-1)
			boo = false;
	}
	return boo;
}

function checkArr(txt,arr){
	for(var i=0;i<arr.length;i++){
		if(txt.match(arr[i]))
			return true;
	}
	return false;
}

function isIE() {
	var boo =false
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
		boo=true;
   return boo;
}

function initMobile()
{
	if(isMobile)
	{
	}
}


function initBrowser()
{
	var ms = msieversion();
	if(ms>100&&ms<200)
		$('body').addClass('mobileVersion');
	else if(ms>10 && ms<20)
		$('body').addClass('ieNewVersion');
	else if(ms<9)
		$('body').addClass('ieVersion');
	else if(ms>0 && ms<11)
		$('body').addClass('ieWin7Version');
}

function msieversion()
{
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
	{
		if(ua.match('MSIE 1') && !!navigator.userAgent.match(/Trident.*rv\:11\./))
			return 15;
		else if(ua.match('MSIE 1'))
			return 10;
		else if(ua.match('MSIE 9'))
			return 9;
		else
			return 0;
	}
	else
	{
		if(/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()))
			return 150;
		else
			return 999;
	}
}

function initMenu()
{
	var w=0;
	var h=0;
	$('.headerMenu>.tMenu li').mouseover(function(){
		$(this).removeClass('close').addClass('open');
    }).mouseout(function(){
		$(this).removeClass('open').addClass('close');
    });
	$('.headerMenu>.tMenu li').focus(function(){
		$(this).removeClass('close').addClass('open');
    }).blur(function(){
		$(this).removeClass('open').addClass('close');
    });
	
	$('.headerMenu>.tMenu>li>a').focus(function(){
		$(this).parent().find('>ul').removeClass('activeUl').addClass('activeUl');
	}).blur(function(){
		$(this).parent().find('>ul').removeClass('activeUl');
	});
	
	//Hamlet update 2017-12-07
	$('.headerMenu>.tMenu>li>ul>li a').mouseup(function(e) {
		if(e.which==2 || e.which==1){
			$(this).blur();
			$(this).parent().blur();
		}
	});
	/*$('.headerMenu>.tMenu>li>ul>li>a').focus(function(){
		$(this).parent().parent().removeClass('activeUl').addClass('activeUl');		
	}).blur(function(){
		$(this).parent().parent().removeClass('activeUl');
	});*/
	$('.headerMenu>.tMenu>li>ul>li a').focus(function(){
		$(this).closest('.menuLv1').removeClass('activeUl').addClass('activeUl');
		$(this).closest('.menuLv2').removeClass('activeUl').addClass('activeUl');		
	}).blur(function(){
		$(this).closest('.menuLv1').removeClass('activeUl');
		$(this).closest('.menuLv2').removeClass('activeUl');
	});
	
	$('.menuLv0>li:first-child').addClass('firstLi eOEvtList');
	$('.menuLv0>li').each(function(i){
		$(this).addClass('my_menu'+i); 
	}); 
	$('.tMenu .excLi').on('click',function(){
		//console.log($(this).prop('href'));
		$(this).blur();
		$(this).parent().toggleClass('excActive');
		
		//if($(this).prop('href').indexOf("/overseas_programmes/overseas_programmes.php") > -1){
		//	return true;
		//}
	});
	
	if($(document).width()<1279){
		srceenResize=true;
	}else{
		initTopMenu();
	}
	$('.navbar-my-menu').on('click',function(){
		$('.headerMenu').toggleClass('active');
		$('.headerMenu ul.tMenu>li.active').removeClass('active');
	});	
	$('.headerMenu ul.tMenu>li').each(function(){
		
		if($(this).find('ul').length > 0)
		{
			 
			$(this).find('>a').on({ 
				'click' : function(){
					//console.log($(this).prop('href'));
					$(this).blur();
					var ua=false
					if($(this).parent().hasClass('active'))
						ua=true;
					$(this).parent().parent().find('>li.active').removeClass('active');
					if(!ua)
						$(this).parent().addClass('active');
					//if($(this).prop('href').indexOf("/overseas_programmes/overseas_programmes.php") > -1){
					//	return true;
					//}	
					return false;
				}
			});
		}
	});
}

function setHeight(par,son)
{
	var h = 0;
	$(par+son).each(function(i){
		if($(this).height()>h)
			h=$(this).height();	
	});
	$(par).css('min-height',h);
}

function clearBoth()
{
	var op = '<div class="clearBoth"></div>';
	return op;
}

function getFalse()
{
	return false;
}

function playScroller()
{
	$('#play_click').parent().removeClass('blueBtn').addClass('blueBtnOn');
	$('#stop_click').parent().removeClass('blueBtnOn').addClass('blueBtn');

}

function pauseScroller()
{
	$('#play_click').parent().removeClass('blueBtnOn').addClass('blueBtn');
	$('#stop_click').parent().removeClass('blueBtn').addClass('blueBtnOn');
}

function initSlide()
{
	var ap = false;
	if(isIndex)
		ap = true;
	try {
		if ($().flexslider) {
			if (window.navigator.userAgent.indexOf('MSIE 8.0;') > 0) {				
				$('#carousel').flexslider({
					animation: "slide",
					controlNav: false,
					animationLoop: false,
					slideshow: false,
					directionNav: false,
					direction: "vertical",
					pausePlay: false,
					itemWidth: 0,
					itemMargin: 5,
					/*sync: '#flexslider0',*/
					asNavFor: '#flexslider0',
					startAt: banner_first_display,
					start: fixScroll()
				});
				$('#flexslider0').flexslider({
					slideshowSpeed: 5000,
					animation: "slide",
					animationLoop: false,
					slideshow: true,
					animationDuration: 0,
					controlNav: false,
					pauseOnHover: false,
					directionNav: true,
					pausePlay: true,
					sync: "#carousel",
					/*asNavFor: "#carousel",*/
					startAt: banner_first_display,
					start: fixSlider(),
					after: reFlex,
					end : function(slider){
						if(slider.playing)
					  		loopCount++;
					}
				});
				$('#flexslider3').flexslider({
					slideshowSpeed: 5000,
					animation: "slide",
					animationLoop: false,
					slideshow: true,
					animationDuration: 0,
					controlNav: true,
					pauseOnHover: false,
					directionNav: true,
					pausePlay: true,
					startAt: banner_first_display
				});
											
											
			$("#flexslider1").flexslider({
					slideshowSpeed: 5000,
					animation: "slide",
					animationLoop: false,
					slideshow: flexslider_animationLoop,
					controlNav: true,
					pauseOnHover: false,
					directionNav: true,
					pausePlay: true,
					
					after: function (slider) {		
						if(layout_type==4){
							var curSlide = slider.slides[slider.currentSlide];  	 
							$('#flexslider1').animate({height:(curSlide.scrollHeight+30)},200); 
						}						
					},	
					
					start: function (slider) {  
						//20200129
						slider.pause(); 
						var ms = msieversion();	
						if(ms!=150){			 
							MycurSlide=true;
							
							var curSlide = slider.slides[slider.currentSlide];  
							//console.log('2952:'+curSlide.scrollHeight);
							
							var scrollHeight = curSlide.scrollHeight;
							if(scrollHeight<80){
								scrollHeight=80;
							}
							
							if(layout_type<4){
								$('.index_area1_2 .cont_area').height(scrollHeight+38); 
							}else{
								$('.index_area1_2 .cont_area>div').height("100%");
							}
							//$('.index_area1_2 .cont_area>div').css("padding", "5% 0% 5% 0%");
							
							$('#flexslider1').height(scrollHeight); 
							$( ".type3 .flexslider .slides > li , .type1 .flexslider .slides > li" ).each(function( index ) { 
								$(this).height(scrollHeight);
							}); 
						}else{
							
							$( ".flexslider .slides > li" ).each(function( index ) { 
								if(mobile_layout_height>0){
								$(this).height(mobile_layout_height);
								}else{
									$(this).height('auto');
								}
							}); 							
							//alert(mobile_layout_height);
						}
					} 			
				});
				
				
				$('#flexslider2').flexslider({
					slideshowSpeed: 5000,
					animation: "slide",
					animationLoop: false,
					slideshow: true,
					animationDuration: 0,
					controlNav: true,
					pauseOnHover: false,
					directionNav: true,
					pausePlay: true
				});
			} else{
				$('#carousel').flexslider({
					animation: "slide",
					controlNav: false,
					animationLoop: false,
					slideshow: false,
					directionNav: false,
					direction: "vertical",
					pausePlay: false,
					itemWidth: 0,
					itemMargin: 5,
					/*sync: '#flexslider0',*/					
					startAt: banner_first_display,
					start: fixScroll(),
					asNavFor: '#flexslider0'
				});
				$('#flexslider0').flexslider({
					slideshowSpeed: 5000,
					animation: "slide",
					animationLoop: false,
					slideshow: true,
					controlNav: false,
					pauseOnHover: false,
					directionNav: true,
					pausePlay: true,
					/*asNavFor: "#carousel",*/
					startAt: banner_first_display,
					start: fixSlider(),
					sync: "#carousel",
					after: reFlex,
					end : function(slider){
						if(slider.playing)
					  		loopCount++;
					}
				});
				$('#flexslider3').flexslider({
					slideshowSpeed: 5000,
					animation: "slide",
					animationLoop: false,
					slideshow: true,
					controlNav: false,
					pauseOnHover: false,
					directionNav: true,
					pausePlay: true,
					startAt: banner_first_display
				});
				
				$("#flexslider1").flexslider({
					slideshowSpeed: 5000,
					animation: "slide",
					animationLoop: false,
					slideshow: flexslider_animationLoop,
					controlNav: true,
					pauseOnHover: false,
					directionNav: true,
					pausePlay: true,

					after: function (slider) {		
						if(layout_type==4){
							var curSlide = slider.slides[slider.currentSlide];  	 
							$('#flexslider1').animate({height:(curSlide.scrollHeight+30)},200); 
						}						
					},						
					
					start: function (slider) { 
						//20200129
						slider.pause();  
						var ms = msieversion();	
						if(ms!=150){			 
							MycurSlide=true;
							
							var curSlide = slider.slides[slider.currentSlide];  
							//console.log('2952:'+curSlide.scrollHeight);
							
							var scrollHeight = curSlide.scrollHeight;
							if(scrollHeight<80){
								scrollHeight=80;
							}
							
							if(layout_type<4){
								$('.index_area1_2 .cont_area').height(scrollHeight+38); 
							}else{
								$('.index_area1_2 .cont_area>div').height("100%");
							}
							//$('.index_area1_2 .cont_area>div').css("padding", "5% 0% 5% 0%");
							
							$('#flexslider1').height(scrollHeight); 
							$( ".type3 .flexslider .slides > li , .type1 .flexslider .slides > li" ).each(function( index ) { 
								$(this).height(scrollHeight);
							}); 
						}else{
							
							$( ".flexslider .slides > li" ).each(function( index ) { 
								if(mobile_layout_height>0){
								$(this).height(mobile_layout_height);
								}else{
									$(this).height('auto');
								}
							}); 							
							//alert(mobile_layout_height);
						}
					} 			
				});
				
				$('#flexslider2').flexslider({
					slideshowSpeed: 5000,
					animation: "slide",
					animationLoop: false,
					slideshow: true,
					controlNav: true,
					pauseOnHover: false,
					directionNav: true,
					pausePlay: true
				});
			}
		};
	}
	catch (e) {
	}				
}

function fixSlider(){
 
	var label_previous = ['Previous','上一個','上一个']; 
	var label_next = ['Next','下一個','下一个'];
	var label_pause = ['Pause','暫停','暂停'];
	var label_play = ['Play','播放','播放'];
	
	$(function(){
		/*$('#flexslider0 #flexsliderList li').each(function(num){
			$(this).find('a').on('focus',function(){
				$(this).closest('.mySlider').find('#flexsliderList_2 li:nth-child('+(parseInt(num)+1)+')').click();
			});
		});*/
		$('#flexslider0 #flexsliderList li').each(function(num){
			$(this).on('click',function(){
				var int = parseInt(i)+1;
				if($(this).closest('.mySlider').find('#flexsliderList_2 li:nth-child('+(parseInt(num)+1)+') a').attr('rel')=='external'){
					window.open($(this).closest('.mySlider').find('#flexsliderList_2 li:nth-child('+(parseInt(num)+1)+') a').attr('href'));
				}
				else{
					window.location.href = $(this).closest('.mySlider').find('#flexsliderList_2 li:nth-child('+(parseInt(num)+1)+') a').attr('href');
				}
			});
		});
		
		//Hamlet update 2017-11-29
		$('#flexslider3 #flexsliderList_3 li').each(function(num){
			$(this).on('click',function(){
				var int = parseInt(i)+1;
				window.location.href = $(this).closest('.mySlider').find('#flexsliderList_2 li:nth-child('+(parseInt(num)+1)+') a').attr('href');
			});
		});
		//Hamlet update 2017-11-29
		
		var op ='<div class="index_bannerList_control">'+
					/*'<p class="index_bannerList_page"><span class="current">1</span> of <span class="all">8</span></p>'+*/
					'<div class="index_bannerList_control-prev bx-slider-customArrow"><a class="bx-prev" href="#"><img src="../images/btn_slide_prev.png" alt="'+label_previous[lang]+'" title="'+label_previous[lang]+'"></a></div>'+
					'<div class="index_bannerList_control-next bx-slider-customArrow"><a class="bx-next" href="#"><img src="../images/btn_slide_next.png" alt="'+label_next[lang]+'" title="'+label_next[lang]+'"></a></div>'+
					'<div class="index_bannerList_control-auto bx-slider-customArrow">'+
						'<div class="bx-controls-auto">'+
							'<div class="bx-controls-auto-item"><a class="bx-start active" href="#"><img src="../images/btn_slide_play.png" alt="'+label_play[lang]+'" title="'+label_play[lang]+'"></a></div>'+
							'<div class="bx-controls-auto-item"><a class="bx-stop" href="#"><img src="../images/btn_slide_pause.png" alt="'+label_pause[lang]+'" title="'+label_pause[lang]+'"></a></div>'+
						'</div>'+
					'</div>'+
				'</div>';
		$('#flexslider0').append(op);		
		$('#flexslider0 .flex-pauseplay a').click();
		$('#flexslider0 .index_bannerList_control .bx-prev').on('click',function(){
			$('#flexslider0 .flex-prev').click();
			return false;
		});
		$('#flexslider0 .index_bannerList_control .bx-next').on('click',function(){
			$('#flexslider0 .flex-next').click();
			return false;	
		});
		$('#flexslider0 .index_bannerList_control .index_bannerList_control-auto a').on('click',function(){
			$(this).removeClass('active');
			$(this).parent().parent().find('a').not(this).addClass('active');
			$('#flexslider0 .flex-pauseplay a').click();
			return false;	
		});
		$('#flexslider0').addClass('active');
		if($('#carousel').hasClass('active'))
			$('#flexslider0 .index_bannerList_control .index_bannerList_control-auto a.active').click();
		
		$('#flexslider3').append(op);
		$('#flexslider3 .flex-pauseplay a').click();
		$('#flexslider3 .index_bannerList_control .bx-prev').on('click',function(){
			$('#flexslider3 .flex-prev').click();
			return false;
		});
		$('#flexslider3 .index_bannerList_control .bx-next').on('click',function(){
			$('#flexslider3 .flex-next').click();
			return false;	
		});
		$('#flexslider3 .index_bannerList_control .index_bannerList_control-auto a').on('click',function(){
			$(this).removeClass('active');
			$(this).parent().parent().find('a').not(this).addClass('active');
			$('#flexslider3 .flex-pauseplay a').click();
			return false;	
		});
		if($('#carousel').hasClass('active'))
			$('#flexslider3 .index_bannerList_control .index_bannerList_control-auto a.active').click();


/*20200129*/
$('#flexslider0 .flex-pauseplay a').click();
$('#flexslider3 .flex-pauseplay a').click();
/*20200129*/


	});
}

function fixplayPause(boo){
	$('#flexslider0 .index_bannerList_control .index_bannerList_control-auto a.active').removeClass('active');
	$('#flexslider3 .index_bannerList_control .index_bannerList_control-auto a.active').removeClass('active');
	if(boo){
		$('#flexslider0 .index_bannerList_control .index_bannerList_control-auto a.bx-start').addClass('active');
		$('#flexslider3 .index_bannerList_control .index_bannerList_control-auto a.bx-start').addClass('active');
	}else{
		$('#flexslider0 .index_bannerList_control .index_bannerList_control-auto a.bx-stop').addClass('active');
		$('#flexslider3 .index_bannerList_control .index_bannerList_control-auto a.bx-stop').addClass('active');
	}
}

function fixScroll(){
	$(function(){
		$('#carousel .flex-direction-nav a').on('focus',function(){
			$(this).closest('.mySlider').scrollTop(0);
		});
		$('#carousel').addClass('active');
		if($('#flexslider0').hasClass('active'))
			$('#flexslider0 .index_bannerList_control .index_bannerList_control-auto a.active').click();
		$('#carousel .slides>li').each(function(i){
			$(this).on('click',function(){
				if($(this).find('a').attr('rel')=='external'){
					window.open($(this).find('a').attr('href'));
				}
				else{
					window.location.href = $(this).find('a').attr('href');
					return false;
				}
			});
		});
		/*$('#carousel .slides>li').each(function(i){
			$(this).on('click',function(){
				var int = parseInt(i)+1;
				window.location.href = $('#flexslider0 .slides>li:nth-child('+int+') a').attr('href');
				return false;
			});
		});*/
	});
}

function fixScroll2(){
	$(function(){
		$('#flexslider1 .flex-viewport #flexsliderAlert li').each(function(num){ 
			$(this).find('a').on('focus',function(){
				var my_x = 0;
				var results = $('#flexsliderAlert').css('transform').match(/matrix(?:(3d)\(-{0,1}\d+\.?\d*(?:, -{0,1}\d+\.?\d*)*(?:, (-{0,1}\d+\.?\d*))(?:, (-{0,1}\d+\.?\d*))(?:, (-{0,1}\d+\.?\d*)), -{0,1}\d+\.?\d*\)|\(-{0,1}\d+\.?\d*(?:, -{0,1}\d+\.?\d*)*(?:, (-{0,1}\d+\.?\d*))(?:, (-{0,1}\d+\.?\d*))\))/);
				$(this).closest('.flex-viewport').scrollLeft($(this).closest('.flex-viewport').width()*num+results[5]);
			});
		});		
	});
}

function reFlex(){
	if(loopCount >= 1){
		//$('#flexslider0 .index_bannerList_control .index_bannerList_control-auto a.active').click();
		loopCount = 0;
	}
}

function initBtnpn(){
	var wth = $('#flexslider .flex-control-nav').find('li').length * (11+12) + 100;
	$('#flexslider .flex-direction-nav').css({'width':wth,'left':'50%','margin-left':wth/-2});
}

function initOrder(){
	$('.orderTool a').on('click', function(){
		$(this).parent().next('.orderSelect').toggleClass("active");
		return false;
	});
}

function clearBoth()
{
	var op= '<div class="clearBoth"></div>';
	return op;
}

$(window).resize(function() {  
	if(srceenResize)
	{
		if($(document).width()>1279)
		{
			srceenResize=false;
			initTopMenu();
		}
	}
	else
	{
		if($(document).width()<1279)
			srceenResize=false;
	}
});

function initTopMenu()
{
	
	var ulw = 1280;
	var ton = $('.tMenu>li').length;
	var ml = (ulw/(ton)-2);
	var tow = 0;
	$('.tMenu>li').each(function(){
		$(this).css('width','initial');
		tow+=$(this).width();
	});
	if(ulw>tow){
		ml=(ulw-tow)/ton-2;
	}
	$('.tMenu>li').each(function(){
		$(this).css('width','initial');
		$(this).css('width',$(this).width()+ml);
	});	
	/*$('.tMenu>li').each(function(){
		$(this).css('width','initial');
		$(this).css('width',ml+2);
		ulw = ulw-$(this).width();
	});*/
	$('.tMenu>li').each(function(){
		var pth = (60-$(this).find('a').height())/2;
		if(pth>0)
			$(this).find('a').css({'padding-top':pth,'height':'100%'});
	});
}

function initPhotoAlbum()
{
	$(function(){
		if($('#photoAlbums').length>0)
		{
			$("head").append($('<link rel="stylesheet" href="'+root_path+'css/prettyPhoto.css" type="text/css" media="screen" title="prettyPhoto main stylesheet" charset="utf-8">'));
			$.when(
				$.getScript(root_path+'js/jquery.prettyPhoto.js'),
				$.Deferred(function( deferred ){
					$( deferred.resolve );
				})
			).done(function(){
				initPrePhoto();
			});
			
			$('.my_albums').find('>div').each(function(){
				$(this).addClass('albums_item');
				$(this).find('>div:nth-child(1)').addClass('item_photo');
				$(this).find('>div:nth-child(2)').addClass('item_cont');
			});			
		}
	});
}

function initPrePhoto()
{
	$(".gallery a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:5000, autoplay_slideshow: false,social_tools:false,
            deeplinking:false});
}

function myColor(c)
{
	$('body').removeClass('myColor0 myColor1 myColor2 myColor3 myColor4').addClass('myColor'+c);
}

function initFullWidth(){
	$('.full_tag').find('ul').each(function(){
		var uw=$(this).width();
		var lw=0;
		var opa=20;
		var oma=2;
		var toi=5;
		$(this).find('>li').each(function(){
			lw=lw+$(this).width()+oma;
		});
		var pa= Math.floor((uw-lw)/toi/2)-10;
		if(pa>0)
		{
			$(this).find('>li>a').each(function(){
				$(this).css({'padding-left':pa,'padding-right':pa});
			});
		}
	});
}

function initPopUp(){
	var op='<div class="my_popup"></div>';
	if($('.popup').length>0)
	{
		$.when(
		$.getScript(root_path+'js/w3data.js'),
		$.Deferred(function( deferred ){
			$( deferred.resolve );
		})
		).done(function(){
			$('body').append(op);
			$('.popup').on('click',function(){
				toPop($(this).attr('href'));		
				return false;
			});			
		});
	}
}

function toPop(url)
{
	var op='<div class="pp_close"><a href="#">close</a></div><div class="pp_holder" w3-include-html="'+url+'"></div><div class="pp_overlay"></div>';
	$('.my_popup').empty().append(op);
	$.when(
		w3IncludeHTML(),
		$.Deferred(function( deferred ){
			$( deferred.resolve );
		})
	).done(function(){
		reSizePop();
	});
}

function reSizePop()
{
	$('.my_popup').addClass('active');
	$('.pp_close a').on('click',function(){
		$('.my_popup').removeClass('active');
		return false;
	});
	setTimeout(externallinks, 800);
}

function initToolTip(){
	/*$('.my_tooltip.data-geo').each(function(){
		var op=$(this).next('.tooltip_text').html();
		$(this).tooltip({title: op, html: true, placement: 'right'});
	});*/
}
function initClick(){
	$('.toggle_list1').on('click',function(){
		$(this).toggleClass('active');
	});
	$('.toggle_list2 .my_title').on('click',function(){
		$(this).parent().toggleClass('active');
	});
	$('.mh_area .mh_title').on('click',function(){
		$(this).parent().toggleClass('active');
	});
	$('.mobileVersion .mob_click>.header').on('click',function(){
		$(this).parent().toggleClass('active');
	});
	
	$('.printBtn').on('click',function(){ 
		initPrintQR();
	});
	
	
	$('.bookmarkBtn').on('click',function(event){
		bookmarPage(); 
		var src_image=$(this).children().children();
		if(bookmarked){
			src_image.attr('src', src_image.attr('src').toString().replace('.gif','ed.gif')); 
		}else{
			src_image.attr('src', src_image.attr('src').toString().replace('ed.gif','.gif'));
		} 
		 event.preventDefault();
	});
	
	
	$('.qrBtn').on('click',function(e){
		if(!$('.qr-content').hasClass('active')){
			initQR();
			e.stopPropagation();
			e.preventDefault();	
		}
	});
	
	$('.shareBtn').on('click',function(e){
		e.preventDefault();
		$(this).parent().toggleClass('active');
		return false;
	});	
}

function initDateSelector(){  
	if( $('#theyear').length ){
		if(typeof contentMenuId != 'undefined' && contentMenuId=='116'){
			return false;
		}
		if(typeof select_max_year != 'undefined'){
			var d = new Date(select_max_year);
		}else{
			var d = new Date();
		}
		var year = getURLParameter('theyear');
		
		var have_all_year = false;
		$('#theyear>option').each(function(){
			if($(this).val()==-1){
				have_all_year = true;
			}
		});
		
		if(!year){
			if(have_all_year){
				year = -1;
			}else{
				year = d.getFullYear();
			}
		}
		var month = getURLParameter('themonth');
		if(!month){
			month = -1;
		}
		
		for(var i=d.getFullYear(); i>=dateSelectorMinYear; i--){
			var selected = '';
			if(year==i){
				selected = 'selected';
			}
			if(select_min_year){
				if(i>=select_min_year){
					$('#theyear').append('<option value="'+i+'" '+selected+'>'+i+'</option>');
				}
			}else{
				$('#theyear').append('<option value="'+i+'" '+selected+'>'+i+'</option>');
			}
		}
		$('#themonth>[value='+month+']').prop('selected','selected');
	}
}

function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function bookmarPage(){ 
	if(subMenu>=0){
		var cookiename="bookmarPage_"+subMenu;
	}else{
		var cookiename="bookmarPage_6";
	}
	var date = new Date();
	var minutes = 500000; 
	date.setTime(date.getTime() + (minutes * 60 * 1000));	
 
	var bookmarList = new Array();
	var _url =document.location.pathname+location.search;
	
	var _title ='';
	var bookTitle=$('.contHeader').html();
	if(typeof bookTitle!='undefined'){
		_title=	bookTitle; 
	}else{
		//Is resources or pdf page
		var bookTitle=$('.featuretitletxt:eq(1)').html();
		if(typeof bookTitle!='undefined'){
			_title=	bookTitle; 
		}
	}
	
	var urlInfo = { url: _url , title:_title};

	//get bookmar page
	if ($.cookie(cookiename) != null) {
		bookmarList = JSON.parse($.cookie(cookiename));
	}
 
	//console.log(bookmarList);
	if(!bookmarked){ 
		//input page
		bookmarList.push(urlInfo);	
		bookmarked=true;		
	}else{
		//remove page
 		$.each(bookmarList, function(i, item) { 
			if(typeof item != 'undefined'){
				if(item.url==_url){  
				   bookmarList.splice(i, 1);	
				   bookmarked=false; 
				} 
			}
		})	 
	} 

	//to json 
	var JSON_cookieValue = JSON.stringify(bookmarList); 
	$.cookie(cookiename, JSON_cookieValue , {path:'/', domain:window.location.hostname,expires: date });
 
	
}

function checkBookmarPage(){
	if(subMenu>=0){
		var cookiename="bookmarPage_"+subMenu;
	}else{
		var cookiename="bookmarPage_6";
	}
	var _url =document.location.pathname+location.search;
	if ($.cookie(cookiename) != null) {
		bookmarList = JSON.parse($.cookie(cookiename));  
		$.each(bookmarList, function(j, item) {
			//console.log('check '+item.url);
			if(item.url==_url){   
				bookmarked=true; 	

				var src_image=$('.bookmarkBtn').children().children(); 

				src_image.attr('src', src_image.attr('src').toString().replace('.gif','ed.gif')); 
				 
			}			
			 
		})		
		
	}	 
}


function initQR(){  
	$('#qrCode').html(''); 
	var qr_txt = ['Quick Response Code','快速回應碼','快速回应码'];
	$.getScript( "/js/jquery.qrcode.min.js" )
	  .done(function( script, textStatus ) { 
		var qrcode = new QRCode(document.getElementById("qrCode"), {
			text: location.href,
			width: 150,
			height: 150,
			colorDark : "#000000",
			colorLight : "#ffffff",
			correctLevel : QRCode.CorrectLevel.M
		});
		var title = $('.contHeader').html().toString();
		if(title== 'undefined'){
			title=document.title;
		}
		$('#qrCode').append('<span class="qr_title">'+title+'</span>'); 
		$('#qrCode > :nth-child(2)').attr({
		  alt: qr_txt[lang]
		});
		$('.qr-content').addClass('active');
	  });  
}
 
//share
function facebook(){
	//var title = $('.contHeader').html().toString();
	
	if(disable_function_domain.indexOf(window.location.hostname) != -1){
		alert('The Service is Temporarily Unavailable');
		return false;
	}
	
	var title = $('title').html();
	var url = window.location.href;	
    window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(url)+'&t='+encodeURIComponent(title),'','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;
}
function twitter(){  
	
	if(disable_function_domain.indexOf(window.location.hostname) != -1){
		alert('The Service is Temporarily Unavailable');
		return false;
	}
	
	var title = $('title').html();
	var arr = [
				['Centre for Health Protection - ','Centre for Health Protection, Department of Health - '],
				['衞生防護中心 - ','衞生署 衞生防護中心 - '],
				['卫生防护中心 - ','卫生署 卫生防护中心 - ']
			]; 

	title=title.replace(arr[lang][0],arr[lang][1]); 
	
	var url = window.location.href;	
	 window.open("https://twitter.com/share?url="+encodeURIComponent(url)+"&text="+encodeURIComponent(title), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;	
}
function whatsapp(){

	var title = $('title').html();
	var arr = [
				['Centre for Health Protection - ','Centre for Health Protection, Department of Health - '],
				['衞生防護中心 - ','衞生署 衞生防護中心 - '],
				['卫生防护中心 - ','卫生署 卫生防护中心 - ']
			]; 	
	title=title.replace(arr[lang][0],arr[lang][1]); 
	var url = window.location.href;
	var message = encodeURIComponent(title) + " - " + encodeURIComponent(url);
	var whatsapp_url = "whatsapp://send?text=" + message;
	window.location.href = whatsapp_url;
}
function email(){
	//var subject=$('.contHeader').html().toString();
	var subject = $('title').html();
	var arr = [
				['Centre for Health Protection - ','Centre for Health Protection, Department of Health - '],
				['衞生防護中心 - ','衞生署 衞生防護中心 - '],
				['卫生防护中心 - ','卫生署 卫生防护中心 - ']
			]; 	
	subject=subject.replace(arr[lang][0],arr[lang][1]); 
	
	var body = window.location.href;
	var uri = "mailto:?subject=";
	uri += encodeURIComponent(subject);
	uri += "&body=";
	uri += encodeURIComponent(body);
	window.open(uri);	 
}

function initFeatureParentId(){
	$('.div_feature_parentid').each(function(){
		var element = $(this);
		var parentid = element.text();
		$.each(feature_parent_data.data, function(index) {
			$.each($(this), function(index) {
				var t = $(this)[0]
				if(parentid==t.InfoBlockID){
					$(element).text(t.Title_en);
				}
			})
		})
	})
}


function fillKeywords(){
	
	var keyword = '';
	 if (typeof search_keywords  !== "undefined"){
		var x=0;
		var maximum=5;
		var keywords_array= [];
		//console.log(search_keywords);
		$.each(search_keywords, function(index) {
			
			var t = $(this);
			$.each(t, function(index) {
				if(x<maximum){
				var o = $(this)[0];
					//console.log(o);
					// 20221018 - Change the search URL
					/*if(lang==1){
						if(search_engine_path  !== "undefined"){
							var search_link = search_engine_path+'/search/'+langtxt+'/chp_search_result.php?q='+encodeURIComponent(o['Keyword_zh_tw']);		
							keywords_array.push('<a href="'+search_link+'">'+o['Keyword_zh_tw']+'</a>');			
						}						
					}else if(lang==2){
						if(search_engine_path  !== "undefined"){
							var search_link = search_engine_path+'/search/'+langtxt+'/chp_search_result.php?q='+encodeURIComponent(o['Keyword_zh_cn']);		
							keywords_array.push('<a href="'+search_link+'">'+o['Keyword_zh_cn']+'</a>');		
						}							
					}else{
						if(search_engine_path  !== "undefined"){
							var search_link = search_engine_path+'/search/'+langtxt+'/chp_search_result.php?q='+encodeURIComponent(o['Keyword_en']);
							keywords_array.push('<a href="'+search_link+'">'+o['Keyword_en']+'</a>');
						}
					}*/
					if(lang==1){
						if(search_engine_path  !== "undefined"){
							var search_link = search_engine_path+'/chp/'+langtxt+'/search_result.php?q='+encodeURIComponent(o['Keyword_zh_tw']);		
							keywords_array.push('<a href="'+search_link+'">'+o['Keyword_zh_tw']+'</a>');			
						}						
					}else if(lang==2){
						if(search_engine_path  !== "undefined"){
							var search_link = search_engine_path+'/chp/'+langtxt+'/search_result.php?q='+encodeURIComponent(o['Keyword_zh_cn']);		
							keywords_array.push('<a href="'+search_link+'">'+o['Keyword_zh_cn']+'</a>');		
						}							
					}else{
						if(search_engine_path  !== "undefined"){
							var search_link = search_engine_path+'/chp/'+langtxt+'/search_result.php?q='+encodeURIComponent(o['Keyword_en']);
							keywords_array.push('<a href="'+search_link+'">'+o['Keyword_en']+'</a>');
						}
					}

				}
				x++
			});
			
		});
		
		keyword = keywords_array.join(', &nbsp;');
		
	}
	return keyword;
}

function initDnsTable(){
	/*if($('.dnstablewhitetitletxt').length){
		findParentIs($('.dnstablewhitetitletxt'),'table').wrap('<div class="div_dns_table"></div>');
		var element = findParentIs($('.dnstablewhitetitletxt'),'td');
		$('#chpcontent1').append(element.html());
		element.remove();
		findPrevIs($('.div_dns_table'),'table').remove();
	}*/
	
	if($('.dnstablewhitetitletxt').length){
		findParentIs($('.dnstablewhitetitletxt'),'table').wrap( "<div class='commontable blankborder dataTable'></div>" );
		resizeStatisticsTable();
		$(window).resize(function() {
			resizeStatisticsTable();
		});		
		
		//20171208 remove align , add to style
		$( ".dataTable table th" ).each(function( index ) {
			if($( this ).attr('align')!=''){
				//console.log($( this ).attr('align'));
				$( this ).css('text-align',$( this ).attr('align'));
				$( this ).removeAttr('align');
			}
			//$( this ).removeAttr('align');
		});	
		
		//20180515 doubleScrollbar for Data Table 
		$.getScript( "/js/jquery.doubleScroll.js" ).done(function( script, textStatus ) {
			$('.dataTable').doubleScroll({resetOnWindowResize: true});  
		});  			
		
	}else if($('th.featurenormaltxt_en').length){
		findParentIs($('th.featurenormaltxt_en'),'table').wrap( "<div class='commontable blankborder dataTable'></div>" );
		resizeStatisticsTable();
		$(window).resize(function() {
			resizeStatisticsTable();
		});	
		
		//20171208 remove align , add to style
		$( ".dataTable table th" ).each(function( index ) {
			if($( this ).attr('align')!=''){
				//console.log($( this ).attr('align'));
				$( this ).css('text-align',$( this ).attr('align'));
				$( this ).removeAttr('align');
			}
		});	
		
		//20180515 doubleScrollbar for Data Table 
		$.getScript( "/js/jquery.doubleScroll.js" ).done(function( script, textStatus ) {
			$('.dataTable').doubleScroll({resetOnWindowResize: true});  
		});  			
		
	}	
	
}
function findParentIs(element,elementType){
	if(element.is(elementType)){
		return element;
	}else{
		return findParentIs(element.parent(),elementType);
	}
}
function findPrevIs(element,elementType){
	if(element.is(elementType)){
		return element;
	}else{
		return findPrevIs(element.prev(),elementType);
	}
}

function resizeStatisticsTable(){ 
        //if(window.matchMedia('(max-width: 767px)').matches){ 
        /*if($( window ).width()<768){ 
                $( ".dataTable" ).each(function( index ) { 
                        $( this ).css('margin-right', '0'); 
                        $( this ).css('margin-left', '0'); 
                }); 
        }*/ 
        //if(window.matchMedia('(max-width: 1279px)').matches){ 
        //if($( window ).width()<1280){ 
        if ($(".mobileTool").css("display") == "block" ){ 
                $( ".dataTable" ).each(function( index ) { 
                        $( this ).css('margin-right', '0'); 
                        $( this ).css('margin-left', '0'); 
                        var totalMargin=0; 
                        $( this ).parents().each(function( index ) { 
                                totalMargin=totalMargin+parseInt($( this ).css('padding-right'))+parseInt($( this ).css('padding-left'))+parseInt($( this ).css('margin-right'))+parseInt($( this ).css('margin-left')); 
                        }); 
                        totalMargin=totalMargin+parseInt($( this ).css('margin-right'))+parseInt($( this ).css('margin-left')); 
                        var dataTableWidth=$( window ).width()-totalMargin; 
                        $( this ).css('width', dataTableWidth); 
                        $( this ).css('overflow', 'auto'); 
                }); 
        }else{ 
                $( ".dataTable" ).each(function( index ) { 
                        $( this ).css('width','100%'); 
                        $( this ).css('overflow', 'auto'); 
                        if ($( this ).find("table").width()>930){ 
                                $( this ).css('width','930px'); 
                        } 
                }); 
        } 
} 


function removeURLParameter(url, parameter) {
    //prefer to use l.search if you have a location/link object
    var urlparts= url.split('?');   
    if (urlparts.length>=2) {

        var prefix= encodeURIComponent(parameter)+'=';
        var pars= urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i= pars.length; i-- > 0;) {    
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
                pars.splice(i, 1);
            }
        }

        url= urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
        return url;
    } else {
        return url;
    }
}

/*==========Site Map===========*/
function siteMap(){
	var op ='';
	var arr=getMenuData();
	op += '<div class="siteList">';
	op += extMenu(arr,'siteMenu',0);
	op += '</div>'
	document.write(op);
	$('.siteList .menuLv1 a').each(function(){
		var url = $(this).attr('href');
		var purl = $(this).closest("ul").prev('a').attr('href');
		if(purl == url){
			$(this).closest("ul").prev('a').on('click',function(){
				return false;
			});
		}
	});
}

function initFacebook(){
	var div_width = 290;
	var tablet_window_width = 1279;
	var window_width = $(window).width();
	
	if(window_width<=tablet_window_width){
		div_width = window_width;
	}
	document.write('<div class="fb-page" data-href="https://www.facebook.com/CentreforHealthProtection/" data-tabs="timeline" data-width="'+div_width+'"  data-height="'+tc_index_facebook_div_height+'"  data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/CentreforHealthProtection/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/CentreforHealthProtection/">衞生署衞生防護中心 Centre for Health Protection, DH</a></blockquote></div>');
}


function compare_last_revision_date(date){
	if(date && date != 0){
		
		date=date.split(" ")[0];  
		
		var date_object = new Date(date);
		if(date_object.getTime() > last_revision_date_object.getTime()){
			last_revision_date_object = date_object;
		}
		
	}
	return last_revision_date_object;
}

function compare_check_wa(CheckWA){
	if(CheckWA==1 && (check_wa==1 || check_wa=='[::check_wa::]')){
		return 1;
	}else{
		return 0;
	} 
}

function update_last_revision_date(){
	var year = last_revision_date_object.getFullYear();
	var month_num = last_revision_date_object.getMonth()+1;
	var day = last_revision_date_object.getDate();
	if(month_num<10){ month_num='0'+month_num; }
	if(day<10){ day='0'+day; }
	
	last_revision_date = year+'/'+month_num+'/'+day;
	$('.updateDate').replaceWith(updateDate());	
}

function getMaxDate(array, field) {
	
	for(var i = 0; i < array.length; i++){

        var obj = array[i];

        last_revision_date_object = compare_last_revision_date(obj[field]);

    }   

    return last_revision_date_object;
}

function compare_all_check_wa(array) {
	if (array.length > 0) {
		for(var i = 0; i < array.length; i++){
			check_wa = compare_check_wa ( array[i]['CheckWA'] );
		}
	}
	return check_wa;
}

function initMenHealthStyle(){ 
	try{
		var menHealthStyle=$('#Button1').parent();
		if(menHealthStyle.get( 0 ).tagName=='TD'){ 
			//$('#Button1').parent().css('white-space',' nowrap');  
			menHealthStyle.attr('style', 'white-space:nowrap;'+menHealthStyle.attr('style'));
			$('#Button1').removeAttr("style"); 
		}
	}catch(err){
    }
}

function mensVoicePaging(){
	
	try{
		
		if(isNumber(getURLParameter('page'))){
			var pagenum = getURLParameter('page');
			var url = window.location.pathname;
			var filename = url.substring(url.lastIndexOf('/')+1);
			if(filename == '80143.html' || filename == '80144.html'){
				if(pagenum==0){ 
 					url = url.replace(filename, '80143.html'); 
					window.location = url;
				}else if(pagenum==1){
 					url = url.replace(filename, '80144.html'); 
					window.location = url;
				}
			}
			pagenum = getURLParameter('page');
		}
	}catch(err){
		console.log(err);
    }
}
 
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function initFeaturePressReleaseTable(){
	
	// check if is feature content
	if(location_href.match('/features/')){
		
		$('.bluelink').each(function(){
			url = $(this).context.pathname;
			if (url.indexOf('/media/116/') >= 0){
				$(this).addClass('feature_pressrelease_url');
			} 
		})
	
	}
}
 
function convertStaticTable() {
	$('.sCont table').each(function(){
		if($(this).prop('cellpadding')==1){
			if($(this).prop('cellspacing')==1){
				if($(this).prop('border')==1){
					$(this).addClass('static_table_1');
				}
			}
		}
	})
	$('.sCont table').each(function(){
		if($(this).prop('width')==435){
			$(this).addClass('static_table_width_435');
		}
	})
}


//20210225
var otherlang = '';
function getAllOtherLangItem(){
	 
	var otherlangItem = []; 
	$.each(menuItems, function(k, v) {
		if(v[6]=='424'){
			otherlangItem.push(v);  
		}
	});
	
	otherlangItem.sort(function(a,b) {
		return a[7]-b[7]
	}); 
	 
	if(otherlangItem.length>0){
		$.each(otherlangItem, function(k, v) {
			otherlang+= '<a href="'+v[lang+3]+'">'+v[lang]+'</a> | '; 
		});
	}
	
	return otherlang;
}


function moblieOherLangheaderTool(){  
	return '<div>'+otherlang.slice(0, -2)+'</div>';
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};