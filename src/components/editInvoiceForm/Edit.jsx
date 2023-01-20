import React, { useState } from "react";
import "./Edit.css";
import Cartitem from "../cartItem";
import ArrowDown from "../../../public/assets/icon-arrow-down.svg"

const Edit = ({ darkMode }) => {
  const [formValues, setFormValues] = useState({
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
    project:"",
  });
  const [formErrors, setFormErrors] = useState({});
  const [word,setWord] = useState('Net 30 Days')
  const [isClicked,setIsClicked] = useState(false)

  const handleClick= () =>{
    setIsClicked(!isClicked)
  }

  const changeValue = (value) =>{
    setWord(value)
    setIsClicked(!isClicked)

  }

  console.log(formValues);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };
  console.log(formErrors);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (
      formValues.address &&
      formValues.city &&
      formValues.post &&
      formValues.country &&
      formValues.clientName &&
      formValues.clientEmail &&
      formValues.address2 &&
      formValues.city2 &&
      formValues.post2 &&
      formValues.country2 &&
      formValues.invoiceDate &&
      formValues.project
    ) {
      setFormValues({
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
        invoiceDate:"",
        project:""
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex =
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
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
    if (!values.post2) {
        errors.post2 = "Can't be empty";
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
    <main>
      <form
        className={`container ${
          darkMode ? "dark-container " : "light-container"
        }`}
        onSubmit={handleSubmit}
      >
        <div className="form-content">
          <h4 className={`title ${darkMode ? "dark-title" : "light-title"}`}>
            Edit <span className="titleh">#</span>XM9141
          </h4>
          <form
            className={`form-container ${
              darkMode ? "dark-scroll" : "light-scroll"
            }`}
          >
            <div className="bill-form-container">
              <h4 className="form-title-head">bill from</h4>
              <div className="form-title-container">
                <div className="message">

                <p
                  className={`form-title ${
                      darkMode ? " dark-form-title" : "light-form-title"
                    }`}
                    >
                  street address
                </p>

                <p className="error">{formErrors.address}</p>
                    </div>
              </div>

              <input
                className={`${darkMode ? "dark-input" : "light-input"}`}
                type="text"
                name="address"
                value={formValues.address}
                onChange={handleChange}
              />
              <div className="address">
                
                <div>
                <div className="form-title-container">
                    <div className="message">

                <p
                  className={`form-title ${
                      darkMode ? " dark-form-title" : "light-form-title"
                    }`}
                    >
                  city
                </p>

                <p className="error">{formErrors.city}</p>
                    </div>
              </div>
                  <input
                    className={`city-in ${darkMode ? "dark-input" : "light-input"}`}
                    type="text"
                    name="city"
                    value={formValues.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="post">
                <div className="form-title-container ">
                <p
                  className={`form-title  ${
                    darkMode ? " dark-form-title" : "light-form-title"
                  }`}
                >
                  post code
                </p>

                <p className="error">{formErrors.post}</p>
              </div>
                  <input
                    className={`post-in ${darkMode ? "dark-input" : "light-input"}`}
                    type="number"
                    name="post"
                    value={formValues.post}
                    onChange={handleChange}
                  />
                </div>
                <div>
                <div className="form-title-container">
                    <div className="country-message">

                <p
                  className={`form-title  ${
                      darkMode ? " dark-form-title" : "light-form-title"
                    }`}
                    >
                  country
                </p>

                <p className="error">{formErrors.country}</p>
                    </div>
              </div>
                  <input
                    className={`country-in ${darkMode ? "dark-input" : "light-input"}`}
                    type="text"
                    name="country"
                    value={formValues.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="bill-form-container">
              <h4 className="form-title-head">bill from</h4>
              <div className="form-title-container">
                <div className="message">

                <p
                  className={`form-title ${
                      darkMode ? " dark-form-title" : "light-form-title"
                    }`}
                    >
                  client's name
                </p>

                <p className="error">{formErrors.clientEmail}</p>
                    </div>
              </div>
              <input
                className={`${darkMode ? "dark-input" : "light-input"}`}
                type="text"
                name="clientName"
                value={formValues.clientName}
                onChange={handleChange}
              />
              <div className="form-title-container">
                <div className="message">

                <p
                  className={`form-title ${
                      darkMode ? " dark-form-title" : "light-form-title"
                    }`}
                    >
                  client's email
                </p>

                <p className="error">{formErrors.clientEmail}</p>
                    </div>
              </div>
              <input
                className={`${darkMode ? "dark-input" : "light-input"}`}
                type="text"
                name="clientEmail"
                value={formValues.clientEmail}
                onChange={handleChange}
              />
              <div className="form-title-container">
                <div className="message">

                <p
                  className={`form-title ${
                      darkMode ? " dark-form-title" : "light-form-title"
                    }`}
                    >
                  street address
                </p>

                <p className="error">{formErrors.address2}</p>
              </div>
              </div>
              <input
                className={`${darkMode ? "dark-input" : "light-input"}`}
                type="text"
                name="addres2"
                value={formValues.address2}
                onChange={handleChange}
              />

              <div className="address">
                <div>
                <div className="form-title-container">
                <p
                  className={`form-title ${
                    darkMode ? " dark-form-title" : "light-form-title"
                  }`}
                >
                  city
                </p>

                <p className="error">{formErrors.city2}</p>
              </div>
                  <input
                    className={`city-in ${darkMode ? "dark-input" : "light-input"}`}
                    type="text"
                    name="city2"
                value={formValues.city2}
                onChange={handleChange}
                  />
                </div>
                <div>
                <div className="form-title-container">
                <p
                  className={`form-title ${
                    darkMode ? " dark-form-title" : "light-form-title"
                  }`}
                >
                  post code
                </p>

                <p className="error">{formErrors.post2}</p>
              </div>
                  <input
                    className={`post-in ${darkMode ? "dark-input" : "light-input"}`}
                    type="number"
                    name="post2"
                value={formValues.post2}
                onChange={handleChange}
                  />
                </div>
                <div >
                <div className="form-title-container">
                <div className="country-message">
                <p
                  className={`form-title ${
                    darkMode ? " dark-form-title" : "light-form-title"
                  }`}
                >
                  country
                </p>

                <p className="error">{formErrors.country2}</p>
                </div>
              </div>
                  <input
                    className={`country-in ${darkMode ? "dark-input" : "light-input"}`}
                    type="text"
                    name="country2"
                value={formValues.country2}
                onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Invoice setup */}
            <div className="invoice">
              <div className="invoice-row">
                <div>
                <div className="form-title-container">
                <p
                  className={`form-title ${
                    darkMode ? " dark-form-title" : "light-form-title"
                  }`}
                >
                  invoice date
                </p>

                <p className="error">{formErrors.invoiceDate}</p>
              </div>
                  <input
                    className={`invoice-in ${darkMode ? "dark-input" : "light-input"}`}
                    type="date"
                    name="invoiceDate"
                value={formValues.invoiceDate}
                onChange={handleChange}
                  />
                </div>
                <div>
                <div className="form-title-container">
                <p
                  className={`form-title ${
                    darkMode ? " dark-form-title" : "light-form-title"
                  }`}
                >
                  payment terms
                </p>
              </div>
              <div className={`select ${darkMode ? "dark-select ":" light-select"}`}>
                <div className="main" onClick={handleClick}>
                   <p> {word}</p>
                   <div className={`arrows ${isClicked ? 'arrows-rotate' : '' }`} >
                   <img src={ArrowDown} alt="" />
                   </div>
                </div>
                
                    {
                        isClicked &&<>
                        <div className={`options ${darkMode ? "dark-options ":" light-options"}`}>
                <h6 onClick={()=>changeValue("Net 1 day")}>Net 1 day</h6>
                        <div className={`hr ${darkMode?"dark-hr" : "light-hr"}`}></div>
                        <h6  onClick={()=>changeValue("Net 7 days")}>Net 7 days</h6>
                        <div className={`hr ${darkMode?"dark-hr" : "light-hr"}`} ></div>
                        <h6 onClick={()=>changeValue("Net 14 days")}>Net 14 days</h6>
                        <div className={`hr ${darkMode?"dark-hr" : "light-hr"}`}></div>
                        <h6 onClick={()=>changeValue("Net 30 days")}>Net 30 days</h6>
                </div>

                        </> 
                    }
                    
              </div>
                 
                </div>
              </div>
              <div>
              <div className="form-title-container">
                <div className="message">

                <p
                  className={`form-title ${
                      darkMode ? " dark-form-title" : "light-form-title"
                    }`}
                    >
                  project description
                </p>

                <p className="error">{formErrors.project}</p>
                    </div>
              </div>
                <input
                  className={`project-in ${darkMode ? "dark-input" : "light-input"}`}
                  type="text"
                  name="project"
                value={formValues.project}
                onChange={handleChange}
                />
              </div>
            </div>
            <h4 className="items-title">Item List</h4>
            <div className="item">
             
              <div className="item-inputs">
                <div className="input-title">

                    <h5 className="form-title">item name</h5>
                <input
                  className={`it-name ${darkMode ? "dark-input" : "light-input"}`}
                  type="text"
                  />
                  </div>
                <div className="input-title">

                    <h5 className="form-title">qty.</h5>

                <input
                type="number"
                  className={`it-quantity ${darkMode ? "dark-input" : "light-input"}`}
                  />
                  </div>

                <div className="input-title">
            <h5 className="form-title">price</h5>

                <input
                type="number"

                  className={`it-price ${darkMode ? "dark-input" : "light-input"}`}
                  />
                  </div>

               
               <div className="input-title">
               <h5 className=" form-title total">total</h5>

                <div className="item-text">
                  <h4>156.00</h4>
                  <svg
                    width="13"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                      fill="#888EB0"
                      fill-rule="nonzero"
                    />
                  </svg>
                </div>
               </div>

              </div>
             
              <button className={`item-btn ${darkMode ?"dark-item-btn": "light-item-btn"}`}>
                + add new item
              </button>
            </div>

          </form>
          <div className="error">
            <p>-All fields must be added</p>
            <p>-An item must be added</p>
          </div>
        </div>
        <div className="edit-invoice-button">
          <div className="edit-button-container">
            <button
              className={`cancel-btn ${
                darkMode ? "dark-cancel-btn" : "light-cancel-btn"
              }`}
            >
              cancel
            </button>
            <button type="submit" className="save-btn">save changes</button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Edit;
