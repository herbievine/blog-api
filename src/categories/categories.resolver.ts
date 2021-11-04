import { Resolver, Args, Mutation, Query } from '@nestjs/graphql'
import { PrismaService } from 'src/prisma/prisma.service'
import { Category } from './category.entity'
import { CategoryCreateDto, CategoryUpdateDto } from './category.dto'
import { PostCreateDto } from 'src/posts/post.dto'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/guards/gql.guard'

@Resolver((of) => Category)
export class CategoriesResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Mutation((returns) => Category)
  @UseGuards(GqlAuthGuard)
  async createCategory(
    @Args('payload', { type: () => CategoryCreateDto })
    payload: CategoryCreateDto,
    @Args('relations', { type: () => [PostCreateDto], nullable: true })
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

  @Query((returns) => [Category])
  async getCategories(): Promise<Category[]> {
    const { category } = this.prismaService

    return category.findMany({ include: { posts: true } })
  }

  @Query((returns) => Category)
  async getCategory(
    @Args('name', { type: () => String }) name: string
  ): Promise<Category | null> {
    const { category } = this.prismaService

    return category.findUnique({ where: { name }, include: { posts: true } })
  }

  @Mutation((returns) => Category)
  @UseGuards(GqlAuthGuard)
  async updateCategory(
    @Args('id', { type: () => String }) id: string,
    @Args('payload', { type: () => CategoryUpdateDto })
    payload: CategoryUpdateDto
  ): Promise<Category> {
    const { category } = this.prismaService

    return category.update({
      where: { id },
      data: { ...payload },
      include: { posts: true }
    })
  }

  @Mutation((returns) => Category)
  @UseGuards(GqlAuthGuard)
  async deleteCategory(
    @Args('id', { type: () => String }) id: string
  ): Promise<Category> {
    const { category } = this.prismaService

    return category.delete({
      where: { id },
      include: { posts: true }
    })
  }
}
