export enum CacheExpiration {
    DAILY = 24 * 60 * 60 * 1000
}

interface CacheEntry<T> {
    data: T;
    expiration: number;
}

export class LocalCache<T> {
    private readonly cache: Map<string, CacheEntry<T>>;

    constructor(private cacheExpiration: CacheExpiration) {
        this.cache = new Map<string, CacheEntry<T>>();
    }

    public set(key: string, data: T): void {
        const expiration = Date.now() + this.cacheExpiration;
        this.cache.set(key, { data, expiration });
    }

    public get(key: string): T | null {
        const entry = this.cache.get(key);

        if (entry) {
            if (Date.now() >= entry.expiration) {
                this.cache.delete(key);
                return null;
            }
            return entry.data;
        }

        return null;
    }
}
