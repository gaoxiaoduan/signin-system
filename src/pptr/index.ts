import puppeteer, { Page } from "puppeteer";
import logger from "@/utils/logger";
import { puppeteerUserDataDir, USER_AGENT } from "@/config";

export interface IRunPuppeteerTasks {
    taskName: string; // 任务名
    url?: string; // 地址
    taskFn: (page: Page) => Promise<void>; // 任务函数
}

export const runPuppeteer = async (tasks: IRunPuppeteerTasks[], isClose: boolean = true) => {
    logger.info("启动puppeteer...");
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--no-sandbox"],
        userDataDir: puppeteerUserDataDir,
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1200,
        height: 1080,
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false
    });
    page.setDefaultTimeout(1000 * 60 * 5);

    USER_AGENT && await page.setUserAgent(USER_AGENT);

    for (const task of tasks) {
        const {taskName, url, taskFn} = task;
        logger.info(`开始执行任务：${taskName}`);
        url && await page.goto(url);
        await taskFn(page);
    }

    isClose && await browser.close();
};