import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import Trip from "./Trip";
import TripDAO from "./TripDAO";
import {IUserSession} from "../../test/TripServiceShould.test";

export default class TripService {
    constructor(protected userSession: IUserSession) {

    }

    public getTripsByUser(user: User): Trip[] {
        let tripList: Trip[] = [];
        const loggedUser: User = this.getUser();
        let isFriend: boolean = false;

        if (loggedUser != null) {
            for (const friend of this.getFriends(user)) {
                if (friend === loggedUser) {
                    isFriend = true;
                    break;
                }
            }

            if (isFriend) {
                tripList = this.getTripList(user);
            }

            return tripList;
        } else {
            throw new UserNotLoggedInException();
        }
    }

    protected getTripList(user: User) {
        return TripDAO.findTripsByUser(user);
    }

    protected getFriends(user: User) {
        return user.getFriends();
    }

    protected getUser(): User {
        return this.userSession.getUser();
    }
}
