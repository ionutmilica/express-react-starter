## Express-React-Starter

This is a starter project that can be used to bootstrap full-stack applications using Node (Express), Redis, MySQL and React.

Project goals:
- Keep everything as simple as possible
- Have a development environment that's easy to setup
- Infrastructure scripts that allows provision & deployments in VPS.

### Running the api & ui
```bash
$ make all
```

### Running only the dependencies
In order to run only dependencies needed by the apps someone can run:
```bash
$ make deps
```
Given that some dependencies are started in background you can stop them with:
```bash
$ make stop
```

### License
MIT
