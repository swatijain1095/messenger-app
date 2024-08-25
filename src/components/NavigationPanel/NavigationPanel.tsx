import { useEffect, useState } from "react";
import "./style.scss";
import { UserI } from "../../types";
import { getContactList } from "../../api";
import ContactCard from "../ContactCard/ContactCard";

const NavigationPanel = () => {
  const [contacts, setContacts] = useState<UserI[]>([]);

  useEffect(() => {
    const fetchContactList = async () => {
      try {
        const data = await getContactList();
        setContacts(data);
      } catch (error) {
        console.log("failed to fetch contacts: ", error);
      }
    };

    fetchContactList();
  }, []);

  return (
    <div className="navigation-panel">
      <header className="navigation-panel__header">Messenger App</header>
      <div className="navigation-panel__contacts">
        {contacts.map((contact) => {
          return <ContactCard key={contact.id} contact={contact} />;
        })}
      </div>
    </div>
  );
};

export default NavigationPanel;
