const { Category } = require("../models");
const { generateSlug } = require("../functions/generate-slug");

class CategoryService {
  async createCategory({ name, use_in_menu = false }) {
    try {
      const generatedSlug = generateSlug(name);

      const category = await Category.create({
        name,
        slug: generatedSlug,
        use_in_menu,
      });

      return category;
    } catch (error) {
      throw new Error("Erro ao criar categoria: " + error.message);
    }
  }

  async getAllCategories() {
    try {
      const categories = await Category.findAll({
        order: [["id", "ASC"]],
      });
      return categories;
    } catch (error) {
      throw new Error("Erro ao buscar categorias: " + error.message);
    }
  }

  async getCategoryById(id) {
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        throw new Error("Categoria não encontrada");
      }
      return category;
    } catch (error) {
      throw new Error("Erro ao buscar categoria: " + error.message);
    }
  }

  async updateCategory(id, updatedData) {
    try {
      const category = await this.getCategoryById(id);

      if (!category) {
        throw new Error("Categoria não encontrada");
      }

      if (updatedData.name) {
        updatedData.slug = generateSlug(updatedData.name);
      }

      await category.update(updatedData);
      return category;
    } catch (error) {
      throw new Error("Erro ao atualizar categoria: " + error.message);
    }
  }

  async deleteCategory(id) {
    try {
      const category = await this.getCategoryById(id);
      await category.destroy();
      return { message: "Categoria removida com sucesso" };
    } catch (error) {
      throw new Error("Erro ao remover categoria: " + error.message);
    }
  }
}

module.exports = CategoryService;