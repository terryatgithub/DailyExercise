let u = {
	// arr : [1, 2, '2', 6, 6, 5],
	arr : [1, 2, 3, 1, 2, '4', 'abc', [], {}, null, undefined],
	updateTime() {
		let arr = this.arr
		let m = new Map(), newarr= []
		arr.forEach((item, index, arr) => {
			if(!m.has(item)) {
				m.set(item)
				newarr.push(item)
			}
		})
		console.log(newarr)
	},
	updateTimeSet() {
		let arr = this.arr
		let m = new Set(), newarr= []
		arr.forEach((item, index, arr) => {
			if(!m.has(item)) {
				m.add(item)
				newarr.push(item)
			}
		})
		console.log(newarr)
	},
	updateTimeObj() { //首选
		let arr = this.arr
		let o = {}, newarr= []
		arr.forEach((item, index, arr) => {
			if(!o[item]) {
				o[item] = true
				newarr.push(item)
			}
		})
		console.log(newarr)
	},
	updateTimeReduce() {
		let arr = this.arr
		newarr = arr.sort().reduce((pre, cur) => {
			if(pre.length == 0 || pre[pre.length-1]!=cur) {
				pre.push(cur)
			}
			return pre
		}, [])
		console.log(newarr)
	}
}
u.updateTime()
u.updateTimeSet()
u.updateTimeObj()
u.updateTimeReduce()