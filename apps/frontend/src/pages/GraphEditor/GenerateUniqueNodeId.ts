import { nanoid } from "nanoid";

export function generateUniqueNodeId() {
  const arbitraryButShortIdLength = 4;
 
  return nanoid(arbitraryButShortIdLength);
}



