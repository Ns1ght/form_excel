import { inject, injectable } from 'tsyringe'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { IProfileDTO } from '@modules/security/dtos/i-profile-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IProfileDTO[],
  hasNext: boolean
}

@injectable()
class ListProfileUseCase {
  constructor(
    @inject('ProfileRepository')
    private profileRepository: IProfileRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page - 1

    const profiles = await this.profileRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countProfiles = await this.profileRepository.count(
      search
    )

    const numeroProfile = page * rowsPerPage

    const profilesResponse = {
      items: profiles.data,
      hasNext: numeroProfile < countProfiles.data.count
    }

    return profilesResponse
  }
}

export { ListProfileUseCase }
