import { postRequest } from "@/request";
import logger from "@/utils/logger";

// 更新token地址
const updateTokenURL = "https://auth.aliyundrive.com/v2/account/token";

// 获取签到信息地址
const signInURL =
    "https://member.aliyundrive.com/v1/activity/sign_in_list?_rx-s=mobile";

// 获取奖励地址
const rewardURL =
    "https://member.aliyundrive.com/v1/activity/sign_in_reward?_rx-s=mobile";

// 更新token
export const updateToken = async () => {
    const params = {
        grant_type: "refresh_token",
        refresh_token: process.env.refreshToken,
    };
    const res = await postRequest(updateTokenURL, params);
    const {code, message, nick_name, refresh_token, access_token} = res;
    if (code) {
        if (code === "RefreshTokenExpired" ||
            code === "InvalidParameter.RefreshToken") {
            logger.error("refreshToken已过期，请重新获取");
        } else {
            logger.info(message);
        }
    }
    return {nick_name, refresh_token, access_token};
};

// 签到列表
export const signInList = async (access_token: string, nick_name: string) => {
    const res = await postRequest(signInURL, {
        isReward: false
    }, {
        headers: {
            "Authorization": access_token,
            "Content-Type": "application/json"
        }
    });

    if (!res.success) {
        logger.error("签到失败：", res.message);
        return false;
    }

    logger.info(`[${nick_name}]:签到成功`);

    const {signInLogs, signInCount} = res.result;
    const currentSignInfo = signInLogs[signInCount - 1]; // 当天签到信息
    logger.info(`本月累计签到${signInCount}天`);


    // 未领取奖励列表
    const rewards: any[] = signInLogs.filter(
        (item: any) => item.status === "normal" && !item.isReward
    );

    if (rewards.length) {
        for await (const reward of rewards) {
            const signInDay = reward.day;
            const rewardInfo = await getReward(access_token, signInDay);
            logger.info(`第${signInDay}天奖励领取成功: 获得${rewardInfo.name || ""}${
                rewardInfo.description || ""
            }`);

        }
    } else if (currentSignInfo.isReward) {
        logger.info(`今日签到获得${currentSignInfo.reward.name || ""}${
            currentSignInfo.reward.description || ""
        }`);
    }
};

// 获取奖励
const getReward = async (access_token: string, signInDay: number) => {
    return await postRequest(rewardURL, {
        signInDay
    }, {
        headers: {
            "Authorization": access_token,
            "Content-Type": "application/json"
        }
    });
};