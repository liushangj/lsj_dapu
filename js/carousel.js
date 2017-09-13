/*
options = {
	imgs : [
		{src:"1.jpg", href:""},
		{src:"2.jpg", href:""},
		{src:"3.jpg", href:""}
	]
}
*/

function Carousel(options) {
	options = options || {};
	this.imgs = options.imgs;
	this.container = options.container;
	this.width = options.width;
	this.height = options.height;
	this.imgBoxes = []; // 存放所有 li 的元素
	this.circles = null; // 存放所有小圆点的元素
	this.currentIndex = 0;
	this.nextIndex = 1;
	this.timer = null; // 计时器id

	this.init();
}

Carousel.prototype = {
	constructor : Carousel,
	init : function(){
		/* 创建轮播图外层的节点 */
		var _container = document.createElement("div");
		_container.className = "carousel_container";
		// 设置 _container 样式
		$(_container).css({
            width : this.width + "px",
            height : this.height + "px"
		});
		/*css(_container, {
			width : this.width + "px",
			height : this.height + "px"
		})*/
		/* 放置轮播图片的 ul */
		var _ul = document.createElement("ul");
		// 设置 _ul样式
		$(_ul).css({
            width : this.width + "px",
            height : this.height + "px"
		});
		/*css(_ul, {
			width : this.width + "px",
			height : this.height + "px"
		});*/
		// 创建 li
		for (var i = 0, len = this.imgs.length; i < len; i++) {
			var _img = this.imgs[i];
			var _li = document.createElement("li");
			_li.innerHTML = "<a href='"+ _img.href +"' target='_blank'><img src='"+ _img.src +"'></a>";
			if (i === 0)
			    $(_li).show();
				/*show(_li);*/
			_ul.appendChild(_li);
			// 将当前创建 li 元素保存到 imgBoxes 数组中
			this.imgBoxes.push(_li);
		}
		_container.appendChild(_ul);
		/* 小圆点 */
		var _pages = document.createElement("div");
		_pages.className = "pages";
		$(_pages).css({
            width:this.width+"px"
        });
		/*css(_pages, {width:this.width+"px"});*/
		for (var i = 0; i < len; i++) {
			_pages.innerHTML += "<div class='"+ (i===0?"current":"") +"'></div>";
		}
		this.circles = $("div", _pages); // 保存所有小圆点到对象属性中
		_container.appendChild(_pages);
		/* 上一页、下一页 */
		var _prev = document.createElement("div");
		_prev.className = "prev";
		_prev.innerText = "<";
		var _next = document.createElement("div");
		_next.className = "next";
		_next.innerText = ">";
		_container.appendChild(_prev);
		_container.appendChild(_next);

		/* 将当前轮播图的布局结构添加到页面容器中 */
		/*this.container.appendChild(_container);*/
        $(this.container).append(_container);

		/* 自动轮播 */
		var cb = this.move.bind(this);
		this.timer = setInterval(cb, 3000);

		/* 移入/移出容器，停止/启动自动轮播 */

		/*on(_container, "mouseenter", ()=>{
			this.over();
		})*/
		$(_container).on("mouseenter", ()=> {
            this.over();
        })
		/*on(_container, "mouseleave", ()=>{
			this.out();
		})*/
		$(_container).on("mouseleave",()=> {
            this.out();
        })
		/* 小圆点切换，事件委派 */
		/*on(_pages, "click", (e) => {
			e = e || event;
			// 获取事件源对象
			var src = e.target || e.srcElement;
			// 判断
			if (src !== _pages) {
				// 获取当前点击小圆点的索引
				var index = inArray(src, Array.from(this.circles))
				if (this.currentIndex !== index) {
					this.nextIndex = index;
					this.move();
				}
			}
		});*/
		$(_pages).on("mouseover",(e)=>{
            e = e || event;
        // 获取事件源对象
        var src = e.target || e.srcElement;
        // 判断
        if (src !== _pages) {
            // 获取当前点击小圆点的索引
            /*var index = inArray(src, Array.from(this.circles));*/
            var index = $(this.circles).index(src);
            if (this.currentIndex !== index) {
                this.nextIndex = index;
                this.move();
            }
        }
        });
		/* 上/下一页切换 */
		/*on(_prev, "click", () => {
			this.nextIndex = this.currentIndex - 1;
			if (this.nextIndex < 0)
				this.nextIndex = this.imgBoxes.length - 1;
			this.move();
		});
		on(_next, "click", () => {
			this.move();
		});*/
		$(_prev).on("click",()=>{
            this.nextIndex = this.currentIndex - 1;
        if (this.nextIndex < 0)
            this.nextIndex = this.imgBoxes.length - 1;
        this.move();
        });
		$(_next).on("click",()=>{
            this.move();
        })
	},
	move : function(){ // 轮播切换的函数
		// 当前显示图片淡出
		/*fadeOut(this.imgBoxes[this.currentIndex], 600);*/
		$(this.imgBoxes[this.currentIndex]).fadeOut(600);
		// 即将显示图片淡入
		/*fadeIn(this.imgBoxes[this.nextIndex], 600);*/
		$(this.imgBoxes[this.nextIndex]).fadeIn(600);
		// 当前显示红色背景样式小圆点去掉样式
		this.circles[this.currentIndex].className = "";
		// 即将显示红色背景样式小圆点设置样式
		this.circles[this.nextIndex].className = "current";

		// 修改currentIndex与nextIndex的值
		this.currentIndex = this.nextIndex;
		this.nextIndex++;
		if (this.nextIndex >= this.imgBoxes.length)
			this.nextIndex = 0;
	},
	over : function(){
		clearInterval(this.timer);
	},
	out : function(){
		this.timer = setInterval(this.move.bind(this), 3000);
	}
}