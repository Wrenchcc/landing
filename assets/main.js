$(document).ready(function() {
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  $('#email').on('input', function() {
    var email = this.value;
    if (isEmail(email)) {
      $('.form button').addClass('show');
    } else {
      $('.form button').removeClass('show');
    }
  });

  $('.form').submit(function( evt ) {
    evt.preventDefault();
    var form = $(this)
    var email = $('#email').val()

    $.ajax({
      type: 'POST',
      url: form.attr('action'),
      data: JSON.stringify({ email: email }),
      contentType: 'application/json',
      dataType: 'json',
      success: function(res){
        if(res.success === false) {
          $('#email').val('');
          $('.form button').removeClass('show');
          $('.form .already').addClass('show');
        } else {
          $('#email').val('');
          $('.form button').removeClass('show');
          $('.form .done').addClass('show');

          gtag('event', email, {
            'event_category': 'Email',
            'event_label': 'Pre-launch'
          });
        }
      },
    });
  });
});
