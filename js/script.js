$(function () {
  $('.product').on('click', 'input', function (evt) {
    $(evt.delegateTarget).siblings().removeClass('product_active');
    $(evt.delegateTarget).addClass('product_active');
  });

  $('.box').on('click', 'input', function (evt) {
    if(evt.currentTarget.checked) {
      $(evt.delegateTarget).addClass('box_active');
    } else {
      $(evt.delegateTarget).removeClass('box_active');
    }
  });
})