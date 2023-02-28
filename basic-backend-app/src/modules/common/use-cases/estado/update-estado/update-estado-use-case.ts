import { inject, injectable } from 'tsyringe'
import { IEstadoRepository } from '@modules/common/repositories/i-estado-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  nome: string
  uf: string
}

@injectable()
class UpdateEstadoUseCase {
  constructor(
    @inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute({
    id,
    nome,
    uf
  }: IRequest): Promise<HttpResponse> {
    const estado = await this.estadoRepository.update({
      id,
      nome,
      uf
    })

    return estado
  }
}

export { UpdateEstadoUseCase }
