;(function($) {
  $('#email-signup').submit(function(e) {
    e.preventDefault();

    subscribe($(this));
    enableChat();
  });

  function enableChat() {
    // goes into div#chat
    // iframe.live-chat(src='/chat', width=800, height=400)

    var iframe = document.createElement('iframe');
    var chat = document.getElementById('chat');

    iframe.src = '/chat?team=Landline';
    iframe.className = 'live-chat';
    iframe.width = 800;
    iframe.height = 400;

    chat.innerHTML = '';
    chat.appendChild(iframe);
  }

  function subscribe($form) {
    var path = $form.data('url');
    var data = {
      email: $form.find('input[name="email"]').val()
    };

    return console.log(data);

    $form.find('input[name="email"]').val('');

    $.post(path, data)
      .done(function(data) {
        $form.find('input[name="email"]').val('');
        $('.alert-success').fadeTo(100, 1);
        $('.alert-success').fadeTo(10*1000, 0);
      })
      .fail(function(err) {
        $('.alert-danger').fadeTo(100, 1);
        $('.alert-danger').fadeTo(10*1000, 0);
      });
  }
})(Zepto);
