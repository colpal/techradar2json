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
