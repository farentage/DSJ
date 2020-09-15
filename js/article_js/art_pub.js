$(function() {
    // 初始化富文本编辑器 
    initEditor()
        // 1. 初始化图片裁剪器
    var $image = $('#image')
        // 2. 裁剪选项 
    var options = { aspectRatio: 400 / 280, preview: '.img-preview' }
        // 3. 初始化裁剪区域 
    $image.cropper(options)

    let form = layui.form
    let layer = layui.layer
    getarticleCategory()
        // 获取文章类别
    function getarticleCategory() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.mag(res.message)
                }
                let htmlStr = template('articleCategory', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    $('#btnChooseImage').on('click', function() {
        $('#cover_img').click()
        $('#cover_img').on('change', function(e) {
            console.log(e);
            let files = e.target.files
            console.log(files);
            if (files.length === 0) {
                return
            }
            let url = URL.createObjectURL(files[0])
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', url) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
    })
    let save_state = '已发布';
    $('#btnSave2').on('click', function() {
        save_state = '草稿';

    })
    postArticle()

    function postArticle() {
        $('#form_pub').on('submit', function(e) {
            // preventDefault
            e.preventDefault()
            console.log($(this)[0]);
            // let fd = new FormData($(this[0]));
            var fd = new FormData($(this)[0])
            fd.append('state', save_state)
            $image
                .cropper('getCroppedCanvas', {
                    // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function(blob) {
                    // 将 Canvas 画布上的内容，转化为文件对象
                    // 得到文件对象后，进行后续的操作
                    // 5. 将文件对象，存储到 fd 中
                    fd.append('cover_img', blob)
                        // 6. 发起 ajax 数据请求
                    $.ajax({
                        method: 'POST',
                        url: '/my/article/add',
                        data: fd,
                        contentType: false,
                        processData: false,
                        success: function(res) {
                            if (res.status !== 0) {
                                return layer.msg('res.message')
                            }
                            layer.msg(res.message)
                            console.log(res);
                            // location.href = '/article/art_list.html'
                        }
                    })
                })

        })

    }
})