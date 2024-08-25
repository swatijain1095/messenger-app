import classNames from "classnames";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import "./style.scss";

interface UserInputProps {
  className?: string;
}

const UserInput = ({ className }: UserInputProps) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={classNames("user-input", className)}>
      <input
        type="text"
        placeholder="Type message here.."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button>
        <IoMdSend size={20} />
      </button>
    </div>
  );
};

export default UserInput;
