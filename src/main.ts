import "dotenv/config";
import { TaskScheduler } from "./TaskScheduler";
import logger from "@/utils/logger";
import { aliyundriveRun } from "@/scripts/aliyundrive";
import { juejinRun } from "@/scripts/juejin";
import { koudaiRun } from "@/scripts/koudai";

logger.info("🚀签到系统启动,等待任务执行");

const taskScheduler = TaskScheduler.getInstance();

// 每天1:00,2:00执行 -> "0 1,2 * * *"
taskScheduler.scheduleTask(aliyundriveRun, "0 1,2 * * *");

// 每天6:00,7:00执行 -> "0 6,7 * * *"
taskScheduler.scheduleTask(koudaiRun, "0 6,7 * * *");

// 每天8:00,9:00执行 -> "0 8,9 * * *"
taskScheduler.scheduleTask(juejinRun, "0 8,9 * * *");
