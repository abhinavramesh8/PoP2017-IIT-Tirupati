$(document).ready(function(){
	var ele = '';
	var prev_id;
	var turn = "first player turn";
	var mate = 0;
	var che = 0;// 1 is check to first player 2 is check to second player
	var black_king_x = 4,black_king_y =1,white_king_x=5,white_king_y = 8;
	var choose = 1;

	
	
	function check_safe_king(i,j,attr)
	{
		for(var x = 1;x<=8;x++)
			for(var y = 1;y<=8;y++)
			{
				var x_place = String.fromCharCode(y+96)+'_'+(x).toString();
				var at = $('#'+x_place).attr('data-attribute');
				//alert(at);
				if(at.substr(0,5)=="blank"||at.substr(0,5)==attr.substr(0,5))
				{
					continue;
				}
				else
				{

					if(at=="black_pawn"&& attr=="white_king")
					{
						if(!check_black_pawn(x,y,at,i,j))
						{
							//alert(at);
							return 0;}
							else
								continue;
					}
					else if(at=="white_pawn"&& attr=="black_king")
					{
							if(!check_white_pawn(x,y,at,i,j))
							{
						//	alert(at);
						return 0;   }
						else
							continue;
					}	
				else if((at=="black_knight"&& attr=="white_king")||(attr=="black_king"&&at=="white_knight"))
		 		{	
				if(!check_knight(x,y,at,i,j))
				{
	//			alert(at);
			return 0;  }
			else
				continue;
				}
				else if((attr=="white_king"&&at=="black_rook")||(attr=="black_king"&& at=="white_rook"))
				{
				if(!check_rook(x,y,at,i,j))
				{
					//alert(at);
			return 0;    }
				else
					continue;
				}
				else if((attr=='white_king'&&at=="black_bishop")||(attr=="black_king" && at=="white_bishop"))
				{
					//alert(1);
				if(!check_bishop(x,y,at,i,j))
				{	
				//alert(at);
				return 0;     }
				else
					continue;
				}
				else if((attr=="white_king" && at=="black_queen")||(attr=="black_king" &&at=="white_queen"))
				{
				if(!check_queen(x,y,at,i,j))
				{//	alert(at);
			return 0;  }
			else continue;
				}
				else if((attr=="white_king" && at=="black_king")||(attr=="black_king" &&at=="white_king"))
				{
				if(!check_king(x,y,at,i,j))
				{//	alert(at);
			return 0;  }
			else continue;
				}
				
					
				}
			}
		return 1;
	}
	
	
	function colour(x){
		
		$('#'+x).css('background-color','pink'),$('#'+x).attr('data-set','1');
	}
	function check_condition(x,attr,side_x,side_y,attr_king)
	{
		var prev_attr = $('#'+x).attr('data-attribute');
		//alert(prev_attr+' '+attr);
		$('#'+x).attr('data-attribute',attr);
		//alert(x);
		if(check_safe_king(side_x,side_y,attr_king))
		{
			//alert(1);
			$('#'+x).attr('data-attribute',prev_attr);
			return 1;
			
		}
		else
		{
			$('#'+x).attr('data-attribute',prev_attr);
			return 0;
			
		}
		
	}
	
	
	function can_protect(colour)
	{
		
		for(var i = 1;i<=8;i++)
			for(var  j=  1;j<=8;j++)
			{
				var x_place = String.fromCharCode(j+96)+'_'+(i).toString();
				var at = $('#'+x_place).attr('data-attribute');
				if(at.substr(0,5)==colour)
				{
					if((colour=='white'&&at=='white_pawn')||(colour=='black'&&at=='black_pawn'))
					{
						if(at=='white_pawn')
						{
							if(can_white_pawn(i,j,at))
								return 1;
						}
						else
							if(can_black_pawn(i,j,at))
								return 1;
					}
					else if(at=='white_rook'||at=='black_rook'){
						
						if(can_rook(i,j,at))
							return 1;
					}
					else if(at=='white_bishop'||at=='black_bishop'){
						
						if(can_bishop(i,j,at))
							return 1;
					}
					else if(at=='white_queen'||at=='black_queen'){
						
						if(can_queen(i,j,at))
							return 1;
					}
					else if(at=='white_knight'||at=='black_knight'){
						if(can_knight(i,j,at))
						{
					
					return 1;
						}
					}
						
					
				}
				
				
			}
			return 0;
				
		
		
	}
	
	
	function can_black_pawn(x_pos,y_pos,attr)
	{
		if(y_pos==8)
			return 0;
		var side_x,side_y;
		if(attr.substr(0,5)=='black')
			side_x = black_king_x,side_y = black_king_y;
		else
			side_x = white_king_x,side_y=white_king_y;
			var king_place = String.fromCharCode(96+y_pos)+'_'+(x_pos).toString();
		$('#'+king_place).attr('data-attribute','blank');
		for(var i = Math.max(1,x_pos-1);i<=Math.min(8,x_pos+1);i++)
			{
				var x = String.fromCharCode(y_pos+1+96)+'_'+(i).toString();
				var at = $('#'+x).attr('data-attribute');
				//alert(at.substr(0,5));
				if((i==x_pos-1||i==x_pos+1)&&(at.substr(0,5)=="white")&&check_condition(x,attr,side_x,side_y,'black_king'))
				{
						$('#'+king_place).attr('data-attribute',attr);
				return 1;
				}
				if(i==x_pos && at=='blank'&& check_condition(x,attr,side_x,side_y,'black_king'))
				{
						$('#'+king_place).attr('data-attribute',attr);
				return 1;
				}
			}
			if(y_pos==2)
			{
			var x= String.fromCharCode(y_pos+96+2)+'_'+(x_pos).toString();
			var at = $('#'+x).attr('data-attribute');
			if(y_pos==2&& at=='blank'&&check_condition(x,attr,side_x,side_y,'black_king'))
			{
				$('#'+king_place).attr('data-attribute',attr);
				return 1;
				
			}
			}
		$('#'+king_place).attr('data-attribute',attr);
		
		return 0;
	}
	
	function can_white_pawn(x_pos,y_pos,attr){   //1 value is  to check whether white piece attack at a given place 2 for a black piece
		
		
		if(y_pos==1)
			return 0;
		var side_x,side_y;
		if(attr.substr(0,5)=='black')
			side_x = black_king_x,side_y = black_king_y;
		else
			side_x = white_king_x,side_y=white_king_y;
		var king_place = String.fromCharCode(96+y_pos)+'_'+(x_pos).toString();
		$('#'+king_place).attr('data-attribute','blank');
		//alert(attr);
			for(var i = Math.max(1,x_pos-1);i<=Math.min(8,x_pos+1);i++)
			{
				var x = String.fromCharCode(y_pos-1+96)+'_'+(i).toString();
				var at = $('#'+x).attr('data-attribute');
				if((i==x_pos-1||i==x_pos+1)&&(at.substr(0,5)=='black')&&check_condition(x,attr,side_x,side_y,'white_king'))
				{$('#'+king_place).attr('data-attribute',attr);
					return 1;
				}
				if(i==x_pos && at=='blank'&&check_condition(x,attr,side_x,side_y,'white_king'))
				{$('#'+king_place).attr('data-attribute',attr);
					return 1;
				}
				
			}
			if(y_pos==7)
			{
			var x= String.fromCharCode(y_pos+96-2)+'_'+(x_pos).toString();
			var at = $('#'+x).attr('data-attribute');
			if(y_pos==7&& at=='blank'&&check_condition(x,attr,side_x,side_y,'white_king'))
			{
				$('#'+king_place).attr('data-attribute',attr);
				return 1;
				
			}
			}
			$('#'+king_place).attr('data-attribute',attr);
		return 0;
	}
	
	function can_rook(x_pos,y_pos,attr){
		
		var side_x,side_y;
		if(attr.substr(0,5)=='black')
			side_x = black_king_x,side_y = black_king_y;
		else
			side_x = white_king_x,side_y=white_king_y;
			var king_place = String.fromCharCode(96+y_pos)+'_'+(x_pos).toString();
		$('#'+king_place).attr('data-attribute','blank');
					for(var i=y_pos+1;i<=8;i++)
			{
				var x = String.fromCharCode(i+96)+'_'+(x_pos).toString();
				//alert(x);
				var at = $('#'+x).attr('data-attribute');
				//alert(at);
				if(at=='blank'&&check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					
				{$('#'+king_place).attr('data-attribute',attr);
					return 1;
				}
				else if(at=='blank'&&!check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					{	
				$('#'+king_place).attr('data-attribute',attr);
				return 1;
					}
					break;
				}
						
			}
			for(var i=y_pos-1;i>=1;i--)
			{
				var x = String.fromCharCode(i+96)+'_'+(x_pos).toString();
				//alert(x);
				var at = $('#'+x).attr('data-attribute');
				//alert(at);
				if(at=='blank'&&check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
				{$('#'+king_place).attr('data-attribute',attr);
				return 1;}
				else if(at=='blank'&&!check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					{$('#'+king_place).attr('data-attribute',attr);
						return 1;
					}
					break;
				}
						
			}
			for(var i=x_pos+1;i<=8;i++)
			{
				var x = String.fromCharCode(y_pos+96)+'_'+(i).toString();
				var at = $('#'+x).attr('data-attribute');
				if(at=='blank' && check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
				{$('#'+king_place).attr('data-attribute',attr);
			return 1;
				}
				else if(at=='blank'&&!check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					{$('#'+king_place).attr('data-attribute',attr);
					return 1;}
					break;
				}
						
			}
			for(var i=x_pos-1;i>=1;i--)
			{
				var x = String.fromCharCode(y_pos+96)+'_'+(i).toString();
				var at = $('#'+x).attr('data-attribute');
				if(at=='blank'&&check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
				{$('#'+king_place).attr('data-attribute',attr);
				return 1;}
				else if(at=='blank'&&!check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					{$('#'+king_place).attr('data-attribute',attr);
					return 1;}
					break;
				}
						
			}
			
		$('#'+king_place).attr('data-attribute',attr);
		return 0;
	}
	
	function can_knight(x_pos,y_pos,attr)
	{
		var side_x,side_y;
		if(attr.substr(0,5)=='black')
			side_x = black_king_x,side_y = black_king_y;
		else
			side_x = white_king_x,side_y=white_king_y;
			var king_place = String.fromCharCode(96+y_pos)+'_'+(x_pos).toString();
		$('#'+king_place).attr('data-attribute','blank');
		
		for(var i = Math.max(1,x_pos-2);i<=Math.min(8,x_pos+2);i++)
			for(var j = Math.max(1,y_pos-2);j<=Math.min(8,y_pos+2);j++)
			{
				if((Math.abs(x_pos-i)==Math.abs(y_pos-j))||Math.abs(x_pos-i)==0||y_pos-j==0)
					continue;
				var x = String.fromCharCode(96+j)+'_'+(i).toString();
				var at = $('#'+x).attr('data-attribute');
				if((at.substr(0,5)==attr.substr(0,5)))
					continue;
				if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
				{
					$('#'+king_place).attr('data-attribute',attr);return 1;
				}
			}
			
		
		$('#'+king_place).attr('data-attribute',attr);
	return 0;
	}
	
	function can_queen(x_pos,y_pos,attr)
	{
		if(can_bishop(x_pos,y_pos,attr))
			return 1;
		return can_rook(x_pos,y_pos,attr);
		
	}
	
	function can_bishop(x_pos,y_pos,attr)
	{
		var side_x,side_y;
		if(attr.substr(0,5)=='black')
			side_x = black_king_x,side_y = black_king_y;
		else
			side_x = white_king_x,side_y=white_king_y;
			var king_place = String.fromCharCode(96+y_pos)+'_'+(x_pos).toString();
		$('#'+king_place).attr('data-attribute','blank');
		for(var i=1;i<=Math.min(8-x_pos,8-y_pos);i++)
			{
				var x = String.fromCharCode(y_pos+i+96)+'_'+(x_pos+i).toString();
				//alert(x);
				var at = $('#'+x).attr('data-attribute');
				//alert(at);
				if(at=='blank'&&check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
				{$('#'+king_place).attr('data-attribute',attr);
				return 1;}
				else if(at=='blank'&&!check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					{$('#'+king_place).attr('data-attribute',attr);
						return 1;
					}
					break;
				}
						
			}
			for(var i=1;i<=Math.min(8-x_pos,y_pos-1);i++)
			{
				var x = String.fromCharCode(y_pos-i+96)+'_'+(x_pos+i).toString();
				//alert(x);
				var at = $('#'+x).attr('data-attribute');
				//alert(at);
				if(at=='blank'&& check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
				{$('#'+king_place).attr('data-attribute',attr);
				return 1;}
				else if(at=='blank'&&!check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					{$('#'+king_place).attr('data-attribute',attr);
					return 1;}
					break;
				}
						
			}
			for(var i=1;i<=Math.min(x_pos-1,y_pos-1);i++)
			{
				var x = String.fromCharCode(y_pos+96-i)+'_'+(x_pos-i).toString();
				var at = $('#'+x).attr('data-attribute');
				if(at=='blank'&&check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
				{$('#'+king_place).attr('data-attribute',attr);
				return 1;}
				else if(at=='blank'&&!check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					{$('#'+king_place).attr('data-attribute',attr);
					return 1;}
					break;
				}
						
			}
			for(var i=1;i<=Math.min(x_pos-1,8-y_pos);i++)
			{
				var x = String.fromCharCode(y_pos+96+i)+'_'+(x_pos-i).toString();
				var at = $('#'+x).attr('data-attribute');
				if(at=='blank'&&check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
				{$('#'+king_place).attr('data-attribute',attr);
				return 1;}
				else if(at=='blank'&&!check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					{$('#'+king_place).attr('data-attribute',attr);
					return 1;}
					break;
				}
						
			}
			
			
		$('#'+king_place).attr('data-attribute',attr);
		
	return 0;
	}
	
	
	function white_pawn(x_pos,y_pos,attr)
	{
		if(y_pos==1)
			return;
		var side_x,side_y;
		if(attr.substr(0,5)=='black')
			side_x = black_king_x,side_y = black_king_y;
		else
			side_x = white_king_x,side_y=white_king_y;
		var king_place = String.fromCharCode(96+y_pos)+'_'+(x_pos).toString();
		$('#'+king_place).attr('data-attribute','blank');
		//alert(attr);
			for(var i = Math.max(1,x_pos-1);i<=Math.min(8,x_pos+1);i++)
			{
				var x = String.fromCharCode(y_pos-1+96)+'_'+(i).toString();
				var at = $('#'+x).attr('data-attribute');
				if((i==x_pos-1||i==x_pos+1)&&(at.substr(0,5)=='black')&&check_condition(x,attr,side_x,side_y,'white_king'))
					colour(x);
				if(i==x_pos && at=='blank'&&check_condition(x,attr,side_x,side_y,'white_king'))
					colour(x);
				
			}
			if(y_pos==7)
			{
			var x= String.fromCharCode(y_pos+96-2)+'_'+(x_pos).toString();
			var at = $('#'+x).attr('data-attribute');
			if(y_pos==7&& at=='blank'&&check_condition(x,attr,side_x,side_y,'white_king'))
			{
				colour(x);
			}
	}
			$('#'+king_place).attr('data-attribute',attr);	
		
	}
	
	function black_pawn(x_pos,y_pos,attr){
		if(y_pos==8)
			return;
		var side_x,side_y;
		if(attr.substr(0,5)=='black')
			side_x = black_king_x,side_y = black_king_y;
		else
			side_x = white_king_x,side_y=white_king_y;
			var king_place = String.fromCharCode(96+y_pos)+'_'+(x_pos).toString();
		$('#'+king_place).attr('data-attribute','blank');
		for(var i = Math.max(1,x_pos-1);i<=Math.min(8,x_pos+1);i++)
			{
				var x = String.fromCharCode(y_pos+1+96)+'_'+(i).toString();
				var at = $('#'+x).attr('data-attribute');
				//alert(at.substr(0,5));
				if((i==x_pos-1||i==x_pos+1)&&(at.substr(0,5)=="white")&&check_condition(x,attr,side_x,side_y,'black_king'))
					colour(x);
				if(i==x_pos && at=='blank'&& check_condition(x,attr,side_x,side_y,'black_king'))
					colour(x);
				
			}
			if(y_pos==2)
			{
			var x= String.fromCharCode(y_pos+96+2)+'_'+(x_pos).toString();
			var at = $('#'+x).attr('data-attribute');
			if(y_pos==2&& at=='blank'&&check_condition(x,attr,side_x,side_y,'black_king'))
			{
				colour(x);
			}
			}
		$('#'+king_place).attr('data-attribute',attr);
		
		
	}
	
	function rook(x_pos,y_pos,attr){
		
		var side_x,side_y;
		if(attr.substr(0,5)=='black')
			side_x = black_king_x,side_y = black_king_y;
		else
			side_x = white_king_x,side_y=white_king_y;
			var king_place = String.fromCharCode(96+y_pos)+'_'+(x_pos).toString();
		$('#'+king_place).attr('data-attribute','blank');
					for(var i=y_pos+1;i<=8;i++)
			{
				var x = String.fromCharCode(i+96)+'_'+(x_pos).toString();
				//alert(x);
				var at = $('#'+x).attr('data-attribute');
				//alert(at);
				if(at=='blank'&&check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					colour(x);
				else if(at=='blank'&&!check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					colour(x);
					break;
				}
						
			}
			for(var i=y_pos-1;i>=1;i--)
			{
				var x = String.fromCharCode(i+96)+'_'+(x_pos).toString();
				//alert(x);
				var at = $('#'+x).attr('data-attribute');
				//alert(at);
				if(at=='blank'&&check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					colour(x);
				else if(at=='blank'&&!check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					colour(x);
					break;
				}
						
			}
			for(var i=x_pos+1;i<=8;i++)
			{
				var x = String.fromCharCode(y_pos+96)+'_'+(i).toString();
				var at = $('#'+x).attr('data-attribute');
				if(at=='blank' && check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					colour(x);
				else if(at=='blank'&&!check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					colour(x);
					break;
				}
						
			}
			for(var i=x_pos-1;i>=1;i--)
			{
				var x = String.fromCharCode(y_pos+96)+'_'+(i).toString();
				var at = $('#'+x).attr('data-attribute');
				if(at=='blank'&&check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					colour(x);
				else if(at=='blank'&&!check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					colour(x);
					break;
				}
						
			}
			
		$('#'+king_place).attr('data-attribute',attr);
		
	}
	
	function knight(x_pos,y_pos,attr)
	{
		var side_x,side_y;
		if(attr.substr(0,5)=='black')
			side_x = black_king_x,side_y = black_king_y;
		else
			side_x = white_king_x,side_y=white_king_y;
			var king_place = String.fromCharCode(96+y_pos)+'_'+(x_pos).toString();
		$('#'+king_place).attr('data-attribute','blank');
		
		for(var i = Math.max(1,x_pos-2);i<=Math.min(8,x_pos+2);i++)
			for(var j = Math.max(1,y_pos-2);j<=Math.min(8,y_pos+2);j++)
			{
				//alert(i+' '+j);
				if((Math.abs(x_pos-i)==Math.abs(y_pos-j))||Math.abs(x_pos-i)==0||y_pos-j==0)
					continue;
				var x = String.fromCharCode(96+j)+'_'+(i).toString();
				var at = $('#'+x).attr('data-attribute');
				if((at.substr(0,5)==attr.substr(0,5)))
					continue;
				if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
				colour(x);
		
			}
			
		
		$('#'+king_place).attr('data-attribute',attr);
	}
	
	function king(x_pos,y_pos,attr){
		
		
		var king_place = String.fromCharCode(96+y_pos)+'_'+(x_pos).toString();
		$('#'+king_place).attr('data-attribute','blank');
			for(var i = Math.max(1,x_pos-1);i<=Math.min(8,x_pos+1);i++)
			for(var j = Math.max(1,y_pos-1);j<=Math.min(8,y_pos+1);j++)
			{
				
				if(x_pos-i==0&&y_pos-j==0)
					continue;
				var x = String.fromCharCode(96+j)+'_'+(i).toString();
				var at = $('#'+x).attr('data-attribute');
			//	alert(i+' '+j+' '+at);
				if((at.substr(0,5)==attr.substr(0,5)))
				{
				continue;
				}
				else if(check_safe_king(i,j,attr))
				{
		//			alert(i+' '+j+' '+at);
				colour(x);
				}
				//else
					//alert(i+' '+j+' '+at);
		
			}
		
		$('#'+king_place).attr('data-attribute',attr);
	}
	
	
	function bishop(x_pos,y_pos,attr)
	{
		var side_x,side_y;
		if(attr.substr(0,5)=='black')
			side_x = black_king_x,side_y = black_king_y;
		else
			side_x = white_king_x,side_y=white_king_y;
			var king_place = String.fromCharCode(96+y_pos)+'_'+(x_pos).toString();
		$('#'+king_place).attr('data-attribute','blank');
		for(var i=1;i<=Math.min(8-x_pos,8-y_pos);i++)
			{
				var x = String.fromCharCode(y_pos+i+96)+'_'+(x_pos+i).toString();
				//alert(x);
				var at = $('#'+x).attr('data-attribute');
				//alert(at);
				if(at=='blank'&&check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					colour(x);
				else if(at=='blank'&&!check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					colour(x);
					break;
				}
						
			}
			for(var i=1;i<=Math.min(8-x_pos,y_pos-1);i++)
			{
				var x = String.fromCharCode(y_pos-i+96)+'_'+(x_pos+i).toString();
				//alert(x);
				var at = $('#'+x).attr('data-attribute');
				//alert(at);
				if(at=='blank'&& check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					colour(x);
				else if(at=='blank'&&!check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					colour(x);
					break;
				}
						
			}
			for(var i=1;i<=Math.min(x_pos-1,y_pos-1);i++)
			{
				var x = String.fromCharCode(y_pos+96-i)+'_'+(x_pos-i).toString();
				var at = $('#'+x).attr('data-attribute');
				if(at=='blank'&&check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					colour(x);
				else if(at=='blank'&&!check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					colour(x);
					break;
				}
						
			}
			for(var i=1;i<=Math.min(x_pos-1,8-y_pos);i++)
			{
				
				var x = String.fromCharCode(y_pos+96+i)+'_'+(x_pos-i).toString();
				var at = $('#'+x).attr('data-attribute');
				//alert(x+'  '+at);
				if(at=='blank'&&check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					colour(x);
				else if(at=='blank'&&!check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					if(check_condition(x,attr,side_x,side_y,attr.substr(0,5)+'_king'))
					colour(x);
					break;
				}
						
			}
			
			
		$('#'+king_place).attr('data-attribute',attr);
		
	}
	
	function check_white_pawn(x_pos,y_pos,attr,check_x,check_y){   //1 value is  to check whether white piece attack at a given place 2 for a black piece
	
		if(y_pos==1)
					return 1;
	
			for(var i = Math.max(1,x_pos-1);i<=Math.min(8,x_pos+1);i++)
			{
				
				var x = String.fromCharCode(y_pos-1+96)+'_'+(i).toString();
				var at = $('#'+x).attr('data-attribute');
				if(check_x==i&&check_y == y_pos-1 &&(i==x_pos-1||i==x_pos+1))
					{
					return 0;
					}
				if((i==x_pos-1||i==x_pos+1)&&(at.substr(0,5)=='black'))
					
				if(i==x_pos && at=='blank')
					continue;
				
			}
		return 1;
	}
	
	function check_black_pawn(x_pos,y_pos,attr,check_x,check_y){
		if(y_pos==8)
					return 1;
		for(var i = Math.max(1,x_pos-1);i<=Math.min(8,x_pos+1);i++)
			{
				
				var x = String.fromCharCode(y_pos+1+96)+'_'+(i).toString();
				var at = $('#'+x).attr('data-attribute');
				//alert(at.substr(0,5));
				if(check_x == i && check_y == y_pos+1&&(i==x_pos-1||i==x_pos+1))
					{
						return 0;
					}
				if((i==x_pos-1||i==x_pos+1)&&(at.substr(0,5)=="white"))
					
				if(i==x_pos && at=='blank')
					continue;
				
			}
			return 1;
		
		
	}
	function check_king(x_pos,y_pos,attr,check_x,check_y){
		
		var king_place = String.fromCharCode(96+y_pos)+'_'+(x_pos).toString();
		$('#'+king_place).attr('data-attribute','blank');
			for(var i = Math.max(1,x_pos-1);i<=Math.min(8,x_pos+1);i++)
			for(var j = Math.max(1,y_pos-1);j<=Math.min(8,y_pos+1);j++)
			{
				
				if(x_pos-i==0&&y_pos-j==0)
					continue;
				var x = String.fromCharCode(96+j)+'_'+(i).toString();
				var at = $('#'+x).attr('data-attribute');
			//	alert(i+' '+j+' '+at);
				if((at.substr(0,5)==attr.substr(0,5)))
				{
				continue;
				}
				else if(check_safe_king(i,j,attr))
				{
		//			alert(i+' '+j+' '+at);
				colour(x);
				}
				//else
					//alert(i+' '+j+' '+at);
		
			}
		
		$('#'+king_place).attr('data-attribute',attr);
		
	}
	
	function check_rook(x_pos,y_pos,attr,check_x,check_y){
					for(var i=y_pos+1;i<=8;i++)
			{
				var x = String.fromCharCode(i+96)+'_'+(x_pos).toString();
				//alert(x);
				var at = $('#'+x).attr('data-attribute');
				//alert(at);
				if(check_x == x_pos && check_y==i)
					{
					return 0;
					}
					else
				if(at=='blank')
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					
					break;
				}
						
			}
			for(var i=y_pos-1;i>=1;i--)
			{
				var x = String.fromCharCode(i+96)+'_'+(x_pos).toString();
				//alert(x);
				var at = $('#'+x).attr('data-attribute');
				//alert(at);
				if(check_x == x_pos && check_y==i)
					{
						return 0;
						
					}
					else
				if(at=='blank')
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					
					break;
				}
						
			}
			for(var i=x_pos+1;i<=8;i++)
			{
				var x = String.fromCharCode(y_pos+96)+'_'+(i).toString();
				var at = $('#'+x).attr('data-attribute');
				if(check_x==i&& check_y==y_pos)
					{
					return 0;
					}
					else
				if(at=='blank')
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					
					break;
				}
						
			}
			for(var i=x_pos-1;i>=1;i--)
			{
				var x = String.fromCharCode(y_pos+96)+'_'+(i).toString();
				var at = $('#'+x).attr('data-attribute');
				if(check_x == i && check_y == y_pos)
					{
					return 0;
					}
					else
				if(at=='blank')
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					break;
				}
						
			}
			
		return 1;
		
	}
	
	function check_knight(x_pos,y_pos,attr,check_x,check_y)
	{
		for(var i = Math.max(1,x_pos-2);i<=Math.min(8,x_pos+2);i++)
			for(var j = Math.max(1,y_pos-2);j<=Math.min(8,y_pos+2);j++)
			{
				if((Math.abs(x_pos-i)==Math.abs(y_pos-j))||Math.abs(x_pos-i)==0||y_pos-j==0)
					continue;
				 if(check_x==i && check_y==j)
				{
					return 0;
				}
				var x = String.fromCharCode(96+j)+'_'+(i).toString();
				var at = $('#'+x).attr('data-attribute');
				if((at.substr(0,5)==attr.substr(0,5)))
					continue;
				
			}
			
		return 1;
		
	}
	
	function check_king(x_pos,y_pos,attr,check_x,check_y){
		
		
			for(var i = Math.max(1,x_pos-1);i<=Math.min(8,x_pos+1);i++)
			for(var j = Math.max(1,y_pos-1);j<=Math.min(8,y_pos+1);j++)
			{
		
				if(x_pos-i==0&&y_pos-j==0)
					continue;
				if(check_x==i&&check_y==j)
					return 0;
		
			}
		
		return 1;
		
	}
	
	function check_queen(x_pos,y_pos,attr,check_x,check_y)
	{
		var val = check_bishop(x_pos,y_pos,attr,check_x,check_y);
		if(!val)return val;
		val = check_rook(x_pos,y_pos,attr,check_x,check_y);
		
		return val;
		
		
	}
	
	function check_bishop(x_pos,y_pos,attr,check_x,check_y)
	{
	//	alert(check_x);
		//		alert(check_y);
				
		for(var i=1;i<=Math.min(8-x_pos,8-y_pos);i++)
			{
				var x = String.fromCharCode(y_pos+i+96)+'_'+(x_pos+i).toString();
				var at = $('#'+x).attr('data-attribute');
			//	alert(x_pos+i);
			//	alert(y_pos+i);
				//alert(at);

				if(check_x==x_pos+i&& check_y == y_pos+i)
					{
						//alert(at);
						
						return 0;
					}
					else
				if(at=='blank')
				{
					continue;
				}
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
				{
							break;
				}
				else
				{


					break;
				}
						
			}
			for(var i=1;i<=Math.min(8-x_pos,y_pos-1);i++)
			{
				var x = String.fromCharCode(y_pos-i+96)+'_'+(x_pos+i).toString();
				var at = $('#'+x).attr('data-attribute');
				//alert(at);
				if(check_x==x_pos+i && check_y == y_pos-i)
					{
						return 0;
					}
					else
				if(at=='blank')
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					
					break;
				}
						
			}
			for(var i=1;i<=Math.min(x_pos-1,y_pos-1);i++)
			{
				var x = String.fromCharCode(y_pos+96-i)+'_'+(x_pos-i).toString();
				var at = $('#'+x).attr('data-attribute');
				if(check_x==x_pos-i&& check_y==y_pos-i)
					{
					return 0;
					}
					else
				if(at=='blank')
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					
					break;
				}
						
			}
			for(var i=1;i<=Math.min(x_pos-1,8-y_pos);i++)
			{
				var x = String.fromCharCode(y_pos+96+i)+'_'+(x_pos-i).toString();
				var at = $('#'+x).attr('data-attribute');
				if(check_x==x_pos-i && check_y==y_pos+i)
					{
				//		alert(at);
						return 0;
					}
					else
				if(at=='blank')
					continue;
				else
				if((at.substr(0,5)=='black'&& attr.substr(0,5)=='black')||(at.substr(0,5)=='white' && attr.substr(0,5)=='white'))
							break;
				else
				{
					
					break;
				}
						
			}
			
		return 1;
		
		
	}
	
	$(document).on('click','.replace',function(){
		var attr = $(this).attr('id');
		var colour,x,y,at,at1 ;
		var i_f,j_f;
		for(var i = 1;i<=8;i++)
		{
			x = String.fromCharCode(1+96)+'_'+(i).toString();
			y= String.fromCharCode(8+96)+'_'+(i).toString();
			
				at = $('#'+x).attr('data-attribute');
				at1 = $('#'+y).attr('data-attribute');
				if(at=='white_pawn')
				{
					i_f = i,j_f = 1;
					colour = 'white';
					break;
					
				}
				else if(at1=='black_pawn')
				{
					i_f = i,j_f = 8;
					colour= 'black';
					break;
				}
		}
		
		if(colour=='white')
		{
			$('#'+x).attr('data-attribute',colour+'_'+attr);
			$('#'+x).css('background-image','url('+colour+'_'+attr+'.png)');
		}
		else
		{
			$('#'+y).attr('data-attribute',colour+'_'+attr);
			$('#'+y).css('background-image','url('+colour+'_'+attr+'.png)');
			
		}
		
		$('#l3').empty();
		choose = 1;
		check_conditions(colour+'_'+attr,i_f,j_f);
	});
	function check_conditions(attr,i,j)
	{
		var condition = 0;
		if(attr=="black_pawn")
		{
			if(!check_black_pawn(i,j,attr,white_king_x,white_king_y))
			{
				if(!check_king(white_king_x,white_king_y,"white_king"))
				condition = 2;
			else
				condition = Math.max(condition,1);
		}
		}
		else if(attr=="white_pawn")
		{
			if(!check_white_pawn(i,j,attr,black_king_x,black_king_y))
			{
				if(!check_king(black_king_x,black_king_y,"black_king"))
				condition = 2;
			else
				condition = Math.max(condition,1);
		}
		}
		else if(attr=="black_knight")
		{
			if(!check_knight(i,j,attr,white_king_x,white_king_y))
			{
				if(!check_king(white_king_x,white_king_y,"white_king"))
				condition = 2;
			else
				condition = Math.max(condition,1);
		}
		}
		else if(attr=="white_knight"){
			if(!check_knight(i,j,attr,black_king_x,black_king_y))
			{
				if(!check_king(black_king_x,black_king_y,"black_king"))
				condition = 2;
			else
				condition = Math.max(condition,1);
		}}
		else if(attr=="black_rook"){
			if(!check_rook(i,j,attr,white_king_x,white_king_y))
			{
			
				if(!check_king(white_king_x,white_king_y,"white_king"))
				condition = 2;
			else
				condition = Math.max(condition,1);
		}}
		else
		if(attr=="white_rook"){
			if(!check_rook(i,j,attr,black_king_x,black_king_y))
			{
				if(!check_king(black_king_x,black_king_y,"black_king"))
				condition = 2;
			else
				condition = Math.max(condition,1);
		}}
		else
		if(attr=="black_bishop"){
			if(!check_bishop(i,j,attr,white_king_x,white_king_y))
			{
				//alert(1);
				if(!check_king(white_king_x,white_king_y,"white_king"))
				condition = 2;
			else
				condition = Math.max(condition,1);
		}}
		if(attr=="white_bishop"){
			if(!check_bishop(i,j,attr,black_king_x,black_king_y))
			{
				if(!check_king(black_king_x,black_king_y,"black_king"))
				condition = 2;
			else
				condition = Math.max(condition,1);
		}}
		else
			if(attr=="black_queen"){
			if(!check_queen(i,j,attr,white_king_x,white_king_y))
			{
				if(!check_king(white_king_x,white_king_y,"white_king"))
				condition = 2;
			else
				condition = Math.max(condition,1);
			}}
		else
			if(attr=="white_queen"){
			if(!check_queen(i,j,attr,black_king_x,black_king_y))
			{
				if(!check_king(black_king_x,black_king_y,"black_king"))
				condition = 2;
			else
				condition = Math.max(condition,1);
			}}
		$("#l2").empty();
		var opp_colour;
		if(attr.substr(0,5)=='black')
			opp_colour='white'
		else
			opp_colour='black';
		if(condition==2 && can_protect(opp_colour))
			condition =1;
		if(condition==0)
			che = 0;
		else
		if(condition==1)
			$("#l2").append("<h1>check</h1>"),che = 1;
		else if(condition==2)
		{
			$("#l2").append("<h1>check mate</h1>");
			mate = 1;
			
		}
		
		
	}
	
$(".bt").click(function(){
	if(!mate&&choose)
	{
	var id = $(this).attr('id');
	var col = $('#'+id).css("background-color");
	var set = $('#'+id).attr('data-set');
	if(set=='1')
	{
		$('.bt').attr('data-set','0');
		var attr = $('#'+prev_id).attr('data-attribute');
		var ur = 'url('+attr+'.png)'
		$('#'+id).css('background-image',ur);
		$('.bt').css('background-color','white');
		$('.bt_bl').css('background-color','brown');
		
		$('#'+id).attr('data-attribute',attr);
		$('#'+prev_id).attr('data-attribute','blank');
		$('#'+prev_id).css('background-image','none');
		if(turn=="first player turn")
			turn = "second player turn";
		else turn = "first player turn";
			$("#l1").empty();
			$("#l1").append("<h1>"+turn+"</h1>");	
		//var condition = 0;
		var j = id.charCodeAt(0)-96;
		var i = parseInt(id[2]);
		
		check_conditions(attr,i,j);
		if(attr=="black_king")
		{
			black_king_x = i;
			black_king_y = j;
		}
		else if(attr=="white_king")
		{
			white_king_x = i;
			white_king_y = j;
			
		}
		
		if((attr=='black_pawn'&&j==8)||(attr=='white_pawn'&&j==1))
		{
			choose = 0;
			var chose_col = attr.substr(0,5);
			$('#l3').append("<button type = 'button' class = 'replace' id = 'knight'>knight</button><button type = 'button' class = 'replace' id = 'rook'>rook</button><button type = 'button' class = 'replace' id = 'bishop'>bishop</button><button type = 'button' class = 'replace' id = 'queen'>queen</button>");
		}			
	}
	else
	{
		$('button').attr('data-set','0');
//		$("button").css('background-color','white');
		$('.bt').css('background-color','white');
		$('.bt_bl').css('background-color','brown');
	
		prev_id = id;
		var y_pos = id.charCodeAt(0)-96;
		var x_pos = parseInt(id[2]);
		$('#'+id).css('background-color','yellow');
		var attr = $('#'+id).attr('data-attribute');
		if(attr=="black_pawn"&& turn=="second player turn")
		{
			black_pawn(x_pos,y_pos,attr);
			
		}
		else
		if(attr=='white_pawn'&& turn=="first player turn")
		{
			white_pawn(x_pos,y_pos,attr);
		}
		else
		if(((attr=='black_rook'&& turn=="second player turn")||(attr=='white_rook'&& turn=="first player turn")))
		{
			rook(x_pos,y_pos,attr);
			
		}
		
		
		else
		if(((attr=='black_bishop'&& turn=="second player turn")||(attr=='white_bishop'&& turn=="first player turn")))
		{
			
			bishop(x_pos,y_pos,attr);
			
			
		}
		else if(((attr=='white_knight'&& turn=="first player turn")||(attr=='black_knight'&& turn=="second player turn")))
		{
			knight(x_pos,y_pos,attr);
			
			
		}
		else if((attr=='white_king'&& turn=="first player turn")||(attr=='black_king'&& turn=="second player turn"))
		{
			king(x_pos,y_pos,attr);
		}
			
		
		else
		if(((attr=='black_queen'&& turn=="second player turn")||(attr=='white_queen'&& turn=="first player turn")))
		{
			rook(x_pos,y_pos,attr);
			bishop(x_pos,y_pos,attr);
			
			
		}
		
	}
	}
});

});