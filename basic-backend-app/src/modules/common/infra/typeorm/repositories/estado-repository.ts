import { getRepository, Repository } from 'typeorm'
import { IEstadoDTO } from '@modules/common/dtos/i-estado-dto'
import { IEstadoRepository } from '@modules/common/repositories/i-estado-repository'
import { Estado } from '@modules/common/infra/typeorm/entities/estado'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class EstadoRepository implements IEstadoRepository {
  private repository: Repository<Estado>

  constructor() {
    this.repository = getRepository(Estado)
  }


  // create
  async create ({
    nome,
    uf
  }: IEstadoDTO): Promise<HttpResponse> {
    const estado = this.repository.create({
      nome,
      uf
    })

    const result = await this.repository.save(estado)
      .then(estadoResult => {
        return ok(estadoResult)
      })
      .catch(error => {
        return serverError(error)
      })

    return result
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let columnName: string
    let columnDirection: 'ASC' | 'DESC'

    if ((typeof(order) === 'undefined') || (order === "")) {
      columnName = 'nome'
      columnDirection = 'ASC'
    } else {
      columnName = order.substring(0, 1) === '-' ? order.substring(1) : order
      columnDirection = order.substring(0, 1) === '-' ? 'DESC' : 'ASC'
    }

    const referenceArray = [
      "nome",
      "uf",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let estados = await this.repository.createQueryBuilder('est')
        .select([
          'est.id as "id"',
          'est.nome as "nome"',
          'est.uf as "uf"',
        ])
        .where('CAST(est.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        .orWhere('CAST(est.uf AS VARCHAR) ilike :search', { search: `%${search}%` })
        .addOrderBy('est.nome', columnOrder[0])
        .addOrderBy('est.uf', columnOrder[1])
        .take(rowsPerPage)
        .skip(offset)
        .limit(rowsPerPage)
        .getRawMany()

      return ok(estados)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const estados = await this.repository.createQueryBuilder('est')
        .select([
          'est.id as "value"',
          'est.uf as "label"',
        ])
        .where('est.uf ilike :filter', { filter: `${filter}%` })
        .addOrderBy('est.uf')
        .getRawMany()

      return ok(estados)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const estado = await this.repository.createQueryBuilder('est')
        .select([
          'est.id as "value"',
          'est.uf as "label"',
        ])
        .where('est.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(estado)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const estados = await this.repository.createQueryBuilder('est')
        .select([
          'est.id as "id"',
        ])
        .where('est.nome ilike :search', { search: `%${search}%` })
        .orWhere('est.uf ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: estados.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const estado = await this.repository.createQueryBuilder('est')
        .select([
          'est.id as "id"',
          'est.nome as "nome"',
          'est.uf as "uf"',
        ])
        .where('est.id = :id', { id })
        .getRawOne()

      if (typeof estado === 'undefined') {
        return noContent()
      }

      return ok(estado)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    nome,
    uf
  }: IEstadoDTO): Promise<HttpResponse> {
    const estado = await this.repository.findOne(id)

    if (!estado) {
      return notFound()
    }

    const newestado = this.repository.create({
      id,
      nome,
      uf
    })

    try {
      await this.repository.save(newestado)

      return ok(newestado)
    } catch (err) {
      return serverError(err)
    }
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    try {
      await this.repository.delete(id)

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }


  // multi delete
  async multiDelete (ids: string[]): Promise<HttpResponse> {
    try {
      await this.repository.delete(ids)

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }
}

export { EstadoRepository }
