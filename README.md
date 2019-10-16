# README

A simple JavaScript parser still in work.

```js
parse: int age = 45;
Int: int
Identifier: age
Assignment: =
IntLiteral: 45

parse: inta age = 45;
Identifier: inta
Identifier: age
Assignment: =
IntLiteral: 45

parse: in age = 45;
Identifier: in
Identifier: age
Assignment: =
IntLiteral: 45
```