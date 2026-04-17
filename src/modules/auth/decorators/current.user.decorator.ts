import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const CurrentUserId = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }
    if (data && !(data in user)) {
      throw new UnauthorizedException(
        `The field ${data} does not exist in the user information.`);
    }
    if (data && user) {
      return user[data];
    }
    return user;
  },
);
