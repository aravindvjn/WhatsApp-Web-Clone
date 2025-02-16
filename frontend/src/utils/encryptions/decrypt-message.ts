import { generateKey } from "./generate-key"
import crypto from 'crypto'

export const decrypteMessage = ({
    encryptedMessage,
    senderId,
    receiverId
}: {
    encryptedMessage: string,
    senderId: string,
    receiverId: string
})=>{

    const key = generateKey(senderId, receiverId)

    const iv = Buffer.alloc(16,0)
    const decipher = crypto.createDecipheriv("aes-256-ocb",key,iv) 

    let decrypted = decipher.update(encryptedMessage,'hex','utf8')
    decrypted += decipher.final('utf8')
    
    return decrypted
}