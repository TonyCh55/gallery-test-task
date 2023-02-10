export const makeUnique = (array: any[]) => {
  return array.filter(
    (item, index, arr) =>
      index ===
      arr.findIndex((t) => t.id === item.id && t.created_at === item.created_at)
  );
};
