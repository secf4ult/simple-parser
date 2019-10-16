// derived from https://github.com/RichardGong/PlayWithCompiler/blob/master/lab/craft/SimpleLexer.java

const TokenType = require('./token-type')
const DfaState = require('./dfastate')

let tokenText = ''
let tokens = []
let token = {}

function isAlpha(ch) {
  let charCode = ch.charCodeAt(0)
  return charCode >= 97 && charCode <= 122 || charCode >= 65 && charCode <= 90
}

function isDigit(ch) {
  let charCode = ch.charCodeAt(0)
  return charCode >= 48 && ch <= 57
}

function isBlank(ch) {
  // if char is SPACE(32) HT(9) LF(10)
  let charCode = ch.charCodeAt(0)
  return charCode === 32 || charCode === 9 || charCode === 10
}

function recordToken() {
    token.text = tokenText.toString()
    tokens.push(token)

    tokenText = ''
    token = {}
}

function initToken(ch) {
  // record the token
  if (tokenText.length > 0) {
    recordToken()
  }

  let newState = DfaState.Initial
  
  if (isAlpha(ch)) {
    // first token is letter
    if (ch === 'i') {
      newState = DfaState.Id_int1
    } else {
      newState = DfaState.Id
    }
    token.type = TokenType.Identifier
    tokenText = tokenText.concat(ch)
  } else if (isDigit(ch)) {
    // first letter is digit
    newState = DfaState.IntLiteral
    token.type = TokenType.IntLiteral
    tokenText = tokenText.concat(ch)
  } else if (ch === '>') {
    // first token is >
    newState = DfaState.GT
    token.type = TokenType.GT
    tokenText = tokenText.concat(ch)
  } else if (ch === '+') {
    // first token is +
    newState = DfaState.Plus
    token.type = TokenType.Plus
    tokenText = tokenText.concat(ch)
  } else if (ch === '-') {
    // first token is -
    newState = DfaState.Minus
    token.type = TokenType.Minus
    tokenText = tokenText.concat(ch)
  } else if (ch === '*') {
    // first token is *
    newState = DfaState.Star
    token.type = TokenType.Star
    tokenText = tokenText.concat(ch)
  } else if (ch === '/') {
    // first token is /
    newState = DfaState.Slash
    token.type = TokenType.Slash
    tokenText = tokenText.concat(ch)
  } else if (ch === ';') {
    // first token is ;
    newState = DfaState.SemiColon
    token.type = TokenType.SemiColon
    tokenText = tokenText.concat(ch)
  } else if (ch === '(') {
    // first token is (
    newState = DfaState.LeftParen
    token.type = TokenType.LeftParen
    tokenText = tokenText.concat(ch)
  } else if (ch === ')') {
    // first token is )
    newState = DfaState.RightParen
    token.type = TokenType.RightParen
    tokenText = tokenText.concat(ch)
  } else if (ch === '=') {
    // first token is =
    newState = DfaState.Assignment
    token.type = TokenType.Assignment
    tokenText = tokenText.concat(ch)
  } else {
    // skip all unknown patterns
    newState = DfaState.Initial
  }

  return newState
}

/**
 * parse string to build token by a Finite State Automaton
 * @param {*} code
 */
function tokenize(code) {
  // clear existed tokens
  tokens = []
  tokenText = ""
  token = {}

  let state = DfaState.Initial

  try {
    code.split('').forEach(ch => {
      switch (state) {
        case DfaState.Initial:
          state = initToken(ch)
          break;
        case DfaState.Id:
          if (isAlpha(ch) || isDigit(ch)) {
            tokenText = tokenText.concat(ch)
          } else {
            state = initToken(ch)
          }
          break;
        case DfaState.GT:
          if (ch === '=') {
            token.type = TokenType.GE
            state = DfaState.GE
            tokenText = tokenText.concat(ch)
          } else {
            state = initToken(ch)
          }
          break;
        case DfaState.GE:
        case DfaState.Assignment:
        case DfaState.Plus:
        case DfaState.Minus:
        case DfaState.Star:
        case DfaState.Slash:
        case DfaState.SemiColon:
        case DfaState.LeftParen:
        case DfaState.RightParen:
          state = initToken(ch)
          break;
        case DfaState.IntLiteral:
          if (isDigit(ch)) {
            tokenText = tokenText.concat(ch)
          } else {
            state = initToken(ch)
          }
          break;
        case DfaState.Id_int1:
          if (ch === 'n') {
            state = DfaState.Id_int2
            tokenText = tokenText.concat(ch)
          } else if (isDigit(ch) || isAlpha(ch)) {
            state = DfaState.Id
            tokenText = tokenText.concat(ch)
          } else {
            state = initToken(ch)
          }
          break;
        case DfaState.Id_int2:
          if (ch === 't') {
            state = DfaState.Id_int3
            tokenText = tokenText.concat(ch)
          } else if (isDigit(ch) || isAlpha(ch)) {
            state = DfaState.Id
            tokenText = tokenText.concat(ch)
          } else {
            state = initToken(ch)
          }
          break;
        case DfaState.Id_int3:
          if (isBlank(ch)) {
            token.type = TokenType.Int
            state = initToken(ch)
          } else {
            state = DfaState.Id
            tokenText = tokenText.concat(ch)
          }
          break;
        default:
          initToken(ch)
      }
    })
    // record the last token
    recordToken()
  } catch (e) {
    console.log(e.message)
  }
}

function print() {
  tokens.forEach(token => {
    console.log(token.type + ': ' + token.text)
  })
  console.log('')
}

module.exports = {
  tokenize,
  print
}