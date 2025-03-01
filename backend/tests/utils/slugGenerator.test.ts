import { generateSlug } from '../../src/utils/slugGenerator.utils';

describe('generateSlug', () => {
  it('should generate a 7-character string', () => {
    const slug = generateSlug();
    expect(slug).toHaveLength(7);
  });

  it('should generate alphanumeric characters only', () => {
    const slug = generateSlug();
    const regex = /^[0-9A-Za-z]{7}$/;
    expect(regex.test(slug)).toBe(true);
  });

  it('should generate different slugs on subsequent calls', () => {
    const slug1 = generateSlug();
    const slug2 = generateSlug();
    expect(slug1).not.toEqual(slug2);
  });
});
