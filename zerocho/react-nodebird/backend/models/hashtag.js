// DB 테이블 생성

module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define("Hashtag", {
    name : {
      type : DataTypes.STRING(20),
      allowNull : false,
    }
  }, {
    charset : "utf8mb4",
    collate : "utf8mb4-_general_ci" // 한글 저장
  });

  // 테이블간의 관계 정의
  Hashtag.associate = (db) => {
    // N : M
    // 무조건 하나의 관계 테이블이 생성
    // 관계 테이블의 이름은 through 에서 설정
    db.Hashtag.belongsToMany(db.Post, {
      through : "PostHashtag"
    });
  };

  return Hashtag;
};