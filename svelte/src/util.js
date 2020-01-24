import { Comparator, Operator } from "helios-schemas";

export function getNewFilter() {
  return {
    filterTerm: {
      comparator: Comparator[Comparator.equals],
      field: "",
      value: ""
    },
    operator: Operator[Operator.none]
  };
}
