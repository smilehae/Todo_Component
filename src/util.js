export const getValidArr = (arr, defaultVal = []) => {
  if (arr && Array.isArray(arr)) {
    return arr;
  } else {
    console.log("해당 값은 배열이 아니므로 기본 값이 들어갑니다.");
    return defaultVal;
  }
};

export const areInObject = (obj, propertyArr, componentName = "") => {
  for (const property of propertyArr) {
    if (!(property in obj)) {
      console.error(
        `${
          componentName ? componentName + ":" : ""
        } property "${property}"가 존재하지 않는 값입니다. 잘못된 접근입니다.`
      );
      return false;
    }
  }
  return true;
};

export const areInObjectWithType = (obj, propertyArr, componentName = "") => {
  for (const [property, type] of propertyArr) {
    console.log(property, type);
    if (!(property in obj)) {
      console.error(
        `${
          componentName ? componentName + ":" : ""
        } property "${property}"가 존재하지 않는 값입니다. 잘못된 접근입니다.`
      );
      return false;
    }
    if (type === "array") {
      if (!Array.isArray(obj[property])) {
        console.error(
          `${
            componentName ? componentName + ":" : ""
          } property "${property}"에 담긴 자료형이 배열이 아닙니다. 잘못된 접근입니다.`
        );
        return false;
      }
    }
    if (type === "number") {
      if (!parseInt(obj[property])) {
        console.error(
          `${
            componentName ? componentName + ":" : ""
          } property "${property}"에 담긴 자료형이 숫자로 변환가능하지 않습니다. 잘못된 접근입니다.`
        );
        return false;
      }
    }
  }
  return true;
};

export const isInObject = (property, obj) => {
  return `${property}` in obj;
};

export const isNewCalled = (newTarget, componentName = "") => {
  if (!newTarget) {
    console.error(
      `${componentName ? componentName + ":" : ""} new를 호출해서 사용해주세요.`
    );
    return false;
  }
  return true;
};
