import fs from "fs";
import { Page } from "puppeteer";
import { COOKIE_PATH } from "@/config";
import logger from "@/utils/logger";
import { dealy } from "@/utils";

export const singIn = async (page: Page) => {
    if (!fs.existsSync(COOKIE_PATH.juejin)) {
        return logger.warn("掘金cookie文件不存在，请检查后再尝试");
    }

    const lastCookieString = fs.readFileSync(COOKIE_PATH.juejin);
    if (lastCookieString.length !== 0) {
        const cookies = JSON.parse(lastCookieString.toString());
        await page.setCookie(...cookies);
        logger.info("掘金cookie设置成功");
    }

    await page.goto("https://juejin.cn/user/center/signin", {
        waitUntil: ["load", "domcontentloaded", "networkidle0"]
    });

    const singBtn = await page.waitForSelector("div.code-calender");
    const singBtnText = await singBtn?.evaluate(node => node.textContent);
    if (singBtnText?.includes("已签到")) {
        return logger.warn("掘金今日已签到，无需重复签到");
    }

    // 点击签到
    await singBtn?.hover();
    await singBtn?.click();

    await dealy(1000 * 5);
    // 获取的矿石奖励
    const reward = await page.waitForSelector(".figure-text");
    const rewardText = await reward?.evaluate(node => node.textContent);
    if (!parseInt(rewardText!)) return logger.error("签到失败，未获取到矿石奖励信息");
    logger.info(`掘金签到成功，获得矿石：${rewardText}`);

    await dealy(1000 * 5);
    // 点击去抽奖按钮,进入抽奖界面
    const goLotteryBtn = await page.waitForSelector(".btn-area > .btn");
    await goLotteryBtn?.click();

    await dealy(1000 * 5);
    // 点击免费抽奖按钮
    const freeBtn = await page.waitForSelector(".text.text-free");
    await freeBtn?.click();

    await dealy(1000 * 5);
    const lottery = await page.waitForSelector(".wrapper > .title");
    const lotteryText = await lottery?.evaluate(node => node.textContent);
    if (!lotteryText) return logger.error("签到失败，未获取到抽奖信息");
    logger.info(`免费抽奖成功：${lotteryText}`);

    // 关闭抽奖弹窗
    const closeBtn = await page.waitForSelector(".wrapper > .submit");
    await closeBtn?.click();

    // 点击沾喜气
    const stickBtn = await page.waitForSelector("#stick-txt-1");
    await stickBtn?.click();
    await dealy(1000 * 5);

    const grandValue = await page.waitForSelector(".grand-val");
    const grandValueText = await grandValue?.evaluate(node => node.textContent);
    if (!grandValueText) return logger.error("签到失败，未获取到沾喜气信息");
    logger.info(`沾喜气成功：${grandValueText}点幸运值`);

    await page.click(".btn.btn-single.btn-submit");

    // 矿石
    const mineralValue = await page.waitForSelector(".value");
    const mineralValueText = await mineralValue?.evaluate(node => node.textContent);
    // 当前幸运值
    const currentValue = await page.waitForSelector(".current-value");
    const currentValueText = await currentValue?.evaluate(node => node.textContent);

    logger.warn(`今日收获如下：
矿石：${rewardText}
抽奖：${lotteryText}
幸运值：${grandValueText}
------------
当前矿石：${mineralValueText?.trim()}，当前幸运值：${currentValueText}
`);

    try {
        const cookies = await page.cookies();
        const cookiesString = JSON.stringify(cookies);
        fs.writeFileSync(COOKIE_PATH.juejin, cookiesString);
    } catch (e) {
        logger.error("掘金cookie写入失败:", e);
    }
};