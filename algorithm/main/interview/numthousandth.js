a = '1234567890'
re = /\d{1,3}(?=(\d{3})+$)/g
b = a.replace(re, '$&,')
b

function formatThousandth(num) {
    // num = num +''
    // 12,345,678
    '876,543,21'
    let res = num.split('').reverse().reduce((prev, cur, index) => {
        return prev += index % 3 ? cur : ','+cur 
    })
    console.log(res);
    return res.split('').reverse().join('')
}
c = formatThousandth(a)
c