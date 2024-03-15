import { DateValues } from 'date-fns';
import { expect, test } from 'vitest';

export function sum(a: number, b: number) {
  return a + b;
}

test('sums up two numbers', () => {
  expect(sum(1, 2)).toBe(3);
});

export function formatDate(date: string | Date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return date.toLocaleDateString('de-De', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

test.todo('handles invalid dates');
test.todo('output the formatted date when the input is a string');
test.todo('output the formatted date when the input is a Date Object');

test('output the formatted date when the input is a string', () => {
  expect(formatDate('03.15.2024')).toBe('3/15/2024');
  expect(formatDate('1.1.2020')).toBe('1/1/2020');
});

test('output the formatted date when the input is a Date object', () => {
  expect(formatDate(new Date())).toBe('3/15/2024');
});

test('handles invalid dates', () => {
  expect(formatDate('JEJEJ')).toBe('Invalid Date');
});
