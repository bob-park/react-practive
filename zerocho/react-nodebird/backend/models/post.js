module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    content: {
      type : DataTypes.TEXT,
      allowNull : false
    }
  }, {
    charset : "utf8", // 한글 + 이모티콘
    collate : "utf8_general_ci" // 한글 저장
  });

  // 테이블간의 관계 정의
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // N : 1
    db.Post.hasMany(db.Comment); // 1 : N
    db.Post.hasMany(db.Image);

    db.Post.belongsTo(db.Post, { as : "Retweet" } );
    db.Post.belongsToMany(db.Hashtag, { through : "PostHashtag", as : "Posthashtag" } );
    db.Post.belongsToMany(db.User, { through : "Like" , as : "Likers"} );
  };

  return Post;
};