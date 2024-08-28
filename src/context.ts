import { createContext } from "react";
import { UserI } from "./types";

export type DraftMessageT = Record<string, string>;

interface ContactContextType {
  selectedContact: UserI | null;
  setSelectedContact: React.Dispatch<React.SetStateAction<UserI | null>>;
  user: UserI;
  draftMessages: DraftMessageT;
  setDraftMessages: React.Dispatch<React.SetStateAction<DraftMessageT>>;
}

export const loggedInUser: UserI = {
  id: "101",
  name: "Martha Jones",
  image: "https://picsum.photos/seed/101/200/200",
};

export const ContactContext = createContext<ContactContextType>({
  user: loggedInUser,
  selectedContact: null,
  setSelectedContact: () => {},
  draftMessages: {},
  setDraftMessages: () => {},
});
