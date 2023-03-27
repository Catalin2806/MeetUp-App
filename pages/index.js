import React,{useEffect, useState} from "react";
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from "mongodb";
import Head from 'next/head';


const DUMMY_MEETUPS=[{
    id:'m1',
    title:'first meetup',
    image:'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
    address:'Some adrees 5, 12345',
    description:'this is my first meetup'
},
{
    id:'m2',
    title:'second meetup',
    image:'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
    address:'Some adrees 4, 123456',
    description:'this is my second meetup'
}]

function HomePage(props){
// const [loadedMeetups,setLoadedMeetups]=useState([]);

// useEffect(()=>{
//     //send http request and fetch data
//     setLoadedMeetups(DUMMY_MEETUPS);

// },[]);


    return <>
    <Head>
        <title>React meetups</title>
        <meta name="descriptions" content="meetups"/>
    </Head>
    <MeetupList meetups={props.meetups}/>
    </>
}

//ca sa fie prerendered
export async function getStaticProps(){
//fetch data from API or database

const client=await MongoClient.connect('mongodb+srv://ApostolCatalin:Asagi1999.@cluster0.hjzauez.mongodb.net/test');
const db=client.db();
const meetupsCollections=db.collection('meetups');

const meetups=await meetupsCollections.find().toArray();

client.close();

return {
    props:{
        meetups:meetups.map(meetup=>({
            titile:meetup.tile,
            adress:meetup.adress,
            image:meetup.image,
            id:meetup._id.toString(),
        }))
    },
    revalidate:1
};
}


// export async function gerServerSideProps(context){
// const req=context.req;
// const res=context.res;

//     return {
//         props:{
//             meetups:DUMMY_MEETUPS
//         }
//     }
// }

export default HomePage;