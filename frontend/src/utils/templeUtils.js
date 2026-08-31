/**
 * Resolves a temple's string ID from either an object with an _id property or a primitive value.
 * Returns null for null/undefined entries or objects without a valid _id.
 */
export const getTempleId = (entry) => {
  if (entry === null || entry === undefined) {
    return null;
  }
  if (typeof entry === 'object') {
    return entry._id !== null && entry._id !== undefined ? entry._id.toString() : null;
  }
  return entry.toString();
};

/**
 * Checks whether a given temple is present in the savedTemples array.
 * Handles null/undefined entries, primitive IDs, and full temple objects safely.
 */
export const isTempleSaved = (savedTemples, temple) => {
  if (!Array.isArray(savedTemples) || temple === null || temple === undefined) {
    return false;
  }
  const targetId = getTempleId(temple);
  if (targetId === null) {
    return false;
  }
  return savedTemples.some((entry) => {
    const entryId = getTempleId(entry);
    return entryId !== null && entryId === targetId;
  });
};
