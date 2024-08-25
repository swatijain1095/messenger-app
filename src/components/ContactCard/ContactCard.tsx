import React from "react";
import { UserI } from "../../types";
import "./style.scss";
import classNames from "classnames";

interface ContactCardProps {
  contact: UserI;
  className?: string;
}

const ContactCard = ({ contact, className }: ContactCardProps) => {
  const { name, image } = contact;
  return (
    <div className={classNames("contact-card", className)}>
      <img className="contact-card__image" src={image} alt={name} />
      <span className="contact-card__name">{name}</span>
    </div>
  );
};

export default ContactCard;
