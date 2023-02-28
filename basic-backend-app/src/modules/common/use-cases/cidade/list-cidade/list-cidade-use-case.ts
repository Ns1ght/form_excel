import { inject, injectable } from 'tsyringe'
import { ICidadeRepository } from '@modules/common/repositories/i-cidade-repository'
import { ICidadeDTO } from '@modules/common/dtos/i-cidade-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: ICidadeDTO[],
  hasNext: boolean
}

@injectable()
class ListCidadeUseCase {
  constructor(
    @inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const cidades = await this.cidadeRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countCidades = await this.cidadeRepository.count(
      search
    )

    const numeroCidade = page * rowsPerPage

    const cidadesResponse = {
      items: cidades.data,
      hasNext: numeroCidade < countCidades.data.count
    }

    return cidadesResponse
  }
}

export { ListCidadeUseCase }
