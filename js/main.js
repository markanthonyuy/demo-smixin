$(function() {
  var timer;

  /*
 * Replace all SVG images with inline SVG
 */
  jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Add replaced image's ID to the new SVG
      if(typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if(typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass+' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
      if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
      }

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');
  });

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  /* Header switch */

  $('.bg-switch').on('click', function() {
    var $this = $(this),
        target = $this.data('target');

    clearInterval(timer);

    timer = setInterval(function() {
      if($('.bg-switch.active').next().length) {
        $('.bg-switch.active').next().trigger('click');
      } else {
        $('.bg-switch').eq(0).trigger('click');
      }
    }, 10000);

    $('.bg-switch').removeClass('active');
    $this.addClass('active');

    $('.main-header').css('background-image', 'url(img/hero-banner-' + target + '.jpg)');
  });

  timer = setInterval(function() {
    if($('.bg-switch.active').next().length) {
      $('.bg-switch.active').next().trigger('click');
    } else {
      $('.bg-switch').eq(0).trigger('click');
    }
  }, 10000);

  $('.hamburger').on('click', function() {
    $(this).toggleClass('is-active');
    $('.m-menu').slideToggle(100);
  });

  $(window).on('resize', debounce(function() {
    if($(this).outerWidth() > 992) {
      $('.m-menu').slideUp(100);
      $('.hamburger').removeClass('is-active');
    }
  }, 100));

  /* Contact product selected */

  $('.contact-us .contact-form .products .product').on('click', function() {
    $('.contact-us .contact-form .products .product').removeClass('active')
    $(this).addClass('active');
    $('form input[name="product"]').val($(this).data('product'));
  });
});