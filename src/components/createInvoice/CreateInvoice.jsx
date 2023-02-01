import { useEffect, useState } from "react";
import "./CreateInvoice.css";
import ArrowDown from "../../../public/assets/icon-arrow-down.svg";
import axios from "axios";
import './AddItems.css'
const CreateInvoice = ({ darkMode, back, goBack }) => {
  const randomIdGenerator = () => {
    let randomPassword;
    const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomTwoLetter =
      letter[Math.trunc(Math.random() * 26)] +
      letter[Math.trunc(Math.random() * 26)];
    return (randomPassword =
      randomTwoLetter + Math.trunc(Math.random() * 9999 + 1));
  };

  const CANT_BE_EMPTY = "Can't be empty";

  const initialData = {
    senderStreet: "",
    city: "",
    post: "",
    country: "",
    clientName: "",
    clientEmail: "",
    clientStreet: "",
    clientCity: "",
    clientPost: "",
    clientCountry: "",
    createdAt: "",
    paymentDue: "",
    project: "",
  };

  const [invoiceData, setInvoiceData] = useState(initialData);

  const [invoiceItemsVals, setInvoiceItemVals] = useState({});
  const [totalPrice, setTotalPrice] = useState({});

  const [formErrors, setFormErrors] = useState({});
  const [fieldsError, setFieldsError] = useState("");
  const [itemsError, setItemsError] = useState("");
  const [word, setWord] = useState("Net 30 Days");
  const [isClicked, setIsClicked] = useState(false);
  const [saveClicked, setSaveClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const changeValue = (value) => {
    setWord(value);
    setIsClicked(!isClicked);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.value !== "") {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    } else {
      setFormErrors({ ...formErrors, [e.target.name]: CANT_BE_EMPTY });
    }
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const itemHandleChange = (e, id) => {
    const invoiceItemCurrent = { ...invoiceItemsVals[id] };
    invoiceItemCurrent[e.target.name] =
      e.target.name === "name" ? e.target.value : Number(e.target.value);
    setInvoiceItemVals({
      ...invoiceItemsVals,
      [id]: invoiceItemCurrent,
    });
  };

  const handleDeleteItem = (id) => {
    const filteredInvoiceItems = Object.keys(invoiceItemsVals).filter(
      (elt) => elt !== id
    );
    const dataObj = {};
    filteredInvoiceItems.forEach(
      (elt) => (dataObj[elt] = invoiceItemsVals[elt])
    );
    setInvoiceItemVals(dataObj);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const newId = Object.keys(invoiceItemsVals).length;
    setInvoiceItemVals({
      ...invoiceItemsVals,
      [newId]: { name: "", quantity: 0, price: 0.0 },
    });
  };

  useEffect(() => {
    if (Object.keys(invoiceData).length < 14) {
      setFieldsError("All fields are required.");
    } else {
      setFieldsError([""]);
    }
  }, [invoiceData]);

  useEffect(() => {
    if (Object.keys(invoiceItemsVals).length > 0) {
      setItemsError("");
    } else {
      setFieldsError("An item must be added");
    }
  }, [invoiceItemsVals]);

  useEffect(() => {
    if (invoiceData.createdAt) {
      const date = new Date(invoiceData.createdAt);
      const days = Number(word.split(" ")[1]);
      date.setDate(date.getDate() + days);
      setInvoiceData({
        ...invoiceData,
        paymentDue: date.toISOString().substring(0, 10),
      });
    }
  }, [invoiceData.createdAt, word]);

  useEffect(() => {
    const totalProductObj = {};
    Object.keys(invoiceItemsVals).forEach((id) => {
      const values = invoiceItemsVals[id];
      totalProductObj[id] = Number(values.price) * Number(values.quantity) || 0;
    });
    setTotalPrice(totalProductObj);
  }, [invoiceItemsVals]);

  const SubmitWithoutValidation = (e) => {
    e.preventDefault();
    const addedPriceToItems = {};
    Object.keys(invoiceItemsVals).forEach((elt) => {
      const obj = { ...invoiceItemsVals[elt] };
      obj["totalPrice"] = totalPrice[elt];
      addedPriceToItems[elt] = obj;
    });

    setInvoiceData({
      senderStreet: "",
      city: "",
      post: "",
      country: "",
      clientName: "",
      clientEmail: "",
      clientStreet: "",
      clientCity: "",
      clientPost: "",
      clientCountry: "",
      createdAt: "",
      paymentDue: "",
      project: "",
      items: Object.values(addedPriceToItems),
    });
    axios
      .post("https://invoice-api-9l7b.onrender.com/invoice", {
        id: randomIdGenerator(),
        status: "draft",
        senderStreet: invoiceData.senderStreet,
        city: invoiceData.city,
        post: invoiceData.post,
        country: invoiceData.country,
        clientName: invoiceData.clientName,
        clientEmail: invoiceData.clientEmail,
        clientStreet: invoiceData.clientStreet,
        clientCity: invoiceData.clientCity,
        clientPost: invoiceData.clientPost,
        clientCountry: invoiceData.clientCountry,
        createdAt: invoiceData.createdAt,
        paymentDue: invoiceData.paymentDue,
        project: invoiceData.project,
        items: Object.values(addedPriceToItems),
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const validateItems = (elt) => {
    const [name, quantity, price] = Object.values(elt);
    return name !== "" && quantity > 0 && price > 0.0;
  };

  useEffect(() => {
    if (saveClicked) {
      validate(invoiceData, invoiceItemsVals);
    }
  }, [invoiceData, invoiceItemsVals]);

  const validate = (values, invoiceItemsVals) => {
    const empty_fields = {};
    let isValid = true;

    Object.entries(invoiceData).forEach((elt) => {
      const [key, value] = elt;
      if (value === "") empty_fields[key] = CANT_BE_EMPTY;
    });

    setFormErrors({ ...formErrors, ...empty_fields });

    if (Object.keys(empty_fields).length > 0) {
      setFieldsError(["All fields are required"]);
      isValid = false;
    }
    if (Object.keys(invoiceItemsVals).length === 0) {
      setItemsError(["An item must be added"]);
      isValid = false;
    }

    // if (Object.keys(invoiceItemsVals).length > 0){
    //   if (!(Object.values(invoiceItemsVals).every((elt) => validateItems(elt) === true))) {
    //     setErrors([...errors, 'An Item must be added']);
    //     setFormIsValid(false);
    //   }
    if (isValid) sendData(values, invoiceItemsVals);
  };

  const sendData = (invoiceData, invoiceItemsVals) => {
    setInvoiceData(initialData);
    const addedPriceToItems = {};
    Object.keys(invoiceItemsVals).forEach((elt) => {
      const obj = { ...invoiceItemsVals[elt] };
      obj["totalPrice"] = totalPrice[elt];
      addedPriceToItems[elt] = obj;
    });
    axios
      .post("https://invoice-api-9l7b.onrender.com/invoice", {
        id: randomIdGenerator(),
        status: "pending",
        senderStreet: invoiceData.senderStreet,
        city: invoiceData.city,
        post: invoiceData.post,
        country: invoiceData.country,
        clientName: invoiceData.clientName,
        clientEmail: invoiceData.clientEmail,
        clientStreet: invoiceData.clientStreet,
        clientCity: invoiceData.clientCity,
        clientPost: invoiceData.clientPost,
        clientCountry: invoiceData.clientCountry,
        paymentDue: invoiceData.paymentDue,
        createdAt: invoiceData.createdAt,
        project: invoiceData.project,
        items: Object.values(addedPriceToItems),
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validate(invoiceData, invoiceItemsVals);
  };

  return (
    <main className={` ${back ? "hidden" : ""} create-invoice-container`}>
      <form
        className={`create-invoice-content ${
          darkMode
            ? "create-invoice-content-dark"
            : "create-invoice-content-light"
        }`}
      >
        <section className="form-content">
          <div
            onClick={goBack}
            className={`border go-back-button ${
              darkMode ? "go-back-button-dark" : ""
            } `}
          >
            <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.342.886L2.114 5.114l4.228 4.228"
                stroke="#9277FF"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
            Go back
          </div>

          <h2
            className={`form-heading ${
              darkMode ? "form-heading-dark" : "form-heading-light"
            }`}
          >
            New Invoice
          </h2>
          <div
            action=""
            className={`form ${darkMode ? "form-dark" : "form-light"}`}
          >
            {/* <label className={valid ? `label-${theme}` : `label-${theme} invalid-label`}> Label text</label> */}

            <section className="bill-from-container">
              <h4 className="bill-from">Bill From</h4>
              <div className="wrapper street-address">
                <div className="title-error">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Street Address
                  </label>
                  <label className="error-message">
                    {formErrors.senderStreet}
                  </label>
                </div>
                <input
                  className={`${darkMode ? "input-select-dark " : ""}`}
                  type="text"
                  name="senderStreet"
                  value={invoiceData.senderStreet}
                  onChange={handleChange}
                />
              </div>
              <div className="city-post-country">
                <div className="wrapper city">
                  <div className="title-error">
                    <label className={`${darkMode ? "label-dark" : ""}`}>
                      City
                    </label>
                    <label className="error-message">{formErrors.city}</label>
                  </div>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                    name="city"
                    value={invoiceData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="wrapper post-code">
                  <div className="title-error">
                    <label className={`${darkMode ? "label-dark" : ""}`}>
                      Post Code
                    </label>
                    <label className="error-message">{formErrors.post}</label>
                  </div>
                  <input
                    style={{ textTransform: "uppercase" }}
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                    name="post"
                    maxLength="5"
                    value={invoiceData.post}
                    onChange={handleChange}
                  />
                </div>
                <div className="wrapper country">
                  <div className="title-error">
                    <label className={`${darkMode ? "label-dark" : ""}`}>
                      Country
                    </label>
                    <label className="error-message">
                      {formErrors.country}
                    </label>
                  </div>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                    name="country"
                    value={invoiceData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>
            <section className="bill-to">
              <h4 className="bill-to">Bill To</h4>
              <div className="wrapper client-name">
                <div className="title-error">
                  <label
                    className={`${darkMode ? "label-dark" : ""}`}
                    htmlFor=""
                  >
                    Client's Name
                  </label>
                  <label className="error-message">
                    {formErrors.clientName}
                  </label>
                </div>
                <input
                  className={`${darkMode ? "input-select-dark " : ""}`}
                  type="text"
                  name="clientName"
                  value={invoiceData.clientName}
                  onChange={handleChange}
                />
              </div>
              <div className="wrapper client-email">
                <div className="title-error">
                  <label
                    className={`${darkMode ? "label-dark" : ""}`}
                    htmlFor=""
                  >
                    Client's Email
                  </label>
                  <label className="error-message">
                    {formErrors.clientEmail}
                  </label>
                </div>
                <input
                  className={`${darkMode ? "input-select-dark " : ""}`}
                  type="email"
                  name="clientEmail"
                  value={invoiceData.clientEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="wrapper client-address">
                <div className="title-error">
                  <label
                    className={`${darkMode ? "label-dark" : ""}`}
                    htmlFor=""
                  >
                    Street Address
                  </label>
                  <label className="error-message">
                    {formErrors.clientStreet}
                  </label>
                </div>
                <input
                  className={`${darkMode ? "input-select-dark " : ""}`}
                  type="text"
                  name="clientStreet"
                  value={invoiceData.clientStreet}
                  onChange={handleChange}
                />
              </div>
              <div className="city-post-country">
                <div className="wrapper city">
                  <div className="title-error">
                    <label className={`${darkMode ? "label-dark" : ""}`}>
                      City
                    </label>
                    <label className="error-message">
                      {formErrors.clientCity}
                    </label>
                  </div>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                    name="clientCity"
                    value={invoiceData.clientCity}
                    onChange={handleChange}
                  />
                </div>
                <div className="wrapper post-code">
                  <div className="title-error">
                    <label className={`${darkMode ? "label-dark" : ""}`}>
                      Post Code
                    </label>
                    <label className="error-message">{formErrors.post}</label>
                  </div>
                  <input
                    style={{ textTransform: "uppercase" }}
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                    name="clientPost"
                    value={invoiceData.clientPost}
                    onChange={handleChange}
                    maxLength="5"
                  />
                </div>
                <div className="wrapper country">
                  <div className="title-error">
                    <label className={`${darkMode ? "label-dark" : ""}`}>
                      Country
                    </label>
                    <label className="error-message">
                      {formErrors.clientCountry}
                    </label>
                  </div>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                    name="clientCountry"
                    value={invoiceData.clientCountry}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="date-section">
                <div className="wrapper invoice-date">
                  <div className="title-error">
                    <label
                      className={`${darkMode ? "label-dark" : ""}`}
                      htmlFor=""
                    >
                      Invoice Date
                    </label>
                    <label className="error-message">
                      {formErrors.createdAt}
                    </label>
                  </div>
                  <input
                    id="date"
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="date"
                    name="createdAt"
                    value={invoiceData.createdAt}
                    onChange={handleChange}
                  />
                </div>

                <div className="wrapper payment-terms">
                  <div className="title-error">
                    <label
                      className={`${darkMode ? "label-dark" : ""}`}
                      htmlFor=""
                    >
                      Payment Terms
                    </label>
                  </div>

                  <div
                    className={`select ${
                      darkMode ? "dark-select " : " light-select"
                    }`}
                  >
                    <div className="main" onClick={handleClick}>
                      <p> {word}</p>
                      <div
                        className={`arrow ${isClicked ? "arrow-rotate" : ""}`}
                      >
                        <img src={ArrowDown} alt={ArrowDown} />
                      </div>
                    </div>
                    {isClicked && (
                      <div
                        className={`options ${
                          darkMode ? "dark-options " : " light-options"
                        }`}
                      >
                        <h6 onClick={() => changeValue("Net 1 day")}>
                          Net 1 day
                        </h6>
                        <div
                          className={`hr ${darkMode ? "dark-hr" : "light-hr"}`}
                        ></div>
                        <h6 onClick={() => changeValue("Net 7 days")}>
                          Net 7 days
                        </h6>
                        <div
                          className={`hr ${darkMode ? "dark-hr" : "light-hr"}`}
                        ></div>
                        <h6 onClick={() => changeValue("Net 14 days")}>
                          Net 14 days
                        </h6>
                        <div
                          className={`hr ${darkMode ? "dark-hr" : "light-hr"}`}
                        ></div>
                        <h6 onClick={() => changeValue("Net 30 days")}>
                          Net 30 days
                        </h6>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="wrapper project-description">
                <div className="title-error">
                  <label
                    htmlFor=""
                    className={`${darkMode ? "label-dark" : ""}`}
                  >
                    Project Description
                  </label>
                  <label className="error-message">{formErrors.project}</label>
                </div>
                <input
                  className={`${darkMode ? "input-select-dark " : ""}`}
                  type="text"
                  name="project"
                  value={invoiceData.project}
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* <section className="items-section">
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
            </section> */}

            <section className="items-section">
              <h2 className=" items-title">Item List</h2>

              {Object.keys(invoiceItemsVals).map((item) => 
              <div className=" items-content" key={item}>
                <div className="item-name">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Item Name
                  </label>
                  <input
                    className={`item-name ${
                      darkMode ? "input-select-dark " : ""
                    }`}
                    // key={item}
                    type="text"
                    name="name"
                    onChange={(event) => itemHandleChange(event, item)}
                  />
                </div>
                <div className="item-quantity">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Qty.
                  </label>
                  <input
                    className={`item-quantity ${
                      darkMode ? "input-select-dark " : ""
                    }`}
                    type="number"
                    min="0"
                    name="quantity"
                    onChange={(event) => itemHandleChange(event, item)}
                  />
                </div>

                <div className="item-price">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Price
                  </label>
                  <input
                    className={`item-price ${
                      darkMode ? "input-select-dark " : ""
                    }`}
                    type="number"
                    min="0"
                    name="price"
                    onChange={(event) => itemHandleChange(event, item)}
                  />
                    </div>

                  <div className="item-total-price">
                    <label className={`${darkMode ? "label-dark" : ""}`}>
                      Total
                    </label>
                    <div className="total-price-down">

                    <p className="total-price" name="totalPrice">
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
                  </div>
                </div>
              </div>
              )}
              <button
      className={`add-item-button ${
        darkMode ? "add-item-button-dark" : "add-item-button-light"
      }`}
      onClick={handleAddItem}
    >
      + Add New Item
    </button>
            </section>
          </div>
          <div className="error">
            <p>- {fieldsError} </p>
            <p>- {itemsError} </p>
          </div>
        </section>
        
        <section
          className={`bottom-section ${
            darkMode ? "bottom-section-dark" : "bottom-section-light"
          }`}
        >
          <div className="action-btn">
            <button className="button discard" onClick={goBack}>
              Discard
            </button>
            <div className="draft-send">
              <button
                type="button"
                onClick={SubmitWithoutValidation}
                className="button draft"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="button send"
              >
                Save & Send
              </button>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
};

export default CreateInvoice;
