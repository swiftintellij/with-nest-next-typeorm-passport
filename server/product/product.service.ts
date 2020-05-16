import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductDto } from './product.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ) { }

    async createProduct(data: ProductDto) {
        return await this.productRepository.create(data).save();
    }

    async getProducts() {
        return await this.productRepository.find();
    }
}
