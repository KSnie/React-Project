import React from "react";
import "../css-pages/ScriptDetail.css";
import scriptImg from "../image/scriptImg.svg";

const ScriptDetail = ({scriptDetails}) => {
    return (
        <div>
            <div className="containter">
                <div className="ScriptDetail-header">
                    <h4>{scriptDetails.name}</h4>
                    <p>{scriptDetails.sent_from}</p>
                </div>

                <div className="ScriptDetail-img">
                    <img src={scriptImg} alt="scriptImg"></img>
                </div>
            </div>
        </div>
    );
};

export default ScriptDetail