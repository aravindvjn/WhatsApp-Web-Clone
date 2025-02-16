import AES from "crypto-js/aes";
import { generateKey } from "./generate-key";

export const encryptMessage = ({ message, senderId, receiverId }: {
    message: string,
    senderId: string,
    receiverId: string
}) => {
    const key = generateKey(senderId, receiverId);
    return AES.encrypt(message, key).toString() ||"";
};
