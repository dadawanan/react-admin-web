/**手机号正则表达式 */
export const  regPhone=/^1[34578]\d{9}$/

/**账号 */
export const  regAccount=/^[a-zA-Z0-9@._]{1,50}$/

/**姓名 */
export const  regNameCn=/^[\u4e00-\u9fa5a-zA-Z. ]{1,50}$/

/**英文名 */
export const  regNameEn=/^[a-zA-Z. ]{1,50}$/

/**密码 */
export const  regPassword=/^[^\s]{4,50}$/

/**名称 */
export const  regName=/^[\u4e00-\u9fa5a-zA-Z0-9. ]{1,50}$/

/**编码 */
export const  regCode=/^[a-zA-Z_0-9]{1,50}$/

/**标题 */
export const  regTitle=/^[\u4e00-\u9fa5\S]{1,50}$/