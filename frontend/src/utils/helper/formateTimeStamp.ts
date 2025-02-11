export default function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; 

    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}