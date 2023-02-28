import { inject, injectable } from 'tsyringe'
import { Estado } from '@modules/common/infra/typeorm/entities/estado'
import { IEstadoRepository } from '@modules/common/repositories/i-estado-repository'

interface IRequest {
  nome: string
  uf: string
}

@injectable()
class CreateEstadoUseCase {
  constructor(
    @inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute({
    nome,
    uf
  }: IRequest): Promise<Estado> {
    const result = await this.estadoRepository.create({
        nome,
        uf
      })
      .then(estadoResult => {
        return estadoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateEstadoUseCase }
