import React, {Component} from 'react';
import axios from 'axios';
import Spinner from '../layouts/Spinner';
import {Link} from 'react-router-dom';

class Lyrics extends Component{

    state={
        track:{},
        lyrics:{}
    }

    componentDidMount(){
        console.log(this.props.match.params.id);
        axios.get('https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/'
        +'track.lyrics.get?track_id='
        +this.props.match.params.id
        +'&apikey='
        +'10a2d4832ec518f86205fb735be374e1'
        )
        .then(res=>{
            console.log(res.data);
            this.setState({
                lyrics:res.data.message.body.lyrics
            })

            return axios.get('https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/'
            +'track.get?track_id='
            +this.props.match.params.id
            +'&apikey='
            +'10a2d4832ec518f86205fb735be374e1'
            );

        })
        .then(res=>{
            console.log(res.data)
            this.setState({
                track:res.data.message.body.track
            })
        })
        .catch(err=>console.log(err));

    }

    render(){
        const {track, lyrics}=this.state;
        console.log("state "+JSON.stringify(this.state));

        if(track ===undefined 
            || lyrics === undefined 
            || Object.keys(track).length===0
            || Object.keys(lyrics).length===0
        ){
                return <Spinner/>
        }else{
            return (
                <React.Fragment>
                    <Link to="/" className="btn btn-dark btn-sm mb-4" >Go Back</Link>
                    <div className="card" >

                        <div className="card-header" >
                            {track.track_name} by <span className="text-secondary" >
                                {track.artist_name}
                            </span>
                        </div>

                        <div className="card-body" >
                            <p className="card-text" >{lyrics.lyrics_body}</p>
                        </div>

                    </div>

                    <ul className="list-group mt-3" >
                        <li className="list-group-item" >
                            <strong>Album ID</strong>: {track.album_id}
                        </li>
                    </ul>

                </React.Fragment>
             )
        }

      
    }
}

export default Lyrics;