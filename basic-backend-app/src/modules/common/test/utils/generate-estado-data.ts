import { faker } from '@faker-js/faker'

export function generateNewEstadoData(overide = {}) {
  return {
    nome: faker.datatype.string(100),
    uf: faker.datatype.string(2),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateEstadoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    nome: faker.datatype.string(100),
    uf: faker.datatype.string(2),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateEstadosData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateEstadoData(overide)
    }
  )
}
