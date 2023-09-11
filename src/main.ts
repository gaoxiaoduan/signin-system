import "dotenv/config";
import { TaskScheduler } from "./TaskScheduler";
import logger from "@/utils/logger";

import { run as aliyundriveRun } from "@/scripts/aliyundrive";
import { run as juejinRun } from "@/scripts/juejin";

// import { run as imaotaiRun } from "@/scripts/imaotai";

logger.info("🚀签到系统启动,等待任务执行");

const taskScheduler = new TaskScheduler();


// 每天9:30执行 -> "30 9 * * *"
taskScheduler.scheduleTask(aliyundriveRun, "30 9 * * *");

// 每天9:00执行 -> "0 9 * * *"
taskScheduler.scheduleTask(juejinRun, "0 9 * * *");

// taskScheduler.scheduleTask(imaotaiRun);