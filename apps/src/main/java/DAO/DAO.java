package DAO;

import com.google.gson.Gson;
import config.mysql;

import java.sql.*;
import java.util.ArrayList;

import dataObject.*;

/**
 * Created by xingo on 2016/11/28.
 */
public class DAO {
    public static Connection getConnection() throws ClassNotFoundException, SQLException {
        Class.forName(mysql.DRIVER_MYSQL);     //加载JDBC驱动
        return DriverManager.getConnection(mysql.URL);    //创建数据库连接对象
    }

    public static ResultSet query(String sql) {
        ResultSet result = null;
        try {
            result = getConnection().createStatement().executeQuery(sql);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public static int insert(String sql) {
        try {
            Statement statement = getConnection().createStatement();
            statement.executeUpdate(sql, Statement.RETURN_GENERATED_KEYS);
            ResultSet rs = statement.getGeneratedKeys();  //得到新插入记录的自增主键
            rs.next();
            return rs.getInt(1);
        } catch (SQLException e) {
            System.out.println("插入数据库时出错：");
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println("插入时出错：");
            e.printStackTrace();
        }
        return 0;
    }

    public static void main(String[] args) {

    }

    public static int update(String sql) {
        return insert(sql);
    }

    public static boolean delete(String sql) {
        try {
            Statement statement = getConnection().createStatement();
            statement.executeUpdate(sql);
            return true;
        } catch (SQLException e) {
            System.out.println("插入数据库时出错：");
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println("插入时出错：");
            e.printStackTrace();
        }
        return false;
    }

    public static User getUser(ResultSet dbResult) {
        if (dbResult == null)
            return null;
        User user = new User();
        try {
            dbResult.next();
            user.userid = dbResult.getInt("userid");
            user.username = dbResult.getString("username") + "";
            user.intro = dbResult.getString("intro") + "";
            user.avatar = dbResult.getString("avatar") + "";
            user.area = dbResult.getString("area") + "";
            user.birthday = dbResult.getString("birthday") + "";
            user.mail = dbResult.getString("mail") + "";
        } catch (Exception e) {
            return null;
        }
        return user;
    }

    public static User getUser(int userid) {
        String sql = "SELECT * FROM user WHERE userid=" + userid;
        return getUser(query(sql));
    }

    public static User getUser(String name) {
        name = name.replace("'", "\\'");
        String sql = "SELECT * FROM user WHERE username=subString('" + name + "',1)";
        return getUser(query(sql));
    }

    public static UserCard getUserCard(User queryUser) {
        if (queryUser == null)
            return null;

        UserCard user = new UserCard();
        user.userid = queryUser.userid;
        user.username = queryUser.username;
        user.intro = queryUser.intro;
        user.avatar = queryUser.avatar;

        String queryFollow = "SELECT count(*) FROM follow WHERE userid=" + user.userid;
        String queryFans = "SELECT count(*) FROM follow WHERE followingid=" + user.userid;
        String queryWeibo = "SELECT count(*) FROM weibo WHERE userid=" + user.userid;
        try {
            ResultSet followData = query(queryFollow);
            followData.next();
            user.following = followData.getInt(1);
            ResultSet fanData = query(queryFans);
            fanData.next();
            user.fans = fanData.getInt(1);
            ResultSet weiboNumberData = query(queryWeibo);
            weiboNumberData.next();
            user.weibo = weiboNumberData.getInt(1);
        } catch (Exception e) {
            return null;
        }

        return user;
    }

    public static UserCard getUserCard(int userid) {
        return getUserCard(getUser(userid));
    }

    public static UserCard getUserCard(String name) {
        return getUserCard(getUser(name));
    }

    //返回userid
    public static int register(String json) {
        registerObject registerObject = (new Gson()).fromJson(json, registerObject.class);
        try {
            PreparedStatement statement = getConnection().prepareStatement("INSERT INTO user (username,password,email) VALUES (?,?,?)");
            statement.setString(1, registerObject.name);
            statement.setString(2, registerObject.password);
            statement.setString(3, registerObject.email);
            statement.executeUpdate();
            ResultSet resultSet = query("select last_insert_id() as userid");
            resultSet.next();
            return resultSet.getInt(1);
        } catch (Exception e) {
            return 0;
        }
//        return true;
    }

    //operationResponse
    public static operationResponse login(String name, String password) {
        User user = getUser(name);
        if (user == null)
            return new operationResponse(false, "没有此用户");
        String sql = "SELECT * FROM user WHERE userid=" + user.userid;
        ResultSet resultSet = query(sql);
        try {
            resultSet.next();
            String resultPassword = resultSet.getString("password");
            if (!resultPassword.equals(password))
                return new operationResponse(false, "密码错误");
        } catch (Exception e) {

        }
        return new operationResponse(true, user.userid);
    }

    //返回weiboid
    public static int newWeibo(String json) {
        singleWeibo weibo = (new Gson()).fromJson(json, singleWeibo.class);
        String sql;
        if (weibo.forward_weiboid == 0)
            sql = "INSERT INTO weibo (userid,text,time) VALUES (" + weibo.user.userid + ",'" + weibo.text + "'," + weibo.time + ")";
        else
            sql = "INSERT INTO weibo (userid,text,time,forward_weiboid) VALUES (" + weibo.user.userid + ",'" + weibo.text + "'," + weibo.time + "," + weibo.forward_weiboid + ")";
        int weiboid = insert(sql);
        if (weibo.ats != null && weibo.ats.length > 0) {
            at(weibo.ats, weibo.user.userid, weiboid, weibo.time);
        }
        return weiboid;
    }

    //返回commentid
    public static int newComment(String json) {
        singleComment comment = (new Gson()).fromJson(json, singleComment.class);
        String sql;
        if (comment.comment_commentid == 0)
            sql = "INSERT INTO comments (userid,text,time,weiboid) VALUES (" + comment.user.userid + ",'" + comment.text + "'," + comment.time + "," + comment.weiboid + ")";
        else
            sql = "INSERT INTO comments (userid,text,time,weiboid,comment_commentid) VALUES (" + comment.user.userid + ",'" + comment.text + "'," + comment.time + "," + comment.weiboid + "," + comment.comment_commentid + ")";
        int commentid = insert(sql);
        if (comment.ats != null && comment.ats.length > 0) {
            at(comment.ats, comment.user.userid, commentid, comment.time);
        }
        return commentid;
    }

    public static void newSpam(String json) { //用singleWeibo 数据结构 传入spam所需数据，user为举报人user
        singleWeibo spam = (new Gson()).fromJson(json, singleWeibo.class);
        String sql = "INSERT INTO spam (userid,weiboid,text) VALUES(" + spam.user.userid + "," + spam.weiboid + ",'" + spam.text + "')";
        insert(sql);
    }

    public static void at(int userid, int weiboid, int target_userid, int time) {
        String sql = "INSERT INTO at (userid,weiboid,target_userid,time) VALUES(" + userid + "," + weiboid + "," + target_userid + "," + time + ")";
        insert(sql);
    }

    public static void at(int userid, int weiboid, String username, int time) {
        User user = getUser(username);
        if (user == null)
            return;
        at(userid, weiboid, user.userid, time);
    }

    public static void at(String[] ats, int userid, int weiboid, int time) {
        for (int i = 0; i < ats.length; i++) {
            at(userid, weiboid, ats[i], time);
        }
    }

    public static void follow(int userid, int followingid, int time) {
        String sql = "INSERT INTO follow (userid,followingid,time) VALUES(" + userid + "," + followingid + "," + time + ")";
        insert(sql);
    }

    public static void follow(String json) {
        operationRequest request = (new Gson()).fromJson(json, operationRequest.class);
        follow(request.userid, request.target_userid, request.time);
    }

    public static void favourite(String json) {
        operationRequest request = (new Gson()).fromJson(json, operationRequest.class);
        String sql = "INSERT INTO favourite (userid,weiboid,time) VALUES(" + request.userid + "," + request.weiboid + "," + request.time + ")";
    }

    //返回likeid
    public static int newLike(String json) {
        operationRequest like = (new Gson()).fromJson(json, operationRequest.class);
        String sql;
        if (like.weiboid != 0)
            sql = "INSERT INTO like (userid,weiboid,time) VALUES (" + like.userid + "," + like.weiboid + "," + like.time + ")";
        else
            sql = "INSERT INTO like (userid,commentid,time) VALUES (" + like.userid + "," + like.commentid + "," + like.time + ")";

        return insert(sql);
    }

    public static void cancelLike(String json) {
        operationRequest like = (new Gson()).fromJson(json, operationRequest.class);
        String sql;
        if (like.weiboid != 0)
            sql = "DELETE FROM like WHERE userid=" + like.userid + " AND weiboid=" + like.weiboid;
        else
            sql = "DELETE FROM like WHERE userid=" + like.userid + " AND commentid=" + like.commentid;

        delete(sql);
    }

    public static singleWeibo[] getSingleWeibos(ResultSet weiboResult) {
        ArrayList<singleWeibo> singleWeiboArrayList = new ArrayList<>(0);
        if (weiboResult == null)
            return null;
        int weiboUserid = 0;
        try {
            while(weiboResult.next()){
                singleWeibo singleWeibo = new singleWeibo();
                singleWeibo.weiboid = weiboResult.getInt("weiboid");
                singleWeibo.text = weiboResult.getString("text");
                singleWeibo.forward_weiboid = weiboResult.getInt("forward_weiboid");
                singleWeibo.time = Integer.parseInt(weiboResult.getString("time"));
                weiboUserid = weiboResult.getInt("userid");
                singleWeibo.user = getUserCard(weiboUserid);
                if (singleWeibo.forward_weiboid != 0)
                    singleWeibo.forwardWeibo = getSingleWeibo(singleWeibo.forward_weiboid);
                singleWeiboArrayList.add(singleWeibo);
            }
        } catch (Exception e) {
            return null;
        }

        int length = singleWeiboArrayList.size();
        singleWeibo[] singleWeiboReturn = new singleWeibo[length];
        for (int i = 0;i<length;i++){
            singleWeiboReturn[i]= singleWeiboArrayList.get(i);
        }
        return singleWeiboReturn;
    }

    public static singleWeibo getSingleWeibo(ResultSet weiboResult) {
        if (weiboResult == null)
            return null;
        singleWeibo singleWeibo = new singleWeibo();
        int weiboUserid = 0;
        try {
            weiboResult.next();
            singleWeibo.weiboid = weiboResult.getInt("weiboid");
            singleWeibo.text = weiboResult.getString("text");
            singleWeibo.forward_weiboid = weiboResult.getInt("forward_weiboid");
            singleWeibo.time = Integer.parseInt(weiboResult.getString("time"));
            weiboUserid = weiboResult.getInt("userid");
        } catch (Exception e) {
            return null;
        }
        singleWeibo.user = getUserCard(weiboUserid);
        if (singleWeibo.forward_weiboid != 0)
            singleWeibo.forwardWeibo = getSingleWeibo(singleWeibo.forward_weiboid);
        return singleWeibo;
    }

    public static singleWeibo getSingleWeibo(int weiboid) {
        String sql = "SELECT * FROM weibo WHERE weiboid=" + weiboid;
        return getSingleWeibo(query(sql));
    }

    public static boolean getFavourited(int userid, int weiboid) {
        String sql = "SELECT count(*) FROM favourite WHERE weiboid=" + weiboid + " AND userid" + userid;
        ResultSet resultSet = query(sql);
        if (resultSet == null)
            return false;
        try {
            int count = resultSet.getInt(1);
            return count > 0;
        } catch (Exception e) {
        }
        return false;
    }

    public static boolean getLiked(int userid, int id, boolean isComment) {
        String sql = "SELECT count(*) FROM like WHERE weiboid=" + id + " AND userid" + userid;
        if (isComment)
            sql = "SELECT count(*) FROM like WHERE commentid=" + id + " AND userid" + userid;
        ResultSet resultSet = query(sql);
        if (resultSet == null)
            return false;
        try {
            int count = resultSet.getInt(1);
            return count > 0;
        } catch (Exception e) {
        }
        return false;
    }

    public static int getCount(ResultSet resultSet) {
        if (resultSet == null)
            return 0;
        try {
            int count = resultSet.getInt(1);
            return count;
        } catch (Exception e) {
        }
        return 0;
    }

    public static int getForwardCount(int weiboid) {
        String sql = "SELECT count(*) FROM weibo WHERE forward_weiboid=" + weiboid;
        return getCount(query(sql));
    }

    public static int getLikeCount(int weiboid, boolean isComment) {
        String sql = "SELECT count(*) FROM like WHERE weiboid=" + weiboid;
        if (isComment)
            sql = "SELECT count(*) FROM like WHERE commentid=" + weiboid;
        return getCount(query(sql));
    }

    public static int getCommentCount(int weiboid) {
        String sql = "SELECT count(*) FROM comments WHERE weiboid=" + weiboid;
        return getCount(query(sql));
    }
    public static int[] getUserFollowingIDs(int userid){
        String sql = "SELECT * from follow WHERE userid="+userid;
        ResultSet resultSet = query(sql);
        ArrayList<Integer> list = new ArrayList<>(0);
        try{
            while(resultSet.next()){
                list.add(resultSet.getInt("followingid"));
            }
        }catch(Exception e){

        }
        int length = list.size();
        int[] returnInt = new int[length];
        for (int i = 0;i<length;i++){
            returnInt[i] = (int)list.get(i);
        }
        return returnInt;
    }

    public static singleWeibo[] indexTimeline(int userid){
        int[] followingIDs =  getUserFollowingIDs(userid);
        String queryid = "";
        for (int i = 0;i<followingIDs.length;i++){
            queryid+=followingIDs[i];
            if (i!=followingIDs.length-1){
                queryid+=",";
            }
        }
        String sql = "SELECT * from weibo WHERE userid IN("+queryid+") order by time+0 desc";
        return getSingleWeibos(query(sql));
    }


}