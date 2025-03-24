import { loadTechnologyRadar } from "./lib.ts"

async function main() {
  console.log(JSON.stringify(await loadTechnologyRadar(process.argv[2])))
}

main()
