import express from 'express'
const app = express()

/**
 * GET > BUSCAR
 * POST > SALVAR
 * PUT > ALTERAR
 * DELETE > DELETAR
 * PATCH > ALTERAÇÃO ESPECÍFICA
 */

app.get('/', (request, response) => {
    return response.json({ message: 'NLW 04' })
})

app.post('/', (request, response) => {
    return response.json({ message: 'NLW 04' })
})

app.listen(3333, () => console.log('run'))