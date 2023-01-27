import { useState } from "react"
import CheckBox from "./CheckBox"

const Filter = ({darkMode,checkStatus}) => {
    // const [filterInvoice, setFilter] = useState([])
    // console.log(checkStatus);
    return (
        <div className={`z-auto ${darkMode ? 'bg-dark-light text-light-white' : 'bg-light-white '} absolute w-32 
            xl:w-60 lg:w-40 md:w-36 px-4 py-2 space-y-2 lg:h-auto 
            -right-6 top-11 lg:top-14 lg:p-5 xl:px-9 shadow-xl rounded-sm`}>

            <CheckBox checkStatus={checkStatus} value="draft" label="Draft" inputId="draft" labelfor="draft" />
            <CheckBox checkStatus={checkStatus} label="Pending" value="pending" inputId="pending" labelfor="pending"/>
            <CheckBox checkStatus={checkStatus} label="Paid" value="paid" inputId="paid" labelfor="paid"/>

        </div>
    )
}

export default Filter