const mysql = require('../connection').con; //importing connection

const handleResponse = (err, res, stCode = null, data = null) => {
    if (err) console.error(err);
    return res.status(stCode == null ? (err ? 500 : 200) : stCode).json(err ? {err: err} : (data == null ? {} : data))
};

const errorHandler = err => {
    if (err) console.error(err)
};

exports.getMovies = (req, res) => {
    mysql.query("select * from movies", (err, data) => handleResponse(err, res, 200, data))
};

exports.addMovies = (req, res) => {
    const {nama, tahun, description} = req.body;
    mysql.query("insert into movies values (null,?,?,?)", [nama, tahun, description], err => handleResponse(err, res, 201))
};

exports.editMovies = (req, res) => {
    const {id, nama, tahun, description} = req.body;
    mysql.query(`update movies set ? where id = ${id}`, {nama, tahun, description}, err => handleResponse(err, res))
};
exports.deleteMovies = (req, res) => {
    const {id} = req.body;
    mysql.query(`delete
                 from movies
                 where id = ?`, [id], err => {
        errorHandler(err);

        mysql.query("delete from movcat where idmovie = ?", [id], err => handleResponse(err, res))
    })
};

exports.getCategory = (req, res) => {
    mysql.query("select * from categories", (err, data) =>
        handleResponse(err, res, 200, data))
};

exports.addCategory = (req, res) => {
    mysql.query("insert into categories values (null,?)", [req.body.nama], err =>
        handleResponse(err, res))
};

exports.editCategory = (req, res) => {
    const {nama, id} = req.body;
    mysql.query(`update categories set ? where id = ${id}`, {nama}, err => handleResponse(err, res))
};

exports.deleteCategory = (req, res) => {
    const {id} = req.body;
    mysql.query(`delete
                 from categories
                 where id = ?`, [id], err => {
        errorHandler(err);

        mysql.query("delete from movcat where idcategory = ?", [id], err => handleResponse(err, res))
    })
};

exports.getConnector = (req, res) => {
    mysql.query(`select m.nama as namaMovie,
                        c.nama as namaCategory
                 from movcat mc
                          inner join movies m on mc.idmovie = m.id
                          inner join categories c on mc.idcategory = c.id
    `, (err, data) =>
        handleResponse(err, res, 200, data))
};

exports.addConnector = (req, res) => {
    const {idMovie, idCategory} = req.body;
    mysql.query(`insert into movcat values (?, ?)`, [idMovie, idCategory], err => handleResponse(err, res))
};

exports.deleteConnector = (req, res) => {
    const {idmovie, idcategory} = req.body;
    mysql.query(`delete from movcat where idmovie = ${idmovie} and idcategory = ${idcategory} `, err => {
        errorHandler(err);

        mysql.query(`delete from movies where id = ${idmovie}`, err => {
            errorHandler(err);

            mysql.query(`delete from categories where id = ${idcategory}`, err => handleResponse(err, res))
        })
    })
};
