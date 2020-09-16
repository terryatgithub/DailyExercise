const source = {
  set foo(value) {
    console.log(value);
  },
};
let target1 = {};
Object.assign(target1, source);
console.log(Object.getOwnPropertyDescriptor(target1, "foo"));

let target2 = {};
// 浅合并
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
console.log(Object.getOwnPropertyDescriptor(target2, "foo"));

let target3 = {};
// 浅合并
const shallowMerge = (target, source) =>
  Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
console.log(shallowMerge(target3, source));
console.log(Object.getOwnPropertyDescriptor(target3, "foo"));

// 浅拷贝
let obj = source;
const clone = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);
console.log(clone);

const shallowClone = (obj) =>
  Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
  );
console.log(shallowClone(source));

// 继承 1
let prot = source.__proto__;
obj = {
  __proto__: prot,
  foo: 123,
};
// 2
obj = Object.create(prot);
obj.foo = 123;
// 3
obj = Object.assign(Object.create(prot), {
  foo: 123,
});
// 4
obj = Object.create(
  prot,
  Object.getOwnPropertyDescriptors({
    foo: 123,
  })
);

// 实现mixin
let a = { a: "a" };
let b = { b: "b" };
let c = { c: "c" };

let mix = (obj) => ({
  with: (...mixins) =>
    mixins.reduce(
    //   (a, b) => Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)),
      (a, b) => Object.create(a, Object.getOwnPropertyDescriptors(b)),
      obj
    ),
});

let d = mix(c).with(a, b);
console.log(d);
console.log(d.b);
console.log(d.a);

