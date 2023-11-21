const db = require('../../db/index')
// 添加新闻
exports.add = (req, res) => {
    const { title, content, category, isPublish } = req.body
    const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
    const editTime = new Date()
    const sqlStr = 'insert into news set ?'
    db.query(sqlStr, { title, content, category, cover, isPublish, editTime }, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('添加失败')
        res.send({
            code: 1,
            message: '添加成功'
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