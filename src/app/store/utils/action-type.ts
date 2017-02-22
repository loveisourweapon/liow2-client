const actionTypeCache: { [label: string]: boolean } = { };
export function actionType<T>(label: T | ''): T {
  if (actionTypeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  actionTypeCache[<string>label] = true;

  return <T>label;
}
