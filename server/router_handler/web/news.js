const db = require('../../db/index')

// 获取已发布的新闻列表信息
exports.list = (req, res) => {
    // const sqlStr = 'select * from news order by editTime desc where isPublish=?'
    const sqlStr = 'select * from news where isPublish=? order by editTime desc'
    const isPublish = 1//代表已经发布的
    db.query(sqlStr, isPublish, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            code: 1,
            message: '获取新闻列表成功',
            data: results
        })
    })
}

// 获取新闻信息
exports.info = (req, res) => {
    const id = req.params.id
    const isPublish = 1
    const sqlStr = 'select * from news where id=? and isPublish=?  order by editTime desc'
    db.query(sqlStr, [id, isPublish], (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取新闻信息失败')
        res.send({
            code: 1,
            message: '获取新闻成功',
            data: results
        })
    })
}