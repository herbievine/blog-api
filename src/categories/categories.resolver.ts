import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { LoggerService } from 'src/logger/logger.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { Category } from './Category.entity'
import { CategoryCreateDto, CategoryUpdateDto } from './Category.dto'

@Resolver((of) => Category)
export class CategoriesResolver {
  constructor(private prismaService: PrismaService) {}

  @Mutation((returns) => Category)
  async createCategory(
    @Args('payload', { type: () => CategoryCreateDto }) payload: CategoryCreateDto,
  ): Promise<Category> {
    const { category } = this.prismaService

    return category.create({
      data: { ...payload },
    })
  }

  @Query((returns) => [Category])
  async getCategories(): Promise<Category[]> {
    const { category } = this.prismaService

    return category.findMany()
  }

  @Query((returns) => Category)
  async getCategory(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Category | null> {
    const { category } = this.prismaService

    return category.findUnique({ where: { id } })
  }

  @Mutation((returns) => Category)
  async updateCategory(
    @Args('id', { type: () => String }) id: string,
    @Args('payload', { type: () => CategoryUpdateDto }) payload: CategoryUpdateDto,
  ): Promise<Category> {
    const { category } = this.prismaService

    return category.update({
      where: { id },
      data: { ...payload },
    })
  }

  @Mutation((returns) => Category)
  async deleteCategory(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Category> {
    const { category } = this.prismaService

    return category.delete({
      where: { id },
    })
  }
}
