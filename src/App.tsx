import { useState } from "react";
import { ContactContext, DraftMessageT, loggedInUser } from "./context";
import { UserI } from "./types";
import NavigationPanel from "./components/NavigationPanel/NavigationPanel";
import MainContainer from "./components/MainContainer/MainContainer";

function App() {
  const [user] = useState<UserI>(loggedInUser);
  const [selectedContact, setSelectedContact] = useState<UserI | null>(null);
  const [draftMessages, setDraftMessages] = useState<DraftMessageT>({});

  return (
    <ContactContext.Provider
      value={{
        user,
        selectedContact,
        setSelectedContact,
        draftMessages,
        setDraftMessages,
      }}
    >
      <div className="app-container">
        <NavigationPanel />
        <MainContainer />
      </div>
    </ContactContext.Provider>
  );
}

export default App;
