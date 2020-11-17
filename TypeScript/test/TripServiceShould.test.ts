import "jest";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import UserSession from "../src/user/UserSession";

let user: User;

export interface IUserSession {
    getUser(): User;
}

describe("TripServiceShould", () => {

    beforeEach(() => {
        user = new User();
    });
    it("Should return empty array when user is empty", () => {
        // given
        const expectedResult = [];
        const loggedUser = new User();
        const userSession: IUserSession = {
            getUser: () => loggedUser,
        };
        const trip = new TripServiceTest(userSession);

        // when
        const result = trip.getTripsByUser(user);

        // then
        expect(result).toEqual(expectedResult);
    });

    it("Should return Exception when user is null", () => {
        // given
        const loggedUser = null;
        const userSession: IUserSession = {
            getUser: () => loggedUser,
        };
        const trip = new TripServiceTest(userSession);

        // when
        try {
            trip.getTripsByUser(user);
        } catch (exception) {
            // then
            expect(exception).toBeInstanceOf(UserNotLoggedInException);
        }
    });
    it("Should return friends when user is logged", () => {
        // given
        const loggedUser = new User();
        const userSession: IUserSession = {
            getUser: () => loggedUser,
        };
        const trip = new TripServiceTest(userSession);
        const expectedResult = [];
        const friend = new User();

        // when
        friend.addFriend(user);
        trip.getTripsByUser(friend);
        // then
        expect(expectedResult).toEqual([]);
    });
});

class TripServiceTest extends TripService {
    constructor( private userSession: IUserSession) {
        super(userSession);
    }

    protected getTripList(user: User): Trip[] {
        return [];
    }
    
}
