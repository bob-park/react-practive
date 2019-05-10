import React from "react";
import Proptype from "prop-types";

import { Card, Avatar } from "antd";

const UserProfile = ({ dummy }) => {
  return (
    <Card
      style={{ padding: "10px" }}
      actions={[
        <div key="twit">
          짹짹 <br /> {dummy.Post.length}
        </div>,
        <div key="twit">
          팔로잉 <br /> {dummy.Followings.length}
        </div>,
        <div key="twit">
          팔로워 <br /> {dummy.Followers.length}
        </div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
        title={dummy.nickname}
      />
    </Card>
  );
};

UserProfile.propTypes = {
  dummy : Proptype.object
};


export default UserProfile;
