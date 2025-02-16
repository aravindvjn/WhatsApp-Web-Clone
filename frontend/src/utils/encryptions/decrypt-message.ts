import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import { generateKey } from "./generate-key";

export const decryptMessage = ({ encryptedMessage, senderId, receiverId }: {
    encryptedMessage: string,
    senderId: string,
    receiverId: string
}) => {
    const key = generateKey(senderId, receiverId);
    console.log(key);
    const decryptedBytes = AES.decrypt(encryptedMessage, key);
    return decryptedBytes.toString(Utf8) || '';
};
