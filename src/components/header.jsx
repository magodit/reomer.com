import {useLocation, useNavigate} from 'react-router-dom'
export default function Header() {
    const location = useLocation()
    const navigate = useNavigate()
    console.log(location.pathname)
    function pathMathRoute(route){
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
                    ${ pathMathRoute("/") && "text-black border-b-[3px] border-b-blue-600" }`}
                    onClick={()=>navigate("/")}
                    >Home</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold 
                    ${ pathMathRoute("/offers") && "text-black border-b-[3px] border-b-blue-600" }`}
                    onClick={()=>navigate("/offers")}
                    >Offers</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold 
                    ${ pathMathRoute("/phonesignup") && "text-black border-b-[3px] border-b-blue-600" }`}
                    onClick={()=>navigate("/phonesignup")}
                    >Sign In</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold 
                    ${ pathMathRoute("/signup") && "text-black border-b-[3px] border-b-blue-600" }`}
                    onClick={()=>navigate("/signup")}
                    >Sign Up</li>
                </ul>
            </div>
        </header>
    </div>
  )
}

