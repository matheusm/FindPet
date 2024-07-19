import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  password: string
  author_name: string
  whatsapp: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(data: CreateOrgUseCaseRequest) {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(data.email)

    if (orgWithSameEmail) throw new Error('Email already in use')

    const password_hash = await hash(data.password, 6)

    const org = await this.orgsRepository.create({
      name: data.name,
      email: data.email,
      author_name: data.author_name,
      whatsapp: data.whatsapp,
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      latitude: data.latitude,
      longitude: data.longitude,
      password_hash,
    })

    return { org }
  }
}
