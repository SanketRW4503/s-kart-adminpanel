import React, { useEffect, useState } from 'react'
import useCategory from '../utility/useCategory';
import { toast } from 'react-toastify';



export default function Add_Product(props) {


  const [cat, setCat] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [rate, setRate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [search_keyword, setSearch_Keyword] = useState([])
  const [text, setText] = useState('')


  const { category } = useCategory([])

 function  handleimage(e) {
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
       setImage(reader.result)
      }
    }


  }

  async function validateData(e) {

    e.preventDefault()

    if (title.length == 0) {
      toast.error('Please Enter Product Title !')
    } if (search_keyword.length == 0) {
      toast.error('Please Enter Some Search Keywords !')
    } else if (price.length == 0) {
      toast.error('Please Enter Product Price !')
    } else if (description.length == 0) {
      toast.error('Please Enter Product description !')
    } else if (image.length == 0) {
      toast.error('Select image !')
    } else if (rate.length == 0) {
      toast.error('Please Set Product Rating!')
    } else if (cat.length == 0) {
      toast.error('Please Select Product Category!')
    } else if (quantity.length == 0) {
      toast.error('Please Set Product Quantity !')
    } else if (props?.Product_up?._id !== undefined) {
      // we have to update the product
      toast.loading('Update Product....');
      let product_data = {
        productid: props?.Product_up?._id
        , updatedata: { title: title, price: price, description: description, image: image, search_keyword: search_keyword, rating: rate, quantity: quantity, category: cat }
      }


      product_data = JSON.stringify(product_data);

      update_product_data(product_data)
    }
    else {

      // we have to Add the product
      toast.loading('Add Product....');
      let product_data = { title: title, price: price, description: description, image: image, rating: rate, search_keyword: search_keyword, quantity: quantity, category: cat }


      product_data = JSON.stringify(product_data);
      up_product_data(product_data)
    }
  }

  // this will update the product
  async function update_product_data(product_data) {
    const res = await fetch(process.env.UPDATE_PRODUCT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: product_data
    })
    const json = await res.json()
    if (json.success) {
      toast.dismiss()
      toast.success(json.message)

    } else {
      toast.dismiss()
      toast.error(json.message)

    }
  }


  // this will add the product to mongodb
  async function up_product_data(product_data) {
    const res = await fetch(process.env.ADD_PRODUCT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: product_data
    })
    const json = await res.json()
    console.log(json)
    if (json.success) {
      toast.dismiss()
      toast.success(json.message)
    
    } else {
      toast.dismiss()
      toast.error(json.message)


    }

  }


  function handleCategory(e) {
    setCat(e.target.value)

  }

  function handleRating(e) {
    setRate(e.target.value)

  }
  function add_the_keyword() {

    const newData = [...search_keyword, text];
    setSearch_Keyword(newData);

  }

  function removeItem(index) {

    let newArray = search_keyword.filter((_, i) => i !== index);
    setSearch_Keyword(newArray)
  }


  function handledelete(userid, public_id, e) {
    e.preventDefault()
    toast.loading('Processing...')
    let dataset = { _id: userid, public_id: public_id }
    dataset = JSON.stringify(dataset);

    deleteProduct(dataset)

  }


  async function deleteProduct(dataset) {

    try {
      const res = await fetch(process.env.DELETE_PRODUCT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: dataset
      })

      const json = await res.json()

      if (json.success == true) {
        toast.dismiss();
        toast.success(json.message)
        props?.setUpdateStatus(!props?.updateStatus);
      } else {
        toast.dismiss();
        toast.error(json.message)
      }

    } catch (error) {

    }

  }

  useEffect(() => {

    if (props?.Product_up?.title !== undefined) {
      props.setUpdateStatus(false)
      setTitle(props.Product_up.title)
      setPrice(props.Product_up.price)
      setDescription(props.Product_up.description)
      setCat(props.Product_up.category)
      document.getElementById('grid-state').value = props.Product_up.category
      setQuantity(props.Product_up.quantity)
      setImage(props.Product_up.image.url)
      setSearch_Keyword(props.Product_up.search_keyword)
      setRate(props.Product_up.rating)
    }
  }, [props])

  return (
    <form className="w-full max-w-lg m-[auto] shadow-lg p-[20px] border rounded-md">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            Product Title
          </label>
          <input value={title} onChange={(e) => { setTitle(e.target.value) }}
            className="appearance-none block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none " id="grid-first-name" type="text" placeholder="e.g redmi note 9" />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            PRICE
          </label>
          <input value={price} onChange={(e) => { setPrice(e.target.value) }}
            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
          focus:border-gray-500" id="grid-last-name" type="number" />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            PRODUCT Description
          </label>
          <textarea value={description} onChange={(e) => { setDescription(e.target.value) }}
            className="resize rounded-md border w-[100%] h-[80px] outline-none"></textarea>


        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            Quantity
          </label>
          <input value={quantity} onChange={(e) => { setQuantity(e.target.value) }}
            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
    focus:border-gray-500" id="grid-city" type="number" />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
            Select Category
          </label>
          <div className="relative">
            <select onChange={(e) => { handleCategory(e) }}
              className="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              {
                category.length > 0 ? category.map((c, index) => {
                  return <option key={index} value={c.category}>{c?.category}</option>

                }) : null
              }
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
            Add Rating
          </label>
          <div className="relative">
            <select onChange={((e) => { handleRating(e) })} id="mySelect" value={rate}
              className="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
              <option value={2.0}>2.0</option>
              <option value={2.5}>2.5</option>
              <option value={3.0}>3.0</option>
              <option value={3.5}>3.5</option>
              <option value={4.0}>4.0</option>
              <option value={4.5}>4.5</option>

            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>


        <div className="border rounded-md p-[10px] w-full mt-[20px] px-3 mb-6 md:mb-0">
          <label>Select Product Image:</label>
          {
            image ? <div className="w-full mt-[20px] px-3 mb-6 md:mb-0" >

              <img src={image} width={300} />
            </div> : null
          }
          <div className="w-full mt-[20px] px-3 mb-6 md:mb-0">
            <input type='file' name='file' onChange={(e) => handleimage(e)} />
          </div>
        </div>
        <div className="border rounded-md p-[10px] w-full mt-[20px] px-3 mb-6 md:mb-0">
          {search_keyword.length > 0 ? <div className='flex items-center flex-wrap '>Added Keywords:{
            search_keyword.map((k, index) => {
              return <div key={index} className='mx-1 bg-slate px-[10px]  rounded-md my-[3px] flex items-center'>
                <span key={index}>{k} </span>
                <span onClick={() => removeItem(index)}
                  className='font-semibold mx-[2px] mt-[-3px] cursor-pointer text-[20px]'>&times;</span></div>
            })}
          </div> : null
          }
          <div >
            <input type='text' value={text} placeholder='Add Keywords'
              className='outline-none my-[8px] appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
             focus:border-gray-50' onChange={(e) => setText(e.target.value)} />
            <p onClick={add_the_keyword} className='bg-theme w-fit text-t-theme rounded-sm px-[10px] cursor-pointer'>Add</p>
          </div>
        </div>


      </div>
      <button onClick={(e) => validateData(e)}
        className='bg-theme text-t-theme rounded-md w-[100%] mx-[0px] my-[10px]'
      >{props?.Product_up?.title !== undefined ? 'Update Product' : 'Add Product'}</button>

      {props?.Product_up?.title !== undefined ? <button onClick={(e) => handledelete(props?.Product_up?._id, props?.Product_up?.image?.public_id, e)}
        className='bg-[red] text-t-theme rounded-md w-[100%] mx-[0px] my-[10px]'
      >Delete This Product </button> : null

      }
    </form>
  )
}
