import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { ProductModule } from './product/product.module';
import dotenv from 'dotenv';
import { GraphQLModule } from '@nestjs/graphql';
import { Product } from './product/product.entity';

dotenv.config();

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: 'schema.gpl'
		}),
		RenderModule.forRootAsync(Next({ dev: process.env.NODE_ENV !== 'production' })),
		TypeOrmModule.forRoot({
			"type": "postgres",
			"host": process.env.DB_HOST,
			"port": Number(process.env.DB_PORT),
			"username": process.env.DB_USERNAME,
			"password": process.env.DB_PASSWORD,
			"database": process.env.DB_DATABASE,
			"extra": {
				"ssl": {
					"rejectUnauthorized": false
				}
			},
			"entities": [User, Product],
		}),
		UserModule,
		ProductModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
