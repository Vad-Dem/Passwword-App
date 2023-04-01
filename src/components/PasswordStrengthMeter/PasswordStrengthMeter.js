import React, { useState } from "react";
import "./PasswordStrengthMeter.css";

const validateRex = [
  ["strong", /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/],
  ["medium", /^(?=.*[a-zA-Z])(?=.*[\W]).{8,}$|^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$|^(?=.*\d)(?=.*[^\w\s])([0-9a-zA-Z\W]){8,}$/],
  ["weak", /^[a-zA-Z]{8,}$|^[0-9]{8,}$|^[^\w\s]{8,}$/],
];

function PasswordStrengthMeter() {
  const [meterClass, setMeterClass] = useState("");

  const handleCheckPassword = (e) => {
    const password = e.target.value;

    if (!password.length) {
      setMeterClass("");
      return;
    }

    if (password.length < 8) {
      setMeterClass("notEnought");
      return;
    }

    for (let index = 0; index < validateRex.length; index++) {
      if (password.match(validateRex[index][1])) {
        setMeterClass(validateRex[index][0]);
        return;
      }
    }
  };


  return (
    <div className="container">
      <form className="form">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input
          className="form__input"
          type="password"
          id="password"
          placeholder="Wrait your password here..."
          onChange={handleCheckPassword}
        />
        <div className={`form__meter ${meterClass}`}>
          <span className="text">weak password</span>
          <span className="text">medium password</span>
          <span className="text">strong password</span>
        </div>
        <button disabled={meterClass !== "strong"} className="form__button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PasswordStrengthMeter;
