import React from "react";

const Pcsent = ({handleToggleForm ,isRegisterpc, isPcRequest}) => {
  return (
    <div>
      <h2>You already request</h2>
      <button onClick={() => { handleToggleForm(); isRegisterpc(); isPcRequest(); }}>Back to login</button>
    </div>
  );
};

export default Pcsent;
