import shopicon from '../../assets/images/shop-icon.png'
import searchicon from '../../assets/images/searchicon.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import store from '../utility/store'
import { setLoginStatus } from '../utility/loginSlice'
import { ToastContainer, toast } from 'react-toastify'



export default function Header() {


  let loginstatus = useSelector(store => store.login.status)
  const [menucss, setMenucss] = useState({ display: 'none' })

  const navigate= useNavigate();
  const dispatch = useDispatch();


  // this function will check admin status
  async function AdminLoginStatus() {

    const res = await fetch(process.env.LOGIN_STATUS, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    const json = await res.json()
    if (json.success == true) {
      dispatch(setLoginStatus(true));
    } else {
      dispatch(setLoginStatus(false));

    }

  }


  // this function will logout admin 

  // logout user
  async function logoutAdmin() {
    toast.loading('logging out...');

    const res = await fetch(process.env.LOG_OUT, {
      method: 'GET', withCredntials: true,
      credentials: 'include'
    });

    const json = await res.json()

    if (json.success == true) {
      toast.dismiss();

      dispatch(setLoginStatus(false))
      navigate("/")
      toast.success('log out successfully');

    } else {
      toast.dismiss();
      toast.error(json.message);

    }

  }


  useEffect(() => {
    AdminLoginStatus();

  }, []);

  useEffect(() => {
    if (loginstatus == true) {
      setMenucss({ display: 'flex' })
    } else {
      setMenucss({ display: 'none' })
    }
  }, [loginstatus])


  return (
    <div>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
    <nav className='px-4 py-4 flex justify-between items-center bg-theme text-t-theme mb-4 shadow'>
      
      <div className='flex'>
        <img src={shopicon} width={50} height={50} className='invert'/>
        <h1 className='font-semibold text-[40px] italic cursor-pointer'>S-Kart.IN-Admin Panel</h1>
      </div>
      <ul className='flex' style={menucss}>
        <Link to='/add-product'><li className='px-4 cursor-pointer'>Add Products</li></Link>
        <Link to='/edit-product'><li className='px-4 cursor-pointer'>Edit Products</li></Link>
        <Link to='/add-category'><li className='px-4 cursor-pointer'>Add/Edit Category</li></Link>
        <Link to='/carousel'><li className='px-4 cursor-pointer'>Add/Edit carousel</li></Link>

        <Link to='/orders'><li className='px-4 cursor-pointer'>Orders</li></Link>

        <li onClick={() => { logoutAdmin() }}
          className='px-4 cursor-pointer'>Logout</li>

      </ul>

    </nav>
    </div>
  )
}
