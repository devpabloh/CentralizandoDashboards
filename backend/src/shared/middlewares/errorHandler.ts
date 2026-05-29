import type { Request, Response, NextFunction } from 'express'
import {AppError} from '@shared/errors/AppError.js'
import { ZodError } from 'zod'

export function errorHandler (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {

    // Erros de validação do Zod
    if(error instanceof ZodError){
        res.status(422).json({
            status: "error",
            message: "Validation error",
            errors: error.flatten().fieldErrors,
        })
        return
    }

    // Erros conhecidos da aplicação (AppError)
    if(error instanceof AppError){
        res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }

    // Erros inesperados — nunca exponha detalhes em produção
    console.error(error)
 
    res.status(500).json({
        status: 'error',
        message: process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : error.message,
    })
}