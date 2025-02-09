export const timeAgo = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((Number(now) - Number(past)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const isYesterday = (now.getDate() - past.getDate() === 1) &&
        (now.getMonth() === past.getMonth()) &&
        (now.getFullYear() === past.getFullYear());
    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    if (isYesterday) return "Yesterday";

    return past.toLocaleDateString("en-GB");
}

