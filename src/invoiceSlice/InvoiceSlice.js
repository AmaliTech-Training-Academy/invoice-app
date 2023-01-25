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
        }
    }
})

export const {addInvoice} = InvoiceSlice.actions
export default InvoiceSlice.reducer