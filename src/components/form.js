import React, { useState } from "react";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i
);
const validateForm = (state) => {
  let valid = true;
  Object.values(state);
  Object.values(state).forEach((val) => {
    val === null && (valid = false);
  });
  Object.values(state.errors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

function checkAge(birthDate) {
  var currentYear = new Date().getFullYear();
  console.log(birthDate);
  var birthYear = birthDate.split("-")[0];
  console.log("eee");
  var age = currentYear - birthYear;
  if (age < 18) {
    return "your age must be greater than 18";
  }
  return "";
}

const Form = () => {
  const [state, setState] = useState({
    fullName: null,
    email: null,
    phoneNo: null,
    dob: null,
    errors: {
      fullName: "",
      email: "",
      phoneNo: "",
      dob: "",
    },
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = { ...state.errors };

    switch (name) {
      case "fullName":
        errors.fullName =
          value.length < 5
            ? "Full Name must be at least 5 characters long!"
            : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "phoneNo":
        errors.phoneNo =
          value.length !== 10 ? "phoneNo must be of 10 digits!" : "";
        break;
      case "dob":
        errors.dob = checkAge(value);

        break;
      default:
        break;
    }

    setState({ ...state, errors, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm(state)) {
      console.info("Valid Form");
      console.log(state);
    } else {
      console.error("Invalid Form");
    }
  };

  const { errors } = state;

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="fullName">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              onChange={handleChange}
              noValidate
            />
            {errors.fullName.length > 0 && (
              <span className="error">{errors.fullName}</span>
            )}
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              noValidate
            />
            {errors.email.length > 0 && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <div className="phoneNo">
            <label htmlFor="phoneNo">Phone Number</label>
            <input
              type="phoneNo"
              name="phoneNo"
              onChange={handleChange}
              noValidate
            />
            {errors.phoneNo.length > 0 && (
              <span className="error">{errors.phoneNo}</span>
            )}
          </div>
          <div className="dob">
            <label htmlFor="dob">
              {" "}
              Date of Birth
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                noValidate
              />
            </label>

            <span className="error">{errors.dob}</span>
          </div>
          <div className="submit">
            <button>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
