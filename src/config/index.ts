import path from "path";

// puppeteer用户数据目录
export const puppeteerUserDataDir = "puppeteer/user/data";

// 浏览器UA
export const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36";

// 登录cookie
export const COOKIE_PATH = {
    juejin: path.resolve("./cookies/juejin.json"),
};