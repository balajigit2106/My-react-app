import React, { useState } from "react";
import Vector from "../assets/login-vector.png";
import CommonInputField from "../Common/CommonInputField";
import "./styles.css";
import { emailValidator, selectValidator } from "../Common/Validation";
import { login } from "../API-Service/action";
import { useNavigate } from "react-router-dom";
import { CommonToaster } from "../Common/CommonToaster";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [validationTrigger, setValidationTrigger] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationTrigger(true);

    const emailValidate = emailValidator(email);
    const passwordValidate = selectValidator(password);

    setEmailError(emailValidate);
    setPasswordError(passwordValidate);

    if (emailValidate || passwordValidate) return;

    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await login(payload);
      console.log("login response", response);
      localStorage.setItem("Accesstoken", response?.data?.token || "");
      localStorage.setItem(
        "organizationId",
        response?.data.userDetails.organizationId
      );
      CommonToaster(response.data.message, "success");
      setTimeout(() => {
        navigate("/users");
      }, 500);
    } catch (error) {
      CommonToaster(error?.response?.data?.message, "error");
    }
  };

  return (
    <div className="login_maincontainer">
      <div className="login_card">
        <div className="container">
          <div className="row">
            <div className="col-7" style={{ padding: "0" }}>
              <img src={Vector} className="login_vectorimage" />
            </div>
            <div className="col-5">
              <div className="form-group login_formcontainer">
                <p className="login_heading">Hello,</p>
                <p className="welcomeback_text">Welcome Back!</p>
                <p className="login_specialtext">
                  Hey, welcome back to your special place
                </p>
                <form>
                  <CommonInputField
                    label="Email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (validationTrigger) {
                        setEmailError(emailValidator(event.target.value));
                      }
                    }}
                    value={email}
                    error={emailError}
                  />
                  <CommonInputField
                    label="Password"
                    style={{ marginTop: "22px" }}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      if (validationTrigger) {
                        setPasswordError(selectValidator(event.target.value));
                      }
                    }}
                    value={password}
                    error={passwordError}
                  />
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      type="submit"
                      className="btn btn-primary signin_button"
                      onClick={handleSubmit}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
