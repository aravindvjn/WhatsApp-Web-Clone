import bcrypt from "bcrypt";
export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log("Error in hashing password:", error);
    return null;
  }
};

export const verifyPassword = async ({ password, hashedPassword }) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.log("Error in verifying password:", error);
    return false;
  }
};
