export function paginate(pageNo, pageItemNumbers, totalItems) {
  if (totalItems.length === 0) return [];
  let totalPagesSize = getTotalPagesSize(pageItemNumbers, totalItems.length);
  //Invalid page no
  if (pageNo < 1 || pageNo > totalPagesSize) return [];
  let startIndex = pageItemNumbers * (pageNo - 1);
  let endIndex = pageItemNumbers * pageNo - 1;
  return totalItems.slice(startIndex, endIndex + 1);
}

export function getTotalPagesSize(pageItemNumbers, totalItems) {
  let totalPagesSize = Math.floor(totalItems / pageItemNumbers);
  if (totalItems % pageItemNumbers > 0) totalPagesSize++;
  return totalPagesSize;
}
