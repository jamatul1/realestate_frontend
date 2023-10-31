export function getFilteredArray(array, filterProp) {
  //filterProp - keys = propertyType,price,beds
  //values = propertyType = 'all,house' price= {min: 0, max: 100} beds= {min: 0, max: 100}
  let filteredArray = [];
  let shouldIncluded = false;
  for (let i = 0; i < array.length; i++) {
    if (filterProp.propertyTypes) {
      let propertyTypes = filterProp.propertyTypes.split(",");
      if (propertyTypes.includes("all")) {
        shouldIncluded = true;
      } else {
        propertyTypes.forEach((pT) => {
          if (array[i].type === pT) {
            shouldIncluded = true;
          }
        });
      }
    }
    if (filterProp.propertyTypes && !shouldIncluded) continue;
    if (filterProp.price) {
      let { min, max } = filterProp.price;
      if (array[i].price >= min && array[i].price <= max) {
        shouldIncluded = true;
      } else {
        shouldIncluded = false;
      }
    }
    if (filterProp.price && !shouldIncluded) continue;
    if (filterProp.beds) {
      let { min, max } = filterProp.beds;
      if (array[i].beds >= min && array[i].beds <= max) {
        shouldIncluded = true;
      } else {
        shouldIncluded = false;
      }
    }
    if (filterProp.beds && !shouldIncluded) continue;
    if (shouldIncluded) filteredArray.push(array[i]);
    shouldIncluded = false;
  }
  return filteredArray;
}
