const db = require('../../db/index')

// 添加产品
exports.add = (req, res) => {
    const { title, introduction, detail } = req.body
    const cover = req.file ? `/productsuploads/${req.file.filename}` : ''
    const sqlStr = 'insert into products set ?'
    db.query(sqlStr, { title, introduction, detail, cover, editTime: new Date() }, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('添加失败')
        res.send({
            code: 1,
            message: '添加成功'
        })
    })
}

// 获取产品列表信息
exports.list = (req, res) => {
    const sqlStr = 'select * from products order by editTime desc'
    db.query(sqlStr, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            code: 1,
            message: '获取产品列表成功',
            data: results
        })
    })
}

// 删除产品
exports.delete = (req, res) => {
    const sqlStr = 'delete from products where id=?'
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

// 获取产品信息
exports.info = (req, res) => {
    const id = req.params.id
    const sqlStr = 'select * from products where id=?'
    db.query(sqlStr, id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取产品信息失败')
        res.send({
            code: 1,
            message: '获取产品信息成功',
            data: results
        })
    })
}

// 更新产品信息
exports.update = (req, res) => {
    const cover = req.file ? `/productsuploads/${req.file.filename}` : ''
    const { title, introduction, detail, id } = req.body
    // 数据库查询语句
    let sqlStr
    // 查询数组
    let uploadArr
    if (cover) {
        sqlStr = 'update products set title=?,introduction=?,detail=?,cover=?,editTime=? where id=?';
        uploadArr = [title, introduction, detail, cover, new Date(), id]
    } else {
        sqlStr = 'update products set title=?,introduction=?,detail=?,editTime=? where id=?';
        uploadArr = [title, introduction, detail, new Date(), id]
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