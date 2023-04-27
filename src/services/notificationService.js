import { Appointments } from "../models/models";
import { fs } from "fs";

const logNotification = (message) => {
    const logFile = 'notifications.log';
    const logMessage = `${new Date().toISOString()} | ${message}\n`;
    fs.appendFile(logFile, logMessage, (err) => {
      if (err) {
        console.error(`Error writing to log file: ${err}`);
      }
    });
};
  
export const checkAppointments = async () => {
    const currentTime = new Date().toISOString();
  
    const appointments = await Appointment.find({
      $or: [
        { 'notificationTime.oneDayBefore': currentTime },
        { 'notificationTime.twoHoursBefore': currentTime },
      ],
    }).populate('user').populate('doctor');
  
    appointments.forEach(appointment => {
      const user = appointment.user;
      const doctor = appointment.doctor;
      const slot = appointment.appointmentTime;
      const message = currentTime === appointment.notificationTime.oneDayBefore
        ? `Привет ${user.name}! Напоминаем что вы записаны к ${doctor.spec} завтра в ${slot}!`
        : `Привет ${user.name}! Вам через 2 часа к ${doctor.spec} в ${slot}!`;
  
      logNotification(message);
    });
  };