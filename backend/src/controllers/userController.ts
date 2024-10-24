import { Request, Response } from 'express';
import User from '../models/User';

interface AuthenticatedRequest extends Request {
    user?: any;
}

export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findByPk(req.user.userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const changeName = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { name } = req.body;

    try {
        const user = await User.findByPk(req.user.userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        user.name = name;
        await user.save();

        res.json({ message: 'Name updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
