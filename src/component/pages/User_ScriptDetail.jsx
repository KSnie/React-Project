import React from "react";
import "../css-pages/ScriptDetail.css";
import scriptImg from "../image/scriptImg.svg";

const ScriptDetail = ({scriptDetails}) => {
    return (
        <div>
            <div className="containter">
                <div className="ScriptDetail-header">
                    <h4>{scriptDetails.topic}</h4>
                    <p>{scriptDetails.f_name} {scriptDetails.l_name}</p>
                </div>

                <div className="ScriptDetail-img">
                    <img src={scriptImg} alt="scriptImg"></img>
                </div>
            </div>
        </div>
    );
};

export default ScriptDetail