import { test } from 'node:test';
import assert from 'node:assert/strict';
import { damp } from './hooks/useProductMotion.js';

test('motion easing is independent of 60 vs 120 Hz frame cadence', () => {
  let sixty = 0, oneTwenty = 0;
  for (let i = 0; i < 60; i++) sixty = damp(sixty, 20, 1000 / 60);
  for (let i = 0; i < 120; i++) oneTwenty = damp(oneTwenty, 20, 1000 / 120);
  assert.ok(Math.abs(sixty - oneTwenty) < 0.0001);
  assert.ok(sixty > 19.9 && sixty < 20);
});
test('motion does not overshoot and clamps long frame gaps', () => {
  assert.ok(damp(-8, 12, 16) > -8 && damp(-8, 12, 16) < 12);
  assert.equal(damp(0, 20, 3000), damp(0, 20, 64));
  assert.equal(damp(5, 5, 16), 5);
});
