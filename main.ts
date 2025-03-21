import { readdir, readFile } from "node:fs/promises"
import { basename, dirname, join } from "node:path"
import { parse } from "yaml"


interface Declaration {
  name: string
  id: string
}

type RatingDeclaration = Declaration
type CategoryDeclaration = Declaration

interface RootConfiguration {
  ratings: RatingDeclaration[]
  categories: CategoryDeclaration[]
  tags: string[]
}

interface Post {
  date: Date
  rating: string
  content: string
}

interface Meta {
  name: string
  homepage: string
  license: "open-source" | "proprietary"
  category: string
  tags: string[]
  links: string[]
}

interface Technology extends Meta {
  id: string
  description: string
  posts: Post[]
}


const POST_FILENAME_REGEX = /(\d{4}-\d{2}-\d{2})-([-a-z]+)\.md/g
const REQUIRED_FILES = new Set(["meta.yaml", "description.md"])


async function loadRootConfiguration(path: string): Promise<RootConfiguration> {
  return parse(await readFile(path, "utf8"))
}


async function loadPost(path: string): Promise<Post> {
  const filename = basename(path)
  const [, dateString, rating] = POST_FILENAME_REGEX.exec(filename)
  return {
    rating,
    date: new Date(dateString),
    content: await readFile(path, "utf8"),
  }
}


async function loadTechnology(path: string): Promise<Technology> {
  const id = basename(path)
  const filenames = new Set(await readdir(path))
  if (!filenames.isSupersetOf(REQUIRED_FILES)) {
    throw new Error(`${path}: A "meta.yaml" or "description.md" was not found`)
  }
  const [metaContents, description] = await Promise.all([
    readFile(join(path, "meta.yaml"), "utf8"),
    readFile(join(path, "description.md"), "utf8"),
  ])
  const meta: Meta = await parse(metaContents)
  const postnames = [...filenames.difference(REQUIRED_FILES)]
  const posts = await Promise.all(postnames.map(p => loadPost(join(path, p))));
  return { ...meta, id, description, posts }
}


async function loadTechnologies(path: string): Promise<Technology[]> {
  const folders = await readdir(path)
  const paths = folders.map(f => join(path, f))
  return Promise.all(paths.map(loadTechnology))
}


async function main() {
  const folder = join(dirname(process.argv[2]), "technologies/")
  const [configuration, technologies] = await Promise.all([
    loadRootConfiguration(process.argv[2]),
    loadTechnologies(folder),
  ])
  console.log(JSON.stringify({ configuration, technologies }))
}


main()
