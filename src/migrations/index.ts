import * as migration_20241006_125401_initial from './20241006_125401_initial';

export const migrations = [
  {
    up: migration_20241006_125401_initial.up,
    down: migration_20241006_125401_initial.down,
    name: '20241006_125401_initial'
  },
];
