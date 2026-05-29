import 'express-async-errors'
import express from 'express'
import { errorHandler } from '@shared/middlewares/errorHandler.js'

export const app = express()

// Parseia JSON no body das requisições
app.use(express.json())

// health check - útil para docker e monitoramento
app.get('health', (_req, res)=>{
    res.json({status: 'ok', timeStamp: new Date().toISOString()})
})

// Rotas da aplicação

// Error Handler - Sempre deve ser o último middleware
app.use(errorHandler)