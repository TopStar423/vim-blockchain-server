function apiKeyAuth(req, res, next) {
    // Don't check signature for preflight request
    if (req.method === "OPTIONS") {
        return next();
    }

    if (!req.headers || !req.headers["x-api-key"]) {
        return res.status(401).json({ message: "Missing Authorization Header" });
    }

    // Headers
    // x-api-key: yourSecretKey
    const apiKey = req.headers["x-api-key"];

    if (apiKey === "bWFnZ2llOnN1bW1lcnM") {
        return next();
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = apiKeyAuth;
