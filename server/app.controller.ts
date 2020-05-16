import { AppService } from './app.service';
import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('Index')
  public index() {
    // InitialProps 에 전달.
    return {
      title: 'Nest + Next + Typeorm',
    };
  } 

  @Get('/hello')
  getHello(): string {
      return this.appService.getHello();
  }  
}
