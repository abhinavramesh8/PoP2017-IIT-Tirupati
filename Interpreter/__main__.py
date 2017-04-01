import argparse
#from __init__ import __version__ as version
import interpreter


try:                                                    # this is the main file which actually takes input and imports interpreter
    input = raw_input
except NameError:
    pass


def parse_args():                                    #parsing the different arguments
    argparser = argparse.ArgumentParser()
    argparser.add_argument('-v', '--verbose', action='store_true')
    argparser.add_argument('file', nargs='?')
    return argparser.parse_args()


def interpret_file(path, verbose=False):                  #interpreting the file
    with open(path) as f:
        print(interpreter.evaluate(f.read(), verbose=verbose))


def repl():                                         # for printing the values
    print('Typescript')
    env = interpreter.create_global_env()
    buf = ''
    try:
        while True:
            inp = input('>>>> ' if not buf else '')
            if inp == '':
                print(interpreter.evaluate_env(buf, env))
                buf = ''
            else:
                buf += '\n' + inp
    except KeyboardInterrupt:
        pass


def main():  
    args = parse_args()
    if args.file:
        interpret_file(args.file, args.verbose)                 #calling the interpreter function
    else:
        repl()

if __name__ == '__main__':
    main()
