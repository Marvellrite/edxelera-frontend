type StorageArea = "local" | "session";

function getStorage(area: StorageArea) {
  if (typeof window === "undefined") {
    return null;
  }

  return area === "local" ? window.localStorage : window.sessionStorage;
}

function getItem(key: string, area: StorageArea = "local") {
  return getStorage(area)?.getItem(key) ?? null;
}

function setItem(key: string, value: string, area: StorageArea = "local") {
  getStorage(area)?.setItem(key, value);
}

function removeItem(key: string, area: StorageArea = "local") {
  getStorage(area)?.removeItem(key);
}

export const storageService = {
  getItem,
  setItem,
  removeItem,
};
