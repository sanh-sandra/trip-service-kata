import "jest";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import TripService from "../src/trip/TripService"
import User from "../src/user/User";

describe("TripServiceShould", () => {
    it("Should return empty array when user is empty", () => {
        //given
        let trip = new TripServiceTest()
        const user = new User
        const expectedResult = []
        //when
        const result = trip.getTripsByUser(user)
        //then
        expect(result).toEqual(expectedResult);
    });
    it("Should return Exception when user is null", () => {
        //given
        let trip = new TripServiceTest()
        trip.userIsNull = true
        const user = new User()
        //when
        try{
            trip.getTripsByUser(user)
        }catch(exception){   
            //then
            expect(exception).toBeInstanceOf(UserNotLoggedInException);
        }
    });
});

class TripServiceTest extends TripService{
    userIsNull = false

    protected getUser():User{
        return new User()
    }
}
