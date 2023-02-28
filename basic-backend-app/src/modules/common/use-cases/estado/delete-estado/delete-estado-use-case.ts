import { inject, injectable } from 'tsyringe'
import { Estado } from '@modules/common/infra/typeorm/entities/estado'
import { IEstadoRepository } from '@modules/common/repositories/i-estado-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteEstadoUseCase {
  constructor(
    @inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const estado = await this.estadoRepository.delete(id)

    return estado
  }
}

export { DeleteEstadoUseCase }
