export const parseUrlId = (url: string) => {
  const id = url.split('/').at(-1);
  return id!;
};
