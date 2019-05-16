// DB 테이블 생성

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    nickname : {
      type : DataTypes.STRING(20), // 데이터 타입
      allowNull : false, // Null 여부
    },
    userId : {
      type : DataTypes.STRING(20),
      allowNull: false,
      unique : true // 고유한 값 여부
    },
    password : {
      type : DataTypes.STRING(100),
      allowNull : false,
    },
  }, {
    charset : "utf8",
    collate : "utf8-_general_ci" // 한글 저장
  });

  // 테이블간의 관계 정의
  User.associate = (db) => {
    db.User.hasMany(db.Post, {as : "Post"}); // 관계가 중복될 경우 이름을 정해주어야 한다.
    db.User.hasMany(db.Comment);

    db.User.belongsToMany(db.Post, { through : "Like", as : "Liked" });
    db.User.belongsToMany(db.User, { through : "Follow", as : "Followers" });
    db.User.belongsToMany(db.User, { through : "Follow", as : "Followings" });
  };

  return User;
};

