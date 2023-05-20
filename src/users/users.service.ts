import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'dummy',
            password: 'dummy',
        }
    ]

    async find(username: string): Promise<User | undefined> {
        return this.users.find(u => u.username === username);
    }
}
