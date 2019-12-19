$(function(){

  var user_list = $("#user-search-result")

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`;
    user_list.append(html);
  }

  function appendNotUser() {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>`;
    user_list.append(html);
  }

  function appendChatmember(name, id) {
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`;
    $("#chat-group-users.js-add-user").append(html)
  }

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();   //フォームの値を取得して変数に代入する

    $.ajax({
      type: "GET",
      url: "/users",
      dataType: "json",
      data: {keyword: input}
    })
    .done(function(users) {
      user_list.empty();
      if (users.length !== 0) {
          users.forEach(function(user) {
          appendUser(user);
        });
        } else if (input.length == 0) {
          return false;
        } else {
          appendNotUser();
        }
      })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  });

  $(document).on('click', ".chat-group-user__btn--add", function(){
    var adduser = $(this);
    var userName = adduser.attr("data-user-name");
    var userId = adduser.attr("data-user-id");
    adduser.parent().remove();
    appendChatmember(userName, userId); 
  });

  $(document).on('click', ".chat-group-user__btn--remove", function(){
    var removeuser = $(this);
    removeuser.parent().remove(); 
  });
});