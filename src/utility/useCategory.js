import { useEffect, useState } from "react"


export default function useCategory(){

    const [category,setCategory]=useState([]);
    useEffect(() => {
        getAllCategory();
    }, [updateCategoryStatus])

        function updateCategoryStatus(){
                // empty function
        }

        async function getAllCategory() {
            const res= await fetch('https://s-kart-backend.onrender.com/category/admin/get-category',{
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',

            });
      
            const json = await res.json()
            setCategory(json.allcollections)
        }

    // custom hook :it will return all categories 

    return {category,updateCategoryStatus}

}