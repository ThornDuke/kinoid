const kinoid = require('../index');

describe('Kinoid Library', () => {
  const { newId, decodeId } = kinoid();

  test('should generate a valid ID', () => {
    const id = newId();
    expect(id).toMatch(/^[a-z0-9]{17}$/);
  });

  test('should decode a valid ID', () => {
    const id = newId();
    const decoded = decodeId(id);
    expect(decoded).toHaveProperty('id', id);
    expect(decoded).toHaveProperty('date');
    expect(decoded).toHaveProperty('singularity');
    expect(decoded).toHaveProperty('pid');
  });

  test('should return an error for an invalid ID', () => {
    const invalidId = 'invalid123';
    const result = decodeId(invalidId);
    expect(result).toHaveProperty('error');
  });
});
