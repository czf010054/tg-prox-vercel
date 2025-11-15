export default async function handler(req, res){
    if(req.method!=='POST'){
        return res.status(405).json({error:'Method not allowed'});
    }
    
    const{ token, chat_id, text } = req.body;
    if(!token || !chat_id || !text){
        return res.status(400).json({error:'Missing params'});
    }
    
    const telegramUrl = 'https://api.telegram.org/bot8414705385:AAErU7Q0p6IoGq596dSX-hjMAd-qv5HY5VQ/sendMessage';
    const response =awaitfetch(telegramUrl,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ chat_id, text })
    });
    
    const data =await response.json();
    res.status(200).json(data);
 }