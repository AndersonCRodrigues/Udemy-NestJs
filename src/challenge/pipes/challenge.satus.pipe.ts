import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ChallengeStatus } from '../interfaces/challenge.status.enum';

export class ChallengeStatusValidation implements PipeTransform {
  readonly statusAlllowed = [
    ChallengeStatus.ACCEPT,
    ChallengeStatus.DENIED,
    ChallengeStatus.CANCELED,
  ];

  transform(value: any) {
    const status = value.status.toUpperCase();

    if (!this.ehStatusAlllowed(status)) {
      throw new BadRequestException(`status ${status} is not valid`);
    }
  }

  private ehStatusAlllowed(status: any) {
    const index = this.statusAlllowed.indexOf(status);

    return index !== -1;
  }
}
