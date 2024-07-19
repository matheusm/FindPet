import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrgUseCase } from '../create-org'

export function makeCreateOrgUseCase() {
  const usersRepository = new PrismaOrgsRepository()
  const registerUseCase = new CreateOrgUseCase(usersRepository)

  return registerUseCase
}
