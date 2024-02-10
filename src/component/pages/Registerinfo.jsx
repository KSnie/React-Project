import React, { useState } from "react";

const Registerinfo = ({ onAuthentication, isRegisterpc }) => {
  const [isfullname, setFullname] = useState("");
  const [isdateofbirth, setDateofbirth] = useState("");
  const [isphonenumber, setPhonenumber] = useState("");
  const [iscountry, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      onAuthentication("registerinfo", NaN,NaN,isfullname, isdateofbirth, isphonenumber, iscountry,NaN);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setFullname(e.target.value)} placeholder="Full Name" />

        <input type="date" onChange={(e) => setDateofbirth(e.target.value)} placeholder="Date of Birth" />

        <input type="tel" onChange={(e) => setPhonenumber(e.target.value)} placeholder="Phone Number" />

        <input type="text" onChange={(e) => setCountry(e.target.value)} placeholder="Country" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Registerinfo;
