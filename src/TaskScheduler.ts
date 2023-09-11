import schedule from "node-schedule";
import logger from "@/utils/logger";
import { getCurrentTime } from "@/utils";

type taskFn = () => Promise<void | boolean>
type scheduleRuleType =
    string
    | number
    | schedule.RecurrenceRule
    | schedule.RecurrenceSpecDateRange
    | schedule.RecurrenceSpecObjLit
    | Date

let instance: TaskScheduler | null = null;

export class TaskScheduler {
    private jobs: schedule.Job[] | undefined;

    constructor() {
        if (!instance) {
            instance = this;
            this.jobs = [];
        }
        return instance;
    }

    // 添加任务
    scheduleTask(task: taskFn, scheduleRule: scheduleRuleType = new Date(Date.now() + 1000)) {
        let index = this.jobs?.length;
        const job = schedule.scheduleJob(scheduleRule, async () => {
            await this.executeTask(task, index);
        });

        this.jobs?.push(job);
    }


    // 执行任务
    private async executeTask(task: taskFn, index: number = 0) {
        logger.warn(`---任务${index}开始执行: ${getCurrentTime()}---`);
        try {
            await task();
        } catch (e) {
            logger.error("Task execution failed:", e);
        }
        logger.warn(`---任务${index}执行结束: ${getCurrentTime()}---\n`);
    }

    // 开始所有任务
    start() {
        this.jobs?.forEach(job => {
            job?.invoke();
        });
    }

    // 取消所有任务
    cancelAllTasks() {
        this.jobs?.forEach(job => {
            job.cancel();
        });

        this.jobs = [];
    }
}