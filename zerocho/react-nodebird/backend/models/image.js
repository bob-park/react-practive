// DB 테이블 생성

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("Image", {
    src: {
      type : DataTypes.STRING(200),
      allowNull : false,
    }
  }, {
    charset : "utf8", // 한글 + 이모티콘
    collate : "utf8_general_ci" // 한글 저장
  });

  // 테이블간의 관계 정의
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };

  return Image;
};