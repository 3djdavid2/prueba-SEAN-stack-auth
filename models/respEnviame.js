const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const RespuestaEnviame = sequelize.define('respuestaEnviame', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },


    identifier: {
        type: DataTypes.NUMBER
    },

    imported_id: {
        type: DataTypes.STRING
    },

    tracking_number: {
        type: DataTypes.STRING
    },


    status_id: {
        type: DataTypes.NUMBER
    },


    status_name: {
        type: DataTypes.STRING
    },


    status_code: {
        type: DataTypes.STRING
    },

    status_info: {
        type: DataTypes.STRING
    },

    status_created_at: {
        type: DataTypes.STRING
    },

    customer_full_name: {
        type: DataTypes.STRING
    },
    customer_phone: {
        type: DataTypes.STRING
    },
    customer_email: {
        type: DataTypes.STRING
    },

    shipping_address_full_address: {
        type: DataTypes.STRING
    },
    shipping_address_place: {
        type: DataTypes.STRING
    },
    shipping_address_type: {
        type: DataTypes.STRING
    },

    country: {
        type: DataTypes.STRING
    },
    carrier: {
        type: DataTypes.STRING
    },
    service: {
        type: DataTypes.STRING
    },
    label_PDF: {
        type: DataTypes.STRING
    },
    label_ZPL: {
        type: DataTypes.STRING
    },
    label_PNG: {
        type: DataTypes.STRING
    },

    barcodes: {
        type: DataTypes.STRING
    },
    deadline_at: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.STRING
    },
    updated_at: {
        type: DataTypes.STRING
    },
    links_rel_self: {
        type: DataTypes.STRING
    },
    links_rel_tracking: {
        type: DataTypes.STRING
    },
    links_rel_trackingweb: {
        type: DataTypes.STRING
    }


});

module.exports = RespuestaEnviame;

// const obj1 = {
//     "data":
//     {
//         "identifier": 101079400,

//         "imported_id": "123",
//         "tracking_number": "7331725833",
//         "status": {
//             "id": 5,
//             "name": "Listo para despacho",
//             "code": "CREATED",
//             "info": "Ya creamos tu envío en: BLUEXPRESS  - ",
//             "created_at": "2022-09-28 21:01:34"
//         },
//         "customer": {
//             "full_name": "david vivanco",
//             "phone": "921630936",
//             "email": "desarrollowebdavid@gmail.com"
//         },
//         "shipping_address": {
//             "full_address": "Poza Azul 3074, Marga Marga, Quilpué, Chile",
//             "place": "Quilpué",
//             "type": "home"
//         },
//         "country": "CL",
//         "carrier": "BLUEXPRESS",
//         "service": "priority",
//         "label": {
//             "PDF": "https://storage.googleapis.com/carrier-deliveries/202209/101079400/6208307-label.pdf",
//             "ZPL": null,
//             "PNG": null
//         },
//         "barcodes": "7331725833",
//         "deadline_at": "No informada.",
//         "created_at": "2022-09-28 21:01:32",
//         "updated_at": "2022-09-28 21:01:34",
//         "links": [
//             {
//                 "rel": "self",
//                 "href": "https://api.enviame.io/api/s2/v2/deliveries/101079400"
//             },
//             {
//                 "rel": "tracking",
//                 "href": "https://api.enviame.io/api/s2/v2/deliveries/101079400/tracking"
//             },
//             {
//                 "rel": "tracking-web",
//                 "href": "https://api.enviame.io/s2/companies/8706/deliveries/101079400/tracking"
//             }
//         ]
//     }
// }