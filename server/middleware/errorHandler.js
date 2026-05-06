export function errorHandler(error, request, respose, next) {
  console.error(err);

  if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
    return res.status(409).json({ error: "duplicate room name" });
  }

  res.status(500).json({ error: "internal server error" });
}