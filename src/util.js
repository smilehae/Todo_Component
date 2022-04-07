const writeErrorMessge = (message, componentName) => {
  console.error(
    `${componentName ? componentName + ":" : ""} ${message} 잘못된 접근입니다.`
  );
};

export const getValidArr = (arr, defaultVal = []) => {
  if (arr && Array.isArray(arr)) {
    return arr;
  }
  writeErrorMessge("해당 값은 배열이 아니므로 설정 상 기본 값이 들어갑니다.");
  return defaultVal;
};

export const areInObject = (obj, propertyArr, componentName = "") => {
  if (typeof obj !== "object") {
    writeErrorMessge("주어진 값이 객체가 아닙니다.", componentName);
    return false;
  }

  for (const property of propertyArr) {
    if (!(property in obj)) {
      writeErrorMessge(` property "${property}"가 존재하지 않는 값입니다.`);
      return false;
    }
  }
  return true;
};

export const areInObjectWithType = (obj, propertyArr, componentName = "") => {
  if (typeof obj !== "object") {
    writeErrorMessge("주어진 값이 객체가 아닙니다.", componentName);
    return false;
  }

  for (const [property, type] of propertyArr) {
    if (!(property in obj)) {
      writeErrorMessge(
        `property "${property}"가 존재하지 않는 값입니다.`,
        componentName
      );
      return false;
    }

    if (type === "array") {
      if (!Array.isArray(obj[property])) {
        writeErrorMessge(
          `property "${property}"에 담긴 자료형이 배열이 아닙니다.`,
          componentName
        );
        return false;
      }
    }

    if (type === "number") {
      if (!parseInt(obj[property])) {
        writeErrorMessge(
          `property "${property}"에 담긴 자료형이 숫자로 변환가능하지 않습니다.`
        );
        return false;
      }
    }
  }
  return true;
};

export const isNewCalled = (newTarget, componentName = "") => {
  if (!newTarget) {
    writeErrorMessge(
      `${componentName ? componentName + ":" : ""} new를 호출해서 사용해주세요.`
    );
    return false;
  }
  return true;
};
