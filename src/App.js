import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThankYou } from './Components/ThankYou';
import StepperPage from './Components/Stepper';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StepperPage />} />
        <Route path="/ThankYou" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>);
}

export default App;
