export const formatTime = (time) => {
    // formater la durée de la vidéo
    if (isNaN(time)) {
        return "00:00";
    }

    const date = new Date(time * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    if (hours) {
        // Dans le cas où la vidéo à au moins 1heure
        return `${hours}:${minutes.toString().padStart(2, "0")} `;
    } else return `${minutes}:${seconds}`;
};