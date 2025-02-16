import xss from "xss";
export const sanitizeObject = (object) => {
  const sanitizedObject = {};
  for (const key in object) {
    if (typeof object[key] === "string") {
      sanitizeObject[key] === xss(object[key]);
    } else {
      sanitizeObject[key] = object[key];
    }
  }
  return sanitizedObject;
};
