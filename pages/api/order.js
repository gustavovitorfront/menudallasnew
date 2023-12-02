import db from '../../db';

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const {
                id_user,
                user_id,
                id_forma,
                empresa,
                bairro,
                celular,
                cidade,
                uf,
                complemento,
                forma,
                itens,
                logradouro,
                nome,
                numero,
                observacao,
                operacao,
                total_produtos,
                valor_taxa,
                valor_total
            } = req.body;

            // Inserir pedido no db
            await db.promise().query(
                'INSERT INTO orders (id_user, user_id, id_forma, empresa, bairro, celular, cidade, uf, complemento, forma, itens, logradouro, nome, numero, observacao, operacao, total_produtos, valor_taxa, valor_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    id_user,
                    user_id,
                    id_forma,
                    empresa,
                    bairro,
                    celular,
                    cidade,
                    uf,
                    complemento,
                    forma,
                    JSON.stringify(itens),
                    logradouro,
                    nome,
                    numero,
                    observacao,
                    operacao,
                    total_produtos,
                    valor_taxa,
                    valor_total
                ]
            );

            res.status(201).json({
                status: true
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao cadastrar pedido' });
        }
    } else if (req.method === 'GET') {
        const idHeader = req.headers['x-profile'];
        const {
            empresa
        } = req.query;

        if (!idHeader) {
            return res.status(403).json({ message: 'Não está logado' });
        }

        const [orderData] = await db.promise().query('SELECT * FROM orders WHERE id_user = ? AND empresa = ?', [idHeader, empresa]);
        res.status(200).json(orderData);
    } else {
        res.status(405).end(); // Método não permitido
    }
};
