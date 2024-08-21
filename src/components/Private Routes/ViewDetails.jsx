import { useLoaderData } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { useContext, useEffect, useId, useLayoutEffect, useState } from "react";
import { AuthContex } from "../AuthProvider/AuthProvider";
import { Bounce, toast, ToastContainer } from "react-toastify";
const ViewDetails = () => {

    const viewData = useLoaderData()
    const {screenmode,useremail,settotalCart} = useContext(AuthContex)
    const [loadUser,setloadUser] = useState(null)
 
   

   
    const  handleCart = async (e)=>{
        e.preventDefault()
       
        const temparr = []
        let username = ''
       
        try{
           const response = await fetch(`http://localhost:5000/users/${useremail}`)

               const data = await response.json()
              

               setloadUser(data)
            
               username = data._id

                if(loadUser?.cart.length>0)
                temparr.push(...loadUser.cart)
                
            
        }
        catch{
            console.log('something wrong')
        }

        finally{
            const prodID = viewData._id
            const prodBrand = viewData.brand
            const prodName = viewData.name
            const prodPrice = viewData.price
            const prodUrl = viewData.url
            const prodRating = viewData.rating
    
            const prodData = { prodID,prodBrand,prodName,prodPrice,prodUrl,prodRating}
            
            
           
    
            if(loadUser?.cart)
            temparr.push(...loadUser.cart)
    
            else
             temparr.push(prodData)

       

            fetch(`http://localhost:5000/addtocart/${username}`,{
                method: "PATCH",
                headers:{
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(temparr)
            })
            .then(res => res.json())
            .then(data =>
            {
                settotalCart(temparr.length)
                toast.success('Successfully Added To Cart ', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    
                })
                
            }
                )  


        }
           
        
  
        
    
        
    }

    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <div className="h-screen mt-32">
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
                              
                    />
            <ToastContainer />
            <div className="w-10/12 m-auto flex justify-between gap-20">

                <img className={`w-1/2 rounded-tl-3xl rounded-br-3xl`} src={viewData.url} alt="" />

                <div className="w-1/2 mt-8 ">

                <div className="pt-2  justify-between flex  ">
                    
                <h1 className={`font-semibold text-5xl `}>{viewData.name}</h1>

                <div className="items-center flex mr-2">

                <button onClick={handleCart} className={`flex items-center px-3 py-2  space-x-2 rounded-md hover:shadow-lg duration-200 hover:scale-105 hover:font-semibold hover:bg-white hover:border-2 ${screenmode? "bg-dmgreen text-black hover:border-dmgreen " : "bg-lmblue hover:border-lmblue hover:text-lmblue text-white"}`}>
                <h1>Add to Cart</h1>
                <FaCartArrowDown />
                </button>
                
                </div>
                </div>

                <div className="mt-12 space-y-2 text-lg">
                <h2 className=" "><span className="font-bold">Rating: </span>{viewData.rating}/10</h2>
                <h1><span className="font-bold">Category:</span>  {viewData.type}</h1>
                <h2><span className="font-bold">Brand:</span>  {viewData.brand}</h2>
                <h2 ><span className="font-bold">Price: </span><span className={`${screenmode? 'text-dmgreen' : 'text-lmblue'}`}>${viewData.price} </span> </h2>
                <h3 className="opacity-80 ">{viewData.description}</h3>
                </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;