import { useState } from "react"

const CheckBox = ({label, inputId, labelfor}) => {
   
    return (
        
        <div className="space-x-4 cursor-pointe r">
                <input 
                    className="border-none rounded bg-light-violet bg-opacity-50 focus:ring-light-violet focus:bg-light-violet
                    focus:outline-light-violet checked:bg-dark-violet focus:rounded-sm" 
                    type="checkbox"
                    id={inputId}/>
                <label className="cursor-pointer"
                    htmlFor={labelfor}>
                    {label}
                </label>
        </div>
    )
}

export default CheckBox