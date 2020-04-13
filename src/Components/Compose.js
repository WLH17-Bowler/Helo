import React, {Component} from 'react'
import axios from 'axios'
import './Compose.css'

class Compose extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            img: '',
            content: ''
        }
    }

    handleChange = ({name, value}) => {
        this.setState({
            [name]: value
        })
    }

    submitPost = () => {
        const {title, img, content} = this.state
        const {push} = this.props.history
        
        axios.post('/api/compose', {title, img, content})
        .then(results => {
            this.clearInputs()
            window.alert(`Message Posted title: ${title}`)            
        }).catch(err => console.log(err))

        push('/dashboard')
    }

    clearInputs = () => {
        this.setState({title: '', img: '', content: ''})
    }

    render() {
        return (
            <div id='compose-master' >
                <div className='compose-parent' >
                    <div className='new-post' >
                        <p id='p-text'> New Post </p>    
                        <input
                            className='compose-inputs'
                            name='title'
                            value={this.state.title}
                            placeholder='  title*'
                            onChange={(evt) => this.handleChange(evt.target)} />
                        <input
                            className='compose-inputs'
                            name='img'
                            value={this.state.img}
                            placeholder='  img url*'
                            onChange={(evt) => this.handleChange(evt.target)} />
                    </div>
                    <div id='text-parent' >
                        <textarea
                            id='text-area'
                            name='content'
                            value={this.state.content}
                            placeholder='  compose post*'
                            onChange={(evt) => this.handleChange(evt.target)} />
                        <div id="submit-parent" >
                            <button id='submit-btn' onClick={this.submitPost} > Submit Post </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Compose