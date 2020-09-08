// 構造函數
URLSearchParams();

// 方法
URLSearchParams.has();
URLSearchParams.set();
URLSearchParams.append();
URLSearchParams.get();
URLSearchParams.getAll();
URLSearchParams.delete();
URLSearchParams.keys();
URLSearchParams.values();
URLSearchParams.entries();
URLSearchParams.sort();
URLSearchParams.toString(); //返回搜索参数组成的字符串，可以直接用在URL上



let paramsString = "q=URLUtils.searchParams&topic=api";
let searchParams = new URLSearchParams(paramsString);

for (let p of searchParams) {
  console.log(p);
}

paramsString = "http://example.com/search?query=111%40";

searchParams = new URLSearchParams(paramsString);

searchParams;
