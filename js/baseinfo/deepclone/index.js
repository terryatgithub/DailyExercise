function deepClone(obj) {
  function isObject(o) {
    // 判断是否对象
    return typeof o === "object" && o !== null;
  }

  // 非对象、函数
  if (!isObject(obj)) {
    return;
  }

  // 数组or对象
  const isArray = Array.isArray(obj);
  let newObj = isArray ? [...obj] : { ...obj };
  // 递归处理所有属性
  Reflect.ownKeys(newObj).forEach((key) => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key];
  });
  
  return newObj;
}

let obj = {
  a: [1, 2, 3],
  b: {
    c: 4,
    d: 5,
  },
  e: () => {
    console.log("functon e");
  },
};
let newObj = deepClone(obj);
newObj.b.c = 1;
newObj.a[0] = 2;
console.log(obj);
console.log(newObj);
