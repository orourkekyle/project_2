// sequelize sell table
module.exports = function(sequelize, Datatypes){
    var Sell = sequelize.define("Sell", {
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
        vente: {
            type: Datatypes.BOOLEAN
        }
    });

    Sell.associate = function(models) {
        Sell.belongsTo(models.User);
    };
    return Sell;
}