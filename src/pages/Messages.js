import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import Header from "../components/Header";

import PeopleYouMightKnow from "../components/PeopleYouMightKnow";
import SiteCard from "../components/SiteCard";
import UserContext from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, fetchUserData, fetchUserMessages, sendMessage, sendNewMessage } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { PulseLoader } from "react-spinners";
import moment from "moment";
import SideChat from "../components/SideChat";




export default function Messages () {
    const [activeUserID, setActiveUserID] = useState(null)
    const [activeUserChatData, setActiveUserChatData] = useState({})
    const [activeChatData, setActiveChatData] = useState({})
    const [sendLoading, setSendLoading] = useState(false)
    const [message, setMessage] = useState('');
    const [sideChats, setSideChats] = useState([])
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate()
    const userData = useContext(UserContext);
    let query = useQuery();

    function useQuery() {
        const { search } = useLocation();
      
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    useEffect(() => {
        setActiveUserID(query.get('user'))
    }, [query])

    useEffect(() => {
        // fetch users chats
        if(activeUserID){
            fetchActiveChatUserData()
        }
        // fetch active chat data if user query is available
        // add active listener for active chats and chats list
        // fetch active user chat profile data
        // check if the database syncs with the users records and then map the data to the chats
        // uncomment out send images functionlity from the chat page and implement the send image, code for sending image is already in the firebase.js file in the projects root directory
    }, [activeUserID])

    useEffect(() => {
        if(!loading && !user){
            navigate('/login')
        }
    }, [loading])

    useEffect(() => {
        getChats()
    }, [activeUserChatData])

    async function fetchActiveChatUserData(){
        let data = await fetchUserData(activeUserID);
        setActiveUserChatData(data)
    }

    async function deliverMessage(){
        if(!user.uid) return;
        if(!activeChatData?.roomID){
            // send a new message, create a new room
            // send loading
            setSendLoading(true)
            let newRoomID = (Math.random() + 1).toString(36).substring(2);
            let participants = [activeUserID, user.uid];
            let messageData = {sender: user.uid, message: message, date: Date.now()};
            let res = await sendNewMessage(messageData, newRoomID, participants);
            //clear message box
            setActiveChatData({roomID: newRoomID, participants, messages: [messageData]})
            setSendLoading(false)
            setMessage('')

        } else {
            // send message to an existing room
             //send loading
            setSendLoading(true)
            let participants = [activeUserID, user.uid];
            let messageData = {sender: user.uid, message: message, date: Date.now()}
            let res = await sendMessage(messageData, activeChatData.roomID, participants)
            //clear message box
            setSendLoading(false)
            setActiveChatData({...activeChatData, messages: [...activeChatData.messages, messageData]})
            setMessage('')
        }
    }

    async function getChats(){
        if(!user?.uid){
            return;
        }
        fetchUserMessages(user.uid, functionToCall);

        //check for active id and set chat data
        
    }

    async function switchChat(chat){
        let activeUser = chat.participants.find(id => id !== user.uid );
        setActiveUserID(activeUser)
    }

    function functionToCall(data){
        setSideChats(data);
        if(activeUserID) {
            let chatData = data.find(chat => chat.participants.includes(activeUserID) && chat.participants.includes(user.uid))
            setActiveChatData(chatData);
        }
    }

   
    return (
        <MainLayout>
            <Header />
            <div class="py-4">
                <div class="container">
                    <div class="row">

                        <main class="col col-xl-9 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                            <div class="box shadow-sm rounded bg-white mb-3 osahan-chat">
                                <h5 class="pl-3 pt-3 pr-3 border-bottom mb-0 pb-3">Messages</h5>
                                <div class="row m-0">
                                    <div class="border-right col-lg-5 col-xl-4 px-0">
                                        <div class="osahan-chat-left">
                                            {/* <div class="position-relative icon-form-control p-3 border-bottom">
                                                <i class="feather-search position-absolute"></i>
                                                <input placeholder="Search messages" type="text" class="form-control" />
                                            </div> */}
                                             {/* add listeners */}
                                            <div class="osahan-chat-list">
                                                {sideChats.map(chat => {
                                                    return (
                                                        <SideChat chat={chat} switchChat={switchChat}/>
                                                    )
                                                })}

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-7 col-xl-8 px-0">
                                        <div class="p-3 d-flex align-items-center  border-bottom osahan-post-header">
                                            {activeUserID && <img class="img-fluid rounded-circle mr-2" src={activeUserChatData.imageURL || "./img/avatar.jpeg"} alt="" style={{height: '50px', width: '50px'}}/>}
                                            <div class="font-weight-bold mr-1 overflow-hidden">
                                                <div class="text-truncate">
                                                    {activeUserChatData.name || ''}
                                                </div>
                                                <div class="small text-truncate overflow-hidden text-black-50">
                                                    {activeUserChatData.department || ''}
                                                </div>
                                            </div>
                                            {/* <span class="ml-auto">
                                                <button type="button" class="btn btn-light btn-sm rounded">
                                                    <i class="feather-phone"></i>
                                                </button>
                                                <button type="button" class="btn btn-light btn-sm rounded">
                                                    <i class="feather-video"></i>
                                                </button>
                                                <div class="btn-group">
                                                    <button type="button" class="btn btn-light btn-sm rounded"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i class="feather-more-vertical"></i>
                                                    </button>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <button class="dropdown-item" type="button"><i
                                                                class="feather-trash"></i> Delete</button>
                                                        <button class="dropdown-item" type="button"><i
                                                                class="feather-x-circle"></i> Turn Off</button>
                                                    </div>
                                                </div>
                                            </span> */}
                                        </div>
                                        <div class="osahan-chat-box p-3 border-top border-bottom bg-light">
                                            {activeChatData?.messages && activeChatData.messages.map(message => {
                                               return (
                                                    <div class="d-flex align-items-center osahan-post-header">
                                                        <div class="dropdown-list-image mr-3 mb-auto"><img class="rounded-circle"
                                                                src={message.sender === user.uid? './img/avatar.jpeg' : activeUserChatData.imageURL || './img/avatar.jpeg'} alt="" /></div>
                                                        <div class="mr-1">
                                                            <div class="text-truncate h6">
                                                                {message.sender === user.uid? 'You' : activeUserChatData.name}
                                                            </div>
                                                            <p>{message.message}</p>
                                                            
                                                        </div>
                                                        <span class="ml-auto mb-auto">
                                                            <div class="text-right text-muted pt-1 small">{moment(message.date).format('llll')}</div>
                                                        </span>
                                                    </div>)
                                            })}
                                            
                                            
                                           
                                          
                                    
                                            
                                            
                                        </div>
                                        <div class="w-100 border-top border-bottom">
                                            <textarea placeholder="Write a message…"
                                                class="form-control border-0 p-3 shadow-none" rows="2" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                        </div>
                                        <div class="p-3 d-flex align-items-center">
                                            {/* <div class="overflow-hidden">
                                                <button type="button" class="btn btn-light btn-sm rounded">
                                                    <i class="feather-image"></i>
                                                </button>
                                                <button type="button" class="btn btn-light btn-sm rounded">
                                                    <i class="feather-paperclip"></i>
                                                </button>
                                                <button type="button" class="btn btn-light btn-sm rounded">
                                                    <i class="feather-camera"></i>
                                                </button>
                                            </div> */}
                                            <span class="ml-auto">
                                                <button onClick={deliverMessage} type="button" class="btn btn-primary btn-sm rounded">
                                                    {sendLoading? <PulseLoader color="#fff" /> : <><i class="feather-send"></i> Send</>}
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                        <aside class="col col-xl-3 order-xl-2 col-lg-12 order-lg-2 col-12">
                            <PeopleYouMightKnow />
                            <SiteCard />
                        </aside>
                    </div>
                </div>
            </div>

        </MainLayout>
    )
}