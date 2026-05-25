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
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',

                    Authorization:
                        `Bearer ${process.env.OPENAI_API_KEY}`
                },

                body: JSON.stringify({

                    model: 'gpt-4.1-mini',

                    messages: [

                        {
                            role: 'system',

                            content:
`Bạn là AI tạo biên bản cuộc họp.

Hãy trả về đúng format:

TÓM TẮT:
...

CÔNG VIỆC:
...

KẾT LUẬN:
...`
                        },

                        {
                            role: 'user',
                            content
                        }
                    ],

                    temperature: 0.3
                })
            }
        );

        const data = await response.json();

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
}
