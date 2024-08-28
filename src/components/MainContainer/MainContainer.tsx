import React, { useContext, useEffect, useRef, useState } from "react";
import { ContactContext } from "../../context";
import ContactCard from "../ContactCard/ContactCard";
import "./style.scss";
import { addMessage, getMessages } from "../../api";
import { MessageI } from "../../types";
import Message from "../Message/Message";
import UserInput from "../UserInput/UserInput";

const MainContainer = () => {
  const {
    selectedContact,
    user: { id: userId },
    setDraftMessages,
    draftMessages,
  } = useContext(ContactContext);
  const { id: selectedContactId = "" } = selectedContact || {};
  const [conversations, setConversations] = useState<MessageI[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const prevContactRef = useRef<string | null>(null);

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

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [conversations.length]);

  // when selectedContact goes from null to something
  // then I have to check if there is anything in draftMessage in contact
  // then setInputValue with draft message

  // when selectedContact is changed.
  // then I have to update draftMessage for this and then empty the inputValue

  useEffect(() => {
    const prevContactId = prevContactRef.current;

    if (prevContactId) {
      if (inputValue) {
        setDraftMessages((prevMessages) => {
          return {
            ...prevMessages,
            [prevContactId]: inputValue,
          };
        });
      }
    }

    if (draftMessages[selectedContactId]) {
      setInputValue(draftMessages[selectedContactId]);
    } else {
      setInputValue("");
    }

    prevContactRef.current = selectedContactId;
  }, [selectedContactId]);

  const handleSendMessage = async (messageText: string) => {
    if (!selectedContact) return;

    const tag = [userId, selectedContactId].sort().join("");

    const newMessage: MessageI = {
      sender: userId,
      receiver: selectedContactId,
      tag,
      message: messageText,
      timeStamp: new Date().toISOString(),
    };

    try {
      const addedMessage = await addMessage(newMessage);
      setConversations((prevConversations) => [
        ...prevConversations,
        addedMessage,
      ]);
      setDraftMessages((prevMessages) => {
        return {
          ...prevMessages,
          [selectedContactId]: "",
        };
      });
    } catch (error) {
      console.error("Failed to send message: ", error);
    }
  };

  return (
    <div className="main-container">
      {selectedContact ? (
        <>
          <ContactCard
            contact={selectedContact}
            style={{ backgroundColor: "#ffffff" }}
            className="main-container__contact-card"
          />
          <div className="scroll-container" ref={scrollRef}>
            <div className="main-container__messages">
              {conversations.map((message, index) => {
                return <Message key={index} message={message} />;
              })}
            </div>
            <UserInput
              className="main-container__footer"
              onSendMessage={handleSendMessage}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          </div>
        </>
      ) : (
        <div className="main-container__default">Please select a contact</div>
      )}
    </div>
  );
};

export default MainContainer;
