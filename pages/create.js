import { Component } from 'react';

const baseUrl ='http://localhost:5000?';

class CreateSet extends Component {
        state = {
                flashCards: '',
                setName: '',
                showCards: false,
                keys: [],
                values: []
        };

        submitCards = (event) => {
                event.preventDefault();
                this.setState({showCards:true});
        };

        saveCards = (event) => {
                event.preventDefault();
               
                var url = baseUrl + 'name=' + this.state.setName + '&data=' + this.state.flashCards
                
                console.log('url for query is: ',url);
                fetch(url,{method:"POST"})
                        .then(res => res.json())
                        .then(data => console.log(data));
        }

        renderFinishedCards(){
                const cardArray = this.state.flashCards.split(',');
                var keys = [];
                var values = [];

                const cardDisplay = cardArray.map((valuePair,index) => {
                        const pair = valuePair.split(':');
                        keys[index] = pair[0];
                        values[index] = pair[1];
                        return(
                               <li key={index} >{keys[index]} : {values[index]}</li>
                        );
                });
                
                return(
                   <ul>
                        {cardDisplay}
                   </ul>                   
                );
        };

        render(){
        
                return(
                        <div>
                                <h1>Create a Flash Card Set</h1>
                                <form action="submit" onSubmit={this.submitCards}>
                                        Name of Flash Card Set:<br/>
                                        <input type="text" onChange=
                                                {event => this.setState({setName:event.target.value})}/>
                                        <br/>Flash Card Value Pairs:<br/>
                                        <input type="text" onChange=
                                                {event => this.setState({flashCards:event.target.value})}
                                                style={{width:"75%"}}/><br/>
                                        <button type="submit">Create</button>
                                        <button onClick={this.saveCards}>Save</button>
                                </form>
                                {this.state.showCards && this.renderFinishedCards()}
                        </div>        
                );
        };
}

export default CreateSet;
