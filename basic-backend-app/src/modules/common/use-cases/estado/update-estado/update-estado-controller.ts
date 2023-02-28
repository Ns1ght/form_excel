import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateEstadoUseCase } from './update-estado-use-case'

class UpdateEstadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      uf
    } = request.body

    const { id } = request.params

    const updateEstadoUseCase = container.resolve(UpdateEstadoUseCase)

    const result = await updateEstadoUseCase.execute({
        id,
        nome,
        uf
      })
      .then(estadoResult => {
        return estadoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateEstadoController }
