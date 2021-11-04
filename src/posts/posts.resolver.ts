import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { PrismaService } from 'src/prisma/prisma.service'
import { Post } from './post.entity'
import { PostCreateDto, PostUpdateDto } from './post.dto'
import { CategoryCreateDto } from 'src/categories/category.dto'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/guards/gql.guard'

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Mutation((returns) => Post)
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args('payload', { type: () => PostCreateDto }) payload: PostCreateDto,
    @Args('relations', { type: () => [CategoryCreateDto], nullable: true })
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

  @Query((returns) => [Post])
  async getPosts(): Promise<Post[]> {
    const { post } = this.prismaService

    return post.findMany({ include: { categories: true } })
  }

  @Query((returns) => Post)
  async getPost(
    @Args('slug', { type: () => String }) slug: string
  ): Promise<Post | null> {
    const { post } = this.prismaService

    return post.findUnique({ where: { slug }, include: { categories: true } })
  }

  @Mutation((returns) => Post)
  @UseGuards(GqlAuthGuard)
  async updatePost(
    @Args('id', { type: () => String }) id: string,
    @Args('payload', { type: () => PostUpdateDto }) payload: PostUpdateDto,
    @Args('relations', { type: () => [CategoryCreateDto], nullable: true })
    relations?: CategoryCreateDto[]
  ): Promise<Post> {
    const { post } = this.prismaService

    return post.update({
      where: { id },
      data: {
        ...payload,
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

  @Mutation((returns) => Post)
  @UseGuards(GqlAuthGuard)
  async deletePost(
    @Args('id', { type: () => String }) id: string
  ): Promise<Post> {
    const { post } = this.prismaService

    return post.delete({
      where: { id },
      include: { categories: true }
    })
  }
}
