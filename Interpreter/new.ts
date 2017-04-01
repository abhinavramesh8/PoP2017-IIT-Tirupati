function some(a,b)                                        //this is the test cases file
{
                                         
return a*b;
}

x= some(5,10);                             //calling the function
print(x);

// # earlier this would have worked now this

b = 2*5;                                //assigning the values
b = -b;
print(b);
 i = 3;
  if(i<5){                             //conditional statements
print(i);
}
else
{
print(i+5);
}
x = 10;
while(x>0)                     //loops only while loop was applied
{
    x = x - 1;
    if(x % 2==0)
    {
        print(x);
        }
          else
    {
       continue;                     //continue function will put the scope on the first line of the loop
        }
        }
