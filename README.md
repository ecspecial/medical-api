# medical-api

### Description:
API to communicate with database and notify users about their doctor appointment. Notification is logged to notifications.log prior to user scheduled time (24 and 2 hours before notification).

### Technologies:
- mongoDB Atlas
- mongoose
- express

### Documentation:
API documentation table is available at index.html file along with data's body examples.
![Image of API documentation page](./src/files/medical-api-api-documentation.png)

### Usage:
API can be forked localy and run with 

```shell
git clone https://github.com/ecspecial/medical-api
cd medical-api
npm install
npm run dev
```
This will start notification service with remote mongoDB. To test notifications, update doctors slots and send user appointments with methods described in API documentation.

### Notification examples:
![Image of notification demo](./src/files/notify-demo.png)








