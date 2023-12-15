import logger from "@/utils/logger";
import { singIn } from "./api";


export const koudaiRun = async () => {
    logger.info("开始执行口袋资源网签到任务");
    const koudaiCookie = process.env.koudaiCookie;
    if (!koudaiCookie) {
        return logger.warn("没有配置koudaiCookie，无法执行口袋资源网签到任务");
    }

    const {msg} = await singIn(koudaiCookie);
    logger.info(msg);
};