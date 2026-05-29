import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  
  // Onde o Jest procura os testes
  testMatch: ['**/__tests__/**/*.test.ts', '**/*.spec.ts'],

  // Path aliases — precisa espelhar o tsconfig.json
  moduleNameMapper: {
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
  },

  // Configurações do ts-jest
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },

  // Arquivo que roda antes de cada suite de testes
  setupFilesAfterEnv : ['<rootDir>/src/shared/tests/setup.ts'],

  // Cobertura de código
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/server.ts',
  ],

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}

export default config