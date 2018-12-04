const RM = [[0.25, 0.25, 0, 0.25, 0.25, 0, 0, 0, 0],
				[0.2, 0.2, 0.2, 0, 0.2, 0.2, 0, 0, 0],
				[(1/3), 0, 0, (1/3), 0, (1/3), 0, 0, 0],
				[0.2, 0, 0, 0.2, 0.2, 0, 0.2, 0.2, 0],
				[0, 0, 0, 0.2, 0.2, 0.2, 0, 0.2, 0.2],
				[0, 0, 0, 0, 0, 0.5, 0, 0, 0.5],
				[0, 0, 0, (1/3), 0, 0, (1/3), (1/3), 0],
				[0, 0, 0, 0, 0, 0, (1/3), (1/3), (1/3)],
				[0, 0, 0, 0, 0, 0, 0, 0.5, 0.5]];

const indy = [0,1,2,3,4,5,6,7,8];

past = [];

states = ['strangers', 'friends with benefits(low)', 'friends with benefits(high)',
			'friends', 'friends with benefits(emo)', 'relationship(early)',
			'close friends', 'relationship(late)', 'honeymooon period'];

colors = ['FFCCCC', 'FF9999', 'FF6666', 'CCE5FF', '99CCFF', '3399FF', 'E5CCFF', 'CC99FF', 'B266FF'];

var state = 0;

function checkEnd(){
	if(past.length > 1)
	{
		if(past.includes(5) || past.includes(7) || past.includes(8)){
			if(past[past.length - 1] == 0 || past[past.length - 1] == 3)
				return true;
		}
		if(past.includes(1) || past.includes(2))
		{
			if(past[past.length - 1] == 0)
				return true;
		}
	}
	return false;
}

function setColor() {
        var property = document.getElementById("statebox");
        property.style.backgroundColor = colors[state];
}

function traj(){
	str = "";
	for(i = 0; i < past.length;i++)
	{
		str += states[past[i]] + " - ";
	}
	console.log(str);
	document.getElementById("trajectory").innerHTML = str;

}

function changeStates(){
	require(['https://unpkg.com/mathjs@5.3.1/dist/math.min.js'], function (math) {
    // evaluate some expression
    if(state == -1){
    	state = 0;
    	var property = document.getElementById("statebox");
		document.getElementById("states").innerHTML = states[state];
		property.style.backgroundColor = colors[state];
		past.push(state);
    }
    else{
	    var new_state = math.pickRandom(indy, RM[state]);
		state = new_state;
		past.push(state);
		if(this.checkEnd()){
			document.getElementById("states").innerHTML = "End";
			var property = document.getElementById("statebox");
			property.style.backgroundColor = '#F8F8FF';
			traj();
			state = -1;
			past = [];
		}
		else{
			document.getElementById("states").innerHTML = states[state];
			setColor();
			traj();
		}
	}

  })
} 


//start
var property = document.getElementById("statebox");
document.getElementById("states").innerHTML = states[state];
property.style.backgroundColor = colors[state];
past.push(state);
