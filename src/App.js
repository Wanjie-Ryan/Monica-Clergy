import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegComponent from "./pages/Register/reg";
import LoginComponent from "./pages/Login/login";
import ProjectComponent from "./pages/projects/projects";
import EventComponent from "./pages/Events/events";
import GeneralEventsComponent from "./pages/Events/General-Events/GE";
import SingleGEComponent from "./pages/Events/General-Events/Single-GE";
import KidsEventsComponent from "./pages/Events/Kids-Events/kidsEvents";
import SingleKidsComponent from "./pages/Events/Kids-Events/SingleKids";
import Teens from "./pages/Events/Teens-Events/Teens";
import SingleTeenComponent from "./pages/Events/Teens-Events/SingleTeen";
import YouthComponent from "./pages/Events/Youth-Events/Youth";
import SingleYouthComponent from "./pages/Events/Youth-Events/SingleYouth";
import MenComponent from "./pages/Events/Men-Events/Men";
import SingleMenComponent from "./pages/Events/Men-Events/singleMen";
import LadiesComponent from "./pages/Events/Ladies-Events/Ladies";
import SingleLadiesComponent from "./pages/Events/Ladies-Events/SingleLadies";
import FeedbackComponent from "./pages/feedback/fb";
import ProfileComponent from "./pages/profile/profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/project" element={<ProjectComponent />} />
          <Route path="/events" element={<EventComponent />} />
          <Route path="/general-events" element={<GeneralEventsComponent />} />
          <Route path="/general-events/:id" element={<SingleGEComponent />} />
          <Route path="/kids-events" element={<KidsEventsComponent />} />
          <Route path="/kids-events/:id" element={<SingleKidsComponent />} />
          <Route path="/teen-events" element={<Teens />} />
          <Route path="/teen-events/:id" element={<SingleTeenComponent />} />
          <Route path="/youth-events" element={<YouthComponent />} />
          <Route path="/youth-events/:id" element={<SingleYouthComponent />} />
          <Route path="/men-events" element={<MenComponent />} />
          <Route path="/men-events/:id" element={<SingleMenComponent />} />
          <Route path="/ladies-events" element={<LadiesComponent />} />
          <Route
            path="/ladies-events/:id"
            element={<SingleLadiesComponent />}
          />
          <Route path="/feedback" element={<FeedbackComponent />} />
          <Route path="/profile" element={<ProfileComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
