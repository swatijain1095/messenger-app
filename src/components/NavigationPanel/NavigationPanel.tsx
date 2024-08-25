import { useContext, useEffect, useState } from "react";
import "./style.scss";
import { UserI } from "../../types";
import { getContactList } from "../../api";
import ContactCard from "../ContactCard/ContactCard";
import { ContactContext } from "../../context";

const NavigationPanel = () => {
  const [contacts, setContacts] = useState<UserI[]>([]);
  const { selectedContact, setSelectedContact } = useContext(ContactContext);

  useEffect(() => {
    const fetchContactList = async () => {
      try {
        const data = await getContactList();
        setContacts(data);
      } catch (error) {
        console.error("failed to fetch contacts: ", error);
      }
    };

    fetchContactList();
  }, []);

  const handleSelectContact = (contact: UserI) => {
    setSelectedContact(contact);
  };

  return (
    <div className="navigation-panel">
      <header className="navigation-panel__header">Messenger App</header>
      <div className="navigation-panel__contacts">
        {contacts.map((contact) => {
          return (
            <ContactCard
              key={contact.id}
              contact={contact}
              onSelectContact={handleSelectContact}
              isActive={selectedContact?.id === contact.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NavigationPanel;
