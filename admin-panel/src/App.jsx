import React, { useEffect, useState } from 'react'
import Sidebar from './Layout/Sidebar'
import Navbar from './Layout/Navbar'
import Dashboard from './Pages/Dashboard'
import Products from './Pages/Products'
import './App.css'
import { Route, Routes } from 'react-router'



function App() {
   const [productData,setproductData] = useState([]);
   const [isLoading,setisLoading] = useState(false);
   const [error,setError] = useState(null);
   const [newProduct,setnewProduct] = useState([]);
   const [isOpen,setisOpen] = useState(true)

  async function getData(){
    try{
    setisLoading(true);
    setError(null);
    const response = await fetch('https://fakestoreapi.com/products');
    if(!response.ok){
    setisLoading(false)
    throw new Error('Failed to Fetch');
    }
    const data = await response.json();
    console.log(data)
    setproductData(data);
    setisLoading(false);
  }
  catch(err){
     setError(err);
     setisLoading(false)
   }
  }
  useEffect(()=>{
    getData();
  },[])
 
  const findTotalProduct = productData.length;

  const findTotalPrice = productData.reduce((acc,curr)=>{
    return acc+curr.price;
  },0)
  console.log(findTotalPrice.toFixed(2));
  console.log(findTotalProduct);

  function handleDelete(id){
  const deleteProduct = productData.filter((p)=>{
      return p.id !== id
  })
  setproductData(deleteProduct)
  console.log(deleteProduct)
  }

  function addnewProduct(obj){
    setproductData([...productData,obj])
  }
  function handleupdateProduct(updatedProduct){
    setproductData(prev => prev.map((p)=>(
      p.id === updatedProduct.id? updatedProduct:p
    )))
  }
  function toggleMenu(){
    setisOpen(!isOpen)
  }
  return (
    <div className='flex'>
            <Sidebar isOpen={isOpen}/>
            <div className='flex-1 bg-gray-100 min-h-screen'>
             <Navbar toggleMenu={toggleMenu} 
                     isOpen={isOpen}/>
             <Routes>
               <Route path='/' element={<Dashboard
             productData={productData}
             totalProduct = {findTotalProduct}
             totalPrice = {findTotalPrice}
             />} />
              <Route path='/products' element={<Products
             productData={productData}
             totalProduct = {findTotalProduct}
             totalPrice = {findTotalPrice}
             deleteProduct = {handleDelete}
             addProduct = {addnewProduct}
             updateProduct={handleupdateProduct}
             />} />
             </Routes>
            </div>
    </div>
  )
}

export default App
