import { TaskScheduler } from "./TaskScheduler";
import { run as aliyundriveRun } from "./aliyundrive";
// import { run as imaotaiRun } from "./imaotai";

const taskScheduler = new TaskScheduler();

// 每天9:30执行
taskScheduler.scheduleTask(aliyundriveRun, "30 9 * * *");


// taskScheduler.scheduleTask(imaotaiRun);

taskScheduler.start();