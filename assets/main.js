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

    fetch(form.attr('action'), {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(function() {
      if(window.ga) {
        window.ga('send', 'event', 'Email', email, 'Pre-launch');
        $('#email').val('');
        $('.form button').removeClass('show');
        $('.form .check').addClass('show');
      }
    });
  });
});
