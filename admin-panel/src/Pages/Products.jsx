import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema= z.object({
    productTitle:z.string().min(1,'Title is required!'),
    price:z.coerce.number().min(1,'Price is required!'),
    category:z.string().min(1,'Category is required!'),
    image:z.string().min(1,'Image is required!'),
})
function Products({productData,totalProduct,totalPrice,deleteProduct,addProduct,updateProduct}) {
    const [isForm,setisForm] = useState(false);
    const [editProductid,setEditProductid] = useState(null);
    const [searchProduct,setSearchProduct] = useState('');
    const [selectCategory,setselectCategory] = useState('');
    const [productPrice ,setproductPrice] = useState('');

    const {register,handleSubmit,reset,formState:{errors}} = useForm({
        resolver:zodResolver(formSchema)
    });

    function checkFormStatus(){
        setisForm(!isForm)
    }

    function handleForm(data){
        if(editProductid){
           const updatedProduct = {
            id:editProductid,
            title:data.productTitle,
            price:data.price,
            category:data.category,
            image:data.image,
            description:data.description
           }
           updateProduct(updatedProduct)
        }
        else{
           const newProduct = {
             id:Date.now(),
        title:data.productTitle,
        price:data.price,
        category:data.category,
        image:data.image,
        description:data.description
           }
           addProduct(newProduct)
        }
     setEditProductid(null)
     reset();
     setisForm(false)   
    }

    function handleCancel(){
        setisForm(false);
    }

    function handleEdit(product){
        setEditProductid(product.id)
      reset({
        productTitle:product.title,
        price:product.price,
        category:product.category,
        image:product.image,
        description:product.description
      });
      setisForm(true)
    }
    
    let filterProduct = productData; 
    if(selectCategory !== ''){
     filterProduct = filterProduct.filter((p)=> p.category === selectCategory)
    }
    if(searchProduct !== ''){
    filterProduct = filterProduct.filter((p)=> p.title.toLowerCase().includes(searchProduct.toLowerCase()));
    }
    if(productPrice === 'low'){
    filterProduct = [...filterProduct].sort((a,b)=> a.price - b.price);
    }
    if(productPrice === 'high'){
    filterProduct = [...filterProduct].sort((a,b)=> b.price - a.price);
    }
  return (
    <div>
        <div className='flex justify-between items-center gap-4 p-8 '>
            <h1 className='md:text-3xl font-bold tracking-tight text-2xl'>Products</h1>
            <button className='flex gap-2 justify-center items-center text-white rounded-lg hover:bg-gray-800 active:scale-95 hover:scale-105 transition-all bg-black px-4 py-2 cursor-pointer' onClick={checkFormStatus}><FaPlus className='text-white'/>Add Product</button>
        </div>
        <div className='px-8'>
        <div className='flex justify-between p-3 items-center rounded-lg border border-gray-300 bg-white'>
            <input type="text" name="" id="" placeholder='search products...' className='outline-none w-full' onChange={(e)=> setSearchProduct(e.target.value)}/>
            <IoSearchOutline className='text-xl cursor-pointer'/>
        </div>
        </div>

{isForm?<div className='px-8 mt-6 rounded-lg'>
    <div className='bg-white p-8 rounded-lg border border-gray-300'>
        <h1 className=' text-xl font-bold'>Add Product</h1>
        <p>Fill in the detail below to add a new product</p>
        <form className='flex flex-col mt-8' onSubmit={handleSubmit(handleForm)}>
            <label className='font-bold'>Product Title</label>
            <input type="text" placeholder='Enter product title' className='p-2 rounded-lg outline-none placeholder:text-sm border border-gray-300 mt-1'  {...register('productTitle')}/>
            {errors.productTitle && <p className='text-red-600'>{errors.productTitle.message}</p>}
            <label className='font-bold mt-3'>Price</label>
            <input type="number" placeholder='Enter price' className='p-2 rounded-lg outline-none placeholder:text-sm border border-gray-300 mt-1' {...register('price')}/>
            {errors.price && <p className='text-red-600'>{errors.price.message}</p>}
            <label className='font-bold mt-3'>Category</label>
            <select className='p-2 rounded-lg outline-none placeholder:text-sm border border-gray-300 mt-1 text-sm text-gray-500' {...register('category')}>
                <option value="">Select Category</option>
                <option value="men's clothing">Mens's Clothing</option>
                <option value="jewelery">Jewelery</option>
                <option value="electronics">Electronics</option>
                <option value="women's clothing">Women's Clothing</option>
            </select>
            {errors.category && <p className='text-red-600'>{errors.category.message}</p>}
            <label className='font-bold mt-3'>Image URL</label>
            <input type="text" placeholder='Enter image URL' className='p-2 rounded-lg outline-none placeholder:text-sm border border-gray-300 mt-1' {...register('image')}/>
            {errors.image && <p className='text-red-600'>{errors.image.message}</p>}
            <label className='font-bold mt-3'>Description</label>
            <textarea placeholder='Enter product description' className='p-2 rounded-lg outline-none placeholder:text-sm border border-gray-300 mt-1' placeholder='Enter product description...' {...register('description')}></textarea>
            <div className='flex gap-6 mt-4'>
            <button className='text-white bg-black md:px-10 px-6 hover:bg-gray-800 active:scale-95 hover:scale-105 transition-all md:py-2 text-sm rounded-lg cursor-pointer' type='submit'>Submit</button>
            <button className='bg-gray-200 text-sm px-12 py-3 hover:bg-gray-300 active:scale-95 hover:scale-105 transition-all rounded-lg cursor-pointer' type='button' onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    </div>
</div>:''}
    
                                        {/* Category and Price Filters */}
    <div className='flex flex-row justify-between px-8 mt-10'>
      <div>
         <select className='p-2 rounded-lg outline-none placeholder:text-sm border border-gray-300 text-sm text-gray-500 bg-white' onChange={(e)=> setselectCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="men's clothing">Mens's Clothing</option>
                <option value="jewelery">Jewelery</option>
                <option value="electronics">Electronics</option>
                <option value="women's clothing">Women's Clothing</option>
            </select>
      </div>
      <div>
         <select className='p-2 rounded-lg outline-none placeholder:text-sm border border-gray-300 bg-white text-sm text-gray-500' onChange={(e)=> setproductPrice(e.target.value)}>
                <option value="">Sort by Price</option>
                <option value="low">Price Low to High</option>
                <option value="high">Price High to Low</option>
            </select>
      </div>
    </div>

    <div className='px-8'>
        <div className='bg-white mt-4 rounded-lg shadow-md overflow-x-auto p-2 md:p-0'>
        <table className='w-full border border-gray-300'>
            <thead>
                <tr className='text-left'>
                    <th className='md:p-3 p-2 md:text-base text-sm border border-gray-300'>Image</th>
                    <th className='md:p-3 p-2 md:text-base text-sm  border border-gray-300'>Title</th>
                    <th className='md:p-3 p-2 md:text-base text-sm  border border-gray-300'>Category</th>
                    <th className='md:p-3 p-2 md:text-base text-sm  border border-gray-300'>Price</th>
                    <th className='md:p-3 p-2 md:text-base text-sm  border border-gray-300'>Actions</th>
                </tr>
            </thead>
        <tbody>
           {
       filterProduct.map((p)=>(
            <tr key={p.id} className='border'>
                <td className='md:p-3 p-2 border md:text-base text-sm  border-gray-300'>{<img src={p.image} alt={p.title} className='w-8 h-8 md:w-10 md:h-10 object-contain'/>}</td>
                <td className='md:p-3 p-2 border md:text-base text-sm  border-gray-300 truncate'>{p.title}</td>
                <td className='md:p-3 p-2 border md:text-base text-sm  border-gray-300'>{p.category}</td>
                <td className='md:p-3 p-2 border md:text-base text-sm  border-gray-300'>${p.price}</td>
                <td className='md:p-3 p-2 border md:text-base text-sm  border-gray-300'><div className='flex gap-2'><CiEdit className='text-xl cursor-pointer' onClick={()=> handleEdit(p)}/><MdDeleteForever className='text-xl cursor-pointer' onClick={()=> deleteProduct(p.id)}/></div></td>
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

export default Products
