export const snakeCaseToString = (input: string, titleCase: boolean = true): string => {
  const words = input.split('_');
  return titleCase
    ? words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
    : words.join(' ').toLowerCase();
};
