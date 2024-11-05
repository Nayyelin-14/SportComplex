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

import { useDispatch, useSelector } from "react-redux";
import { updateInfo } from "../../apiEndpoints/auth";
import { setUser } from "../../store/userSlice";
import { PlusOutlined, WarningOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  AtSymbolIcon,
  PhoneIcon,
  PhotoIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

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

  // Update file list on file change (only allow one file)
  const handleChange = ({ fileList }) => {
    setFileList(fileList.slice(-1)); // Keep only the last uploaded file
  };

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

      // Add the image file to formData if any
      if (fileList.length > 0) {
        formData.append("profileImage", fileList[0].originFileObj); // Only append the first image
      }

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

        // Clear fileList after successful update
        setFileList([]); // Clear the uploaded photo
        form.resetFields(); // Optionally reset the form fields
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
        <Form.Item
          label={
            <p className="font-medium sm:text-[15px] md:text-[16px] lg:text-[17px] flex items-center gap-2">
              <PhotoIcon width={20} height={20} /> Upload Image
            </p>
          }
        >
          <Upload
            className="border-2 w-fit border-black"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false} // Prevent automatic upload
            maxCount={1} // Allow only one file
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
          label={
            <p className="font-medium sm:text-[15px] md:text-[16px] lg:text-[17px]">
              ID
            </p>
          }
          name="memberid"
          rules={[{ required: true, message: "Enter valid ID" }]}
        >
          <Input
            placeholder="enter id..."
            type="number"
            className="border-black sm:text-[16px] md:text-[17px] lg:text-[18px] font-medium"
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Enter password",
            },
          ]}
          label={
            <p className="font-medium sm:text-[15px] md:text-[16px] lg:text-[17px] flex items-center gap-2">
              <UserIcon height={20} width={20} /> Username
            </p>
          }
          name="username"
        >
          <Input
            placeholder="username..."
            className="border-black sm:text-[16px] md:text-[17px] lg:text-[18px] font-medium"
          />
        </Form.Item>

        <Form.Item
          label={
            <p className="font-medium sm:text-[15px] md:text-[16px] lg:text-[17px] flex items-center gap-2">
              <PhoneIcon width={19} height={19} /> Phone Number
            </p>
          }
          name="phnumber"
          rules={[{ required: true, message: "Enter valid phone number" }]}
        >
          <Input
            placeholder="phnumber..."
            type="number"
            className="border-black sm:text-[16px] md:text-[17px] lg:text-[18px] font-medium"
          />
        </Form.Item>

        <Form.Item
          label={
            <p className="font-medium sm:text-[15px] md:text-[16px] lg:text-[17px] flex items-center gap-2">
              <AtSymbolIcon width={20} height={20} /> Email
            </p>
          }
          name="email"
          rules={[
            { required: true, type: "email", message: "Enter valid email" },
          ]}
        >
          <Input
            placeholder="email..."
            className="border-black sm:text-[16px] md:text-[17px] lg:text-[18px] font-medium"
          />
        </Form.Item>

        <Form.Item className="text-center">
          <Button
            className="bg-red-900 p-5 text-white text-[17px] font-semibold w-full"
            htmlType="submit"
            disabled={isWarning}
          >
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
