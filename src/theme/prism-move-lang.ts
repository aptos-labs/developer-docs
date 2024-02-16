// Extended from https://github.com/PrismJS/prism/blob/master/components/prism-rust.js

(function (Prism) {
  var multilineComment = /\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source;
  for (var i = 0; i < 2; i++) {
    // support 4 levels of nested comments
    multilineComment = multilineComment.replace(/<self>/g, function () {
      return multilineComment;
    });
  }
  multilineComment = multilineComment.replace(/<self>/g, function () {
    return /[^\s\S]/.source;
  });

  Prism.languages.move = {
    comment: [
      {
        pattern: RegExp(/(^|[^\\])/.source + multilineComment),
        lookbehind: true,
        greedy: true,
      },
      {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true,
        greedy: true,
      },
    ],
    string: {
      pattern: /[bx]?"(?:\\[\s\S]|[^\\"])*"|[bx]?r(#*)"(?:[^"]|"(?!\1))*"\1/,
      greedy: true,
    },
    attribute: {
      pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
      greedy: true,
      alias: "attr-name",
      inside: {
        string: null, // see below
      },
    },

    // Closure params should not be confused with bitwise OR |
    "closure-params": {
      pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
      lookbehind: true,
      greedy: true,
      inside: {
        "closure-punctuation": {
          pattern: /^\||\|$/,
          alias: "punctuation",
        },
        rest: null, // see below
      },
    },

    "lifetime-annotation": {
      pattern: /'\w+/,
      alias: "symbol",
    },

    "fragment-specifier": {
      pattern: /(\$\w+:)[a-z]+/,
      lookbehind: true,
      alias: "punctuation",
    },
    variable: /\$\w+/,

    "function-definition": {
      pattern: /(\bfun\s+)\w+/,
      lookbehind: true,
      alias: "function",
    },
    "type-definition": {
      pattern: /(\b(?:struct)\s+)\w+/,
      lookbehind: true,
      alias: "class-name",
    },
    "module-declaration": [
      {
        pattern: /(\b(?:module|script)\s+)[a-z][a-z_\d]*/,
        lookbehind: true,
        alias: "namespace",
      },
      {
        pattern:
          /(\b(?:self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
        lookbehind: true,
        alias: "namespace",
        inside: {
          punctuation: /::/,
        },
      },
    ],
    keyword: [
      // https://github.com/rust-lang/reference/blob/master/src/keywords.md
      /\b(?:Self|abort|assert|abstract|as|break|const|continue|do|else|fun|for|if|impl|in|let|loop|module|move_to|move_from|mut|public|friend|return|script|self|static|struct|super|type|use|while|key|store|copy|drop)\b/,
      // primitives and str
      // https://doc.rust-lang.org/stable/rust-by-example/primitives.html
      /\b(?:bool|address|signer|vector|u(?:8|16|32|64|128|256))\b/,
      // Hex for addresses
      /\b(?:0x[0-9a-fA-f]+)\b/,
    ],

    // functions can technically start with an upper-case letter, but this will introduce a lot of false positives
    // also put entry and inline for this color
    function: [/\b[a-z_]\w*(?=\s*(?:::\s*<|\())/, /\b(?:entry|inline)\b/],
    macro: {
      pattern: /\b\w+!/,
      alias: "property",
    },
    constant: /\b[A-Z_][A-Z_\d]+\b/,
    "class-name": /\b[A-Z]\w*\b/,

    namespace: {
      pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
      inside: {
        punctuation: /::/,
      },
    },

    // Hex, oct, bin, dec numbers with visual separators and type suffix
    number:
      /\b(?:@?0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,
    boolean: /\b(?:false|true)\b/,
    punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
    operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/,
  };

  Prism.languages.rust["closure-params"].inside.rest = Prism.languages.rust;
  Prism.languages.rust["attribute"].inside["string"] =
    Prism.languages.rust["string"];
})(Prism);
