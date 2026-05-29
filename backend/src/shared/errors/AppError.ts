/* 
* Erro base da aplicação.
* Todos os erros conhecidos estendem essa classe, 
* O que permite ao error handler identificar se é um erro,
* esperando (AppError) ou inesperado (Error genérico)
*/

export class AppError {
    public readonly message: string
    public readonly statusCode: number

    constructor(message:string, statusCode = 400){
        this.message = message
        this.statusCode = statusCode
    }
}