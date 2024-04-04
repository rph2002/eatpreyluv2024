import React from "react";
import "./PageHeader.css";

function PageHeader() {
  return (
    <div className="body">
      <div>
        <PageName className="PageName" />
      </div>
    </div>
  );
}

function PageName() {
  return (
    <div className="PageName">
      <h1 id="LogoTitle">EatPreyLuv</h1>
    </div>
  );
}

export default PageHeader;
