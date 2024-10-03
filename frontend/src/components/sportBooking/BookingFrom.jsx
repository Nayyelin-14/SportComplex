import { Form, Input, Button, message, Checkbox } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { create_Booking } from "../../apiEndpoints/booking";
import {
  resetSelectedTime,
  resetSportType,
  setSportType,
} from "../../store/bookingSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BookingFrom = () => {
  const { selectedTime } = useSelector((state) => state.booking);
  const { SportType } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const [checked, setChecked] = useState(false);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinishHandler = async (values) => {
    try {
      const response = await create_Booking(values);
      if (response.isSuccess) {
        // console.log(response);
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
    console.log(values);
  };
  // console.log(bookings);
  ////use login information
  const useInfo = (e) => {
    setChecked(e.target.checked);
    console.log(`checked = ${e.target.checked}`);
    if (e.target.checked) {
      // Populate form with user data
      // memberID phnumber
      form.setFieldsValue({
        studentid: user.memberID || "", // Assuming `studentid` is available
        name: user.username || "",
        phone: user.phnumber || "", // Assuming `phone` is available
      });
    } else {
      // Optionally clear the fields if unchecked
      form.setFieldsValue({
        studentid: "",
        name: "",
        phone: "",
      });
    }
  };

  return (
    <section className="">
      <h3 className="text-3xl font-semibold md:mt-6 md:mx-20">
        Sport complex booking
      </h3>
      <div className="md:flex  md:max-w-10xl md:gap-3">
        <div className=" md:mx-auto md:my-7 min-h-3xl flex flex-col items-center justify-center md:w-1/2 ">
          <Form
            layout="horizontal"
            onFinish={onFinishHandler}
            form={form}
            initialValues={{
              sporttype: SportType ? SportType : "Tennis", // Preload the sporttype from Redux
              status: user ? user.status : "active", // Preload the status (user role) from Redux
              studentid: "",
              name: "",
              phone: "",
              session: selectedTime ? selectedTime : "8:00 - 10:00",
              role: user ? user.role : "Student",
              useLoginInfo: false,
            }}
          >
            {/* ///// */}
            <div className=" ">
              <div className="md:flex md:flex-row md:gap-5  flex flex-row    ">
                <Form.Item
                  className="font-semibold my-5"
                  label="Sport Type"
                  name="sporttype"
                  type="string"
                >
                  <Input
                    className="w-[130px] h-[30px] md:ml-9"
                    value={SportType || "Tennis"} // Automatically fills "Tennis" if SportType is not provided
                    placeholder={SportType || "Tennis"}
                    disabled
                  />
                </Form.Item>

                <Form.Item
                  className="font-semibold my-5 ml-[-40px] md:ml-[2px]"
                  label="Session"
                  name="session"
                  type="string"
                >
                  <Input
                    className="w-[130px] h-[30px] md:ml-3"
                    value={selectedTime} // Redux value shown here
                    placeholder={selectedTime}
                    disabled
                  />
                </Form.Item>
              </div>

              <div className="md:flex-row md:items-center md:gap-6 flex flex-row  items-center mt-[-30px] md:mt-0">
                <Form.Item
                  className="font-semibold my-2"
                  label="Role"
                  name="role"
                  type="string"
                >
                  <select
                    className="w-[130px] h-[30px] md:ml-[70px]  border-2 border-red-700 cursor-pointer focus:border-red-700 active:border-red-700 focus:outline-none rounded-md"
                    value={user ? user.role : ""} // Redux value shown here
                  >
                    <option value="student">Student</option>
                    <option value="Staff">Staff</option>
                    <option value="lecturer">Lecturer</option>
                    <option value="outsider">Outsider</option>
                  </select>
                </Form.Item>

                <Form.Item
                  className="font-semibold my-5"
                  label="Status"
                  name="status"
                  type="string"
                >
                  <Input
                    className="w-[130px] h-[30px] md:ml-5"
                    value={user.status} // Redux value shown here
                    placeholder={user.status}
                    disabled
                  />
                </Form.Item>
              </div>

              <Form.Item
                className="font-semibold md:my-5  "
                label="Student ID"
                name="studentid"
                type="number"
                rules={[
                  {
                    required: true,
                    message: "Enter your student id",
                  },
                ]}
                hasFeedback
              >
                <Input className="w-[220px] md:ml-6" type="number"></Input>
              </Form.Item>

              <Form.Item
                className="md:my-1  font-semibold"
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Enter name",
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="name..." className="md:ml-14 w-[220px]" />
              </Form.Item>

              <Form.Item
                className="font-semibold md:my-5"
                label="Phone"
                name="phone"
                type="number"
                rules={[
                  {
                    required: true,
                    message: "Enter your phone number",
                  },
                ]}
                hasFeedback
              >
                <Input
                  className="w-[220px] md:ml-14"
                  type="number"
                  placeholder="phone number..."
                />
              </Form.Item>

              <div>
                <Form.Item
                  colon={false}
                  className="font-semibold"
                  name="useLoginInfo"
                  valuePropName="checked"
                >
                  <Checkbox
                    className="custom-checkbox"
                    onChange={(e) => useInfo(e)}
                  >
                    <span className="text-md font-semibold text-black">
                      Use login information?
                    </span>
                  </Checkbox>
                </Form.Item>
              </div>

              <div>
                <Form.Item>
                  <Button
                    className="p-5 w-40 bg-red-800 rounded-lg cursor-pointer font-medium text-white"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
        <div className="md:w-1/2 md:my-7">hi there</div>
      </div>
    </section>
  );
};

export default BookingFrom;
