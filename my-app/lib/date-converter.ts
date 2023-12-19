// formats timestamp to a readable date and time
export const formatTimestamp = (timestamp: string) => {
  const dateObject = new Date(timestamp);

  return dateObject.toLocaleString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
