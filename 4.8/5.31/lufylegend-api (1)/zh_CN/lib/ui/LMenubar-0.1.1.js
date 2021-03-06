/** @language chinese
 * <p>lufylegend.js专用UI，定义包含一个或多个菜单的顶级水平菜单栏</p>
 * <p>使用时需要引进lufylegend.ui-x.x.x.js文件。</p>
 * @class UI:LMenubar
 * @constructor
 * @extends LSprite
 * @param {Array} list 菜单列表，列表的具体格式请看下面的使用举例。
 * @param {Object} style [可选]菜单属性，包含textSize（文字大小），horizontalIndent（水平间隔），verticalIndent（垂直间隔），textColor（文字颜色），lineColor（分割线颜色），backgroundColor（菜单背景颜色），itemBackgroundColor（子菜单背景颜色），selectColor（菜单选中颜色）。
 * @since 0.1.0
 * @examplelink <p><a href="../../../api/ui/LMenubar.html" target="_blank">测试链接</a></p>
 * @public
 */
var LMenubar = (function () {
	function LMenubar (list, style) {
		var s = this;
		LExtends(s, LSprite, []);
		s.type = "LMenubar";
		if (!style) {
			style = {};
		}
		if (!style.textSize) {
			style.textSize = 20;
		}
		if (!style.horizontalIndent) {
			style.horizontalIndent = 10;
		}
		if (!style.verticalIndent) {
			style.verticalIndent = 5;
		}
		if (!style.textColor) {
			style.textColor = "#000000";
		}
		if (!style.lineColor) {
			style.lineColor = "#CCCCCC";
		}
		if (!style.backgroundColor) {
			style.backgroundColor = "#FFFFFF";
		}
		if (!style.itemBackgroundColor) {
			style.itemBackgroundColor = style.backgroundColor;
		}
		if (!style.selectColor) {
			style.selectColor = "#1E90FF";
		}
		s.style = style;
		var back = new LSprite();
		back.graphics.drawRect(0, "#ffffff", [-LGlobal.width, -LGlobal.height, LGlobal.width * 2, LGlobal.height * 2]);
		s.addChild(back);
		s.back = back;
		s.back.root = s;
		s.back.mainMenu = true;
		s.back.background = true;
		s.back.addEventListener(LMouseEvent.MOUSE_UP, function (e) {});
		s.back.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {});
		s.back.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {
			var root = e.clickTarget.root;
			for (var j = 0; j < root.childList.length; j++) {
				if (root.childList[j].mainMenu) {
					if (root.childList[j].background) {
						continue;
					}
					var rW = root.childList[j].getWidth();
					var rH = root.childList[j].getHeight();
					root.childList[j].graphics.clear();
					root.childList[j].graphics.drawRect(0, root.style.lineColor, [0, 0, rW, rH], true, root.style.backgroundColor);
					continue;
				}
				root.childList[j].visible = false;
			}
			root.open = false;
			setTimeout(function () {
				root.back.visible = false;
				root.dispatchEvent(LMenubar.MENU_CLOSE);
			}, 100);
		});
		s.back.visible = false;
		s.setList(s, list, 0, 0, 0);
	}
	/** @language chinese
	 * 菜单栏关闭时调用此事件。
	 * @event LMenubar.MENU_CLOSE
	 * @since 0.1.0
	*/
	LMenubar.MENU_CLOSE = "menu_close";
	LMenubar.prototype.openMainMenu = function (index) {
		var self = this;
		self.mousedown({clickTarget : self.getChildAt(index + 1)});
	};
	LMenubar.prototype.mousedown = function (e) {
		var target = e.clickTarget;
		var root = target.root;
		if (target.mainMenu) {
			if (root.open) {
				return;
			}
			root.open = true;
			root.back.visible = true;
			root.select = target;
			var sW = target.getWidth();
			var sH = target.getHeight();
			target.graphics.clear();
			target.graphics.drawRect(0, root.style.selectColor, [0, 0, sW, sH], true, root.style.selectColor);
			if (target.menuList && target.menuList.length) {
				for (var j = 0; j < target.menuList.length; j++) {
					target.menuList[j].visible = true;
					target.menuList[j].graphics.clear();
					target.menuList[j].graphics.drawRect(1, root.style.lineColor, [0, 0, target.childWidth, target.childHeight], true, root.style.itemBackgroundColor);
					if (target.menuList[j].arrow) {
						target.menuList[j].arrow.x = target.childWidth - root.style.horizontalIndent * 2;
					}
				}
			}
			return;
		}
		if (!target.menuList) {
			if (target.click) {
				target.click({target : root});
				root.open = false;
				setTimeout(function () {
					root.back.visible = false;
				}, 100);
			}
			for (var j = 0; j < root.childList.length; j++) {
				if (root.childList[j].mainMenu) {
					continue;
				}
				root.childList[j].visible = false;
			}
		}
	};
	LMenubar.prototype.mousemove = function (e) {
		var target = e.clickTarget;
		var root = target.root;
		if (!root.open) {
			return;
		}
		if (root.select && root.select.objectIndex == target.objectIndex) {
			return;
		}
		if (root.select) {
			var rW = root.select.getWidth();
			var rH = root.select.getHeight();
			root.select.graphics.clear();
			root.select.graphics.drawRect(root.select.mainMenu ? 0 : 1, root.style.lineColor, [0, 0, rW, rH], true, root.select.mainMenu ? root.style.backgroundColor : root.style.itemBackgroundColor);
		}
		var sW = target.getWidth();
		var sH = target.getHeight();
		target.graphics.clear();
		target.graphics.drawRect(0, root.style.selectColor, [0, 0, sW, sH], true, root.style.selectColor);
		if (target.mainMenu) {
			for (var j = 0; j < root.childList.length; j++) {
				if (root.childList[j].mainMenu) {
					continue;
				}
				root.childList[j].visible = false;
			}
		} else if (root.select.depth == target.depth) {
			if (root.select.menuList && root.select.menuList.length) {
				for (var j = 0; j < root.select.menuList.length; j++) {
					root.select.menuList[j].visible = false;
				}
			}
		} else if (root.select.depth > target.depth) {
			if (root.select.upper.menuList && root.select.upper.menuList.length) {
				for (var j = 0; j < root.select.upper.menuList.length; j++){
					root.select.upper.menuList[j].visible = false;
				}
			}
		}
		if (target.menuList && target.menuList.length) {
			for (var j = 0; j < target.menuList.length; j++) {
				target.menuList[j].visible = true;
				target.menuList[j].graphics.clear();
				target.menuList[j].graphics.drawRect(1, root.style.lineColor, [0, 0, target.childWidth, target.childHeight], true, target.menuList[j].mainMenu ? root.style.backgroundColor : root.style.itemBackgroundColor);
				if (!target.mainMenu) {
					target.menuList[j].x = target.x + target.getWidth();
				}
				if (target.menuList[j].arrow) {
					target.menuList[j].arrow.x = target.childWidth - root.style.horizontalIndent * 2;
				}
			}
		}
		root.select = target;
	};
	LMenubar.prototype.mainMenuHide = function (value) {
		var self = this;
		for (var j = 0; j < self.childList.length; j++) {
			if (self.childList[j].mainMenu) {
				self.childList[j].visible = false;
			}
		}
	};
	LMenubar.prototype.setList = function (layer, list, depth, sx, sy) {
		var s = this, w = 0, h = 0, menuList = [];
		layer.childWidth = 0;
		layer.childHeight = 0;
		for (var i = 0; i < list.length; i++) {
			var child = list[i];
			var menu = new LSprite();
			menu.depth = depth;
			menuList.push(menu);
			var label = new LTextField();
			menu.root = s;
			menu.upper = layer;
			menu.click = child.click;
			label.size = s.style.textSize;
			label.color = s.style.textColor;
			label.text = child.label;
			label.x = s.style.horizontalIndent;
			label.y = s.style.verticalIndent;
			menu.addChild(label);
			menu.graphics.drawRect(0, s.style.backgroundColor, [0, 0, label.getWidth() + s.style.horizontalIndent * 2, label.getHeight() + s.style.verticalIndent * 2], true, s.style.backgroundColor);
			menu.addEventListener(LMouseEvent.MOUSE_DOWN, s.mousedown);
			menu.addEventListener(LMouseEvent.MOUSE_MOVE, s.mousemove);
			if(LGlobal.mobile){
				menu.addEventListener(LMouseEvent.MOUSE_DOWN, s.mousemove);
			}
			if (s.objectIndex == layer.objectIndex) {
				menu.x = w + sx;
				menu.y = 0 + sy;
				menu.mainMenu = true;
				w += label.getWidth() + s.style.horizontalIndent * 2;
				h = label.getHeight() + s.style.verticalIndent * 2;
				if (layer.childWidth < label.getWidth() + s.style.horizontalIndent * 2) {
					layer.childWidth = label.getWidth() + s.style.horizontalIndent * 2;
				}
				if (layer.childHeight < label.getHeight() + s.style.verticalIndent * 2) {
					layer.childHeight = label.getHeight() + s.style.verticalIndent * 2;
				}
			} else {
				menu.x = 0 + sx;
				menu.y = h + sy;
				w = w > label.getWidth() + s.style.horizontalIndent * 4 ? w : label.getWidth() + s.style.horizontalIndent * 4;
				h += label.getHeight() + s.style.verticalIndent * 2;
				if (layer.childWidth < label.getWidth() + s.style.horizontalIndent * 4) {
					layer.childWidth = label.getWidth() + s.style.horizontalIndent * 4;
				}
				if (layer.childHeight < label.getHeight() + s.style.verticalIndent * 2) {
					layer.childHeight = label.getHeight() + s.style.verticalIndent * 2;
				}
			}
			s.addChild(menu);
			if (child.list && child.list.length > 0) {
				if (s.objectIndex == layer.objectIndex) {
					s.setList(menu, child.list, depth + 1, menu.x, menu.y + menu.getHeight());
				} else {
					var arrow = new LSprite();
					menu.arrow = arrow;
					menu.addChild(arrow);
					arrow.x = label.getWidth() + s.style.horizontalIndent * 2;
					arrow.y = label.y;
					arrow.graphics.drawVertices(0, s.style.textColor, [[0, 0], [0, label.getHeight()], [s.style.horizontalIndent, label.getHeight() * 0.5]], true, s.style.textColor);
					s.setList(menu, child.list, depth + 1, menu.x + menu.getWidth() + s.style.horizontalIndent * 2, menu.y);
				}
			}
			if (s.objectIndex != layer.objectIndex) {
				menu.visible = false;
			}
		}
		layer.menuList = menuList;
	};
	return LMenubar;
})();