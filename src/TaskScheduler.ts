import schedule from "node-schedule";
import logger from "@/utils/logger";

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

    getCurrentTimeRule() {
        const date = new Date();
        const seconds = date.getSeconds();
        const minutes = date.getMinutes();
        const hours = date.getHours();
        // 每天的几点几分几秒执行
        return `${seconds} ${minutes} ${hours} * * *`;
    }

    // 添加任务
    scheduleTask(task: taskFn, scheduleRule: scheduleRuleType = this.getCurrentTimeRule()) {
        const job = schedule.scheduleJob(scheduleRule, async () => {
            await this.executeTask(task);
        });

        this.jobs?.push(job);
    }


    // 执行任务
    private async executeTask(task: taskFn) {
        try {
            await task();
        } catch (e) {
            logger.error("Task execution failed:", e);
        }
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