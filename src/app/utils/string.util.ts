export const snakeCaseToString = (input: string, titleCase: boolean = true): string => {
  const words = input.split('_');
  return titleCase
    ? words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
    : words.join(' ').toLowerCase();
};

export const getDateOnly = (input: string = '') => new Date(input).toISOString().split('T')[0];
