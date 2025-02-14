import { backendUrl } from "./constants";

export const getImageUrl = (url: string) => {
    return url ? `${backendUrl}/${url.replace(/[/\\]/, "/")}` : "";
}