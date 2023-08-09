import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegComponent from "./pages/Register/reg";
import LoginComponent from "./pages/Login/login";
import ProjectComponent from "./pages/projects/projects";
// import EventComponent from "./pages/Events/events";
import GeneralEventsComponent from "./pages/Events/General-Events/GE";
import SingleGEComponent from "./pages/Events/General-Events/Single-GE";
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
          {/* <Route path="/events" element={<EventComponent />} /> */}
          <Route path="/general-events" element={<GeneralEventsComponent />} />
          <Route path="/general-events/:id" element={<SingleGEComponent />} />
          <Route path="/feedback" element={<FeedbackComponent />} />
          <Route path="/profile" element={<ProfileComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
