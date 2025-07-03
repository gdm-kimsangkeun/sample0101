/*! Image Map Resizer (imageMapResizer.min.js ) - v1.0.10 - 2019-04-10
 *  Desc: Resize HTML imageMap to scaled image.
 *  Copyright: (c) 2019 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

!function(){"use strict";function r(){function e(){var r={width:u.width/u.naturalWidth,height:u.height/u.naturalHeight},a={width:parseInt(window.getComputedStyle(u,null).getPropertyValue("padding-left"),10),height:parseInt(window.getComputedStyle(u,null).getPropertyValue("padding-top"),10)};i.forEach(function(e,t){var n=0;o[t].coords=e.split(",").map(function(e){var t=1==(n=1-n)?"width":"height";return a[t]+Math.floor(Number(e)*r[t])}).join(",")})}function t(e){return e.coords.replace(/ *, */g,",").replace(/ +/g,",")}function n(){clearTimeout(d),d=setTimeout(e,250)}function r(e){return document.querySelector('img[usemap="'+e+'"]')}var a=this,o=null,i=null,u=null,d=null;"function"!=typeof a._resize?(o=a.getElementsByTagName("area"),i=Array.prototype.map.call(o,t),u=r("#"+a.name)||r(a.name),a._resize=e,u.addEventListener("load",e,!1),window.addEventListener("focus",e,!1),window.addEventListener("resize",n,!1),window.addEventListener("readystatechange",e,!1),document.addEventListener("fullscreenchange",e,!1),u.width===u.naturalWidth&&u.height===u.naturalHeight||e()):a._resize()}function e(){function t(e){e&&(!function(e){if(!e.tagName)throw new TypeError("Object is not a valid DOM element");if("MAP"!==e.tagName.toUpperCase())throw new TypeError("Expected <MAP> tag, found <"+e.tagName+">.")}(e),r.call(e),n.push(e))}var n;return function(e){switch(n=[],typeof e){case"undefined":case"string":Array.prototype.forEach.call(document.querySelectorAll(e||"map"),t);break;case"object":t(e);break;default:throw new TypeError("Unexpected data type ("+typeof e+").")}return n}}"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&"object"==typeof module.exports?module.exports=e():window.imageMapResize=e(),"jQuery"in window&&(window.jQuery.fn.imageMapResize=function(){return this.filter("map").each(r).end()})}();

// modal
! function(t) {
	var n = {
			show: !0,
			backdrop: !0,
			backdropClick: !0,
			keyboard: !0,
			autoPosition: !0,
			dialogMarginTop: 20,
			width: null,
			top: null,
			left: null
		},
		o = {
			BACKDROP: "modal-backdrop",
			OPEN: "modal-open",
			FADE: "fade",
			IN: "in"
		},
		i = {
			MODAL: ".modal",
			DIALOG: ".modal-dialog",
			CONTENT: ".modal-content",
			DATA_TOGGLE: '[data-toggle="modal"]',
			DATA_DISMISS: '[data-dismiss="modal"]'
		};
	t.fn.modal = function(e) {
		function s() {
			//var n = t(window).height(),
			var n = t(window).height(),
				o = r.find(i.DIALOG).height(),
				e = n / 2 - o / 2;

			/*
			e < g.settings.dialogMarginTop && (e = g.settings.dialogMarginTop), g.settings.top && (e = g.settings.top), t(i.DIALOG).css({
				marginTop: e
			})

			 */
		}

		function a() {
			t(document).off("focusin").on("focusin", function(n) {
				f === n.target || t(f).has(n.target).length || f.focus()
			})
		}

		function d() {
			t(document).find("." + o.BACKDROP).length || t(h).appendTo(document.body)
		}

		function c() {
			backdropClickEvt();
			t("." + o.BACKDROP).remove(), h = null
		}

		function u() {
			//t(document.body).addClass(o.OPEN),
			console.log('open');
			$('.modal').css('overflow','hidden');
			$('body').css('overflow','hidden');

			d(), r.show(), g.settings.width && t(i.DIALOG).css({
				width: g.settings.width,
				marginLeft: "auto",
				marginRight: "auto"
			}), t(i.DIALOG).css({
				marginLeft: g.settings.left
			}), g.settings.autoPosition && s(), a(), r.focus()
		}

		function l() {
			t(document.body).removeClass(o.OPEN), c(), r.hide(), t(i.DIALOG).css("margin-top", ""), t(document).off("focusin");
			$('.modal').css('overflow','visible');
			$('body').css('overflow','visible');
		}
		if (0 === this.length) return this;
		if (this.length > 1) return this.each(function() {
			t(this).modal(e)
		}), this;
		var g = {},
			r = this,
			f = r[0],
			h = null,
			m = function() {
				g.settings = t.extend({}, n, e), r.attr("tabindex", "-1"), g.settings.backdrop ? (h = document.createElement("div"), h.className = o.BACKDROP) : h = null, r.on("click", function(t) {
					//t.target === t.currentTarget && g.settings.backdrop && g.settings.backdropClick && l()
					t.target === t.currentTarget && g.settings.backdrop && g.settings.backdropClick && l()




				}), g.settings.keyboard && t(document.body).on("keydown", function(t) {
					27 === t.which && l()
				})
			};
		return m(), g.settings.show ? u() : l(), t(window).bind("resize", function() {
			s()
		}), this
	}, t(document).on("click", i.DATA_TOGGLE, function(n) {
		var o = t(this).attr("data-target");
		"A" === this.tagName && n.preventDefault(), t(o).modal();
	}), t(document).on("click", i.DATA_DISMISS, function() {

		t(i.MODAL).modal({
			show: !1
		})
		return false;
	})
}(jQuery);

function backdropClickEvt() {

}



//공통값
var loadingYn = 'Y';
var subMenuViewYn = 'N';


//* LNB Navigation */
function activeLNB(id, cnt, n) {
	for(num=1; num<=parseInt(cnt); num++) {
		$("#Um"+num).removeClass("current"); 
		$("#Lm"+num).css("visibility", "hidden"); 
		$("#Lm"+num).css("display", "none"); 
	}
	$("#Um"+n).addClass("current"); 
	$("#"+id).css("visibility", "visible"); //해당 ID만 보임
	$("#"+id).css("display", "block"); //해당 ID만 보임
}

function onblueLNB(id) {
	$("#"+id).css("visibility", "hidden");
	$("#"+id).css("display", "none");
}   
/*기본형 스타일 끝*/


/*헤더 DropDown style*/


//* LNB Navigation */
function activeLNB1(id, cnt, n) {
	$("#Um"+n).addClass("current"); 
 
	for(num=1; num<=parseInt(cnt); num++) {
		if (subMenuViewYn=='N') {
			$("#Lm1"+num).show().animate({height:'200px'},300); 
		}
	}
	if (subMenuViewYn=='N') {
		$('#subMenuBg').slideDown(300);
		$('#lnb1').height('240');
		$('#subMenuBgBottom').css('display','block');
		$('.dimmed').show();
	}
	subMenuViewYn='Y';
	$('#showYn').text(subMenuViewYn);

}

function onblueLNB1(cnt, n) {
	$("#Um"+n).addClass("current"); 
	for(num=1; num<=parseInt(cnt); num++) {
		if (subMenuViewYn=='Y') {
			$("#Lm1"+num).animate({height:'0px'},100); 
		}
	}
	if (subMenuViewYn=='Y') {
		$('#subMenuBg').slideUp(100);
		$('#lnb1').animate({height:'71px'},100);
		$('#subMenuBgBottom').css('display','none');
		$('.dimmed').hide();
	}
	subMenuViewYn='N';
	$('#showYn').text(subMenuViewYn);

}  
/*퓨처헤더 style 끝*/

function activeLNBM(id, cnt) {
	for(num=1; num<=parseInt(cnt); num++) {
		$("#Lm"+num).css("visibility", "visible"); 
	}
}
function activeLNBM1(id, cnt) {
	for(num=1; num<=parseInt(cnt); num++) {
		$("#Lm1"+num).css("visibility", "visible"); 
	}
}






/* image rollover */
$(document).ready(function() {
   $("img.rollover").mouseover(function() {
	 $(this).attr("src", $(this).attr("src").replace("_off","_on")); 
   });
   $("img.rollover").mouseout(function() {
	 $(this).attr("src", $(this).attr("src").replace("_on", "_off"));
   }); 
});