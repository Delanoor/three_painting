import { LevaPanel, useCreateStore } from "leva";

export function Panel() {
  return <LevaPanel />;
}

export function useControls() {
  const store = useCreateStore();
  return store;
}
