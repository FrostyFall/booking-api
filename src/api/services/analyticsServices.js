const { QueryTypes } = require('sequelize');
const sequelize = require('../../config/DBConnection');
const AppError = require('../../utils/appError');

exports.getMostBookedHotel = async ({ month, roomRating = 0 }) => {
  if (month === undefined) {
    throw new AppError('Month query string is required', 400);
  }

  if (isNaN(month) || isNaN(roomRating)) {
    throw new AppError('Month or room rating is not a number', 400);
  }

  const monthNum = parseInt(month, 10);
  const ratingNum = parseFloat(roomRating, 10);

  const suitedBookedRooms = await sequelize.query(
    'SELECT bks.id, bks.booked_date, bks.leave_date, bks.is_cancelled, rooms.id, rooms.img, rooms.rating, rooms.cost, rooms.hotel_id FROM booked_rooms AS bks INNER JOIN rooms WHERE month(bks.booked_date) = :month AND rooms.rating > :rating AND bks.room_id = rooms.id;',
    {
      type: QueryTypes.SELECT,
      replacements: { month: monthNum, rating: ratingNum },
    }
  );

  const hotelBookedRoomsObj = {};
  suitedBookedRooms.forEach((room) => {
    if (hotelBookedRoomsObj.hasOwnProperty(room.hotel_id)) {
      hotelBookedRoomsObj[room.hotel_id] += 1;
    } else {
      hotelBookedRoomsObj[room.hotel_id] = 1;
    }
  });

  const mostBookedHotel = [-1, 0];
  for (const hotelId in hotelBookedRoomsObj) {
    if (hotelBookedRoomsObj[hotelId] > mostBookedHotel[1]) {
      mostBookedHotel[0] = parseInt(hotelId, 10);
      mostBookedHotel[1] = hotelBookedRoomsObj[hotelId];
    }
  }

  if (mostBookedHotel[0] === -1) {
    return null;
  }

  const hotel = await sequelize.query(
    'SELECT id, img, title, description, created_at, deleted_at from hotels WHERE id = :id LIMIT 1;',
    {
      type: QueryTypes.SELECT,
      replacements: { id: mostBookedHotel[0] },
    }
  );

  return { hotel: hotel[0] };
};

exports.getUsersWithMostBookings = async () => {
  const usersTotalBookings = await sequelize.query(
    'SELECT bks.user_id, COUNT(bks.user_id) AS total_booked_rooms FROM users INNER JOIN booked_rooms AS bks ON users.id = bks.user_id GROUP BY user_id ORDER BY total_booked_rooms DESC;',
    {
      type: QueryTypes.SELECT,
    }
  );

  const usersAverageBooking =
    usersTotalBookings.reduce(
      (acc, current) => acc + current.total_booked_rooms,
      0
    ) / usersTotalBookings.length;

  const requiredUsersIds = usersTotalBookings
    .filter(
      ({ total_booked_rooms: total }) =>
        total >= 2 && total >= usersAverageBooking
    )
    .map((user) => user.user_id);

  if (requiredUsersIds.length === 0) {
    return null;
  }

  const requiredUsers = await sequelize.query(
    'SELECT users.id, users.email, users.password, users.created_at, users.deleted_at, COUNT(bks.user_id) AS total_booked_rooms FROM users INNER JOIN booked_rooms AS bks ON users.id = bks.user_id AND users.id IN (:ids) GROUP BY user_id ORDER BY total_booked_rooms DESC;',
    {
      type: QueryTypes.SELECT,
      replacements: { ids: requiredUsersIds },
    }
  );

  return { users: requiredUsers };
};
