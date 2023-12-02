import db from '../../db';

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const {
                id_user,
                empresa,
                nome,
                estrelas,
                avaliacao
            } = req.body;

            // Inserir avaliação no db
            await db.promise().query(
                'INSERT INTO reviews (id_user, empresa, nome, estrelas, avaliacao) VALUES (?, ?, ?, ?, ?)',
                [
                    id_user,
                    empresa,
                    nome,
                    estrelas,
                    avaliacao
                ]
            );

            const [orderData] = await db.promise().query('SELECT * FROM reviews WHERE empresa = ?', [empresa]);

            res.status(201).json(orderData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao cadastrar avaliação' });
        }
    } else if (req.method === 'GET') {
        const idHeader = req.headers['x-profile'];
        const {
            empresa
        } = req.query;

        if (!idHeader) {
            return res.status(403).json({ message: 'Não está logado' });
        }

        const [orderData] = await db.promise().query('SELECT * FROM reviews WHERE empresa = ?', [empresa]);
        res.status(200).json(orderData);
    } else {
        res.status(405).end(); // Método não permitido
    }
};
