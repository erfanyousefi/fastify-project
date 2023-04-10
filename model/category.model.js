import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";
import { CategoryCategories } from "./m:n.js";

export const Category = sequelize.define("Category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    ParentId: {
        type: DataTypes.INTEGER,

    }
});
Category.associate = function(models) {
    Category.belongsToMany(models.Category, {through: CategoryCategories, as: "Parents", foreignKey: 'ParentId'});
    Category.belongsToMany(models.Category, {through: CategoryCategories, as: "Children", foreignKey: 'childrenId'});
}
// Category.hasMany(Category, {as: "children", foreignKey: "ParentId", useJunctionTable: false});
// Category.belongsToMany(Category, {as: "Children"});
// Category.sync({alter: true}).then(() => {
//     console.log("Category sync completed");
// })
