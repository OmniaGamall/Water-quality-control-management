const path = require('path');
const connection = require(path.join(path.resolve(), 'config/db.js'));


let addEquipment = async (req, res) => {
    const { Name_, Manufacture, Type_ } = req.body;

    connection.execute(`INSERT INTO equipment ( Name_, Manufacture, Type_) VALUES (?, ?, ?)`, [ Name_, Manufacture, Type_], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed', err });
        }

        res.status(200).json({ message: "Success", insertId: result.insertId });
    });
}
let getEquipmentByID = async(req, res) =>{
    const equipmentID = req.params.EquID;
    connection.execute(`select * from equipment where EquID = ?`, [equipmentID], (err, data) =>{
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Error fetching equipment', error: err });
        }
        if (data && data.length > 0) {
            res.status(200).json({ message : "Success", data: data[0] });
        } else {
            res.status(404).json({ message : "Equipment not found" });
        }
    });
}

let getAllEquipments = async(req, res) =>{
    connection.execute(`select *  from equipment`, (err, data) =>{
        if(data)
            res.json(200, {message : "Success", data})
        else
        res.json(500, {message : "Failed", err})
    })
}
let deleteEquipmentByID = async (req, res) => {
    const equipmentID = req.params.EquID;

    connection.execute(`DELETE FROM equipment WHERE EquID = ?`, [equipmentID], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed to delete Equipment', error: err });
        }

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Equipment deleted successfully' });
        } else {
            res.status(404).json({ message: 'Equipment not found' });
        }
    });
};
let updateEquipment = async (req, res) => {
    const { EquID, ...updateFields } = req.body;

    if (!EquID) {
        return res.status(400).json({ message: 'ID is required for updating the Equipment' });
    }

    const allowedFields = ['Name_', 'Manufacture', 'Type_ '];
    const fields = Object.keys(updateFields).filter(field => allowedFields.includes(field));
    const values = fields.map(field => updateFields[field]);

    if (fields.length === 0) {
        return res.status(400).json({ message: 'No valid fields to update' });
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');

    const query = `UPDATE equipment SET ${setClause} WHERE EquID = ?`;
    values.push(EquID); 

    connection.execute(query, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed to update Equipment', err });
        }

        res.status(200).json({ message: 'Success', affectedRows: result.affectedRows });
    });
}
module.exports = {
    addEquipment,
    getEquipmentByID,
    getAllEquipments,
    deleteEquipmentByID,
    updateEquipment 
}