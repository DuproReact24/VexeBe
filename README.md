B1: cài rabbit mq ở docker giao tiếp message

docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 15672:15672 -p 15692:15692 
e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=1234 rabbitmq:3-management
tài khoản: admin
mật khẩu: 1234

script sql postgressql

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS bus_id_seq;

-- Table Definition
CREATE TABLE "public"."bus" (
    "id" int4 NOT NULL DEFAULT nextval('bus_id_seq'::regclass),
    "bus_operator_id" int4 NOT NULL,
    "license_plate" varchar(255) NOT NULL,
    "seat_capacity" int4 NOT NULL,
    "price" int4 NOT NULL,
    CONSTRAINT "fk_bus_operator" FOREIGN KEY ("bus_operator_id") REFERENCES "public"."bus_operators"("id"),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX bus_license_plate_key ON public.bus USING btree (license_plate);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS bus_operators_id_seq;

-- Table Definition
CREATE TABLE "public"."bus_operators" (
    "id" int4 NOT NULL DEFAULT nextval('bus_operators_id_seq'::regclass),
    "fullname" varchar(255) NOT NULL,
    "address" text,
    "phone" int4,
    "email" varchar(255) NOT NULL,
    "account" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    "city_id" int4,
    "img" text,
    CONSTRAINT "fk_bus_operators_city" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id"),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX bus_operators_email_key ON public.bus_operators USING btree (email)
CREATE UNIQUE INDEX bus_operators_account_key ON public.bus_operators USING btree (account);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS city_id_seq;

-- Table Definition
CREATE TABLE "public"."city" (
    "id" int4 NOT NULL DEFAULT nextval('city_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX city_name_key ON public.city USING btree (name);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS customers_id_seq;

-- Table Definition
CREATE TABLE "public"."customers" (
    "id" int4 NOT NULL DEFAULT nextval('customers_id_seq'::regclass),
    "fullname" varchar(255) NOT NULL,
    "address" text,
    "phone" text,
    "account" varchar NOT NULL,
    "password" varchar NOT NULL,
    "id_role" int4 DEFAULT 2,
    CONSTRAINT "fk_customers_role" FOREIGN KEY ("id_role") REFERENCES "public"."roles"("id"),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX customers_account_key ON public.customers USING btree (account);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS history_ticket_id_seq;

-- Table Definition
CREATE TABLE "public"."history_ticket" (
    "id" int4 NOT NULL DEFAULT nextval('history_ticket_id_seq'::regclass),
    "customer_id" int4 NOT NULL,
    "seat" jsonb NOT NULL,
    "booking_time" date NOT NULL,
    "status" bool NOT NULL,
    "id_pick_up" int4,
    "id_drop_off" int4,
    "email" varchar(255),
    "phone" text,
    "id_busop" int4,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS location_id_seq;

-- Table Definition
CREATE TABLE "public"."location" (
    "id" int4 NOT NULL DEFAULT nextval('location_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "address" text NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS pickup_drivers_id_seq;

-- Table Definition
CREATE TABLE "public"."pickup_drivers" (
    "id" int4 NOT NULL DEFAULT nextval('pickup_drivers_id_seq'::regclass),
    "fullname" varchar(255) NOT NULL,
    "phone" int4,
    "email" varchar(255),
    "account" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    "bus_id" int4,
    CONSTRAINT "fk_pickup_drivers_bus" FOREIGN KEY ("bus_id") REFERENCES "public"."bus"("id"),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX pickup_drivers_email_key ON public.pickup_drivers USING btree (email)
CREATE UNIQUE INDEX pickup_drivers_account_key ON public.pickup_drivers USING btree (account);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS point_id_seq;

-- Table Definition
CREATE TABLE "public"."point" (
    "id" int4 NOT NULL DEFAULT nextval('point_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "city_id" int4 NOT NULL,
    CONSTRAINT "fk_point_city" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id"),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS rents_driver_id_seq;

-- Table Definition
CREATE TABLE "public"."rents_driver" (
    "id" int4 NOT NULL DEFAULT nextval('rents_driver_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "price" int4 NOT NULL,
    "city_id" int4 NOT NULL,
    "address" text,
    CONSTRAINT "rents_driver_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "public"."bus_operators"("id"),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS roles_id_seq;

-- Table Definition
CREATE TABLE "public"."roles" (
    "id" int4 NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX roles_name_key ON public.roles USING btree (name);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS ticket_bookings_id_seq;

-- Table Definition
CREATE TABLE "public"."ticket_bookings" (
    "id" int4 NOT NULL DEFAULT nextval('ticket_bookings_id_seq'::regclass),
    "customer_id" int4 NOT NULL,
    "seat" jsonb NOT NULL,
    "booking_time" date NOT NULL,
    "status" bool NOT NULL,
    "id_pick_up" int4,
    "id_drop_off" int4,
    "email" varchar(255),
    "phone" text,
    "id_busop" int4 NOT NULL,
    CONSTRAINT "fk_ticket_bookings_customer" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id"),
    CONSTRAINT "fk_ticket_bookings_pickup" FOREIGN KEY ("id_pick_up") REFERENCES "public"."location"("id"),
    CONSTRAINT "fk_ticket_bookings_dropoff" FOREIGN KEY ("id_drop_off") REFERENCES "public"."location"("id"),
    CONSTRAINT "ticket_bookings_id_busop_fkey" FOREIGN KEY ("id_busop") REFERENCES "public"."bus_operators"("id"),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS trip_routes_id_seq;

-- Table Definition
CREATE TABLE "public"."trip_routes" (
    "id" int4 NOT NULL DEFAULT nextval('trip_routes_id_seq'::regclass),
    "trip_id" int4 NOT NULL,
    "from_location_id" int4 NOT NULL,
    "to_location_id" int4 NOT NULL,
    CONSTRAINT "fk_trip_routes_trip" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id"),
    CONSTRAINT "fk_trip_routes_from" FOREIGN KEY ("from_location_id") REFERENCES "public"."location"("id"),
    CONSTRAINT "fk_trip_routes_to" FOREIGN KEY ("to_location_id") REFERENCES "public"."location"("id"),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS trips_id_seq;

-- Table Definition
CREATE TABLE "public"."trips" (
    "id" int4 NOT NULL DEFAULT nextval('trips_id_seq'::regclass),
    "bus_operator_id" int4 NOT NULL,
    "departure_time" time DEFAULT now(),
    "arrival_time" time DEFAULT now(),
    "to_local" int4 NOT NULL,
    "from_local" int4 NOT NULL,
    "price" float4,
    "id_bus" int4,
    "date" date,
    CONSTRAINT "fk_trips_bus_operator" FOREIGN KEY ("bus_operator_id") REFERENCES "public"."bus_operators"("id"),
    CONSTRAINT "trips_to_local_fkey" FOREIGN KEY ("to_local") REFERENCES "public"."location"("id"),
    CONSTRAINT "trips_from_local_fkey" FOREIGN KEY ("from_local") REFERENCES "public"."location"("id"),
    CONSTRAINT "trips_id_bus_fkey" FOREIGN KEY ("id_bus") REFERENCES "public"."bus"("id"),
    PRIMARY KEY ("id")
);

INSERT INTO "public"."bus" ("id", "bus_operator_id", "license_plate", "seat_capacity", "price") VALUES
(69, 3, '51B-6789181', 45, 50000);
INSERT INTO "public"."bus" ("id", "bus_operator_id", "license_plate", "seat_capacity", "price") VALUES
(9, 3, '51B-6789', 45, 50000);
INSERT INTO "public"."bus" ("id", "bus_operator_id", "license_plate", "seat_capacity", "price") VALUES
(33, 3, '51B-67892', 45, 50000);
INSERT INTO "public"."bus" ("id", "bus_operator_id", "license_plate", "seat_capacity", "price") VALUES
(36, 3, '51B-6789189', 45, 50000),
(43, 3, '51B-6789188', 45, 50000);

INSERT INTO "public"."bus_operators" ("id", "fullname", "address", "phone", "email", "account", "password", "city_id", "img") VALUES
(3, 'Ngọc Anh', 'Cà Mau', 123456789, 'mailinh@bus.com', 'mailinh', 'pass123', 1, 'https://static.vexere.com/production/images/1565942041230.jpeg?w=250&h=250');
INSERT INTO "public"."bus_operators" ("id", "fullname", "address", "phone", "email", "account", "password", "city_id", "img") VALUES
(4, 'Phuong Trang', 'Ho Chi Minh', 987654321, 'phuongtrang@bus.com', 'phuongtrang', 'pass123', 2, 'https://th.bing.com/th/id/OIP.iA71sVWGrWdmd-UlkMqb2QHaE7?w=221&h=180&c=7&r=0&o=5&pid=1.7');


INSERT INTO "public"."city" ("id", "name") VALUES
(1, 'Hanoi');
INSERT INTO "public"."city" ("id", "name") VALUES
(2, 'Ho Chi Minh');
INSERT INTO "public"."city" ("id", "name") VALUES
(3, 'Da Nang');

INSERT INTO "public"."customers" ("id", "fullname", "address", "phone", "account", "password", "id_role") VALUES
(1, 'Nguyen Van A', '123 Street, Hanoi', '987654321', 'nguyenvana', 'password123', 2);
INSERT INTO "public"."customers" ("id", "fullname", "address", "phone", "account", "password", "id_role") VALUES
(2, 'Le Thi B', '456 Street, HCM', '987654322', 'lethib', 'password123', 2);
INSERT INTO "public"."customers" ("id", "fullname", "address", "phone", "account", "password", "id_role") VALUES
(4, 'Nguyễn Phước Dư', 'huyện năm căn thành phố cà mau', '916616077', 'phuocdufakk', 'idontno123', 2);
INSERT INTO "public"."customers" ("id", "fullname", "address", "phone", "account", "password", "id_role") VALUES
(6, 'Nguyễn Phước Dư', 'huyện năm căn thành phố cà mau', '916616077', 'phuocdufa', '$2b$10$aIfSzgt9ikYBgHnfskgfEe98DBz0bKvin0XbhK1I83OYj2MsjpPAi', 2),
(7, 'Nguyễn Phước Dư', 'huyện năm căn thành phố cà mau', '916616077', 'phuocdufa1', '$2b$10$zSkbrnr191hcW47V3BCzbOXygmfyB65HxFbCU2oyPSL6Ba7bleyby', 2),
(10, 'Nguyễn Phước Dư', 'huyện năm căn thành phố cà mau', '916616077', 'phuocdufa1243', '$2b$10$ZMCPWr4Xysd7p6tEwqQPoerZUHe.aS2kzDlz7Eop6bORv5YI2NnVO', 2),
(12, 'Nguyễn Phước Dư', 'huyện năm căn thành phố cà mau', '916616077', 'phuocdufa12431', '$2b$10$FYMu5gSEVj2l0KXCMY1LQ.ydyAJwQc6RmsQtA0GutpqVK37yQhPPe', 2),
(13, 'fsad', 'fsadfasd', '916616077', 'dombiet', '$2b$10$DfWth1uANcFYEdIKe/0ZweMqC5wUj63pZwfvcBzI..GvBd6RDyPeO', 2),
(19, 'fdsaf', 'afsd', '+84916616077', 'idontno123', '$2b$10$zdtfJ.J9sjY5e9Wg70oP0uYkfDhccUR50twWokkFv0kBi.2Y2Ull.', 2),
(22, 'rwerwq', 'rwerwe', '+84916616077', 'oiconcho', '$2b$10$VCvJMZ4DRuLur2GvFDM5UeJUA5AP7ldV9O4J1LaD7byzWQl569Pyy', 2),
(25, 'rwerwq', 'rwerwe', '+84916616077', 'oiconcho1123', '$2b$10$JyoYAmeDQWj7rB.7sOe/K.KmuVqSafWYVILbRdhyR4DYvujYroe6m', 2),
(26, '63456', '45', '+84915285552', '6654', '$2b$10$8kBdqfaYIA7VHaVpLNKP5eydRyin4uCevIr6oMIwNe0U6jdtsZxne', 2),
(27, 'rweqrwrwe', 'rwe', '+84915285552', 'yrtyyre', '$2b$10$8kOT5Y2C2BNG0ceLHDoZDOD.ImeB/O0J5uaYqG8cYrZ1AHmtTCRV6', 2),
(28, 'fasdfasd', 'fasd', '+84915285552', 'fsdafsfasd', '$2b$10$yEDayWcrQw2OSBHSkiphHuBWqh07/8jjr7QGg2JW7iSWu8yWxyevy', 2),
(29, 'rwqerqw', 'ewre', '+84915285552', 'fsaffas', '$2b$10$QX3bV7pS8Se6gGJZpg2ul.BpXZoG4GlJFW3KEe3LRsD24nQE217za', 2),
(36, 'Nguyễn Phước Hiếu', 'cà mau', '+84915285552', 'nguyensy', '$2b$10$k55m2hEtKVt4DwKGItHYguffxv7OM2urhFIMfVUXXj/L5/1f504oK', 2),
(37, 'Nguyen Phuoc Du', 'can tho', '+84915285552', 'phuocdufakkk123', '$2b$10$82jTqABVNI.oiZXDWYahd.oPLi8AgJ9v2XUSKBV/ol13rXGiqtvta', 2),
(38, 'Nguyen phuoc du', 'ca mau', '+84915285552', 'phuocdu12345', '$2b$10$LCXIlESJKREkU.74TIZ0ae1JG7MoY93bR5uKQCHQZW7jtW4VkEhPC', 2),
(39, 'Nguyễn Phước Dư', 'Cà mau', '+84915285552', 'phuocdu1234', '$2b$10$sZjt8edG2BGYDdmV1G5WfeeY5SbrXcPrj1cnkNcZkefDjKmVwVkG.', 2),
(40, 'nguyen phuoc du', 'Can tho', '+84915285552', 'duphuoc1234', '$2b$10$IKLDOaoLGFBEeA3Y1S5K0ut8iOiSRLvhIFnoFFvEyJwW8lP8Qa0re', 2),
(41, 'nguyen phuoc du', 'ca mau', '+84915285552', 'duphuoc123456', '$2b$10$tz3CJqlI6kVNl1usPPKJh.0o3B/pr1Tdj88H3rUfOe45mh7Pq4OwG', 2),
(42, 'nguyen phuoc du', 'Cà mau', '+84915285552', 'phuocdu456', '$2b$10$Dr1ppM/meTYPTpHfxghrfu4NuZ4g3Hjzna09ZnW0GHOT6i7rhFIgW', 2);

INSERT INTO "public"."history_ticket" ("id", "customer_id", "seat", "booking_time", "status", "id_pick_up", "id_drop_off", "email", "phone", "id_busop") VALUES
(1, 1, '10', '2025-03-14', 't', 1, 2, 'nguyenvana@email.com', '987654321', NULL);
INSERT INTO "public"."history_ticket" ("id", "customer_id", "seat", "booking_time", "status", "id_pick_up", "id_drop_off", "email", "phone", "id_busop") VALUES
(2, 36, '"[\"B16\",\"B17\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3);
INSERT INTO "public"."history_ticket" ("id", "customer_id", "seat", "booking_time", "status", "id_pick_up", "id_drop_off", "email", "phone", "id_busop") VALUES
(3, 36, '"[\"A12\",\"A11\"]"', '2025-03-23', 'f', 4, 1, '01245636736teo@gmail.com', '0916616077', 3);
INSERT INTO "public"."history_ticket" ("id", "customer_id", "seat", "booking_time", "status", "id_pick_up", "id_drop_off", "email", "phone", "id_busop") VALUES
(4, 36, '"[\"A12\",\"A11\"]"', '2025-03-23', 'f', 4, 1, '01245636736teo@gmail.com', '0916616077', 3),
(5, 36, '"[\"A17\",\"A16\"]"', '2025-03-23', 'f', 4, 1, '01245636736teo@gmail.com', '0916616077', 3),
(6, 36, '"[\"A17\",\"A16\"]"', '2025-03-23', 'f', 4, 1, '01245636736teo@gmail.com', '0916616077', 3),
(7, 36, '"[\"A17\",\"A16\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(8, 36, '"[\"B14\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(9, 36, '"[\"A2\",\"A1\"]"', '2025-03-23', 'f', 2, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(10, 36, '"[\"A9\",\"A12\",\"B10\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(11, 36, '"[\"A9\",\"A12\",\"B10\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(12, 36, '"[\"A9\",\"A12\",\"B10\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(13, 36, '"[\"A9\",\"A12\",\"B10\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(14, 36, '"[\"A14\",\"A18\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(15, 36, '"[\"A14\",\"A18\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(16, 36, '"[\"A14\",\"A18\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(17, 36, '"[\"A14\",\"A18\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(18, 36, '"[\"A14\",\"A18\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(19, 36, '"[\"B16\",\"B17\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(20, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(21, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(22, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(23, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(24, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(25, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(26, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(27, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(28, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(29, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(30, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(31, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(32, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(33, 36, '"[\"B5\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(34, 36, '"[\"B5\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(35, 37, '"[\"A3\",\"A9\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(36, 37, '"[\"B10\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 4),
(37, 39, '"[\"A8\",\"A9\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 4),
(38, 40, '"[\"A8\",\"A9\",\"A12\",\"B10\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 4),
(39, 40, '"[\"B5\",\"B4\"]"', '2025-03-23', 'f', 4, 1, 'duntt24042k4@gmail.com', '0916616077', 4),
(40, 41, '"[\"A7\",\"A8\",\"A10\"]"', '2025-03-23', 'f', 4, 1, 'duntt24042k4@gmail.com', '0916616077', 4),
(41, 41, '"[\"A9\",\"A8\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 4),
(42, 42, '"[\"A1\",\"A5\",\"A10\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 4),
(43, 42, '"[\"A6\"]"', '2025-03-23', 'f', 4, 1, 'duntt24042k4@gmail.com', '0916616077', 4);

INSERT INTO "public"."location" ("id", "name", "address") VALUES
(1, 'Bến xe hà nội', '123 Main St, Hanoi');
INSERT INTO "public"."location" ("id", "name", "address") VALUES
(2, 'Bến xe Miền tây', '456 Main St, Ho Chi Minh');
INSERT INTO "public"."location" ("id", "name", "address") VALUES
(3, 'Bến xe hà nội', '13 Main St, Hanoi');
INSERT INTO "public"."location" ("id", "name", "address") VALUES
(4, 'Bến xe cà mau', 'p8 lý văn lâm, cà mau');



INSERT INTO "public"."point" ("id", "name", "city_id") VALUES
(3, 'Pickup Point 1', 1);
INSERT INTO "public"."point" ("id", "name", "city_id") VALUES
(4, 'Pickup Point 2', 2);
INSERT INTO "public"."point" ("id", "name", "city_id") VALUES
(5, 'Pickup Point 1', 1);
INSERT INTO "public"."point" ("id", "name", "city_id") VALUES
(6, 'Pickup Point 2', 2);

INSERT INTO "public"."rents_driver" ("id", "name", "price", "city_id", "address") VALUES
(11, 'Driver X', 1000000, 3, 'Hanoi');


INSERT INTO "public"."roles" ("id", "name") VALUES
(1, 'Admin');
INSERT INTO "public"."roles" ("id", "name") VALUES
(2, 'Customer');
INSERT INTO "public"."roles" ("id", "name") VALUES
(3, 'Driver');

INSERT INTO "public"."ticket_bookings" ("id", "customer_id", "seat", "booking_time", "status", "id_pick_up", "id_drop_off", "email", "phone", "id_busop") VALUES
(73, 36, '"[\"A18\"]"', '2025-03-23', 't', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3);
INSERT INTO "public"."ticket_bookings" ("id", "customer_id", "seat", "booking_time", "status", "id_pick_up", "id_drop_off", "email", "phone", "id_busop") VALUES
(116, 41, '"[\"A9\",\"A8\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3);
INSERT INTO "public"."ticket_bookings" ("id", "customer_id", "seat", "booking_time", "status", "id_pick_up", "id_drop_off", "email", "phone", "id_busop") VALUES
(114, 40, '"[\"B5\",\"B4\"]"', '2025-03-23', 't', 4, 1, 'duntt24042k4@gmail.com', '0916616077', 3);
INSERT INTO "public"."ticket_bookings" ("id", "customer_id", "seat", "booking_time", "status", "id_pick_up", "id_drop_off", "email", "phone", "id_busop") VALUES
(117, 42, '"[\"A1\",\"A5\",\"A10\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(118, 42, '"[\"A6\"]"', '2025-03-23', 'f', 4, 1, 'duntt24042k4@gmail.com', '0916616077', 3),
(115, 41, '"[\"A7\",\"A8\",\"A10\"]"', '2025-03-23', 't', 4, 1, 'duntt24042k4@gmail.com', '0916616077', 3),
(96, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(97, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(98, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(99, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(104, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(105, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(106, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(107, 36, '"[\"B10\",\"B11\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(108, 36, '"[\"B5\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(109, 36, '"[\"B5\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3),
(110, 37, '"[\"A3\",\"A9\"]"', '2025-03-23', 'f', 4, 1, 'phuocdufavn@gmail.com', '0916616077', 3);



INSERT INTO "public"."trips" ("id", "bus_operator_id", "departure_time", "arrival_time", "to_local", "from_local", "price", "id_bus", "date") VALUES
(13, 3, '22:09:00', '02:09:00', 1, 2, 230000, 9, '2025-03-26');
INSERT INTO "public"."trips" ("id", "bus_operator_id", "departure_time", "arrival_time", "to_local", "from_local", "price", "id_bus", "date") VALUES
(14, 4, '09:09:00', '14:09:00', 1, 4, 200000, 9, '2025-03-26');
INSERT INTO "public"."trips" ("id", "bus_operator_id", "departure_time", "arrival_time", "to_local", "from_local", "price", "id_bus", "date") VALUES
(16, 4, '09:09:00', '14:09:00', 1, 4, 290000, 9, '2025-03-26');
