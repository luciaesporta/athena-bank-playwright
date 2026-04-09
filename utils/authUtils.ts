import fs from 'fs/promises';

interface StorageItem {
  name: string;
  value: string;
}

export async function getUserEmailFromFile(path: string): Promise<string> {
  const data = JSON.parse(await fs.readFile(path, 'utf-8'));
  return data.email;
}

export async function getJwtFromStorage(path: string): Promise<string> {
  const data = JSON.parse(await fs.readFile(path, 'utf-8'));
  return data.origins[0]?.localStorage.find((item: StorageItem) => item.name === 'jwt')?.value;
}
