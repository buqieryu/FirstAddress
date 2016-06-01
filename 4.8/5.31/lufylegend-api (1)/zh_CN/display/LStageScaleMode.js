/** @language chinese
 * 一个 LStageScaleMode 类中指定要使用哪种缩放模式的值。
 * @class LStageScaleMode
 * @constructor
 * @example
 * 	LInit(50, "legend", 240, 240, main);
 * 	function main () {
 * 		LGlobal.align = LStageAlign.BOTTOM_MIDDLE;
 * 		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
 * 		LSystem.screen(LStage.FULL_SCREEN);
 * 		var loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
 * 		loader.load("face.jpg", "bitmapData");
 * 	}
 * 	function loadBitmapdata (event) {
 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
 * 		var bitmap = new LBitmap(bitmapdata);
 * 		addChild(bitmap);
 * 	}
 * @examplelink <p><a href="../../../api/LStageScaleMode/index.html" target="_blank">测试链接</a></p>
 * @since 1.8.0
 * @public
 */
function LStageScaleMode () {throw "LStageScaleMode cannot be instantiated";}
/** @language chinese
 * [静态] 指定整个应用程序在指定区域中可见，但不尝试保持原始高宽比。
 * @property EXACT_FIT
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LStageScaleMode.EXACT_FIT = "exactFit";
/** @language chinese
 * [静态] 指定整个应用程序在指定区域中可见，且不会发生扭曲，同时保持应用程序的原始高宽比。
 * @property SHOW_ALL
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LStageScaleMode.SHOW_ALL = "showAll";
/** @language chinese
 * [静态] 指定整个应用程序填满指定区域，不会发生扭曲，但有可能会进行一些裁切，同时保持应用程序的原始高宽比。
 * @property NO_BORDER
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LStageScaleMode.NO_BORDER = "noBorder";
/** @language chinese
 * [静态] 指定应用程序的大小是固定的，因此，即使在更改播放器窗口大小时，它仍然保持不变。
 * @property NO_SCALE
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LStageScaleMode.NO_SCALE = "noScale";