/** @language chinese
 * 用指定的颜色通道值和 Alpha 值为显示对象创建 LColorTransform 对象。
 * 可使用 LColorTransform 类调整显示对象的颜色值。可以将颜色调整或颜色转换应用于所有四种通道：红色、绿色、蓝色和 Alpha 透明度。
 * 当 LColorTransform 对象应用于显示对象时，将按如下方法为每个颜色通道计算新值：
 * ・新红色值 = (旧红色值 * redMultiplier) + redOffset
 * ・新绿色值 = (旧绿色值 * greenMultiplier) + greenOffset
 * ・新蓝色值 = (旧蓝色值 * blueMultiplier) + blueOffset
 * ・新 Alpha 值 = (旧 Alpha 值 * alphaMultiplier) + alphaOffset
 * 如果计算后任何一个颜色通道值大于 255，则该值将被设置为 255。如果该值小于 0，它将被设置为 0。
 * 可以通过下列方式使用 LColorTransform 对象：
 * ・在 LBitmapData 类的 colorTransform() 方法的 colorTransform 参数中
 * @class LColorTransform
 * @extends LObject
 * @constructor
 * @param {float} redMultiplier 红色乘数的值，在 0 到 1 范围内。
 * @param {float} greenMultiplier 绿色乘数的值，在 0 到 1 范围内。
 * @param {float} blueMultiplier 蓝色乘数的值，在 0 到 1 范围内。
 * @param {float} alphaMultiplier Alpha 透明度乘数的值，在 0 到 1 范围内。
 * @param {float} redOffset 红色通道值的偏移量，在 -255 到 255 范围内。
 * @param {float} greenOffset 绿色通道值的偏移量，在 -255 到 255 范围内。
 * @param {float} blueOffset 蓝色通道值的偏移量，在 -255 到 255 范围内。
 * @param {float} alphaOffset Alpha 透明度通道值的偏移量，在 -255 到 255 范围内。
 * @since 1.9.4
 * @public
 */
var LColorTransform = (function () {
	function LColorTransform (redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
		var s = this;
		LExtends (s, LObject, []);
		s.redMultiplier = redMultiplier;
		s.greenMultiplier = greenMultiplier;
		s.blueMultiplier = blueMultiplier;
		s.alphaMultiplier = alphaMultiplier;
		s.redOffset = redOffset;
		s.greenOffset = greenOffset;
		s.blueOffset = blueOffset;
		s.alphaOffset = alphaOffset;
	}
	return LColorTransform;
})();