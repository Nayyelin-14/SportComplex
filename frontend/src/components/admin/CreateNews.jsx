import React, { useState, useEffect } from "react";
import { addNews, getAllNews } from "../../apiEndpoints/admin";
import { Button, Form, Input, message, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { PlusOutlined } from "@ant-design/icons";

const CreateNews = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [allNews, setAllNews] = useState([]);

  // Fetch all news on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getAllNews();
        if (response.isSuccess) {
          setAllNews(response.news);
        } else {
          message.error("Failed to fetch news");
        }
      } catch (error) {
        message.error("Error fetching news");
      }
    };
    fetchNews();
  }, []);

  // Handle preview of the uploaded image
  const handlePreview = async (file) => {
    setPreviewImage(file.thumbUrl || file.preview);
  };

  // Restrict the file list to one image
  const handleChange = ({ fileList }) => {
    setFileList(fileList.slice(-1));
  };

  // Handle form submission
  const onFinishHandler = async (values) => {
    try {
      if (fileList.length === 0) {
        message.error("Please upload an image.");
        return;
      }

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("detail", values.detail);
      formData.append("featuredline", values.featuredline);
      formData.append("profileImage", fileList[0].originFileObj); // Ensure you are passing the file here

      setIsUploading(true);

      const response = await addNews(formData);

      if (response.isSuccess) {
        message.success("News added successfully!");
        form.resetFields();
        setFileList([]);
        setPreviewImage(null);
        setAllNews((prev) => [response.newsItem, ...prev]);
      } else {
        message.error(response.message || "Failed to add news.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while submitting the news.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinishHandler}
        encType="multipart/form-data"
      >
        <Form.Item
          label={
            <p className="text-sm md:text-base flex items-center gap-2">
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
            name="profileImage"
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
          label={<p className="text-sm md:text-base">Title</p>}
          name="title"
          rules={[{ required: true, message: "Please enter the title." }]}
        >
          <Input
            placeholder="Enter news title..."
            className="border-black text-sm md:text-base font-medium"
          />
        </Form.Item>

        <Form.Item
          label={<p className="text-sm md:text-base">Featured Line</p>}
          name="featuredline"
          rules={[
            { required: true, message: "Please enter the featured line." },
          ]}
        >
          <Input
            placeholder="Enter featured line..."
            className="border-black text-sm md:text-base font-medium"
          />
        </Form.Item>

        <Form.Item
          label={<p className="text-sm md:text-base">Details</p>}
          name="detail"
          rules={[{ required: true, message: "Please enter the details." }]}
        >
          <TextArea
            rows={4}
            placeholder="Enter news details..."
            className="border-black text-sm md:text-base font-medium"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-500 w-full text-white"
            loading={isUploading}
          >
            {isUploading ? "Uploading..." : "Add News"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateNews;
