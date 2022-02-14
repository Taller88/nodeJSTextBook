/**
 *  모듈의 심화
 * 
 * 
 */

require('./var'); // 실행만 하고 싶다, 대신 변수를 가져오고 싶지는 않다.

console.log(require)
//  main: module2.js 
//  cache: 효율을 위한 
//      '한번 require된 걸 캐싱을 함 
//      두번째 읽을 땐 cache에 있는 메모리에서 불러온다. => 빠름
//      require.cache를 초기화를 할 수도 있긴함 

// [Function: require] {
//     resolve: [Function: resolve] { paths: [Function: paths] },
//     main: Module {
//       id: '.',
//       path: 'C:\\Users\\user\\Desktop\\nodeJSTextBook\\3장',
//       exports: {},
//       parent: null,
//       filename: 'C:\\Users\\user\\Desktop\\nodeJSTextBook\\3장\\module2.js',
//       loaded: false,
//       children: [ [Module] ],
//       paths: [
//         'C:\\Users\\user\\Desktop\\nodeJSTextBook\\3장\\node_modules',
//         'C:\\Users\\user\\Desktop\\nodeJSTextBook\\node_modules',
//         'C:\\Users\\user\\Desktop\\node_modules',
//         'C:\\Users\\user\\node_modules',
//         'C:\\Users\\node_modules',
//         'C:\\node_modules'
//       ]
//     },
//     extensions: [Object: null prototype] {
//       '.js': [Function],
//       '.json': [Function],
//       '.node': [Function]
//     },
//     cache: [Object: null prototype] {
//       'C:\\Users\\user\\Desktop\\nodeJSTextBook\\3장\\module2.js': Module {
//         id: '.',
//         path: 'C:\\Users\\user\\Desktop\\nodeJSTextBook\\3장',
//         exports: {},
//         parent: null,
//         filename: 'C:\\Users\\user\\Desktop\\nodeJSTextBook\\3장\\module2.js',
//         loaded: false,
//         children: [Array],
//         paths: [Array]
//       },
//       'C:\\Users\\user\\Desktop\\nodeJSTextBook\\3장\\var.js': Module {
//         id: 'C:\\Users\\user\\Desktop\\nodeJSTextBook\\3장\\var.js',
//         path: 'C:\\Users\\user\\Desktop\\nodeJSTextBook\\3장',
//         exports: [Object],
//         parent: [Module],
//         filename: 'C:\\Users\\user\\Desktop\\nodeJSTextBook\\3장\\var.js',
//         loaded: true,
//         children: [],
//         paths: [Array]
//       }
//     }
//   }
  