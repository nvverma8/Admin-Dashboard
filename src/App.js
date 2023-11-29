import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventForm from './EventForm';
import Fields from './Fields'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<EventForm/>} />
        <Route path="/display" element={<Fields/>} />
      </Routes>
    </Router>
  );
};

export default App;






