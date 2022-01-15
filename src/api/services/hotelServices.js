const { unlink } = require('fs/promises');
const HotelRepo = require('../repositories/hotelRepository');
const RoomRepo = require('../repositories/roomRepository');
const BookedRoomRepo = require('../repositories/bookedRoomRepository');
const HotelReviewRepo = require('../repositories/hotelReviewRepository');
const AppError = require('../../utils/appError');
const db = require('../../config/DBConnection');
const pagination = require('../../utils/pagination');

exports.uploadHotelImage = async ({ id, files }) => {
  if (files.length === 0) {
    throw new AppError('Not a single file has been uploaded', 400);
  }

  const { path } = files[0];

  const hotel = await HotelRepo.updateImgById({ id, path });

  return { hotel };
};

exports.addHotel = async ({ title, description }) => {
  return await HotelRepo.createOne({ title, description });
};

exports.deleteHotel = async (id) => {
  if (!(await this.getHotel(id))) {
    throw new AppError('Specified hotel not found', 400);
  }

  const { img } = await HotelRepo.findById(id);
  const t = await db.transaction();
  let result;

  try {
    result = await HotelRepo.transactionDelete({ id, t });

    if (img !== null) {
      await unlink(img);
    }

    const hotelRooms = await RoomRepo.findByHotelId(id);
    const hotelRoomsIDs = hotelRooms.map((room) => room.id);
    hotelRoomsIDs.forEach(async (roomID) => {
      await RoomRepo.transactionDelete({ id: roomID, t });
    });

    await BookedRoomRepo.transactionDelete({ roomId: hotelRoomsIDs, t });
    await HotelReviewRepo.transactionDelete({ hotelId: id, t });

    await t.commit();
  } catch (error) {
    await t.rollback();
    throw new AppError('Error occured while deleting the hotel', 500);
  }

  return result;
};

exports.getHotels = async ({ page, amount }) => {
  const options = pagination({ page, amount });

  const hotels = await HotelRepo.findAll(options);

  return { hotels };
};

exports.getHotel = async (hotelID) => {
  const hotel = await HotelRepo.findById(hotelID);

  if (!hotel) {
    throw new AppError('Specified hotel not found', 400);
  }

  return hotel;
};

exports.getHotelFreeRooms = async ({ page, amount, hotelID }) => {
  const options = pagination({ page, amount });

  if (!(await this.getHotel(hotelID))) {
    throw new AppError('Specified hotel not found', 400);
  }

  const hotelRooms = await RoomRepo.findByHotelId(hotelID);
  const hotelRoomsIDs = hotelRooms.map((room) => room.id);
  const hotelBookedRooms = await BookedRoomRepo.findActiveOrCancelledRooms(
    hotelRoomsIDs
  );
  const hotelBookedRoomsIDs = hotelBookedRooms.map((room) => room.room_id);
  const freeRoomsIDs = hotelRoomsIDs.filter(
    (roomID) => !hotelBookedRoomsIDs.includes(roomID)
  );

  options.freeRoomsIDs = freeRoomsIDs;

  const freeRooms = await RoomRepo.findByIds(options);

  return { freeRooms };
};

exports.addReview = async ({ hotelID, userID, review, rating }) => {
  if (!(await this.getHotel(hotelID))) {
    throw new AppError('Specified hotel not found', 400);
  }

  return await HotelReviewRepo.createOne({ hotelID, userID, review, rating });
};

exports.getReviews = async ({ id: hotelID, page, amount }) => {
  if (!(await this.getHotel(hotelID))) {
    throw new AppError('Specified hotel not found', 400);
  }

  const options = pagination({ page, amount });
  options.hotelID = hotelID;

  const reviews = await HotelReviewRepo.findByHotelId(options);

  return { reviews };
};
