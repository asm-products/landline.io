;(function(p,l,o,w,i){if(!p[i]){p.__asml=p.__asml||[];
p.__asml.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)
};p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;
n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,"script","https://d1uxm17u44dmmr.cloudfront.net/1.0.0/asml.js","asml"));

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
    $.ajax({
      url: 'http://assemblymade.us8.list-manage.com/subscribe/post-json?u=e8888d19fc5223c4d9a10c215&amp;id=16dde4a4e2&c=?',
      type: 'GET',
      data: $form.serialize(),
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      success: function (data) {/* noop */}
    });

    $('#mce-EMAIL').val('').blur();
  }
})(jQuery);
