import { inject, injectable } from 'tsyringe'
import { IBlockReasonRepository } from '@modules/security/repositories/i-block-reason-repository'
import { IBlockReasonDTO } from '@modules/security/dtos/i-block-reason-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IBlockReasonDTO[],
  hasNext: boolean
}

@injectable()
class ListBlockReasonUseCase {
  constructor(
    @inject('BlockReasonRepository')
    private blockReasonRepository: IBlockReasonRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page - 1

    const blockReasons = await this.blockReasonRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countBlockReasons = await this.blockReasonRepository.count(
      search
    )

    const numeroBlockReason = page * rowsPerPage

    const blockReasonsResponse = {
      items: blockReasons.data,
      hasNext: numeroBlockReason < countBlockReasons.data.count
    }

    return blockReasonsResponse
  }
}

export { ListBlockReasonUseCase }
