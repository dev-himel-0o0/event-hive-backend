import type { BOOKING_STATUS, USER_ROLE } from "../constants";

export type TRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type TBookingStatus =
  (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];
