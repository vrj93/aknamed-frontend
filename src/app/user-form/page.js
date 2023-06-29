"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function UserForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [dob, setDob] = useState(null);
  const [errorMessage, setErrorMessage] = useState([]);

  const handleName = (e) => {
    let name = e.target.value;
    if (name) {
      setName(name);
      setErrorMessage({ ...errorMessage, name: "" });
    } else {
      setErrorMessage({ ...errorMessage, name: "Name is required" });
    }
  };

  const handleEmail = (e) => {
    let email = e.target.value;
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(email)) {
        setEmail(email);
        setErrorMessage({ ...errorMessage, email: "" });
      } else {
        setErrorMessage({ ...errorMessage, email: "Email is not a valid" });
      }
    } else {
      setErrorMessage({ ...errorMessage, email: "Email is required" });
    }
  };

  const handlePhone = (e) => {
    let phone = e.target.value;

    if (phone) {
      var trimmedValue = phone.replace(/^0+/, "");
      var digitsOnly = trimmedValue.slice(0, 10);
      setPhone(digitsOnly);
      setErrorMessage({ ...errorMessage, phone: "" });
    } else {
      setErrorMessage({ ...errorMessage, phone: "Phone is required" });
    }
  };

  const handleDob = (dob) => {
    if (dob) {
      let currentDate = new Date();
      let currentYear = currentDate.getFullYear();
      let dobYear = dob.getFullYear();

      if (currentYear - dobYear >= 18) {
        setDob(dob);
        setErrorMessage({ ...errorMessage, dob: "" });
      } else {
        setErrorMessage({
          ...errorMessage,
          dob: "Age must be greater than or equal to 18",
        });
      }
    } else {
      setErrorMessage({ ...errorMessage, dob: "Date of Birth is required" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = false;
    let errorObj = {};

    if (!name) {
      error = true;
      errorObj.name = "Name is required";
    }

    if (!email) {
      error = true;
      errorObj.email = "Email is required";
    }

    if (!phone) {
      error = true;
      errorObj.phone = "Phone is required";
    }

    if (!dob) {
      error = true;
      errorObj.dob = "Date of birth is required";
    }

    if (!error) {
      const dataObj = {
        name: name,
        email: email,
        phone: phone,
        dob: dob,
      };

      console.log(JSON.stringify(dataObj));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataObj),
        }
      );

      const response = await res.json();

      if (res.status == 200) {
        console.log(response);
        const userId = response.data.id;
        router.push(`/user-details/${userId}`);
        setErrorMessage({ ...errorMessage, api: "" });
      } else {
        setErrorMessage({ ...errorMessage, api: response.error });
      }
    } else {
      setErrorMessage(errorObj);
      return;
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ backgroundColor: "#0072B5" }}
      >
        <div className="container" style={{ maxWidth: 400 }}>
          <h2 className="text-white mb-4">
            <strong>User Details</strong>
          </h2>
          {errorMessage.api && (
            <span
              className="form-control text-white mb-3"
              style={{
                backgroundColor: "#DE3163",
                padding: 4,
                borderRadius: "4px",
                maxWidth: "83%",
              }}
            >
              {errorMessage.api}
            </span>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label text-white">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                onChange={handleName}
              />
              {errorMessage.name && (
                <span
                  className="form-control text-white mb-3"
                  style={{
                    backgroundColor: "#DE3163",
                    padding: 4,
                    borderRadius: "4px",
                    maxWidth: "83%",
                  }}
                >
                  {errorMessage.name}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label text-white">
                <strong>Email address</strong>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                onChange={handleEmail}
              />
              {errorMessage.email && (
                <span
                  className="form-control text-white mb-3"
                  style={{
                    backgroundColor: "#DE3163",
                    padding: 4,
                    borderRadius: "4px",
                    maxWidth: "83%",
                  }}
                >
                  {errorMessage.email}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="phoneInput" className="form-label text-white">
                <strong>Phone</strong>
              </label>
              <input
                type="number"
                className="form-control"
                id="phone"
                onChange={handlePhone}
              />
              {errorMessage.phone && (
                <span
                  className="form-control text-white mb-3"
                  style={{
                    backgroundColor: "#DE3163",
                    padding: 4,
                    borderRadius: "4px",
                    maxWidth: "83%",
                  }}
                >
                  {errorMessage.phone}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="dobInput" className="form-label text-white">
                <strong>Date of Birth</strong>
              </label>
              <br />
              <DatePicker
                className="form-control"
                selected={dob}
                onChange={handleDob}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                showMonthDropdown
              />
              {errorMessage.dob && (
                <span
                  className="form-control text-white mb-3"
                  style={{
                    backgroundColor: "#DE3163",
                    padding: 4,
                    borderRadius: "4px",
                    maxWidth: "83%",
                  }}
                >
                  {errorMessage.dob}
                </span>
              )}
            </div>

            <button type="submit" className="btn btn-warning">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
