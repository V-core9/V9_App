// custom history object to allow navigation outside react components

interface History {
  navigate: Object | unknown | any,
  location: unknown
}

export const history: History = {
  navigate: null,
  location: null
};
