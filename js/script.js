$(function () {
  $('.js-product').on('click', 'input', function (evt) {
    $(evt.delegateTarget).siblings().removeClass('is-active');
    $(evt.delegateTarget).addClass('is-active');
  });

  $('.js-box').on('click', 'input', function (evt) {
    if(evt.currentTarget.checked) {
      $(evt.delegateTarget).addClass('is-active');
    } else {
      $(evt.delegateTarget).removeClass('is-active');
    }
  });

  $('.js-return').on('click', function() {
    return false;
  });
})