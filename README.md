# techradar2json

## Usage

```sh
$ tree .
.
├── config.yaml
└── technologies
    └── postgresql
        ├── 1970-01-01-adopt.md
        ├── description.md
        └── meta.yaml
$ techradar2json . > technology-radar.json
```

See [the "basic" test fixture](test/fixtures/basic) for a working example of the
configuration files and directory structure.

## meta.yaml

### Schema

```yaml
# The display name of the technology (the technology ID is derived from the
# name of the folder)
name: string

# The URL for the main landing page of the technology (or whatever is most
# informative for the uninitiated)
homepage: string

# The license associated with the technology. Must be one of the following:
# - "open-source"
# - "proprietary"
license: string

# The main category/quadrant in which the technology falls. The possible options
# for this are defined in the `config.yaml`
category: string

# A list of additional custom tags relevant to the technology. The possible
# options for this are defined in the `config.yaml`
tags: string[]

# A list of additional links relevant to the technology (such as further
# documentation or internal-specific resources)
links: string[]
```

### Example

```yaml
name: PostgreSQL
homepage: https://www.postgresql.org/
license: open-source
category: platforms
tags:
  - database
links:
  - https://example.com/first-link
  - https://example.com/second-link
```
