const lexer = require('../src/lexer')

let script = 'int age = 45;'
console.log('parse: ' + script)
lexer.tokenize(script)
lexer.print()

script = 'inta age = 45;'
console.log('parse: ' + script)
lexer.tokenize(script)
lexer.print()

script = 'in age = 45;'
console.log('parse: ' + script)
lexer.tokenize(script)
lexer.print()

script = 'age >= 45;'
console.log('parse: ' + script)
lexer.tokenize(script)
lexer.print()

script = 'age > 45;'
console.log('parse: ' + script)
lexer.tokenize(script)
lexer.print()

script = '2 + 3 * 5'
console.log('parse: ' + script)
lexer.tokenize(script)
lexer.print()