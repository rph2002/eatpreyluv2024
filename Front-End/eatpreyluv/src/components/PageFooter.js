import React from "react";
import "./PageFooter.css";

function PageFooter() {
  return (
    <div className="PageFooter">
      <GetInTouch />
      <Company />
      <SocialMedia />
    </div>
  );
}

function GetInTouch() {
  return (
    <div className="FooterSection">
      <h3 className="Title">Get In Touch</h3>
      <div className="ContactInfo">
        <p>7237 Valley Court Ottumwa, IA 52501</p>
        <p>+1 213-586-4001</p>
        <p>help.customer@EatPreyLuv.com</p>
      </div>
    </div>
  );
}

function Company() {
  return (
    <div className="FooterSection">
      <h3 className="Title">Company</h3>
      <div className="Links">
        <p>Privacy Policy</p>
        <p>Terms and Conditions</p>
        <p>Refunds</p>
        <p>Help & FAQs</p>
      </div>
    </div>
  );
}

function SocialMedia() {
  return (
    <div className="FooterSection">
      <h3 className="Title">Social Media</h3>
      <div></div>
    </div>
  );
}

export default PageFooter;
