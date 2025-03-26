#!/usr/bin/env node
import { loadTechnologyRadar } from "./lib.ts";

function jsonReplacer(_k: string, v) {
  const date = v?.date;
  if (date && date instanceof Date) {
    return { ...v, date: date.toISOString().slice(0, 10) };
  }
  return v;
}

async function main() {
  console.log(
    JSON.stringify(await loadTechnologyRadar(process.argv[2]), jsonReplacer),
  );
}

main();
