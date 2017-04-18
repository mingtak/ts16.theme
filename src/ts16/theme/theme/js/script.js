var vm = new Vue({
  el: '#ts-row12',

  data: {
    vote: [],
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
        alert(classes);
    },

    submitVote: function (event) {
/* TODO: 引入colorbox, FB oauth, 或輸入email, 檢查是否已投過, 寫入DB */
alert('投標完成，感謝您的投票');
    },

  },

});

