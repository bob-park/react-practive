module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    type : DataTypes.TEXT,
    allowNull : false,
  }, {
    charset : "utf8mb4", // 한글 + 이모티콘
    collate : "utf8mb4-_general_ci" // 한글 저장
  });

  // 테이블간의 관계 정의
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };

  return Comment;
};