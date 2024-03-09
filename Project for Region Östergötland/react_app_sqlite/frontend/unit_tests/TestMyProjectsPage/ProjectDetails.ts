export function addToArray(value: string, parametersChanged: string[]) {
  if (!parametersChanged.includes(value)) {
      parametersChanged.push(value);
  }
}
