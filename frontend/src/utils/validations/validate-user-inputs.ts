import { InputType } from "../../components/auth-page/form";

export const validateUserInputs = (inputs: InputType) => {

    if (!inputs.username || !inputs.password || !inputs.email) {
        return "Please fill all the fields";
    }
    if (inputs.username.length > 15 && inputs.username.length < 3) {
        return "Username should be between 3 and 15 characters";
    }
    if (inputs.password.length < 8) {
        return "Password should be at least 8 characters long";
    }
    if (!inputs.email.includes("@")) {
        return "Please enter a valid email address";
    }
}