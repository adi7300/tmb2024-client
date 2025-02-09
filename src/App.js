import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThankYou } from './Components/ThankYou';
import StepperPage from './Components/Stepper';

function App() {
  useEffect(() => {
    localStorage.clear();
  }, []); // Empty dependency array ensures this runs once when App mounts

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StepperPage />} />
        <Route path="/ThankYou" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;