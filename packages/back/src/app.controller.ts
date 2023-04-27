import { Controller, Param, Get } from '@nestjs/common';
import { RecipientService } from './services/recipient.service';

@Controller('unsubscribe')
export class AppController {
  constructor(
    private recipientService: RecipientService
  ) {}

  @Get(":idNewsletter/:idUser")
  async unsubscribe(@Param('idNewsletter') idNewsletter: string, @Param('idUser') idUser: string) {
    return this.recipientService.unsubscribeRecipient(idNewsletter, idUser);
  }
}
