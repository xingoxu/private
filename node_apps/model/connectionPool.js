/**
 * Created by xingo on 2016/12/07.
 */
module.exports = (function () {
    var mysql = require('mysql'),
        conf = require('../config/mysql'),
        connectionPool = mysql.createPool(conf);
    return connectionPool;
})();