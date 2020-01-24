import React, {Component} from 'react';
import './Feed.css';
import api from '../services/Api';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

class Feed extends Component{
   state = {
      feed: []
   }
   
   async componentDidMount(){
      const response = await api.get('/post');

      this.setState({feed: response.data});
   }
   
   render(){
      return (
         <section id="post-list">
            {this.state.feed.map(post => (
               <article key={post._id}>
                  <header>
                     <div className="user-info">
                        <span>{post.author}</span>
                        <span className="place">{post.place}</span>
                     </div>
   
                     <img src={more} alt="Mais"></img>
                  </header>
   
                  <img src={`http://localhost:3333/files/${post.image}`} alt="Renato Takao Liberdade"/>
   
                  <footer>
                     <div className="actions">
                        <img src={like} alt="Like"></img>
                        <img src={comment} alt="Comentário"></img>
                        <img src={send} alt="Enviar"></img>
                     </div>
   
                     <strong>{post.likes} curtidas</strong>
   
                     <p>
                        {post.description}
                        <span>{post.hashtags}</span>
                     </p>
                  </footer>
   
               </article>
            ))}
         </section>
      )
   }
}

export default Feed;