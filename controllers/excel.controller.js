const excelJS = require('exceljs');
const pathResolve = require('path');

const User = [
    {
        fname: "Amir",
        lname: "Mustafa",
        email: "amir@gmail.com",
        gender: "Male"
    },
    {
        fname: "Ashwani",
        lname: "Kumar",
        email: "ashwani@gmail.com",
        gender: "Male",
    },
]

exports.get = async (req, res) => {

    const path = "public/excel";  // Path to download excel
    const nameWorkBook = 'libro'
    const nameSheet ='ventas'

    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet(nameSheet); // New Worksheet
    // Column for data in excel. key must match data key
    worksheet.columns = [
        { header: "S no.", key: "s_no", width: 10 },
        { header: "First Name", key: "fname", width: 10 },
        { header: "Last Name", key: "lname", width: 10 },
        { header: "Email Id", key: "email", width: 10 },
        { header: "Gender", key: "gender", width: 10 },
    ];
    // Looping through User data
    let counter = 1;

    User.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
    });

    // Making first line in excel bold
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
    });



    try {
        await workbook.xlsx.writeFile(`${path}/${nameWorkBook}.xlsx`)
            .then(() => {    

                res.download(pathResolve.resolve(`${path}/${nameWorkBook}.xlsx`))
            });
    } catch (err) {
        res.send({
            status: "error",
            message: "Something went wrong",
        });
    }
};