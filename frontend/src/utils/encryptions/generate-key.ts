import SHA256 from "crypto-js/sha256";

export const generateKey = (user1_id:string, user2_id:string) => {
  const sortedId = [user1_id, user2_id].sort().join('');
  return SHA256(sortedId).toString();
};
