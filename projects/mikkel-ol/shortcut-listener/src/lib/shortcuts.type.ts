import { RecordKey } from "./utils/record-key";

export type Shortcuts<T extends RecordKey> = Record<T, (e: KeyboardEvent) => boolean>;
