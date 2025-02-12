export type MessagesTypes = {
    _id: string;
    chatId: string;
    senderId: string;
    receiverId: string;
    text: string;
    mediaUrl: null;
    mediaType: "image" | "video" | "audio" | "document" | "none";
    status: "sent" | "delivered" | "read";
    timestamp: string;
}

export type ChatsType =
    {
        _id: string;
        lastMessage: MessagesTypes | undefined;
        otherUser: UserType | undefined;
    }

export type UserType = {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
    displayName: string;
    profilePic: string;
    status: string;
    lastSeen: string;
    groups: string[];
}