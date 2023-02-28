import { inject, injectable } from 'tsyringe'
import { Module } from '@modules/security/infra/typeorm/entities/module'
import { IModuleRepository } from '@modules/security/repositories/i-module-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountModuleUseCase {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const modulesCount = await this.moduleRepository.count(
      search
    )

    return modulesCount
  }
}

export { CountModuleUseCase }
