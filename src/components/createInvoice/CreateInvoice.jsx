import { useEffect, useState } from "react";
import "./CreateInvoice.css";
import ArrowDown from "../../../public/assets/icon-arrow-down.svg";
import { useDispatch } from "react-redux";
import { addInvoice } from "../../invoiceSlice/InvoiceSlice";

const CreateInvoice = ({ darkMode }) => {
  const dispatch = useDispatch();

  const [invoiceData, setInvoiceData] = useState({
    address: "",
    city: "",
    post: "",
    country: "",
    clientName: "",
    clientEmail: "",
    address2: "",
    city2: "",
    post2: "",
    country2: "",
    invoiceDate: "",
    project: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [word, setWord] = useState("Net 30 Days");
  const [isClicked, setIsClicked] = useState(false);
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
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(invoiceData));
    if (
      invoiceData.address &&
      invoiceData.city &&
      invoiceData.post &&
      invoiceData.country &&
      invoiceData.clientName &&
      invoiceData.clientEmail &&
      invoiceData.address2 &&
      invoiceData.city2 &&
      invoiceData.post2 &&
      invoiceData.country2 &&
      invoiceData.invoiceDate &&
      invoiceData.project
    ) {
      setInvoiceData({
        address: "",
        city: "",
        post: "",
        country: "",
        clientName: "",
        clientEmail: "",
        address2: "",
        city2: "",
        post2: "",
        country2: "",
        invoiceDate: "",
        project: "",
      });
    }

    dispatch(addInvoice({ payload: invoiceData }));
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.address) {
      errors.address = "Can't be empty";
    }
    if (!values.address2) {
      errors.address2 = "Can't be empty";
    }
    if (!values.city) {
      errors.city = "Can't be empty";
    }
    if (!values.city2) {
      errors.city2 = "Can't be empty";
    }
    if (!values.country) {
      errors.country = "Can't be empty";
    }
    if (!values.country2) {
      errors.country2 = "Can't be empty";
    }
    if (!values.clientName) {
      errors.clientName = "Can't be empty";
    }
    if (!values.clientEmail) {
      errors.clientEmail = "Can't be empty";
    } else if (!regex.test(values.clientEmail)) {
      errors.email = "This is not a valid email";
    }
    if (!values.post) {
      errors.post = "Can't be empty";
    }
    if (!values.invoiceDate) {
      errors.invoiceDate = "Can't be empty";
    }

    if (!values.project) {
      errors.project = "Can't be empty";
    }
    return errors;
  };

  return (
    <main className="create-invoice-container">
      <form
        onSubmit={handleSubmit}
        className={`create-invoice-content ${
          darkMode
            ? "create-invoice-content-dark"
            : "create-invoice-content-light"
        }`}
      >
        <section className="form-content">
          <div
            className={`go-back-button ${
              darkMode ? "go-back-button-dark" : ""
            }`}
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
            <section className="bill-from-container">
              <h4 className="bill-from">Bill From</h4>
              <div className="wrapper street-address">
                <div className="title-error">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Street Address
                  </label>
                  <label className="error-message">{formErrors.address}</label>
                </div>
                <input
                  className={`${darkMode ? "input-select-dark " : ""}`}
                  type="text"
                  name="address"
                  value={invoiceData.address}
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
                  type="text"
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
                  <label className="error-message">{formErrors.address2}</label>
                </div>
                <input
                  className={`${darkMode ? "input-select-dark " : ""}`}
                  type="text"
                  name="address2"
                  value={invoiceData.address2}
                  onChange={handleChange}
                />
              </div>
              <div className="city-post-country">
                <div className="wrapper city">
                  <div className="title-error">
                    <label className={`${darkMode ? "label-dark" : ""}`}>
                      City
                    </label>
                    <label className="error-message">{formErrors.city2}</label>
                  </div>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                    name="city2"
                    value={invoiceData.city2}
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
                    name="post2"
                    value={invoiceData.post2}
                    onChange={handleChange}
                  />
                </div>
                <div className="wrapper country">
                  <div className="title-error">
                    <label className={`${darkMode ? "label-dark" : ""}`}>
                      Country
                    </label>
                    <label className="error-message">
                      {formErrors.country2}
                    </label>
                  </div>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                    name="country2"
                    value={invoiceData.country2}
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
                      {formErrors.invoiceDate}
                    </label>
                  </div>
                  <input
                    id="date"
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="date"
                    name="invoiceDate"
                    value={invoiceData.invoiceDate}
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
                  {/* <select
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    name=""
                    id=""
                  >
                    <option value="Net1Day">Net 1 Day</option>
                    <option value="Net7Day">Net 7 Days</option>
                    <option value="Net14Day">Net 14 Days</option>
                    <option value="Net30Days">Net 30 days</option>
                  </select> */}

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
            <section className="items-section">
              <h2 className=" items-title">Item List</h2>
              <div className=" items-content">
                <div className="items-item item-name">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Item Name
                  </label>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                  />
                </div>
                <div className="items-item item-quantity">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Qty.
                  </label>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="number"
                    min="0"
                  />
                </div>
                <div className="items-item item-price">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Price
                  </label>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="number"
                    min="0"
                  />
                </div>

                <div className="items-item item-total">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Total
                  </label>
                  <div className="item-total-content">
                    <p className="price">123.00</p>
                    <div className="item-total-content-svg">
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
              <button
                className={`add-item-button ${
                  darkMode ? "add-item-button-dark" : "add-item-button-light"
                }`}
              >
                + Add New Item
              </button>
            </section>
          </div>
          <p className="error">- All fields must be added</p>
        </section>
        <section
          className={`bottom-section ${
            darkMode ? "bottom-section-dark" : "bottom-section-light"
          }`}
        >
          <div className="action-btn">
            <button className="button discard">Discard</button>
            <div className="draft-send">
              <button className="button draft">Save as Draft</button>
              <button type="submit" className="button send">
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
