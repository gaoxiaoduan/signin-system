export * as logger from "./logger";


/**
 * 延迟函数
 *
 * @param {number} ms - 延迟执行的毫秒数。
 * @returns {Promise} - 在指定延迟后解析的 Promise。
 */
export const dealy = (ms: number): Promise<any> => new Promise((resolve) => setTimeout(resolve, ms));