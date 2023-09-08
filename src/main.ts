import { TaskScheduler } from "./TaskScheduler";
import { run as aliyundriveRun } from "./aliyundrive";
import { run as imaotaiRun } from "./imaotai";

const taskScheduler = new TaskScheduler();

taskScheduler.scheduleTask(aliyundriveRun);
taskScheduler.scheduleTask(imaotaiRun);

taskScheduler.start();