import { inject, injectable } from 'tsyringe'
import { ICidadeRepository } from '@modules/common/repositories/i-cidade-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectCidadeUseCase {
  constructor(
    @inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const cidades = await this.cidadeRepository.select(filter)

    const newCidades = {
      items: cidades.data,
      hasNext: false
    }

    return newCidades
  }
}

export { SelectCidadeUseCase }
