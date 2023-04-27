// Function to generate time slots for a given start and end hour on a given date
export function generateTimeSlots(startHour, endHour, date) {
  const timeSlots = [];
  const currentDate = getCurrentTimeInUTC3().toISOString();

  for (let j = 0; j < 3; j++) {
    for (let i = startHour; i <= endHour; i++) {
      const date = new Date(currentDate.getTime() + j * 24 * 60 * 60 * 1000);
      const slotDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), i, 0, 0, 0));
      timeSlots.push(slotDate.toISOString());
    }
  }

  return timeSlots;
}

//  Function to return current time in UTC+3 timezone
export function getCurrentTimeInUTC3() {
  const now = new Date();
  const utc3Time = new Date(now.getTime() + (3 * 60 * 60 * 1000));
  return utc3Time;
}