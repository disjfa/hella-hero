$(function () {
  $('.js-hella-item').on('click', function () {
    $(this).siblings().removeClass('is-active');
    $(this).addClass('is-active');
  });

  $('.js-hella-item-input').on('click', 'input', function (evt) {
    $(evt.delegateTarget).siblings().removeClass('is-active');
    $(evt.delegateTarget).addClass('is-active');
  });
})