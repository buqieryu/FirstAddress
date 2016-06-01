/** @language chinese
 * 提供混合模式可视效果的常量值的类。
 * @class LBlendMode
 * @constructor
 * @example
 * 	var imgLayer = new LSprite();
 * 	var back = new LBitmap(new LBitmapData(dataList["back"]));
 * 	imgLayer.addChild(back);
 * 	var img = new LBitmap(new LBitmapData(dataList["img"]));
 * 	imgLayer.addChild(img);
 * 	img.blendMode = LBlendMode.LIGHTER;
 * @examplelink <p><a href="../../../api/LBlendMode/index.html" target="_blank">测试链接</a></p>
 * @since 1.8.0
 * @public
 */
function LBlendMode () {throw "LBlendMode cannot be instantiated";}
/** @language chinese
 * [静态] 新图形绘制于已有图形的顶部。这是默认的行为。
 * @property SOURCE_OVER
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.SOURCE_OVER = "source-over";
/** @language chinese
 * [静态] 只有在新图形和已有内容重叠的地方，才绘制新图形。
 * @property SOURCE_ATOP
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.SOURCE_ATOP = "source-atop";
/** @language chinese
 * [静态] 在新图形以及已有内容重叠的地方，新图形才绘制。所有其他内容成为透明。
 * @property SOURCE_IN
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.SOURCE_IN = "source-in";
/** @language chinese
 * [静态] 只有在和已有图形不重叠的地方，才绘制新图形。
 * @property SOURCE_OUT
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.SOURCE_OUT = "source-out";
/** @language chinese
 * [静态] 新图形绘制于已有内容的后面。
 * @property DESTINATION_OVER
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.DESTINATION_OVER = "destination-over";
/** @language chinese
 * [静态] 已有的内容只有在它和新的图形重叠的地方保留。新图形绘制于内容之后。
 * @property DESTINATION_ATOP
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.DESTINATION_ATOP = "destination-atop";
/** @language chinese
 * [静态] 在新图形以及已有画布重叠的地方，已有内容都保留。所有其他内容成为透明的。
 * @property DESTINATION_IN
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.DESTINATION_IN = "destination-in";
/** @language chinese
 * [静态] 在已有内容和新图形不重叠的地方，已有内容保留。所有其他内容成为透明。
 * @property DESTINATION_OUT
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.DESTINATION_OUT = "destination-out";
/** @language chinese
 * [静态] 在图形重叠的地方，颜色由两种颜色值的加值来决定。
 * @property LIGHTER
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.LIGHTER = "lighter";
/** @language chinese
 * [静态] 只绘制新图形，删除其他所有内容。
 * @property COPY
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.COPY = "copy";
/** @language chinese
 * [静态] 在重叠和正常绘制的其他地方，图形都成为透明的。
 * @property XOR
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.XOR = "xor";
/** @language chinese
 * [静态] 不使用混合模式。
 * @property NONE
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.NONE = null;
/** @language chinese
 * [静态] 等同于NONE。
 * @property NORMAL
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.NORMAL = null;