## WEB

#### Project Goal

To build a web framework using TS

#### Steps To Run

##### 1. Install Dependencies

```
npm i
```

##### 2. Start db server

```
npm run start:db
```

##### 2. Start frontend

```
npm run start:parcel
```

#### Notes For Dev

#### V1

User Class with a bunch of fn for getting, setting, save and fetch user from backend. Also user class has events associated with it.

#### V2

Seperated Users fn into seperate classes using composition.

```
get(propName: string): string | number {
    return this.data[propName]
  }
```

Main point of discussion - Return type of this fn should be something generic rather than string or number.
Also every time we use this fn we get result of type string | number. So we need type guard to access properties specific to number or string.
