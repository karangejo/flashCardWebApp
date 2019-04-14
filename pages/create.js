import { Component } from 'react';

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
                                        <input type="text" onChange={event => this.setState({setName:event.target.value})}/><br/>
                                        Flash Card Value Pairs:<br/>
                                        <input type="text" onChange={event => this.setState({flashCards:event.target.value})}
                                                style={{width:"75%",height:"200px"}}/><br/>
                                        <button type="submit">Create</button>
                                </form>
                                {this.state.showCards && this.renderFinishedCards()}
                        </div>        
                );
        };
}

export default CreateSet;
