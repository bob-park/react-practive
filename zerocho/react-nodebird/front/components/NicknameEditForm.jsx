import React from "react";
import { Form, Input, Button } from "antd";

const NicknameEditForm = () =>{
    return (
        <Form
            style={{
                marginBottom: "20px",
                border: "1px solid #d0d0d0",
                padding: "20px"
            }}
        >
            <Input addonBefore="닉네임" />
            <Button type="primary">수정</Button>
        </Form>
    )
}

export default NicknameEditForm;