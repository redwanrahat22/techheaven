import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../AuthProvider/AuthProvider";
import { TiShoppingCart } from "react-icons/ti";
import { FaToggleOff,FaToggleOn } from "react-icons/fa6";
import { RiMenu4Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Navbar = () => {

    const {screenmode,changeScreen,user,handleSignOut,useremail,settotalCart,totalCart,setUserInfo,userInfo} = useContext(AuthContex)
    
    const [scroll, setScroll] = useState(false);
    const [charImg,setcharImg] = useState(null)
      
      useEffect(()=>{
        


        fetch(`http://localhost:5000/users/${useremail}`)
        .then(res=>res.json())
        .then(data => 
        {
        
          data.cart ? settotalCart(data.cart.length) : settotalCart(0)
          
          setcharImg(data.username.charAt(0))
          setUserInfo({
            username: data.username,
            userpro : data.gurl ? data.gurl.replace(/['"]+/g, '') : null
          })

        }
         )

      },[useremail])



    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setScroll(true);
        } else {
          setScroll(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);



    const colormode = JSON.parse(localStorage.getItem('screen'))


    const handleSigningOUt=()=>{
      handleSignOut()
    }
    




    const handleMode = (e) =>{
      e.preventDefault()
      changeScreen(!screenmode)

    }

    const shadowborderlight = window.innerWidth <= 640 ? {
      color: 'rgba(0, 0, 0, 0)',
      WebkitTextStroke: '0.5px black',
    } : {
      color: 'rgba(0, 0, 0, 0)',
      WebkitTextStroke: '1.5px black',
    };
    
    const shadowborderdark = window.innerWidth <= 640 ? {
      color: 'rgba(0, 0, 0, 0)',
      WebkitTextStroke: '0.5px white',
    } : {
      color: 'rgba(0, 0, 0, 0)',
      WebkitTextStroke: '1px white',
    };
    

    const shadownone = {
      WebkitTextStroke: '0px',
    }
   

    
    
    const links = <>
          <li className={`${scroll ? 'lg:h-20  md:h-12 ' : ' md:h-12 lg:h-28'} duration-150  relative ${screenmode ? 'hover:text-dmgreen': 'hover:text-lmblue'}`  }   ><NavLink className={({isActive})=> isActive ? (` lg:border-t-4 md:border-none  inline-block ${screenmode ? 'border-dmgreen' : 'border-lmblue'} text-${colormode} ` ) :`lg:border-t-4 md:border-none inline-block border-transparent` }  to={'/'} ><h1 className={` hover:scale-105 duration-200 ${scroll ? 'lg:mt-6 ml-3 lg:ml-0 mt-1' : 'lg:mt-10  mt-1 ml-3 md:ml-3 lg:ml-0'} text-[12px] md:text-[17px] `}>Home</h1></NavLink></li>
          <li className={`${scroll ? 'lg:h-20  md:h-12 ' : ' md:h-12 lg:h-28'} duration-150  relative hover:text-${colormode}  ` }   ><NavLink className={({isActive})=>  isActive ? (` lg:border-t-4 md:border-none  inline-block ${screenmode ? 'border-dmgreen' : 'border-lmblue'} text-${colormode} ` ) :`lg:border-t-4 md:border-none inline-block border-transparent`  }  to={'/addproduct'} ><h1 className={`whitespace-nowrap hover:scale-105 duration-200 ${scroll ? 'lg:mt-6 ml-3 lg:ml-0 mt-1' : 'lg:mt-10  mt-1 ml-3 md:ml-3 lg:ml-0'} text-[12px] md:text-[17px] `}>Add Product</h1></NavLink></li>
          <li className={`${scroll ? 'lg:h-20  md:h-12 ' : ' md:h-12 lg:h-28'} duration-150  relative hover:text-${colormode}  ` }   ><NavLink className={({isActive})=>  isActive ? (` lg:border-t-4 md:border-none  inline-block ${screenmode ? 'border-dmgreen' : 'border-lmblue'} text-${colormode} ` ) :`lg:border-t-4 md:border-none inline-block border-transparent`  }  to={'/blog'} ><h1 className={` hover:scale-105 duration-200 ${scroll ? 'lg:mt-6 ml-3 lg:ml-0 mt-1' : 'lg:mt-10  mt-1 ml-3 md:ml-3 lg:ml-0'} text-[12px] md:text-[17px] `}>Blog</h1></NavLink></li>
          <li className={`${scroll ? 'lg:h-20  md:h-12 ' : ' md:h-12 lg:h-28'} duration-150  relative hover:text-${colormode}  ` }   ><NavLink className={({isActive})=>  isActive ? (` lg:border-t-4 md:border-none  inline-block ${screenmode ? 'border-dmgreen' : 'border-lmblue'} text-${colormode} ` ) :`lg:border-t-4 md:border-none inline-block border-transparent`  }  to={'/contact'} ><h1 className={` hover:scale-105 duration-200 ${scroll ? 'lg:mt-6 ml-3 lg:ml-0 mt-1' : 'lg:mt-10  mt-1 ml-3 md:ml-3 lg:ml-0'} text-[12px] md:text-[17px] `}>Contact</h1></NavLink></li>
          
          {
            user ? 
            
            <div className="flex space-x-2 items-center -ml-2 md:ml-4 lg:ml-0 mt-2 md:mt-0 scale-75 md:scale-100">
            <div className={`flex ${screenmode ? 'border-dmgreen md:bg-dmgreen':'border-lmblue md:bg-lmblue '} md:text-white border  md:font-bold font-page  items-center  space-x-2 h-12 w-48 rounded-full px-1 `}>
          {
            userInfo.userpro ? <img src={userInfo.userpro} className={`w-10 h-10 rounded-full`} alt="" /> : <div className={`w-10 h-10 rounded-full items-center text-center text-3xl border-2 ${screenmode? " bg-white text-black" : 'bg-black text-white'} `}> <h1 className="">{charImg}</h1></div>
          }
          <h1 className="whitespace-nowrap text-sm md:text-[17px] overflow-hidden ">{userInfo.username}</h1>
          </div>
          </div> 
          : ''
          }
            
          
          <li className={`${scroll ? 'lg:h-20  md:h-12 ' : ' md:h-12 lg:h-28'} duration-150  relative hover:text-${colormode}  ` }   ><NavLink className={({isActive})=>  isActive ? (` lg:border-t-4 md:border-none  inline-block ${screenmode ? 'border-dmgreen' : 'border-lmblue'} text-${colormode} ` ) :`lg:border-t-4 md:border-none inline-block border-transparent`  }  to={'/cart'} ><h1 className={` hover:scale-105 duration-200 ${scroll ? 'lg:mt-5 md:mt-4 mt-2 ml-3 md:ml-4 lg:ml-0' : 'lg:mt-9 md:mt-4 mt-2 ml-3 md:ml-4  lg:ml-0'}`}>
          
          <div className="flex"> 
          <h1 className={`${screenmode? "text-dmgreen" : 'text-lmblue' } text-2xl md:text-4xl`}><TiShoppingCart /></h1>
          <div className="-ml-3 -mt-1 bg-red-500 md:h-4 h-3 md:w-4 w-3 rounded-full relative">
          <h2 className="absolute  -top-1 md:right-[1px] left-[2px]   text-center md:text-[17px] text-[12px] font-page text-white ">{totalCart}</h2>
          </div>
          </div>

          </h1></NavLink></li>

          {
          
              user ? 
              <li className={`${scroll ? 'lg:h-20  md:h-12 ' : ' md:h-12 lg:h-28'} duration-150  relative hover:text-${colormode}  ` } onClick={handleSigningOUt}   ><NavLink className={({isActive})=>  isActive ? (` lg:border-t-4 md:border-none  inline-block border-transparent ` ) :`lg:border-t-4 md:border-none inline-block border-transparent`  }  to={''} ><h1 className={`${scroll ? 'lg:mt-5 md:mt-7 mt-3' : 'lg:mt-9 md:mt-7 mt-3'} whitespace-nowrap text-center w-1/3 md:w-24 lg:w-auto ml-3 lg:ml-0  text-[12px] md:text-[17px] lg:px-4 hover:scale-110 duration-200 rounded-sm ${screenmode ? 'bg-dmgreen text-black' : 'bg-lmblue text-white'} md:py-2 py-1 lg:py-1 `}>Sign Out</h1></NavLink></li> :
              
              <li className={`${scroll ? 'lg:h-20  md:h-12 ' : ' md:h-12 lg:h-28'} duration-150  relative hover:text-${colormode}  ` }   ><NavLink className={({isActive})=>  isActive ? (` lg:border-t-4 md:border-none  inline-block ${screenmode ? 'border-dmgreen' : 'border-lmblue'} text-${colormode} ` ) :`lg:border-t-4 md:border-none inline-block border-transparent`  }  to={'/login'} ><h1 className={`${scroll ? 'lg:mt-5 md:mt-7 mt-3' : 'lg:mt-9 md:mt-7 mt-3'} whitespace-nowrap text-center w-1/3 md:w-24 lg:w-auto ml-3 lg:ml-0  text-[12px] md:text-[17px] lg:px-4 hover:scale-110 duration-200 rounded-sm ${screenmode ? 'bg-dmgreen text-black ' : 'bg-lmblue text-white'} md:py-2 py-1 lg:py-1`}>Login</h1></NavLink></li> 
          }

        <div onClick={handleMode} className={`${scroll ? 'lg:mt-5 mt-4 md:mt-10': 'lg:mt-10 md:mt-10 mt-4'} hover:cursor-pointer duration-200 `}>
        
        {
          screenmode ?  <div className="flex items-center space-x-1 md:space-x-2 lg:-ml-[8px] ml-6 "><FaToggleOn className="md:text-4xl text-2xl "/> <h1 className="whitespace-nowrap text-[12px] md:text-[17px] ">Light Mode</h1></div> : <div className="flex items-center space-x-1 md:space-x-2 lg:-ml-1 ml-6 "><FaToggleOff className="md:text-4xl text-2xl"/> <h1 className="whitespace-nowrap text-[12px] md:text-[17px] ">Dark Mode</h1></div> 
        }
       
      </div>
        
    
    </>
    return (
      <div >
        {/* for git push */}
        <div className={` fixed  top-0 w-full transition-all ${screenmode ? 'bg-black' :`${scroll ? 'bg-white' : 'bg-transparent'}`}  bg-opacity-85`  } >
      

            <div className="navbar relative w-11/12 m-auto md:my-4 lg:my-0 lg:-mt-3 md:justify-between "    >

            
 
   
    <div className="dropdown lg:hidden absolute ">
      <div tabIndex={0} role="button" className=" ">
      <h1 className="text-2xl md:text-3xl"><RiMenu4Fill /></h1>
      </div>
     
      <ul tabIndex={0} className={`${screenmode ? 'bg-black text-white' : 'bg-[#eff4fd] bg-opacity-70 text-black'} -ml-10 md:-ml-12 menu menu-sm h-screen dropdown-content  mt-[23px] md:mt-9 rounded-sm  z-[1] p-2 shadow  md:w-72 w-52`}>
       {
        links
       }
      </ul>
    </div>

 
   



    <div className="cursor-pointer m-auto lg:m-0 w-1/2 md:w-auto justify-center ">
      <NavLink to={'/'}>
      <h1 className={`${scroll ? 'text-3xl' : 'text-4xl'}  text-xl md:text-4xl duration-300 ease-out  font-logo font-semibold `} style={screenmode? shadowborderdark : shadowborderlight} ><span className={screenmode? 'text-dmgreen' : 'text-lmblue'} style={shadownone}>tech</span>heaven </h1>
      </NavLink>
    </div>

     

  <div className="navbar-end hidden lg:flex font-menu space-x-7 mt-1 ">
      <ul className="flex space-x-9 ">{links}</ul>

     
  </div>
 

</div>
<hr className={`${screenmode ? 'border-dmgreen' : 'border-lmblue'}`}  />

        </div>
        </div>
    );
};

export default Navbar;