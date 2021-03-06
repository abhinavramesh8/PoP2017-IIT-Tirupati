from __future__ import print_function
import operator
from collections import namedtuple
import ast
from lexer import Lexer, TokenStream
from parser import Parser
from errors import TypescriptSyntaxError, report_syntax_error
from utils import print_ast, print_tokens, print_env


BuiltinFunction = namedtuple('BuiltinFunction', ['params', 'body'])        # we are using some builtin function for printing


class Break(Exception):        #classes for break and continue and return
    pass


class Continue(Exception):
    pass


class Return(Exception):
    def __init__(self, value):
        self.value = value



def eval_binary_operator(node, env):           # function for evalutating binary operators
    simple_operations = {
        '+': operator.add,
        '-': operator.sub,
        '*': operator.mul,
        '/': operator.truediv,
        '%': operator.mod,
        '>': operator.gt,
        '>=': operator.ge,
        '<': operator.lt,
        '<=': operator.le,
        '==': operator.eq,
        '!=': operator.ne,
        '..': range,
        '...': lambda start, end: range(start, end + 1),
    }
    lazy_operations = {
        '&&': lambda lnode, lenv: bool(eval_expression(lnode.left, lenv)) and bool(eval_expression(lnode.right, lenv)),
        '||': lambda lnode, lenv: bool(eval_expression(lnode.left, lenv)) or bool(eval_expression(lnode.right, lenv)),
    }
    if node.operator in simple_operations:
        return simple_operations[node.operator](eval_expression(node.left, env), eval_expression(node.right, env))
    elif node.operator in lazy_operations:
        return lazy_operations[node.operator](node, env)
    else:
        raise Exception('Invalid operator {}'.format(node.operator))


def eval_unary_operator(node, env):        # for evaluating unary operators
    operations = {
        '-': operator.neg,
        '!': operator.not_,
    }
    return operations[node.operator](eval_expression(node.right, env))


def eval_assignment(node, env):                          # for evalutating assignment conditions
    if isinstance(node.left, ast.SubscriptOperator):
        return eval_setitem(node, env)
    else:
        return env.set(node.left.value, eval_expression(node.right, env))


def eval_condition(node, env):                            #for evaulating conditional statements
    if eval_expression(node.test, env):
        return eval_statements(node.if_body, env)

    for cond in node.elifs:
        if eval_expression(cond.test, env):
            return eval_statements(cond.body, env)

    if node.else_body is not None:
        return eval_statements(node.else_body, env)

def eval_while_loop(node, env):
    while eval_expression(node.test, env):
        try:
            eval_statements(node.body, env)
        except Break:
            break
        except Continue:
            pass

def eval_function_declaration(node, env):
    return env.set(node.name, node)


def eval_call(node, env):
    function = eval_expression(node.left, env)
    n_expected_args = len(function.params)
    n_actual_args = len(node.arguments)
    if n_expected_args != n_actual_args:
        raise TypeError('Expected {} arguments, got {}'.format(n_expected_args, n_actual_args))    #type error for incorrect num of args
    args = dict(zip(function.params, [eval_expression(node, env) for node in node.arguments]))
    if isinstance(function, BuiltinFunction):
        return function.body(args, env)
    else:
        call_env = Environment(env, args)
        try:
            return eval_statements(function.body, call_env)
        except Return as ret:
            return ret.value


def eval_identifier(node, env):               # for evaulating the names like name of a function and of a variable
    name = node.value
    val = env.get(name)
    if val is None:
        raise NameError('Name "{}" is not defined'.format(name))
    return val




def eval_setitem(node, env):                         # setting values for given items
    collection = eval_expression(node.left.left, env)
    key = eval_expression(node.left.key, env)
    collection[key] = eval_expression(node.right, env)

def eval_return(node, env):
    return eval_expression(node.value, env) if node.value is not None else None

evaluators = {                                     #maps different evaulation function in parser with different function in interpreter
    ast.Number: lambda node, env: node.value,               
    ast.String: lambda node, env: node.value,
    ast.Identifier: eval_identifier,
    ast.BinaryOperator: eval_binary_operator,
    ast.UnaryOperator: eval_unary_operator,
    ast.Assignment: eval_assignment,
    ast.Condition: eval_condition,
    ast.WhileLoop: eval_while_loop,
    ast.Function: eval_function_declaration,
    ast.Call: eval_call,
    ast.Return: eval_return,
}


def eval_node(node, env):              #evaulating different nodes
    tp = type(node) 
    if tp in evaluators:
        return evaluators[tp](node, env)
    else:
        raise Exception('Unknown node {} {}'.format(tp.__name__, node))


def eval_expression(node, env):
    return eval_node(node, env)


def eval_statement(node, env):                       #evaluating statement           
    return eval_node(node, env)


def eval_statements(statements, env):                 # evaluating statements
    ret = None
    for statement in statements:
        if isinstance(statement, ast.Break):           #special case of break statement
            raise Break(ret)
        elif isinstance(statement, ast.Continue):         #special case of continue statement
            raise Continue(ret)
        ret = eval_statement(statement, env)              #evaulating statements
        if isinstance(statement, ast.Return):      #special case of return statement
            raise Return(ret)
    return ret


def add_builtins(env):
    builtins = {
        'print': (['value'], lambda args, e: print(args['value'])),
    }
    for key, (params, func) in builtins.items():
        env.set(key, BuiltinFunction(params, func))


def create_global_env():
    env = Environment()
    add_builtins(env)
    return env


def evaluate_env(s, env, verbose=False):
    lexer = Lexer()
    try:
        tokens = lexer.tokenize(s)
    except TypescriptSyntaxError as err:
        report_syntax_error(lexer, err)
        if verbose:
            raise
        else:
            return

    if verbose:                             # if verbose is passed as true it will prints tokens as parse trees for different statements
        print('Tokens')
        print_tokens(tokens)
        print()

    token_stream = TokenStream(tokens)

    try:
        program = Parser().parse(token_stream)
    except TypescriptSyntaxError as err:
        report_syntax_error(lexer, err)
        if verbose:
            raise
        else:
            return

    if verbose:
        print('AST')
        print_ast(program.body)
        print()

    ret = eval_statements(program.body, env)

    if verbose:
        print('Environment')
        print_env(env)
        print()

    return ret


def evaluate(s, verbose=False):
    return evaluate_env(s, create_global_env(), verbose)
    
    
class Environment(object):                   #classes for representing environment

    def __init__(self, parent=None, args=None):
        self._parent = parent
        self._values = {}
        if args is not None:
            self._from_dict(args)

    def _from_dict(self, args):
        for key, value in args.items():
            self.set(key, value)

    def set(self, key, val):
        self._values[key] = val

    def get(self, key):
        val = self._values.get(key, None)
        if val is None and self._parent is not None:
            return self._parent.get(key)
        else:
            return val

    def asdict(self):
        return self._values

    def __repr__(self):
        return 'Environment({})'.format(str(self._values))
