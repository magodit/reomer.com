import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Home from './pages/Home'
import Profile from './pages/Profile'
import Offers from './pages/Offers'
import ForgotPassword from './pages/ForgotPassword'
import SignIn from './pages/SignIn'
import Header from './components/header'
import PhoneSignUp from "./pages/PhoneSignUp";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (
    <>
    <UserAuthContextProvider>
    <Router>
      <Header/>
      <Routes>
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/offers" element={<Offers/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/phonesignup" element={<PhoneSignUp/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
       </Routes>
    </Router>
    </UserAuthContextProvider>
    </>
  )
};

export default App;