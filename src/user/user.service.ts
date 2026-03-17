import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { error } from 'console';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async register(email: string, password: string): Promise<{ id: number; email: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error('User already exists');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        email: true,
      },
    });
    return newUser;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new error('Invalid email or password');
    }
    const payload = { userId: user.id, email: user.email };
    const secretKey = process.env.JWT_SECRET || 'your_secret_key';
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h'});
    return { token };
  }
}
