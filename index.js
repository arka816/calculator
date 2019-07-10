import React from 'react';
import ReactDOM from 'react-dom';
import './calculator.css';


class Test extends React.Component {
	constructor(){
		super();
		this.state = {question: "", 
		answer: "", 
		display: "0",
		mode: "normal"};
	}
	fact = (a) =>{
		if(a === 0)
		{
			return 1;
		}
		return a*this.fact(a-1);
	}
	display = (a) =>{
		if(this.state.display === "0")
			this.state.display = "";
		this.setState({question: this.state.question+a});
		if(a === "**")
			this.setState({display: this.state.display+"^"});
		else if(a === "*")
			this.setState({display: this.state.display+"x"});
		else if(a === "π")
		{
			this.setState({display: this.state.display+"π", question: this.state.question+"3.14159265359"})
		}
		else if(a === "e")
		{
			this.setState({display: this.state.display+"e", question: this.state.question+"2.71828182846"})
		}
		else if(a === "/")
			this.setState({display: this.state.display+"÷"});
		else if(a === "!")
		{
			var str = this.state.question;
			var i = Math.max(str.lastIndexOf("+"), str.lastIndexOf("-"), str.lastIndexOf("*"), str.lastIndexOf("/"), str.lastIndexOf("^"));
			if(i === -1)
				i=0;


			var arr = [str.lastIndexOf("+"), str.lastIndexOf("-"), str.lastIndexOf("*"), str.lastIndexOf("/"), str.lastIndexOf("^")];
			var index = 1;
			var max = arr[0];
			for(var j = 1; j<arr.length; j++)
				if(arr[j] > max)
				{
					max = arr[j];
					index = j+1;
				}


			var str1 = str.substring(0,i);
			var str2 = str.substring(i+1,str.indexOf("!"));
			var num = eval(str2);

			var op = "";
			if(index === 1)
				op = "+";
			else if(index === 2)
				op = "-";
			else if(index === 3)
				op = "*";
			else if(index === 4)
				op = "/";
			else if(index === 5)
				op = "^";

			this.setState({question: str1+op+this.fact(num)});
			this.setState({display: this.state.display+"!"});
		}
		else
			this.setState({display: this.state.display+a});
	}
	clear = () =>{
		this.setState({question: "", answer: "", display: ""});
		this.setState({display: "0"});
	}
	clearLast = () =>{
		var str = this.state.question;
		str = str.substring(0, str.length-1);
		this.setState({question: str});

		var str = this.state.display;
		str = str.substring(0, str.length-1);
		this.setState({display: str});
		if(this.state.display == "")
			this.setState({display: "0"});
	}
	evaluate = () =>{
		try
		{
			var ans = eval(this.state.question);
		}
		catch(err)
		{
			this.setState({answer: "NaN"});
		}
		if(ans !== undefined && ans !== "" && ans !== null && ans !== NaN)
			this.setState({answer: "="+ans});
	}
	changeMode = () =>{
		if(this.state.mode === "normal")
			this.setState({mode: "scientific"});
		else if(this.state.mode === "scientific")
			this.setState({mode: "normal"});
	}
	render() {
		if(this.state.mode === "normal")
			return (
		    	<div>
					<div className="container">
						<h1 className="heading">Calculator</h1>
						<div className="screen">
							<p>{this.state.display}</p>
							<p>{this.state.answer}</p>
						</div>
						<div className="keypad">
							<div className = "btnContainerN">
								<button id="scientific" onClick={() => this.display("+")}>+</button>
								<button id="scientific" onClick={() => this.display("-")}>-</button>
								<button id="scientific" onClick={() => this.display("*")}>x</button>
								<button id="scientific" onClick={() => this.display("/")}>÷</button>
								<button id="convert" onClick={() => this.changeMode()}></button>
							</div><br />
							<div className = "btnContainerN">
								<button onClick={() => this.display(1)}>1</button>
								<button onClick={() => this.display(2)}>2</button>
								<button onClick={() => this.display(3)}>3</button>
								<button onClick={() => this.display("(")}>(</button>
							</div>
							<div className = "btnContainerN">
								<button onClick={() => this.display(4)}>4</button>
							 	<button onClick={() => this.display(5)}>5</button>
								<button onClick={() => this.display(6)}>6</button>
								<button onClick={() => this.display(")")}>)</button>
							</div>
							<div className = "btnContainerN">
								<button onClick={() => this.display(7)}>7</button>
								<button onClick={() => this.display(8)}>8</button>
								<button onClick={() => this.display(9)}>9</button>
								<button id="fa" onClick={() => this.clearLast()}></button>
							</div>
							<div className = "btnContainerN">
								<button onClick={() => this.display(".")}>.</button>
								<button onClick={() => this.display(0)}>0</button>
								<button id="equal" onClick={() => this.evaluate()}>=</button>
								<button id="cancel" onClick={() => this.clear()}>AC</button>
							</div>
						</div>
					</div>
				</div>);
		else if(this.state.mode === "scientific")
			return (
	    	<div>
				<div className="container">
					<h1 className="heading">Calculator</h1>
					<div className="screen">
						<p>{this.state.display}</p>
						<p>{this.state.answer}</p>
					</div>
					<div className="keypad">
						<div className = "btnContainerS">
							<button id="scientific" onClick={() => this.display("+")}>+</button>
							<button id="scientific" onClick={() => this.display("-")}>-</button>
							<button id="scientific" onClick={() => this.display("*")}>x</button>
							<button id="scientific" onClick={() => this.display("/")}>÷</button>
							<button id="convert" onClick={() => this.changeMode()}></button>
						</div>
						<div className = "btnContainerS">
							<button id="scientific" onClick={() => this.display("!")}>!</button>
							<button onClick={() => this.display(1)}>1</button>
							<button onClick={() => this.display(2)}>2</button>
							<button onClick={() => this.display(3)}>3</button>
							<button onClick={() => this.display("(")}>(</button>
						</div>
						<div className = "btnContainerS">
							<button id="scientific" onClick={() => this.display("**")}>^</button>
							<button onClick={() => this.display(4)}>4</button>
						 	<button onClick={() => this.display(5)}>5</button>
							<button onClick={() => this.display(6)}>6</button>
							<button onClick={() => this.display(")")}>)</button>
						</div>
						<div className = "btnContainerS">
							<button id="scientific" onClick={() => this.display("π")}>π</button>
							<button onClick={() => this.display(7)}>7</button>
							<button onClick={() => this.display(8)}>8</button>
							<button onClick={() => this.display(9)}>9</button>
							<button id="fa" onClick={() => this.clearLast()}></button>
						</div>
						<div className = "btnContainerS">
							<button id="scientific" onClick={() => this.display("e")}>e</button>
							<button onClick={() => this.display(".")}>.</button>
							<button onClick={() => this.display(0)}>0</button>
							<button id="equal" onClick={() => this.evaluate()}>=</button>
							<button id="cancel" onClick={() => this.clear()}>AC</button>
						</div>
					</div>
				</div>
			</div>);
	  }
}
ReactDOM.render(<Test />, document.getElementById('root'));
