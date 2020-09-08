function test() {
    console.log('onClick')
    $('#title').text('changed title')
    $('.tips').html('<s>changed tips stressed<s>')
    
} 
// 这两个作为 callback 函数
function fn1( value ) {
    console.log( value );
  }
   
  function fn2( value ) {
    fn1("fn2 says: " + value);
    return false;
  }

  var callbacks = $.Callbacks()
  callbacks.add(fn1)
  callbacks.fire('terry')

  callbacks.add(fn2)
  callbacks.fire('terry2')
 