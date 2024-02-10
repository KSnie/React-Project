import React, { useState } from "react";

const RegisterFormPc = ({ onAuthentication, isPcRequest }) => {
  const [isfullname, setFullname] = useState("");
  const [isdateofbirth, setDateofbirth] = useState("");
  const [isphonenumber, setPhonenumber] = useState("");
  const [iscountry, setCountry] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();

    try {
      onAuthentication("registerPc", NaN,NaN,isfullname, isdateofbirth, isphonenumber, iscountry,"https://");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
        <input type="text" onChange={(e) => setFullname(e.target.value)} placeholder="Full Name" />

        <input type="date" onChange={(e) => setDateofbirth(e.target.value)} placeholder="Date of Birth" />

        <input type="tel" onChange={(e) => setPhonenumber(e.target.value)} placeholder="Phone Number" />

        <input type="text" onChange={(e) => setCountry(e.target.value)} placeholder="Country" />

        <button onClick={() => { handleSubmit(); }}>submitx</button>
        <button onClick={() => { isPcRequest(); }}>submitx</button>

      {/* </form> */}
    </div>
  );
};

export default RegisterFormPc;
