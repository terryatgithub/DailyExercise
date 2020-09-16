let onWatch = (obj, setBind, getBind) => {
  let handler = {
    get(target, property, receiver) {
      getBind(target, property);
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      setBind(value, property);
      return Reflect.set(target, property, value, receiver);
    },
  };

  return new Proxy(obj, handler);
};
let obj = { a: 1 };
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到${property}修改为${v}`);
  },
  (target, property) => {
    console.log(`${property} = ${target[property]}`);
  }
);
p.a = 2
p.a