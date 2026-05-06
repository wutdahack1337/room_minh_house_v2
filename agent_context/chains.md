# Middleware Chains

Shows the middleware stack each request passes through, in order.

## Global (all routes)

```
express.json()  →  router  →  errorHandler
```

`errorHandler` is the last middleware in `server/index.js` and catches anything passed to `next(error)`.

## POST /api/rooms

```
express.json()
  → validate(schemas.createRoom)   [400 if invalid]
  → route handler                  [201 created | next(error)]
  → errorHandler                   [409 duplicate | 500 fallback]
```

## GET /api/rooms

```
express.json()
  → route handler                  [200 ok | next(error)]
  → errorHandler                   [500 fallback]
```

## POST /api/invoice

```
express.json()
  → validate(schemas.createInvoice)  [400 if invalid]
  → route handler                    [404 room not found | 200 ok | next(error)]
  → errorHandler                     [500 fallback]
```

## Adding middleware to a route

Import and call `validate(schemas.yourSchema)` as the second argument to `router.post/get/...`. Place it before the handler function. Global middleware goes in `server/index.js` before the router mounts.
