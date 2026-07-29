import { parseCoordinates } from './coordinates';

describe('parseCoordinates', () => {
  it('reads latitude first, then longitude', () => {
    // Athens, Greece.
    expect(parseCoordinates('37.9838, 23.7275')).toEqual({ lat: 37.9838, lng: 23.7275 });
  });
});
