import { inject, injectable } from 'tsyringe'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { IUserSecurityRepository } from '@modules/security/repositories/i-user-security-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
}

@injectable()
class GetUserMenuUseCase {
  constructor(
    @inject('UserSecurityRepository')
    private userSecurityRepository: IUserSecurityRepository
  ) {}

  async execute({
    id
  }: IRequest): Promise<HttpResponse> {
    const userMenu = await this.userSecurityRepository.getUserMenu(id)

    return userMenu
  }
}

export { GetUserMenuUseCase }
