var readline = require("readline");
var rl = readline.createInterface(process.stdin, process.stdout);

var args = [];

rl.on("line", function(str){
    args.push(str);
    if(args.length == 2){
        rl.close();
    }
});

rl.on("close", function(){
    var arr = args[0].split('');
    var s = args[1].toLowerCase();
    var res = 0;
    arr.forEach(function(item, index){
        if(item.toLowerCase() == s){
            res++;
        }
    });
    console.log(res);
    args.length = 0;
})