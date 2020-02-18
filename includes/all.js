/*
 * Animate Scrolling effect with cards
 */
// jQuery extension to determine if an element is visible/was scrolled past
(function ($) {
  $.fn.visible = function (partial) {
    var $t = $(this),
        $w = $(window),
        viewTop = $w.scrollTop(),
        viewBottom = viewTop + $w.height(),
        _top = $t.offset().top,
        _bottom = _top + $t.height();

    return _top <= viewBottom;
  };
})(jQuery); // implementing card scrolling effect


var win = $(window);
var allCards = $(".card");
allCards.each(function (i, el) {
  var el = $(el);

  if (el.visible(true)) {
    el.addClass("already-visible");
  }
});
win.scroll(function (event) {
  allCards.each(function (i, el) {
    var el = $(el);

    if (el.visible(true)) {
      el.addClass("come-in");
    }
  });
});
/*
 *  contact form submission to enformed.io
 */

$("#contact-form").submit(function () {
  var myData = {
    "email": $("#email").val(),
    "message": $("#message").val()
  };
  $.ajax({
    method: 'POST',
    url: 'https://www.enformed.io/7uve4bv0/',
    dataType: 'json',
    accepts: 'application/json',
    data: myData,
    success: data => console.log(data),
    error: err => console.log(err)
  });
  $(".submission-message").css("display", "block");
  $('#contact-text').css("display", "none");
});