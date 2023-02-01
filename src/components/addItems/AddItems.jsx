import { useState } from "react";
import "./AddItems.css";

const AddItems = ({ darkMode, formErrors, setFormErrors }) => {
  // Items Section
  const [items, setItems] = useState([
    { id: 1, name: "", quantity: "", price: "" },
  ]);

  const handleAddItem = (e) => {
    e.preventDefault();
    const newId = items.length ? items[items.length - 1].id + 1 : 1;
    setItems([...items, { id: newId, name: "", quantity: "", price: "" }]);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    console.log(id);
  };

  const itemHandleChange = (event, id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, [event.target.name]: event.target.value };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const validate = () => {
    let itemsError = false;
    const updatedItems = items.map((item) => {
      if (item.name === "" || item.quantity === "" || item.price === "") {
        itemsError = true;
        return { ...item, error: true };
      }
      return { ...item, error: false };
    });
    setItems(updatedItems);
    if (itemsError) {
      setFormErrors({ ...formErrors, items: '- An item must be added' });
    } else {
      setFormErrors({ ...formErrors, items: '' });
    }
  };

  return (
    // <section className="items-section">
    //   <h2 className=" items-title">Item List</h2>

    //   <div className=" items-content">
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>
    //             {" "}
    //             <label className={`${darkMode ? "label-dark" : ""}`}>
    //               Item Name
    //             </label>{" "}
    //           </th>
    //           <th>
    //             {" "}
    //             <label className={`${darkMode ? "label-dark" : ""}`}>
    //               Qty.
    //             </label>{" "}
    //           </th>
    //           <th>
    //             {" "}
    //             <label className={`${darkMode ? "label-dark" : ""}`}>
    //               Price
    //             </label>{" "}
    //           </th>
    //           <th>
    //             {" "}
    //             <label className={`${darkMode ? "label-dark" : ""}`}>
    //               Total
    //             </label>{" "}
    //           </th>
    //         </tr>
    //       </thead>
    //       {items.map((item) => (
    //         <tbody key={item.id}>
    //           <tr>
    //             <td value={item.name}>
    //               {" "}
    //               <input
    //                 className={`item-name ${
    //                   darkMode ? "input-select-dark " : ""
    //                 }`}
    //                 key={item.id}
    //                 type="text"
    //                 name="name"
    //                 // value={invoiceData.itemName}
    //                 value={item.name}
    //                 // onChange={handleChange}
    //                 onChange={(event) => itemHandleChange(event, item.id)}
    //               />{" "}
    //             </td>
    //             <td value={item.quantity}>
    //               {" "}
    //               <input
    //                 className={`item-quantity ${
    //                   darkMode ? "input-select-dark " : ""
    //                 }`}
    //                 type="number"
    //                 min="0"
    //                 //   name="itemQuantity"
    //                 name="quantity"
    //                 //   value={invoiceData.itemQuantity}
    //                 value={item.quantity}
    //                 // onChange={handleChange}
    //                 onChange={(event) => itemHandleChange(event, item.id)}
    //               />{" "}
    //             </td>
    //             <td value={item.price}>
    //               {" "}
    //               <input
    //                 className={`item-price ${
    //                   darkMode ? "input-select-dark " : ""
    //                 }`}
    //                 type="number"
    //                 min="0"
    //                 //   name="itemPrice"
    //                 name="price"
    //                 //   value={invoiceData.itemPrice}
    //                 value={item.price}
    //                 // onChange={handleChange}
    //                 onChange={(event) => itemHandleChange(event, item.id)}
    //               />
    //             </td>
    //             <td value={item.total} className="item-total">
    //               <p
    //                 className="price"
    //                 // value={invoiceData.itemTotal}
    //                 value={item.total}
    //               >
    //                 123.00
    //               </p>

    //               <div
    //                 className="item-delete-svg"
    //                 onClick={() => handleDeleteItem(item.id)}
    //               >
    //                 <svg
    //                   width="13"
    //                   height="16"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
    //                     fill="#888EB0"
    //                     fillRule="nonzero"
    //                   />
    //                 </svg>
    //               </div>
    //             </td>
    //           </tr>
    //         </tbody>
    //       ))}
    //     </table>
    //   </div>

    //   <button
    //     className={`add-item-button ${
    //       darkMode ? "add-item-button-dark" : "add-item-button-light"
    //     }`}
    //     onClick={handleAddItem}
    //   >
    //     + Add New Item
    //   </button>

    //   {formErrors.items && <div className="error">{formErrors.items}</div>}
      
    // </section>
    <section className="items-section">
    <h2 className=" items-title">Item List</h2>

    <div className=" items-content">
      <table>
        <thead>
          <tr>
            <th>
              {" "}
              <label className={`${darkMode ? "label-dark" : ""}`}>
                Item Name
              </label>{" "}
            </th>
            <th>
              {" "}
              <label className={`${darkMode ? "label-dark" : ""}`}>
                Qty.
              </label>{" "}
            </th>
            <th>
              {" "}
              <label className={`${darkMode ? "label-dark" : ""}`}>
                Price
              </label>{" "}
            </th>
            <th>
              {" "}
              <label className={`${darkMode ? "label-dark" : ""}`}>
                Total
              </label>{" "}
            </th>
          </tr>
        </thead>
        {Object.keys(invoiceItemsVals).map((item) => 
          <tbody key={item}>
          <tr>
            <td>
                {" "}
                <input
                className={`item-name ${
                    darkMode ? "input-select-dark " : ""
                }`}
                key={item}
                type="text"
                name="name"
                onChange={(event) =>
                    itemHandleChange(event, item)
                }
                />{" "}
            </td>
            <td>
                {" "}
                <input
                className={`item-quantity ${
                    darkMode ? "input-select-dark " : ""
                }`}
                type="number"
                min="0"
                name="quantity"
                onChange={(event) =>
                    itemHandleChange(event, item)
                }
                />{" "}
            </td>
            <td>
                {" "}
                <input
                className={`item-price ${
                    darkMode ? "input-select-dark " : ""
                }`}
                type="number"
                min="0"
                name="price"
                onChange={(event) =>
                    itemHandleChange(event, item)
                }
                />
            </td>
            <td className="item-total">

                <p
                className="price"
                name="totalPrice"
                >
                {totalPrice[item]}
                </p>

                <div
                className="item-delete-svg"
                onClick={() => handleDeleteItem(item)}
                >
                <svg
                    width="13"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                    fill="#888EB0"
                    fillRule="nonzero"
                    />
                </svg>
                </div>
            </td>
          </tr>
        </tbody>
        
        )}
      </table>
    </div>

    <button
      className={`add-item-button ${
        darkMode ? "add-item-button-dark" : "add-item-button-light"
      }`}
      onClick={handleAddItem}
    >
      + Add New Item
    </button>
  </section>
  );
};

export default AddItems;
