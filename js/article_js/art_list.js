$(function() {
    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }
    let layer = layui.layer
    let form = layui.form
        // 给时间补零
    function padZero(n) {
        if (n < 10) {
            return '0' + n
        } else {
            return n
        }
    }
    // 时间过滤器
    template.defaults.imports.eventFilter = function(data) {
        var dt = new Date(dtStr)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    getArticleList();
    getArticleClassification();
    // 获取文章的列表数据方法
    function getArticleList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }

                let htmlStr = template('ArticleList', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })


    }
    // 获取文章分类方法
    function getArticleClassification() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                let htmlStr = template('ArticleClassification', res)
                $('[name=cate_id]').html(htmlStr)
                    // 通过 layui 重新渲染表单区域的UI结构
                form.render()

            }
        })
    }

    // 筛选的功能
    $('#forms').on('submit', function(e) {

            e.preventDefault()
                // 获取表单中选中项的值
            var cate_id = $('[name=cate_id]').val()
            var state = $('[name=state]').val()
                // 为查询参数对象 q 中对应的属性赋值
            q.cate_id = cate_id
            q.state = state
            getArticleList()
        })
        // 分页方法
    function renderPage(total) {
        layui.use('laypage', function() {
            var laypage = layui.laypage;

            //执行一个laypage实例
            laypage.render({
                elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
                limits: [2, 3, 5, 10],
                count: total, //数据总数，从服务端得到
                limit: q.pagesize,
                curr: q.pagenum,
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                jump: function(obj, first) {
                    //obj包含了当前分页的所有参数，比如：
                    // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    // console.log(obj.limit); //得到每页显示的条数
                    q.pagenum = obj.curr
                    q.pagesize = obj.limit
                        //首次不执行
                    if (!first) {
                        //do something
                        getArticleList()
                    }

                }
            });
        });
    }
    // 删除文章
    deleteArticle()

    function deleteArticle() {
        $('tbody').on('click', '#delete', function() {
            let id = $(this).attr('data-id')
            let lengths = $('.btn-delete').length
            console.log(lengths);
            // console.log(id);
            layer.confirm('确定删除么?', { icon: 3, title: '提示' }, function(index) {
                //do something
                $.ajax({
                    method: 'GET',
                    url: '/my/article/delete/' + id,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message)
                        }
                        if (lengths === 1) {
                            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1



                        }
                        getArticleList()
                        layer.msg(res.message)
                    }

                })
                layer.close(index);
            });

        })
    }

})