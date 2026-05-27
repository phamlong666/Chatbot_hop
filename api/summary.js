export default async function handler(req, res) {

    res.setHeader(
        'Access-Control-Allow-Origin',
        '*'
    );

    res.setHeader(
        'Access-Control-Allow-Methods',
        'POST'
    );

    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {

        const { content } = req.body;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({

                    contents: [
                        {
                            parts: [
                                {
                                    text:
`Bạn là AI tạo biên bản cuộc họp.

Hãy tóm tắt ngắn gọn nội dung cuộc họp bằng tiếng Việt chuyên nghiệp

Nội dung cuộc họp:
${content}`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log("GEMINI DATA:", data);

        res.status(200).json(data);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
}