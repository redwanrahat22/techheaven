
import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Root from "../Root";
import Home from "../Home/Home";
import Blog from "../Blog/Blog";
import ErrorPage from "../ErrorPage";
import Login from "../AuthProvider/Login";
import Register from "../AuthProvider/Register";
import PrivateRoute from "../Private Routes/PrivateRoute";
import AddProduct from "../Private Routes/AddProduct";
import ShowProducts from "../Home/ShowProducts";
import ViewDetails from "../Private Routes/ViewDetails";
import UpdateInfo from "../Private Routes/UpdateInfo";
import AddtoCart from "../Navbar/AddtoCart";
import Contact from "../Contacts/Contact";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<ErrorPage>,</ErrorPage>,
      children: [
        {
          path: '/',
          element:<Home></Home>,
  
        },
        {
          path: '/blog',
          element:<Blog></Blog>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path:'/register',
          element:<Register></Register>

        },
        {
          path: '/addproduct',
          element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
        },
        {
          path: '/showproducts/:brand',
          loader: ({params})=> fetch(`http://localhost:5000/showproducts/${params.brand}`)
           ,
          element: <ShowProducts></ShowProducts>
        },
        {
          path:'/details/:brand/:id',
          loader: ({params})=>fetch(`http://localhost:5000/details/${params.brand}/${params.id}`),
          element:<PrivateRoute><ViewDetails></ViewDetails></PrivateRoute>
        },
        {
          path: '/update/:brand/:id',
          loader: ({params}) => fetch(`http://localhost:5000/update/${params.brand}/${params.id}`),
          element:<PrivateRoute><UpdateInfo></UpdateInfo></PrivateRoute>
        },
        
        {
          path: '/cart',
          element:<PrivateRoute><AddtoCart></AddtoCart></PrivateRoute>
        },
        {
          path: '/contact',
          element:<Contact></Contact>
        }


      ]
    },
  ]);

  export default router;