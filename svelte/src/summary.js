export function summarizeRule(rule) {
  return `Rule for ${rule.event_id} will fire when <br/>${summarizeFilter(
    rule.filter
  )}`;
}

function summarizeFilter(filter) {
  if (filter.operator === "none") {
    return `<div class="rItem">${summarizeFilterTerm(filter.filterTerm)}</div>`;
  }
  return `<div class="rItem">( ${filter.children
    .map(summarizeFilter)
    .join(
      `<div class="rItem"><div class="rItem">${filter.operator} </div></div>`
    )} )</div>`;
}

function summarizeFilterTerm(term) {
  return `<div class="rItem">${term.field} ${getSymbol(term.comparator)} ${
    term.value
  }</div>`;
}

function getSymbol(str) {
  const data = {
    equals: "is",
    notEquals: "is not",
    and: "&&",
    or: "||"
  };
  return data[str] || str;
}

// summarizeRule({
//   created: "1,579,890,389,270",
//   event_id: "mercury.helios.ui55.event.chat-created",
//   filter: {
//     children: [
//       {
//         children: [],
//         filterTerm: {
//           comparator: "notEquals",
//           field: "severity",
//           value: "High"
//         },
//         operator: "none"
//       },
//       {
//         children: [
//           {
//             children: [],
//             filterTerm: {
//               comparator: "equals",
//               field: "productID",
//               value: "Test"
//             },
//             operator: "none"
//           },
//           {
//             children: [],
//             filterTerm: {
//               comparator: "equals",
//               field: "severity",
//               value: "Low"
//             },
//             operator: "none"
//           }
//         ],
//         operator: "or"
//       },
//       {
//         children: [],
//         filterTerm: {
//           comparator: "equals",
//           field: "severity",
//           value: "Low"
//         },
//         operator: "none"
//       }
//     ],
//     filterTerm: null,
//     operator: "and"
//   },
//   webhook_id: "mercury.helios.ui55.webhook.yk7ogqk5se06q8",
//   id: "mercury.helios.ui55.rule.yk7ogqk5shy2ae"
// });
