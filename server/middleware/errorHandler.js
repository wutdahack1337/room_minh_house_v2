export function errorHandler(error, request, response, _next) {
  console.error(error);

  if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
    return response.status(409).json({ error: "duplicate room name" });
  }

  response.status(500).json({ error: "internal server error" });
}
