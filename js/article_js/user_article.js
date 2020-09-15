$(function() {
    //   获取数据渲染
    getArticle()
    let layer = layui.layer
    var form = layui.form

    function getArticle() {
        $.ajax({
                method: 'GET',
                url: '/my/article/cates',
                success: function(res) {
                    var templateList = template('articles', res)
                    $('tbody').html(templateList)
                }
            })
            // $.get('/my/article/cates', function(res) {
            //     if (res.status !== 0) {
            //         return layer.msg(res.message)
            //     }
            //     // layer.msg(res.message)
            //     console.log(res);
            //     let templateList = template('articles', res)
            //     $('tbody').html(templateList)
            // })

    }
    let index = null;
    // 添加弹出层模板
    $('#addTo').on('click', function(e) {
            index = layer.open({
                type: 1,
                title: '添加文章类别',
                area: ['500px', '250px'],
                content: $('#popUpLayer').html(),
            });
        })
        // 添加数据
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: "/my/article/addcates",
                data: $(this).serialize(),
                success: function(res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    getArticle()
                    layer.msg(res.message)
                    layer.close(index);
                }
            })
        })
        // 删除
    $('tbody').on('click', '#delete', function(e) {
        let id = $(this).attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                data: id,
                success: function(res) {
                    if (res.tatus !== 0) {
                        return layer.msg(res.message)
                    }
                    // console.log(res);
                    layer.close(index)
                    getArticle()
                    layer.msg(res.message)
                }
            })
            layer.close(index);
        });

    });





    // 编辑弹出层模板
    let indexE = null;
    $('tbody').on('click', '#edit', function() {
        // 弹出一个修改文章分类信息的层
        let editId = $(this).attr('data-id')
        indexE = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#editTemplate').html()
        })
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + editId,
            data: editId,
            success: function(res) {
                console.log(res);
                // if (res.status !== 0) {
                //     return layer.msg(res.message)
                // }
                // form.val('modify', res.data)
                form.val('modify', res.data)
                    // layer.msg(res.message)
            }
        })
    })
    $('body').on('submit', '#modify', function(e) {
            alert(1)
            e.preventDefault()
            $.ajax({
                url: "/my/article/updatecate",
                method: 'POST',
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res);

                    getArticle()
                    layer.close(indexE);
                }
            })
        })
        //     $('body').on("submit", "modify", function(e) {
        //      
})