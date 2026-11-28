export const USER_ROLE = {
  attendee: "attendee",
  organizer: "organizer",
} as const;

export const USER_ROLES = [USER_ROLE.attendee, USER_ROLE.organizer] as const;

export const BOOKING_STATUS = {
  confirmed: "confirmed",
  cancelled: "cancelled",
} as const;
