import { faker } from '@faker-js/faker'

export function generateNewCidadeData(overide = {}) {
  return {
    nome: faker.datatype.string(100),
    estadoId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCidadeData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    nome: faker.datatype.string(100),
    estadoId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCidadesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateCidadeData(overide)
    }
  )
}
