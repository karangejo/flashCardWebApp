import { Component } from 'react';

const url = 'http://localhost:5000/cards'

class Practice extends Component {
        state = {
                flashCardList: {},
                render: false
        }; 
        
        componentDidMount(){
                fetch(url,{method: "GET"})
                        .then(res => res.json())
                        .then(data => {
                                this.setState({flashCardList:data,render:true})
                                console.log('from data: ',data);
                                console.log(data[0].name);
                        });
        };

        renderListOfFlashCards(){
                const nameList = this.state.flashCardList.map((item,index) => {
                       return <li key={index}>{item.name}</li>;
                });

                return(
                        <ul>
                                {nameList}
                        </ul>
                );
        };

        render(){
        
                return(
                        <div>
                                <h1>Flash Card Practice Base</h1>
                                {this.state.render && this.renderListOfFlashCards()}
                        </div>
                );
        };
}

export default Practice;
