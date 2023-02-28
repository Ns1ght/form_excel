import { IEstadoDTO } from '@modules/common/dtos/i-estado-dto'
import { IEstadoRepository } from '@modules/common/repositories/i-estado-repository'
import { Estado } from '@modules/common/infra/typeorm/entities/estado'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class EstadoRepositoryInMemory implements IEstadoRepository {
  estados: Estado[] = []

  // create
  async create ({
    nome,
    uf
  }: IEstadoDTO): Promise<HttpResponse> {
    const estado = new Estado()

    Object.assign(estado, {
      nome,
      uf
    })

    this.estados.push(estado)

    return ok(estado)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredEstados = this.estados

    filteredEstados = filteredEstados.filter((estado) => {
      if (estado.nome.includes(search)) return true
      if (estado.uf.includes(search)) return true

      return false
    })

    return ok(filteredEstados.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredEstados = this.estados

    filteredEstados = filteredEstados.filter((estado) => {
      if (estado.nome.includes(filter)) return true
      if (estado.uf.includes(filter)) return true

      return false
    })

    return ok(filteredEstados)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    let filteredEstados = this.estados

    filteredEstados = filteredEstados.filter((estado) => {
      if (estado.nome.includes(search)) return true
      if (estado.uf.includes(search)) return true

      return false
    })

    return ok(filteredEstados.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const estado = this.estados.find((estado) => estado.id === id)

    if (typeof estado === 'undefined') {
      return notFound()
    } else {
      return ok(estado)
    }
  }


  // update
  async update ({
    id,
    nome,
    uf
  }: IEstadoDTO): Promise<HttpResponse> {
    const index = this.estados.findIndex((estado) => estado.id === id)

    this.estados[index].nome = nome
    this.estados[index].uf = uf

    return ok(this.estados[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.estados.findIndex((estado) => estado.id === id)

    this.estados.splice(index, 1)

    return ok(this.estados)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { EstadoRepositoryInMemory }
