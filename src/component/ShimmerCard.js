


// Shimmer Component
export default function ShimmerCard() {
  return (
    
    <div className="flex flex-wrap justify-center">
      {
        Array(10).fill('').map((e,index) => {
          return <section className='w-[300px]  m-[20px] ' key={index}>
            <div className=' bg-slate-300 h-[200px]'></div>
            <div className='bg-slate-200 w-[300px] h-4 mt-3'></div>
            <div className='bg-slate-200 w-[300px] h-4 mt-3'></div>

                </section>
        })
      }
    </div>

  )
}
