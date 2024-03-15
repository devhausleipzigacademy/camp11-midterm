import '@testing-library/jest-dom';

import { server } from './src/mocks/server';
import { beforeAll, afterEach, afterAll } from 'vitest';

// Enable API mocking before all the tests.
beforeAll(() => server.listen());

// Reset the request handlers between each test.
// This way the handlers we add on a per-test basis
// do not leak to other, irrelevant tests.
afterEach(() => server.resetHandlers());

// Finally, disable API mocking after the tests are done.
afterAll(() => server.close());
