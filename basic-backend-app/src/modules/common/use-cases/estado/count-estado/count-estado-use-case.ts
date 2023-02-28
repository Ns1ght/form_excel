import { inject, injectable } from 'tsyringe'
import { Estado } from '@modules/common/infra/typeorm/entities/estado'
import { IEstadoRepository } from '@modules/common/repositories/i-estado-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountEstadoUseCase {
  constructor(
    @inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const estadosCount = await this.estadoRepository.count(
      search
    )

    return estadosCount
  }
}

export { CountEstadoUseCase }
