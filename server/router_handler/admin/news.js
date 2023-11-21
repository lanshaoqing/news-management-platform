const db = require('../../db/index')

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