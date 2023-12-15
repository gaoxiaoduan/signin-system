import { request } from "@/request";

const url = "https://www.koudaizy.com/wp-admin/admin-ajax.php";

/**
 * 签到
 */
export const singIn = async (cookie: string) => {
    return request(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "cookie": cookie,
            "Referer": "https://www.koudaizy.com/user/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        body: "action=user_qiandao&nonce=a013bb76a1",
    });
};