const db = require('../../db/index')
// 添加新闻
exports.add = (req, res) => {
    const { title, content, category, isPublish } = req.body
    const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
    const sqlStr = 'insert into news set ?'
    db.query(sqlStr, { title, content, category, cover, isPublish, editTime:new Date() }, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('添加失败')
        res.send({
            code: 1,
            message: '创建成功'
        })
    })
}
// 获取新闻列表
exports.list = (req, res) => {
    const sqlStr = 'select * from news order by editTime desc'
    db.query(sqlStr, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            code: 1,
            message: '获取新闻列表成功',
            data: results
        })
    })
}

// 更新发布状态
exports.publish = (req, res) => {
    const sqlStr = 'update news set isPublish=? , editTime=? where id=?'
    const { id, isPublish } = req.body
    db.query(sqlStr, [isPublish, new Date(), id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新失败')
        res.send({
            code: 1,
            message: '更新成功'
        })
    })
}

// 删除新闻
exports.delete = (req, res) => {
    const sqlStr = 'delete from news where id=?'
    const id = req.params.id
    db.query(sqlStr, id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除失败')
        res.send({
            code: 1,
            message: '删除成功'
        })
    })
}

// 获取新闻信息
exports.info = (req, res) => {
    const id = req.params.id
    const sqlStr = 'select * from news where id=?'
    db.query(sqlStr, id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取新闻信息失败')
        res.send({
            code: 1,
            message: '获取新闻信息成功',
            data: results
        })
    })
}

// 更新新闻信息
exports.update = (req, res) => {
    const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
    const { title, content, category, isPublish, id } = req.body

    // 数据库查询语句
    let sqlStr
    // 查询数组
    let uploadArr
    if (cover) {
        sqlStr = 'update news set title=?,content=?,category=?,cover=?,isPublish=?,editTime=? where id=?';
        uploadArr = [title, content, category, cover, isPublish, new Date(), id]
    } else {
        sqlStr = 'update news set title=?,content=?,category=?,isPublish=?,editTime=? where id=?';
        uploadArr = [title, content, category, isPublish, new Date(), id]
    }
    db.query(sqlStr, uploadArr, (err, results) => {
        if (err) res.cc(err)
        if (results.affectedRows !== 1) res.cc('更新失败')
        if (cover) {
            res.send({
                code: 1,
                message: '更新成功'
            })
        } else {
            res.send({
                code: 1,
                message: '更新成功'
            })
        }
    })
}