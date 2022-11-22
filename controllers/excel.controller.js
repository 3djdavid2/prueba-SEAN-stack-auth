const excelJS = require('exceljs');
const pathResolve = require('path');
const modelo = require('../models/index')

exports.get = async (req, res) => {

    const tipoReporte = req.query.reporte

    const path = "public/excel";  // Path to download excel
    const nameWorkBook = tipoReporte
    const nameSheet = tipoReporte

    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet(nameSheet); // New Worksheet

    try {

        const tablaBD = modelo[tipoReporte]

        var tablaEncontrada = await tablaBD.findAll({
            raw: true,
            where: {}
        });
        let ifDatosFilas = tablaEncontrada.length


        if (ifDatosFilas > 0) { //si hay datos en la bd las agrego al libro

            let cabecera = Object.keys(tablaEncontrada[0])

            let i = 0

            cabecera.forEach(element => {
                worksheet.getColumn(i + 1).header = [cabecera[i]]
                i++
            });

            let j = 0

            tablaEncontrada.forEach(el => {
                worksheet.addRow(Object.values(tablaEncontrada[j]));
                j++
            })

            // Making first line in excel bold
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true };
            });


        } else {

            const descrTabla = await tablaBD.describe();
            const keydescrTabla = Object.keys(descrTabla)

            worksheet.addRow(keydescrTabla)
        }

        //genero el libro (con o sin datos, pero con la cabecera ok)
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