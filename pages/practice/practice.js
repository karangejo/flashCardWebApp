import { Component } from 'react';
import Layout from '../../components/navigation';

const baseURL = 'http://localhost:5000/cards?name=';

class Practice extends Component {
        state = {
                cardsName: '',
                flashCardList: [],
                prompts: [],
                targets: [],
                length: 0,
                currentStep: 0,
                playButton: true,
                playCards: false,
                wrongAnswer: false,
                answer: '',
                finished: false
        }; 
        
        static getInitialProps({query}){
                return {query};
        };

        componentDidMount(){
                const name = this.props.query.flashCardName;
                this.setState({cardsName: name});
                const url = baseURL + name; 
                
                console.log('url is: ', url);
                console.log('name is: ', name);

                fetch(url,{method: "GET"})
                        .then(res => res.json())
                        .then(data => {
                                this.setState({flashCardList:data[0].cards,playButton:true})
                                console.log('all data: ',data);
                                console.log('name: ',data[0].name);
                                console.log('cards: ',data[0].cards)
                        });
        };

        startMemoryGame = () => {
                console.log('playing now');
                var prompts = [];
                var targets = [];

                this.state.flashCardList.forEach((item,index) => {
                        prompts[index] = item.prompt;
                        targets[index] = item.target;
                })

                this.setState({play:true,playButton:false,prompts:prompts,targets:targets,length:prompts.length});
        };

        renderListOfFlashCards(){
                
                        const nameList = this.state.flashCardList.map((item,index) => {
                        //list out key values
                        return <li key={index}>{item.prompt} {item.target}</li>;
                });


                return(
                        <div>
                                <ul>
                                        {nameList}
                                </ul>
                                <button onClick={this.startMemoryGame}>Start Playing</button>
                        </div>
                );
        };

        onSubmit = (event) => {
                event.preventDefault();

                if(this.state.answer === this.state.targets[this.state.currentStep]){
                                console.log('Correct!'); 
                                var step = this.state.currentStep + 1;
                                console.log('current step is: ',step);
                                console.log('promts.length is: ', this.state.prompts.length);
                                this.setState({wrongAnswer: false, currentStep: step});
                                if(step == this.state.prompts.length){
                                        console.log('finished');
                                        this.setState({play: false, finished: true});
                                }
                } else {
                        console.log('Try again!');
                        this.setState({wrongAnswer: true});
                }

        };

        tryAgain(){
                return(
                        <h4>Wrong answer! Try Again!</h4>
                );
        };

        renderMemoryGame(){
                
                return(
                        <div>
                                <h5>{this.state.prompts[this.state.currentStep]}</h5>
                                {this.state.wrongAnswer && this.tryAgain()}
                                <form onSubmit={this.onSubmit}>
                                        <input type="text" onChange={event => this.setState({answer: event.target.value})}/>
                                <button type="submit">Enter</button>
                                </form>
                        </div>        
                );         
        };

        renderFinish(){

                return(
                        <h4>Finished! Good Work!</h4>      
                );
        };

        render(){
        
                return(
                        <Layout>
                                <h1>Flash Card Practice</h1>
                                {this.state.playButton && this.renderListOfFlashCards()}
                                {this.state.play && this.renderMemoryGame()}
                                {this.state.finished && this.renderFinish()}
                        </Layout>
                );
        };
}

export default Practice;
