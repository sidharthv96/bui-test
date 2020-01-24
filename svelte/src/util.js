import { Comparator, Operator } from "helios-schemas";

export function getNewFilter() {
  return {
    children: [],
    filterTerm: {
      comparator: Comparator[Comparator.equals],
      field: "",
      value: ""
    },
    operator: Operator[Operator.none]
  };
}
