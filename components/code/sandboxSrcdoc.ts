let sandboxSrcdoc =
  "<!doctype html>\n<html>\n  <head>\n    <style>\n      body {\n        width: 100%;\n        height: 100%;\n      }\n    </style>\n  </head>\n  <body></body>\n  <script>\n    function stringify(x, quote = false) {\n      // primitive + function\n      switch (typeof x) {\n        case 'number':\n        case 'boolean':\n          return x.toString();\n        case 'bigint':\n          return x.toString() + 'n';\n        case 'string':\n          // 두 번 stringify해 escape되는 것 방지\n          return quote ? `'${x}'` : x;\n        case 'undefined':\n          return 'undefined';\n        case 'symbol':\n          return `Symbol(${x.description})`;\n        case 'function':\n          return `[Function: ${x.name}]`;\n      }\n\n      // null\n      if (x === null) return 'null';\n\n      // 전역 객체 stringify시 에러 우회\n      if (x === globalThis) return 'Window {...}';\n\n      // 래퍼 객체\n      for (let wrapper of [Number, Boolean, BigInt, String])\n        if (x instanceof wrapper) return `[${wrapper.name}: ${x.toString()}]`;\n\n      // 배열\n      // 희소 배열 처리는 map 덕분에 자연스럽게 된다.\n      // 즉 stringify가 호출되지 않지만 join에 empty item이 반영된다.\n      if (x instanceof Array)\n        return `[${x.map((x) => stringify(x, true)).join(', ')}]`;\n\n      // Date\n      if (x instanceof Date) return x.toLocaleString();\n\n      // 일반 객체\n      let name = x.constructor.name;\n\n      let content = '{ ';\n      for (let [key, value] of Object.entries(x)) {\n        content += `${stringify(key)}: ${stringify(value, true)}, `;\n      }\n      content = content.length === 2 ? '{}' : content.slice(0, -2) + ' }';\n\n      if (name === 'Object') {\n        return content;\n      } else {\n        return `${name} ${content}`;\n      }\n    }\n\n    let runCode = (code, log) => {\n      console.log = log;\n      // MEMO: 아래와 같이 js 예제 코드 중 전역에서 동작해야하는 것이 있어 Function을 사용할 수 없다.\n      // ```js\n      // var a = 1;\n      // let b = 1;\n      // console.log(globalThis.a, globalThis.b);\n      // ```\n      (0, eval)(code);\n\n      // MEMO: setTimeout등으로 코드가 실행중일 수 있어서 console.log를 되돌리면 안된다.\n    };\n\n    let messageHandler = (e) => {\n      let postMessage = (data) => e.source.postMessage(data, '*');\n\n      let log = (...data) => {\n        postMessage({\n          type: 'log',\n          data: data.map((x) => stringify(x)).join(' '),\n        });\n      };\n\n      try {\n        let { type, code } = e.data;\n        switch (type) {\n          case 'html':\n            let script = code.match(/<script[\\s\\S]*?>[\\s\\S]*?<\\/script>/gi);\n            document.querySelector('body').innerHTML = code;\n            if (script && script.length) {\n              runCode(script[0].slice(8, -9), log);\n            }\n            break;\n          case 'js':\n            runCode(code, log);\n            break;\n        }\n      } catch (e) {\n        postMessage({ type: 'exception', data: `에러: ${e.message}` });\n      }\n    };\n\n    window.addEventListener('message', messageHandler);\n\n    // 잡히지 않은 에러가 콘솔에 뜨지 않도록 합니다.\n    window.addEventListener('error', (e) => {\n      e.preventDefault();\n    });\n\n    window.addEventListener('unhandledrejection', (e) => {\n      e.preventDefault();\n    });\n  </script>\n</html>\n";

export default sandboxSrcdoc;
