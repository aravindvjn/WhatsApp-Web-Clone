import crypto from 'crypto';
export const generateKey = (user1_id: string, user2_id: string) => {
    const sortedId = [user1_id, user2_id].sort().join('')

    return crypto.createHash("sha256").update(sortedId).digest()
}