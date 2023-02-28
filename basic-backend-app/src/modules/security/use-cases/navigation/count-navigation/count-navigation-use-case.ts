import { inject, injectable } from 'tsyringe'
import { Navigation } from '@modules/security/infra/typeorm/entities/navigation'
import { INavigationRepository } from '@modules/security/repositories/i-navigation-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountNavigationUseCase {
  constructor(
    @inject('NavigationRepository')
    private navigationRepository: INavigationRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const navigationsCount = await this.navigationRepository.count(
      search
    )

    return navigationsCount
  }
}

export { CountNavigationUseCase }
