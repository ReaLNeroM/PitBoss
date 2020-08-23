export interface ConfigFlags {
  origin: string,
  isSecure: boolean,
  printStack: boolean
}

export function devOrProductionFlags(): ConfigFlags {
  if (process.env.DEV === 'dev') {
    return {
      origin: 'http://localhost:3000',
      isSecure: false,
      printStack: true,
    };
  }

  return {
    origin: 'https://realnerom.github.io',
    isSecure: true,
    printStack: false,
  };
}
