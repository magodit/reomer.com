import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Home from './pages/Home'
import Profile from './pages/Profile'
import Offers from './pages/Offers'
import ForgotPassword from './pages/ForgotPassword'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/header'
import PhoneSignUp from "./pages/PhoneSignUp";
import PhonePw from "./pages/PhonePw";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
    <UserAuthContextProvider>
    <Router>
      <Header/>
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>}/>
          </Route>
        <Route path="/offers" element={<Offers/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/phonesignup" element={<PhoneSignUp/>}/>
        <Route path="/phonepw" element={<PhonePw/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
       </Routes>
    </Router>
    </UserAuthContextProvider>
    </>
  )
};

export default App;