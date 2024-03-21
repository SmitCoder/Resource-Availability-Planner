import React from "react";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import GenerateCalendar from "./components/GenerateCalendar";
import Team from "./Teams/Team";

import Matrix from "./components/Matrix";
// import React_select from "./React_select";

const App = () => {
  return (
    <>
    
      {/* <Sidebar /> */}
      <Nav />

      <Routes>
        <Route path="" element={<GenerateCalendar />} />
        <Route path="/team" element={<Team />} />
        <Route path="/matrix" element={<Matrix />} />
      </Routes>
      {/* <CascadingDropdowns /> */}
      {/* <React_select /> */}
    </>
  );
};

export default App;
