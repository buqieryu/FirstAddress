/** @language chinese
 * LStageAlign 类提供了舞台的对其方式。
 * @class LStageAlign
 * @constructor
 * @example
 * 	LInit(50, "legend", 240, 240, main);
 * 	function main () {
 * 		LGlobal.align = LStageAlign.BOTTOM_MIDDLE;
 * 		LGlobal.stageScale = LStageScaleMode.NO_SCALE;
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
 * @examplelink <p><a href="../../../api/LStageAlign/index.html" target="_blank">测试链接</a></p>
 * @since 1.8.6
 * @public
 */
function LStageAlign(){throw "LStageAlign cannot be instantiated";}
/** @language chinese
 * [静态] 指定舞台靠顶部对齐。
 * @property TOP
 * @type String
 * @static
 * @since 1.8.6
 * @public
 */
LStageAlign.TOP = "T";
/** @language chinese
 * [静态] 指定舞台靠顶部对齐。
 * @property BOTTOM
 * @type String
 * @static
 * @since 1.8.6
 * @public
 */
LStageAlign.BOTTOM = "B";
/** @language chinese
 * [静态] 指定舞台靠左对齐。
 * @property LEFT
 * @type String
 * @static
 * @since 1.8.6
 * @public
 */
LStageAlign.LEFT = "L";
/** @language chinese
 * [静态] 指定舞台靠右对齐。
 * @property RIGHT
 * @type String
 * @static
 * @since 1.8.6
 * @public
 */
LStageAlign.RIGHT = "Re";
/** @language chinese
 * [静态] 指定舞台靠左上角对齐
 * @property TOP_LEFT
 * @type String
 * @static
 * @since 1.8.6
 * @public
 */
LStageAlign.TOP_LEFT = "TL";
/** @language chinese
 * [静态] 指定舞台靠右上角对齐。
 * @property TOP_RIGHT
 * @type String
 * @static
 * @since 1.8.6
 * @public
 */
LStageAlign.TOP_RIGHT = "TR";
/** @language chinese
 * [静态] 指定舞台靠中上对齐。
 * @property TOP_MIDDLE
 * @type String
 * @static
 * @since 1.8.6
 * @public
 */
LStageAlign.TOP_MIDDLE = "TM";
/** @language chinese
 * [静态] 指定舞台靠左下角对齐。
 * @property BOTTOM_LEFT
 * @type String
 * @static
 * @since 1.8.6
 * @public
 */
LStageAlign.BOTTOM_LEFT = "BL";
/** @language chinese
 * [静态] 指定舞台靠右下角对齐。
 * @property BOTTOM_RIGHT
 * @type String
 * @static
 * @since 1.8.6
 * @public
 */
LStageAlign.BOTTOM_RIGHT = "BR";
/** @language chinese
 * [静态] 指定舞台靠中右对齐。
 * @property BOTTOM_MIDDLE
 * @type String
 * @static
 * @since 1.8.6
 * @public
 */
LStageAlign.BOTTOM_MIDDLE = "BM";
/** @language chinese
 * [静态] 指定舞台靠中间对齐。
 * @property MIDDLE
 * @type String
 * @static
 * @since 1.8.6
 * @public
 */
LStageAlign.MIDDLE = "M";