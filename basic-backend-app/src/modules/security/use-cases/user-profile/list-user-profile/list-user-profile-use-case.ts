import { inject, injectable } from 'tsyringe'
import { IUserProfileRepository } from '@modules/security/repositories/i-user-profile-repository'
import { IUserProfileDTO } from '@modules/security/dtos/i-user-profile-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IUserProfileDTO[],
  hasNext: boolean
}

@injectable()
class ListUserProfileUseCase {
  constructor(
    @inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page - 1

    const usersProfiles = await this.userProfileRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countUsersProfiles = await this.userProfileRepository.count(
      search
    )

    const numeroUserProfile = page * rowsPerPage

    const usersProfilesResponse = {
      items: usersProfiles.data,
      hasNext: numeroUserProfile < countUsersProfiles.data.count
    }

    return usersProfilesResponse
  }
}

export { ListUserProfileUseCase }
