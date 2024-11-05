import { Form, Input, Button, message, Checkbox, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { create_Booking } from "../../apiEndpoints/booking";
import {
  resetSelectedTime,
  resetSportType,
  setSportType,
} from "../../store/bookingSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import photo from "../../../mfu.jpg"

const trainers = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "199",
  },
  {
    id: 2,
    name: "Kyaw G",
    email: "KyawG@gmail.com",
    phone: "199",
  },
];

const BookingForm = () => {
  const { selectedTime } = useSelector((state) => state.booking);
  const { SportType } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.user);
  const [checked, setChecked] = useState(false);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const handleSelectTrainer = (e) => {
    setSelectedTrainer(e.target.value);
  };

  const onFinishHandler = async (values) => {
    try {
      const response = await create_Booking(values);
      if (response.isSuccess) {
        message.success(response.message);
        navigate("/booking");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(resetSelectedTime());
      dispatch(resetSportType());
    }
  };

  const useInfo = (e) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      form.setFieldsValue({
        studentid: user.memberID || "",
        name: user.username || "",
        phone: user.phnumber || "",
      });
    } else {
      form.setFieldsValue({
        studentid: "",
        name: "",
        phone: "",
      });
    }
  };

  return (
    <section className="container px-4 py-6 md:py-10 md:px-16 lg:px-24">
      <h3 className="text-2xl md:text-2xl font-semibold text-center md:mb-6">
        Sport Complex Booking ({SportType})
      </h3>
      <div className="container rounded-xl shadow-lg py-8">
      <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12 max-w-2xl mx-auto py-5">
        <div className="w-full">
          <Form
            layout="vertical"
            onFinish={onFinishHandler}
            form={form}
            initialValues={{
              sporttype: SportType || "Tennis",
              status: user ? user.status : "active",
              studentid: "",
              name: "",
              phone: "",
              session: selectedTime || "8:00 - 10:00",
              role: user ? user.role : "Student",
              useLoginInfo: false,
            }}
          >
            <div className="flex flex-col md:flex-row md:gap-6">
              <Form.Item className="w-full" label="Sport Type" name="sporttype">
                <Input
                  className="w-full"
                  value={SportType || "Tennis"}
                  placeholder={SportType || "Tennis"}
                  disabled
                />
              </Form.Item>
              <Form.Item className="w-full" label="Session" name="session">
                <Input
                  className="w-full"
                  value={selectedTime}
                  placeholder={selectedTime}
                  disabled
                />
              </Form.Item>
            </div>

            <div className="flex flex-col md:flex-row md:gap-6 mt-4">
              <Form.Item className="w-full" label="Role" name="role">
                <select className="w-full border-2 border-red-700 cursor-pointer rounded-md">
                  <option value="student">Student</option>
                  <option value="Staff">Staff</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="outsider">Outsider</option>
                </select>
              </Form.Item>
              <Form.Item className="w-full" label="Status" name="status">
                <Input
                  className="w-full"
                  value={user.status}
                  placeholder={user.status}
                  disabled
                />
              </Form.Item>
            </div>

            <Form.Item
              className="mt-4"
              label="Student ID"
              name="studentid"
              rules={[{ required: true, message: "Enter your student id" }]}
            >
              <Input className="w-full" type="number" />
            </Form.Item>

            <Form.Item
              className="mt-4"
              label="Name"
              name="name"
              rules={[{ required: true, message: "Enter name" }]}
            >
              <Input className="w-full" placeholder="Name" />
            </Form.Item>

            <Form.Item
              className="mt-4"
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Enter your phone number" }]}
            >
              <Input
                className="w-full"
                type="number"
                placeholder="Phone Number..."
              />
            </Form.Item>

            <Form.Item
              name="useLoginInfo"
              valuePropName="checked"
              className="mt-4"
            >
              <Checkbox onChange={useInfo}>
                <span className="text-md font-semibold text-black">
                  Use login information?
                </span>
              </Checkbox>
            </Form.Item>

            <Form.Item
              className="mt-4 py-4"
              label="Trainer(Optional)"
              name="trainer"
            >
              <Radio.Group onChange={handleSelectTrainer} className="w-full">
                <ul className="flex flex-col md:flex-row px-3 justify-center items-center gap-6 md:gap-8">
                  {trainers.map((trainer) => (
                    <li key={trainer.id} className="flex justify-center">
                      <Radio value={trainer.id} className="hidden-radio">
                        <div
                          className={`border p-6 md:p-8 rounded-lg cursor-pointer flex flex-col items-center transition-shadow w-80 md:w-96
                    ${
                      selectedTrainer === trainer.id
                        ? "border-red-700 border-2 shadow-lg"
                        : "border-gray-300"
                    }
                  `}
                          onClick={() => setSelectedTrainer(trainer.id)}
                        >
                          <img
                            src={
                              trainer.image || photo
                            } // Placeholder image if no URL
                            alt={trainer.name}
                            className="w-24 h-24 rounded-full mb-4 object-cover"
                          />
                          <h1 className="text-lg font-semibold text-center">
                            {trainer.name}
                          </h1>
                          <span className="text-sm text-gray-500 text-center mb-3">
                            {trainer.category || "Trainer"}
                          </span>

                          <ul className="divide-y rounded bg-gray-100 py-3 px-4 w-full text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                            <li className="flex items-center py-3 text-sm">
                              <span>Email</span>
                              <span className="ml-auto">{trainer.email}</span>
                            </li>
                            <li className="flex items-center py-3 text-sm">
                              <span>Phone</span>
                              <span className="ml-auto">{trainer.phone}</span>
                            </li>
                          </ul>
                        </div>
                      </Radio>
                    </li>
                  ))}
                </ul>
              </Radio.Group>
            </Form.Item>

            <Form.Item className="mt-6 pt-6">
              <Button
                className="w-full bg-red-800 text-white rounded-lg"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      </div>
    </section>
  );
};

export default BookingForm;
