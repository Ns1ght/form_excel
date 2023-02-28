import { inject, injectable } from 'tsyringe'
import { ICidadeRepository } from '@modules/common/repositories/i-cidade-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  nome: string
  estadoId: string
}

@injectable()
class UpdateCidadeUseCase {
  constructor(
    @inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute({
    id,
    nome,
    estadoId
  }: IRequest): Promise<HttpResponse> {
    const cidade = await this.cidadeRepository.update({
      id,
      nome,
      estadoId
    })

    return cidade
  }
}

export { UpdateCidadeUseCase }
