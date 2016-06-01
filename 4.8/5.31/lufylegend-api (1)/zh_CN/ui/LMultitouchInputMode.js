/** @language chinese
 * LMultitouchInputMode 类提供 LMultitouch 类的 inputMode 属性值。这些值设置用户与启用触屏的设备交互时canvas运行时调度的接触事件类型。
 * @class LMultitouchInputMode
 * @constructor
 * @since 1.8.9
 * @public
 */
var LMultitouchInputMode = function () {throw "LMultitouchInputMode cannot be instantiated";};
/** @language chinese
 * [静态] 指定将用户触摸启用触摸设备的所有行为解释为鼠标事件类型。
 * @property NONE
 * @type String
 * @static
 * @since 1.8.9
 * @public
 */
LMultitouchInputMode.NONE = "none";
LMultitouchInputMode.GESTURE = "gesture";
/** @language chinese
 * [静态] 指定仅为基本触摸事件调度事件，如单个手指点击。
 * @property TOUCH_POINT
 * @type String
 * @static
 * @since 1.8.9
 * @public
 */
LMultitouchInputMode.TOUCH_POINT = "touchPoint";