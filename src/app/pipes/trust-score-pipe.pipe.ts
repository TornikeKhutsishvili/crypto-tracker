import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trustScorePipe'
})
export class TrustScorePipePipe implements PipeTransform {

  transform(score: number): string {
    if (score >= 8) return 'text-success';
    if (score >= 5) return 'text-warning';
    return 'text-danger';
  }

}
