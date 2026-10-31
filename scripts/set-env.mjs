import { existsSync, mkdirSync, writeFileSync } from 'node:fs';

const key = process.env.TMDB_API_KEY;

if (!key) {
  if (existsSync('src/environments/environment.ts')) {
    console.log('TMDB_API_KEY tidak diset, memakai file environment yang sudah ada.');
    process.exit(0);
  }
  console.error('TMDB_API_KEY belum diset dan file environment tidak ditemukan.');
  process.exit(1);
}

const make = (production) => `export const environment = {
  production: ${production},
  tmdbApiKey: '${key}',
  tmdbBaseUrl: 'https://api.themoviedb.org/3',
  tmdbImageUrl: 'https://image.tmdb.org/t/p/w500',
};
`;

mkdirSync('src/environments', { recursive: true });
writeFileSync('src/environments/environment.ts', make(true));
writeFileSync('src/environments/environment.development.ts', make(false));
console.log('File environment dibuat dari TMDB_API_KEY.');
