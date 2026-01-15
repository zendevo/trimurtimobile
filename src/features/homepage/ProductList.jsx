import React, { use, useEffect, useState } from 'react'
import apiClient from '../../services/apiClient'
import { useNavigate } from 'react-router-dom'

function ProductList() {
    const [products,setProducts] = useState([])
    const [page,setPage] = useState(1)
    const [search,setSearch] = useState('')
    const [category,setCategory]=useState("all")
    const [totalPages,setTotalPages] = useState(0)
    const navigate = useNavigate()
    const fetchProducts =async()=>{
        const res = await apiClient.get('/products/list',{
            params :{
                page,
                limit:1,
                search,
                category:category === 'all' ? "" : category
            }
        })
        console.log("res",res)
        setProducts(res?.data?.products)
        setTotalPages(res.data.totalPages)
    }

    useEffect(()=>{
        const timer = setTimeout(fetchProducts,500)
        return ()=> clearTimeout(timer)
        // fetchProducts()
    },[page,search,category])

  return (
    <div>
          <button onClick={()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        navigate('/')
      }}>Logout</button>
      <h2>Products</h2>
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="android">Android</option>
        <option value="iphone">iPhone</option>
      </select>

      <div className="grid">
        {products.length > 0 && products.map((p) => (
          <div key={p._id}>
            <img
              src={`http://localhost:5000/${p?.image}`}
              width="150"
              alt={p.name}
            />
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>

      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </button>
      <button onClick={() => setPage(page + 1)} disabled={page >=totalPages}>Next</button>
    </div>
  )
}

export default ProductList