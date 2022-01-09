const axios = require('axios');

const getJWTToken = async () => {
  const { data: loginData } = await axios.post(
    `http://127.0.0.1:8000/auth/login`,
    {
      password: 'admin123456',
      email: 'admin@gmail.com',
    }
  );
  const token = 'Bearer ' + loginData.data.token.str;

  return token;
};

describe('Get Endpoints', () => {
  it('should get all bookings', async () => {
    const token = await getJWTToken();
    const { status, data: bookingsData } = await axios.get(
      'http://127.0.0.1:8000/booked-rooms',
      {
        headers: { authorization: token },
      }
    );

    expect(status).toEqual(200);
    expect(bookingsData.status).toEqual('success');
  });

  it('should get user bookings', async () => {
    const token = await getJWTToken();
    const { status, data: userBookingsData } = await axios.get(
      'http://127.0.0.1:8000/users/1/booked-rooms',
      {
        headers: { authorization: token },
      }
    );

    expect(status).toEqual(200);
    expect(userBookingsData.status).toEqual('success');
  });
});

describe('Post Endpoints', () => {
  it('should create a booking', async () => {
    const token = await getJWTToken();
    const { status, data: bookingsData } = await axios.post(
      'http://127.0.0.1:8000/booked-rooms',
      {
        roomID: 1,
        bookedDate: '2021-10-23T11:35:24.785Z',
        leaveDate: '2022-10-23T11:35:24.785Z',
      },
      {
        headers: { authorization: token },
      }
    );

    expect(status).toEqual(201);
    expect(bookingsData.status).toEqual('success');
  });
});

describe('Delete Endpoints', () => {
  it('should delete a booking', async () => {
    const token = await getJWTToken();
    const { status, data: bookingsData } = await axios.delete(
      'http://127.0.0.1:8000/booked-rooms/1',
      {
        headers: { authorization: token },
      }
    );

    expect(status).toEqual(201);
    expect(bookingsData.status).toEqual('success');
  });
});
