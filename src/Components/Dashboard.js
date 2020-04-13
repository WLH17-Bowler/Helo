import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import './Dashboard.css'
import {FaHeart} from 'react-icons/fa'
import {FaTrashAlt} from 'react-icons/fa'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            homeFeed: [],
            search: '',
            checkBox: true
        }
    }

    componentDidMount() {        
        this.getPosts()
    }

    getPosts = () => {
        axios.get('/api/homefeed')
        .then(res => {
            console.log(res.data, "PULSE")
            this.setState({ homeFeed: res.data })
        }).catch(err => console.log(err))
        console.log(this.state.homeFeed, 'PULSE')
    }

    handleCheckBox = () => {
        this.setState({ checkBox: !this.state.checkBox })
    }

    addFavorite = (id) => {
        
        if (this.props.user.username) {
            console.log(this.props.user.username, 'CHECK USER');
            axios.post('/api/heart', { profile_id: this.props.user.profile_id, post_id: id,})
            .then(() => {
                window.alert('Saved Post!');
            })
            .catch(err => console.log(err));
        } else {
            this.handleToggle();
        }
    }

    deletePost = (id) => {
        axios.delete(`/api/delete/${id}`)
        .then(res => this.getPosts())
        .catch(err => console.log(err))
    }

    render() {
        const mappedHomeFeed = this.state.homeFeed.map((post, i) => (
            <div key={i} className="post-container" >
                <h2 id='post-title' > {post.title} </h2>
                <div className='post-img' >
                    <img id='post-img'  src={post.img} alt={post.title} />
                    <p id='post-content'> {post.content} </p>
                </div>
                <div className='like-btn' >
                    <button 
                        id='like-btn' 
                        onClick={() => this.addFavorite(post.post_id)} > < FaHeart /> </button>
                    <button
                        id='delete-btn'
                        onClick={() => this.deletePost(post.post_id)} > <FaTrashAlt /> </button>
                </div>
            </div>
        ))
        return (
            <div className='home-feed' >    
                {mappedHomeFeed}
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Dashboard)