import {Resolvers} from "../generated/generatedTypes";

export const bookingResolvers: Resolvers = {
    Query: {
        booking: async (_, args, {dataSources}) => {
            const response = await dataSources.bookingAPI.fetchBooking(args);
            return response
        },
        roomBookings: async (_, args, {dataSources}) => {
            const response = await dataSources.bookingAPI.fetchRoomBookings(args);
            return response
        },
        userBookings: async (_, args, {dataSources}) => {
            const response = await dataSources.bookingAPI.fetchUserBookings(args);
            return response
        },
    },
    Mutation: {
        addBooking: async (_, args, {dataSources}) => {
            const response = await dataSources.bookingAPI.addBooking(args);
            return response;
        },
        deleteBooking: async (_, args, {dataSources}) => {
            const response = await dataSources.bookingAPI.deleteBooking(args);
            return response;
        },

    }
}