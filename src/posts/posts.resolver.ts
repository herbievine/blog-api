import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { Post } from './post.entity'
import { PostCreateDto, PostUpdateDto } from './post.dto'
import { CategoryCreateDto } from 'src/categories/category.dto'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/guards/gql.guard'
import { PostsService } from './posts.service'

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation((returns) => Post)
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args('payload', { type: () => PostCreateDto }) payload: PostCreateDto,
    @Args('relations', { type: () => [CategoryCreateDto], nullable: true })
    relations?: CategoryCreateDto[]
  ): Promise<Post> {
    return await this.postsService.createPost(payload, relations)
  }

  @Query((returns) => [Post])
  async posts(): Promise<Post[]> {
    return await this.postsService.getPosts()
  }

  @Query((returns) => Post)
  async post(
    @Args('slug', { type: () => String }) slug: string
  ): Promise<Post | null> {
    return await this.postsService.getPost(slug)
  }

  @Mutation((returns) => Post)
  @UseGuards(GqlAuthGuard)
  async updatePost(
    @Args('id', { type: () => String }) id: string,
    @Args('payload', { type: () => PostUpdateDto }) payload: PostUpdateDto,
    @Args('relations', { type: () => [CategoryCreateDto], nullable: true })
    relations?: CategoryCreateDto[]
  ): Promise<Post> {
    return await this.postsService.updatePost(id, payload, relations)
  }

  @Mutation((returns) => Post)
  @UseGuards(GqlAuthGuard)
  async deletePost(
    @Args('id', { type: () => String }) id: string
  ): Promise<Post> {
    return await this.postsService.deletePost(id)
  }
}
