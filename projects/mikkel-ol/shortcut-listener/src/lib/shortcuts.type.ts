import { RecordKey } from "./record-key";

export type Shortcuts<T extends RecordKey> = Record<T, (e: KeyboardEvent) => boolean>;
