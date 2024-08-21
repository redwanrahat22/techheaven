import { useContext, useEffect, useState } from "react";
import { AuthContex } from "./AuthProvider";
import { IoMdEye,IoMdEyeOff } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Register = () => {

    const {screenmode,handleSignUp,user,handleGoogleSignIn,handleGetEmail} = useContext(AuthContex)
    const [showpass,setshowpass] = useState(false)
    const [showconpass,setshowconpass] = useState(false)
    const [errormessage,seterrormess] = useState('')
    const nav = useNavigate()
    
    const handleDB =(UserData)=>{
     
        fetch(`http://localhost:5000/users/${UserData.email}`)
    .then(res =>res.json())
    .then(data =>{
        if(!data) {
            fetch('http://localhost:5000/users',{
                method: 'POST',
                headers: {
                    "content-type" : "application/json",
                },
                body: JSON.stringify(UserData)
            })
        
        }
        
     })
        .catch(result => {
            fetch('http://localhost:5000/users',{
                method: 'POST',
                headers: {
                    "content-type" : "application/json",
                },
                body: JSON.stringify(UserData)
            })
        })

        
    }

    
    const handleRegister = (e) =>{
        e.preventDefault()

        const form = e.target
        const username = form.name.value
        const email = form.email.value
        const password = form.password.value
        const confirmpass = form.confirm.value
        const gSignin = false
        const UserInfo = {
            email,password,confirmpass,username,gSignin
        }

        if(password !== confirmpass) seterrormess('password does not match')
        else if (!/^[a-zA-Z0-9_]+$/.test(username)) seterrormess("use only letters,numbers and _ for username")
        else if(username.length > 15) seterrormess('Username should be under 15 characters')
       else if(password.length < 6) seterrormess("password should be more than 6 characters")

        else if(!/[A-Z]/.test(password)) seterrormess("password must contain a capital letter")
        
        else if(!/[^a-zA-Z0-9]/.test(password)) seterrormess("password must contain a special character")
        
            else {
                    seterrormess('')
                handleSignUp(email,password)
                .then(result =>{
                    handleGetEmail(email)
                    handleDB(UserInfo)
                    toast.success('Login Successful ', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                        onClose: ()=>{
                            setTimeout(() => {
                                nav('/')
                            }, 1000);
                        }
                    })

                       
                    

                 })

                .catch(error=>{
                    if(error.message == 'Firebase: Error (auth/email-already-in-use).')
                    seterrormess('Email Already in use')
                    
                    else if(error.message == 'Firebase: Error (auth/invalid-email).')
                        seterrormess(" the Email is invalid")
                  

                
                })
                    

            }
            
        
    
    }

    const handleGSignIn =(e)=>{
        e.preventDefault()

        handleGoogleSignIn()
        .then(result =>{
            
          
            const user = result.user
            const username = user.displayName
            const email = user.email
            const gurl = user.photoURL
            const gSignin = true
            const gverify = user.emailVerified
            handleGetEmail(email)
            const UserInfog = {
                username,email,gurl,gSignin,gverify,
            }
          
            handleDB(UserInfog)

            toast.success('Login Successful ', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                onClose: ()=>{
                    setTimeout(() => {
                        nav('/')
                    }, 1000);
                }
            })

           

        })
        .catch(error =>{
            console.log(error)
        })

    }

    return (
        <div>
            <div className="h-screen ">

            <ToastContainer
                              position="top-right"
                              autoClose={1500}
                              hideProgressBar={false}
                              newestOnTop={false}
                              closeOnClick 
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                              theme="light"
                              transition: Bounce
                    />
            <ToastContainer />

            <div className={` mt-20 border-2 shadow-lg rounded-tr-3xl rounded-bl-2xl    w-2/5 m-auto ${screenmode ? 'border-dmgreen text-dmgreen bg-slate-800 shadow-dmgreen ' : 'text-lmblue border-lmblue bg-white shadow-lmblue'}  `}>
            <div className="mt-8 text-5xl text-center font-semibold font-logo">
                <h1>Register</h1>
            </div>
           <hr className={`mt-4 ${screenmode ? 'bg-dmgreen' : 'bg-lmblue ' } border-dashed`} />
            <form onSubmit={handleRegister} action="" className="w-[390px] m-auto  mt-12 space-y-4 ">

                <div className="space-x-12 flex items-center">
                    <label htmlFor="" className="font-semibold font-menu ">
                        <span>Display Name</span>
                    </label>
                    <div className="flex space-x-2 items-center">
                        <h3 className="font-semibold font-menu ">:</h3>
                    <input type="text" name="name" required className={` ${screenmode ? 'bg-slate-700 border-white text-white focus:border-dmgreen' : 'bg-[#eff4fd] border-slate-300 text-black focus:border-lmblue '} py-1 border-2 px-2  font-menu focus:outline-none rounded-md `}   />
                    </div>
                </div>

                <div className="space-x-28 flex items-center">
                    <label htmlFor="" className="font-semibold font-menu ">
                        <span>Email</span>
                    </label>
                    <div className="flex space-x-2 items-center">
                        <h3 className="font-semibold font-menu ">:</h3>
                    <input type="email" name="email" required className={` ${screenmode ? 'bg-slate-700 border-white text-white focus:border-dmgreen' : 'bg-[#eff4fd] border-slate-300 text-black focus:border-lmblue '} py-1 border-2 px-2  font-menu focus:outline-none rounded-md `}   />
                    </div>
                </div>

             

                <div className="space-x-[78px] flex items-center">
                    <label htmlFor="" className="font-semibold font-menu ">
                        <span>Password</span>
                    </label>
                    <div className="flex space-x-2 items-center relative">
                        <h3 className="font-semibold font-menu ">:</h3>
                    <input type={`${showpass ? 'text' : 'password'}`} name="password" required className={` ${screenmode ? 'bg-slate-700 border-white text-white focus:border-dmgreen' : 'bg-[#eff4fd] border-slate-300 text-black focus:border-lmblue '} py-1 border-2 px-2  font-menu focus:outline-none rounded-md`}   />
                    <div className ="absolute right-2 cursor-pointer text-lg" onClick={()=> setshowpass(!showpass)} >
                    {
                        showpass ? <IoMdEye></IoMdEye> : <IoMdEyeOff></IoMdEyeOff>
                    }
                    </div>
                    </div>
                </div>


                <div className="space-x-[13px] flex items-center">
                    <label htmlFor="" className="font-semibold font-menu ">
                        <span>Confirm Password</span>
                    </label>

                    <div className="flex space-x-2 items-center relative">
                        <h3 className="font-semibold font-menu ">:</h3>
                    <input type={`${showconpass ? 'text' : 'password'}`} name="confirm" required className={` ${screenmode ? 'bg-slate-700 border-white text-white focus:border-dmgreen' : 'bg-[#eff4fd] border-slate-300 text-black focus:border-lmblue '} py-1 border-2 px-2  font-menu focus:outline-none rounded-md`}  required />
                    <div className ="absolute right-2 cursor-pointer text-lg" onClick={()=> setshowconpass(!showconpass)} >
                    {
                        showconpass ? <IoMdEye></IoMdEye> : <IoMdEyeOff></IoMdEyeOff>
                    }
                    </div>
                    </div>
                </div>

                <div className="relative py-1">
                <h1 className=" w-1/2 right-6 absolute -my-4 text-sm text-red-600 ease-in-out lowercase">{errormessage ? errormessage : ''}</h1>

                </div>

                <div className=" ml-[136px] pt-4 ">
                    
                    <input type="submit" value="Sign Up" className={`${screenmode ? 'bg-dmgreen text-black hover:bg-slate-700 hover:text-dmgreen hover:border-dmgreen ' : 'bg-lmblue text-white hover:bg-white hover:text-lmblue hover:border-lmblue'} px-6  py-1 border-2 cursor-pointer duration-200 rounded-tr-lg rounded-bl-lg  font-menu `}  required />
                </div>

            </form>

            <div className="flex justify-center mt-8 space-x-1 font-menu text-sm">
                <h1>Already have an account?</h1>
                <NavLink to={'/login'}><h1 className="underline font-semibold hover:brightness-150">Login Here!</h1></NavLink>
            </div>

                <hr className={`my-8 w-2/4 m-auto ${screenmode ? 'bg-dmgreen' : 'bg-lmblue '} border-dashed `}/>
            
                <div onClick={handleGSignIn} className={`hover:cursor-pointer  items-center flex w-2/5 m-auto border-2 py-2 rounded-tr-lg rounded-bl-lg space-x-4  mb-20 justify-center hover:shadow-lg duration-200 hover:scale-105 ${screenmode ? 'bg-slate-700 border-white hover:text-white hover:bg-dmgreen hover:bg-opacity-40 hover:shadow-dmgreen hover:shadow-md' : 'bg-[#eff4fd] border-slate-300 hover:bg-lmblue hover:text-white hover:bg-opacity-60 hover:shadow-lmblue hover:shadow-md'}`}>
                    
                    <img src="https://i.postimg.cc/MZbxcsJG/google-png-small.png" className="w-6" alt="" />
                    <div>
                        <h1 className="">Sign In With <span className="font-semibold">Google</span> </h1>
                    </div>
                   
                </div>
            

            </div>
        </div>
        </div>
    );
};

export default Register;