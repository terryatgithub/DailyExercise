process.stdin.resume();
process.stdin.setEncoding('ascii');

var input = "";
var input_array = "";

process.stdin.on('data',function(data){
	input += data ;
});


process.stdin.on('end',function(){
	input_array = input.split('\n');
    var str = input_array[0].toLowerCase().split('').sort().join('');
        s = input_array[1].toLowerCase();
    var value,
    	num = 0;
    str.replace(/(\w)\1*/g,function($0,$1){
        console.log(`$0: ${$0}, $1: ${$1}`);
    	if($1 == s){
    	value = $1;
    	num = $0.length;
    }
    });
    
      console.log(num);
});