import { useState } from 'react'
import deleteIcon from '../../assets/images/delete.png'
import editicon from '../../assets/images/edit.png'
import useCategory from '../utility/useCategory'
import { toast } from 'react-toastify'


export default function Add_Category() {

    const [category_to_to, setCategory_to_up] = useState('')
    const [editcat, setEditCat] = useState('')
    // custom hook :it will return all categories 
    const { category, updateCategoryStatus } = useCategory([])

    async function add_category() {
        toast.loading('Adding Category...')

        let cat_data = { category: category_to_to }
        cat_data = JSON.stringify(cat_data)

        const res = await fetch(process.env.SET_CATEGORY, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: cat_data
        });

        const json = await res.json()

        if (json.success == true) {
            toast.dismiss()
            toast.success(json.message)
            updateCategoryStatus()

        } else {
            toast.dismiss()
            toast.error(json.message)
        }
    }


    async function deleteCat(cat_name) {
        toast.loading('Deleting Category...')
        let cat_data = { category: cat_name }
        cat_data = JSON.stringify(cat_data)

        const res = await fetch(process.env.DELETE_CATEGORY, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: cat_data
        });

        const json = await res.json()

        if (json.success == true) {
            toast.dismiss()
            toast.success(json.message);
            updateCategoryStatus()

        } else {
            toast.dismiss()
            toast.error(json.message);
        }
    }


    // edit category
    function editConfig(cat_name, status) {
        let labeltag = document.getElementById(cat_name)
        let edit_panel = document.getElementById('edit-panel' + cat_name)
        let edit_btn = document.getElementById('edit-btn' + cat_name)
        let save_btn = document.getElementById('save-btn' + cat_name)

        if (status == false) {
            labeltag.style.display = 'none';
            edit_btn.style.display = 'none';
            save_btn.style.display = 'flex';
            edit_panel.style.display = 'flex';
            setEditCat(cat_name);
        } else {
            labeltag.style.display = 'flex';
            edit_btn.style.display = 'flex';
            save_btn.style.display = 'none';
            edit_panel.style.display = 'none';
        }

    }

    async function saveEditedCat(cat_name) {
        toast.loading('Updating Category Name...')
        let cat_data = { category: cat_name, newcategory: editcat }
        cat_data = JSON.stringify(cat_data)

        const res = await fetch(process.env.UPDATE_CATEGORY, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: cat_data
        });

        const json = await res.json()

        if (json.success == true) {
            toast.dismiss()
            toast.success(json.message);
            updateCategoryStatus()
            editConfig(cat_name, true)
        } else {
            toast.dismiss()
            toast.error(json.message);
        }


    }

    return (
        <div className='w-[30%] m-[auto]'>
            {/* <ToastContainer/> */}
            <div className='flex flex-col p-[20px] border'>
                <input type='text' className='border rounded-sm outline-none' value={category_to_to} onChange={(e) => setCategory_to_up(e.target.value)}
                    placeholder='e.g Mobile' />
                <button onClick={() => add_category()}
                    className='bg-theme text-t-theme my-[10px] rounded-lg'>Add Category</button>
            </div>

            <div className='mt-[50px]'>

                {
                    category.length !== 0 ? category.map((c, index) => {

                        return <span key={index} className='flex border items-center justify-between p-[10px]'>

                            <label id={c.category}>{c.category}</label>
                            <input type='text' value={editcat} id={'edit-panel' + c.category} onChange={(e) => setEditCat(e.target.value)}
                                className='hidden outline-none border' />
                            <span className='flex items-center'>
                                <img src={editicon} onClick={() => editConfig(c.category, false)}
                                    width={20} className='mx-[5px] cursor-pointer' id={'edit-btn' + c.category} />
                                <button onClick={() => saveEditedCat(c.category)}
                                    className='hidden bg-green-500 text-white rounded-lg px-[10px]' id={'save-btn' + c.category} >Save</button>

                                <img onClick={() => deleteCat(c.category)}
                                    src={deleteIcon} width={20} className='mx-[5px] cursor-pointer' />
                            </span>
                        </span>
                    })
                        : null
                }
            </div>




        </div>




    )
}
