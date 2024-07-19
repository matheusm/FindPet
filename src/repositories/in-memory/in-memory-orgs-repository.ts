import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []
  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      author_name: data.author_name,
      cep: data.cep,
      city: data.city,
      email: data.email,
      name: data.name,
      neighborhood: data.neighborhood,
      password_hash: data.password_hash,
      state: data.state,
      street: data.street,
      whatsapp: data.whatsapp,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    return this.items.find((org) => org.email === email) || null
  }
}
