import express from "express"
import jwt from "jsonwebtoken"
// import validator from "validator"
// import bcrypt from "bcryptjs"

const app = express()
app.disable("x-powered-by")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const jwtSecreteKey =
  process.env.SECRETKEY ||
  "rl0__K68(oT;|L)t.yfw0%H1bu4<<Ey>3@#G^'<2x`,5]0JdjrDWf#w@>b|fZ]a"

app.get("/api", (req, res) => {
  // res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.json({
    message: "Welcome to the API"
  })
})

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, jwtSecreteKey, (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.setHeader("Content-Type", "application/json; charset=utf-8")

      res.json({
        message: "Post created...",
        authData
      })
    }
  })
})

app.post("/api/login", (req, res) => {
  console.log(`Request from: ${req.originalUrl}`)
  console.log(`Request type: ${req.method}`)
  console.log(`Request body:`)
  console.log(req.body)

  // Mock user
  const user = {
    id: 1,
    username: "nattapon",
    email: "nui@nattapon.me"
  }

  jwt.sign({ user }, jwtSecreteKey, { expiresIn: "30m" }, (err, token) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8")
    res.json({
      token
    })
  })
})

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"]
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ")
    // Get token from array
    const bearerToken = bearer[1]
    // Set the token
    req.token = bearerToken

    // Next middleware
    next()
  } else {
    // Forbidden
    res.sendStatus(403)
  }
}

app.listen(3000, () => {
  console.log(`NODE_ENV=${process.env.NODE_ENV}`)
  console.log("Server started on port 3000")
})
