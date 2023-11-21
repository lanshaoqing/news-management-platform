
// 封装token工具
const jsonwebtoken = require('jsonwebtoken')
// 解密密钥
const secret = 'VUENODE'
const JWT = {
    // 加密函数
    generate(value, expires) {
        return jsonwebtoken.sign(value, secret, { expiresIn: expires })
        // 定义value：加密，secret：密钥，expiresIn：过期时间
    },
    // 解密函数
    verify(token) {
        try { return jsonwebtoken.verify(token, secret) }
        catch (err) { return false }

    }
}
module.exports = JWT