import {pluralize} from "numeralize-ru";

export default function declOfNum(number, ...words) {
  if (number !== Math.round(number)) return words[1]
  else return pluralize(number, ...words);
}
