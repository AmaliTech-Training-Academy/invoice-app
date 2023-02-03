import React, { useState, useEffect, useCallback } from "react";
import "./Viewinvoice.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Edit from "../components/editInvoiceForm/Edit";
import ConfirmDelete from "../components/confirmDelete/ConfirmDelete";

function Viewinvoice({ darkMode }) {
  const navigate = useNavigate();
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [datas, setDatas] = useState({});

  const changeBtnStatus = {
    paid: "bg-paid text-paid",
    pending: "bg-pending text-pending",
    draft: "bg-draft",
  };

  // toggle EditInvoice
  const toggleEdit = () => {
    setOpenEditForm(!openEditForm);
  };

  // toggle DeletModal
  const toggleDelete = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const statusChange = () => {
    axios
      .patch(`https://invoice-api-9l7b.onrender.com/invoice/${id}`, {
        status: "paid",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    navigate("/");
  };

  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [address, setAddress] = useState([]);
  const [gTotal, setGTotal] = useState([])
  const { id } = useParams();

  const fetchInvoice = useCallback(async () => {
    const resData = await axios.get(
      `https://invoice-api-9l7b.onrender.com/invoice/${id}`
    );
    const { data } = resData;


    setInvoiceDetails(data);
    setGTotal(data.items);

  }, [id]);

  useEffect(() => {
    fetchInvoice();
  }, []);

  const getItems= Object.values(gTotal).reduce((t, {total}) => t + total,0)
  console.log(getItems);

  const Hold = { ...invoiceDetails };

  return (
    <div>
      <main
        className={`viewinvoice-container ${
          darkMode ? "viewinvoice-container-dark" : ""
        }`}
      >
        <article className="all-components">
          <Link to="/" className="go-back cursor">
            <img src="../../public/assets/icon-arrow-left.svg" />
            <h5> Go back</h5>
          </Link>
          <div
            className={`container-two ${darkMode ? "container-two-dark" : ""}`}
          >
            <div className="status-pending">
              <p className="status">Status</p>
              <div
                className={
                  "pending bg-opacity-5 " +
                  changeBtnStatus[invoiceDetails.status]
                }
              >
                <div
                  className={
                    "pending-dot " + changeBtnStatus[invoiceDetails.status]
                  }
                ></div>
                {invoiceDetails.status}
              </div>
            </div>

            <div className="buttons">
              <button className="edit cursor" onClick={toggleEdit}>
                Edit
              </button>
              <button className="delete cursor" onClick={toggleDelete}>
                Delete
              </button>
              <button className="paid cursor" onClick={() => statusChange()}>
                Mark as Paid
              </button>
            </div>
          </div>

          <section
            className={`container-three ${
              darkMode ? "container-three-dark" : ""
            }`}
          >
            <div className="container-three-items">
              <div className="design-address">
                <div className="words">
                  <h3>
                    <span className={`${darkMode ? 'dark-label' : 'tag'}`}>#</span>
                    {id}
                  </h3>
                  <div className={`${darkMode ? 'dark-label' : 'words-words'}`}>
                    {invoiceDetails.description}
                  </div>
                </div>
                <div className={`${darkMode ? 'dark-label' : 'address'}`}>
                   <p>
                 {invoiceDetails.senderStreet}
                  <br />
                 {invoiceDetails.senderCity}
                  <br />
                 {invoiceDetails.senderPostCode}
                  <br />
                 {invoiceDetails.senderCountry}
                  <br />
                </p> 
                 
                </div>
              </div>

              <div className="date-bill">
                <div className="invoice-date">
                  <p className={`${darkMode ? ' dark-label' : 'paragraph'}`}>Invoice Date</p>
                  <br />
                  <h4 className={`${darkMode ? 'darkermode-dark' : 'darkermode'}`}>{invoiceDetails.createdAt}</h4>
                </div>
                <div className="due-date" >
                <p className={`${darkMode ? ' dark-label' : 'paragraph'}`}>Payment Due</p>
                  <br />
                  <h4 className={`${darkMode ? 'darkermode-dark' : 'darkermode'}`}>{invoiceDetails.paymentDue}</h4>
                </div>

                <div className="bill-to-address">
                <p className={`${darkMode ? ' dark-label' : 'paragraph'}`}>Bill To</p>

                  <br />

                  <h4 className={`${darkMode ? 'darkermode-dark' : 'darkermode'}`}>{invoiceDetails.clientName}</h4>

                  <br />

                  <p className={`${darkMode ? ' dark-label' : 'paragraph'}`}>
                  {invoiceDetails.clientStreet}
                    <br />
                    {invoiceDetails.clientCity}
                    <br />
                    {invoiceDetails.clientPostCode}
                    <br />
                    {invoiceDetails.clientCountry}
                    <br />
                  </p>
                </div>
 
                <div className='sent-to'>
                  <p className={` ${darkMode ? 'dark-label' : 'paragraph'}`}>Sent to</p>
                  <br />
                  <h4 className={`${darkMode ? 'darkermode-dark' : 'darkermode'}`}>{invoiceDetails.clientEmail}</h4>
                </div>
              </div>

              <section
                className={`container-quantity ${
                  darkMode ? "container-quantity-dark" : ""
                }`}
              >
                <div className="quantity-items">
                  <div className="names">
                    <span>Item Name</span>
                    {invoiceDetails.items?.map((add, key) => {
                      return (
                        <div className={`${darkMode ? 'darkermode-dark' : 'banner'}`} key={key + "_add"}>
                          <div>{add.name}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="quantity">
                    <span>QTY. </span>
                    {invoiceDetails.items?.map((add, key) => {
                      return (
                        <div key={key + "_add"}>
                          <div className="quantity-one"> {add.quantity} </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="price">
                    <span>Price</span>
                    {invoiceDetails.items?.map((add, key) => {
                      return (
                        <div key={key + "_add"}>
                          <div className="price-one">

                            <span>x</span>£ {add.price.toFixed(2)}
                          </div>

                        </div>
                      );
                    })}
                  </div>
                  <div className="total">
                    <span>Total</span>
                    {invoiceDetails.items?.map((add, key) => {
                      return (
                        <div key={key + "_add"}>
                          <div className="total-one">

                            £ {add.total.toFixed(2)}
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              <div className={`blue-box ${darkMode ? "blue-box-dark" : ""}`}>
                <div className="grand-total">Grand Total</div>
                <div className="amount">
                  £ {getItems.toFixed(2)}
                </div>
              </div>
            </div>
          </section>
        </article>
        <div
          className={`small-show ${darkMode ? "buttons small-show-dark" : ""}`}
        >
          <button className="edit cursor" onClick={toggleEdit}>
            Edit
          </button>
          <button className="delete cursor" onClick={toggleDelete}>
            Delete
          </button>
          <button className="paid cursor" onClick={() => statusChange()}>
            Mark as Paid
          </button>
        </div>
      </main>
      
    {
                openEditForm && <Edit darkMode={darkMode}  goBack={toggleEdit} id={id} invoiceDetails={invoiceDetails}  />
            }
            {
                openDeleteModal && <ConfirmDelete darkMode={darkMode} goBack={toggleDelete} id={id} />

            }

      {openEditForm && (
        <Edit
          darkMode={darkMode}
          goBack={toggleEdit}
          id={id}
          data={datas}
          hold={Hold}
        />
      )}
      {openDeleteModal && (
        <ConfirmDelete darkMode={darkMode} goBack={toggleDelete} id={id} />
      )}
    </div>
  );
}

export default Viewinvoice;
