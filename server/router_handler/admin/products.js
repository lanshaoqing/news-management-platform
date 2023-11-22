const db = require('../../db/index')

// 添加产品
exports.add = (req, res) => {
    const { title, introduction, detail } = req.body
    const cover = req.file ? `/productsuploads/${req.file.filename}` : ''
    const sqlStr = 'insert into products set ?'
    db.query(sqlStr, { title, introduction, detail, cover, editTime:new Date() }, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('添加失败')
        res.send({
            code: 1,
            message: '添加成功'
        })
    })
}