import "dotenv/config";
import { TaskScheduler } from "./TaskScheduler";
import { run as aliyundriveRun } from "./aliyundrive";
import logger from "@/utils/logger";
// import { run as imaotaiRun } from "./imaotai";

logger.info("🚀签到系统启动,等待任务执行");

const taskScheduler = new TaskScheduler();


// 每天9:30执行
// "30 9 * * *"
taskScheduler.scheduleTask(aliyundriveRun, "30 9 * * *");


// taskScheduler.scheduleTask(imaotaiRun);