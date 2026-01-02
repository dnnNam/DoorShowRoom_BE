import cors from 'cors'
import express from 'express'
import productRouter from './routes/products.routers'
import dotenv from 'dotenv'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DoorShowRoom API Documentation',
      description: 'API documentation for DoorShowRoom',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes/*.ts']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
)

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(express.json())

app.use('/', productRouter)

app.use()

app.listen(PORT, () => {
  console.log(`server bắt đầu trên cổng ${PORT}`)
})
