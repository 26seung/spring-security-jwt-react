import { Route, Routes } from 'react-router-dom';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Admin from 'pages/user/Admin';
import JoinForm from 'pages/auth/JoinForm';
import LoginForm from 'pages/auth/LoginForm';
import Profile from 'pages/user/Profile';
import NotFound from 'pages/error/NotFound';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="" element={''} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/join" element={<JoinForm />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
