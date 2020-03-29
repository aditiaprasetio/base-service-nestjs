import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerBaseConfig,
  SwaggerDocument,
  SwaggerModule,
} from '@nestjs/swagger';
import _ from 'lodash';

export function SwaggerBuilder(
  app: INestApplication,
  config: any,
): SwaggerDocument {
  if (!config.STAGE) config.STAGE = 'LOCAL';
  else config.STAGE = config.STAGE.toUpperCase();

  const setSchemes: ('http' | 'https')[] =
    config.STAGE === 'LOCAL' ? ['http'] : ['https', 'http'];

  const option: SwaggerBaseConfig = new DocumentBuilder()
    .setTitle(config.APP_NAME + ' Service')
    .setDescription('API Service Documentation')
    .addBearerAuth()
    .setVersion(`v${config.APP_VERSION}-${config.STAGE.toLowerCase()}`)
    .setSchemes(...setSchemes)
    .build();

  const result = SwaggerModule.createDocument(app, option);

  for (const key of Object.keys(result.paths)) {
    for (const keyMethod of Object.keys(result.paths[key])) {
      if (result.paths[key][keyMethod].parameters && Array.isArray(result.paths[key][keyMethod].parameters)) {
        result.paths[key][keyMethod].parameters.push({
          type: 'string',
          name: 'realm',
          required: true,
          in: 'header',
        });
      }
    }
  }

  return result;
}
