import { Injectable, NotFoundException } from '@nestjs/common'
import { toApolloError } from 'apollo-server-express'
import { CategoryCreateDto } from 'src/categories/category.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { PostCreateDto, PostUpdateDto } from './post.dto'
import { Post } from './post.entity'

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createPost(
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

  public async getPosts(): Promise<Post[]> {
    const { post } = this.prismaService

    return post.findMany({ include: { categories: true } })
  }

  public async getPost(slug: string): Promise<Post> {
    const { post } = this.prismaService

    const query = await post.findUnique({
      where: { slug },
      include: { categories: true }
    })

    if (query === null) {
      throw toApolloError(
        new NotFoundException(`Post with slug ${slug} not found`)
      )
    }

    return query
  }

  public async updatePost(
    id: string,
    payload: PostUpdateDto,
    relations?: CategoryCreateDto[]
  ): Promise<Post> {
    const { post } = this.prismaService

    return post.update({
      where: { id },
      data: {
        ...payload,
        ...(!payload.slug &&
          payload.title && {
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

  public async deletePost(id: string): Promise<Post> {
    const { post } = this.prismaService

    return post.delete({
      where: { id },
      include: { categories: true }
    })
  }
}
