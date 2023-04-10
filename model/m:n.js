import { sequelize } from "../config/sequelize.config.js";
import { Category } from "./category.model.js";

export const CategoryCategories = sequelize.define('CategoryCategories', {
}, {
  freezeTableName: true
});
CategoryCategories.associate = function(models) {
    CategoryCategories.belongsTo(Category, { as: 'Parent', onDelete: 'CASCADE'});
    CategoryCategories.belongsTo(Category, { as: 'Children', onDelete: 'CASCADE' });
};
// CategoryCategories.sync()

