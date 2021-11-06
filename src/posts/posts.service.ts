import { Injectable } from '@nestjs/common'
import { Post } from '@prisma/client'
import { CategoryCreateDto } from 'src/categories/category.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { PostCreateDto, PostUpdateDto } from './post.dto'

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(
    payload: PostCreateDto,

    relations?: CategoryCreateDto[]
  ): Promise<Post> {
    const { post } = this.prismaService

    return post.create({
      data: {
        ...payload,
        ...(!payload.slug && {
          slug: payload.title.toLowerCase().replace(/ /g, '-')
        }),
        ...(relations && {
          categories: {
            connectOrCreate: relations.map((relation) => ({
              where: { name: relation.name },
              create: { ...relation }
            }))
          }
        })
      },
      include: { categories: true }
    })
  }

  async getPosts(): Promise<Post[]> {
    const { post } = this.prismaService

    return post.findMany({ include: { categories: true } })
  }

  async getPost(slug: string): Promise<Post | null> {
    const { post } = this.prismaService

    return post.findUnique({ where: { slug }, include: { categories: true } })
  }

  async updatePost(
    id: string,
    payload: PostUpdateDto,

    relations?: CategoryCreateDto[]
  ): Promise<Post> {
    const { post } = this.prismaService

    return post.update({
      where: { id },
      data: {
        ...payload,
        ...(!payload.slug && {
          slug: payload.title.toLowerCase().replace(/ /g, '-')
        }),
        ...(relations && {
          categories: {
            connectOrCreate: relations.map((relation) => ({
              where: { name: relation.name },
              create: { ...relation }
            }))
          }
        })
      },
      include: { categories: true }
    })
  }

  async deletePost(id: string): Promise<Post> {
    const { post } = this.prismaService

    return post.delete({
      where: { id },
      include: { categories: true }
    })
  }
}
