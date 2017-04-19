function loginToPoll(){
    return '<h4>請輸入email以完成投票</h4> \
              <form action="to_vote"> \
               <input id="useremail" type="email" name="email"> \
               <input style="display:none" id="voteItems" type="text" name="voteItems" value="' + vm.vote + '"> \
               <input type="submit" id="vote-submit" name="submit" class="btn bt-sm btn-success"> \
               <a onclick="parent.$.colorbox.close(); return false;" \
                  class="btn btn-warning btn-s" style="margin-left:10px">取消</a> \
              </form>'
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


var vm = new Vue({
  el: '#ts-row12',

  data: {
    vote: [],
    voteMessage: 'hello world',
    alert_1: '<h4>請選擇3個項目<a onclick="parent.$.colorbox.close(); return false;" \
              class="btn btn-warning btn-s" style="margin-left:20px">返回投票</a></h4>',
    alert_2: '<h4>請勾選確認「 <span style="color:red">願意請勾選</span>」以完成投票.<a onclick="parent.$.colorbox.close(); return false;" \
              class="btn btn-warning btn-s" style="margin-left:20px">返回投票</a></h4>',
    alert_final: '<h4>投標完成，感謝您的投票</h4>',
  },

  methods: {
    poll: function (event) {
        element = event.currentTarget;
        id = element.getAttribute('id');
        if(vm.vote.indexOf(id) >= 0){		 /* 取消 */
            index = vm.vote.indexOf(id);
            if(index > -1) {
                vm.vote.splice(index, 1);
            };
            element.setAttribute('class', 'btn btn-info btn-xs');
            return;
        };
        if( vm.vote.length >= 3 ){
            alert('只能投3票');
            return;
        };
        vm.vote.push(id);
        element.setAttribute('class', 'btn btn-success btn-xs');
    },

    submitVote: function (event) {
        if(! $('#voteConfirm').is(':checked')){
            $('#voteMessage').html(vm.alert_2);
            return;
        };

        if( vm.vote.length != 3 ){
            $('#voteMessage').html('<p><h4>每個帳號限投一次，每次須投滿三票不同作品<h4> \
              <h5>您已投 ' + vm.vote.length + ' 票，還需投 ' + (3-vm.vote.length) + ' 票</h5><a onclick="parent.$.colorbox.close(); return false;" \
              class="btn btn-warning btn-s" style="margin-left:20px">投票確認</a></h4></p>');
            return;
        };
        $('#voteMessage').html(loginToPoll());
    },
  },
});


$(document).ready(function(){
    // Color Box
    $(".inline").colorbox({inline:true, width:"75%"});
});

$(document).ready(function(){
    // 投票後訊息
    var thanks = getParameterByName('thanks');
    var voted = getParameterByName('voted');

    if( voted == 1){
        alert('您已經參與過投票。');
        return;
    };
    if( thanks == 1){
        alert('感謝您的參與，已完成投票。視覺藝術獎、表演藝術獎、年度大獎 5/13 揭曉頒布。5/15 中午於本站公告抽獎中獎名單。');
        return;
    };

});

