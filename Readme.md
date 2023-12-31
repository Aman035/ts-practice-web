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

#### V5

Addressed all the issues of V4 by defining generic class Modal with specific interfaces.
Reason of Using Inheritence instead of Composition in User class - If we had used Composition then again we would need to call User.modal.get and so on and we would again need some getter declarations. Also every user has a base modal ( has a relationship ).
Also this base modal is not something which we ever want to swap so inheritence seems to be a better choice here.

#### V6

Building up a generic collection class with deserialize method ie which takes data of some type and convert it to some other type
This collection class can be used to create collection of any modal class. ( We use it to create user collection in this project )

#### V7

Set up a UserView class to display user info, have some events, updates some info of user and rerenders DOM similar to React based approach
<u>Issues</u>
This is a a non-generic class and is not at all reusable

#### V8

Created a Generic class View
Imp Points to Note

1. UserForm is implemented as chld of View class using Inheritence. This could also be achieved using composition but that would be more troublesome and would be bi-drectional because some generic fn of View would be using specific fn od userForm. So inheritence seems to be a better option
2. Generic type of View - We assumed that only a model can call a View class, hence the type, we could have just created an interface containing on fn and that would also work, but that approach would not have been ideal.

#### V9

Created UserEdit , UserShow where we implemented nested element logic by defining regions logic in View Class

#### V10

Added a collectionView
