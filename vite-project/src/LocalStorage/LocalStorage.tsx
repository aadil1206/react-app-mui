export const useLocalStorage = (key: string) => {
  const setItem = (values: unknown) => {
    window.localStorage.setItem(key, JSON.stringify(values));
  };
  return { setItem };
};
