import {pubSub} from "../../helpers";
import {NEW_MESSAGE_EVENT} from "../../helpers";

export const newMessage = (parent, args) =>{
	return pubSub.asyncIterator(NEW_MESSAGE_EVENT)
}

