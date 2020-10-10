// 创建一个入口函数
window.onload = () => {
	// 获取元素
	let box = document.querySelector('.box') //box
	let ul1 = document.querySelector('.ul1') // ul1
	let lis = document.querySelectorAll('.ul1>li') //ul1 的所有子元素li
	let ul2 = document.querySelector('.ul2') // ul2
	let btns = document.querySelector('.btns') //  btns
	let left = document.querySelector('.left') // 左边按钮
	let right = document.querySelector('.right') //右边按钮

	// 创建一个  flage  节流阀
	let flage = true
	// 创建一个 app 函数 方便传入封装函数中
	let app = () => {
		flage = true
	}

	// 新建一个索引值
	let idx = 0
	let index = 0

	// 首先我们要开始创建我们的小点点
	// 循环遍历
	for (let i = 0; i < lis.length; i++) {
		//创建小li  并且添加到 ul2 中
		ul2.appendChild(document.createElement('li'))
	}
	let yuanLis = document.querySelectorAll('.ul2>li') //ul2 的所有子元素 li
	// 我们默认给第一个 li  添加 current 类
	yuanLis[0].setAttribute('class', 'current')

	// 给我门的小点点做 颜色排他
	for (let i = 0; i < yuanLis.length; i++) {
		// 给每一个 小圆点 加一个index
		yuanLis[i].setAttribute('index', i)
		// 给小圆点注册点击事件
		yuanLis[i].onclick = function() {
			if (flage) {
				for (let i = 0; i < yuanLis.length; i++) {
					yuanLis[i].setAttribute('class', '')
				}
				this.setAttribute('class', 'current')
				// 获取当前的index值
				index = this.getAttribute('index')
				idx = index
				// 调用函数
				let target = index * -600
				// console.log(ul1.offsetLeft)
				flage = false
				show(ul1, target, app)
			}

		}
	}

	// 在这里  我们为了无限轮播效果  需要新创建一个图片
	ul1.appendChild(lis[0].cloneNode(true))


	// 点击右边按钮
	right.onclick = function() {
		//调用动画
		if (flage) {
			idx++
			if (idx > 5) {
				idx = 1
				ul1.style.left = 0 + 'px'
			}
			let target = idx * -600
			flage = false
			show(ul1, target, app)
			// 这个地方我们还要给小圆点做排他事件
			for (let i = 0; i < yuanLis.length; i++) {
				yuanLis[i].setAttribute('class', '')
			}
			// 因为我们上面最大值是5  所以这里我们需要判断
			if (idx > 4) {
				yuanLis[0].setAttribute('class', 'current')
			} else {
				yuanLis[idx].setAttribute('class', 'current')
			}
		}

	}

	// 点击左边按钮
	left.onclick = function() {
		// 调用函数动画
		if (flage) {
			idx--
			if (idx < 0) {
				idx = 4
				ul1.style.left = -3000 + 'px'
			}
			// 获取目标值
			let target = idx * -600
			flage = false
			show(ul1, target, app)
			// 这个地方我们还要给小圆点做排他事件
			for (let i = 0; i < yuanLis.length; i++) {
				yuanLis[i].setAttribute('class', '')
			}
			yuanLis[idx].setAttribute('class', 'current')
		}

	}

	// 开启定时器
	let love = setInterval(right.onclick,2000)
	
	// 鼠标移入/鼠标移出
	box.onmousemove = () => {
		btns.style.display = 'block'
		// 鼠标移入  清除定时器
		clearInterval(love)
	}
	box.onmouseout = () => {
		btns.style.display = 'none'
		// 鼠标移出  开启定时器
		love = setInterval(right.onclick,2000)
	}
}
