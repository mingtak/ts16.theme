// login html
function loginToPoll(){
    return '<h4>請輸入email以完成投票</h4> \
              <form action="to_vote"> \
               <input id="useremail" type="email" name="email"> \
               <input style="display:none" id="voteItems" type="text" name="voteItems" value="' + vm.vote + '"> \
               <input type="submit" name="submit" class="btn bt-sm"> \
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
    alert_1: '<h4>請選擇3個項目</h4>',
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
            alert('只能選3個');
            return;
        };
        vm.vote.push(id);
        element.setAttribute('class', 'btn btn-success btn-xs');
//        alert(classes);
    },

    submitVote: function (event) {
/* TODO: 檢查是否已投過, 寫入DB */

        if( vm.vote.length != 3 ){
            $('#voteMessage').html(vm.alert_1);
            return;
        };
//        $('#voteMessage').html(vm.alert_final);
        $('#voteMessage').html(loginToPoll());
    },

  },

});

/*
########
網站上的 Facebook redirect URL 記得上線前要改回來
#######
*/


$(document).ready(function(){
    // Color Box
    $(".inline").colorbox({inline:true, width:"50%"});
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
        alert('感謝您的參與，已完成投票。');
        return;
    };

});

