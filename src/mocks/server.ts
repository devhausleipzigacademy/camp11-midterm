import { setupServer } from 'msw/node';
import { http } from 'msw';
import { handlers } from './handlers';

export const mswServer = setupServer(...handlers);
export { mswServer as server, http };
