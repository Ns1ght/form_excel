import { inject, injectable } from 'tsyringe'
import { IEstadoRepository } from '@modules/common/repositories/i-estado-repository'
import { IEstadoDTO } from '@modules/common/dtos/i-estado-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IEstadoDTO[],
  hasNext: boolean
}

@injectable()
class ListEstadoUseCase {
  constructor(
    @inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const estados = await this.estadoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countEstados = await this.estadoRepository.count(
      search
    )

    const numeroEstado = page * rowsPerPage

    const estadosResponse = {
      items: estados.data,
      hasNext: numeroEstado < countEstados.data.count
    }

    return estadosResponse
  }
}

export { ListEstadoUseCase }
