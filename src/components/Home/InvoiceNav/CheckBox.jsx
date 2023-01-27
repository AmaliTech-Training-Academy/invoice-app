const CheckBox = ({label, inputId, labelfor,checkStatus,value}) => {
    return (
        <div className="space-x-4 cursor-pointer">
                <input onChange={(e) => checkStatus(e)}
                    className="border-none rounded bg-light-violet bg-opacity-50 focus:ring-light-violet focus:bg-light-violet
                    focus:outline-light-violet checked:bg-dark-violet focus:rounded-sm" 
                    type="checkbox"
                    value={value}
                    id={inputId}/>
                <label className="cursor-pointer"
                    htmlFor={labelfor}>
                    {label}
                </label>
        </div>
    )
}

export default CheckBox