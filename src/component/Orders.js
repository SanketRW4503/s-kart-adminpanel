import { useEffect, useState } from "react"
import { toast } from "react-toastify";

export default function Orders() {

    const [orders,setOrders]= useState([])
    const [selectedOption,setSelectedOption]= useState('Not Delivered')
      async  function getAllOrders(){
            try {

                const res= await fetch(process.env.GET_ORDERS,{
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',

                  });
                const json = await res.json();
                setOrders(json.result)
                console.log(json)

            } catch (error) {   
                console.log(error)
            }


    }

async function handleStatus(order_id,delivery_status){
    toast.loading('Processing...')
    let dataset= {order_id:order_id,delivery_status:delivery_status}
    dataset= JSON.stringify(dataset);

        try {
            const res= await fetch(process.env.UPDATE_DELIVARY_STATUS,{
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body:dataset
                  });
            
            const json= await res.json()
            if(json.success==true){
                toast.dismiss()
                toast.success(json.message)
                getAllOrders()
            }else{
                toast.dismiss()
                toast.error(json.message)
            }
        } catch (error) {
            console.log(error)
        }

}



useEffect(()=>{
    if(orders?.length==0){
        getAllOrders();
    }


},[orders])

  return (
    <div className="mx-[10px]">
        <h1 className="foont-semibold text-[40px] mb-2">Orders</h1>
        <div>
            <label>Sort By:</label>
            <select value={selectedOption} onChange={(e)=>setSelectedOption(e.target.value)}>
                <option>Not Delivered</option>
                <option>Deliveried</option>
            </select>
        </div>
        <table className="border w-[90%] m-[auto]">
            <thead className="border bg-slate">
                <th>Sr.no</th>
                <th>Order ID</th>
                <th>Product ID</th>
                <th>User Address</th>
                <th>Amount</th>
                <th>Payment Status</th>
                <th>Delevary Status</th>
                <th>Action</th>
            </thead>
            <tbody >
                        {
                                orders?.length>0?orders.map((o,index)=>{
                                    return (o.delevery_status==selectedOption?<tr className=" justify-between items-center" >
                                    <td className="px-4">{index+1}</td>
                                    <td className="px-4">{o.order_id}</td>
                                    { o.product_details.map((i)=>
                                    {return<td className="text-[blue] underline cursor-pointer px-2">
                                    <a href={'https://ss-kart-231bd.web.app/details/'+i.product_id} target='_blank'>{i.product_id}</a></td>})}
                                    <td className="px-4">{o.address} Email:{o.email}</td>
                                    <td className="px-4">{o.amount}</td>
                                    <td className="px-4">{o.payment_status}</td>
                                    <td className="px-4">{o.delevery_status}</td>
                                        {o.delevery_status=='Deliveried'?<td className="px-4" >
                                        <button onClick={()=>handleStatus(o.order_id,'Not Delivered')}
                                        className="bg-theme text-[white] my-2 px-[10px]">Tick As Not Delivered</button></td>
                                    :<td className="px-4" >
                                    <button onClick={()=>handleStatus(o.order_id,'Deliveried')}
                                    className="bg-theme text-[white] my-2 px-[10px]">Tick As Delivered</button></td>}
                                    </tr>:null
                                    )

                                }):<div>NO ORDERS AVAILABLE</div>

                        }
          
            </tbody>

        </table>

    </div>
  )
}
