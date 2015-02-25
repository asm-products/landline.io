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

    iframe.src = '/chat?team=landline';
    iframe.className = 'live-chat';
    iframe.width = 800;
    iframe.height = 600;

    chat.innerHTML = '';
    chat.appendChild(iframe);
  }

  function subscribe($form) {
    var path = $form.data('url');
    var data = {
      email: $form.find('input[name="email"]').val()
    };

    $form.find('input[name="email"]').val('');

    $.post(path, data, function(data) {
      console.log('it worked?');
    });
  }
})(Zepto);
