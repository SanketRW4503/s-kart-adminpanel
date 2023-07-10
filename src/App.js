import React from "react";
import  ReactDOM  from "react-dom/client";
import Header from "./component/Header";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./component/LoginPage";
import Add_Product from "./component/Add_Product";
import LoginPage from "./component/LoginPage";
import HomePage from "./component/HomePage";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import store from "./utility/store";
import Add_Category from "./component/Add_Category";
import Edit_Products from "./component/Edit_Products";
import Orders from "./component/Orders";
import Carousel from "./component/Carousel";



const App=()=>{
    return<>
        <Provider store={store}>
                <Header/>
                <Outlet/>
       </Provider>
    </>
}

const router = createBrowserRouter([{
    path:'/',
    element:<App/>,
    children:[
       {
            path:'/'
            ,element:<LoginPage/>
        },
        {
            path:'/home'
            ,element:<HomePage/>
        }, {
            path:'/add-product'
            ,element:<Add_Product/>
        },{
            path:'/add-category'
            ,element:<Add_Category/>
        },{
            path:'/edit-product'
            ,element:<Edit_Products/>
        },{
            path:'/orders'
            ,element:<Orders/>
        },{
            path:'/carousel'
            ,element:<Carousel/>
        }
    
    
    ]
}])


const root= ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router}/>)