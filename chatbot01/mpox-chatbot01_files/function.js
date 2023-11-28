var pagetxt = [['Page','頁','页'],['First page','第一頁','第一页'],['Previous page','上一頁','上一页'],['Next page','下一頁','下一页'],['Last page','最後一頁','最后一页']];
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}


function printVersion()
{ 
	//initPrintQR();
}
function initPrintQR(){ 
    var divPrintQR='';
	if($("#printQR").length>0){
		$("#printQR").html(""); 
	}else{
		divPrintQR = $("<div id='printQR'>").html(""); 
		$("#mainContent").append(divPrintQR);   		
		 
	}
	$.getScript( "/js/jquery.qrcode.min.js" )
	  .done(function( script, textStatus ) {  
		var qrcode = new QRCode(document.getElementById("printQR"), {
			text: location.href,
			width: 150,
			height: 150,
			colorDark : "#000000",
			colorLight : "#ffffff",
			correctLevel : QRCode.CorrectLevel.M
		}); 
		window.print();
	});   
}

function getFormattedDate(date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  
  return year + '/' + month + '/' + day ;
}


function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
/*
function event(lang='en'){
	
	var today = new Date();
	var maxRow = 10;
	var maxPage = parseInt(events_data.data.length / maxRow);
	var currentPage;
	
	if(getURLParameter('page')){
		currentPage = parseInt(getURLParameter('page'));
	}else{
		currentPage = parseInt("1");
	}
	
		if(events_data.data.length %maxRow !=0){
			maxPage+=1;
		}
	 
	$(function() {
		var year='';
		var _newsContent = '<div class="commontable dataTable">';
		_newsContent += '<table><tbody><tr class="header"> <td class="my_date">Date</td> <td>Target audience</td> <td>Title / Program</td>  <td>Remarks</td></tr>';
		$.each(events_data.data, function(index) {
	
	
			if(index<currentPage*maxRow-maxRow && currentPage!=1){
				return true;
			}
			
			if(index<=(maxRow*currentPage-1)){
				o = $(this);
			}else{
				return false;
			}
			
			$.each(o, function(index) {
				
				var t = $(this)[0];
				
				_newsContent += '<tr>';
				_newsContent += '<td>'+t['EventDate_'+lang]+'</td>'; 
				_newsContent += '<td>'+t['TargetUser_'+lang]+'</td>'; 
				
			if(t.Content_type=='pdf'){
				_newsContent += '<td><a href="'+t['FilePath_'+lang]+'" >'+t['Title_'+lang]+'</a></td>'; 
			}else if(t.Content_type=='url'){
				_newsContent += '<td><a href="'+t['UrlPath_'+lang]+'" ';
				if(t.URLTarget==1){ _newsContent += ' target="_blank" '; }
				_newsContent += '>'+t['Title_'+lang]+'</a></td>'; 
			}else{
				_newsContent += '<td><a href="'+t.EventID+'.html" >'+t['Title_'+lang]+'</a></td>'; 
			}
			
				_newsContent += '<td>'+t['Remark_'+lang]+'</td>'; 
				_newsContent += '</tr>';
			  
			 		
			}); 
		 
		});
	
		_newsContent += '</tbody></table></div>'; 
		$('#events_content').html(_newsContent);	
	 
	});		

 $(function() {

	 
	 var path = window.location.href.split("?")[0]+"?page=";
				
		 var _newsContent="<div style='text-align: right'>"+
		 
		"<a href="+(path+1)+">"+
		"<img id='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
		
		"<a href="+(path+(currentPage-1))+">"+
		"<img id = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
		
    	"<label for='page'>"+pagetxt[0][lang]+":&nbsp;</label>"+
	    "<input type='text' id='page' value='"+currentPage+"' class='page' maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
		
		"&nbsp;<span class='dnstitle'>/ "+maxPage+"</span>&nbsp;"+
		
		"<a href="+(path+(currentPage+1))+">"+
	"<img id = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
	
		"<a href="+(path+maxPage)+">"+
	"<img id='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";

		"</div>";
		
				
	$('#pagination').html(_newsContent);
	 
	 
		
	if(currentPage == 1){
		document.getElementById("fristPage").style.display = 'none';
		document.getElementById("prevPage").style.display = 'none';
	}else{
		document.getElementById("fristPage").style.display= '';
		document.getElementById("prevPage").style.display= '';
	}
	
	if(currentPage == maxPage){
		document.getElementById("nextPage").style.display = 'none';
		document.getElementById("lastPage").style.display = 'none';
	}else{
		document.getElementById("nextPage").style.display= '';
		document.getElementById("lastPage").style.display= '';
	}

		
    });
	
}
*/


function event(){
 
	if(events_data.data.last_revision_date && events_data.data.last_revision_date != '0'){
		last_revision_date_object = new Date(events_data.data.last_revision_date.split(" ")[0]);
		update_last_revision_date();
	}

	var today = new Date();
	var today_year = today.getFullYear();
	var today_month = today.getMonth()+1;
	if(today_month<10){ today_month='0'+today_month; }
	var today_date = today.getDate();
	if(today_date<10){ today_date='0'+today_date; }
	
	var maxRow = 10;
	
	if(typeof event_maxRow != 'undefined' && event_maxRow > 0){
		maxRow = event_maxRow;
	}
	
	var maxPage = 0;
	var count_max_record = 0;
	var currentPage;
	
	var no_item = true;
	
	var pastDate=today_year+'-'+(today_month)+'-'+today_date+' 00:00:00.000';
	
	if(getURLParameter('page')){
		currentPage = getURLParameter('page');
	}else{
		currentPage = parseInt("1");
	}
	
	if(events_data.data.length %maxRow !=0){
		maxPage+=1;
	} 
    
    var events_data_show = new Array();
	
	var pass_data = new Array();
	var pass_count_max_record = 0;
	
	var event_data = new Array();
	var event_count_max_record = 0;

	
	$(function() {
		$.each(events_data.data, function(index1) { 
			$.each($(this), function(index) {
				var t = $(this)[0];
				var tExpiryDate = t.ExpiryDate; 
				if(tExpiryDate<=pastDate || (tExpiryDate == null && typeof tExpiryDate != 'undefined')){
					
                    pass_data[pass_count_max_record] = index1;
					pass_count_max_record++; 			 
					
				}else if(tExpiryDate>pastDate){ 
                    event_data[event_count_max_record] = index1;
					event_count_max_record++; 
				} 
			});
		});
		
		if(location.href.includes("index.html") && event_count_max_record>0){ 
			count_max_record=event_count_max_record;
			events_data_show=event_data;
		}else{  
			if(location.href.includes("index.html")){
				$('#past_event').remove();
			} 
			count_max_record=pass_count_max_record;
			events_data_show=pass_data;
		}
		
		maxPage = parseInt(count_max_record / maxRow);
		
		if(count_max_record % maxRow !=0){
			maxPage+=1;
		}
		
		var _newsContent = '<div class="commontable dataTable">';
		if(lang==0){
			_newsContent += '<table  style="table-layout:fixed;" ><tbody><tr class="header"> <th class="my_date" width="20%">Date</th> <th width="20%">Target audience</th> <th width="20%">Title / Program</th>  <th width="40%">Remarks</td></tr>';
		}else if(lang==1){
			_newsContent += '<table  style="table-layout:fixed;" ><tbody><tr class="header"> <th class="my_date" width="20%">日期</th> <th width="20%">參與人士</th> <th width="20%">主題 / 項目</th>  <th width="40%">其他</th></tr>';
		}else if(lang==2){
			_newsContent += '<table  style="table-layout:fixed;" ><tbody><tr class="header"> <th class="my_date" width="20%">日期</th> <th width="20%">参与人士</th> <th width="20%">主题 / 项目</th>  <th width="40%">其他</th></tr>';
		}
		var o;
			
			$.each(events_data.data, function(index) {
                //console.log(index);
                var indexKey = events_data_show.indexOf(index);
                
                if(indexKey==-1){
                    return true;
                }
				if(indexKey<currentPage*maxRow-maxRow && currentPage!=1){
					return true;
				}
				
				if(indexKey<=(maxRow*currentPage-1)){
					o = $(this);
				}else{
					return false;
				}

				$.each(o, function(index) {
					
					var t = $(this)[0];
					  
					_newsContent += '<tr>';
					_newsContent += '<td>'+t['EventDate_'+lang_text]+'</td>'; 
					_newsContent += '<td>'+t['TargetUser_'+lang_text]+'</td>'; 
					
					var url=''; 
					if(t.Content_type=='pdf'){
						if(t['FilePath_'+lang_text]!='' && t['FilePath_'+lang_text]!==null)
							url= '<a href="'+t['FilePath_'+lang_text]+'" target="_blank" >'+t['Title_'+lang_text]+'</a>'; 
						else
							url=t['Title_'+lang_text];
					}else if(t.Content_type=='url'){
						if(t['UrlPath_'+lang_text]!=''&& t['UrlPath_'+lang_text]!==null){
							url= '<a href="'+t['UrlPath_'+lang_text]+'" ';
							if(t.URLTarget==1){ url += ' target="_blank" '; }	
							url += '>'+t['Title_'+lang_text]+'</a>'; 
						}else{
							url=t['Title_'+lang_text];
						}							
					}else{
						url= ' <a href="'+t.EventID+'.html" >'+t['Title_'+lang_text]+'</a> '; 
					} 
					_newsContent += '<td>'+url+'</td>'; 						
					
				
					_newsContent += '<td>'+t['Remark_'+lang_text]+'</td>'; 
					_newsContent += '</tr>';
					
					no_item = false;
					
					check_wa = compare_check_wa(t['CheckWA']);
				  		
	
				}); 
			
			});
			
			_newsContent += '</tbody></table></div>';  
		
			if(no_item){
				if(lang==0){
					_newsContent = 'To be announced later'; 
				}else if(lang==1){
					_newsContent = '容後公佈'; 
				}else if(lang==2){
					_newsContent = '容后公布'; 
				}
			}
		 
			$('#events_content').html(_newsContent);
			
			//update w3cIcon
			$('.copyrightBar').replaceWith(w3cIcon());
 
		if(getURLParameter('f')){
			var path = window.location.href.split("?")[0]+"?f="+getURLParameter('f')+"&page=";
		}else{
			var path = window.location.href.split("?")[0]+"?page=";
		}
			
		if(!no_item){ 	
			var _newsContent="<div style='text-align: right'>"+
			 
			"<a href="+(path+1)+">"+
			"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
			
			"<a href="+(path+(parseInt(currentPage)-1))+">"+
			"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
			
			"<label for='page'>"+pagetxt[0][lang]+":&nbsp;</label>"+
			"<input type='text' id='page' value='"+currentPage+"' class='page' maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
			
			"<span class='dnstitle'>&nbsp;/ "+maxPage+"</span>&nbsp;"+
			
			"<a href="+(path+(parseInt(currentPage)+1))+">"+
		"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
		
			"<a href="+(path+maxPage)+">"+
		"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";

			"</div>";
			
			var _newsContent2="<div style='text-align: right'>"+
			 
			"<a href="+(path+1)+">"+
			"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
			
			"<a href="+(path+(parseInt(currentPage)-1))+">"+
			"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
			
			"<label for='page2'>"+pagetxt[0][lang]+":&nbsp;</label>"+
			"<input type='text' id='page2' value='"+currentPage+"' class='page' maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
			
			"<span class='dnstitle'>&nbsp;/ "+maxPage+"</span>&nbsp;"+
			
			"<a href="+(path+(parseInt(currentPage)+1))+">"+
		"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
		
			"<a href="+(path+maxPage)+">"+
		"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";

			"</div>";
		}else{			
			var _newsContent = '<br>';
			var _newsContent2 = '<br>';
		}
		

		$("#events_content").before('<div class="pagination2">'+_newsContent+'</div><BR/>'); 
		$('#pagination').html(_newsContent2);
		 
		 
			
		if(currentPage == 1){
			$('.fristPage').css('display','none');
			$('.prevPage').css('display','none'); 
		}else{
			$('.fristPage').css('display','');
			$('.prevPage').css('display',''); 
		}
		
		if(currentPage == maxPage){
			$('.nextPage').css('display','none');
			$('.lastPage').css('display','none'); 
		}else{
			$('.nextPage').css('display','');
			$('.lastPage').css('display',''); 
		} 
	});
  
}

function training(){
 
	if(trainings_data.data.last_revision_date && trainings_data.data.last_revision_date != '0'){
		last_revision_date_object = new Date(trainings_data.data.last_revision_date.split(" ")[0]);
		update_last_revision_date();
	}

	var today = new Date();
	var today_year = today.getFullYear();
	var today_month = today.getMonth()+1;
	if(today_month<10){ today_month='0'+today_month; }
	var today_date = today.getDate();
	if(today_date<10){ today_date='0'+today_date; }
	
	var maxRow = 10;
	
	if(typeof event_maxRow != 'undefined' && event_maxRow > 0){
		maxRow = event_maxRow;
	}
	
	var maxPage = 0;
	var count_max_record = 0;
	var currentPage;
	
	var no_item = true;
	
	var pastDate=today_year+'-'+(today_month)+'-'+today_date+' 00:00:00.000';
	
	if(getURLParameter('page')){
		currentPage = getURLParameter('page');
	}else{
		currentPage = parseInt("1");
	}
	
	if(trainings_data.data.length %maxRow !=0){
		maxPage+=1;
	} 
    
    var events_data_show = new Array();
	
	var pass_data = new Array();
	var pass_count_max_record = 0;
	
	var event_data = new Array();
	var event_count_max_record = 0;

	
	$(function() {
		$.each(trainings_data.data, function(index1) { 
			$.each($(this), function(index) {
				var t = $(this)[0];
				var tExpiryDate = t.ExpiryDate; 
				if(tExpiryDate<=pastDate || (tExpiryDate == null && typeof tExpiryDate != 'undefined')){
					
                    pass_data[pass_count_max_record] = index1;
					pass_count_max_record++; 			 
					
				}else if(tExpiryDate>pastDate){ 
                    event_data[event_count_max_record] = index1;
					event_count_max_record++; 
				} 
			});
		});
		
		if(location.href.includes("index.html") && event_count_max_record>0){ 
			count_max_record=event_count_max_record;
			events_data_show=event_data;
		}else{  
			if(location.href.includes("index.html")){
				$('#past_training').remove();
			} 
			count_max_record=pass_count_max_record;
			events_data_show=pass_data;
		}
		
		maxPage = parseInt(count_max_record / maxRow);
		
		if(count_max_record % maxRow !=0){
			maxPage+=1;
		}
		
		var _newsContent = '<div class="commontable dataTable">';
		if(lang==0){
			_newsContent += '<table  style="table-layout:fixed;" ><tbody><tr class="header"> <th class="my_date" width="20%">Date</th> <th width="20%">Target audience</th> <th width="20%">Title / Program</th>  <th width="40%">Remarks</td></tr>';
		}else if(lang==1){
			_newsContent += '<table  style="table-layout:fixed;" ><tbody><tr class="header"> <th class="my_date" width="20%">日期</th> <th width="20%">參與人士</th> <th width="20%">主題 / 項目</th>  <th width="40%">其他</th></tr>';
		}else if(lang==2){
			_newsContent += '<table  style="table-layout:fixed;" ><tbody><tr class="header"> <th class="my_date" width="20%">日期</th> <th width="20%">参与人士</th> <th width="20%">主题 / 项目</th>  <th width="40%">其他</th></tr>';
		}
		var o;
			
			$.each(trainings_data.data, function(index) {
                //console.log(index);
                var indexKey = events_data_show.indexOf(index);
                
                if(indexKey==-1){
                    return true;
                }
				if(indexKey<currentPage*maxRow-maxRow && currentPage!=1){
					return true;
				}
				
				if(indexKey<=(maxRow*currentPage-1)){
					o = $(this);
				}else{
					return false;
				}

				$.each(o, function(index) {
					
					var t = $(this)[0];
					  
					_newsContent += '<tr>';
					_newsContent += '<td>'+t['EventDate_'+lang_text]+'</td>'; 
					_newsContent += '<td>'+t['TargetUser_'+lang_text]+'</td>'; 
					
					var url=''; 
					if(t.Content_type=='pdf'){
						if(t['FilePath_'+lang_text]!='' && t['FilePath_'+lang_text]!==null)
							url= '<a href="'+t['FilePath_'+lang_text]+'" target="_blank" >'+t['Title_'+lang_text]+'</a>'; 
						else
							url=t['Title_'+lang_text];
					}else if(t.Content_type=='url'){
						if(t['UrlPath_'+lang_text]!=''&& t['UrlPath_'+lang_text]!==null){
							url= '<a href="'+t['UrlPath_'+lang_text]+'" ';
							if(t.URLTarget==1){ url += ' target="_blank" '; }	
							url += '>'+t['Title_'+lang_text]+'</a>'; 
						}else{
							url=t['Title_'+lang_text];
						}							
					}else{
						url= ' <a href="'+t.EventID+'.html" >'+t['Title_'+lang_text]+'</a> '; 
					} 
					_newsContent += '<td>'+url+'</td>'; 						
					
				
					_newsContent += '<td>'+t['Remark_'+lang_text]+'</td>'; 
					_newsContent += '</tr>';
					
					no_item = false;
					
					check_wa = compare_check_wa(t['CheckWA']);
				  		
	
				}); 
			
			});
			
			_newsContent += '</tbody></table></div>';  
		
			if(no_item){
				if(lang==0){
					_newsContent = 'To be announced later'; 
				}else if(lang==1){
					_newsContent = '容後公佈'; 
				}else if(lang==2){
					_newsContent = '容后公布'; 
				}
			}
		 
			$('#training_content').html(_newsContent);
			
			//update w3cIcon
			$('.copyrightBar').replaceWith(w3cIcon());
 
		if(getURLParameter('f')){
			var path = window.location.href.split("?")[0]+"?f="+getURLParameter('f')+"&page=";
		}else{
			var path = window.location.href.split("?")[0]+"?page=";
		}
			
		if(!no_item){ 	
			var _newsContent="<div style='text-align: right'>"+
			 
			"<a href="+(path+1)+">"+
			"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
			
			"<a href="+(path+(parseInt(currentPage)-1))+">"+
			"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
			
			"<label for='page'>"+pagetxt[0][lang]+":&nbsp;</label>"+
			"<input type='text' id='page' value='"+currentPage+"' class='page' maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
			
			"<span class='dnstitle'>&nbsp;/ "+maxPage+"</span>&nbsp;"+
			
			"<a href="+(path+(parseInt(currentPage)+1))+">"+
		"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
		
			"<a href="+(path+maxPage)+">"+
		"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";

			"</div>";
			
			var _newsContent2="<div style='text-align: right'>"+
			 
			"<a href="+(path+1)+">"+
			"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
			
			"<a href="+(path+(parseInt(currentPage)-1))+">"+
			"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
			
			"<label for='page2'>"+pagetxt[0][lang]+":&nbsp;</label>"+
			"<input type='text' id='page2' value='"+currentPage+"' class='page' maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
			
			"<span class='dnstitle'>&nbsp;/ "+maxPage+"</span>&nbsp;"+
			
			"<a href="+(path+(parseInt(currentPage)+1))+">"+
		"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
		
			"<a href="+(path+maxPage)+">"+
		"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";

			"</div>";
		}else{			
			var _newsContent = '<br>';
			var _newsContent2 = '<br>';
		}
		

		$("#training_content").before('<div class="pagination2">'+_newsContent+'</div><BR/>'); 
		$('#pagination').html(_newsContent2);
		 
		 
			
		if(currentPage == 1){
			$('.fristPage').css('display','none');
			$('.prevPage').css('display','none'); 
		}else{
			$('.fristPage').css('display','');
			$('.prevPage').css('display',''); 
		}
		
		if(currentPage == maxPage){
			$('.nextPage').css('display','none');
			$('.lastPage').css('display','none'); 
		}else{
			$('.nextPage').css('display','');
			$('.lastPage').css('display',''); 
		} 
	});
}

function health_topic(){

	var health_topic_cat_array = [['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','Others'],['一至五劃','六至十劃','十一至十五劃','十六劃或以上','其他'],['一至五划','六至十划','十一至十五划','十六划或以上','其他']];
	var health_topic_have_link_cat_array = [];
	var cat_html = '';
	
	var menuid = getURLParameter('menuid');
	if(!menuid){
		var menuid = getMenuIdFromUrl();
	}
	var have_cat = false;
	var have_cat_menuid_array = ['24'];
	if(have_cat_menuid_array.indexOf(menuid)!=-1){
		have_cat = true;
	}
	
	var today = new Date();
	var maxRow = 99999;
	var maxPage = parseInt(healthTopics_data.data.length / maxRow);
	var currentPage;
	var last_cat_char = '';
	
	currentPage = parseInt("1");
	
	if(healthTopics_data.data.length %maxRow !=0){
		maxPage+=1;
	}
	 
	
	//console.log(healthTopics_data);
	 
	$(function() {
		var year='';
		var count=0;
		var _newsContent = '';
		_newsContent_head = '<div class="toggle_list2">';
		_newsContent += 	'<ul>';
		//_newsContent += 		'<li>';
        //_newsContent += 			'<div class="my_title">'+first_char+'</div>';
        //_newsContent += 			'<ul>';
		$.each(healthTopics_data.data, function(index) {
		
			var show_cat = false;
			$.each($(this), function(index) {
				var t = $(this)[0];
				if(t.MenuID==menuid){
					show_cat = true;
				}
			});
			
			if(show_cat){
			
				last_cat_char = index;
		
				if(index<currentPage*maxRow-maxRow && currentPage!=1){
					return true;
				}
				
				if(count==0){ 
					_newsContent += '<li class="active">';
					if(have_cat){
					_newsContent += 	'<div class="my_title" id="'+index+'">'+index+'</div>';
					}
					_newsContent += 	'<ul>';
				}
				
				if(count!=0 && have_cat){ 
					_newsContent += 	'</ul>';
					_newsContent += '</li>';
					_newsContent += '<li>';
					_newsContent += 	'<div class="my_title" id="'+last_cat_char+'">'+last_cat_char+'</div>';
					_newsContent += 	'<ul>';
				}
				
				if(health_topic_cat_array[lang].indexOf(last_cat_char) != -1){
					health_topic_have_link_cat_array.push(last_cat_char)
				}
				
				$.each($(this), function(index) {
					
					var t = $(this)[0];
					
					if(t.MenuID==menuid){
						
						last_revision_date_object = compare_last_revision_date(t.PublishDate);
						check_wa = compare_check_wa(t.CheckWA);
						newwindow = ''; 
						try{
							if(t.newWindow=='1'){
								newwindow = ' target="_blank"';
							}
						}catch(e){ 
						}
						_newsContent += '<li><a href="/'+langtxt+'/healthtopics/content/'+menuid+'/'+t.InfoBlockID+'.html" '+newwindow+'>'+t['Title_'+lang_text]+'</a></li>';
						
						count++;
						
					}
				  
						
				}); 
			
			}
		 
		});
		
		$.each(health_topic_cat_array[lang], function(index){
			var cat = health_topic_cat_array[lang][index]; 
			if(health_topic_have_link_cat_array.indexOf(cat) != -1){
				/*if(index>13){
					cat_html += '<li><a style="background:#106dfc" title="'+cat+'" href="#'+cat+'">'+cat+'</a></li>';
				}else{
					cat_html += '<li><a style="background:#00b9f1"  title="'+cat+'" href="#'+cat+'">'+cat+'</a></li>';
				}*/
				cat_html += '<li><a  title="'+cat+'" href="#'+cat+'">'+cat+'</a></li>';
			}else{
				cat_html += '<li><a title="'+cat+'" href="#'+cat+'" class="disabled">'+cat+'</a></li>';
			}
		})
		cat_html = '<ul class="health_topic_cat">'+cat_html+'</ul>';
		
        _newsContent += 			'</ul>';
		_newsContent += 		'</li>';
		_newsContent += 	'</ul>';
		_newsContent += 	'<div class="clearBoth"></div>';			
		_newsContent_foot = '</div>'; 
		
		if(have_cat){
			$('#health_topic_content').html(_newsContent_head+cat_html+_newsContent+_newsContent_foot);	
		}else{
			$('#health_topic_content').html(_newsContent_head+_newsContent+_newsContent_foot);	
		}
		
		//update last_revision_date
		update_last_revision_date();
		
		//update w3cIcon
		$('.copyrightBar').replaceWith(w3cIcon());
		
		//health topic title
		
		$('.h1_menuid').empty().append(menuItems[menuid][lang]);	
			
		
		$('.toggle_list2 .my_title').on('click',function(){
			$(this).parent().toggleClass('active');
		});
	});		
	
}

function contenthead(){
	
	var health_topic_cat_array = [['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','Others'],['一至五劃','六至十劃','十一至十五劃','十六劃或以上','其他'],['一至五划','六至十划','十一至十五划','十六划或以上','其他']];
	var health_topic_have_link_cat_array = [];
	var cat_html = '';
 
	var menuid = getMenuIdFromUrl();
	console.log(menuid);
	//var menuid = '24';
	
	var have_cat = false;
	var have_cat_menuid_array = ['464'];
	if(have_cat_menuid_array.indexOf(menuid)!=-1){
		have_cat = true;
	}
	
	var today = new Date();
	var maxRow = 99999;
	var maxPage = parseInt(healthTopics_data.data.length / maxRow);
	var currentPage;
	var last_cat_char = '';
	
	currentPage = parseInt("1");
	
	if(healthTopics_data.data.length %maxRow !=0){
		maxPage+=1;
	}
	 
	$(function() {
		var year='';
		var count=0;
		var _newsContent = '';
		_newsContent_head = '<div class="toggle_list2">';
		_newsContent += 	'<ul>';
		//_newsContent += 		'<li>';
        //_newsContent += 			'<div class="my_title">'+first_char+'</div>';
        //_newsContent += 			'<ul>';
		$.each(healthTopics_data.data, function(index) {
		
			var show_cat = false;
			$.each($(this), function(index) {
				var t = $(this)[0];
				if(t.ehr_MenuID==menuid){
					show_cat = true;
				}
			});
			
			if(show_cat){
			
				last_cat_char = index;
		
				if(index<currentPage*maxRow-maxRow && currentPage!=1){
					return true;
				}
				
				if(count==0){ 
					_newsContent += '<li class="active">';
					if(have_cat){
					_newsContent += 	'<div class="my_title" id="'+index+'">'+index+'</div>';
					}
					_newsContent += 	'<ul>';
				}
				
				if(count!=0 && have_cat){ 
					_newsContent += 	'</ul>';
					_newsContent += '</li>';
					_newsContent += '<li>';
					_newsContent += 	'<div class="my_title" id="'+last_cat_char+'">'+last_cat_char+'</div>';
					_newsContent += 	'<ul>';
				}
				
				if(health_topic_cat_array[lang].indexOf(last_cat_char) != -1){
					health_topic_have_link_cat_array.push(last_cat_char)
				}
				
				$.each($(this), function(index) {
					
					var t = $(this)[0];
					
					if(t.ehr_MenuID==menuid){
						
						_newsContent += '<li><a href="'+t.InfoBlockID+'.html">'+t['Title_'+lang_text]+'</a></li>';
						
						last_revision_date_object = compare_last_revision_date(t.PublishDate);
						
						count++;
						
					}
				  
						
				}); 
			
			}
		 
		}); 
		$.each(health_topic_cat_array[lang], function(index){
			var cat = health_topic_cat_array[lang][index];
			
			if(health_topic_have_link_cat_array.indexOf(cat) != -1){
				 
				cat_html += '<li><a title="'+cat+'" href="#'+cat+'">'+cat+'</a></li>';
			}else{
				cat_html += '<li><a title="'+cat+'" href="#'+cat+'" class="disabled">'+cat+'</a></li>';
			}
		})
		cat_html = '<ul class="health_topic_cat">'+cat_html+'</ul>';
		
        _newsContent += 			'</ul>';
		_newsContent += 		'</li>';
		_newsContent += 	'</ul>';
		_newsContent += 	'<div class="clearBoth"></div>';			
		_newsContent_foot = '</div>'; 
		
		if(have_cat){
			$('#contenthead_content').html(_newsContent_head+cat_html+_newsContent+_newsContent_foot);	
		}else{
			$('#contenthead_content').html(_newsContent_head+_newsContent+_newsContent_foot);	
		}
		
		$('.toggle_list2 .my_title').on('click',function(){
			$(this).parent().toggleClass('active');
		});
		
		//update last_revision_date
		update_last_revision_date();
	});		
	
}


function press_release(){
	
	var year = parseInt(getURLParameter('theyear'), 10);
	if(!year){
		if(typeof press_year != 'undefined' && press_year.data[0]!=''){
			year=press_year.data[0];
		}else{
			year = new Date().getFullYear();
		}
	}
	var month = parseInt(getURLParameter('themonth'), 10);
	if(!month){
		month = -1;
	}
	
	
	if(typeof press_year != 'undefined'){
		initPRDateSelector(press_year.data);
	}else{
		initPRDateSelector('');
	}
		
	$.getScript("/js/press_data_"+year+".js")
	.done(function(){

		if(typeof last_revision_date != 'undefined'){
			last_revision_date_object = new Date(last_revision_date.split(" ")[0]);
			update_last_revision_date();
		}
		
		//update w3cIcon
		$('.copyrightBar').replaceWith(w3cIcon());
	
		if(month!=-1){
			var temp_press_data = [];
		
			$.each(press_data.data, function(){
				$.each($(this), function(){
					 console.log($(this)[0].PublishDate);
					if(new Date($(this)[0].PublishDate).getMonth()+1==month){
						temp_press_data.push($(this)[0]);
					}
				})
			})
			
			press_data.data = temp_press_data;
		}

		var today = new Date();
		var maxRow = 10;
			
		if(typeof press_maxRow != 'undefined' && press_maxRow > 0){
			maxRow = press_maxRow;
		}
	
		var maxPage = parseInt(press_data.data.length / maxRow);
		var currentPage;
		
		if(getURLParameter('page')){
			currentPage = parseInt(getURLParameter('page'));
		}else{
			currentPage = parseInt("1");
		}
		
		if(press_data.data.length %maxRow !=0){
			maxPage+=1;
		}
		 
		$(function() {
			var _newsContent = '<div class="commontable dataTable">';
			if(lang==0){
				_newsContent += '<table><tbody><tr class="header"> <th class="my_date" style="width:180px">Date</th> <th>Press releases</th> </tr>';
			}else if(lang==1){
				_newsContent += '<table><tbody><tr class="header"> <th class="my_date" style="width:160px">日期</th> <th>新聞稿</th> </tr>';
			}else if(lang==2){
				_newsContent += '<table><tbody><tr class="header"> <th class="my_date" style="width:160px">日期</th> <th>新闻稿</th> </tr>';
			}
			$.each(press_data.data, function(index) {
		
		
				if(index<currentPage*maxRow-maxRow && currentPage!=1){
					return true;
				}
				
				if(index<=(maxRow*currentPage-1)){
					o = $(this);
				}else{
					return false;
				}
				
				$.each(o, function(index) {
					
					var t = $(this)[0];
					
					_newsContent += '<tr>';
					_newsContent += '<td class="my_date">'+displayDate(t.PublishDate)+'</td>';
					if (t['Content_type']!==undefined && t['Content_type']!=='' ) { 
						if(t['UrlPath_'+lang_text] !='' && t['Content_type']=='url'  ){
							_newsContent += '<td class="my_data"><a href="'+t['UrlPath_'+lang_text]+'" ';
							if(t.UrlTarget==1){ _newsContent += ' target="_blank"'; }
							_newsContent += '>'+t['Title_'+lang_text]+'</a></td>'; 
						}
						else if(t['FilePath_'+lang_text] !=''  && t['Content_type']=='pdf' ){
							_newsContent += '<td class="my_data"><a href="'+t['FilePath_'+lang_text]+'" target="_blank">'+t['Title_'+lang_text]+'</a></td>'; 
						}
						else{
							_newsContent += '<td class="my_data"><a href="'+t.InfoBlockID+'.html" >'+t['Title_'+lang_text]+'</a></td>'; 
						} 
					}else{
						if(t['UrlPath_'+lang_text]){
							_newsContent += '<td class="my_data"><a href="'+t['UrlPath_'+lang_text]+'" ';
							if(t.UrlTarget==1){ _newsContent += ' target="_blank"'; }
							_newsContent += '>'+t['Title_'+lang_text]+'</a></td>'; 
						}
						else if(t['FilePath_'+lang_text]){
							_newsContent += '<td class="my_data"><a href="'+t['FilePath_'+lang_text]+'" target="_blank">'+t['Title_'+lang_text]+'</a></td>'; 
						}
						else{
							_newsContent += '<td class="my_data"><a href="'+t.InfoBlockID+'.html" >'+t['Title_'+lang_text]+'</a></td>'; 
						}
					}
					
					_newsContent += '</tr>';
						
				}); 
			 
			});

			if(press_data.data.length==0){		 
					_newsContent += '<tr>';
				if(lang==0){
					_newsContent += '<td class="my_date" colspan="2">No record found in this month.</td>'; 
				}else if(lang==1){
					_newsContent += '<td class="my_date" colspan="2">本月沒有任何相關記錄。</td>'; 
				}else if(lang==2){
					_newsContent += '<td class="my_date" colspan="2">本月没有任何相关记录。</td>'; 
				}
					_newsContent += '</tr>';
			}
			_newsContent += '</tbody></table></div>'; 
			$('#press_release_content').html(_newsContent);	
			
		});

		 $(function() {

				
			 //var path = window.location.href.split("?")[0]+"?page=";
						
				 var _newsContent="<div style='text-align: right'>"+
				 
				"<a href="+(updateURLParameter(window.location.href,'page',1))+">"+
				"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
				
				"<a href="+(updateURLParameter(window.location.href,'page',(parseInt(currentPage)-1)))+">"+
				"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
				
				"<label for='page'>"+pagetxt[0][lang]+":&nbsp;</label>"+
				"<input type='text' id='page' value='"+currentPage+"'  maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
				
				"&nbsp;<span class='dnstitle'>/ "+maxPage+"</span>&nbsp;"+
				
				"<a href="+(updateURLParameter(window.location.href,'page',(parseInt(currentPage)+1)))+">"+
			"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
			
				"<a href="+(updateURLParameter(window.location.href,'page',maxPage))+">"+
			"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";

				"</div>";
				
				 var _newsContent2="<div style='text-align: right'>"+
				 
				"<a href="+(updateURLParameter(window.location.href,'page',1))+">"+
				"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
				
				"<a href="+(updateURLParameter(window.location.href,'page',(parseInt(currentPage)-1)))+">"+
				"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
				
				"<label for='page2'>"+pagetxt[0][lang]+":&nbsp;</label>"+
				"<input type='text' id='page2' value='"+currentPage+"'  maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
				
				"&nbsp;<span class='dnstitle'>/ "+maxPage+"</span>&nbsp;"+
				
				"<a href="+(updateURLParameter(window.location.href,'page',(parseInt(currentPage)+1)))+">"+
			"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
			
				"<a href="+(updateURLParameter(window.location.href,'page',maxPage))+">"+
			"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";

				"</div>";
				
				

			if(press_data.data.length>0){		 
				$("#press_release_content").before('<div class="pagination2">'+_newsContent+'</div><BR/>'); 
				$('#pagination').html(_newsContent2);
			}
				
				
			if(currentPage == 1){
				$('.fristPage').css('display','none');
				$('.prevPage').css('display','none'); 
			}else{
				$('.fristPage').css('display','');
				$('.prevPage').css('display',''); 
			}
			
			if(currentPage == maxPage){
				$('.nextPage').css('display','none');
				$('.lastPage').css('display','none'); 
			}else{
				$('.nextPage').css('display','');
				$('.lastPage').css('display',''); 
			}
			 
			$('.commontable>table').each(function(){
				$(this).find('tr:even').addClass('toggle');
			});
				
		});
	 
	})	
	.fail(function() {
		$("#error_log").text('Data File Not Found (press_data_'+year+'.js)');
		$("#error_log").addClass('error_log');
	});
	
	
	
	
}

function initPRDateSelector(pr_year){
	var year = parseInt(getURLParameter('theyear'), 10);
	var month = parseInt(getURLParameter('themonth'), 10);
	if(!month){
		month = -1;
	}	
	
	if(pr_year.length>0){ 
		for(i=0;i<pr_year.length;i++){
			var selected = '';
			if(year==pr_year[i]){
				selected = 'selected';
			}
			if(select_min_year){
				if(pr_year[i]>=select_min_year){
					$('#theyear').append('<option value="'+pr_year[i]+'" '+selected+'>'+pr_year[i]+'</option>');
				}
			}else{
				$('#theyear').append('<option value="'+pr_year[i]+'" '+selected+'>'+pr_year[i]+'</option>');
			}
		}
		$('#themonth>[value='+month+']').prop('selected','selected');		
	}else{
		var d = new Date(); 
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
	
/*
	var d = new Date();
	var year = parseInt(getURLParameter('theyear'), 10);
	
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
	var month = parseInt(getURLParameter('themonth'), 10);
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
*/	
	
}


function RelatedLinks(categoryid){
	
	if(categoryid){
		var lists = '';
		var icount = 0;
		links = jQuery.grep(links.data, function(t) {
			return t['LinkCatID'] == categoryid;
		});
		
		//console.log(links.length);
		//if(links.length > 0){
			lists += '<div class="toggle_list3">'; 
			lists += '<div class="header">';
			 if(lang==0)
				lists += 'Related Links';
			else if(lang==1)
				lists += '相關連結';
			else if(lang==2)
				lists += '相关连结';
			lists += '</div>';
			lists += '<ul id="local_list">';
			
			$.each(links, function(index) {
				var t= $(this)[0];
				//console.log(t);
				if(icount%2==0){
					lists += '<li class="toggle">';
				}else{
					lists += '<li>';	
				}
				lists += '<a href="'+t['URL_'+lang_text]+'" class="relatedlink" target="_blank">'+t['Name_'+lang_text]+'</a>';
				lists += '</li>';
				icount++;
				
				last_revision_date_object = compare_last_revision_date(t.LastModDate);
			});
			
			lists += '</ul>';
			lists += '</div>'; 
			$('#relatedlinks').html(lists);
		//}
		
	} else{
		 
		var localid = 2;
		var overseasid = 3
		var local_list = '';
		var overseas_list = '';
			
		local_links = jQuery.grep(links.data, function(t) {
			return t['LinkCatID'] == localid;
		});
		
		overseas_links = jQuery.grep(links.data, function(t) {
			return (t['LinkCatID'] == overseasid);
		});
		
		
		//Local Links
		$.each(local_links, function(index) {
			var o= $(this);
			//console.log(o['Name_en']);
			$.each(o, function(index) {
				var t = $(this)[0];
				local_list += '<li><a href="'+t['URL_'+lang_text]+'" class="relatedlink" target="_blank">'+t['Name_'+lang_text]+'</a></li>';
				
				last_revision_date_object = compare_last_revision_date(t.LastModDate);
			});
		});
		
		//Overseas Links
		$.each(overseas_links, function(index) {
			var o= $(this);
			//console.log(o['Name_en']);
			$.each(o, function(index) {
				var t = $(this)[0];
				overseas_list += '<li><a href="'+t['URL_'+lang_text]+'" class="relatedlink" target="_blank">'+t['Name_'+lang_text]+'</a></li>';
				
				last_revision_date_object = compare_last_revision_date(t.LastModDate);
			});
		});
		
		$('#local_list').html(local_list);
		$('#overseas_list').html(overseas_list);
		
		//add other home link 
		$.each(cats, function(index) {
			var o= $(this);
			$.each(o, function(index) {
				var t = $(this)[0];
				if(t['LinkCatID']!='2'&&t['LinkCatID']!='3'){  
				
					//get cats links
					o_links = jQuery.grep(links.data, function(s) {
						return s['LinkCatID'] == t['LinkCatID'];
					});	
					
					var other_list='';
					//other links
					$.each(o_links, function(index) {
						var ol= $(this);
						//console.log(o['Name_en']);
						$.each(ol, function(index) {
							var tl = $(this)[0];
							other_list += '<li><a href="'+tl['URL_'+lang_text]+'" class="relatedlink" target="_blank">'+tl['Name_'+lang_text]+'</a></li>';
							
							last_revision_date_object = compare_last_revision_date(tl.LastModDate);
						});
					});			
					if(other_list!=''){
						//console.log(other_list);
						var cats_name='<div class="header">'+t['CatName_'+lang_text]+'</div>'; 
						$('#overseas_list').after(cats_name+'<ul>'+other_list+'</ul>');
					}
				}
			});
		});		
			
	}
	
	$(function(){
		//update last_revision_date
		update_last_revision_date();
	});

}



function intRelatedLinks(categoryid){
	
	if(categoryid){
		var lists = '';
		var icount = 0;
		intlinks = jQuery.grep(links.data, function(t) {
			return t['LinkCatID'] == categoryid;
		});
		
		//console.log(links.length);
		//if(links.length > 0){
			lists += '<P><div class="toggle_list3">'; 
			lists += '<div class="header">';
			if(lang==0)
				lists += 'Related information';
			else if(lang==1)
				lists += '相關資料';
			else if(lang==2)
				lists += '相关资料';
			lists += '</div>';
			lists += '<ul id="local_list">';
			
			$.each(intlinks, function(index) {
				var t= $(this)[0];
				//console.log(t);
				if(icount%2==0){
					lists += '<li class="toggle">';
				}else{
					lists += '<li>';	
				}
				lists += '<a href="'+t['URL_'+lang_text]+'" class="relatedlink" target="_blank">'+t['Name_'+lang_text]+'</a>';
				lists += '</li>';
				icount++;
			});
			
			lists += '</ul>';
			lists += '</div></P>'; 
			$('#intRelatedLinks').html(lists);
		//} 
	}  
}


function extRelatedLinks(categoryid){
	
	if(categoryid){
		var lists = '';
		var icount = 0;
		extlinks = jQuery.grep(links.data, function(t) {
			return t['LinkCatID'] == categoryid;
		});
		
		//console.log(extlinks.length);
		if(extlinks.length > 0){
			lists += '<P><div class="toggle_list3">'; 
			lists += '<div class="header">';
			if(lang==0)
				lists += 'Related Links';
			else if(lang==1)
				lists += '相關連結';
			else if(lang==2)
				lists += '相关连结';
			lists += '</div>';
			lists += '<ul id="local_list">';
			
			$.each(extlinks, function(index) {
				var t= $(this)[0];
				//console.log(t);
				if(icount%2==0){
					lists += '<li class="toggle">';
				}else{
					lists += '<li>';	
				}
				lists += '<a href="'+t['URL_'+lang_text]+'" class="relatedlink" target="_blank">'+t['Name_'+lang_text]+'</a>';
				lists += '</li>';
				icount++;
			});
			
			lists += '</ul>';
			lists += '</div></P>'; 
			$('#extRelatedLinks').html(lists);
		} 
	}  
}




function NumOnly(e, v,w,c) {
  var keynum;
  var maxnum;
  var minnum;
  var loc;
  maxnum = '9'.charCodeAt();
  minnum = '0'.charCodeAt();
  try{
	  if (window.event) keynum = e.keyCode;
	  else keynum = e.which;
	  


		if (keynum < 32 || (keynum>=minnum && keynum <= maxnum)) {
			if (window.event) e.returnValue = true;
			
			if (keynum == 13) {
			if (v.length==0 || !isNumeric(v)) {
				if (lang == 0){
					alert("Please input a number.");
				}else if (lang == 1){ 
					alert("請輸入號碼。"); 
				}else if (lang == 2){
					alert("请输入号码。"); 
				}
		   } 
			else
			{
				  if (v <=0) v=1;
				  if (v > w) v=w;
				  if (v != c) {
					var qstring = '';
					if(parseInt(getURLParameter('theyear'), 10)){
						qstring += '&theyear='+parseInt(getURLParameter('theyear'), 10);
					}
					if(parseInt(getURLParameter('themonth'), 10)){
						qstring += '&themonth='+parseInt(getURLParameter('themonth'), 10);
					}
					//loc = window.location.href.split("?")[0] +"?page="+ v + qstring;
					loc = updateURLParameter(window.location.href,'page',v);
					window.location.path = loc;
					location.href = loc;
					//console.info(loc);
				  }
			}
			ignore_event(e);
			}
		} else {
			ignore_event(e);
		}
    }catch(err){
		
    }
}


function ignore_event(e) {
    if (window.event) e.returnValue = false;
	else e.preventDefault();
}

function getFirstChar(string){
	string = strip(string);
	return string.substr(0,1).toUpperCase();
}

function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function updateURLParameter(url, key, value) {
	var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	var separator = url.indexOf('?') !== -1 ? "&" : "?";
	if (url.match(re)) {
		return url.replace(re, '$1' + key + "=" + value + '$2');
	}
	else {
		return url + separator + key + "=" + value;
	}
}

function displayDate(date){
	//console.log(date);
	var monthNames = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	  ];
	date=date.split('-');  
	var day=parseInt(date[2], 10);
	var month=parseInt(date[1], 10);
	var year=parseInt(date[0], 10);	
	if(lang==0){
		return day+' '+monthNames[(month-1)]+' '+year;
	}else{
		return year+'年'+month+'月'+day+'日';
	}	
	/*
	var d = new Date(date);

	var year = d.getFullYear();
	var month = monthNames[d.getMonth()];
	var month_num = d.getMonth()+1;
	var day = d.getDate();
	
	if(lang==0){
		return day+' '+month+' '+year;
	}else{
		return year+'年'+month_num+'月'+day+'日';
	}
	*/
}



function my_health(){
	 
	var arr=getMenuData();
	
	$.each( arr, function(i, val){ 

		var op='';
		var cookiename='bookmarPage_'+i;

		if ($.cookie(cookiename) != null) {
			bookmarList = JSON.parse($.cookie(cookiename));
			if(bookmarList.length>0){
				op+='<div class="toggle_list1 my_list'+(i+1)+'">';
				op+=' <div class="my_title">'+val[0][lang]+'</div>';
				op+='<ul>';  

					$.each(bookmarList, function(j, item) {  
					  
						op+='<li><a href="'+item.url+'">'+item.title+'</a></li>'; 

					})	

				op+='</ul>';
				if(lang=='1'){
					op+=' <div class="moreBtn editBtn" ><a href="#" id="bookmarPage_'+i+'"  >編輯</a></div>';
				}else if(lang=='2'){
					op+=' <div class="moreBtn editBtn" ><a href="#" id="bookmarPage_'+i+'"  >编辑</a></div>';
				}else{
					op+=' <div class="moreBtn editBtn" ><a href="#" id="bookmarPage_'+i+'"  >Edit</a></div>';
				}
				op+='</div>';
			}
		}
		document.write(op);
	});	
}

function lettertodoc(){

	var lettertodoc_list =[];
	var search_year = [];
	var year = getURLParameter('lettertodocyear');
	var month = getURLParameter('lettertodocmonth');
	
	if(!month){
		month = -1;
	}
	
	$.each(lettertodoc_data.data, function(index) {
		o = $(this);
		$.each(o, function(index) {
			var t = $(this)[0]; 
			
			var publishdate_full = new Date( t['PublishDate'].substring(0, 10));
			var publishdate = getFormattedDate(publishdate_full);
			
			publishyear = publishdate_full.getFullYear();
			publishmonth = publishdate_full.getMonth()+1;
			if(search_year.indexOf(publishyear)<0){
				search_year.push(publishyear);
			}
			if(!year){
				year = search_year[0];
			}
			
			if(month == -1){
				if(publishyear == year){
					lettertodoc_list.push(t);
				}
			}
			else{
				if(publishyear == year && publishmonth == month){
					lettertodoc_list.push(t);
				}
			}
			
		}); 
	});
	
	if(search_year.length>0){
		for(i=0;i<search_year.length;i++){
			var selected = '';
			if(year==search_year[i]){
				selected = 'selected';
			}
			if(select_min_year){
				if(search_year[i]>=select_min_year){
					$('#lettertodocyear').append('<option value="'+search_year[i]+'" '+selected+'>'+search_year[i]+'</option>');
				}
			}else{
				$('#lettertodocyear').append('<option value="'+search_year[i]+'" '+selected+'>'+search_year[i]+'</option>');
			}
		}
		$('#lettertodocmonth>[value='+month+']').prop('selected','selected');		
	}else{
		var d = new Date(); 
		for(var i=d.getFullYear(); i>=dateSelectorMinYear; i--){
			var selected = '';
			if(year==i){
				selected = 'selected';
			}
			if(select_min_year){
				if(i>=select_min_year){
					$('#lettertodocyear').append('<option value="'+i+'" '+selected+'>'+i+'</option>');
				}
			}else{
				$('#lettertodocyear').append('<option value="'+i+'" '+selected+'>'+i+'</option>');
			}
		}
		$('#lettertodocmonth>[value='+month+']').prop('selected','selected');		
	}
	
	var today = new Date();
	var maxRow = 10;
		
	if(typeof lettertodoc_maxRow != 'undefined' && lettertodoc_maxRow > 0){
		maxRow = lettertodoc_maxRow;
	}
		
	var maxPage = parseInt(lettertodoc_list.length / maxRow);
	var currentPage;
	
	if(getURLParameter('page')){
		currentPage = parseInt(getURLParameter('page'));
	}else{
		currentPage = parseInt("1");
	}
	
		if(lettertodoc_list.length %maxRow !=0){
			maxPage+=1;
		}
		
	if(maxPage<currentPage){
		currentPage=maxPage;
	}
	 
	$(function() {
		
		
		var _newsContent = '<div class="commontable dataTable">';
		if(lang==0){
			_newsContent += '<table><tbody><tr class="header"> <th class="my_date"  style="width: 20%;">Date</th> <th>Subject</th>';
		}else if(lang==1){
			_newsContent += '<table><tbody><tr class="header"> <th class="my_date"  style="width: 20%;">日期</th> <th>主題</th> </tr>';
		}else if(lang==2){
			_newsContent += '<table><tbody><tr class="header"> <th class="my_date"  style="width: 20%;">日期</th> <th>主题</th> </tr>';
		}
		_newsContent += '</tr>';
		$.each(lettertodoc_list, function(index) {
	
	
			if(index<currentPage*maxRow-maxRow && currentPage!=1){
				return true;
			}
			
			if(index<=(maxRow*currentPage-1)){
				o = $(this);
			}else{
				return false;
			}
			
			$.each(o, function(index) {
				
				var t = $(this)[0];  
				
				_newsContent += '<tr>';
				  
				if(lang==0){
					_newsContent += '<td>'+displayDate(t['PublishDate'].toString().replace('/','-').replace('/','-'))+'</td>';  
					_newsContent += '<td>'+t['Title_en']+'</td>';  
				}else if(lang==1){
					_newsContent += '<td>'+displayDate(t['PublishDate'].toString().replace('/','-').replace('/','-'))+'</td>';  
					_newsContent += '<td>'+t['Title_zh_tw']+'</td>';  
				}else if(lang==2){
					_newsContent += '<td>'+displayDate(t['PublishDate'].toString().replace('/','-').replace('/','-'))+'</td>';  
					_newsContent += '<td>'+t['Title_zh_cn']+'</td>';  
				}
				
				_newsContent += '</tr>';
			  
			 		
			}); 
		 
		});
	
		_newsContent += '</tbody></table></div>'; 
		$('#events_content').html(_newsContent);	
	 
	});		

 $(function() {

	 
	if(getURLParameter('f')){
		var path = window.location.href.split("?")[0]+"?f="+getURLParameter('f')+"&page=";
	}else{
		var path = window.location.href.split("?")[0]+"?page=";
	}
				
		 var _newsContent="<div style='text-align: right'>"+
				 
				"<a href="+(updateURLParameter(window.location.href,'page',1))+">"+
				"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
				
				"<a href="+(updateURLParameter(window.location.href,'page',(parseInt(currentPage)-1)))+">"+
				"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
				
				"<label for='page'>"+pagetxt[0][lang]+":&nbsp;</label>"+
				"<input type='text' id='page' value='"+currentPage+"'  maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
				
				"&nbsp;<span class='dnstitle'>/ "+maxPage+"</span>&nbsp;"+
				
				"<a href="+(updateURLParameter(window.location.href,'page',(parseInt(currentPage)+1)))+">"+
			"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
			
				"<a href="+(updateURLParameter(window.location.href,'page',maxPage))+">"+
			"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";

				"</div>";
				
				 var _newsContent2="<div style='text-align: right'>"+
				 
				"<a href="+(updateURLParameter(window.location.href,'page',1))+">"+
				"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
				
				"<a href="+(updateURLParameter(window.location.href,'page',(parseInt(currentPage)-1)))+">"+
				"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
				
				"<label for='page2'>"+pagetxt[0][lang]+":&nbsp;</label>"+
				"<input type='text' id='page2' value='"+currentPage+"'  maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
				
				"&nbsp;<span class='dnstitle'>/ "+maxPage+"</span>&nbsp;"+
				
				"<a href="+(updateURLParameter(window.location.href,'page',(parseInt(currentPage)+1)))+">"+
			"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
			
				"<a href="+(updateURLParameter(window.location.href,'page',maxPage))+">"+
			"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";

		"</div>";
		
			if(lettertodoc_data.data.length>0){		
				$("#events_content").before('<div class="pagination2">'+_newsContent+'</div><BR/>');  
				$('#pagination').html(_newsContent2);
			}	
			
				
			if(currentPage == 1){
				$('.fristPage').css('display','none');
				$('.prevPage').css('display','none'); 
			}else{
				$('.fristPage').css('display','');
				$('.prevPage').css('display',''); 
			}
			
			if(currentPage == maxPage){
				$('.nextPage').css('display','none');
				$('.lastPage').css('display','none'); 
			}else{
				$('.nextPage').css('display','');
				$('.lastPage').css('display',''); 
			}
			  
		
    });
	
}

function letter2ins(letter2ins_list){
	
	var letter2ins_list =[];
	var search_year = [];
	var year = getURLParameter('letter2insyear');
	var month = getURLParameter('letter2insmonth');
	
	if(!month){
		month = -1;
	}
	
	$.each(letter2ins_data.data, function(index) {
		o = $(this);
		$.each(o, function(index) {
			var t = $(this)[0];
			var publishdate_full = new Date( t['PublishDate'].substring(0, 10));
			var publishdate = getFormattedDate(publishdate_full);
			
			publishyear = publishdate_full.getFullYear();
			publishmonth = publishdate_full.getMonth()+1;
			if(search_year.indexOf(publishyear)<0){
				search_year.push(publishyear);
			}
			if(!year){
				year = search_year[0];
			}
			
			if(month == -1){
				if(publishyear == year){
					letter2ins_list.push(t);
				}
			}
			else{
				if(publishyear == year && publishmonth == month){
					letter2ins_list.push(t);
				}
			}
			
		}); 
	});
	
	if(search_year.length>0){
		for(i=0;i<search_year.length;i++){
			var selected = '';
			if(year==search_year[i]){
				selected = 'selected';
			}
			if(select_min_year){
				if(search_year[i]>=select_min_year){
					$('#letter2insyear').append('<option value="'+search_year[i]+'" '+selected+'>'+search_year[i]+'</option>');
				}
			}else{
				$('#letter2insyear').append('<option value="'+search_year[i]+'" '+selected+'>'+search_year[i]+'</option>');
			}
		}
		$('#letter2insmonth>[value='+month+']').prop('selected','selected');		
	}else{
		var d = new Date(); 
		for(var i=d.getFullYear(); i>=dateSelectorMinYear; i--){
			var selected = '';
			if(year==i){
				selected = 'selected';
			}
			if(select_min_year){
				if(i>=select_min_year){
					$('#letter2insyear').append('<option value="'+i+'" '+selected+'>'+i+'</option>');
				}
			}else{
				$('#letter2insyear').append('<option value="'+i+'" '+selected+'>'+i+'</option>');
			}
		}
		$('#letter2insmonth>[value='+month+']').prop('selected','selected');		
	}
	
	var today = new Date();
	var maxRow = 10;
		
	if(typeof letter2ins_maxRow != 'undefined' && lettertodoc_maxRow > 0){
		maxRow = letter2ins_maxRow;
	}
	
	var maxPage = parseInt(letter2ins_list.length / maxRow);
	var currentPage=1;
	
	if(getURLParameter('page'))
		currentPage=getURLParameter('page');
	
	if(letter2ins_list.length %maxRow !=0){
		maxPage+=1;
	}
	 
	$(function() {
		var year='';
		
		var arrymenu = [
			[
				['421','Kindergarten/<br>Child Care Centre/<br>Kindergarten-cum-Child Care Centre'],
				['311','School'],
				['312','Elderly Home '],
				['422','Disabled Home'],
				['423','Hospital']
			],
			[
				['421','幼稚園/幼兒中心/<BR/>幼稚園暨幼兒中心'],
				['311','學校'],
				['312','安老<BR/>院舍'],
				['422','殘疾人士<BR/>院舍'],
				['423','醫院']
			]	,
			[
				['421','幼稚园/幼儿中心/<BR/>幼稚园暨幼儿中心'],
				['311','学校'],
				['312','安老<BR/>院舍'],
				['422','残疾人士<BR/>院舍'],
				['423','医院']
			]			
		];
					
	
		var _newsContent = '<div class="commontable dataTable">';
		if(lang==0){
			_newsContent += '<table><tbody><tr class="header"> <th class="my_date" rowspan="2">Date</th> <th rowspan="2">Letter subject</th><th colspan="5" style="text-align: center !important;">Institutions</th></tr><tr class="header">';
		}else if(lang==1){
			_newsContent += '<table><tbody><tr class="header"> <th class="my_date" rowspan="2">日期</th> <th rowspan="2">信件標題</th><th colspan="5" style="text-align: center !important;">院舍</th></tr><tr class="header"> ';
		}else if(lang==2){
			_newsContent += '<table><tbody><tr class="header"> <th class="my_date" rowspan="2">日期</th> <th rowspan="2" >信件标题</th><th colspan="5" style="text-align: center !important;">院舍</th> </tr><tr class="header">' ;
		}
		
		$.each(arrymenu[lang], function( index, value1 ) { 
			_newsContent += '<th style="min-width:60px;white-space: nowrap;">'+value1[1]+'</th>';
		});
		
		  _newsContent += '</tr>';
		$.each(letter2ins_list, function(index) {
	
	
			if(index<currentPage*maxRow-maxRow && currentPage!=1){
				return true;
			}
			
			if(index<=(maxRow*currentPage-1)){
				o = $(this);
			}else{
				return false;
			}
			
			$.each(o, function(index) {
				
				var t = $(this)[0]; 
				//var infoArr = t['Title'].split("@(!)@"); 
				var publishdate_full = new Date( t['PublishDate'].substring(0, 10));
				var publishdate = getFormattedDate(publishdate_full);
				var infotitle = '';
				var infourl = '';
				var infotitle = '';
				//var infotype = infoArr[10];
				if(lang==0){
					infotitle = t['Title_en'];
					//infourl = infoArr[4];
					//infopdf = infoArr[7];
				}else if(lang==1){
					infotitle = t['Title_zh_tw'];
					//infourl = infoArr[5];
					//infopdf = infoArr[8];
				}else if(lang==2){
					infotitle = t['Title_zh_cn'];
					//infourl = infoArr[6];
					//infopdf = infoArr[9];
				}
				_newsContent += '<tr>';
				_newsContent += '<td>'+publishdate+'</td>'; 
				_newsContent += '<td>'+infotitle+'</td>'; 
				
				
				var result = t['Menu'].split(" ").join("").split(",");
				var menuid = [];
				
				//	console.log(t);
					
				$.each(result, function( index, value2 ) { 
						var result2 = value2.split(" ").join("").split("@(!)@"); 
						
						 if(lang==1){
							content = [result2[0], result2[2], result2[5], result2[7]];
						 }else if(lang==2){
							if(result2[6]==''){
								result2[6]=result2[5];
							}
							content = [result2[0], result2[3], result2[6], result2[7]];
						 }else{
							 
							content = [result2[0], result2[1], result2[4], result2[7]];
						 } 
						 
						 menuid[result2[0]]=content;
				});
				
				$.each(arrymenu[lang], function( index, value3 ) {		
					if (menuid[value3[0]]!==undefined) {
						_newsContent += '<td align="center">';
						if(menuid[value3[0]][3]==1 || menuid[value3[0]][3]==3){
							_newsContent += '<a href="'+menuid[value3[0]][2]+'" target="_blank" title="PDF"><img alt="Adobe PDF : '+infotitle+'" title="Adobe PDF : '+infotitle+'" src="/img/icon/pdf.gif" border="0"></a>';
						}
						//if(menuid[value3[0]][3]==2 || menuid[value3[0]][3]==3){
						//	_newsContent += '<a href="'+menuid[value3[0]][1]+'" target="_blank" title="PDF"><img alt="" title="PDF" src="/img/icon/pdf.gif" border="0"></a>';
						//}				
 						if(menuid[value3[0]][3]==2){
							_newsContent += '<a href="/'+langtxt+'/wapdf/'+t['InfoBlockID']+'.html"  >'+infotitle+'</a>';
						} 
						
 						if(menuid[value3[0]][3]==4){
							if(t['UrlTarget']=='1'){
								_newsContent += '<a href="'+menuid[value3[0]][1]+'" target="_blank"  >'+infotitle+'</a>';
							}else{
								_newsContent += '<a href="'+menuid[value3[0]][1]+'"  >'+infotitle+'</a>';
							}
						}   
						_newsContent += '</td>';
					}else{
						_newsContent += '<td></td>'; 
					}
				});
				
				_newsContent += '</tr>';
				
				last_revision_date_object = compare_last_revision_date(t.PublishDate);
				check_wa = compare_check_wa(t.CheckWA);
			  
			 		
			}); 
		 
		});
	
		_newsContent += '</tbody></table></div>'; 
		$('#events_content').html(_newsContent);	
		
		//update last_revision_date
		if(last_revision_date_object)
			update_last_revision_date();
		
		//update w3cIcon
		$('.copyrightBar').replaceWith(w3cIcon());
	 
	});		

	$(function() {
 
		var path  = getPageUrl();	
		var _newsContent="<div style='text-align: right'>"+
				 
				"<a href="+(updateURLParameter(window.location.href,'page',1))+">"+
				"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
				
				"<a href="+(updateURLParameter(window.location.href,'page',(parseInt(currentPage)-1)))+">"+
				"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
				
				"<label for='page'>"+pagetxt[0][lang]+":&nbsp;</label>"+
				"<input type='text' id='page' value='"+currentPage+"'  maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
				
				"&nbsp;<span class='dnstitle'>/ "+maxPage+"</span>&nbsp;"+
				
				"<a href="+(updateURLParameter(window.location.href,'page',(parseInt(currentPage)+1)))+">"+
			"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
			
				"<a href="+(updateURLParameter(window.location.href,'page',maxPage))+">"+
			"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";

				"</div>";
				
				 var _newsContent2="<div style='text-align: right'>"+
				 
				"<a href="+(updateURLParameter(window.location.href,'page',1))+">"+
				"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
				
				"<a href="+(updateURLParameter(window.location.href,'page',(parseInt(currentPage)-1)))+">"+
				"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
				
				"<label for='page2'>"+pagetxt[0][lang]+":&nbsp;</label>"+
				"<input type='text' id='page2' value='"+currentPage+"'  maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
				
				"&nbsp;<span class='dnstitle'>/ "+maxPage+"</span>&nbsp;"+
				
				"<a href="+(updateURLParameter(window.location.href,'page',(parseInt(currentPage)+1)))+">"+
			"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
			
				"<a href="+(updateURLParameter(window.location.href,'page',maxPage))+">"+
			"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";

		"</div>";
		
 
				

		if(letter2ins_data.data.length>0){	

			$("#events_content").before('<div class="pagination2">'+_newsContent+'</div><BR/>'); 	
			$('#pagination').html(_newsContent2);
		}			  
	 
	 
		if(currentPage == 1){
			$('.fristPage').css('display','none');
			$('.prevPage').css('display','none'); 
		}else{
			$('.fristPage').css('display','');
			$('.prevPage').css('display',''); 
		}
		
		if(currentPage == maxPage){
			$('.nextPage').css('display','none');
			$('.lastPage').css('display','none'); 
		}else{
			$('.nextPage').css('display','');
			$('.lastPage').css('display',''); 
		}
			
		
    });
	
}

function video(){

var show_date_menuid = ['597'];
	
if(typeof videos !== "undefined"){
	
	var transcript_text = ['Transcript','文字稿','文字稿'];

	var menuid = getMenuIdFromUrl();
	if(!menuid){
		var menuid = getURLParameter('menuid');
	}
	var year = parseInt(getURLParameter('theyear'), 10);
	if(!year){
		year = -1;
	}
 
	init_video_title(menuid);
	
	var filtered_video_data = filterByProperty(videos.data,"VideoCategoryID",menuid);
	
	last_revision_date_object = getMaxDate(filtered_video_data,'PublishDate');
	
	if(year!=-1){
		filtered_video_data = filterByPublishDate(filtered_video_data,year);
	}
	
	var today = new Date();
	var maxRow = 10;
	
	if(typeof video_maxRow != 'undefined' && video_maxRow > 0){
		maxRow = video_maxRow;
	}
	
	var maxPage = parseInt(filtered_video_data.length / maxRow);
	var currentPage;
	
	if(!getURLParameter('page')){
		currentPage = parseInt("1");
	}else{
		currentPage = parseInt(getURLParameter('page'));
	}
	
	if(filtered_video_data.length %maxRow !=0){
		maxPage+=1;
	}
	 
	$(function() {
		var _newsContent = '<div class="index_area2_1_3"><div class="cont_area video_cont_area">';
		
		$.each(filtered_video_data, function(index) {
	
			if(index<currentPage*maxRow-maxRow && currentPage!=1){
				return true;
			}
			
			if(index<=(maxRow*currentPage-1)){
				o = $(this);
			}else{
				return false;
			}
			
			$.each(o, function(index) {
				
				var t = $(this)[0];
				
				//var publish_year = parseInt(t.PublishDate.split('-')[0], 10);
				
				//if(menuid==t.VideoCategoryID){
					//if(year==publish_year || year==-1){
						_newsContent += '<ul><li>';
						_newsContent += '<div class="logo"><img src="'+t['Thumbnail_'+lang_text]+'" alt="'+t['alttext_'+lang_text]+'" title="'+t['alttext_'+lang_text]+'" class="video_thumbnail" onerror="this.src=\'/images/logo_chp.png\'"></div> ';
						_newsContent += '<div class="title"><a href="'+t['URL_'+lang_text]+'" ';
						if(t.URLTarget==1){ _newsContent += ' target="_blank" '; }
						_newsContent += '>'+t['Name_'+lang_text]+'</a> ';
						
						if(t['Transcript_'+lang_text]){
							_newsContent += '<br><ul class="ul_video_transcript"><li><a href="'+t['Transcript_'+lang_text]+'" target="_blank">'+transcript_text[lang]+'</a></li></ul>'; 
						}
						
						_newsContent += '</div>';
						
						if(t.PublishDate && $.inArray(menuid,show_date_menuid)!=-1){
							_newsContent += '<div class="date">'+displayDate(t.PublishDate)+'</div>'; 
						}
						
						_newsContent += '</li></ul>';
						
						check_wa = compare_check_wa(t['CheckWA']);
					//}
				//}
			  
			 		
			}); 
		 
		});
		
		_newsContent += '</div>';
		
		if(filtered_video_data.length==0){
			_newsContent += 'No Record Found!';
		}
		
		_newsContent += '</div>';
		
		$('#videos_content').html(_newsContent);	
		
		if($.inArray(menuid,show_date_menuid)==-1){
			$('.dateSelector').remove();
		}
		
		update_last_revision_date();
			
		//update w3cIcon
		$('.copyrightBar').replaceWith(w3cIcon());
	 
	});		

	if(filtered_video_data.length>0){
		$(function() {

		if(getURLParameter('f')){
			var path = window.location.href.split("?")[0]+"?f="+getURLParameter('f')+"&theyear="+year+"&page=";
		}else{
			var path = window.location.href.split("?")[0]+"?theyear="+year+"&page=";
		}
					
		var _newsContent="<div style='text-align: right'>"+
		"<a href="+(path+1)+">"+
		"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
		"<a href="+(path+(parseInt(currentPage)-1))+">"+
		"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
		"<label for='page'>"+pagetxt[0][lang]+":&nbsp;</label>"+
		"<input type='text' id='page' value='"+currentPage+"' class='page' maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
		"&nbsp;<span class='dnstitle'>/ "+maxPage+"</span>&nbsp;"+
		"<a href="+(path+(parseInt(currentPage)+1))+">"+
		"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
		"<a href="+(path+maxPage)+">"+
		"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";
		"</div>";
		
		var _newsContent2="<div style='text-align: right'>"+
		"<a href="+(path+1)+">"+
		"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
		"<a href="+(path+(parseInt(currentPage)-1))+">"+
		"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
		"<label for='page2'>"+pagetxt[0][lang]+":&nbsp;</label>"+
		"<input type='text' id='page2' value='"+currentPage+"' class='page' maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
		"&nbsp;<span class='dnstitle'>/ "+maxPage+"</span>&nbsp;"+
		"<a href="+(path+(parseInt(currentPage)+1))+">"+
		"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
		"<a href="+(path+maxPage)+">"+
		"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";
		"</div>";
			
				
		if(videos.data.length>0){		 
			$("#videos_content").before('<div class="pagination2">'+_newsContent+'</div><BR/>'); 
			$('#pagination').html(_newsContent2);
		}			 
		 
		 
			
		if(currentPage == 1){
			$('.fristPage').css('display','none');
			$('.prevPage').css('display','none'); 
		}else{
			$('.fristPage').css('display','');
			$('.prevPage').css('display',''); 
		}
		
		if(currentPage == maxPage){
			$('.nextPage').css('display','none');
			$('.lastPage').css('display','none'); 
		}else{
			$('.nextPage').css('display','');
			$('.lastPage').css('display',''); 
		}

			
		});
	}
	
}
}

function init_video_title(menuid){
	
	var video_title_array = [];
	//video_title_array[429] = ['TV Announcement','電視宣傳短片','电视宣传短片'];
	video_title_array[10033] = ['TV Announcement - Communicable Diseases','電視宣傳短片 - 傳染病','电视宣传短片 - 传染病'];
	video_title_array[10034] = ['TV Announcement - Non communicable diseases','電視宣傳短片 - 非傳染病','电视宣传短片 - 非传染病'];
	video_title_array[597] = ['News Videos','新聞短片','新闻短片'];
	video_title_array[650] = ['Video','短片','短片'];
	
	if(video_title_array[menuid][lang]){
		$('.contHeader').text(video_title_array[menuid][lang]);
	}
	
}

function miniweb_pressrelease(){
	
	
	select_min_year = 99999;
	select_max_year = -1;
	temp = $.grep(press_data.data, function(element, index){ 
		element_year = element.YearMonCat.toUpperCase().substr(0,4);
		if(select_min_year>element_year){
			select_min_year = element_year;
		} 
		if(select_max_year<element_year){
			select_max_year = element_year;
		} 
	});
	
	 
	
	var yearmoncat = 0;

	var today = new Date();

	var today_year = today.getFullYear();
	var year = parseInt(getURLParameter('theyear'), 10);
	if(!year){
		if(select_max_year){
			year = new Date(select_max_year).getFullYear();
		}else{
			year = new Date().getFullYear();
		}
		
	}
	var month = parseInt(getURLParameter('themonth'), 10);
	if(!month){
		month = -1;
	}else{
		month=month.toString().padStart(2, '0');
	}
	if(month!=-1){
		yearmoncat=year+month;
	}else{
		yearmoncat=year;
	}
	
	if(select_min_year==99999){
		select_min_year = today_year;
	}
	if(select_max_year==-1){
		select_max_year = today_year;
	}
	
	press_data.data = $.grep(press_data.data, function(element, index){ 
			return element.YearMonCat.toUpperCase().indexOf(yearmoncat) >= 0; 
	});

 //console.log(press_data.data);
	var today = new Date();
	var maxRow = 10;
	
	if(typeof miniweb_pressrelease_maxRow != 'undefined' && miniweb_pressrelease_maxRow > 0){
		maxRow = miniweb_pressrelease_maxRow;
	}
	
	var maxPage = parseInt(press_data.data.length / maxRow);
	var currentPage;
	
	if(getURLParameter('page')){
		currentPage = parseInt(getURLParameter('page'));
	}else{
		currentPage = parseInt("1");
	}
	
	if(press_data.data.length %maxRow !=0){
		maxPage+=1;
	}
	 
	$(function() {
		var _newsContent = '<div class="commontable dataTable">';
		if(lang==0){
			_newsContent += '<table><tbody><tr class="header"> <th class="my_date" style="width:180px">Date</th> <th>Press releases</th> </tr>';
		}else if(lang==1){
			_newsContent += '<table><tbody><tr class="header"> <th class="my_date" style="width:160px">日期</th> <th>新聞稿</th> </tr>';
		}else if(lang==2){
			_newsContent += '<table><tbody><tr class="header"> <th class="my_date" style="width:160px">日期</th> <th>新闻稿</th> </tr>';
		}
		
		
		last_revision_date_object = getMaxDate(press_data.data,'PublishDate');
		check_wa = compare_all_check_wa(press_data.data);
		
		$.each(press_data.data, function(index) {
	
	
			if(index<currentPage*maxRow-maxRow && currentPage!=1){
				return true;
			}
			
			if(index<=(maxRow*currentPage-1)){
				o = $(this);
			}else{
				return false;
			}
			
			$.each(o, function(index) {
					var t = $(this)[0];
										
					_newsContent += '<tr>';
					_newsContent += '<td class="my_date">'+displayDate(t.PublishDate)+'</td>';
					if (t['Content_type']!==undefined && t['Content_type']!=='' ) { 
						if(t['UrlPath_'+lang_text] !='' && t['Content_type']=='url'  ){
							_newsContent += '<td class="my_data"><a href="'+t['UrlPath_'+lang_text]+'" ';
							if(t.UrlTarget==1){ _newsContent += ' target="_blank"'; }
							_newsContent += '>'+t['Title_'+lang_text]+'</a></td>'; 
						}
						else if(t['FilePath_'+lang_text] !=''  && t['Content_type']=='pdf' ){
							_newsContent += '<td class="my_data"><a href="'+t['FilePath_'+lang_text]+'" target="_blank">'+t['Title_'+lang_text]+'</a></td>'; 
						}
						else{
							_newsContent += '<td class="my_data"><a href="../../media/116/'+t.InfoBlockID+'.html" >'+t['Title_'+lang_text]+'</a></td>'; 
						} 
					}else{
						if(t['UrlPath_'+lang_text]){
							_newsContent += '<td class="my_data"><a href="'+t['UrlPath_'+lang_text]+'" ';
							if(t.UrlTarget==1){ _newsContent += ' target="_blank"'; }
							_newsContent += '>'+t['Title_'+lang_text]+'</a></td>'; 
						}
						else if(t['FilePath_'+lang_text]){
							_newsContent += '<td class="my_data"><a href="'+t['FilePath_'+lang_text]+'" target="_blank">'+t['Title_'+lang_text]+'</a></td>'; 
						}
						else{
							_newsContent += '<td class="my_data"><a href="../../media/116/'+t.InfoBlockID+'.html" >'+t['Title_'+lang_text]+'</a></td>'; 
						}
					}
					
					_newsContent += '</tr>';
					 

					
			}); 
		 
		});
		if(press_data.data.length==0){		 
				_newsContent += '<tr>';
			if(lang==0){
				_newsContent += '<td class="my_date" colspan="2">No record found in this month.</td>'; 
			}else if(lang==1){
				_newsContent += '<td class="my_date" colspan="2">本月沒有任何相關記錄。</td>'; 
			}else if(lang==2){
				_newsContent += '<td class="my_date" colspan="2">本月没有任何相关记录。</td>'; 
			}
				_newsContent += '</tr>';
				
				
		}
		_newsContent += '</tbody></table></div>'; 
		$('#events_content').html(_newsContent);	
		
		//update last_revision_date
		if(last_revision_date_object){
			update_last_revision_date();
		}
		//update w3cIcon
		$('.copyrightBar').replaceWith(w3cIcon());
		
	});

	 $(function() {

		 
		 //var path = window.location.href.split("?")[0]+"?page=";
					
			 var _newsContent="<div style='text-align: right'>"+
			 
			"<a href="+(updateURLParameter(window.location.href,'page',1))+">"+
			"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
			
			"<a href="+(updateURLParameter(window.location.href,'page',(parseInt(currentPage)-1)))+">"+
			"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
			
			"<label for='page'>"+pagetxt[0][lang]+":&nbsp;</label>"+
			"<input type='text' id='page' value='"+currentPage+"'  class='page' maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
			
			"&nbsp;<span class='dnstitle'>/ "+maxPage+"</span>&nbsp;"+
			
			"<a href="+(updateURLParameter(window.location.href,'page',(parseInt(currentPage)+1)))+">"+
		"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
		
			"<a href="+(updateURLParameter(window.location.href,'page',maxPage))+">"+
		"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";

			"</div>";
			
			 var _newsContent2="<div style='text-align: right'>"+
			 
			"<a href="+(updateURLParameter(window.location.href,'page',1))+">"+
			"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
			
			"<a href="+(updateURLParameter(window.location.href,'page',(parseInt(currentPage)-1)))+">"+
			"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
			
			"<label for='page2'>"+pagetxt[0][lang]+":&nbsp;</label>"+
			"<input type='text' id='page2' value='"+currentPage+"'  class='page' maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
			
			"&nbsp;<span class='dnstitle'>/ "+maxPage+"</span>&nbsp;"+
			
			"<a href="+(updateURLParameter(window.location.href,'page',(parseInt(currentPage)+1)))+">"+
		"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
		
			"<a href="+(updateURLParameter(window.location.href,'page',maxPage))+">"+
		"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";

			"</div>";
			
		if(press_data.data.length>0){		
			$("#events_content").before('<div class="pagination2">'+_newsContent+'</div><BR/>'); 	
			$('#pagination').html(_newsContent2);
		}
		
		if(currentPage == 1){
			$('.fristPage').css('display','none');
			$('.prevPage').css('display','none'); 
		}else{
			$('.fristPage').css('display','');
			$('.prevPage').css('display',''); 
		}
		
		if(currentPage == maxPage){
			$('.nextPage').css('display','none');
			$('.lastPage').css('display','none'); 
		}else{
			$('.nextPage').css('display','');
			$('.lastPage').css('display',''); 
		}
			
	});
	   
	
}


function miniweb_lettertodoc(){
	
	if(lettertodoc_data.data.length>0)
		createDateSelector('lettertodoc');
	

	var lettertodoc_list =[];
	var search_year = [];
	var year = getURLParameter('lettertodocyear');
	var month = getURLParameter('lettertodocmonth');
	
	if(!month){
		month = -1;
	}
	
	$.each(lettertodoc_data.data, function(index) {
		o = $(this);
		$.each(o, function(index) {
			var t = $(this)[0];
			var publishdate_full = new Date( t['PublishDate'].substring(0, 10));
			var publishdate = getFormattedDate(publishdate_full);
			
			publishyear = publishdate_full.getFullYear();
			publishmonth = publishdate_full.getMonth()+1;
			if(search_year.indexOf(publishyear)<0){
				search_year.push(publishyear);
			}
			if(!year){
				year = search_year[0];
			}
			
			if(month == -1){
				if(publishyear == year){
					lettertodoc_list.push(t);
				}
			}
			else{
				if(publishyear == year && publishmonth == month){
					lettertodoc_list.push(t);
				}
			}
			
		}); 
	});
	
	if(search_year.length>0){
		for(i=0;i<search_year.length;i++){
			var selected = '';
			if(year==search_year[i]){
				selected = 'selected';
			}
			if(select_min_year){
				if(search_year[i]>=select_min_year){
					$('#lettertodocyear').append('<option value="'+search_year[i]+'" '+selected+'>'+search_year[i]+'</option>');
				}
			}else{
				$('#lettertodocyear').append('<option value="'+search_year[i]+'" '+selected+'>'+search_year[i]+'</option>');
			}
		}
		$('#lettertodocmonth>[value='+month+']').prop('selected','selected');		
	}else{
		var d = new Date(); 
		for(var i=d.getFullYear(); i>=dateSelectorMinYear; i--){
			var selected = '';
			if(year==i){
				selected = 'selected';
			}
			if(select_min_year){
				if(i>=select_min_year){
					$('#lettertodocyear').append('<option value="'+i+'" '+selected+'>'+i+'</option>');
				}
			}else{
				$('#lettertodocyear').append('<option value="'+i+'" '+selected+'>'+i+'</option>');
			}
		}
		$('#lettertodocmonth>[value='+month+']').prop('selected','selected');		
	}
	
	
	var today = new Date();
	var maxRow = 10;
	
	if(typeof miniweb_lettertodoc_maxRow != 'undefined' && miniweb_lettertodoc_maxRow > 0){
		maxRow = miniweb_lettertodoc_maxRow;
	}
 
	var maxPage = parseInt(lettertodoc_list.length / maxRow);
	var currentPage;
	
	if(getURLParameter('page')){
		currentPage = parseInt(getURLParameter('page'));
	}else{
		currentPage = parseInt("1");
	}
	
		if(lettertodoc_list.length %maxRow !=0){
			maxPage+=1;
		}
	 
	$(function() {
		
		
		var _newsContent = '<div class="commontable dataTable">';
		if(lang==0){
			_newsContent += '<table><tbody><tr class="header"> <th class="my_date" style="width:200px;">Date</th> <th>Subject</th>';
		}else if(lang==1){
			_newsContent += '<table><tbody><tr class="header"> <th class="my_date" style="width:200px;">日期</th> <th>主題</th> </tr>';
		}else if(lang==2){
			_newsContent += '<table><tbody><tr class="header"> <th class="my_date" style="width:200px;">日期</th> <th>主题</th> </tr>';
		}
		_newsContent += '</tr>';
	
		if(lettertodoc_list.length==0){		
			if(lang==0){
				_newsContent += '<td class="my_date" colspan="2">No record found.</td>'; 
			}else if(lang==1){ 
				_newsContent += '<tr>';
				_newsContent += '<td class="my_date" colspan="2">沒有任何相關記錄。</td>'; 
				_newsContent += '</tr>';
			}else if(lang==2){
				_newsContent += '<tr>';
				_newsContent += '<td class="my_date" colspan="2">沒有任何相關記錄。</td>'; 
				_newsContent += '</tr>';
			}
		}
		
		last_revision_date_object = getMaxDate(lettertodoc_list,'PublishDate');
		check_wa = compare_all_check_wa(lettertodoc_list);
			
		$.each(lettertodoc_list, function(index) {
	
			if(index<currentPage*maxRow-maxRow && currentPage!=1){
				return true;
			}
			
			if(index<=(maxRow*currentPage-1)){
				o = $(this);
			}else{
				return false;
			}
			
			$.each(o, function(index) {
				
				var t = $(this)[0];  
				
				_newsContent += '<tr>'; 

				if(lang==0){
					_newsContent += '<td>'+displayDate(t['PublishDate'].toString().replace('/','-').replace('/','-'))+'</td>';  
					_newsContent += '<td>'+t['Title_en']+'</td>';  
				}else if(lang==1){
					_newsContent += '<td>'+displayDate(t['PublishDate'].toString().replace('/','-').replace('/','-'))+'</td>';  
					_newsContent += '<td>'+t['Title_zh_tw']+'</td>';  
				}else if(lang==2){
					_newsContent += '<td>'+displayDate(t['PublishDate'].toString().replace('/','-').replace('/','-'))+'</td>';  
					_newsContent += '<td>'+t['Title_zh_cn']+'</td>';  
				}
				_newsContent += '</tr>';
				
			  
			 		
			}); 
		 
		});
	
		_newsContent += '</tbody></table></div>'; 
		$('#events_content').html(_newsContent);

		//update last_revision_date
		if(last_revision_date_object)
			update_last_revision_date();
		
		//update w3cIcon
		$('.copyrightBar').replaceWith(w3cIcon());		
	 
	});		

 $(function() {
 
		var path =getPageUrl();		
		var _newsContent="<div style='text-align: right'>"+
		 
		"<a href="+(path+1)+">"+
		"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
		
		"<a href="+(path+(parseInt(currentPage)-1))+">"+
		"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
		
    	"<label for='page'>"+pagetxt[0][lang]+":&nbsp;</label>"+
	    "<input type='text' id='page' value='"+currentPage+"'  class='page' maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
		
		"&nbsp;<span class='dnstitle'>/ "+maxPage+"</span>&nbsp;"+
		
		"<a href="+(path+(parseInt(currentPage)+1))+">"+
	"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
	
		"<a href="+(path+maxPage)+">"+
	"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";

		"</div>";
		
		 var _newsContent2="<div style='text-align: right'>"+
		 
		"<a href="+(path+1)+">"+
		"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
		
		"<a href="+(path+(parseInt(currentPage)-1))+">"+
		"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
		
    	"<label for='page2'>"+pagetxt[0][lang]+":&nbsp;</label>"+
	    "<input type='text' id='page2' value='"+currentPage+"'  class='page' maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
		
		"&nbsp;<span class='dnstitle'>/ "+maxPage+"</span>&nbsp;"+
		
		"<a href="+(path+(parseInt(currentPage)+1))+">"+
	"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
	
		"<a href="+(path+maxPage)+">"+
	"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";

		"</div>";
		

		if(lettertodoc_data.data.length>0){		 
			$("#events_content").before('<div class="pagination2">'+_newsContent+'</div><BR/>'); 	
			$('#pagination').html(_newsContent2);
		}		 


		if(currentPage == 1){
			$('.fristPage').css('display','none');
			$('.prevPage').css('display','none'); 
		}else{
			$('.fristPage').css('display','');
			$('.prevPage').css('display',''); 
		}

		if(currentPage == maxPage){
			$('.nextPage').css('display','none');
			$('.lastPage').css('display','none'); 
		}else{
			$('.nextPage').css('display','');
			$('.lastPage').css('display',''); 
		}

		
    });
	
}

function miniweb_letter2ins(){
	
	if(letter2ins_data.data.length>0)
		createDateSelector('letter2ins');
	
	var letter2ins_list =[];
	var search_year = [];
	var year = getURLParameter('letter2insyear');
	var month = getURLParameter('letter2insmonth');
	
	if(!month){
		month = -1;
	}
	
	$.each(letter2ins_data.data, function(index) {
		o = $(this);
		$.each(o, function(index) {
			var t = $(this)[0];
			var publishdate_full = new Date( t['PublishDate'].substring(0, 10));
			var publishdate = getFormattedDate(publishdate_full);
			
			publishyear = publishdate_full.getFullYear();
			publishmonth = publishdate_full.getMonth()+1;
			if(search_year.indexOf(publishyear)<0){
				search_year.push(publishyear);
			}
			if(!year){
				year = search_year[0];
			}
			
			if(month == -1){
				if(publishyear == year){
					letter2ins_list.push(t);
				}
			}
			else{
				if(publishyear == year && publishmonth == month){
					letter2ins_list.push(t);
				}
			}
			
		}); 
	});
	
	if(search_year.length>0){
		for(i=0;i<search_year.length;i++){
			var selected = '';
			if(year==search_year[i]){
				selected = 'selected';
			}
			if(select_min_year){
				if(search_year[i]>=select_min_year){
					$('#letter2insyear').append('<option value="'+search_year[i]+'" '+selected+'>'+search_year[i]+'</option>');
				}
			}else{
				$('#letter2insyear').append('<option value="'+search_year[i]+'" '+selected+'>'+search_year[i]+'</option>');
			}
		}
		$('#letter2insmonth>[value='+month+']').prop('selected','selected');		
	}else{
		var d = new Date(); 
		for(var i=d.getFullYear(); i>=dateSelectorMinYear; i--){
			var selected = '';
			if(year==i){
				selected = 'selected';
			}
			if(select_min_year){
				if(i>=select_min_year){
					$('#letter2insyear').append('<option value="'+i+'" '+selected+'>'+i+'</option>');
				}
			}else{
				$('#letter2insyear').append('<option value="'+i+'" '+selected+'>'+i+'</option>');
			}
		}
		$('#letter2insmonth>[value='+month+']').prop('selected','selected');		
	}
			
	
	
	
	var today = new Date();
	var maxRow = 5;
	
	if(typeof miniweb_letter2ins_maxRow != 'undefined' && miniweb_letter2ins_maxRow > 0){
		maxRow = miniweb_letter2ins_maxRow;
	}
 
	var maxPage = parseInt(letter2ins_list.length / maxRow);
	var currentPage;
	
	if(getURLParameter('page')){
		currentPage = parseInt(getURLParameter('page'));
	}else{
		currentPage = parseInt("1");
	}
	
		if(letter2ins_list.length %maxRow !=0){
			maxPage+=1;
		}
	 
	$(function() {
		var year='';
		var arrymenu = [
			[
				['421','Kindergarten/<br>Child Care Centre/<br>Kindergarten-cum-Child Care Centre'],
				['311','School'],
				['312','Elderly Home '],
				['422','Disabled Home'],
				['423','Hospital']
			],
			[
				['421','幼稚園/幼兒中心/<BR/>幼稚園暨幼兒中心'],
				['311','學校'],
				['312','安老<BR/>院舍'],
				['422','殘疾人士<BR/>院舍'],
				['423','醫院']
			]	,
			[
				['421','幼稚园/幼儿中心/<BR/>幼稚园暨幼儿中心'],
				['311','学校'],
				['312','安老<BR/>院舍'],
				['422','残疾人士<BR/>院舍'],
				['423','医院']
			]			
		];
		var _newsContent = '<div class="commontable dataTable">';
		if(lang==0){
			_newsContent += '<table><tbody><tr class="header"> <th class="my_date" rowspan="2">Date</th> <th rowspan="2">Letter subject</th><th colspan="5" style="text-align: center !important;">Institutions</th></tr><tr class="header">';
		}else if(lang==1){
			_newsContent += '<table><tbody><tr class="header"> <th class="my_date" rowspan="2">日期</th> <th rowspan="2" >信件標題</th><th colspan="5" style="text-align: center !important;">院舍</th></tr><tr class="header"> ';
		}else if(lang==2){
			_newsContent += '<table><tbody><tr class="header"> <th class="my_date" rowspan="2">日期</th> <th rowspan="2" >信件标题</th><th colspan="5" style="text-align: center !important;">院舍</th> </tr><tr class="header">' ;
		}

		$.each(arrymenu[lang], function( index, value1 ) {
		  _newsContent += '<th style="min-width:60px;white-space: nowrap;">'+value1[1]+'</th>';
		});
		
		  _newsContent += '</tr>';
		  
	
		if(letter2ins_list.length==0){		
			if(lang==0){
				_newsContent += '<td colspan="7">No record found.</td>'; 
			}else if(lang==1){ 
				_newsContent += '<tr>';
				_newsContent += '<td  colspan="7">沒有任何相關記錄。</td>'; 
				_newsContent += '</tr>';
			}else if(lang==2){
				_newsContent += '<tr>';
				_newsContent += '<td colspan="7">沒有任何相關記錄。</td>'; 
				_newsContent += '</tr>';
			}
		}
		
		last_revision_date_object = getMaxDate(letter2ins_list,'PublishDate');
		check_wa = compare_all_check_wa(letter2ins_list);
		
		$.each(letter2ins_list, function(index) {
	
	
			if(index<currentPage*maxRow-maxRow && currentPage!=1){
				return true;
			}
			
			if(index<=(maxRow*currentPage-1)){
				o = $(this);
			}else{
				return false;
			}
			
			$.each(o, function(index) {
				
				var t = $(this)[0]; 
				//var infoArr = t['Title'].split("@(!)@"); 

				var publishdate_full = new Date( t['PublishDate'].substring(0, 10));
				var publishdate = getFormattedDate(publishdate_full);

				var infotitle = '';
				var infourl = '';
				var infotitle = '';
				//var infotype = infoArr[10];
				if(lang==0){
					infotitle = t['Title_en'];
					//infourl = infoArr[4];
					//infopdf = infoArr[7];
				}else if(lang==1){
					infotitle = t['Title_zh_tw'];
					//infourl = infoArr[5];
					//infopdf = infoArr[8];
				}else if(lang==2){
					infotitle = t['Title_zh_cn'];
					//infourl = infoArr[6];
					//infopdf = infoArr[9];
				}
				_newsContent += '<tr>';
				_newsContent += '<td>'+publishdate+'</td>'; 
				_newsContent += '<td>'+infotitle+'</td>'; 
				
				
				var result = t['Menu'].split(" ").join("").split(",");
				var menuid = [];

				$.each(result, function( index, value2 ) { 
						var result2 = value2.split(" ").join("").split("@(!)@"); 
						//content = [result2[0], result2[1], result2[4], result2[7]];
						 if(lang==1){
							content = [result2[0], result2[2], result2[5], result2[7]];
						 }else if(lang==2){
							if(result2[6]==''){
								result2[6]=result2[5];
							}
							content = [result2[0], result2[3], result2[6], result2[7]];
						 }else{
							 
							content = [result2[0], result2[1], result2[4], result2[7]];
						 } 						
						
						
						menuid[result2[0]]=content;
				});
				
				$.each(arrymenu[lang], function( index, value3 ) { 
					if (menuid[value3[0]]!==undefined) {
						_newsContent += '<td align="center">';
						if(menuid[value3[0]][3]==1 || menuid[value3[0]][3]==3){
							_newsContent += '<a href="'+menuid[value3[0]][2]+'" target="_blank" title="PDF"><img alt="Adobe PDF : '+infotitle+'" title="Adobe PDF : '+infotitle+'" src="/img/icon/pdf.gif" border="0"></a>';
						}
						if(menuid[value3[0]][3]==2 || menuid[value3[0]][3]==3){
							_newsContent += '<a href="'+menuid[value3[0]][1]+'" target="_blank" title="PDF"><img alt="Adobe PDF : '+infotitle+'" title="Adobe PDF : '+infotitle+'" src="/img/icon/pdf.gif" border="0"></a>';
						}
 						if(menuid[value3[0]][3]==4){
							if(t['UrlTarget']=='1'){
								_newsContent += '<a href="'+menuid[value3[0]][1]+'" target="_blank"  >'+infotitle+'</a>';
							}else{
								_newsContent += '<a href="'+menuid[value3[0]][1]+'"  >'+infotitle+'</a>';
							}
						} 						
						_newsContent += '</td>';
					}else{
						_newsContent += '<td></td>'; 
					}
				});
				
				_newsContent += '</tr>';
			  
			 		
			}); 
		 
		});
		_newsContent += '</tbody></table></div>'; 
		$('#events_content').html(_newsContent);	
		
		//update last_revision_date
		if(last_revision_date_object)
			update_last_revision_date();
		
		//update w3cIcon
		$('.copyrightBar').replaceWith(w3cIcon());
	 
	});		

 $(function() {


	var path = getPageUrl();
	
	/*if(getURLParameter('f')){
		var path = window.location.href.split("?")[0]+"?f="+getURLParameter('f')+"&page=";
	}else{
		var path = window.location.href.split("?")[0]+"?page=";
	}*/
				
		 var _newsContent="<div style='text-align: right'>"+
		 
		"<a href="+(path+1)+">"+
		"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
		
		"<a href="+(path+(parseInt(currentPage)-1))+">"+
		"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
		
    	"<label for='page'>"+pagetxt[0][lang]+":&nbsp;</label>"+
	    "<input type='text' id='page' value='"+currentPage+"' class='page' maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
		
		"&nbsp;<span class='dnstitle'>/ "+maxPage+"</span>&nbsp;"+
		
		"<a href="+(path+(parseInt(currentPage)+1))+">"+
		"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
	
		"<a href="+(path+maxPage)+">"+
		"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";

		"</div>"; 
		
		 var _newsContent2="<div style='text-align: right'>"+
		 
		"<a href="+(path+1)+">"+
		"<img class='fristPage' src='/images/first_page.gif' border='0' alt='"+pagetxt[1][lang]+"' title='"+pagetxt[1][lang]+"' ></a>&nbsp;"+
		
		"<a href="+(path+(parseInt(currentPage)-1))+">"+
		"<img class = 'prevPage' src='/images/search_prev.gif' border='0' alt='"+pagetxt[2][lang]+"' title='"+pagetxt[2][lang]+"'></a>&nbsp;"+
		
    	"<label for='page2'>"+pagetxt[0][lang]+":&nbsp;</label>"+
	    "<input type='text' id='page2' value='"+currentPage+"' class='page' maxlength='2' size='1' OnKeyPress='NumOnly(event, this.value,"+maxPage+","+currentPage+")'>"+
		
		"&nbsp;<span class='dnstitle'>/ "+maxPage+"</span>&nbsp;"+
		
		"<a href="+(path+(parseInt(currentPage)+1))+">"+
		"<img class = 'nextPage' src='/images/search_next.gif' border='0' alt='"+pagetxt[3][lang]+"' title='"+pagetxt[3][lang]+"'></a>&nbsp;"+
	
		"<a href="+(path+maxPage)+">"+
		"<img class='lastPage' src='/images/last_page.gif' border='0' alt='"+pagetxt[4][lang]+"' title='"+pagetxt[4][lang]+"'></a>";

		"</div>"; 
		
		if(letter2ins_data.data.length>0){		 
			$("#events_content").before('<div class="pagination2">'+_newsContent+'</div><BR/>'); 	
			$('#pagination').html(_newsContent2);
		}
		
		if(currentPage == 1){
			$('.fristPage').css('display','none');
			$('.prevPage').css('display','none'); 
		}else{
			$('.fristPage').css('display','');
			$('.prevPage').css('display',''); 
		}

		if(currentPage == maxPage){
			$('.nextPage').css('display','none');
			$('.lastPage').css('display','none'); 
		}else{
			$('.nextPage').css('display','');
			$('.lastPage').css('display',''); 
		}
		
    });
	
}

function faq(){
	
	if(typeof faq_data != 'undefined' && faq_data.data != null && faq_data.data != ''){
	
		$(function() {
			var _newsContent = '';
			_newsContent += '<ul>';
			
			i = 0;
				
			$.each(faq_data.data, function(index) {
				
				var o= $(this);
				
				
				$.each(o, function(index) {
					
					
					var t = $(this)[0];
					var url ='';
					
					if(t.LinkCatExt_ID==1 || t.LinkCatExt_ID==3){
						url+='<a href="'+t['FilePath_'+lang_text]+'" target="_blank">'+t['Title_'+lang_text]+'</a>';
					}
					else if(t.LinkCatExt_ID==4){
						url+='<a href="'+t['UrlPath_'+lang_text]+'" ';
						if(t.URLTarget==1){ url += ' target="_blank"'; }
						url+='>'+t['Title_'+lang_text]+'</a>';
					}
					else{
						url+=t['Title_'+lang_text];
					}
					
					
					
					if(t.LinkCatExt_ID!=4){
						url+=' (';
						if((t.LinkCatExt_ID==1 || t.LinkCatExt_ID==3)){
							url+='<img src="/img/icon/pdf.gif" alt="" title="PDF"> '+t['FileSize_'+lang_text];
						}
						
						if(t.LinkCatExt_ID==3){
							url+=' / ';
						}
						
						if(t.LinkCatExt_ID==2 || t.LinkCatExt_ID==3){
							if(langtxt=='tc'){
								url+='<img alt="" title="" src="/img/icon/html.gif"> '+'<a class="normallink" href="/'+langtxt+'/wapdf/'+t.InfoBlockID+'.html" target="_blank">無障礙版本</a>';
							}else if(langtxt=='sc'){
								url+='<img alt="" title="" src="/img/icon/html.gif"> '+'<a class="normallink" href="/'+langtxt+'/wapdf/'+t.InfoBlockID+'.html" target="_blank">无障碍版本</a>';
							}else{
								url+='<img alt="" title="" src="/img/icon/html.gif"> '+'<a class="normallink" href="/'+langtxt+'/wapdf/'+t.InfoBlockID+'.html" target="_blank">Web Accessible Version</a>';

							}
							 
							
						}
						url+=')';
					}
					
					
					
					
					_newsContent += '<li> '+url + '</li>';
					
					last_revision_date_object = compare_last_revision_date(t.PublishDate);
					check_wa = compare_check_wa(t.CheckWA);
					
					
					i++;
					 
				});
			});		
			_newsContent += '</ul>';
			
			console.log($('#faq_content'));
			$('#faq_content').html(_newsContent);
			
			//update last_revision_date
			update_last_revision_date();
			
			//update w3cIcon
			$('.copyrightBar').replaceWith(w3cIcon());
		});
	
	}
	
}















function setYearMonthOption(){
	
	  	var monthNames = [ 
				['ALL','全選','全选'] ,
				['January','1月','1月'],
				['February','2月','2月'],
				['March','3月','3月'],
				['April','4月','4月'],
				['May','5月','5月'],
				['June','6月','6月'],
				['July','7月','7月'],
				['August','8月','8月'],
				['September','9月','9月'],
				['October','10月','10月'],
				['November','11月','11月'],
				['December','12月','12月'] 
			];
		var yeartxt = ['Year','年份','年份'];
		var monthtxt = ['Month','月份','月份'];
		var submittxt = ['Submit','遞交','递交'];
	var output = '';
	output +='	<form action="">';
	output +='					<div class="page_select left dateSelector">';
	output +='							<label for="theyear">'+yeartxt[lang]+'</label>';
	output +='							<div>';
	output +='								<select name="theyear" id="theyear" class="date"></select>';
	output +='							</div>';
	output +='							<label for="themonth">'+monthtxt[lang]+'</label>';
	output +='							<div>';
	output +='								<select name="themonth" id="themonth" class="date">				 ';   
	output +='								<option value="-1">'+monthNames[0][lang]+'</option>	    ';
	output +='								<option value="01">'+monthNames[1][lang]+'</option>';
	output +='								<option value="02">'+monthNames[2][lang]+'</option>';
	output +='								<option value="03">'+monthNames[3][lang]+'</option>';
	output +='								<option value="04">'+monthNames[4][lang]+'</option>';
	output +='								<option value="05">'+monthNames[5][lang]+'</option>';
	output +='								<option value="06">'+monthNames[6][lang]+'</option>';
	output +='								<option value="07">'+monthNames[7][lang]+'</option>';
	output +='								<option value="08">'+monthNames[8][lang]+'</option>';
	output +='								<option value="09">'+monthNames[9][lang]+'</option>';
	output +='								<option value="10">'+monthNames[10][lang]+'</option>';
	output +='								<option value="11">'+monthNames[11][lang]+'</option>';
	output +='								<option value="12">'+monthNames[12][lang]+'</option>';
	output +='							</select>';
	output +='						</div>';
	output +='						<div><button id="btn_submit" class="btn_submit" type="submit" title="'+submittxt[lang]+'">'+submittxt[lang]+'</button></div>';
	output +='					</div>		';
	output +='					</form>';
	document.write(output);
}


function getMenuIdFromUrl(){
	
	
var parts = location_href.split('/');
  
return (parts[parts.length-2]);

	
	
	
}

function MM_swapImage() { //v3.0
    var i, j = 0, x, a = MM_swapImage.arguments; document.MM_sr = new Array; for (i = 0; i < (a.length - 2) ; i += 3)
        if ((x = MM_findObj(a[i])) != null) { document.MM_sr[j++] = x; if (!x.oSrc) x.oSrc = x.src; x.src = a[i + 2]; }
}

function MM_jumpMenu(targ, selObj, restore) { //v3.0
    eval(targ + ".location='" + selObj.options[selObj.selectedIndex].value + "'");
    if (restore) selObj.selectedIndex = 0;
}

function MM_openBrWindow(theURL, winName, features) { //v2.0
    window.open(theURL, winName, features);
}


function MM_swapImgRestore() { //v3.0
    var i, x, a = document.MM_sr; for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) x.src = x.oSrc;
}

function MM_preloadImages() { //v3.0
    var d = document; if (d.images) {
        if (!d.MM_p) d.MM_p = new Array();
        var i, j = d.MM_p.length, a = MM_preloadImages.arguments; for (i = 0; i < a.length; i++)
            if (a[i].indexOf("#") != 0) { d.MM_p[j] = new Image; d.MM_p[j++].src = a[i]; }
    }
}

function MM_findObj(n, d) { //v4.0
    var p, i, x; if (!d) d = document; if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document; n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all) x = d.all[n]; for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document);
    if (!x && document.getElementById) x = document.getElementById(n); return x;
}
function gen_last_revision_date(PRCatCode){
	
	var title_display_date = $('.title_display_date').text();

	if(PRCatCode){
		try {
			var miniweb_date = '';
			$.each(MiniWebDate.data, function(index) {
				var t = $(this)[0];
				if(t.PRCatCode==PRCatCode){
					miniweb_date = t.PublishDate.split(" ")[0];
				}
			}); 
			//if(new Date(miniweb_date).getTime() > new Date(publish_date).getTime()){
			if(new Date(miniweb_date).getTime() > new Date(last_revision_date.split(" ")[0]).getTime()){
				title_display_date = miniweb_date;
			}
		} catch(err) {
			 
		}		
	}
	
	if(title_display_date!=''){
			
		var month_array = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		var title_display_date = new Date(title_display_date);
		var year = title_display_date.getFullYear();
		var month = title_display_date.getMonth()+1;
		var month_str = month_array[title_display_date.getMonth()];
		var day = title_display_date.getDate();


		var title_display_date_str = '';
		if(lang==0){ 
			title_display_date_str = day+' '+month_str+' '+year; 
		}else if(lang==1){
			title_display_date_str = year+'年'+month+'月'+day+'日'; 
		}else if(lang==2){
			title_display_date_str = year+'年'+month+'月'+day+'日'; 
		}

		$('.title_display_date').empty().append(title_display_date_str);
		if(month < 10){ month = '0'+month; }
		if(day < 10){ day = '0'+day; }
		last_revision_date = year+'/'+month+'/'+day;
	}
}

function filterByProperty(array, prop, value){
    var filtered = [];
    for(var i = 0; i < array.length; i++){

        var obj = array[i];

        for(var key in obj){
            if(key == prop){
                var item = obj[key];
				if(item == value){
					filtered.push(obj)
				}
            }
        }

    }   

    return filtered;

}
function filterByPublishDate(array, value){
    var filtered = [];
    for(var i = 0; i < array.length; i++){

        var obj = array[i];
		console.log(value);
		if(parseInt(obj['PublishDate'].split('-')[0], 10) == value){
			filtered.push(obj);
		}
		
    }   

    return filtered;

}


function FAQHealthtopic(id){
	
	var _newsContent = '<ul id="local_list">';
	
	i = 0;
		
	$.each(faq_data.data, function(index) {
		
		var o= $(this);
		
		
		$.each(o, function(index) {
			var t = $(this)[0]; 
			if(t.LinkCatInt_ID == id){ 
				var url ='';
				
				if(t.LinkCatExt_ID==1 || t.LinkCatExt_ID==3){
						url+='<a href="'+t['FilePath_'+lang_text]+'" target="_blank">'+t['Title_'+lang_text]+'</a>';
					}
					else if(t.LinkCatExt_ID==4){
						url+='<a href="'+t['UrlPath_'+lang_text]+'" ';
						if(t.URLTarget==1){ url += ' target="_blank"'; }
						url+='>'+t['Title_'+lang_text]+'</a>';
					}
					else{
						url+=t['Title_'+lang_text];
					}
					
					
					
					if(t.LinkCatExt_ID!=4){
						url+=' (';
						if((t.LinkCatExt_ID==1 || t.LinkCatExt_ID==3)){
							url+='<img src="/img/icon/pdf.gif" alt="" title="PDF"> '+t['FileSize_'+lang_text];
						}
						
						if(t.LinkCatExt_ID==3){
							url+=' / ';
						}
						
						if(t.LinkCatExt_ID==2 || t.LinkCatExt_ID==3){
							if(langtxt=='tc'){
								url+='<img alt="" title="" src="/img/icon/html.gif"> '+'<a class="normallink" href="/'+langtxt+'/wapdf/'+t.InfoBlockID+'.html" target="_blank">無障礙版本</a>';
							}else if(langtxt=='sc'){
								url+='<img alt="" title="" src="/img/icon/html.gif"> '+'<a class="normallink" href="/'+langtxt+'/wapdf/'+t.InfoBlockID+'.html" target="_blank">无障碍版本</a>';
							}else{
								url+='<img alt="" title="" src="/img/icon/html.gif"> '+'<a class="normallink" href="/'+langtxt+'/wapdf/'+t.InfoBlockID+'.html" target="_blank">Web Accessible Version</a>';

							}
							 
							
						}
						url+=')';
					}
				
				_newsContent += '<li> '+url + '</li>';
				
				
				i++;
			}
		});
	});		
	_newsContent += '</ul>';
	
			
			
			
	if(_newsContent != '<ul id="local_list"></ul>'){
	
		var lists = '';
		var icount = 0;

		lists += '<P><div class="toggle_list3">'; 
		lists += '<div class="header">';
		if(lang==0)
		lists += 'FAQ';
		else if(lang==1)
		lists += '常見問題';
		else if(lang==2)
		lists += '常见问题';
		lists += '</div>';
		lists += _newsContent;
		
 
		lists += '</div></P>'; 
		$('#faq_healthtopic').html(lists);
	}
		
}  

function display_date(date_str){
	 date_str = new Date(date_str.split(" ")[0]);
	var year = date_str.getFullYear();
	var month = date_str.getMonth()+1; 
	var day = date_str.getDate();
	
	if(month<10){
		month = '0'+month;
	}
	if(day<10){
		day = '0'+day;
	}
	
	return  year+' / '+month+' / '+day;
}


//20171206 Jacky  scroll to hash
function smoothScrollingTo(target){
	target=target.replace('#',''); 
	$('html,body').animate({scrollTop : $('a[name ='+target+']').offset().top},500);
}

//20180329 Jacky
function getPageUrl(){
	
	search_url=window.location.search;
	
	if(search_url!=''){
		search_url = search_url.replace("?page", "&page");
		search_url = search_url.split("&page")[0];
		var path = window.location.href.split("?")[0]+search_url+"&page="; 
	}else{
		var path = window.location.href.split("?")[0]+"?page=";
	} 
	
	return path;
}

function createDateSelector(val_type){
	if(val_type!=''){
		if(lang==1){
			
				
			var dateSelector_str='';
			dateSelector_str+='<form action="">';
			dateSelector_str+='		<div class="page_select left dateSelector">';
			dateSelector_str+='			<label for="'+val_type+'year">年份</label>';
			dateSelector_str+='			<div>';
			dateSelector_str+='				<select name="'+val_type+'year" id="'+val_type+'year" class="date">';								
			dateSelector_str+='				</select>';
			dateSelector_str+='			</div>';
			dateSelector_str+='			<label for="'+val_type+'month">月份</label>';
			dateSelector_str+='			<div>';
			dateSelector_str+='				<select name="'+val_type+'month" id="'+val_type+'month" class="date">';				    
			dateSelector_str+='					<option value="-1">全年</option>';	    
			dateSelector_str+='					<option value="1">1月</option>';
			dateSelector_str+='					<option value="2">2月</option>';
			dateSelector_str+='					<option value="3">3月</option>';
			dateSelector_str+='					<option value="4">4月</option>';
			dateSelector_str+='					<option value="5">5月</option>';
			dateSelector_str+='					<option value="6">6月</option>';
			dateSelector_str+='					<option value="7">7月</option>';
			dateSelector_str+='					<option value="8">8月</option>';
			dateSelector_str+='					<option value="9">9月</option>';
			dateSelector_str+='					<option value="10">10月</option>';
			dateSelector_str+='					<option value="11">11月</option>';
			dateSelector_str+='					<option value="12">12月</option>';
			dateSelector_str+='				</select>';
			dateSelector_str+='			</div>';
			dateSelector_str+='			<div><button id="btn_submit" class="btn_submit" type="submit" title="遞交">遞交</button></div>';
			dateSelector_str+='		</div>';		
			dateSelector_str+='	</form>	';
			document.write(dateSelector_str);
			
		}else if(lang==2){
			
				
			var dateSelector_str='';
			dateSelector_str+='<form action="">';
			dateSelector_str+='		<div class="page_select left dateSelector">';
			dateSelector_str+='			<label for="'+val_type+'year">年份</label>';
			dateSelector_str+='			<div>';
			dateSelector_str+='				<select name="'+val_type+'year" id="'+val_type+'year" class="date">';								
			dateSelector_str+='				</select>';
			dateSelector_str+='			</div>';
			dateSelector_str+='			<label for="'+val_type+'month">月份</label>';
			dateSelector_str+='			<div>';
			dateSelector_str+='				<select name="'+val_type+'month" id="'+val_type+'month" class="date">';				    
			dateSelector_str+='					<option value="-1">全年</option>';	    
			dateSelector_str+='					<option value="1">1月</option>';
			dateSelector_str+='					<option value="2">2月</option>';
			dateSelector_str+='					<option value="3">3月</option>';
			dateSelector_str+='					<option value="4">4月</option>';
			dateSelector_str+='					<option value="5">5月</option>';
			dateSelector_str+='					<option value="6">6月</option>';
			dateSelector_str+='					<option value="7">7月</option>';
			dateSelector_str+='					<option value="8">8月</option>';
			dateSelector_str+='					<option value="9">9月</option>';
			dateSelector_str+='					<option value="10">10月</option>';
			dateSelector_str+='					<option value="11">11月</option>';
			dateSelector_str+='					<option value="12">12月</option>';
			dateSelector_str+='				</select>';
			dateSelector_str+='			</div>';
			dateSelector_str+='			<div><button id="btn_submit" class="btn_submit" type="submit" title="递交">递交</button></div>';
			dateSelector_str+='		</div>';		
			dateSelector_str+='	</form>	';
			document.write(dateSelector_str);
			
		}else {
			
				
			var dateSelector_str='';
			dateSelector_str+='<form action="">';
			dateSelector_str+='		<div class="page_select left dateSelector">';
			dateSelector_str+='			<label for="'+val_type+'year">Year</label>';
			dateSelector_str+='			<div>';
			dateSelector_str+='				<select name="'+val_type+'year" id="'+val_type+'year" class="date">';								
			dateSelector_str+='				</select>';
			dateSelector_str+='			</div>';
			dateSelector_str+='			<label for="'+val_type+'month">Month</label>';
			dateSelector_str+='			<div>';
			dateSelector_str+='				<select name="'+val_type+'month" id="'+val_type+'month" class="date">';				    
			dateSelector_str+='					<option value="-1">Whole Year</option>';	    
			dateSelector_str+='					<option value="1">January</option>';
			dateSelector_str+='					<option value="2">February</option>';
			dateSelector_str+='					<option value="3">March</option>';
			dateSelector_str+='					<option value="4">April</option>';
			dateSelector_str+='					<option value="5">May</option>';
			dateSelector_str+='					<option value="6">June</option>';
			dateSelector_str+='					<option value="7">July</option>';
			dateSelector_str+='					<option value="8">August</option>';
			dateSelector_str+='					<option value="9">September</option>';
			dateSelector_str+='					<option value="10">October</option>';
			dateSelector_str+='					<option value="11">November</option>';
			dateSelector_str+='					<option value="12">December</option>';
			dateSelector_str+='				</select>';
			dateSelector_str+='			</div>';
			dateSelector_str+='			<div><button id="btn_submit" class="btn_submit" type="submit" title="Submit">Submit</button></div>';
			dateSelector_str+='		</div>';		
			dateSelector_str+='	</form>	';
			document.write(dateSelector_str);	
		}
	}
}