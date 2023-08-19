import {typeDefs} from "./booking.schema";
import {bookingResolvers} from "./booking.resolvers";

export const roomModule = {typeDefs, resolvers: bookingResolvers};