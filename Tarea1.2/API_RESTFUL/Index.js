import express from "express"
import MovieRoute from "./Movies_Routes/MoviesRoutes.js"
import dotenv from "dotenv"

dotenv.config()

const app=express()

const PORT= process.env.PORT || 3000

app.use(express.json())
app.use("/productos",MovieRoute)


app.use((req, res) => {
  res.status(404).json({
    message: 'Hubo un Error en la URL'
  })
})

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})



