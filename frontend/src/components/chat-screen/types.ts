export type MessagesTypes = {
    _id: string;
    chatId: string;
    senderId: string;
    text: string;
    mediaUrl: null;
    mediaType: string;
    status: string;
    timestamp: string;
}

export type ChatsType =
    {
        _id: string;
        lastMessage: {
            _id: string;
            chatId: string;
            senderId: string;
            text: string;
            mediaUrl: null;
            mediaType: string;
            status: string;
            timestamp: string;
        } | undefined;
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