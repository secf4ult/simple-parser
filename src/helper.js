const makeEnum = function(...enumerators) {
  let enumObj = {}
  // let serialNum = 1
  for (ele of enumerators) {
    enumObj[ele] = ele
  }
  return Object.freeze(enumObj)
}

module.exports = makeEnum