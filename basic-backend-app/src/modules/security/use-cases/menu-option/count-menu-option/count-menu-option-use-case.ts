import { inject, injectable } from 'tsyringe'
import { MenuOption } from '@modules/security/infra/typeorm/entities/menu-option'
import { IMenuOptionRepository } from '@modules/security/repositories/i-menu-option-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountMenuOptionUseCase {
  constructor(
    @inject('MenuOptionRepository')
    private menuOptionRepository: IMenuOptionRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const menuOptionsCount = await this.menuOptionRepository.count(
      search
    )

    return menuOptionsCount
  }
}

export { CountMenuOptionUseCase }
