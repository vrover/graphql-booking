import {RESTDataSource} from 'apollo-datasource-rest';
import {getDocument, addDocument, deleteDocument} from '../database/util';
import {bookingSchema, roomSchema, userSchema} from '../database/schemas';
import {BOOKING, ROOM, USER} from '../database/constants';
export class BookingAPI extends RESTDataSource {
    constructor() {
        super();
    }

    async addBooking(body: any) {
        console.log('add booking called');
        let querySlots = {room: body.roomId, date: body.date};
        const bookings = await getDocument({collection: BOOKING, schema: bookingSchema, query: querySlots});
        let bookedSlots: any = [];
        bookings.forEach((booking: any) => {bookedSlots = bookedSlots.concat(booking.slots)});
        if (body.slots.some((s: any) => bookedSlots.includes(s))) {
            return {message: "Some slots have already been booked"};
        }
        else {
            let query = {
                purpose: body.purpose,
                user: body.userId,
                room: body.roomId,
                date: body.date,
                slots: body.slots
            };
            const result = await addDocument({collection: BOOKING, schema: bookingSchema, query});
            return {booking: result, message: "success"};
        }
    }
    async deleteBooking({bookingId}: any) {
        console.log('delete booking called');

        const result = await deleteDocument({collection: BOOKING, schema: bookingSchema, query: {_id: bookingId}});
        if (result)
            return {booking: result, message: "success"};
        return {booking: null, message: "failed"};
    }
    async fetchRoomBookings({roomId, date}: any) {
        console.log('room bookings called');

        let query = {room: roomId, date: date};

        const result = await getDocument({
            collection: BOOKING, schema: bookingSchema, query, refs: [{
                path: 'user',
                refCollection: USER,
                refSchema: userSchema,
                fields: ['name', 'email', '_id']
            }, {
                path: 'room',
                refCollection: ROOM,
                refSchema: roomSchema,
                fields: ['name', 'seating_capacity', '_id']
            }]
        });
        return result;
    }
    async fetchUserBookings({userId}: any) {
        console.log('user bookings called');

        let query = {user: userId};
        const result = await getDocument({
            collection: BOOKING, schema: bookingSchema, query, refs: [{
                path: 'user',
                refCollection: USER,
                refSchema: userSchema,
                fields: ['name', 'email', '_id']
            }, {
                path: 'room',
                refCollection: ROOM,
                refSchema: roomSchema,
                fields: ['name', 'seating_capacity', '_id']
            }]
        });
        return result.reverse();
    }
    async fetchBooking({bookingId}: any) {
        console.log('get booking called');

        let query = {_id: bookingId};
        const result = await getDocument({
            collection: BOOKING, schema: bookingSchema, query, refs: [{
                path: 'user',
                refCollection: USER,
                refSchema: userSchema,
                fields: ['name', 'email', '_id']
            }, {
                path: 'room',
                refCollection: ROOM,
                refSchema: roomSchema,
                fields: ['name', 'seating_capacity', '_id']
            }]
        });
        return result;
    }
}
