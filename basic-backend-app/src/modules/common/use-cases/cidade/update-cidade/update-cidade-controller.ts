import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateCidadeUseCase } from './update-cidade-use-case'

class UpdateCidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      estadoId
    } = request.body

    const { id } = request.params

    const updateCidadeUseCase = container.resolve(UpdateCidadeUseCase)

    const result = await updateCidadeUseCase.execute({
        id,
        nome,
        estadoId
      })
      .then(cidadeResult => {
        return cidadeResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateCidadeController }
