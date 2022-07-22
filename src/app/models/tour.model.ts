export class TourModel {
    constructor(
        public id: String,
        public name: String,
        public date: String,
        public duration: String,
        public stockTicket: Number,
        public priceTicket: Number,
        public place: String,
        public service: String
    ) { }
}