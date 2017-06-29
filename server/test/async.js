/*
 * @Author: leezii 
 * @Date: 2017-06-27 00:27:21 
 * @Last Modified by: leezii
 * @Last Modified time: 2017-06-27 18:34:37
 */
const fire = require('./fire')

function asyncTest(req, i = 1) {
  let promiseArr = []
  for (let post = 0; post < i; post++) {
    promiseArr.push(fire(req))
  }
  return Promise.all(promiseArr)
}
module.exports = asyncTest
