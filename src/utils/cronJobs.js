const cron = require('node-cron');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/DBConnection');
const HotelServices = require('../api/services/hotelServices');

cron.schedule(
  '0 0 * * *',
  async () => {
    const bookedHotelsIdsObjs = await sequelize.query(
      'SELECT DISTINCT hotel_id from (SELECT room_id FROM booked_rooms WHERE deleted_at IS NULL AND DATEDIFF(now(), created_at) <= 90 ORDER BY created_at DESC) AS bks INNER JOIN rooms ON bks.room_id = rooms.id;',
      { type: QueryTypes.SELECT }
    );
    const bookedHotelsIds = bookedHotelsIdsObjs.map((obj) => obj.hotel_id);

    const hotels = await HotelServices.getHotels({});
    const hotelsIds = hotels.hotels.map((hotel) => hotel.id);

    const notBookedHotelIds = hotelsIds.filter((hotelId) => {
      return bookedHotelsIds.includes(hotelId) ? false : true;
    });

    notBookedHotelIds.forEach(async (id) => {
      await HotelServices.deleteHotel(id);
    });
  },
  {
    scheduled: true,
    timezone: 'America/New_York',
  }
);

module.exports = cron;
