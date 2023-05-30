import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function UserProfileCard({data, profile}){
    const userData = useContext(UserContext);

    const {id} = useParams();

    console.log('ddata', profile);

    return (
        <div class="box mb-3 shadow-sm border rounded bg-white profile-box text-center">
            <div class="py-4 px-3 border-bottom">
                <img src={data?.imageURL? data.imageURL : './img/avatar.jpeg'} class="img-fluid mt-2 rounded-circle" alt="Responsive image" />
                <h5 class="font-weight-bold text-dark mb-1 mt-4">{data?.name}</h5>
                <p class="mb-0 text-muted">{data?.department}</p>
                <div className="mb-0 text-gray-500">{data?.institionName}</div>
                <a href={profile?.find(data => data.title === "Facebook").value} style={{fontSize: '22px'}}><i className="m-1 feather-facebook"></i></a>
                <a href={profile?.find(data => data.title === "Twitter").value} style={{fontSize: '22px'}}><i className="m-1 feather-twitter"></i></a>
                <a href={profile?.find(data => data.title === "Instagram").value} style={{fontSize: '22px'}}><i className="m-1 feather-instagram"></i></a>
                <a href={profile?.find(data => data.title === "Linkedin").value} style={{fontSize: '22px'}}><i className="m-1 feather-linkedin"></i></a>
                <a href={"https://wa.me/"+profile?.find(data => data.title === "Whatsapp").value} style={{fontSize: '22px'}}><svg style={{height: '22px', marginBottom: '8px', marginLeft: '3px', marginRight: '3px', fill: '#007bff'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg></a>
                <a href={profile?.find(data => data.title === "Research Gate").value} style={{fontSize: '22px'}}><svg style={{height: '22px', marginBottom: '8px', marginLeft: '3px', marginRight: '3px', fill: '#007bff'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 32v448h448V32H0zm262.2 334.4c-6.6 3-33.2 6-50-14.2-9.2-10.6-25.3-33.3-42.2-63.6-8.9 0-14.7 0-21.4-.6v46.4c0 23.5 6 21.2 25.8 23.9v8.1c-6.9-.3-23.1-.8-35.6-.8-13.1 0-26.1.6-33.6.8v-8.1c15.5-2.9 22-1.3 22-23.9V225c0-22.6-6.4-21-22-23.9V193c25.8 1 53.1-.6 70.9-.6 31.7 0 55.9 14.4 55.9 45.6 0 21.1-16.7 42.2-39.2 47.5 13.6 24.2 30 45.6 42.2 58.9 7.2 7.8 17.2 14.7 27.2 14.7v7.3zm22.9-135c-23.3 0-32.2-15.7-32.2-32.2V167c0-12.2 8.8-30.4 34-30.4s30.4 17.9 30.4 17.9l-10.7 7.2s-5.5-12.5-19.7-12.5c-7.9 0-19.7 7.3-19.7 19.7v26.8c0 13.4 6.6 23.3 17.9 23.3 14.1 0 21.5-10.9 21.5-26.8h-17.9v-10.7h30.4c0 20.5 4.7 49.9-34 49.9zm-116.5 44.7c-9.4 0-13.6-.3-20-.8v-69.7c6.4-.6 15-.6 22.5-.6 23.3 0 37.2 12.2 37.2 34.5 0 21.9-15 36.6-39.7 36.6z"/></svg></a>

                
            </div>
            <div class="">
                {id === userData?.uid? 
                    <Link className="font-weight-bold p-3 d-block" to="/edit-profile">
                        <i class="feather-edit-2"></i> Edit profile
                    </Link> :
                    <Link className="font-weight-bold p-3 d-block" to={`/messages?user=${id}`}>
                        <i class="feather-message-square"></i> Message
                    </Link>
            
                }
            </div>
        </div>
    )
}
