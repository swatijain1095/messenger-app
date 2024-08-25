import React, { useContext, useEffect, useState } from "react";
import { ContactContext } from "../../context";
import ContactCard from "../ContactCard/ContactCard";
import "./style.scss";
import { getMessages } from "../../api";
import { MessageI } from "../../types";
import Message from "../Message/Message";
import UserInput from "../UserInput/UserInput";

const MainContainer = () => {
  const {
    selectedContact,
    user: { id: userId },
  } = useContext(ContactContext);
  const { id: selectedContactId = "" } = selectedContact || {};
  const [conversations, setConversations] = useState<MessageI[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages(userId, selectedContactId);
        setConversations(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    selectedContactId && fetchMessages();
  }, [selectedContactId, userId]);

  return (
    <div className="main-container">
      {selectedContact ? (
        <>
          <ContactCard
            contact={selectedContact}
            style={{ backgroundColor: "#ffffff" }}
            className="main-container__contact-card"
          />
          <div className="scroll-container">
            <div className="main-container__messages">
              {conversations.map((message, index) => {
                return <Message key={index} message={message} />;
              })}
            </div>
            <UserInput className="main-container__footer" />
          </div>
        </>
      ) : (
        <div className="main-container__default">Please select a contact</div>
      )}
    </div>
  );
};

export default MainContainer;
