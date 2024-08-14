export const getHeight = (requestedHeight: number, maxHeight: number): number =>
  requestedHeight > maxHeight ? maxHeight : requestedHeight;
