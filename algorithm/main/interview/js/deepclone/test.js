function deepClone(obj) {
  // 判断是否对象
  if (!isObject(obj)) {
    return;
  }

  // 判断对象或数组
  const isArray = Array.isArray(obj);
  const newObj = isArray ? [...obj] : { ...obj };
  Reflect.ownKeys(newObj).forEach((key) => {
    newObj[key] = isObject(newObj[key]) ? deepClone(newObj[key]) : obj[key];
  });
  return newObj;
}
