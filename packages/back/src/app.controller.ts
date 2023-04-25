import { Controller, Param, Get } from '@nestjs/common';
import { RecipientService } from './services/recipient.service';

@Controller('unsubscribe')
export class AppController {
  constructor(
    private recipientService: RecipientService
  ) {}

  @Get(":idNewsletter/:idUser")
  unsubscribe(@Param('idNewsletter') idNewsletter: number, @Param('idUser') idUser: number) : string {
    return this.recipientService.unsubscribeRecipient(idNewsletter, idUser);
  }
}
