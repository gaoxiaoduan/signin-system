import { dealy, logger } from "@/utils";

export const run = async () => {
    logger.info("开始执行i茅台任务");
    await dealy(1000);
    logger.info("继续执行i茅台任务...");
};