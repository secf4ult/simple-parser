const makeEnum = require('./helper.js')

const TokenType = makeEnum(
    'Identifier',
    'IntLiteral',
    'GT',
    'Plus',
    'Minus',
    'Star',
    'Slash',
    'SemiColon',
    'LeftParen',
    'RightParen',
    'Assignment',
    'Int'
)

module.exports = TokenType