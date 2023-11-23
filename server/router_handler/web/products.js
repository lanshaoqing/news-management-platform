const db = require('../../db/index')

// 获取产品列表
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

