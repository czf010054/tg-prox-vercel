export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, chat_id, text, parse_mode } = req.body;
  if (!token || !chat_id || !text) {
    return res.status(400).json({ error: 'Missing params' });
  }

  const body = { chat_id, text };
  if (parse_mode) {
    body.parse_mode = parse_mode; // 只有传入时才加
  }

  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
  const response = await fetch(telegramUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  res.status(200).json(data);
}