import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './routes/main/main.component';
import SingleMode from './routes/single-mode/single-mode.component';
import MultiMode from './routes/multi-mode/multi-mode.component';
import Navigation from './components/navigation/navigation.component';
import LoadingScreen from './components/loading-screen/loading-screen.component';
import Auth from './routes/login/auth.component';
// import Google from './routes/login/google.component';
import './App.css';

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Main />} />
        <Route path="/single" element={<SingleMode />} />
        <Route path="/multi" element={<MultiMode />}>
          <Route path=":roomIdParam" element={<LoadingScreen />} />
        </Route>
        <Route path="/oauth" element={<Auth />} />
        {/* <Route path="/oauth/google/*" element={<Google />} /> */}
      </Route>
    </Routes>
  );
}
