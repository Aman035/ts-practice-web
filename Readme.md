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
<u>Issues</u>
We want to build a web frame where classes are more generalized and can be used with every usecase rather than just having a User class with some fn. Imagine someone wanting to create a blog project.

#### V2

Seperated Users fn into seperate classes using composition.

```
## Attributes Class
get(propName: string): string | number {
    return this.data[propName]
}
```

<u>Issues</u>
Return type of this fn should be something generic rather than string or number.
Also every time we use this fn we get result of type string | number. So we need type guard to access properties specific to number or string.

#### V3

Made the return type of get fn as generic so that we don't even need type guards for processing the returned value

```
## Attributes Class
get<K extends keyof T>(propName: K): T[K] {
  return this.data[propName]
}

const attribute = new Attribute<{name: string; age: number}>({name: 'Aman', age: 20});

// type of name is string by default
const name = attribute.get('name');
// type of age is number by default
const age = attribute.get('age')'
```

<u>Issues</u>
The composition done has made using the User class even complex rather than simplifying it.

```
// In V1
const user = new User({name: 'aman', age: 22});
user.save()

// In V3
const user = new User({name: 'Aman', age: 22});
const name = user.attributes.get('name');
const age = user.attributes.get('age');
user.sync.save({name: name, age: age});
```

#### V4

Added getters and some fn in user class which makes accessing different fn much easy.
Also changed to arrow fns to create bound functions.
<u>Issues</u>
All fn are still tied to User class making it less reusable
The variables events, attributes, sync are public which is not not desirable since we would want devs to use only the functions
Types of these variables r same as type of classes which means they will not be swapped easily.
user.sync is of type Sync, if we want to swap it out we need to specifiy a generalized interface which should be specified.
