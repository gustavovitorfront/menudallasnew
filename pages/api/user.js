import db from '../../db';
import bcrypt from 'bcrypt';

export default async (req, res) => {
    if (req.method === 'PUT') {
        const { email, password, nome, cpf, celular, numero, cidade, endereco, bairro, estado, cep, complemento } = req.body;
        let userId = req.headers['x-profile'];

        if (!userId) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }

        try {
            let hashedPassword = '';
            if (password) {
                // Criptografar a senha
                const saltRounds = 10; // Número de "salt rounds" (custo da criptografia)
                hashedPassword = await bcrypt.hash(password, saltRounds);
            }

            // Consulte o usuário no banco de dados pelo ID
            const [userRows] = await db.promise().query('SELECT * FROM users WHERE id = ?', [userId]);

            if (userRows.length === 1) {
                const user = userRows[0];

                // Verificar se o email já está em uso
                if (user.email != email) {
                    const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
                    if (existingUser.length > 0) {
                        return res.status(400).json({ message: 'Este email já está em uso' });
                    }
                }

                // Atualize as informações do usuário
                await db.promise().query('UPDATE users SET nome = ?, cpf = ?, celular = ?, numero = ?, cidade = ?, endereco = ?, bairro = ?, estado = ?, cep = ?, email = ?, complemento = ?, password = ? WHERE id = ?', [
                    nome,
                    cpf,
                    celular,
                    numero,
                    cidade,
                    endereco,
                    bairro,
                    estado,
                    cep,
                    email,
                    complemento,
                    hashedPassword ? hashedPassword : user.password,
                    userId,
                ]);

                const [updateUser] = await db.promise().query('SELECT id, nome, cpf, celular, email, numero, cidade, endereco, bairro, estado, cep, complemento FROM users WHERE id = ?', [userId]);

                if (updateUser.length === 0) {
                    return res.status(500).json({ message: 'Erro ao recuperar dados do usuário recém-atualizado' });
                }

                res.status(201).json(updateUser[0]);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar informações do usuário' });
        }
    } else if (req.method === 'GET') {
        const idHeader = req.headers['x-profile'];

        if (!idHeader) {
            return res.status(403).json({ message: 'Não está logado' });
        }

        const [userData] = await db.promise().query('SELECT id, nome, cpf, celular, email, numero, cidade, endereco, bairro, estado, cep, complemento FROM users WHERE id = ?', [idHeader]);

        if (userData.length === 0) {
            return res.status(500).json({ message: 'Erro ao recuperar dados do usuário' });
        }

        res.status(201).json(userData[0]);
    } else {
        res.status(405).end(); // Método não permitido
    }
};
