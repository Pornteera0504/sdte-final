const { pool } = require("../utilities/databaseConfig")
const Joi = require("joi")
const bcrypt = require("bcrypt")

const passwordValidator = (value, helpers) => {
  if (value.length < 8) {
    throw new Joi.ValidationError("Password must contain at least 8 characters")
  }
  return value
}
const emailValidator = async (value, helpers) => {
  const [rows, _] = await pool.query("SELECT * FROM users WHERE email = ?", [value])
  if (rows.length > 0) {
    const message = "This email is already taken"
    throw new Joi.ValidationError(message, { message })
  }
  return value
}
const registerSchema = Joi.object({
  email: Joi.string().required().email().external(emailValidator),
  password: Joi.string().required().custom(passwordValidator),
  userID: Joi.string().required(),
  nationality: Joi.string().required()
})
const registerUser = async (req, res) => {
  try {
    await registerSchema.validateAsync(req.body, { abortEarly: false })
  } catch (error) {
    return res.status(400).json(error.toString())
  }

  const conn = await pool.getConnection()
  await conn.beginTransaction()
  const nationality = req.body.nationality
  const userID = req.body.userID
  const password = await bcrypt.hash(req.body.password, 10)
  const email = req.body.email

  try {
    const querySql = "INSERT INTO users(userID, email, nationality, password) VALUES (?, ?, ?, ?)"
    await conn.query(querySql, [userID, email, nationality, password])
    res.status(200).send("Register Success")

    await conn.commit()
    return {}
  } catch (error) {
    conn.rollback()
    res.status(500).send("[Register module] Something went wrong. & Register failure")
  } finally {
    conn.release()
  }
}

const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})
const loginUser = async (req, res) => {
  //User3User3
  //User4User4
  try {
    await loginSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(400).send(err)
  }

  const conn = await pool.getConnection()
  await conn.beginTransaction()
  const email = req.body.email
  const password = req.body.password

  try {
    const querySql = "SELECT * FROM users WHERE email = ?"
    const [rows, _] = await conn.query(querySql, [email])
    matched = await verifyPassword(password, rows[0].password)

    if (rows.length === 1 && matched) {
      res.status(200).json({
        message: "Login success",
        email: resRow[0].email,
      })
    } else if (rows.length === 1) {
      res.status(400).json({ state: false, reason: "Password incorrect" })
    }
    await conn.commit()
    return {}
  } catch (err) {
    await conn.rollback()
    console.log(err)
    return res.status(500).json({
      state: false,
      reason: "[Login module] Something went wrong. & Login failure",
    })
  } finally {
    conn.release()
  }
}


module.exports = { registerUser, loginUser }
