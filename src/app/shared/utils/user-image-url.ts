/**
 * Use DiceBear (www.dicebear.com) for random user images
 * ref: https://www.dicebear.com/styles/thumbs/
 *
 * @param userId a unique id used as the seed for the random user image
 */
export function getUserImageUrl(userId: string): string {
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${userId}&scale=75&shapeColor=ffc4c0,f1f4dc,69d2e7&backgroundColor=a30d02,0b5c83,cd5c14`;
}
