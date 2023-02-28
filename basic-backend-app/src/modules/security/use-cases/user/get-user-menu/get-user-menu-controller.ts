import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetUserMenuUseCase } from './get-user-menu-use-case'
import { HttpResponse } from '@shared/helpers'

class GetUserMenuController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      id
    } = request.user

    const getUserMenuUseCase = container.resolve(GetUserMenuUseCase)

    const userMenu = await getUserMenuUseCase.execute({
      id: id as string
    })

    return response.json(userMenu)
  }
}

export { GetUserMenuController }
