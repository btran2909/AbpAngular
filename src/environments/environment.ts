import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'AbpAngular',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44315',
    redirectUri: baseUrl,
    clientId: 'AbpAngular_App',
    responseType: 'code',
    scope: 'offline_access openid profile role email phone AbpAngular',
  },
  apis: {
    default: {
      url: 'https://localhost:44350',
      rootNamespace: 'AbpAngular',
    },
  },
} as Environment;
