export default function generateTimeSlots(startHour, endHour) {
    const timeSlots = [];
    const currentDate = new Date();
  
    for (let i = startHour; i <= endHour; i++) {
      const date = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), i, 0, 0, 0));
      timeSlots.push(date.toISOString());
    }
  
    return timeSlots;
  }