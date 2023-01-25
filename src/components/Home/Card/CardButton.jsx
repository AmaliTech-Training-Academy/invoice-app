import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"


const CardButton = ({status}) => {

    const changeBtnStatus = {
        paid: "bg-paid text-paid",
        pending: "bg-pending text-pending",
        draft: "bg-draft text-draft",
    }

    return (
            <button className={"capitalize space-x-4 w-24 h-10 rounded-lg bg-opacity-5 " 
                + changeBtnStatus[status]}>
                <FontAwesomeIcon className="mr-2" icon={faCircle} />
                    {status}
            </button>  
    )
}

export default CardButton