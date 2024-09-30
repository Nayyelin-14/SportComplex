import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import About from "./pages/About/About";
import Booking from "./pages/Booking/Booking";
import NewsDetail from "./pages/NewsDetail/NewsDetail";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import AuthProvider from "./providers/AuthProvider";
import Profile from "./pages/Users/Profile";
import BookingFrom from "./components/sportBooking/BookingFrom";
import NotFound from "./components/NotFound";
import Adminpage from "./pages/Admin/Adminpage";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 500,
      easing: "ease-in-sine",
      delay: 500,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <AuthProvider
                  allowedRoles={[
                    "Student",
                    "Staff",
                    "Lecturer",
                    "Outsider",
                    "Admin",
                  ]}
                >
                  <Home />
                </AuthProvider>
              }
            />
            <Route path="/news" element={<News />}>
              <Route path="/news/:id" element={<NewsDetail />} />
            </Route>
            <Route path="/about" element={<About />} />
            {/* <Route path="/events" element={<Booking />} /> */}

            <Route
              path="/user-profile"
              element={
                <AuthProvider
                  allowedRoles={["Student", "Staff", "Lecturer", "Outsider"]}
                >
                  <Profile />
                </AuthProvider>
              }
            />
            <Route
              path="/booking"
              element={
                <AuthProvider
                  allowedRoles={["Student", "Staff", "Lecturer", "Outsider"]}
                >
                  <Booking />
                </AuthProvider>
              }
            />

            <Route
              path="/bookingform"
              element={
                <AuthProvider
                  allowedRoles={["Student", "Staff", "Lecturer", "Outsider"]}
                >
                  <BookingFrom />
                </AuthProvider>
              }
            />

            <Route
              path="/admin"
              element={
                <AuthProvider allowedRoles={["Admin"]}>
                  <Adminpage />
                </AuthProvider>
              }
            />

            {/* auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;
