export type MakeUnionRequired<T> = T extends null ? never : T extends undefined ? never : T;

export type MakeKeyRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type Nullable<T> = T extends object ? { [K in keyof T]: T[K] | null } : T | null;

export type Nilable<T> = T extends object ? { [K in keyof T]: T[K] | null | undefined } : T | null | undefined;
