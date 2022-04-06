export const getValidArr = (arr, defaultVal = []) => {
  if (arr && Array.isArray(arr)) {
    return arr;
  } else {
    console.log("해당 값은 배열이 아니므로 기본 값이 들어갑니다.");
    return defaultVal;
  }
};
export const isInObject = (property, obj) => {
  return `${property}` in obj;
};
