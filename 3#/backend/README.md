# BACKEND

## Table of Contents

* [Getting Started](#getting_started)

# Getting Started

## Installing

1. Install node_modules

``` 
yarn install
```

#### DATABASE 

##### Create a Migration (Only if there's no migrations file)

``` 
yarn typeorm migration:create -n create_orphanages
```

```
yarn typeorm migration:create -n create_images
```

2. Create a Orphanages Table 

``` 
yarn typeorm migration:run
```

##### Drop a Orphanages Table 

``` 
yarn typeorm schema:drop
```

#### BACKEND

3. Run

``` 
yarn dev
```
