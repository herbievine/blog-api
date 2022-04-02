import { Resolver, Args, Mutation, Query } from '@nestjs/graphql'
import { PrismaService } from 'src/prisma/prisma.service'
import { Category } from './category.entity'
import { CategoryCreateDto, CategoryUpdateDto } from './category.dto'
import { PostCreateDto } from 'src/posts/post.dto'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/guards/gql.guard'
import { CategoriesService } from './categories.service'

@Resolver((of) => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation((returns) => Category)
  @UseGuards(GqlAuthGuard)
  async createCategory(
    @Args('payload', { type: () => CategoryCreateDto })
    payload: CategoryCreateDto,
    @Args('relations', { type: () => [PostCreateDto], nullable: true })
    relations?: PostCreateDto[]
  ): Promise<Category> {
    return await this.categoriesService.createCategory(payload, relations)
  }

  @Query((returns) => [Category])
  async categories(): Promise<Category[]> {
    return await this.categoriesService.getCategories()
  }

  @Query((returns) => Category)
  async category(
    @Args('name', { type: () => String }) name: string
  ): Promise<Category | null> {
    return await this.categoriesService.getCategory(name)
  }

  @Mutation((returns) => Category)
  @UseGuards(GqlAuthGuard)
  async updateCategory(
    @Args('id', { type: () => String }) id: string,
    @Args('payload', { type: () => CategoryUpdateDto })
    payload: CategoryUpdateDto,
    @Args('relations', { type: () => [PostCreateDto], nullable: true })
    relations?: PostCreateDto[]
  ): Promise<Category> {
    return await this.categoriesService.updateCategory(id, payload, relations)
  }

  @Mutation((returns) => Category)
  @UseGuards(GqlAuthGuard)
  async deleteCategory(
    @Args('id', { type: () => String }) id: string
  ): Promise<Category> {
    return await this.categoriesService.deleteCategory(id)
  }
}
