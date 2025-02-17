import bcrypt from "bcrypt";

//Hashing the passwords
export const hashPassword = async (password) => {

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
  } catch (error) {

    console.log("Error in hashing password:", error);
    return null;
  }
};

//Verifying the hashed passwords
export const verifyPassword = async ({ password, hashedPassword }) => {

  try {

    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
  } catch (error) {

    console.log("Error in verifying password:", error);
    return false;
  }
};
