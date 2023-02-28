import { inject, injectable } from 'tsyringe'
import { Profile } from '@modules/security/infra/typeorm/entities/profile'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountProfileUseCase {
  constructor(
    @inject('ProfileRepository')
    private profileRepository: IProfileRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const profilesCount = await this.profileRepository.count(
      search
    )

    return profilesCount
  }
}

export { CountProfileUseCase }
