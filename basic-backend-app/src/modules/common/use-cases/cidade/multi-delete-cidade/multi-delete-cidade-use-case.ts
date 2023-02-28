import { inject, injectable } from 'tsyringe'
import { ICidadeRepository } from '@modules/common/repositories/i-cidade-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteCidadeUseCase {
  constructor(
    @inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const cidade = await this.cidadeRepository.multiDelete(ids)

    return cidade
  }
}

export { MultiDeleteCidadeUseCase }
