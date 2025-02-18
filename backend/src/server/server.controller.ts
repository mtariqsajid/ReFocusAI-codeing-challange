import { Controller, Get } from '@nestjs/common';

@Controller()
export class ServerController {
  @Get()
  getRoot() {
    const resp = {
      status: true,
      message: 'Server Up and Running!',
    };

    return resp;
  }
}
