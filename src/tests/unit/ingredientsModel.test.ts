import { getConnection } from "./mongoConnectionMock";
import { MongoClient } from "mongodb";
import sinon from "sinon";
import { mockIngredient, mockIngredientOther } from "./mockData";
import { expect } from "chai";
import ingredientsModel from "../../models/ingredientsModel";

const {
  deleteIngredientModel,
  findIngredientByNameModel,
  registerIngredientModel,
  updateIngredientModel,
  verifyExistsIngredientsModel
} = ingredientsModel;

describe("Testando camada models dos ingredientes", () => {
  let connectionMock: MongoClient;
  beforeAll(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, "connect").resolves(connectionMock);
  });
  afterEach(async() => {
    await connectionMock.db("challenge_pro_franchising").collection('ingredients').deleteMany({});
  });
  describe("Testando se cadastra um ingrediente", () => {
    test("Se cadastra corretamente", async () => {
      const response = await registerIngredientModel(mockIngredient);
      expect(response).to.have.a.property("id")
    });
  });
  describe("Testando se encontra ingrediente por nome corretamente", () => {
    test('Se encontra o ingrediente', async () => {
      await registerIngredientModel(mockIngredient)
      const response = await findIngredientByNameModel("Requeijão");
      expect(response).to.have.a.property("_id");
      expect(response).to.have.a.property("name");
      expect(response).to.have.a.property("unitPrice");
      expect(response).to.have.a.property("unitOfMeasurement");
    });
    test('Se não encontra o ingrediente', async () => {
      const response = await findIngredientByNameModel("Café");
      expect(response).to.be.a('null');
    });
  });
  describe("Verifica se encontra os ingredientes passados", () => {
    test("Verifica se encontra os ingredientes", async () => {
      await registerIngredientModel(mockIngredient);
      await registerIngredientModel(mockIngredientOther);
      const response = await verifyExistsIngredientsModel(["Requeijão", "Goiabada"]);
      expect(response).to.be.be.an('array').length(2);
    });
    it("Verifica se encontra pelo menos 1 ingrediente ", async () => {
      await registerIngredientModel(mockIngredient);
      await registerIngredientModel(mockIngredientOther);
      const response = await verifyExistsIngredientsModel(["Requeijão"]);
      expect(response).to.be.an('array').length(1);
    });
    it('Verifica se ele não encontra nenhum', async () => {
      const response = await verifyExistsIngredientsModel(["Requeijão"]);
      expect(response).to.be.an('array').length(0);
    });
  });
  describe("Verifica se deleta o ingrediente correto", () => {
    it("Verifica se deletou corretamente", async () => {
      await registerIngredientModel(mockIngredient);
      await deleteIngredientModel("Requeijão");
      const ingredient = await findIngredientByNameModel("Requeijão");
      expect(ingredient).to.be.an("null");
    });
    it("Verifica se deletou o item correto", async () => {
      await registerIngredientModel(mockIngredient);
      await registerIngredientModel(mockIngredientOther);
      await deleteIngredientModel("Requeijão");
      const response = await verifyExistsIngredientsModel(["Requeijão", "Goiabada"]);
      expect(response).to.be.an("array").length(1);
    });
  });
  describe("Verifica se realizou corretamente o update do ingrediente", () => {
    it("Se fez o update do produto correto", async () => {
      await registerIngredientModel(mockIngredient);
      await updateIngredientModel("Requeijão", mockIngredientOther);
      const response = await verifyExistsIngredientsModel(["Requeijão", "Goiabada"]);
      expect(response).to.be.an("array").length(1);
    });
  });
});


