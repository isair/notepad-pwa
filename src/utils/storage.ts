export enum StorageKey {
  shouldAutoSave = 'shouldAutoSave',
}

const defaults = {
  shouldAutoSave: false,
};

export function getItem<T>(key: StorageKey): T {
  const rawValue = localStorage.getItem(key);
  if (!rawValue) return (defaults[key] as unknown) as T;
  return JSON.parse(rawValue);
}

export function setItem<T>(key: StorageKey, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}
