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
        pwdname: function(value, item) {


            let pwdVal = $('.reg.box [neme=password]').val()
            if (pwdVal !== value) {
                return '两次密码不一致'
            }
        }
    })
})