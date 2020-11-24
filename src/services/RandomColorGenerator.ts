import randomColor from 'randomcolor';

export class RandomColorGenerator {
  static generate(): string {
    return randomColor({
      luminosity: 'dark',
    });
  }
}
