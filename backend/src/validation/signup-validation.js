export const validateSignupInputs = (inputs) => {
  try {
    if (inputs.username.length > 15 && inputs.username.length < 3) {
      throw new Error("Username should be between 3 and 15 characters long.");
    }
    if (inputs.password.length < 8) {
      throw new Error("Password should be at least 8 characters long.");
    }
    if (!inputs.email.includes("@")) {
      throw new Error("Please enter a valid email address.");
    }
    return {
      success: true,
      message: "All inputs are valid.",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
