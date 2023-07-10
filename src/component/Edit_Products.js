// import {  useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import editicon from '../../assets/images/edit.png'
import { useDispatch, useSelector } from 'react-redux';
import { storeData } from '../utility/dataSlice';
import Add_Product from './Add_Product';

export default function Edit_Products() {

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([])
    const [selectedOption, setOption] = useState('')
    const [updateProduct, setUpdateProduct] = useState(undefined)
    const [updateStatus, setUpdateStatus] = useState(false);

    const dispatch = useDispatch()
    const stored_data = useSelector(store => store.products.items)
    async function getAllProduct() {

        try {
            const res = await fetch(process.env.GET_PRODUCT, {
                method: 'GET', withCredntials: true,
                credentials: 'include'
            });
            const json = await res.json()


            setProducts(json.items)
            dispatch(storeData(json.items))
        } catch (error) {

            console.log('s' + error);
        }


    }
    async function getAllCategory() {

        try {
            const res = await fetch(process.env.GET_ALL_CATEGORY, {
                method: 'GET', withCredntials: true,
                credentials: 'include'
            });
            const json = await res.json()


            setCategory(json.allcollections)
        } catch (error) {
            console.log('s' + error);
        }


    }

    function setCategoryFun() {

        if (selectedOption !== 'All Products') {
            console.log(stored_data)
            let p = stored_data.filter((p) => {
                return p.category.trim() == selectedOption.trim()
            });
            setProducts(p);

        } else {

            setProducts(stored_data)
        }


    }


    useEffect(() => {
        setUpdateProduct(undefined)
        getAllProduct();
        console.log('update')
    }, [updateStatus])

    useEffect(() => {

        getAllProduct()
        getAllCategory()

    }, [])
    useEffect(() => {
        setCategoryFun();
    }, [selectedOption])
    return (
        <div>

            {
                updateProduct !== undefined ? <Add_Product Product_up={updateProduct} updateStatus={updateStatus} setUpdateStatus={setUpdateStatus} /> : null
            }


            <div className='m-[auto] w-[60%] mt-[30px] mb-[30px] p-[20px]]'>
                <label>Select Category:</label>
                <select className='border' onChange={(e) => setOption(e.target.value)}>
                    <option className='border'>All Products</option>
                    {
                        category.length > 0 ? category.map((c, index) => {
                            return <option key={index} className='border'>{c.category}</option>
                        }) : null

                    }
                </select>
            </div>
            <table className='m-[auto] w-[60%] mb-[50px]   border p-[20px]'>
                <thead className='flex justify-between p-[10px] flex-wrap border'>
                    <th>Sr.No</th>
                    <th>Product Name</th>
                    <th>Product ID</th>
                    <th>Action</th>

                </thead>
                <tbody className='flex justify-betweenp-[10px] flex-wrap flex-col border'>
                    {
                        products ? products.length > 0 ? products.map((p, index) => {
                            return <tr className='flex justify-between items-center border p-[20px]' >
                                <td>{index + 1}</td>
                                <td className='flex justify-between items-center'><img src={p.image.url} width={80} />{p.title.slice(0, 25)}</td>
                                <td className='text-[15px]'>{p._id}</td>
                                <td><img onClick={() => setUpdateProduct(p)}
                                    src={editicon} width={20} className='cursor-pointer' /></td>
                            </tr>
                        }) : null : null
                    }
                </tbody>
            </table>
        </div>
    )
}
