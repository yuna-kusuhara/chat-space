$(function(){
  function buildHTML(message){
    if (message.image.url) {
      var html = `<div class="main-chat__message">
                    <div class="main-chat__message--username">
                    ${message.user_name}
                    </div>
                    <div class="main-chat__message--date">
                    ${message.created_at.strftime("%Y-%m-%d %H:%M")}
                    </div>
                    <div class="main-chat__message--text">
                    ${message.content}
                    </div>
                    <img class="main-chat__message--image" src="${message.image.url}">
                  </div>`
    } else {
      var html = `<div class="main-chat__message">
                    <div class="main-chat__message--username">
                    ${message.user_name}
                    </div>
                    <div class="main-chat__message--date">
                    ${message.created_at}
                    </div>
                    <div class="main-chat__message--text">
                    ${message.content}
                    </div>
                  </div>`
    }
    return html
  }

  $(".new_message").on("submit", function(e){
    e.preventDefault()
        var formData = new FormData(this);
        var url = $(this).attr('action')
        $.ajax({
          url: url,
          type: 'POST',
          data: formData,
          dataType: 'json',
          processData: false,
          contentType: false
        })
        .done(function(data){
          var html = buildHTML(data);
          $('.main-chat').append(html);
          $('.new_message')[0].reset();
          $('.main-form__submit').prop("disabled", false);
          $('.main-chat').animate({scrollTop: $('.main-chat')[0].scrollHeight});
        })
      .fail(function(){
        $('.main-form__submit').prop("disabled", false);
        alert('メッセージ送信に失敗しました');
      })
  });
});