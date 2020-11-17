import "jest";
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
});

class TripServiceTest extends TripService{
    protected getUser():User{
        return new User()
    }
}
