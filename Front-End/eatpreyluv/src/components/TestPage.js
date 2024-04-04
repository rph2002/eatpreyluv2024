import React from "react";
import './TestPage.css'
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter"
import PetSelector from "./PetSelector";
import AboutUs from "./AboutUs";
import Navbar from "../pages/navbar";

function TestPage() {
    return(
        <div className="TestPage">
            <PageHeader />
            <Navbar />
            <form className="HomeContent">
                <PetSelector />
                <AboutUs />
            </form>
            <PageFooter />
        </div>
    );
}

export default TestPage;