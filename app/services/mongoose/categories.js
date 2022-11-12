// import model categories
const Categories = require('../../api/v1/categories/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllCategories = async (req) => {
    const result = await Categories.find({ organizer: req.user.organizer })

    return result
}

const getOneCategories = async (req) => {
    const { id } = req.params

    const result = await Categories.findOne({ _id: id, organizer: req.user.organizer })

    if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`)

    return result
}

const createCategories = async (req) => {
    const { name } = req.body

    // cari categories dengan field name
    const check = await Categories.findOne({ name: name })

    // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
    if (check) throw new BadRequestError('kategori nama duplikat')

    const result = await Categories.create({ name: name, organizer: req.user.organizer })

    return result
}

const updateCategories = async (req) => {
    const { id } = req.params;
    const { name } = req.body;

    //cari categories berdasarkan field id
    const checkCategories = await Categories.findOne({
        // name,
        organizer: req.user.organizer,
        _id: id,
    })

    // jika id result false / null maka akan menampilkan error `Tidak ada Kategori dengan id` yang dikirim client
    if (!checkCategories) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);


    // cari categories dengan field name dan id selain dari yang dikirim dari params
    const check = await Categories.findOne({
        name: name,
        _id: { $ne: id },
    });

    // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
    if (check) throw new BadRequestError('kategori sudah terdaftar');

    const result = await Categories.findOneAndUpdate(
        { _id: id },
        { name: name },
        { new: true, runValidators: true }
    );

    return result;
};

const deleteCategories = async (req) => {
    const { id } = req.params;

    const result = await Categories.findOne({
        _id: id,
        organizer: req.user.organizer,
    });

    if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

    await result.remove();

    return result;
};

const checkingCategories = async (id) => {
    const result = await Categories.findOne({ _id: id });

    if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

    return result;
};

module.exports = { getAllCategories, getOneCategories, createCategories, updateCategories, deleteCategories, checkingCategories }