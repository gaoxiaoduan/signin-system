import { IRunPuppeteerTasks, runPuppeteer } from "@/pptr";
import { singIn } from "./pptr/singIn";


const tasks: IRunPuppeteerTasks[] = [
    {
        taskName: "掘金签到任务",
        taskFn: singIn
    },
];

export const juejinRun = async () => {
    await runPuppeteer(tasks);
};