import { generateKey } from "./generate-key"
import crypto from 'crypto'
export const encryptMessage = ({
    message,
    senderId,
    receiverId
}: {
    message: string,
    senderId: string,
    receiverId: string
}) => {
    const key = generateKey(senderId, receiverId)

    const iv = Buffer.alloc(16, 0)

    const cipher = crypto.createCipheriv('aes-256-ocb', key, iv)

    let encrypted = cipher.update(message, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return encrypted;
}