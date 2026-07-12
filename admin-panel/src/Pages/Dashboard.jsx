import React from 'react'

function Dashboard({productData,totalProduct,totalPrice}) {

  const sliceProduct = productData.slice(0,5);
  console.log(sliceProduct);
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-center items-center gap-6 p-8'>
        <div className=' bg-white shadow flex justify-center items-center flex-col py-8 rounded-lg'>
            <p className='font-medium'>Total Products</p>
            <p className='font-bold text-3xl mt-2'>{totalProduct}</p>
        </div>
        <div className=' bg-white shadow flex justify-center items-center flex-col py-8 rounded-lg'>
            <p className='font-medium'>Total Revenue</p>
            <p className='font-bold text-3xl mt-2'>$ {totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <div className='p-8 shadow rounded-lg overflow-hidden overflow-x-auto'>
        <div className='bg-white shadow-md rounded-lg p-6 mt-6'>
           <h1 className='text-xl font-semibold pb-2'>Recent Products</h1>
        <table className='w-full border border-gray-300'>
          <thead>
            <tr className=" text-left">
              <th className='md:p-3 p-2 md:text-base text-sm  border border-gray-300'>Image</th>
                <th className='md:p-3 p-2 md:text-base text-sm  border border-gray-300'>Title</th>
                <th className='md:p-3 p-2 md:text-base text-sm border border-gray-300'>Category</th>
                <th className='md:p-3 p-2 md:text-base text-sm  border border-gray-300'>Price</th>
            </tr>
          </thead>
          <tbody>
            {
          sliceProduct.map((p)=>(
              <tr key={p.id} className='border'>
               <td className='md:p-3 p-2 md:text-base text-sm  border border-gray-300'>{<img src={p.image} alt={p.title} className='w-10 h-10 object-contain'/>}</td>
              <td className='md:p-3 p-2 md:text-base text-sm  border border-gray-300'>{p.title}</td>
              <td className='md:p-3 p-2 md:text-base text-sm  border border-gray-300'>{p.category}</td>
              <td className='md:p-3 p-2 md:text-base text-sm  border border-gray-300'>$ {p.price}</td>
              </tr>
          ))
        }
          </tbody>
        </table>
            </div>
      </div>
    </div>
  )
}

export default Dashboard
