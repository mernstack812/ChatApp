import { create } from "zustand";

const useConversation = create((set) => ({
  selectConversation: null,
  setselectConversation: (selectConversation) => set({ selectConversation }),
  messages: [],
  setmessages: (messages) => set({ messages }),
}));

export default useConversation;
