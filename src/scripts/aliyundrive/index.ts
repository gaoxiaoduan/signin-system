import logger from "@/utils/logger";
import { signInList, updateToken } from "@/scripts/aliyundrive/api";

export const run = async () => {
    logger.info("开始执行阿里云盘任务");
    if (!process.env.refreshToken) {
        logger.warn("没有配置refreshToken，无法执行阿里云盘任务");
        return logger.warn(`
1.打开阿里云盘网页版：https://www.aliyundrive.com/drive
2.打开控制台，输入：
console.log(JSON.parse(localStorage.token).refresh_token);
        `);
    }

    const {nick_name, access_token} = await updateToken();
    await signInList(access_token, nick_name);
};