import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { username, email, password, name } = req.body;

    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await User.create({
            username,
            email,
            name,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    console.log('1')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { username, password } = req.body;
    console.log('req.body', req.body)

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            res.status(400).json({ message: 'Invalid username or password' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid username or password' });
            return;
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
