import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UserDocument, UserSchema } from './models/user.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
