import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
       
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { _id: decoded.id }; // ✅ FIXED

        next();
    } catch (error) {
        console.error('JWT verification failed:', error);
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

export default authUser;
