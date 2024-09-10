import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import News from './pages/News/News';
import About from './pages/About/About';
import Booking from './pages/Booking/Booking';
import NewsDetail from './pages/NewsDetail/NewsDetail';

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
            <Route path='/' element={<Home/>}/>
            <Route path='/news' element={<News/>}>
              <Route path='/news/:id' element={<NewsDetail/>}/>
            </Route>
            <Route path='/about' element={<About/>}/>
            <Route path='/events' element={<Booking/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
