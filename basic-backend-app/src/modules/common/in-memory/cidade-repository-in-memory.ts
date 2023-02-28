import { ICidadeDTO } from '@modules/common/dtos/i-cidade-dto'
import { ICidadeRepository } from '@modules/common/repositories/i-cidade-repository'
import { Cidade } from '@modules/common/infra/typeorm/entities/cidade'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class CidadeRepositoryInMemory implements ICidadeRepository {
  cidades: Cidade[] = []

  // create
  async create ({
    nome,
    estadoId
  }: ICidadeDTO): Promise<HttpResponse> {
    const cidade = new Cidade()

    Object.assign(cidade, {
      nome,
      estadoId
    })

    this.cidades.push(cidade)

    return ok(cidade)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredCidades = this.cidades

    filteredCidades = filteredCidades.filter((cidade) => {
      if (cidade.nome.includes(search)) return true

      return false
    })

    return ok(filteredCidades.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredCidades = this.cidades

    filteredCidades = filteredCidades.filter((cidade) => {
      if (cidade.nome.includes(filter)) return true

      return false
    })

    return ok(filteredCidades)
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
    let filteredCidades = this.cidades

    filteredCidades = filteredCidades.filter((cidade) => {
      if (cidade.nome.includes(search)) return true

      return false
    })

    return ok(filteredCidades.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const cidade = this.cidades.find((cidade) => cidade.id === id)

    if (typeof cidade === 'undefined') {
      return notFound()
    } else {
      return ok(cidade)
    }
  }


  // update
  async update ({
    id,
    nome,
    estadoId
  }: ICidadeDTO): Promise<HttpResponse> {
    const index = this.cidades.findIndex((cidade) => cidade.id === id)

    this.cidades[index].nome = nome
    this.cidades[index].estadoId = estadoId

    return ok(this.cidades[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.cidades.findIndex((cidade) => cidade.id === id)

    this.cidades.splice(index, 1)

    return ok(this.cidades)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { CidadeRepositoryInMemory }
