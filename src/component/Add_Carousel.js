import {  useState } from "react"
import { handleimage } from "../utility/utility"
import { toast } from "react-toastify"

export default function Add_Carousel(props) {

    const [name,setName]= useState('')
    const [image,setImage]= useState('')
    const [product_id,setProduct_ID]= useState('')

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
    function handle_add_carousel(e){
      e.preventDefault()
      if(name.length==0){
        toast.error('Please Enter Carousel Name !')
      }else if(image?.length==0){
          toast.error('Please Select Image')
      }else if(product_id.length==0){
        toast.error('Please Enter Product ID !')
      }else{
        toast.loading('Processing...')
        let dataset= {name:name,image:image,product_id:product_id}
        dataset=JSON.stringify(dataset);
        add_todb(dataset)
      }

    }


    // adds new carousel
      async function add_todb(dataset){
        const res = await fetch(process.env.ADD_BANNER, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: dataset
        });

        const json= await res.json()

        if(json.success==true){
          props.getAllCarousel()
          toast.dismiss()
          toast.success(json.message)
        }else{
          toast.dismiss()
          toast.error(json.message) 
        }

      }
      
      
     
  return (
    <div className='flex justify-center items-center my-8 relative'>
            
        <form className="flex flex-col p-[20px] bg-lightslate rounded-lg relative w-[500px] border ">
        <h1  onClick={()=>props.setAddCarausel(false)}
             className='bg-theme text-[white]   cursor-pointer absolute top-2 right-2
              rounded-[50%] w-[40px] h-[40px]  text-[23px] text-center'>&times;</h1>
        <label className="font-semibold text-[20px]">Add New Carousel</label>

            <label>Carousel Name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            <label>Select Image:</label>
            {
              image.length>0?<img src={image} width={300}/>:null
            }
            <input type="file" onChange={(e)=>handleimage(e)}/>
            <label>Add Product ID ("onclick it will redirect to that product"):</label>
            <input type="type" value={product_id} onChange={(e)=>setProduct_ID(e.target.value)} />
            <button onClick={(e)=>handle_add_carousel(e)}
            className="bg-theme text-[white] px-2 my-2 rounded-lg">Add New Carousel</button>
        </form>
    </div>
  )
}
