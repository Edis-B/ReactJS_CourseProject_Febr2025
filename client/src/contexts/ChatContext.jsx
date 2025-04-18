import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
	const [chatId, setChatId] = useState(null);

	return (
		<ChatContext.Provider value={{ chatId, setChatId }}>
			{children}
		</ChatContext.Provider>
	);
}

export function useChat() {
	return useContext(ChatContext);
}
