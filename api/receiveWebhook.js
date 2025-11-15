export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const update = req.body;

    console.log("收到 Telegram Webhook：", update);

    // 提取消息内容
    const message = update?.message;
    const text = message?.text;
    const chatId = message?.chat?.id;

    // 如果消息不符合结构
    if (!text || !chatId) {
        return res.status(200).json({ ok: true, info: "No message to process" });
    }

    // 在这里你可以将消息发送给 n8n 或直接回复

    // 示例：直接自动回复用户
    const token = process.env.TELEGRAM_BOT_TOKEN; // 建议存在环境变量中
    const replyUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    await fetch(replyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: `你刚刚说了：${text}`
        })
    });

    return res.status(200).json({ ok: true });
}