// https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
// 构造函数
FormData()
// 创建一个空的FormData对象，并从指定的表单中获取键值对
var formData = new FormData(myForm)

// 方法
FormData.set()
FormData.append()
FormData.has()
FormData.get()
FormData.getAll()
FormData.delete()
FormData.keys()
FormData.values()
FormData.entries()

// 1. Creating a FormData object from scratch
var formData = new FormData()

formData.append('username', 'terry')
formData.append('accountnum', 123456) // number会马上被转为string

// HTML file input, chosen by user
formData.append('userfile', fileInputElement.files[0])

// JS file-like object
var content = '<a id="a"><b id="b">hey</b></a>' // body of the file
var blob = new Blob([content], {type: 'text/xml'})
formData.append('webmasterfile', blob)

var request = new XMLHttpRequest()
request.open('POST', 'http://foo.com/submitform.php')
request.send(formData)


// 2. Retrieving a FormData object from an HTML form
// formData = new FormData(someFormElement) 
var formElement = document.querySelector('form')
var request = new XMLHttpRequest()
request.open('POST', 'submitform.php')
request.send(new FormData(formElement))

var formElement = document.querySelector('form')
var formData = new FormData(formElement)
var request = new XMLHttpRequest()
request.open('POST', 'submitform')
formData.append('serialnumber', 132456)
request.send()

// 3. Sending files using a FormData object

// 4. Using a formdata event

// 5. Submitting forms and uploading files via AJAX without FormData objects
