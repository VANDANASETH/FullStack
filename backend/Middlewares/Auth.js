const jwt = require('jsonwebtoken')

const ensureAuthneticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    console.log("Auth", auth)
    if(!auth || !auth.startsWith('Bearer')){
        return res.status(403)
             .json({
                message:"Unauthrozied, JWT token is require"
             });
    }

    const token = auth.split(" ")[1];
    console.log("token", token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded", decoded)
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error", error.message)
         return res.status(403)
             .json({
                message:"Unauthrozied, JWT token is worng or expired"
             })
    }
}

module.exports = ensureAuthneticated;