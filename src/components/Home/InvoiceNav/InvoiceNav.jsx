import arrow from "../../../../public/assets/icon-arrow-down.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import Filter from "./Filter"
import { useState } from "react"
import CreateInvoice from "../../createInvoice/CreateInvoice"



const InvoiceNav = ({darkMode,invoice,checkStatus}) => {
    const [toggle, setToggle] = useState(false)
    const [invoiceToggle, setCreateToggle] = useState(false)
    const [back, setBack] = useState(false)

    // toggle filter
    const toggleFilter = () => {
        setToggle(!toggle)
    }

    // toggle createInvoice
    const toggleCreate = () => {
        setCreateToggle(!invoiceToggle)
    }

    // close createInvoice
    const goBack = () => {
        setBack(!back)
        console.log(back);
    }

    return (
        <div className="flex tracking-wide justify-between items-center font-bold mb-8 space-x-7">
            <div className="flex justify-between w-8/12 md:w-3/4">
                <div>
                    <h1 className="text-xl md:text-3xl lg:text-4xl">Invoices</h1>
                    <p className="text-light-gray text-sm lg:text-lg">
                        <span className="hidden md:inline-block">There are </span> {
                            invoice.length
                        } invoices
                    </p>
                </div>
                <div className="text-sm md:text-md lg:text-xl relative tracking-wide flex items-center space-x-2">
                    <label className="cursor-pointer" htmlFor="filter">Filter <span className="hidden md:inline-block">by status</span></label>
                    <button id="filter" onClick={toggleFilter} className="focus:outline-0">
                        {
                            !toggle 
                            ? <img src={arrow} /> 
                            : <img src={arrow} className="animate transition-all duration-1000 ease-in-out rotate-180"/>
                        }
                    </button>
                    {
                        toggle && <Filter darkMode={darkMode} checkStatus={checkStatus}/>
                    }
                </div>
            </div>
            <button onClick={toggleCreate} style={{color: "white", fontSize: ".9rem"}} 
                className="bg-dark-violet text-sm md:text-lg lg:text-xl md:p-2 rounded-full space-x-2
                flex p-2 items-center lg:space-x-4 border-0 w-24 md:w-40 lg:w-40 xl:w-48 h-11 md:h-12 lg:h-12 xl:h-14
                hover:bg-light-violet tracking-wider">
                <FontAwesomeIcon className="text-3xl lg:text-3xl xl:text-4xl" icon={faCirclePlus} color="white"/>
            <p className="lg:text-[1rem]">
                    New <span className="hidden md:inline-block">Invoice</span>
                </p>
            </button>
            {
                invoiceToggle && <CreateInvoice darkMode={darkMode} back={back} goBack={goBack}/>
            }
        </div>
    )
}
export default InvoiceNav