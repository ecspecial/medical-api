import { Appointments } from "../models/models.js";
import { getCurrentTimeInUTC3 } from "../controllers/controller.js";
import path from "path";
import fs from "fs";

const logNotification = (message) => {
    const logFile = "./src/logs/notifications.log";
    const logMessage = `${new Date().toISOString()} | ${message}\n`;
    fs.appendFile(logFile, logMessage, (err) => {
      if (err) {
        console.error(`Error writing to log file: ${err}`);
      }
    });
};

export const checkAppointments = async () => {
    const currentTime = getCurrentTimeInUTC3().toISOString().slice(0, 16);
    const expectedTime = `${currentTime}` + ':00.000Z'

    console.log(`Started checking appointments for ${currentTime}`);

    const appointments = await Appointments.find({
        $or: [
          { 'notificationTime.oneDayBefore': expectedTime },
          { 'notificationTime.twoHoursBefore': expectedTime },
        ],
    }).populate('user').populate('doctor');

    appointments.forEach(appointment => {

        const user = appointment.user;
        const doctor = appointment.doctor;
        const slot = appointment.appointmentTime;
        const dateTimeString  = expectedTime.split("T")[0];
        const slotTime = slot.split("T")[1].substring(0, 5);

        const notificationTimes = [
            appointment.notificationTime.oneDayBefore,
            appointment.notificationTime.twoHoursBefore
        ];
        console.log(notificationTimes);

        if (expectedTime === appointment.notificationTime.oneDayBefore) {
            const message = `${dateTimeString} | Привет, ${user.name}! Напоминаем что вы записаны к ${doctor.spec}у завтра в ${slotTime}!`;
            logNotification(message);
            console.log(message);
          } else if (expectedTime === appointment.notificationTime.twoHoursBefore) {
            const message = `${dateTimeString} | Привет, ${user.name}! Вам через 2 часа к ${doctor.spec}у в ${slotTime}!`;
            logNotification(message);
            console.log(message);
        }
    });
    console.log(`Finished checking appointments for ${currentTime}`);
}