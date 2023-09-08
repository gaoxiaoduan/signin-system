import logger from "@/utils/logger";

export const run = async () => {
    logger.info("开始执行阿里云盘任务");
    throw new Error("阿里云盘任务执行失败");
};