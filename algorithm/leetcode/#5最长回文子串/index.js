// 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

// 示例 1：

// 输入: "babad"
// 输出: "bab"
// 注意: "aba" 也是一个有效答案。
// 示例 2：

// 输入: "cbbd"
// 输出: "bb"

// testcase
const testcase = [
  "",
  "a",
  "ac",
  "babad",
  "cbbd",
  "zudfweormatjycujjirzjpyrmaxurectxrtqedmmgergwdvjmjtstdhcihacqnothgttgqfywcpgnuvwglvfiuxteopoyizgehkwuvvkqxbnufkcbodlhdmbqyghkojrgokpwdhtdrwmvdegwycecrgjvuexlguayzcammupgeskrvpthrmwqaqsdcgycdupykppiyhwzwcplivjnnvwhqkkxildtyjltklcokcrgqnnwzzeuqioyahqpuskkpbxhvzvqyhlegmoviogzwuiqahiouhnecjwysmtarjjdjqdrkljawzasriouuiqkcwwqsxifbndjmyprdozhwaoibpqrthpcjphgsfbeqrqqoqiqqdicvybzxhklehzzapbvcyleljawowluqgxxwlrymzojshlwkmzwpixgfjljkmwdtjeabgyrpbqyyykmoaqdambpkyyvukalbrzoyoufjqeftniddsfqnilxlplselqatdgjziphvrbokofvuerpsvqmzakbyzxtxvyanvjpfyvyiivqusfrsufjanmfibgrkwtiuoykiavpbqeyfsuteuxxjiyxvlvgmehycdvxdorpepmsinvmyzeqeiikajopqedyopirmhymozernxzaueljjrhcsofwyddkpnvcvzixdjknikyhzmstvbducjcoyoeoaqruuewclzqqqxzpgykrkygxnmlsrjudoaejxkipkgmcoqtxhelvsizgdwdyjwuumazxfstoaxeqqxoqezakdqjwpkrbldpcbbxexquqrznavcrprnydufsidakvrpuzgfisdxreldbqfizngtrilnbqboxwmwienlkmmiuifrvytukcqcpeqdwwucymgvyrektsnfijdcdoawbcwkkjkqwzffnuqituihjaklvthulmcjrhqcyzvekzqlxgddjoir",
];
testcase.forEach((item) => {
  console.log(longestPalindrome(item));
});
// 1. 暴力解法
// 辅助函数：判断指定位置字符串是否回文
function validate(s, l, r) {
  while (l <= r) {
    if (s.charAt(l) !== s.charAt(r)) {
      return false;
    }
    l++;
    r--;
  }
  return true;
}
function longestPalindrome(str) {
  if (!str) return ""; //空字符串

  // 在记录最长回文子串的时候，可以只记录’当前子串的起始位置‘和’子串长度‘，不必做截取； 
  let index = 0, //当前最长回文子串的起始index
    count = 0, //记录校验了多少次
    maxLen = 1; //当前最长回文子串的长度,默认为1,用以处理回文长度为1的情况
  for (let i = 0, len = str.length; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      // 只判断大于当前最大长度的子串
      if (j - i + 1 > maxLen) {
        count++;
        if (validate(str, i, j)) {
          index = i;
          maxLen = j - i + 1;
        }
      }
    }
  }
  console.log(`${str}: 长度为 ${str.length}, 总计校验了${count}次`);
  //返回最大回文子串长度
  return str.substr(index, maxLen);
}
