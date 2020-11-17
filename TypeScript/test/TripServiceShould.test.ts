import "jest";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import TripService from "../src/trip/TripService"
import User from "../src/user/User";

let userv2: User
describe("TripServiceShould", () => {

    beforeEach(() => {
        userv2 = new User()
    })
    it("Should return empty array when user is empty", () => {
        //given
        let trip = new TripServiceTest()
        const expectedResult = []
        //when
        const result = trip.getTripsByUser(userv2)
        //then
        expect(result).toEqual(expectedResult);
    });
    it("Should return Exception when user is null", () => {
        //given
        userv2 = null
        let trip = new TripServiceTest()
        //when
        try {
            trip.getTripsByUser(userv2)
        } catch (exception) {
            //then
            expect(exception).toBeInstanceOf(UserNotLoggedInException);
        }
    });
    it.skip("Should return friends when user is logged", () => {
        // given
        let trip = new TripServiceTest()
        trip.userWithFriends = true
        // let expected =
        // when
        // let result =
        // then
    });
});

class TripServiceTest extends TripService {
    userIsNull = false
    userWithFriends = false

    protected getUser(): User {
        return userv2
    }

    // protected getUser(): User {
    //     if (this.userIsNull) {
    //         return null
    //     } else if (this.userWithFriends) {
    //         let friend = new User()
    //         friend.addFriend(friend)
    //         let user = new User()
    //         user.addFriend(friend)
    //         return user
    //     } else {
    //         return new User()
    //     }
    // }
}
