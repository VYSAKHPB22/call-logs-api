import { Global, Module } from '@nestjs/common';
import { CodeGeneratorUtil } from './utiility/company,code.utl';


@Global()
@Module({
  providers: [CodeGeneratorUtil],
  exports: [CodeGeneratorUtil],
})
export class CommonModule {}