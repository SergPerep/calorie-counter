const getRandomArrItem = (items: unknown[]) =>
  items[Math.floor(Math.random() * items.length)];

export default getRandomArrItem;
