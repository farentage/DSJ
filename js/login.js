$(function() {
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 从layul获取form对象
    let form = layui.form
    let layer = layui.layer
    form.verify({
            username: function(value, item) { //value：表单的值、item：表单的DOM对象
                if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                    return '用户名不能有特殊字符';
                }
                if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                    return '用户名首尾不能出现下划线\'_\'';
                }
                if (/^\d+\d+\d$/.test(value)) {
                    return '用户名不能全为数字';
                }
            },
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            pwdname: function(value) {


                let pwdVal = $('.reg-box #pwdni').val()
                console.log(pwdVal);
                if (pwdVal !== value) {
                    return '两次密码不一致'
                }
            }
        })
        // 监听form表单
    let url = 'http://ajax.frontend.itheima.net';

    // let loginData = {
    //     username: ($('.login-box [name=username]').val()),
    //     password: ($('.login-box [name=password]').val())
    // };
    // 注册
    $('#red_form').on('submit', function(e) {
            let data = {
                username: ($('.reg-box [name=username]').val()),
                password: ($('.reg-box #pwdni').val())
            };
            console.log(data);
            e.preventDefault(),
                $.post(`${url}/api/reguser`, data, function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    $('#link_login').click()
                })


        })
        // 登录
    $('#login_form').on('submit', function(e) {

        e.preventDefault();
        let data = {
            username: ($('.login-box [name=username]').val()),
            password: ($('.login-box [name=password]').val())
        };
        console.log(data);
        // alert(1)
        $.post(`${url}/api/login`, data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        })
    })
})