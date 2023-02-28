import { inject, injectable } from 'tsyringe'
import { ProfileOption } from '@modules/security/infra/typeorm/entities/profile-option'
import { IProfileOptionRepository } from '@modules/security/repositories/i-profile-option-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountProfileOptionUseCase {
  constructor(
    @inject('ProfileOptionRepository')
    private profileOptionRepository: IProfileOptionRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const profileOptionsCount = await this.profileOptionRepository.count(
      search
    )

    return profileOptionsCount
  }
}

export { CountProfileOptionUseCase }
