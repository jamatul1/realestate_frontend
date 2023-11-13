export default function sortItems(field, order, items) {
  if (!field || field == "none") return items;

  let sorted = items.sort((a, b) => {
    if (order === "asc") return Number(a[field]) - Number(b[field]);
    else return Number(b[field]) - Number(a[field]);
  });

  return sorted;
}
