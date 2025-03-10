import nodemailer, {SentMessageInfo} from "nodemailer";

import getDataBasePoolConfig from "../../config"
import {index, emailVerificationTimeout,} from "../../utils/Email";
import {ReturnType} from "../../../types";

export async function sendEmail(email: string, message: string): Promise<ReturnType> {
    console.log(email);
    if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) return {
        success: false,
        message: '请输入正确的邮箱！'
    };

    if (emailVerificationTimeout.indexOf(email) !== -1) return {success: false, message: '请勿重复发送邮件！'};
    const config: any = await getDataBasePoolConfig();

    const html: string = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h1 style="color: #007BFF;">狄思可(Dylan)</h1>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333;">验证码</h2>
            <p style="font-size: 18px; color: #007BFF;">你的验证码是：<strong><h2>${message}</h2></strong></p>
            <p style="color: #666;">请确保在输入验证码时不要包含空格。</p>
            <p style="color: #666;">如果你没有请求验证码，请忽略此邮件。</p>
        </div>
    </div>`;

    const MailOptionsConfig: any = config['email']['options'];

    // 邮件内容
    const mailOptions = {
        from: MailOptionsConfig.from,
        to: email,
        subject: MailOptionsConfig.subject,
        text: MailOptionsConfig.text + message,
        html: html
    };

    // 发送邮件
    try {
        const transporter = nodemailer.createTransport(config['email']['server']);
        const info: SentMessageInfo = await transporter.sendMail(mailOptions);
        if (info.accepted.length > 0) {
            index(email, message)
            return {success: true, message: '邮件发送成功！请注意查收！'};
        } else return {success: false, message: '邮件发送失败,请稍后重试。'};
    } catch (error) {
        console.log(error);
        return {success: false, message: '邮件发送失败,产生错误 请联系客服！'};
    }
}
