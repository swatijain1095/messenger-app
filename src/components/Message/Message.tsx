import React, { useContext } from "react";
import { MessageI } from "../../types";
import { ContactContext } from "../../context";
import classNames from "classnames";
import "./style.scss";

interface MessageProps {
  message: MessageI;
}

const Message = ({ message: { message: text, sender } }: MessageProps) => {
  const { user } = useContext(ContactContext);

  return (
    <div className="message">
      <span
        className={classNames(
          "message__content",
          `message__content--${sender === user?.id ? "right" : "left"}`
        )}
      >
        {text}
      </span>
    </div>
  );
};

export default Message;
