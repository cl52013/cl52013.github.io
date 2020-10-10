// 封装一个函数
function show(ele,target,app) {
	// 清除定时器
	clearInterval(ele.timed)
	// 开启定时器
	ele.timed = setInterval(function() {
		// 获取当前位置的 offsetleft
		let currentleft = ele.offsetLeft
		// 新建一个步数 
		let cat = target > currentleft ? 9 : -9 //因为有左右移动  所有我们用三元得出当前的步数
		// 两者相加做动画
		currentleft += cat
		// 判断  如果目标距离减去当前的offset值  那么继续动画
		if(Math.abs(target-currentleft) > Math.abs(cat)){
			ele.style.left = currentleft + 'px'
		}else{  //否则就直接赋值
			ele.style.left = target + 'px'
			app()
		}
	}, 20)

}
