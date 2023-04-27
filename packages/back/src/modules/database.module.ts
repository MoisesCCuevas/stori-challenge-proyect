import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@localhost:27017', {
      user: "root",
      pass: "root",
      dbName: "Newsletters"
    }),
  ],
  providers: [],
  exports: [MongooseModule]
})
export class DatabaseModule {}
