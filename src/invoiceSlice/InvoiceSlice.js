import { createSlice } from "@reduxjs/toolkit"


 const randomIdGenerator = () => {
    let randomPassword;
    const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomTwoLetter =
      letter[Math.trunc(Math.random() * 26)] +
      letter[Math.trunc(Math.random() * 26)];
    return (randomPassword =
      randomTwoLetter + Math.trunc(Math.random() * 9999 + 1));
  };
  

const initialState = { 
    invoiceData: []
 };

 
 const InvoiceSlice = createSlice({
     name: 'invoice',
     initialState,
     reducers: {
         addInvoice: (state, action) => {
            const id = randomIdGenerator();
            const data = { ...action.payload, id, status: 'Pending' }
            state.invoiceData.push(data)
            console.log(data);
        },
        edditInvoice: (state, action) =>{
          const {id,address,clientAddress,city,clientCity,country,clientCountry,post,clientPost,invoiceDate,project,clientName,clientEmail} = action.payload
          const existingInvoice = state.find((invoice)=> invoice.id === id)
          if (existingInvoice) {
            existingInvoice.address = address
            existingInvoice.clientAddress = clientAddress
            existingInvoice.city = city
            existingInvoice.clientCity = clientCity
            existingInvoice.country = country
            existingInvoice.clientCountry = clientCountry
            existingInvoice.post = post
            existingInvoice.ininvoiceDate =invoiceDate
            existingInvoice.proproject =project
            existingInvoice.clientName =clientName
            existingInvoice.clientEmail = clientEmail

          }
        }
    }
})

export const {addInvoice,updateInvoice} = InvoiceSlice.actions
export default InvoiceSlice.reducer
