import { Form, Input, Button, message, Checkbox, Radio, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { create_Booking, get_alltrainers } from "../../apiEndpoints/booking";
import {
  resetSelectedTime,
  resetSportType,
  setSportType,
} from "../../store/bookingSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import photo from "../../../mfu.jpg";
import Popupdetail from "./Popupdetail";
import TrainerDetail from "./TrainerDetail";
import Trainers from "../../pages/Trainers/Trainers";

const BookingForm = () => {
  const { selectedTime } = useSelector((state) => state.booking);
  const { SportType } = useSelector((state) => state.booking);

  const { user } = useSelector((state) => state.user);
  const [checked, setChecked] = useState(false);
  const [form] = Form.useForm();
  const [alltrainers, setAlltrainers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isbooking, setIsbooking] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleSelectTrainer = (e) => {
    setSelectedTrainer(e.target.value);
  };

  const fetchTrainers = async () => {
    try {
      const response = await get_alltrainers();
      if (response.isSuccess) {
        setAlltrainers(response.trainers_doc);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinishHandler = async (values) => {
    try {
      setIsbooking(true);
      const response = await create_Booking(values);
      if (response.isSuccess) {
        // bookingDoc,
        // avaliable_Doc, response. u yone pl
        message.success(response.message);
        navigate("/booking");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      navigate("/booking");
      dispatch(resetSelectedTime());
      dispatch(resetSportType());
    } finally {
      setIsbooking(false);
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
  useEffect(() => {
    fetchTrainers();
  }, []);
  // console.log(alltrainers);
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
                <Form.Item
                  className="w-full"
                  label="Sport Type"
                  name="sporttype"
                >
                  <Input
                    className="w-full p-2"
                    value={SportType || "Tennis"}
                    placeholder={SportType || "Tennis"}
                    disabled
                  />
                </Form.Item>
                <Form.Item className="w-full" label="Session" name="session">
                  <Input
                    className="w-full p-2"
                    value={selectedTime}
                    placeholder={selectedTime}
                    disabled
                  />
                </Form.Item>
              </div>

              <div className="flex flex-col md:flex-row md:gap-6 mt-4">
                <Form.Item className="w-full" label="Role" name="role">
                  <select className="w-full border-2 border-black p-2 cursor-pointer rounded-md">
                    <option value="student">Student</option>
                    <option value="Staff">Staff</option>
                    <option value="lecturer">Lecturer</option>
                    <option value="outsider">Outsider</option>
                  </select>
                </Form.Item>
                <Form.Item className="w-full" label="Status" name="status">
                  <Input
                    className="w-full p-2"
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
                <Input
                  className="w-full p-2 border-1 border-black"
                  type="number"
                />
              </Form.Item>

              <Form.Item
                className="mt-4"
                label="Name"
                name="name"
                rules={[{ required: true, message: "Enter name" }]}
              >
                <Input
                  className="w-full p-2 border-1 border-black"
                  placeholder="Enter username..."
                />
              </Form.Item>

              <Form.Item
                className="mt-4"
                label="Phone"
                name="phone"
                rules={[{ required: true, message: "Enter your phone number" }]}
              >
                <Input
                  className="w-full p-2 border-1 border-black"
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
                label=<p className="font-bold text-xl">Trainer (Optional)</p>
                name="trainer"
              >
                <div className="w-full mt-7">
                  <ul className="flex flex-col md:flex-row px-3 justify-center items-center gap-6 md:gap-8">
                    {alltrainers?.map((trainer) => (
                      <div key={trainer._id}>
                        {trainer.specailization === SportType && (
                          <li className="flex justify-center">
                            <div
                              className={`border p-6 md:p-8 rounded-lg cursor-pointer flex flex-col items-center transition-shadow w-80 md:w-96 ${
                                selectedTrainer === trainer._id
                                  ? "border-red-700 border-2 shadow-lg"
                                  : "border-gray-300"
                              }`}
                              onClick={() => {
                                setSelectedTrainer(trainer._id);
                                form.setFieldsValue({
                                  trainer: trainer._id, // Set the selected trainer ID in the form
                                });
                              }}
                            >
                              <img
                                src={trainer.image || photo} // Placeholder image if no URL
                                alt={trainer.name}
                                className="w-24 h-24 rounded-full mb-4 object-cover"
                              />
                              <h1 className="text-lg font-semibold text-center">
                                {trainer.name}
                              </h1>
                              <span className="text-sm text-gray-500 text-center mb-3">
                                {trainer.sporttype || "Trainer"}
                              </span>

                              <ul className="divide-y rounded bg-gray-100 py-3 px-4 w-full text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                                <li className="flex items-center py-3 text-sm">
                                  <span>Email</span>
                                  <span className="ml-auto">
                                    {trainer.email}
                                  </span>
                                </li>
                                <li className="flex items-center py-3 text-sm">
                                  <span>Phone</span>
                                  <span className="ml-auto">
                                    {trainer.phone}
                                  </span>
                                </li>
                              </ul>
                              <div className="flex justify-end w-full pr-4 mt-4 text-right">
                                <Button
                                  className="border-none border-b-2 border-black"
                                  onClick={handleOpenModal}
                                >
                                  Check detail info
                                </Button>
                              </div>
                              <Popupdetail
                                isOpen={isModalOpen}
                                onClose={handleCloseModal}
                              >
                                <Trainers trainerdetail={trainer} />
                              </Popupdetail>
                            </div>
                          </li>
                        )}
                      </div>
                    ))}
                  </ul>
                </div>
              </Form.Item>

              <Form.Item className="mt-6 pt-6">
                <Button
                  className="w-full bg-red-800 text-white rounded-lg"
                  disabled={isbooking}
                  htmlType="submit"
                >
                  Submit booking
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
