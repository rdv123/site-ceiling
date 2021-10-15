import React from 'react';
import c from './ChatBotTelegram.module.css';

class ChatBotTelegram extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            photoItem: '',
            url: ''
        };

        this.handleText = this.handleText.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
        this.handleUrl = this.handleUrl.bind(this);
        
        this.Send = this.Send.bind(this);
    }

    Send = e => {
        const chat_id = /* ID ЧАТА (ПОСМОТРЕТЬ МОЖНО В /SENDUPDATE) */
        const parse_mode = "HTML";
        const textValue = '<a href="'+ this.state.url +'"><b>'+ this.state.value +'</b></a>';
        
        const requestOptionsPush = {
        method: 'POST',
        headers: { 
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( 
            {chat_id: chat_id, parse_mode: parse_mode, caption: textValue, photo: this.state.photoItem}
        )
        };
    
        fetch('https://api.telegram.org/bot<!-- APIKEY -->/sendPhoto', requestOptionsPush)
        .then(response => response.json())
        .then(response => {
            window.location.href = "/"; /* ПОСЛЕ ОТПРАВКИ, ВКЛЮЧЕНИЕ СРАЗУ ЧАТА (ПЕРЕАДРЕСАЦИЯ ЕСЛИ НАДО) */
        });
    }

    handleText(event) {
        this.setState({value: event.target.value});
    }

    handleUrl(event) {
        this.setState({url: event.target.value});
    }

    handlePhoto(event) {
        this.setState({photoItem: event.target.value});
    }

    render() {
        return(
            <>
                <form onSubmit={() => this.Send()}>
                    <label>
                        <span>Текст</span>
                        <input type="text" value={this.state.value} onChange={this.handleText} />
                    </label>

                    <label>
                        <span>URL статьи</span>
                        <input type="text" value={this.state.url} onChange={this.handleUrl} />
                    </label>

                    <label>
                        <span>URL фото</span>
                        <input type="text" value={this.state.photoItem} onChange={this.handlePhoto} />
                    </label>

                    <input type="submit" value="Отправить" />
                </form>
            </>
        )
    }

}

export default ChatBotTelegram;