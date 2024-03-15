import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('http://localhost:8000/user', () => {
    return HttpResponse.json({
      firstName: 'John',
      lastName: 'Maverick',
      avatar: null,
    });
  }),
];
