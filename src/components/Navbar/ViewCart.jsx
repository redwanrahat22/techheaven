import { useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
const ViewCart = ({ data,setIsOpen,DeleteFromCart }) => {
  const { prodID, prodName, prodBrand, prodPrice, prodUrl, prodRating } = data;

 


  return (
    <div>
      <div className="flex border-y-2 shadow-sm space-x-6">
        <NavLink to={`/details/${prodBrand}/${prodID}`}>
        <img src={prodUrl} className={`w-56`} alt="" />
        </NavLink>
        <div className="flex mt-2 font-page justify-between w-full">
        <NavLink to={`/details/${prodBrand}/${prodID}`}>
          <div className="space-y-4 mb-2  ">
            <h1 className="font-bold">{prodName}</h1>
            <h2>{prodBrand}</h2>
            <h3 className="text-orange-600">${prodPrice}</h3>
          </div>
          </NavLink>
          <div className="h-full space-y-11 mr-2">
            <h1>Quantity: 1</h1>
            <div className="m-auto w-1/2" onClick={() => setIsOpen(true)}>
              <h2 onClick={()=>(setIsOpen(true), DeleteFromCart(prodID))} className="text-xl text-red-500 outline outline-1 outline-slate-300 hover:bg-red-100 hover:cursor-pointer duration-200 rounded-sm  p-1 ml-[6px]">
                <BsTrash3Fill />
              </h2>
            
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ViewCart;
