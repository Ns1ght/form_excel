import { inject, injectable } from 'tsyringe'
import { Cidade } from '@modules/common/infra/typeorm/entities/cidade'
import { ICidadeRepository } from '@modules/common/repositories/i-cidade-repository'

interface IRequest {
  nome: string
  estadoId: string
}

@injectable()
class CreateCidadeUseCase {
  constructor(
    @inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute({
    nome,
    estadoId
  }: IRequest): Promise<Cidade> {
    const result = await this.cidadeRepository.create({
        nome,
        estadoId
      })
      .then(cidadeResult => {
        return cidadeResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateCidadeUseCase }
