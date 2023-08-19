import gql from "graphql-tag";

export const typeDefs = gql`
type Query {
    booking(bookingId: String): Booking
    userBookings(userId: String): [Booking]
    roomBookings(roomId: String, date: String): [Booking]
}

type Room @key(fields: "_id" resolvable: false){
    _id: String
}

type User @key(fields: "_id" resolvable: false){
    _id: String
}

type Booking {
    _id: String
    room: Room 
    user: User
    purpose: String
    date: String
    slots: [Int]
}
type Mutation {
    addBooking(roomId: String, slots:[Int], purpose: String, date: String, userId: String): BookingResponse
    deleteBooking(bookingId: String): BookingResponse
}
type BookingResponse {
    message: String
    booking: Booking
}
`