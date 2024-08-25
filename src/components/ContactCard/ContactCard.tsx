import React from "react";
import { UserI } from "../../types";
import "./style.scss";
import classNames from "classnames";

interface ContactCardProps {
  contact: UserI;
  className?: string;
  onSelectContact?: (contact: UserI) => void;
  isActive?: boolean;
  style?: React.CSSProperties;
}

const ContactCard = ({
  contact,
  className,
  onSelectContact,
  isActive,
  style,
}: ContactCardProps) => {
  const { name, image } = contact;

  const handleSelect = () => {
    if (onSelectContact) {
      onSelectContact(contact);
    }
  };
  return (
    <div
      className={classNames(
        "contact-card",
        isActive && "contact-card--active",
        className
      )}
      style={style}
      onClick={handleSelect}
    >
      <img className="contact-card__image" src={image} alt={name} />
      <span className="contact-card__name">{name}</span>
    </div>
  );
};

export default ContactCard;
