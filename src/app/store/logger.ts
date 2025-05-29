export const logger = () => (next: any) => (action: any) => {
  console.group(action.type);
  console.info("Dispatching:", action);
  const result = next(action);
  console.groupEnd();
  return result;
};
