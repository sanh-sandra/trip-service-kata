import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
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
                tripList = TripDAO.findTripsByUser(user);
            }

            return tripList;
        } else {
            throw new UserNotLoggedInException();
        }
    }

    protected getFriends(user: User) {
        return user.getFriends();
    }

    protected getUser(): User {
        return UserSession.getLoggedUser();
    }
}
