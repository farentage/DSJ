$(function() {
        // 1. 获取用户信息
        getInfo()

        let layer = layui.layer
            // 3.tui出功能
        $('#btnLogout').on('click', function() {
            layer.confirm('确定要退出?', { icon: 3, title: '提示' },
                function(index) {
                    //do something
                    // console.log(ok);
                    localStorage.removeItem('token')
                    location.href = '/login.html'
                    layer.close(index);
                });


        })

        // 4.控制用客户访问权限
    })
    // getInfo()

function getInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderImage(res.data)

        },
        // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: function(res) {
        //     // console.log('执行了 complete 回调：')
        //     // console.log(res)
        //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1. 强制清空 token
        //         localStorage.removeItem('token')
        //             // 2. 强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
};
// 2.渲染图片名字
function renderImage(data) {
    var name = data.nickname || data.username
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
    if (data.user_pic !== null) {

        $('.layui-nav-img').attr('src', data.user_pic).show()
        $('.text-avatar').hide()
    } else {
        var first = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').html(first).show()
    }
}

// // 渲染用户的头像
// function renderAvatar(user) {
//     // 1. 获取用户的名称
//     var name = user.nickname || user.username
//         // 2. 设置欢迎的文本
//     $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
//         // 3. 按需渲染用户的头像
//     if (user.user_pic !== null) {
//         // 3.1 渲染图片头像
//         $('.layui-nav-img')
//             .attr('src', user.user_pic)
//             .show()
//         $('.text-avatar').hide()
//     } else {
//         // 3.2 渲染文本头像
//         $('.layui-nav-img').hide()
//         var first = name[0].toUpperCase()
//         $('.text-avatar')
//             .html(first)
//             .show()
//     }
// }