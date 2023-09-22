import { Controller, Get } from '@nestjs/common';

@Controller('saluti')
export class SalutiController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
