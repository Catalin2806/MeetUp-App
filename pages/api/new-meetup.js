import {MongoClient} from 'mongodb';

async function handler(req,res){
    console.log('ceva');
if(req.method==='POST'){
    const data=req.body;

    // const{title,image,adress,description}=data;

const client=await MongoClient.connect('mongodb+srv://ApostolCatalin:Asagi1999.@cluster0.hjzauez.mongodb.net/test');
const db=client.db();
const meetupsCollections=db.collection('meetups');
const result=meetupsCollections.insertOne(data);
client.close();

res.status(201).json({message:'Meetup inserted'});
}

}

export default handler;