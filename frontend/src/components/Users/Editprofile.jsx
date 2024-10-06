import React, { useState } from "react";
import { Card, Avatar, Button, Form, Input, Row, Col, message } from "antd";
import { useSelector } from "react-redux";
const Editprofile = ({ setIsEditing, isEditing }) => {
  const [form] = Form.useForm();
  console.log(isEditing);
  const { user } = useSelector((state) => state.user);
  //   const [isEditing, setIsEditing] = useState(false);
  const cancelButton = () => {
    setIsEditing(false);
  };
  const onFinish = () => {};
  return (
    <div>
      <Form form={form} onFinish={onFinish} className="mt-4">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="username" label="Username">
              <Input placeholder="Enter your username" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" label="Email">
              <Input placeholder="Enter your email" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="phone" label="Phone">
              <Input placeholder="Enter your phone number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="address" label="Address">
              <Input placeholder="Enter your address" />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" className="mr-2">
          Save Changes
        </Button>
        <Button type="default" onClick={cancelButton}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default Editprofile;
