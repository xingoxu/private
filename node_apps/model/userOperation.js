/**
 * Created by xingo on 2016/12/07.
 */
var curryPromise = require('./curryPromise');

var SQLQuotes = {
        byName: 'SELECT * FROM user WHERE username=?',
        byID: 'SELECT * FROM user WHERE userid=?',
        getFollowNumber: 'SELECT count(*) as count FROM follow WHERE userid=?',
        getFansNumber: 'SELECT count(*) as count FROM follow WHERE followingid=?',
        getWeiboNumber: 'SELECT count(*) as count FROM weibo WHERE userid=?',
        register: 'INSERT INTO user (username,password,mail) VALUES (?,?,?)',
        getUserFollowingIDs: 'SELECT * FROM follow WHERE userid=?',
        getFollowerUsers: 'SELECT * FROM follow WHERE followingid=?',
        getSearchUsers: 'SELECT * FROM user WHERE username like ?',
        updateUser: 'UPDATE user SET username=? ,intro=? ,area=? ,birthday=? ,mail=? WHERE userid=?',
        updatePassword: 'UPDATE user SET password=? WHERE userid=?',
        deleteWeibo: 'DELETE FROM weibo WHERE weiboid=?',
        updateAvatar: 'UPDATE user SET avatar=? WHERE userid=?',
        setUserForbidden: 'UPDATE user SET hasForbidden=? WHERE userid=?',
    },
    userOperation = {
        getUserByName: curryPromise(SQLQuotes.byName),
        getUserByID: curryPromise(SQLQuotes.byID),
        getFollowNumber: curryPromise(SQLQuotes.getFollowNumber),
        getFansNumber: curryPromise(SQLQuotes.getFansNumber),
        getWeiboNumber: curryPromise(SQLQuotes.getWeiboNumber),
        register: curryPromise(SQLQuotes.register),
        getUserFollowingIDs: curryPromise(SQLQuotes.getUserFollowingIDs),
        getFollowerUsers: curryPromise(SQLQuotes.getFollowerUsers),
        getSearchUsers: curryPromise(SQLQuotes.getSearchUsers),
        updateUser: curryPromise(SQLQuotes.updateUser),
        updatePassword: curryPromise(SQLQuotes.updatePassword),
        deleteWeibo: curryPromise(SQLQuotes.deleteWeibo),
        updateAvatar: curryPromise(SQLQuotes.updateAvatar),
        setUserForbidden: curryPromise(SQLQuotes.setUserForbidden),
    };
module.exports = userOperation;