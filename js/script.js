$(function () {
  $('.product').on('click', 'input', function (evt) {
    $(evt.delegateTarget).siblings().removeClass('product_active');
    $(evt.delegateTarget).addClass('product_active');
  });
})