import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { LoggerService } from 'src/logger/logger.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { Post } from './post.entity'
import { PostCreateDto, PostUpdateDto } from './post.dto'

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private prismaService: PrismaService) {}

  @Mutation((returns) => Post)
  async createPost(
    @Args('payload', { type: () => PostCreateDto }) payload: PostCreateDto,
  ): Promise<Post> {
    const { post } = this.prismaService

    return post.create({
      data: { ...payload },
    })
  }

  @Query((returns) => [Post])
  async getPosts(): Promise<Post[]> {
    const { post } = this.prismaService

    return post.findMany()
  }

  @Query((returns) => Post)
  async getPost(
    @Args('slug', { type: () => String }) slug: string,
  ): Promise<Post | null> {
    const { post } = this.prismaService

    return post.findUnique({ where: { slug } })
  }

  @Mutation((returns) => Post)
  async updatePost(
    @Args('id', { type: () => String }) id: string,
    @Args('payload', { type: () => PostUpdateDto }) payload: PostUpdateDto,
  ): Promise<Post> {
    const { post } = this.prismaService

    return post.update({
      where: { id },
      data: { ...payload },
    })
  }

  @Mutation((returns) => Post)
  async deletePost(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Post> {
    const { post } = this.prismaService

    return post.delete({
      where: { id },
    })
  }
}
