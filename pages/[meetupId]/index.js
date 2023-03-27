import React from "react";
import MeetUpDetail from "../../components/meetups/MeetupDetail";
import { MongoClient,ObjectId } from "mongodb";

function MeetupDetails(props) {
  
  return (
    <MeetUpDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.adress}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths(){
  const client=await MongoClient.connect('mongodb+srv://ApostolCatalin:Asagi1999.@cluster0.hjzauez.mongodb.net/test');
  const db=client.db();
  const meetupsCollections=db.collection('meetups');
  
  const meetups=await meetupsCollections.find({},{_id:1}).toArray();
  
  client.close();

  return{
    fallback:'blocking',
    paths:meetups.map(meetup=>({params:{meetupId:meetup._id.toString()}}))
  }
  
}

export async function getStaticProps(context){
//fetch data for a meetup
const meetupId=context.params.meetupId;
const client=await MongoClient.connect('mongodb+srv://ApostolCatalin:Asagi1999.@cluster0.hjzauez.mongodb.net/test');
const db=client.db();
const meetupsCollections=db.collection('meetups');

const selectedMeetup=await meetupsCollections.findOne({_id:ObjectId(meetupId)});

client.close();


return{
  props:{
    meetupData:{
      id:selectedMeetup._id.toString(),
      title:selectedMeetup.title,
      address:selectedMeetup.address,
      image:selectedMeetup.image,
      description:selectedMeetup.description,
    },
  }
}
}

export default MeetupDetails;
