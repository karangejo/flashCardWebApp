import { Component } from 'react';

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

        renderMemoryGame(){
                
                return(
                        <div>
                                <h5>{this.state.prompts[this.state.currentStep]}</h5>
                                <input type="text"/>
                        </div>        
                );         
        };

        render(){
        
                return(
                        <div>
                                <h1>Flash Card Practice</h1>
                                {this.state.playButton && this.renderListOfFlashCards()}
                                {/*this.state.play && this.renderMemoryGame()*/}
                        </div>
                );
        };
}

export default Practice;
