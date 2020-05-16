import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
import { InputProduct } from './product.input';

@Resolver('Product')
export class ProductResolver {

    constructor( 
        private readonly productService: ProductService,
    ) { }

    @Query(() => [ ProductDto ]) 
    async getProducts() {
        return await this.productService.getProducts();
    }

    @Mutation(() => ProductDto ) 
    async createProduct(@Args('data') data: InputProduct) {
        return await this.productService.createProduct(data);
    }
}
