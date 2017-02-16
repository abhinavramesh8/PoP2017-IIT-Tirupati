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
	
	Token()
	{
	type = NIL;
	}
	
	void operator=(Token c)
	{	
	
		type= c.type;
		value  = c.value;
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
		while(current_char){
		Token tk(NIL);
		text.get(current_char);
		if(!current_char)
		return tk;
		
		tk.value = current_char;		
		if(current_char>= '0' && current_char<='9')
			tk.type = INTEGER;
		if(current_char=='+') tk.type = PLUS;
		if(current_char=='-') tk.type = MINUS;
		if(current_char=='/') tk.type = DIVIDE;
		if(current_char=='*') tk.type = MULTIPLY;
		return tk;
		}
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
 		res = res*10+(current_char-'0');
 	return res;
 	}
 	
 	int calc(){
	
	Token left,right,op;
	current_token = get_next_token();
	left = current_token;
	eat(INTEGER);
	op = current_token;
	eat(op.type);
	right = current_token;
	eat(INTEGER);
	left.value = left.value-'0';
	right.value = right.value - '0';
	switch(op.type) {
		case ADD: return (int)left.value+right.value;
			  break;
		
		case MINUS: return (int)left.value-right.value;
			    break;
			
		case MULTIPLY: return (int)left.value*right.value;
			       break;
			
		case DIVIDE: return (int)left.value/right.value;
			     break;
	}
 	
 	}
 	
 	};

int main(int argc, char* argv[])
 	{
 		Interpreter in(argv[1]);
 		int result = in.calc();
 		cout<<result<<endl;
 		return 0;
 	}
