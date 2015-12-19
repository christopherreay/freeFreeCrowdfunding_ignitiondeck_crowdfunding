jQuery(document).ready(function() {
	var idlightbox = {};
  idlightbox.targets = 
  { "levelDesc" : jQuery('.idc_lightbox:visible .text p'),
    "priceInput": jQuery('.idc_lightbox input[name="total"]'),
    "priceSpan" : jQuery('.idc_lightbox:visible span.total')
  };
  idlightbox.functions = {};
  idlightbox.functions.setInputs = function(levelDesc, levelPrice)
  { idlightbox.targets.levelDesc.text(levelDesc);
    idlightbox.targets.priceInput.val(null);
    idlightbox.targets.priceInput.attr("placeholder", "minimum amount £"+levelPrice);
    idlightbox.targets.priceSpan.data('value', levelPrice).text("minimum amount: £"+levelPrice);
  };

  jQuery(document).bind('idc_lightbox_general', function(e) {
		var selLevel = jQuery('.idc_lightbox:visible select[name="level_select"]').val();
		var levelDesc = jQuery('.idc_lightbox:visible select[name="level_select"] :selected').data('desc');
		var levelPrice = jQuery('.idc_lightbox:visible select[name="level_select"] :selected').data('price');
		idlightbox.functions.setInputs(levelDesc, levelPrice);
	});
	jQuery('.idc_lightbox select[name="level_select"]').change(function(e) {
		if (jQuery(this).has(':visible')) {
			//console.log(e);
			selLevel = jQuery(this).val();
			levelDesc = jQuery('.idc_lightbox:visible select[name="level_select"] :selected').data('desc');
			levelPrice = jQuery('.idc_lightbox:visible select[name="level_select"] :selected').data('price');
			idlightbox.functions.setInputs(levelDesc, levelPrice);
		}
	});
	jQuery(document).bind('idc_lightbox_level_select', function(e, clickLevel) {
		selLevel = clickLevel + 1;	//jQuery('.idc_lightbox:visible select[name="level_select"] option').eq(clickLevel).val();
		valExists = jQuery('.idc_lightbox:visible select[name="level_select"] option[value="'+ selLevel +'"]').val();
		if (valExists) {
			levelDesc = jQuery('.idc_lightbox:visible select[name="level_select"] option[value="'+ selLevel +'"]').data('desc');
			levelPrice = jQuery('.idc_lightbox:visible select[name="level_select"] option[value="'+ selLevel +'"]').data('price');
			idlightbox.functions.setInputs(levelDesc, levelPrice);
			// console.log('selecting selLevel: ', selLevel);
			jQuery('.idc_lightbox:visible .level_select').val(selLevel);
			// console.log('selected selLevel: ', selLevel);
			jQuery('.lb_level_submit').removeAttr('disabled');
		}
		else {
  		idlightbox.functions.setInputs(levelDesc, levelPrice);
			jQuery('.lb_level_submit').attr('disabled','disabled');
		}
	});
});