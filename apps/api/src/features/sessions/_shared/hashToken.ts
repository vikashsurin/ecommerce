// TODO: use env for secret
const secret = 'temp_secret';

export const hashToken = (token: string) => {
  const hasher = new Bun.CryptoHasher("sha256", secret);
  const hash = hasher.update(token).digest("hex");
  return hash;
}
