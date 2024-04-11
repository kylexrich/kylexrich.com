export enum CacheExpiration {
    DAILY = 24 * 60 * 60 * 1000
}

interface CacheEntry<T> {
    data: T;
    lastUpdated: number;
}

export class MultiValueCache<T> {
    private readonly cacheExpiration: number;
    private readonly cache: Map<string, CacheEntry<T>>;

    constructor(cacheExpiration: CacheExpiration) {
        this.cacheExpiration = cacheExpiration;
        this.cache = new Map<string, CacheEntry<T>>();
    }

    public set(key: string, data: T): void {
        const lastUpdated = Date.now();
        this.cache.set(key, { data, lastUpdated });
    }

    public get(key: string): T | null {
        const entry = this.cache.get(key);
        if (entry) {
            if (Date.now() >= entry.lastUpdated + this.cacheExpiration) {
                this.cache.delete(key);
                return null;
            }
            return entry.data;
        }
        return null;
    }
}

export class SingleValueCache<T> {
    private readonly cacheExpiration: number;
    private cacheEntry: CacheEntry<T> | null = null;

    constructor(cacheExpiration: CacheExpiration) {
        this.cacheExpiration = cacheExpiration;
    }

    public set(data: T): void {
        const lastUpdated = Date.now();
        this.cacheEntry = { data, lastUpdated };
    }

    public get(): T | null {
        if (this.cacheEntry) {
            if (Date.now() >= this.cacheEntry.lastUpdated + this.cacheExpiration) {
                this.cacheEntry = null;
                return null;
            }
            return this.cacheEntry.data;
        }
        return null;
    }
}
