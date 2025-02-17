import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";

const Room: React.FC = () => {

    const { id } = useParams();
    const { socket, user } = useContext(SocketContext);

     const fetchParticipantList = ({roomId, participants}: {roomId: string, participants: string[]}) => {
        console.log("Fetched room participants");
        console.log(roomId, participants);
     }

    useEffect(() => {
        // emitting this event so that either creator of room or joinee in the room 
        // anyone is added the server knows that new people have been added to this room
        if(user) {
            console.log("New user with id", user._id, "has joined the room", id);           
            socket.emit("joined-room", { roomId: id, peerId: user._id });
            socket.on("get-users", fetchParticipantList);
        }    
    }, [id, user, socket])

    return (
        <div>
            room : {id}
        </div>
    )

}

export default Room;