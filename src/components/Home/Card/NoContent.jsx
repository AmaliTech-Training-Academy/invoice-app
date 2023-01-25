import NoContentImg from "../../../assets/noContent.svg" 
import InvoiceNav from "../InvoiceNav/InvoiceNav"
import Nav from "../Nav/Nav"

const NoContent = () => {
    return (
        <div className="mt-20 p-8 h-full">
            <InvoiceNav />
            <div className="flex flex-col justify-center items-center h-full space-y-3">
            
                <img src={NoContentImg} width="200" />
                <h1 className="text-3xl">There is nothing here</h1>
                <p className="opacity-60">
                    Create a new invoice by clicking the <br></br>
                    <span className="font-bold">
                        New Invoice
                    </span> button and get started
                </p>

            </div>
        </div>

    )
}

export default NoContent