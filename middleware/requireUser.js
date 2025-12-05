import { verifyToken } from "#utils/jwt"; // use the same path/alias you use elsewhere

export default function requireUser(req, res, next) {
  // 1. Get Authorization header
  const authHeader = req.headers.authorization;

  // 2. If there is no header → 401
  if (!authHeader) {
    return res.status(401).send("Authorization header required.");
  }

  // 3. Expect "Bearer <token>"
  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).send("Invalid authorization header format.");
  }

  const scheme = parts[0];
  const token = parts[1];

  if (scheme !== "Bearer" || !token) {
    return res.status(401).send("Invalid authorization header format.");
  }

  // 4. Verify token
  try {
    const payload = verifyToken(token);

    // 5. Attach user info to the request
    req.user = payload;

    // 6. Move on to the real route handler
    next();
  } catch (err) {
    // Token invalid / expired, etc.
    return res.status(401).send("Invalid or expired token.");
  }
}
