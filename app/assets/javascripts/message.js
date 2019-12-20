$(function(){

  function buildHTML(message) {
    if (message.image && message.content) {
      var html = `<div class="main-chat__message" data-message-id="${message.id}">
                    <div class="main-chat__message--username">
                      ${message.user_name}
                    </div>
                    <div class="main-chat__message--date">
                      ${message.created_at}
                    </div>"
                    <div class="main-chat__message--text">
                      ${message.content}
                    </div>
                    <img class="main-chat__message--image" src="${message.image}">
                  </div>`
    } else if (message.content) {
      var html = `<div class="main-chat__message" data-message-id="${message.id}">
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
    } else {
      var html = `<div class="main-chat__message" data-message-id="${message.id}">
                    <div class="main-chat__message--username">
                      ${message.user_name}
                    </div>
                    <div class="main-chat__message--date">
                      ${message.created_at}
                    </div>
                    <div class="main-chat__message--text">
                    </div>
                    <img class="main-chat__message--image" src="${message.image}">
                  </div>`
    }
    return html
  }

  $(".new_message").on("submit", function(e) {
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
        .done(function(data) {
          var html = buildHTML(data);
          $('.main-chat').append(html);
          $('.new_message')[0].reset();
          $('.main-form__submit').prop("disabled", false);
          $('.main-chat').animate({scrollTop: $('.main-chat')[0].scrollHeight});
        })
      .fail(function() {
        $('.main-form__submit').prop("disabled", false);
        alert('メッセージ送信に失敗しました');
      })
  });

  var reloadMessages = function() {
    last_message_id = $(".main-chat__message:last").data("message-id");
    $.ajax({
      type: 'get',
      url: "api/messages",
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat').append(insertHTML);
        $('.main-chat').animate({scrollTop: $(".main-chat")[0].scrollHeight});
      } else {
        return false;
      }
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/))
  setInterval(reloadMessages, 7000);
});