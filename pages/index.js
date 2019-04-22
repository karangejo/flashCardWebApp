import { Component } from 'react';
import Layout from '../components/navigation';

const url = 'http://localhost:5000'
class Home extends Component {
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
                        return( <li key={index}>
                                        <a href={`/practice/${item.name}`}>
                                                {item.name}
                                        </a>
                                </li>
                        );
                });

                return(
                        <ul>
                                {nameList}
                        </ul>
                );
        };

        render(){
        
                return(
                        <Layout>
                                <h1>Flash Card Home Base</h1>
                                {this.state.render && this.renderListOfFlashCards()}
                        </Layout>
                );
        };
}

export default Home;
