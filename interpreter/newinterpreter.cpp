#include<cstdio>
#include<iostream>
#include<fstream>
#define INTEGER "INTEGER"
#define PLUS "PLUS"


class Token{
public:
	int type,value;
	void initialize(int ty,int val)
	{
		type = ty;
		value = val;		
	}
	

};


class Interpreter{
	public:
	ifstream text;
	int pos;
	int current_token;
 	void ini(ifstream& tex)
 	{
 		text = tex;
 		
 	}
 	
 	}
