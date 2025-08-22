export class StorageService {
  private storage: Storage;

  constructor() {
    if (typeof window === 'undefined' || !window.localStorage) {
      throw new Error('StorageService is not available on the client');
    }

    this.storage = localStorage;
  }

  get(key: string): string | null {
    return this.storage.getItem(key);
  }

  set(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }
};

export default new StorageService();