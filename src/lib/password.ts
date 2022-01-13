import { compare, genSalt, hash as genHash } from 'bcrypt'

export const generatePasswordHash = async (password: string) => {
  const salt = await genSalt()
  return genHash(password, salt)
}

export const comparePassword = async ({ password, hash }: { password: string; hash: string }) => {
  return compare(password, hash)
}
