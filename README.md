# Huelgo-SZ

## Desc

- Light Serialize and Verify Model

## Document

### Install

```
    npm i huelgo-sz
```

### Use Example

```ts
const person = {
  name: 'leedonggyu',
  age: 30,
  skills: ['frontend', 'backend'],
  friends: {
    limjeayhock: {
      job: 'programmer',
    },
    sinjunghyocn: {
      job: 'police',
    },
    kimhyonchodl: {
      job: 'police',
    },
  },
}

// szModel
const model = szModel({
  name: szParam().set(person.name, 'my_name').string().required(),
  age: szParam().set(person.age, 'my_age').number().required(),
  skills: szParam().set(person.skills, 'my_skills').array().required(),
  friends: szParam().set(person.friends, 'my_friends').required(),
})

// sereialize output
const {data, error} = model.validate<{
  name : string,
  age : number,
  skills : string[],
  ...
}>(true)

/*
{
    data: {
    name: 'leedonggyu',
    age: 30,
    skills: [ 'frontend', 'backend' ],
    friends: {
        limjeayhock: ...,
        sinjunghyocn: ...,
        kimhyonchodl: ...
        }
    },
    error: []
}
*/

// deserialize output
const {data, error} = model.validate<{
  my_name : string,
  my_age : number,
  my_skills : string[],
  ...
}>(false)

/*
{
    data: {
    my_name: 'leedonggyu',
    my_age: 30,
    my_skills: [ 'frontend', 'backend' ],
    my_friends: {
        limjeayhock: ...,
        sinjunghyocn: ...,
        kimhyonchodl: ...
        }
    },
    error: []
}
*/
```
