// sequelize purchased table
module.exports = function(sequelize, Datatypes){
    var Buy = sequelize.define("Buy", {
        gender: {
            type: Datatypes.STRING
        },
        media: {
            type: Datatypes.STRING
        },
        colorWay: {
            type: Datatypes.STRING
        },
        retailPrice: {
            type: Datatypes.INTEGER
        },
        shoe:{
            type: Datatypes.STRING
        },
        year: {
            type: Datatypes.INTEGER
        },
        purchased: {
            type: Datatypes.BOOLEAN,
            allowNull: false
        }
    });
    Buy.associate = function(models) {
        Buy.belongsTo(models.User);
    };
    return Buy;
}