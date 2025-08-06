const data = require('../../../public/data.json');

exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',   // نوع محتوا JSON
      'Access-Control-Allow-Origin': '*',   // اجازه می‌دهد همه دامنه‌ها درخواست کنند (CORS)
    },
    body: JSON.stringify(data),   // داده‌ها به صورت رشته JSON برگردانده می‌شود
  };
};
