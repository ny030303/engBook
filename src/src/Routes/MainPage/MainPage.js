import * as React from 'react';
import "./MainPage.css";
import alertDialog from '../../services/AlertDialog/AlertDialog';
import ChatListContents from './ChatListContents/ChatListContents';
import UserListContents from './UserListContents/UserListContents';
import MainHeader from './MainHeader/MainHeader';
import eventService from '../../services/EventService';
import ChattingRoom from './ChattingRoom/ChattingRoom';
import { socket } from '../../services/SocketService';



export default class MainPage extends React.Component {
  // userData
  constructor(props) {
    super(props);
    this.state = {
      menuNum: 0,
      isOpenChatting: false,
      userData: null
    };
    this.w = 400;
    this.h = 600;
    
    socket.on('login-ok', params => {
      this.setState({userData: params.user_data});
    });
  }

  componentDidMount() {
    
    
    eventService.listenEvent("openChatting", (userName) => {
      if(!this.state.isOpenChatting) {this.w = 900; this.h = 600;}
      else {this.w = 400; this.h = 600;}
      this.openChattingRoom();
    });
  }

  componentWillMount() {
    // window.main.resize("toMain", { width: 400, height: 600, callback: (result) => {} });
    
  }

  openChattingRoom = () => {
    window.main.resize("toMain", { width: this.w, height: this.h, callback: (result) => {
      this.setState({ isOpenChatting: !this.state.isOpenChatting });
     }});
  }

  changeMenuNum = (e) => this.setState({ menuNum: e.target.dataset.num });

  render() {
    return (
      <div className="main-page page">
        <MainHeader menuNum={this.state.menuNum} changeMenuNum={this.changeMenuNum} userData={this.state.userData}/>
        <div className="content-wrap">
          {
            (this.state.menuNum == 0) ?
              (<UserListContents />) :
              (this.state.menuNum == 1) ?
                (<ChatListContents />) :
                (this.state.menuNum == 2) ?
                (<ChatListContents />) :
                (<ChatListContents />)
          }
          {/* --- chatting --- */}

          {
            this.state.isOpenChatting ? 
            (<ChattingRoom/>) : (<></>)
          }
        </div>
      </div>
    );
  };
};