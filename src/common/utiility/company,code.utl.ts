import { Injectable } from '@nestjs/common';

@Injectable()
export class CodeGeneratorUtil {
  generateCompanyCode(companyName: string, prefix: string): string {
    const cleanName = companyName.replace(/\s+/g, '').toUpperCase();
    const namePart = cleanName.substring(0, 3).padEnd(3, 'X');
   const digitPart = Math.floor(10 + Math.random() * 90).toString();
    const totalLength = 8;
    const randomLength = totalLength - (prefix.length + namePart.length);
 

    const randomPart = Array.from({ length: randomLength })
      .map(() => Math.random().toString(36)[2])
      .join('')
      .toUpperCase();

    return `${prefix}${namePart}${digitPart}${randomPart}`;
  }
}