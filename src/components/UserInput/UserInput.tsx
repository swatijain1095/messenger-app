import classNames from "classnames";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import "./style.scss";

interface UserInputProps {
  className?: string;
  onSendMessage: (message: string) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const UserInput = ({
  className,
  onSendMessage,
  inputValue,
  setInputValue,
}: UserInputProps) => {
  const handleSendClick = () => {
    if (inputValue.trim() !== "") {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className={classNames("user-input", className)}>
      <input
        type="text"
        placeholder="Type message here.."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && handleSendClick();
        }}
      />
      <button onClick={handleSendClick}>
        <IoMdSend size={20} />
      </button>
    </div>
  );
};

export default UserInput;
