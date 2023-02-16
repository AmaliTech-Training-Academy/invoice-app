import React from 'react'
import InvoiceNav from '../components/Home/InvoiceNav/InvoiceNav'
import NoContent from '../components/Home/Card/NoContent'
import Card from '../components/Home/Card/Card'
import { useState, useEffect } from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import Loader from '../components/Home/Loader/Loader'

const Home = ({darkMode, }) => {
  const [invoice, setInvoice] = useState({})
  const [invoicefilter, setInvoiceFilter] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const checkStatus = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setInvoiceFilter([...invoicefilter, value]);
    } else {
      setInvoiceFilter(invoicefilter.filter(cb => cb !== value));
    }
  }
 
  const fetchInvoice = async () => {
    setIsLoading(true)
    const resData = await axios.get("https://invoice-api-9l7b.onrender.com/invoice")
    setInvoice(resData.data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchInvoice()
  },[])
  
  return (
    <>
      <div className='p-6 pt-28 md:px-9 space-y-3 font-spartan h-screen  
        lg:pt-14 lg:pr-0 lg:pl-14 lg:w-[700px] lg:m-auto xl:pt-12 xl:w-[1000px] 
        xl:m-auto overflow-auto scroll-hide'>
        <InvoiceNav invoice={invoice} darkMode={darkMode} checkStatus={checkStatus}/>

        <div className='space-y-5'>
          {
            isLoading ? <Loader /> :
              invoice.length
              ? invoicefilter.length 
                ? invoice.filter(result => invoicefilter.includes(result.status)).map((invoice,key)=>{
                return (
                        <div key={key}>
                        <Link to={`/viewinvoice/${invoice.id}`}>
                          <Card darkMode={darkMode} invoiceId={invoice.id} 
                            name={invoice.clientName} dueDate={invoice.paymentDue}
                            amount={invoice.total.toFixed(2)} status={invoice.status}
                          />  
                        </Link>
                      </div>
                      )
              }) : 
              invoice.map((invoice,key)=>{
                return (
                  <div key={key}>
                    <Link to={`/viewinvoice/${invoice.id}`}>
                      <Card darkMode={darkMode} invoiceId={invoice.id} 
                        name={invoice.clientName} dueDate={invoice.paymentDue}
                        amount={invoice.total.toFixed(2)} status={invoice.status}
                      />  
                    </Link>
                  </div>
                )
            })
            : <NoContent /> 
        }
        </div>
      </div>
    </>
  )
}

export default Home