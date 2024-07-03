import React, { useEffect, useState } from 'react'
import api from '../../services/api/api'

export default function HomePage() {

  //fetct data from api
  const [data, setData] = useState("No data")
  
  useEffect(() => {
    api.get('/profile')
      .then(response => {
        console.log(response.data)
        setData(response.data.email)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <h1>Home page</h1>
      <p>{data}</p>
    </div>
  )
}
