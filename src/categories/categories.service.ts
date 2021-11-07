import { Injectable, NotFoundException } from '@nestjs/common'
import { toApolloError } from 'apollo-server-express'
import { PostCreateDto } from 'src/posts/post.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { CategoryCreateDto, CategoryUpdateDto } from './category.dto'
import { Category } from './category.entity'

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createCategory(
    payload: CategoryCreateDto,
    relations?: PostCreateDto[]
  ): Promise<Category> {
    const { category } = this.prismaService

    return category.create({
      data: {
        ...payload,
        ...(relations && {
          posts: {
            connectOrCreate: relations.map((relation) => ({
              where: { slug: relation.slug },
              create: {
                ...relation,
                ...(!relation.slug && {
                  slug: relation.title.toLowerCase().replace(/ /g, '-')
                })
              }
            }))
          }
        })
      },
      include: { posts: true }
    })
  }

  public async getCategories(): Promise<Category[]> {
    const { category } = this.prismaService

    return category.findMany({ include: { posts: true } })
  }

  public async getCategory(name: string): Promise<Category | null> {
    const { category } = this.prismaService

    const query = await category.findUnique({
      where: { name },
      include: { posts: true }
    })

    if (query === null) {
      throw toApolloError(
        new NotFoundException(`Category with name ${name} not found`)
      )
    }

    return query
  }

  public async updateCategory(
    id: string,
    payload: CategoryUpdateDto,
    relations?: PostCreateDto[]
  ): Promise<Category> {
    const { category } = this.prismaService

    return category.update({
      where: { id },
      data: {
        ...payload,
        ...(relations && {
          posts: {
            connectOrCreate: relations.map((relation) => ({
              where: { slug: relation.slug },
              create: {
                ...relation,
                ...(!relation.slug && {
                  slug: relation.title.toLowerCase().replace(/ /g, '-')
                })
              }
            }))
          }
        })
      },
      include: { posts: true }
    })
  }

  public async deleteCategory(id: string): Promise<Category> {
    const { category } = this.prismaService

    return category.delete({
      where: { id },
      include: { posts: true }
    })
  }
}
