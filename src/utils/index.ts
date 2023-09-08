export * as logger from "./logger";


/**
 * 延迟函数
 *
 * @param {number} ms - 延迟执行的毫秒数。
 * @returns {Promise} - 在指定延迟后解析的 Promise。
 */
export const dealy = (ms: number): Promise<any> => new Promise((resolve) => setTimeout(resolve, ms));


/**
 * 根据指定的格式字符串返回当前时间。
 * 如果未提供格式，则默认格式为 "yyyy-MM-dd hh:mm:ss"。
 *
 * @param {string} [format="yyyy-MM-dd hh:mm:ss"] - 当前时间的格式字符串。
 * @returns {string} 根据指定的格式字符串格式化的当前时间。
 */
export const getCurrentTime = (format: string = "yyyy-MM-dd hh:mm:ss"): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return format
        .replace("yyyy", String(year))
        .replace("MM", month)
        .replace("dd", day)
        .replace("hh", hours)
        .replace("mm", minutes)
        .replace("ss", seconds);
};