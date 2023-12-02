import db from '../../db';
import bcrypt from 'bcrypt';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            // Consulte o usuário no banco de dados pelo email
            const [userRows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
            console.log('email', email)

            if (userRows.length === 1) {
                // Verifique a senha usando bcrypt
                const user = userRows[0];
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    const userData = {
                        id: user.id,
                        email: user.email,
                        nome: user.nome,
                        cpf: user.cpf,
                        celular: user.celular,
                        numero: user.numero,
                        cidade: user.cidade,
                        endereco: user.endereco,
                        bairro: user.bairro,
                        estado: user.estado
                    };
                    return res.status(200).json(userData);
                }
            }

            // Credenciais inválidas
            res.status(401).json({ message: 'Credenciais inválidas' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao fazer login' });
        }
    } else {
        res.status(405).end(); // Método não permitido
    }
};
