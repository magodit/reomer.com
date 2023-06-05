import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {useLocation, useNavigate} from 'react-router-dom'
export default function Header() {
    const [pageState, setPageState] = useState("Sign In");
    const location = useLocation()
    const navigate = useNavigate()
    const auth = getAuth()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setPageState("Profile");
          } else {
            setPageState("Sign in");
          }
        });
      }, [auth]);
    console.log(location.pathname)
    function pathMatchRoute(route){
        if(route === location.pathname){
            return true;
        }
    }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <header className="flex justify-between items-center px-3 max-w-6x1">
            <div>
                
            <img src="https://magprojects.one/logo.png" alt="logo" className="h-10 cursor-pointer"
            onClick={()=>navigate("/")}/>
                
            </div>
            <div>
                <ul className="flex space-x-10">
                    <li className={`cursor-pointer py-3 text-sm font-semibold 
                    ${ pathMatchRoute("/") && "text-black border-b-[3px] border-b-blue-600" }`}
                    onClick={()=>navigate("/")}
                    >Home</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold 
                    ${ pathMatchRoute("/offers") && "text-black border-b-[3px] border-b-blue-600" }`}
                    onClick={()=>navigate("/offers")}
                    >Offers</li>
                    
                    <li className={`cursor-pointer py-3 text-sm font-semibold 
                    ${ (pathMatchRoute("/signin") || pathMatchRoute("/profile")) && "text-black border-b-[3px] border-b-blue-600" }`}
                    onClick={()=>navigate("/profile")}
                    >
                        {pageState}
                    </li>
                </ul>
            </div>
        </header>
    </div>
  )
}

