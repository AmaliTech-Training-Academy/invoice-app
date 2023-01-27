import React from 'react'
import InvoiceNav from '../components/Home/InvoiceNav/InvoiceNav'
import NoContent from '../components/Home/Card/NoContent'
import Card from '../components/Home/Card/Card'
import { useState, useEffect } from 'react'
import axios from 'axios'


const Home = ({darkMode}) => {
  const [invoice, setInvoice] = useState([])
  const [invoicefilter, setInvoiceFilter] = useState([])

  const checkStatus = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setInvoiceFilter([...invoicefilter, value]);
    } else {
      setInvoiceFilter(invoicefilter.filter(cb => cb !== value));
    }
    console.log(value,checked);
  }
 
  const fetchInvoice = async () => {
    const resData = await axios.get("https://invoice-api-9l7b.onrender.com/invoice")
    setInvoice(resData.data)
  }

  useEffect(() => {
    fetchInvoice()
  },[])
  
  return (
    <>
      <div className='p-6 pt-28 md:px-9 space-y-3 font-spartan lg:w-full h-screen  
        lg:px-36 xl:px-60 2xl:px-[20%] min-[2560px]:px-[30%] overflow-auto'>
        <InvoiceNav invoice={invoice} darkMode={darkMode} checkStatus={checkStatus}/>

        <div className='space-y-5'>

           {
               invoice.length
                ? invoicefilter.length 
                  ? invoice.filter(result => invoicefilter.includes(result.status)).map((invoice,key)=>{
                  return <Card darkMode={darkMode} key={key} invoiceId={invoice.id} 
                                name={invoice.clientName} dueDate={invoice.paymentDue}
                                amount={invoice.total} status={invoice.status}
                          />  
                }) : 
                invoice.map((invoice,key)=>{
                return <Card darkMode={darkMode} key={key} invoiceId={invoice.id} 
                              name={invoice.clientName} dueDate={invoice.paymentDue}
                              amount={invoice.total} status={invoice.status}
                        />  
              })
              : <NoContent /> 
           }
        {/* {
          console.log(invoice.length)
        } */}
        </div>
        {/* <CreateInvoice darkMode={darkMode} /> */}

        {/* <Viewinvoice /> */}
      </div>
    </>
  )
}

export default Home