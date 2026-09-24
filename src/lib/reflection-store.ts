const KEY_PREFIX = "lumo.reflections.";

export type ReflectionMap = Record<string, string>;

export type MinimalStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export type ResolvedStorage = { storage: MinimalStorage; persistent: boolean };

function memoryStorage(): MinimalStorage {
  const map = new Map<string, string>();
  return {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => void map.set(key, value),
    removeItem: (key: string) => void map.delete(key),
  };
}

let fallback: MinimalStorage | null = null;

export function resolveStorage(provided?: MinimalStorage | null): ResolvedStorage {
  if (provided) {
    try {
      const probe = `__lumo_probe_${Date.now()}`;
      provided.setItem(probe, probe);
      provided.removeItem(probe);
      return { storage: provided, persistent: true };
    } catch {
      /* fall through to shared memory */
    }
  }
  fallback = fallback ?? memoryStorage();
  return { storage: fallback, persistent: false };
}

export function loadReflections(lessonId: string, storage?: MinimalStorage | null): ReflectionMap {
  const { storage: store } = resolveStorage(storage);
  const raw = store.getItem(`${KEY_PREFIX}${lessonId}`);
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return {};
    const out: ReflectionMap = {};
    for (const [blockId, text] of Object.entries(parsed as Record<string, unknown>)) {
      out[blockId] = String(text);
    }
    return out;
  } catch {
    return {};
  }
}

export function saveReflections(
  lessonId: string,
  map: ReflectionMap,
  storage?: MinimalStorage | null,
): void {
  const { storage: store } = resolveStorage(storage);
  try {
    store.setItem(`${KEY_PREFIX}${lessonId}`, JSON.stringify(map));
  } catch {
    /* quota or serialization failure: reflections are best-effort */
  }
}

export function clearReflections(lessonId: string, storage?: MinimalStorage | null): void {
  const { storage: store } = resolveStorage(storage);
  try {
    store.removeItem(`${KEY_PREFIX}${lessonId}`);
  } catch {
    /* best-effort */
  }
}
