export const getFilteredForecasts = (array) => {
  return array.filter((_, index) => (index + 1) % 8 === 0);
};

export const getDate = (date) => {
  const milliseconds = date * 1000;
  const dateObject = new Date(milliseconds);
  return dateObject.toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};

export const getTime = (time) => {
  const milliseconds = time * 1000;
  const dateObject = new Date(milliseconds);
  return dateObject.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};
