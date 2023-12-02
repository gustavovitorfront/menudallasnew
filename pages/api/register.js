import db from '../../db';
import bcrypt from 'bcrypt';

export default async (req, res) => {
    if (req.method === 'POST') {
        const {
            email,
            password,
            nome,
            cpf,
            celular
        } = req.body;

        // Validação básica
        if (!email || email.length < 6) {
            return res.status(400).json({ message: 'O email é inválido' });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'A senha é inválida' });
        }

        try {
            // Verificar se o email já está em uso
            const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'Este email já está em uso' });
            }

            // Criptografar a senha
            const saltRounds = 10; // Número de "salt rounds" (custo da criptografia)
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Inserir usuário no banco de dados com senha criptografada
            const [result] = await db.promise().query('INSERT INTO users (email, password, nome, cpf, celular) VALUES (?, ?, ?, ?, ?)', [email, hashedPassword, nome, cpf, celular]);

            // Recupere os dados do usuário recém-inserido
            const [newUser] = await db.promise().query('SELECT id, nome, cpf, celular, email, numero, cidade, endereco, bairro, estado FROM users WHERE id = ?', [result.insertId]);

            if (newUser.length === 0) {
                return res.status(500).json({ message: 'Erro ao recuperar dados do usuário recém-inserido' });
            }

            res.status(201).json(newUser[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao cadastrar usuário' });
        }
    } else {
        res.status(405).end(); // Método não permitido
    }
};
