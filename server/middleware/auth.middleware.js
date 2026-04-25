const jwt = require("jsonwebtoken");

/**
 * Middleware to protect routes that require a logged-in user.
 *
 * Expects the client to send:
 *   Authorization: Bearer <token>
 *
 * On success, attaches req.user = { id, role } and calls next().
 * On failure, returns 401.
 */
const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, role }
        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token."
        });

    }

};

/**
 * Middleware factory to restrict a route to specific roles.
 *
 * Usage:  router.post("/create", authMiddleware, requireRole("teacher"), createQuiz)
 */
const requireRole = (...roles) => (req, res, next) => {

    if (!roles.includes(req.user?.role)) {
        return res.status(403).json({
            message: "Forbidden. You do not have permission to access this route."
        });
    }

    next();

};

module.exports = { authMiddleware, requireRole };
