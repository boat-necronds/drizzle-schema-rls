import { SignJWT, importPKCS8 } from "jose"
import { v4 as uuidv4 } from "uuid"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { todos } from "./db/schema"
import dotenv from "dotenv"
import { eq } from "drizzle-orm"

dotenv.config()

const getDb = (token: string) =>
  neon(process.env.DATABASE_AUTHENTICATED_URL!, {
    authToken: token,
  })


/* async function generateJWT() {
  const privateKeyPEM = hexToPem(process.env.PRIVATE_KEY!)
  console.log("privateKeyPEM", privateKeyPEM)
  const privateKeyJwk = await importPKCS8(privateKeyPEM, "RS256")

  const tenantId = "f330c503-5e9c-46a7-8393-2995aeb03675"
  const user_id = uuidv4()

  const jwt = await new SignJWT({
    tenantId: tenantId,
    id: "cd3d48ba-43d9-42a5-a93a-8ed69183c8b6",
    name: "john",
    email: "john@gmail.com",
  })
    .setSubject("cd3d48ba-43d9-42a5-a93a-8ed69183c8b6")
    .setProtectedHeader({ alg: "RS256", kid: "AvImk5DbiAdh9NYuP2Dr2gNQ7ycOWh2C" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(privateKeyJwk)

  console.log("✅ Generated JWT:\n", jwt)
  return jwt
} */

async function main() {
  try {
    const sql = drizzle(getDb("eyJhbGciOiJSUzI1NiIsImtpZCI6Ikh4VXdTelUwbWRLM2VOVmZmWDNndEk5TjRKTDVoYjN1In0.eyJpZCI6IjJSZVlHRmRaUGQ3RGRuVGZkTTNmcHNzVEloUGhLS2NJIiwibmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiZW1haWxWZXJpZmllZCI6ZmFsc2UsImltYWdlIjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTE3VDA1OjU1OjUwLjUwN1oiLCJ1cGRhdGVkQXQiOiIyMDI1LTA0LTE3VDA1OjU1OjUwLjUwN1oiLCJyb2xlIjoidXNlciIsImJhbm5lZCI6bnVsbCwiYmFuUmVhc29uIjpudWxsLCJiYW5FeHBpcmVzIjpudWxsLCJpYXQiOjE3NDQ4NzEzMjksImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImV4cCI6MTc0NDg3MjIyOSwic3ViIjoiMlJlWUdGZFpQZDdEZG5UZmRNM2Zwc3NUSWhQaEtLY0kifQ.Xz5KDiDW1fDKyJwV13TVqyIoo7CUEZfdsndFdQZEYJObhG_ubx9wRX6KSgVsplLsXrob82BGaXTVniYYn5Bl0gvPqbKKN2vXbt5W_znMunL-wSKu5Kvf0pvDUlgqTpd5NMNcpvSL-i5WFaXdYVj3oYED5xokWQayUlK0oE3dfdJB53H5sPw82ewMrEXj95KJ7Jouk-mTYITHBjvfRaRdBmJlRJ5olgzK-tj-oIWcp35RpcmDaACYvIfbMonT6H6BkKrr-j5SxCc0ATVwLhpISl7D8gn9Ijn2Mz3wnT9F8Lorcci0P3W7osj8A4lwcoJpK3YrUf4Mv-9JW2uk4V_VxQ"), {
      logger: true,
    })

    const todosList = await sql.select().from(todos)
    console.log("todos list 5555 :", todosList)
  } catch (err) {
    console.error(err)
  }
}

main()
