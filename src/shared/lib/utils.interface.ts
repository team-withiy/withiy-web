export type MakeKeyRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type Nullable<T> = T extends object ? { [K in keyof T]: T[K] | null } : T | null;
