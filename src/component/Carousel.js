import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import slidebtn from '../../assets/images/next.png'
import Add_Carousel from './Add_Carousel';
import { toast } from 'react-toastify';

export default function Carousel() {

    const [banner, setBanner] = useState([])
    const [addcarousel, setAddCarausel] = useState(false)
    const [carouselinfo, setcarouselinfo] = useState([])




    async function getAllCarousel() {
        try {
            const res = await fetch(process.env.GET_ALL_BANNER, {
                method: 'GET', withCredntials: true,
                credentials: 'include'
            })
            const json = await res.json()
            console.log(json)
            if (json.success == true) {
                setBanner(json.all_banners)

            } else {
                console.log('could not fetch carousel');
            }

        } catch (error) {

        }
    }



    useEffect(() => {
        getAllCarousel()
    }, [])


    function handleEdit(i) {
        setcarouselinfo(i);
        setAddCarausel(true)
    }


    function handleDelete(i) {

        let dataset={product_id:i?.product_id,public_id:i?.image?.public_id};
        dataset= JSON.stringify(dataset);
        toast.loading('Processing...')
        delete_carousel(dataset)

    }


    async function delete_carousel(dataset){
        console.log(dataset)
        const res = await fetch(process.env.DELETE_BANNER, {
            method: 'POST', withCredntials: true,
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body:dataset
        })
        const json= await res.json()
        console.log(json)
        if(json.success==true){
            toast.dismiss()
            toast.success(json.message)
            getAllCarousel()
        }else{
            toast.dismiss()
            toast.error(json.message)
        }
    }
    

    return (
        <div>

            <div className='mx-[1%] border relative rounded-lg bg-slate p-[20px]'>
                <h1 className='font-semibold text-[30px]'>All Carousels:</h1>
                {addcarousel == false ? <h1 onClick={() => setAddCarausel(true)}
                    className='bg-theme text-[white]  group-hover:text-[red] cursor-pointer absolute top-2 right-2
              rounded-[50%] w-[50px] h-[50px]  text-[30px] text-center'>+</h1> : null
                }
                <div className='flex flex-wrap items-center justify-evenly '>

                    {
                        banner.length > 0 ? banner.map((i, index) => {
                            return <div className='border my-3' width={300} height={300} key={index}>
                                <img src={i?.image?.url} width={300} height={300} />
                                <div className='flex flex-col'>
                                    <button onClick={() => handleDelete(i)}
                                        className='bg-theme text-[white] m-1'>Delete</button>

                                </div>
                            </div>

                        }) : <div>No Carousel Present</div>
                    }
                </div>

            </div>
            {
                addcarousel == true ? <Add_Carousel setAddCarausel={setAddCarausel} getAllCarousel={getAllCarousel}
                /> : null
            }
        </div>
    );
}
