import 'dotenv/config'
import { app } from './app.js'

const PORT = process.env.PORT ?? 3333

app.listen(PORT, ()=>{
    console.warn(`Server running on port ${PORT}`)
})