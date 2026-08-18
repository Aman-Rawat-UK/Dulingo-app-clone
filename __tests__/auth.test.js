const { requestCode, verifyCode } = require('../src/lib/auth');

describe('auth helpers - production behavior', () => {
  const OLD_ENV = process.env.NODE_ENV;
  beforeEach(() => {
    jest.resetModules();
    process.env.NODE_ENV = 'production';
    global.fetch = jest.fn();
  });
  afterEach(() => {
    process.env.NODE_ENV = OLD_ENV;
    global.fetch = undefined;
  });

  test('requestCode returns error when route is 404 in production', async () => {
    global.fetch.mockResolvedValue({ status: 404, ok: false, json: async () => ({}) });
    const res = await requestCode('a@b.com');
    expect(res.success).toBe(false);
    expect(res.error).toMatch(/not available/i);
  });

  test('requestCode returns error on network failure in production', async () => {
    global.fetch.mockRejectedValue(new Error('network failed'));
    const res = await requestCode('a@b.com');
    expect(res.success).toBe(false);
    expect(res.error).toMatch(/network/i);
  });
});

describe('auth helpers - development fallback', () => {
  const OLD_ENV = process.env.NODE_ENV;
  beforeEach(() => {
    jest.resetModules();
    process.env.NODE_ENV = 'development';
    global.fetch = jest.fn();
  });
  afterEach(() => {
    process.env.NODE_ENV = OLD_ENV;
    global.fetch = undefined;
  });

  test('requestCode returns success when route is 404 in dev', async () => {
    global.fetch.mockResolvedValue({ status: 404, ok: false, json: async () => ({}) });
    const res = await requestCode('a@b.com');
    expect(res.success).toBe(true);
  });

  test('requestCode falls back to success on network error in dev', async () => {
    global.fetch.mockRejectedValue(new Error('network failed'));
    const res = await requestCode('a@b.com');
    expect(res.success).toBe(true);
  });
});
