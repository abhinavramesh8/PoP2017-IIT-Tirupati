#include<cstdio>
#include<iostream>
#include<fstream>
#define INTEGER "INTEGER"
#define PLUS "PLUS"
#define MINUS "MINUS"
#define DIVIDE "divide"
#define MULTIPLY "multiply"
#define NIL "null"

using namespace std;


class Token{
public:
	string type;
	char value;
	int int_value;
	Token()
	{
	type = NIL;
	}
	
	void operator=(Token c)
	{	
	
		type= c.type;
		value  = c.value;
		int_value = c.int_value;
	}
	Token(string ty)
	{
		type = ty;
	}
	
	Token(string ty,char val)
	{
		type = ty;
		value = val;		
	}
	
	

};


class Interpreter{
	public:
	ifstream text;
	char current_char;
	char op;
	Token current_token;
 	Interpreter(char* st)
 	{	
 		text.open(st);
 		current_token.type  = NIL;
 	}
 	
 	Token get_next_token(){
 	
 		Token tk(NIL);
		while(current_char){
		if(current_char==' ')
		{
			advance();
			continue;
		}
		tk.value = current_char;
		if(current_char>= '0' && current_char<='9')
		{
			tk.type = INTEGER,tk.int_value = integer();
			return tk;
		}
			else
		if(current_char=='+') tk.type = PLUS,advance();
		else
		if(current_char=='-') tk.type = MINUS,advance();
		else
		if(current_char == '/') tk.type = DIVIDE, advance();
		else
		if(current_char=='*') tk.type = MULTIPLY, advance();
		return tk;			
		}
		return tk;
 	}
 	
 	void eat(string token_type)
 	{
 		if(current_token.type==token_type)
	 		current_token = get_next_token();
 		
 	}
 	
 	void advance()
 	{
 		text.get(current_char);	
 	}
 	
 	void  skip_whitespace()
 	{	
 		while(current_char && current_char==' ')
		advance();
 	}
 	
 	int integer()
 	{
 	int res = 0;
 	while(current_char && current_char>='0' && current_char<='9')
 	{	
 		res = res*10+(int)(current_char-'0');
 		advance();
 	}
 	return res;
 	}
 	
 	int term()
 	{	
 		Token tk = current_token;
 		eat(INTEGER);
 		return tk.int_value;
 	}
 	
 	int calc(){
		
		advance();
		current_token = get_next_token();
		int result = term();
		Token left,right,op;
		while(current_token.type == PLUS||current_token.type==MINUS)
			{
				op = current_token;
				if(op.type==PLUS)
				{
					eat(PLUS);
					result = result+term();
				}
				else if(op.type==MINUS)
				{
					eat(MINUS);
					result = result - term();
				}
			}
		
		return result;
 	}
 	
 	};
 	
 	
 	int main(int argc, char* argv[])
 	{
 		Interpreter in(argv[1]);
 		int result = in.calc();
 		cout<<result<<endl;
 		return 0;
 	}