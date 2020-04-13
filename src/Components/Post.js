import React, {Component} from 'react'
import axios from 'axios'
import './Post.css'


class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewPost: []
        }
    }

    componentDidMount(id) {
        axios.get(`/api/viewPost/${id}`).then(res => {
            this.setState({ viewPost: res.data })
        }).catch(err => console.log(err))
    }

    render() {
        const mappedPost = this.state.viewPost.map((post, i) => (
            <div key={i} >
                <h1> {post.title} </h1>
                <img src={post.img} alt='' />
                <p> {post.content}  </p>
            </div>
        ))
        return (
            <div className='post-view' >
                {mappedPost}              
            </div>
        )
    }
}

export default Post