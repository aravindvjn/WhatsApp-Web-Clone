export const generateRoomId = (user1: string, user2: string) => {
    return `video-call-${user1}-${user2}`;
};
