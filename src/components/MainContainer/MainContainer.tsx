import React, { useContext } from "react";
import { ContactContext } from "../../context";
import ContactCard from "../ContactCard/ContactCard";
import "./style.scss";

const MainContainer = () => {
  const { selectedContact } = useContext(ContactContext);

  return (
    <div className="main-container">
      {selectedContact ? (
        <>
          <ContactCard
            contact={selectedContact}
            style={{ backgroundColor: "#ffffff" }}
            className="main-container__contact-card"
          />
        </>
      ) : (
        <div className="main-container__default">Please select a contact</div>
      )}
    </div>
  );
};

export default MainContainer;
