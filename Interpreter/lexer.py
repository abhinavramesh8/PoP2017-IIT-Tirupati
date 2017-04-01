import re
from collections import namedtuple, OrderedDict
from errors import TypescriptSyntaxError as LexerError
from ttt import iteritems


class Token(namedtuple('Token', ['name', 'value', 'line', 'column'])):          #token class for different types of tokens

    def __repr__(self):
        return str(tuple(self))


def decode_str(s):
    regex = re.compile(r'\\(r|n|t|\\|\'|")')                    
    chars = {                                           #reular expressions for a string
        'r': '\r',
        'n': '\n',
        't': '\t',
        '\\': '\\',
        '"': '"',
        "'": "'",
    }

    def replace(matches):
        char = matches.group(1)[0]
        if char not in chars:
            raise Exception('Unknown escape character {}'.format(char))
        return chars[char]

    return regex.sub(replace, s[1:-1])


def decode_num(s):                                # for decoding string
    try:
        return int(s)
    except ValueError:
        return float(s)


class Lexer(object):                    #contains different types of tokens which can be present

    rules = [
        ('COMMENT', r'//.*'),
        ('STRING', r'"(\\"|[^"])*"'),
        ('STRING', r"'(\\'|[^'])*'"),
        ('NUMBER', r'\d+\.\d+'),
        ('NUMBER', r'\d+'),
        ('NAME', r'[a-zA-Z_]\w*'),
        ('WHITESPACE', '[ \t]+'),
        ('NEWLINE', r'\n+'),
        ('OPERATOR', r'[\+\*\-\/%]'),       # arithmetic operators
        ('OPERATOR', r'<=|>=|==|!=|<|>'),   # comparison operators
        ('OPERATOR', r'\|\||&&'),           # boolean operators
        ('OPERATOR', r'\.\.\.|\.\.'),       # range operators
        ('OPERATOR', '!'),                  # unary operator
        ('ASSIGN', '='),
        ('LPAREN', r'\('),
        ('RPAREN', r'\)'),
        ('LBRACK', r'\['),
        ('RBRACK', r'\]'),
        ('LCBRACK', '{'),
        ('RCBRACK', '}'),
        ('COLON', ':'),
        ('COMMA', ','),
        ('SEMICOLON',';'),
    ]

    keywords = {                         # different types of keywords present in the language
        'function': 'FUNCTION',
        'return': 'RETURN',
        'else': 'ELSE',
        'else if': 'ELIF',
        'if': 'IF',
        'while': 'WHILE',
        'break': 'BREAK',
        'continue': 'CONTINUE',
        'when': 'WHEN',
    }

    ignore_tokens = [                     # whitespaces and newlines and comments are to be ignored
        'WHITESPACE',
        'COMMENT',
        'NEWLINE',
    ]

    decoders = {											#tokens that are needed to be decoded
        'STRING': decode_str,
        'NUMBER': decode_num,
    }

    def __init__(self):
        self.source_lines = []
        self._regex = self._compile_rules(self.rules)

    def _convert_rules(self, rules):
        grouped_rules = OrderedDict()
        for name, pattern in rules:
            grouped_rules.setdefault(name, [])
            grouped_rules[name].append(pattern)

        for name, patterns in iteritems(grouped_rules):
            joined_patterns = '|'.join(['({})'.format(p) for p in patterns])   #elements inside the bracket are joined by the '|'
            yield '(?P<{}>{})'.format(name, joined_patterns)

    def _compile_rules(self, rules):
        return re.compile('|'.join(self._convert_rules(rules)))

    def _tokenize_line(self, line, line_num):
        pos = 0
        while pos < len(line):
            matches = self._regex.match(line, pos)
            if matches is not None:
                name = matches.lastgroup
                pos = matches.end(name)
                if name not in self.ignore_tokens:
                    value = matches.group(name)
                    if name in self.decoders:
                        value = self.decoders[name](value)
                    elif name == 'NAME' and value in self.keywords:
                        name = self.keywords[value]
                        value = None
                    yield Token(name, value, line_num, matches.start() + 1)
            else:
                raise LexerError('Unexpected character {}'.format(line[pos]), line_num, pos + 1)

    def _count_leading_characters(self, line, char):
        count = 0
        for c in line:
            if c != char:
                break
            count += 1
        return count


    def tokenize(self, s):
        tokens = []
        line_num = 0
        for line_num, line in enumerate(s.splitlines(), 1):
            line = line.rstrip()

            if not line:
                self.source_lines.append('')
                continue

            self.source_lines.append(line)

            line_tokens = list(self._tokenize_line(line, line_num))
            if line_tokens:
                tokens.extend(line_tokens)

        return tokens


class TokenStream(object):                  #tokens stream class which contain a  list of tokens

    def __init__(self, tokens):
        self._tokens = tokens
        self._pos = 0

    def consume_expected(self, *args):              # consumes the given type of token
        token = None
        for expected_name in args:
            token = self.consume()
            if token.name != expected_name:
                raise LexerError('Expected {}, got {}'.format(expected_name, token.name), token.line, token.column)
        return token

    def consume(self):                      # consuming a particular token
        token = self.current()
        self._pos += 1
        return token

    def current(self):
        try:
            return self._tokens[self._pos]
        except IndexError:
            last_token = self._tokens[-1]
            raise LexerError('Unexpected end of input', last_token.line, last_token.column)

    def expect_end(self):
        if not self.is_end():
            token = self.current()
            raise LexerError('End expected', token.line, token.column)

    def is_end(self):
        return self._pos == len(self._tokens)
