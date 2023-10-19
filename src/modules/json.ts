const json = ref('');

export const setJson = (value) => json.value = value;

export const useJson = () => {
  return {
    json
  }
}