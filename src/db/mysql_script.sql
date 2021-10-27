-- Tables
CREATE TABLE user_roles (
  id    int           NOT NULL,
  role  varchar(255)  NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (id),
  UNIQUE (role)
) ENGINE=INNODB;

CREATE TABLE users (
  id          int           AUTO_INCREMENT,
  email       varchar(255)  NOT NULL,
  password    varchar(255)  NOT NULL,
  created_at  datetime      DEFAULT CURRENT_TIMESTAMP,
  deleted_at  datetime      DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE (email)
) ENGINE=INNODB;

CREATE TABLE user_info (
  id          int           AUTO_INCREMENT,
  user_id     int           NOT NULL,
  first_name  varchar(255)  NOT NULL,
  last_name   varchar(255)  NOT NULL,
  PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE users_roles (
  id       int  AUTO_INCREMENT,
  user_id  int  NOT NULL,
  role_id  int  NOT NULL,
  PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE hotels (
  id           int           AUTO_INCREMENT,
  img          varchar(255)  NOT NULL,
  title        varchar(255)  NOT NULL,
  description  varchar(255)  NOT NULL,
  created_at   datetime      DEFAULT CURRENT_TIMESTAMP,
  deleted_at   datetime      DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE hotel_reviews (
  id          int           AUTO_INCREMENT,
  hotel_id    int           NOT NULL,
  user_id     int           NOT NUll,
  review      varchar(255)  NOT NULL,
  stars       float         NOT NULL,
  created_at  datetime      DEFAULT CURRENT_TIMESTAMP,
  deleted_at  datetime      DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE rooms (
  id          int           AUTO_INCREMENT,
  hotel_id    int           NOT NULL,
  img         varchar(255)  NOT NULL,
  type        varchar(255)  NOT NULL,
  cost        float         NOT NULL,
  created_at  datetime      DEFAULT CURRENT_TIMESTAMP,
  deleted_at  datetime      DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE booked_rooms (
  id           int       AUTO_INCREMENT,
  room_id      int       NOT NULL,
  user_id      int       NOT NULL,
  booked_date  datetime  NOT NULL,
  leave_date   datetime  NOT NULL,
  created_at   datetime  DEFAULT CURRENT_TIMESTAMP,
  deleted_at   datetime  DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=INNODB;

-- References
ALTER TABLE user_info
  ADD CONSTRAINT fk_user_info_user_id_users_id
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE users_roles
  ADD CONSTRAINT fk_users_roles_user_id_users_id
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE users_roles
  ADD CONSTRAINT fk_users_roles_role_id_user_roles_id
  FOREIGN KEY (role_id) REFERENCES user_roles(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE hotel_reviews
  ADD CONSTRAINT fk_hotel_reviews_hotel_id_hotels_id
  FOREIGN KEY (hotel_id) REFERENCES hotels(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE hotel_reviews
  ADD CONSTRAINT fk_hotel_reviews_user_id_users_id
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE rooms
  ADD CONSTRAINT fk_rooms_hotel_id_hotels_id
  FOREIGN KEY (hotel_id) REFERENCES hotels(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE booked_rooms
  ADD CONSTRAINT fk_booked_rooms_room_id_rooms_id
  FOREIGN KEY (room_id) REFERENCES rooms(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE booked_rooms
  ADD CONSTRAINT fk_booked_rooms_user_id_users_id
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

  -- Default Values Insertion
INSERT INTO user_roles(id, role)
VALUES (1, 'user'), (2, 'admin');