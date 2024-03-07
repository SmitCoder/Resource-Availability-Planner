import React from "react";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import GenerateCalendar from "./components/GenerateCalendar";
import Team from "./Teams/Team";
import Employee from "./components/Employee";
import Matrix from "./components/Matrix";
import CascadingDropdowns from "./components/CascadingDropdowns";

const App = () => {
  return (
    <>
    
      <Sidebar />
      <Nav />

      <Routes>
        <Route path="" element={<GenerateCalendar />} />
        <Route path="/team" element={<Team />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/matrix" element={<Matrix />} />
      </Routes>
      {/* <CascadingDropdowns /> */}
    </>
  );
};

export default App;
