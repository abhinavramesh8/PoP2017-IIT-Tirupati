#include<cstdio>
#include<iostream>
#include<fstream>
#include<cstdlib>
#define INTEGER "INTEGER"
#define PLUS "PLUS"

using namespace std;


class Interpreter{
	public:
	int calc(ifstream& t){
		int result;
		char c,ct;
		t.get(c);
		int a = c-'0';
		t.get(ct);
		t.get(c);
		int b = c-'0';
		if(ct=='+')
		result = a+b;
		else
		if(ct=='-')
		result = a-b;
		else if(ct=='*')
		result = a*b;
		else if(ct=='/')
		result = a/b;
		return result;
	}


};



int main(int argc, char* argv[])
{	
	ifstream text;
	text.open(argv[1]);
	Interpreter in;
	int result = in.calc(text);
	text.close();
	cout<<result<<endl;
	return 0;
}
