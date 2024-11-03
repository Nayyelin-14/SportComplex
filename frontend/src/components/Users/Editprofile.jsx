import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Button,
  Form,
  Input,
  Select,
  message,
  Upload,
} from "antd";
import "./TabBars.css";
import { useDispatch, useSelector } from "react-redux";
import { updateInfo } from "../../apiEndpoints/auth";
import { setUser } from "../../store/userSlice";
import { PlusOutlined, WarningOutlined } from "@ant-design/icons";
import moment from "moment";

const EditProfile = () => {
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.user);
  const [isWarning, setIsWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  // Handle preview of the uploaded image
  const handlePreview = async (file) => {
    setPreviewImage(file.thumbUrl || file.preview);
  };

  // Update file list on file change
  const handleChange = ({ fileList }) => setFileList(fileList);

  // Handle edit warning logic
  useEffect(() => {
    if (user?.lastEditTime) {
      const now = moment();
      const lastEditTime = moment(user.lastEditTime);
      const timeDifference = now.diff(lastEditTime, "minutes");

      if (timeDifference < 1) {
        setIsWarning(true);
        const timer = setTimeout(() => {
          setIsWarning(false);
        }, 60000); // Reset warning after 1 minute

        return () => clearTimeout(timer); // Cleanup timeout
      } else {
        setIsWarning(false); // Reset warning if more than 1 minute has passed
      }
    }
  }, [user]);

  const onFinishHandler = async (values) => {
    try {
      const formData = new FormData();

      // Add image files to formData if any
      fileList.forEach((file) => {
        formData.append("profileImage", file.originFileObj);
      });

      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("memberid", values.memberid);
      formData.append("phnumber", values.phnumber);

      setLoading(true); // Set loading state
      const response = await updateInfo(formData);

      if (response.isSuccess) {
        message.success(response.message);
        dispatch(setUser(response.update_userDoc));
        console.log(response.update_userDoc);
      }
    } catch (error) {
      message.error(error.message); // Fixed: use error.message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Update the form fields when user data changes
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        email: user.email,
        username: user.username,
        memberid: user.memberID || "",
        phnumber: user.phnumber,
      });
    }
  }, [user, form]);

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinishHandler}
        encType="multipart/form-data"
      >
        <Form.Item label="Upload Images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false} // Prevent automatic upload
            multiple
          >
            {fileList.length < 1 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        {previewImage && (
          <div style={{ marginTop: 20 }}>
            <img
              src={previewImage}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "contain",
              }}
            />
          </div>
        )}

        <Form.Item
          label="ID"
          name="memberid"
          rules={[{ required: true, message: "Enter valid ID" }]}
        >
          <Input placeholder="enter id..." type="number" />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Enter username" }]}
        >
          <Input placeholder="username..." />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phnumber"
          rules={[{ required: true, message: "Enter valid phone number" }]}
        >
          <Input placeholder="phnumber..." type="number" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, type: "email", message: "Enter valid email" },
          ]}
        >
          <Input placeholder="email..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isWarning}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Form.Item>
      </Form>

      {user?.lastEditTime && isWarning && (
        <div className="flex gap-2 items-center">
          <WarningOutlined className="text-red-700" />
          <p className="text-red-600 text-sm">
            You edited {moment(user.lastEditTime).startOf("minute").fromNow()}{" "}
            and you have to wait 1 minute to edit your profile again.
          </p>
        </div>
      )}
    </div>
  );
};

export default EditProfile;

{
  /* <Form.Item
          layout="vertical"
          className="font-semibold w-[200px]"
          label=<p className="text-[19px] font-semibold">Role</p>
          name="role"
          rules={[{ required: true, message: "Select role" }]}
          hasFeedback
        >
          <Select
            placeholder="Select a role"
            className="w-[100%] h-[50px] text-[17px] border-red-900 border-2"
          >
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="Student">Student</Select.Option>
            <Select.Option value="Lecturer">Lecturer</Select.Option>
            <Select.Option value="Outsider">Outsider</Select.Option>
          </Select>
        </Form.Item> */
}
