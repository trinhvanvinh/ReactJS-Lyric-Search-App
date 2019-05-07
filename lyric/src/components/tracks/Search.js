import React, {Component} from 'react';
import axios from 'axios';
import {Consumer} from '../../context';

class Search extends Component{
    state={
        trackTitle:''
    }

    onChange(e){
        this.setState({    
            trackTitle:  e.target.value
        })
    }

    findTrack=(dispatch,e)=>{
        e.preventDefault();
        axios.get(
            'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track='
            + this.state.trackTitle
            +'&page_size=10&page=1&s_track_rating=desc&apikey='
            +'10a2d4832ec518f86205fb735be374e1'
        )
        .then(res=>{
            console.log(res)
            dispatch({
                type:"SEARCH_TRACKS",
                payload:res.data.message.body.track_list
            })
            this.setState({
                trackTitle:''
            })
        })
        .catch(err=>console.log(err));
    }

    render(){
        return (
           <Consumer>
               {value=>{
                   console.log(value)
                   const {dispatch}=value;
                   return (
                    <div className="card card-body mb-4 p-4" >
                        <h1 className="display-4 text-center" > 
                            <i className="fas fa-music" /> Search for a Song
                        </h1>
                        <p className="lead text-center" >Get the lyrics for any song</p>
                        <form onSubmit={this.findTrack} >
                            <div className="form-group" >
                                <input type="text" className="form-control form-control-lg"
                                    placeholder="Song title..."
                                    name="trackTitle"
                                    value={this.state.trackTitle}
                                    onChange={this.onChange.bind(this)}
                                />
                            </div>
                            <button 
                            className="btn btn-primary btn-lg btn-block mb-5"
                             type="submit" >
                                Get Track Lyrics
                            </button>
                        </form>
                    </div>
                   );
               }}
           </Consumer>
        )
    }

}

export default Search;