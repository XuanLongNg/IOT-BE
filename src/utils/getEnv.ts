export function getEnv(key: string): string {
  const value = process.env[key];
  // console.log({ value });
  if (value) {
    return value;
  }
  throw new Error(`Please set ${key} in your config file`);
}
