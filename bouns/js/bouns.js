var users = [
    {
    	name: '第一组',
    	password: '123456'
    },
    {
    	name: '第二组',
    	password: '123456'
    },
    {
    	name: '第三组',
    	password: '123456'
    },
    {
    	name: '第四组',
    	password: '123456'
    },
    {
    	name: '教师',
    	password: '123456'
    }
];

$(window).ready(function() {
	var name = localStorage.user;
	if(name) {
		if(name == '教师') {
			getBouns();
		}else{
			$('#user-show-name').text(name + '：');
			$('.login-box').hide();
			$('.pupil-box').show();
		}
	}else{
		$('.login-box').show()
	}
})

function goLogin(){
	var name = $('#user-name').val(),
	password = $('#password').val(),
	result = false;
	if(!name && !password) return
	for(var i = 0; i < users.length; i++) {
		if(users[i].name == name && password == users[i].password) {
			if(name == '教师') {
				getBouns();
			}else{
				$('#user-show-name').text(name + '：');
				$('.login-box').hide();
				$('.pupil-box').show();
			}
			result = true;
		}
	};
	if(!result) {
		alert('用户名或者密码错误，请重新登录！')
	}else{
		localStorage.user = name
	}
}

function loginOut() {
	localStorage.user = '';
	window.location.reload();
}

function submitPrice() {
	var price = $('#price').val(),
	name = $('#user-show-name').text();
	if(price) {
		$.ajax({
		  url: 'https://www.iosso.cn/setBouns',
		  dataType: 'json',
		  data: {
		  	name: name.split('：')[0],
		  	price: price
		  },
		  success: function(data) {
		  	alert('提交成功');
		  	console.log(data)
		  }
		});
	}
}

function getBouns() {
	$.ajax({
	  url: 'https://www.iosso.cn/getBouns',
	  dataType: 'json',
	  success: function(data) {
	  	$('#one').text(data['第一组'] || 0);
	  	$('#two').text(data['第二组'] || 0);
	  	$('#three').text(data['第三组'] || 0);
	  	$('#four').text(data['第四组'] || 0);
	  	$('.login-box').hide();
		$('.teacher-box').show();
	  }
	});
}

function clearBouns() {
	if(localStorage.user != '教师') return
	$.ajax({
	  url: 'https://www.iosso.cn/clearBouns',
	  dataType: 'json',
	  success: function(data) {
	  	location.reload()
	  }
	});
}
